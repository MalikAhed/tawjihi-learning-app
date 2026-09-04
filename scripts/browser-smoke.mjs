import { spawn } from "node:child_process";
import { once } from "node:events";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyShipReadyTemplates } from "./browser-ship-ready.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const browserErrors = [];
const failedLocalRequests = [];
const failedExternalRequests = [];
const serverErrors = [];
const allowExternalAssets = process.env.BROWSER_EXTERNAL_ASSETS === "1";
const screenshotDirectory = process.env.BROWSER_SCREENSHOT_DIR;
const screenshotFilter = process.env.BROWSER_SCREENSHOT_FILTER;

class ScreenshotCaptureComplete extends Error { constructor(filename) { super(filename); this.filename = filename; } }
function assert(condition, message) {
  if (!condition) failures.push(message);
}
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function terminateProcess(processHandle) {
  if (!processHandle || processHandle.exitCode !== null || processHandle.signalCode !== null) return;
  const exited = once(processHandle, "exit");
  processHandle.kill("SIGTERM");
  await Promise.race([exited, delay(2_000)]);
  if (processHandle.exitCode === null && processHandle.signalCode === null) {
    const forcedExit = once(processHandle, "exit");
    processHandle.kill("SIGKILL");
    await forcedExit;
  }
}
async function findChrome() {
  const candidates = [process.env.CHROME_BIN, "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  throw new Error("Chrome or Chromium is required for browser smoke tests. Set CHROME_BIN to its executable.");
}
async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}
function rawRequest(port, target, method = "GET") {
  return new Promise((resolve, reject) => {
    const outgoing = request({ host:"127.0.0.1", port, path:target, method }, (response) => {
      response.resume();
      response.once("end", () => resolve(response.statusCode));
    });
    outgoing.once("error", reject);
    outgoing.end();
  });
}
class CdpPipe {
  constructor(processHandle) {
    this.process = processHandle;
    this.pending = new Map();
    this.nextId = 1;
    this.buffer = Buffer.alloc(0);
    this.listeners = new Set();
    processHandle.stdio[4].on("data", (chunk) => this.handleData(chunk));
  }

  handleData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    let boundary = this.buffer.indexOf(0);
    while (boundary >= 0) {
      const payload = this.buffer.subarray(0, boundary).toString("utf8");
      this.buffer = this.buffer.subarray(boundary + 1);
      if (payload) this.handleMessage(JSON.parse(payload));
      boundary = this.buffer.indexOf(0);
    }
  }

  handleMessage(message) {
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result);
      return;
    }
    this.listeners.forEach((listener) => listener(message));
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.process.stdio[3].write(`${JSON.stringify(payload)}\0`);
    });
  }

  onEvent(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
async function waitForServer(port) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      if (await rawRequest(port, "/") === 200) return;
    } catch (error) {
      if (error?.code !== "ECONNREFUSED") throw error;
    }
    await delay(50);
  }
  throw new Error("Development server did not become ready.");
}
let serverProcess;
let chromeProcess;
let profileDirectory;
let simulateStaticDocument = false;
try {
  const port = await getAvailablePort();
  const appUrl = `http://127.0.0.1:${port}/`;
  serverProcess = spawn(process.execPath, ["dev-server.mjs"], {
    cwd:projectRoot,
    env:{
      ...process.env,
      PORT:String(port),
      ACCOUNTS_DATABASE_PATH:":memory:",
      EXPLAIN_REVIEW_CLI:process.env.EXPLAIN_REVIEW_CLI || path.join(projectRoot, "tests/fixtures/mock-codex.mjs"),
    },
    stdio:["ignore", "pipe", "pipe"],
  });
  serverProcess.stdout.resume();
  serverProcess.stderr.on("data", (chunk) => serverErrors.push(chunk.toString("utf8").trim()));
  await waitForServer(port);

  assert(await rawRequest(port, "/%E0%A4%A") === 400, "malformed URL must return 400 without crashing the server");
  assert(await rawRequest(port, "/%00") === 400, "null bytes in URL paths must return 400 without crashing the server");
  assert(await rawRequest(port, "/", "POST") === 405, "unsupported HTTP methods must return 405");
  assert(await rawRequest(port, "/", "HEAD") === 200, "HEAD requests must return the resource status without a response body");
  assert(await rawRequest(port, "/data/accounts.sqlite") === 404, "the account database must never be served as a static file");
  assert(await rawRequest(port, "/src/server/account-store.mjs") === 404, "server-only source must never be served to browsers");
  assert(await rawRequest(port, "/.git/config") === 404, "repository metadata must never be served as a static file");
  assert(await rawRequest(port, "/") === 200, "server must remain available after a malformed URL");

  const chrome = await findChrome();
  profileDirectory = await mkdtemp(path.join(tmpdir(), "fsq-chrome-"));
  chromeProcess = spawn(chrome, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-background-networking",
    "--remote-debugging-pipe",
    `--user-data-dir=${profileDirectory}`,
    "about:blank",
  ], { stdio:["ignore", "ignore", "pipe", "pipe", "pipe"] });
  chromeProcess.stderr.resume();

  const cdp = new CdpPipe(chromeProcess);
  const { targetId } = await cdp.send("Target.createTarget", { url:"about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten:true });
  await Promise.all([
    cdp.send("Page.enable", {}, sessionId),
    cdp.send("Runtime.enable", {}, sessionId),
    cdp.send("Log.enable", {}, sessionId),
    cdp.send("Network.enable", {}, sessionId),
    cdp.send("Fetch.enable", {
      patterns:[{ urlPattern:`${appUrl}*`, resourceType:"Document", requestStage:"Response" }],
    }, sessionId),
  ]);
  if (!allowExternalAssets) {
    await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
      source:"window.__FULL_STACK_QUEST_DISABLE_EXTERNALS__ = true;",
    }, sessionId);
  }

  const requestUrls = new Map();
  cdp.onEvent((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Fetch.requestPaused") {
      void (async () => {
        const response = await cdp.send("Fetch.getResponseBody", { requestId:message.params.requestId }, sessionId);
        let html = Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8").toString("utf8");
        if (simulateStaticDocument) html = html.replace('<script src="/__codex_live_reload.js"></script>', "");
        if (!allowExternalAssets) {
          html = html
            .replace(/\s*<link[^>]+href="https:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^"]*"[^>]*>/g, "")
            .replace(/\s*<link[^>]+href="https:\/\/cdn\.jsdelivr\.net[^"]*"[^>]*>/g, "")
            .replace(/\s*<script[^>]+src="https:\/\/cdn\.jsdelivr\.net[^"]*"[^>]*><\/script>/g, "");
        }
        const responseHeaders = (message.params.responseHeaders || [])
          .filter(({ name }) => name.toLowerCase() !== "content-length");
        await cdp.send("Fetch.fulfillRequest", {
          requestId:message.params.requestId,
          responseCode:message.params.responseStatusCode,
          responseHeaders,
          body:Buffer.from(html).toString("base64"),
        }, sessionId);
      })().catch((error) => browserErrors.push(`Could not prepare the deterministic test document: ${error.message}`));
      return;
    }
    if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      browserErrors.push(message.params.args.map((argument) => argument.value || argument.description || "console error").join(" "));
    }
    if (message.method === "Log.entryAdded" && message.params.entry.level === "error") browserErrors.push(message.params.entry.text);
    if (message.method === "Network.requestWillBeSent") requestUrls.set(message.params.requestId, message.params.request.url);
    if (message.method === "Network.loadingFailed" && message.params.errorText !== "net::ERR_ABORTED") {
      const requestUrl = requestUrls.get(message.params.requestId) || message.params.requestId;
      if (requestUrl.startsWith(appUrl)) failedLocalRequests.push(`${message.params.errorText}: ${requestUrl}`);
      else if (allowExternalAssets && /(?:fonts\.(?:googleapis|gstatic)\.com|cdn\.jsdelivr\.net)/.test(requestUrl)) {
        failedExternalRequests.push(`${message.params.errorText}: ${requestUrl}`);
      }
    }
  });

  async function evaluate(expression) {
    const response = await cdp.send("Runtime.evaluate", { expression, returnByValue:true, awaitPromise:true }, sessionId);
    if (response.exceptionDetails) {
      throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    }
    return response.result.value;
  }

  async function waitFor(expression, label) {
    const attempts = allowExternalAssets ? 400 : 160;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      if (await evaluate(`Boolean(${expression})`)) return;
      await delay(50);
    }
    const errorContext = browserErrors.length ? ` Browser errors: ${browserErrors.join(" | ")}` : "";
    throw new Error(`Timed out waiting for ${label}.${errorContext}`);
  }

  async function navigate(url) {
    const previousTimeOrigin = await evaluate("performance.timeOrigin");
    await cdp.send("Page.navigate", { url }, sessionId);
    await waitFor(`performance.timeOrigin !== ${previousTimeOrigin} && document.readyState !== 'loading'`, url);
  }

  async function captureScreenshot(filename) {
    if (!screenshotDirectory) return;
    if (screenshotFilter && filename !== screenshotFilter) return;
    await mkdir(screenshotDirectory, { recursive:true });
    await waitFor("!document.fonts || document.fonts.status === 'loaded'", "document fonts");
    await delay(screenshotFilter ? 650 : 180);
    const { data } = await cdp.send("Page.captureScreenshot", {
      format:"png",
      fromSurface:true,
      captureBeyondViewport:false,
    }, sessionId);
    await writeFile(path.join(screenshotDirectory, filename), Buffer.from(data, "base64"));
    if (screenshotFilter) throw new ScreenshotCaptureComplete(filename);
  }

  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await navigate(appUrl);
  await waitFor("Boolean(document.querySelector('.visitor-landing'))", "the visitor landing page");
  await captureScreenshot("visitor-entry.png");
  assert(await evaluate("document.body.classList.contains('product-flow-active') && getComputedStyle(document.querySelector('.topbar-wrap')).display === 'none'"), "the visitor entry must replace legacy game chrome");
  assert(await evaluate("Boolean(document.querySelector('.visitor-illustration-placeholder')) && document.querySelector('[data-flow=register]').textContent.trim() === 'ابدأ' && document.querySelector('[data-flow=sign-in]').textContent.trim() === 'لدي حساب بالفعل'"), "the reference landing must expose its image placeholder and two account actions");
  await navigate(`${appUrl}?page=learn`);
  await waitFor("location.search === '?page=learn' && !document.body.classList.contains('product-flow-active') && document.querySelectorAll('.subject-card').length === 8", "the existing vibrant Learn page");
  assert(await evaluate("document.querySelectorAll('.subject-card').length === 8 && Boolean(document.querySelector('[data-auth-flow=register]')) && Boolean(document.querySelector('[data-auth-flow=sign-in]'))"), "guests must reach the existing eight-subject Learn page with Create account and Sign in");
  assert(await evaluate("!document.querySelector('[data-learner-dashboard]') && [...document.querySelectorAll('[data-subject-progress]')].every((ring) => ring.hidden)"), "guests must not see a personal dashboard or subject progress");
  assert(await evaluate("!document.querySelector('.sidebar') && !document.querySelector('.topbar-actions')"), "the Learn page must not contain the old streak, rank, gem, avatar, or sidebar account UI");
  await captureScreenshot("subjects-home.png");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("location.search === '?subject=ict' && Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap");
  assert(await evaluate("document.querySelectorAll('.roadmap-unit').length === 3 && document.querySelectorAll('.roadmap-lesson').length === 5 && document.querySelector('.lesson-back').textContent.includes('رجوع') && document.querySelector('.lesson-back').textContent.includes('›') && !document.querySelector('.lesson-back').textContent.includes('‹') && getComputedStyle(document.querySelector('.lesson-top-title')).display === 'none' && !document.querySelector('.subject-roadmap').textContent.includes('خريطة المادة') && !document.querySelector('.subject-roadmap').textContent.includes('محتوى تجريبي')"), "ICT must begin with the three textbook unit maps and five lessons, plus a labeled Back control whose arrow sits on the right and faces right");
  await captureScreenshot("ict-roadmap.png");
  const lessonNodeColor = await evaluate("getComputedStyle(document.querySelector('.roadmap-lesson')).backgroundColor");
  await evaluate("document.querySelector('.roadmap-lesson').click()");
  await waitFor("!document.querySelector('[data-roadmap-bubble]').hidden", "the lesson information bubble");
  assert(await evaluate(`document.querySelector('[data-bubble-lesson]').textContent === 'الدرس الأول: إدارة قواعد البيانات' && document.querySelector('[data-bubble-xp]').textContent === '10 XP' && document.activeElement === document.querySelector('[data-bubble-start]') && getComputedStyle(document.querySelector('.roadmap-lesson')).backgroundColor === ${JSON.stringify(lessonNodeColor)}`), "a map node must remain visually stable and open a nearby lesson brief before starting");
  await captureScreenshot("ict-lesson-bubble.png");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("document.querySelector('.markdown-authored-content .markdown-rendered h1')?.textContent === 'إدارة قواعد البيانات'", "the published ICT database lesson");
  assert(await evaluate("document.querySelector('.lesson-top-title').getAttribute('aria-valuemax') === '24' && document.querySelector('.current-view-title').textContent === 'إدارة قواعد البيانات' && !document.querySelector('[data-roadmap-preview]')"), "starting the first roadmap lesson must open its complete authored flow in the shared lesson shell");
  assert(await evaluate("getComputedStyle(document.querySelector('.markdown-authored-content')).direction === 'rtl'"), "the Arabic ICT lesson must inherit RTL reading direction");
  assert(await evaluate(`(() => { const primary=document.querySelector('.level-action--primary'); const back=document.querySelector('[data-template-back]'); const shortcut=primary.querySelector('kbd'); const group=document.querySelector('.level-layout-action-group').getBoundingClientRect(); const primaryRect=primary.getBoundingClientRect(); const backRect=back.getBoundingClientRect(); const shortcutRect=shortcut.getBoundingClientRect(); const shortcutStyle=getComputedStyle(shortcut); return primary.textContent.includes('متابعة') && back.textContent === 'السابق' && document.querySelector('.level-layout-kicker').textContent === 'تعلّم' && group.right > innerWidth / 2 && primaryRect.width === 240 && primaryRect.height === 52 && backRect.width === 128 && backRect.height === 52 && shortcutRect.width === 62 && shortcutRect.height === 34 && shortcut.textContent.includes('ENTER') && !shortcut.textContent.includes('إدخال') && shortcutStyle.backgroundColor === 'rgb(255, 255, 255)' && shortcutStyle.color === 'rgb(75, 85, 99)' && shortcutStyle.direction === 'ltr' && !document.querySelector('.prototype-tools'); })()`), "the Arabic lesson controls must use stable geometry and a solid-white English ENTER key with dark-grey text");
  const ictLessonPalette = await evaluate(`(() => ({
    continueBackground:getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor,
    continueText:getComputedStyle(document.querySelector('.level-action--primary')).color,
    progressFill:getComputedStyle(document.querySelector('.lesson-top-title'),'::after').backgroundColor,
  }))()`);
  assert(ictLessonPalette.continueBackground === "rgb(56, 189, 248)" && ictLessonPalette.continueText === "rgb(8, 47, 73)" && ictLessonPalette.progressFill === "rgb(56, 189, 248)", `the lesson Continue action and progress bar must use the light-blue palette (${JSON.stringify(ictLessonPalette)})`);
  await captureScreenshot("ict-database-lesson-desktop.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  const mobileIctLesson = await evaluate(`(() => { const step = document.querySelector('[data-live-authored-step]').getBoundingClientRect(); const copy = document.querySelector('.markdown-authored-content'); return { contained:step.left >= 0 && step.right <= innerWidth, overflow:document.documentElement.scrollWidth > innerWidth, fontSize:parseFloat(getComputedStyle(copy).fontSize) }; })()`);
  assert(mobileIctLesson.contained && !mobileIctLesson.overflow && mobileIctLesson.fontSize >= 15, `the ICT lesson must stay readable on a narrow screen (${JSON.stringify(mobileIctLesson)})`);
  await captureScreenshot("ict-database-lesson-mobile.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('[data-live-authored-step]').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  await waitFor("document.querySelector('.markdown-rendered h1')?.textContent === 'ما الذي يديره برنامج قواعد البيانات؟'", "the second ICT teaching step");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('[data-ui-lab-answer=update]'))", "the first ICT MCQ");
  assert(await evaluate("document.querySelector('[data-ui-lab-feedback]').textContent === 'اختر أفضل إجابة، ثم تحقّق من اختيارك.' && document.querySelector('[data-ui-lab-check-label]').textContent === 'تحقّق من الإجابة' && document.querySelector('[data-ui-lab-answer=insert] span').textContent === 'أ'"), "the ICT MCQ instructions, action, and choice markers must be Arabic");
  assert(await evaluate("document.querySelector('[data-template-primary]').getBoundingClientRect().width === 240 && document.querySelector('[data-template-back]').getBoundingClientRect().width === 128"), "teaching steps and MCQs must keep the same primary and Back button sizes");
  await evaluate("document.querySelector('[data-ui-lab-answer=update]').click()");
  await waitFor("getComputedStyle(document.querySelector('[data-ui-lab-answer=update]')).borderColor === 'rgb(56, 189, 248)'", "the selected ICT MCQ color transition");
  const ictMcqPalette = await evaluate(`(() => { const answer=document.querySelector('[data-ui-lab-answer=update]'); return { border:getComputedStyle(answer).borderColor, progress:getComputedStyle(document.querySelector('.lesson-top-title'),'::after').backgroundColor, action:getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor }; })()`);
  assert(Object.values(ictMcqPalette).every((color) => color === "rgb(56, 189, 248)"), `selected MCQ, progress, and action colors must share the light-blue palette (${JSON.stringify(ictMcqPalette)})`);
  await captureScreenshot("ict-database-mcq-blue.png");
  await evaluate("document.querySelector('[data-live-authored-step]').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  await waitFor("getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor === 'rgb(88, 204, 2)'", "the correct-answer Continue button success color");
  assert(await evaluate("document.querySelector('[data-ui-lab-check-label]').textContent === 'متابعة' && document.querySelector('[data-ui-lab-feedback]').classList.contains('is-correct')"), "a correct ICT answer must reveal an Arabic green Continue action");
  await evaluate("document.querySelector('.lesson-back').click(); document.querySelector('[data-auth-flow=register]').click()");
  await waitFor("Boolean(document.querySelector('[data-register-form]'))", "direct account creation");
  assert(await evaluate("document.querySelectorAll('[data-onboarding-step]:not([hidden])').length === 1 && document.querySelector('[data-onboarding-step=\"intro\"]:not([hidden])') && document.querySelector('[data-onboarding-step=\"intro\"] img').src.endsWith('/assets/mascot/rocky-wave.svg') && document.querySelector('[data-onboarding-back] [data-back-label]').textContent === 'الرئيسية' && !document.querySelector('.visitor-language')"), "registration must start with Rocky's greeting, a labeled Home control, and no language control");
  await captureScreenshot("account-register.png");
  await evaluate("document.querySelector('[data-onboarding-step=\"intro\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) input[name=username]'))", "Rocky's calm name question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"] img'))", "Rocky's calm standing image");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"0\"] img').src.endsWith('/assets/mascot/rocky-standing-still.svg')"), "the name question must use Rocky's calm standing animation");
  await evaluate("document.querySelector('[data-register-form]').requestSubmit()");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) [data-field-error]:not([hidden])') !== null"), "registration must validate the current question without exposing later fields");
  await evaluate(`(() => { const form=document.querySelector('[data-register-form]'); form.elements.username.value='student-new'; document.querySelector('[data-onboarding-step="0"] [data-step-next]').click(); })()`);
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"1\"]:not([hidden])'))", "the curriculum question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"1\"] .rocky-pointer-svg'))", "Rocky's interactive curriculum pose");
  assert(await evaluate("document.querySelector('[data-onboarding-back] [data-back-label]').textContent === 'السابق'"), "later onboarding steps must label the back action as السابق");
  await evaluate(`(() => {
    const mascot=document.querySelector('[data-onboarding-step="1"] [data-rocky-pointer-track]');
    const box=mascot.getBoundingClientRect();
    window.dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth-4,clientY:box.top+box.height/2}));
  })()`);
  await delay(420);
  const rockyFollow = await evaluate(`(() => {
    const svg=document.querySelector('[data-onboarding-step="1"] .rocky-pointer-svg');
    const offset=(part) => Math.abs(Number.parseFloat(svg.querySelector('[data-part="'+part+'"]').style.translate) || 0);
    return {body:offset('body'),leftArm:offset('arm-left'),rightArm:offset('arm-right')};
  })()`);
  assert(rockyFollow.body > 8 && rockyFollow.leftArm > 8 && rockyFollow.rightArm > 8, `Rocky's shoulders must follow his tracked body movement (${JSON.stringify(rockyFollow)})`);
  await captureScreenshot("account-curriculum.png");
  assert(await evaluate("[...document.querySelectorAll('.onboarding-choice-grid--maps img')].length === 2 && [...document.querySelectorAll('.onboarding-choice-grid--maps img')].every((image) => image.complete && image.naturalWidth > 0)"), "curriculum choices must load the accurate Gaza and Palestine SVG maps");
  await evaluate("document.querySelector('input[name=curriculum][value=gaza]').click(); document.querySelector('[data-onboarding-step=\"1\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"2\"]:not([hidden])'))", "the academic path question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"2\"] .rocky-pointer-svg'))", "Rocky's interactive academic-path pose");
  assert(await evaluate(`(() => {
    const svgs=[...document.querySelectorAll('.rocky-pointer-svg')];
    const ids=svgs.flatMap((svg) => [...svg.querySelectorAll('[id]')].map((element) => element.id));
    const visibleBodyUse=document.querySelector('[data-onboarding-step="2"] .rocky-pointer-svg [data-part="body"] use');
    return ids.length === new Set(ids).size && visibleBodyUse?.getAttribute('href')?.startsWith('#rocky-pointer-2-');
  })()`), "each inline Rocky must own uniquely scoped SVG definitions");
  await captureScreenshot("account-path.png");
  await captureScreenshot("account-path-svg.png");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"2\"]').textContent.includes('العلمي') && document.querySelector('[data-onboarding-step=\"2\"]').textContent.includes('الأدبي')"), "the path question must offer العلمي and الأدبي in Arabic");
  assert(await evaluate("[...document.querySelectorAll('[data-onboarding-step=\"2\"] .path-choice__visual img')].length === 4 && [...document.querySelectorAll('[data-onboarding-step=\"2\"] .path-choice__visual img')].every((image) => image.complete && image.naturalWidth > 0)"), "academic path choices must preload pale and saturated generated illustrations");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.documentElement.scrollWidth <= innerWidth && [...document.querySelectorAll('[data-onboarding-step=\"2\"] .onboarding-choice--path')].every((choice) => { const box=choice.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; })"), "academic path choices must stay contained on mobile");
  await captureScreenshot("account-path-mobile.png");
  await captureScreenshot("account-path-svg-mobile.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('input[name=path][value=scientific]').click()");
  await waitFor("getComputedStyle(document.querySelector('.onboarding-choice--scientific .path-choice__art--saturated')).opacity === '1'", "the selected path artwork transition");
  assert(await evaluate(`(() => { const choice=document.querySelector('.onboarding-choice--scientific'); const title=choice.querySelector('strong'); const otherTitle=document.querySelector('.onboarding-choice--literary strong'); return getComputedStyle(choice).borderColor !== 'rgb(88, 204, 2)' && getComputedStyle(title).color === getComputedStyle(otherTitle).color && getComputedStyle(choice.querySelector('.path-choice__art--pale')).opacity === '0' && getComputedStyle(choice.querySelector('.path-choice__art--saturated')).opacity === '1'; })()`), "selecting a path must only reveal its saturated artwork without a green border or title treatment");
  await captureScreenshot("account-path-selected.png");
  await evaluate("document.querySelector('[data-onboarding-step=\"2\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"3\"]:not([hidden])'))", "the required email question");
  assert(await evaluate("document.querySelector('input[name=email]').required && !document.querySelector('[data-skip-field=email]')"), "email must be required by the current account decision");
  await captureScreenshot("account-email-required.png");
  await evaluate("document.querySelector('input[name=email]').value='student-new@example.com'; document.querySelector('[data-onboarding-step=\"3\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"4\"]:not([hidden])'))", "the password question after email");
  await evaluate("document.querySelector('input[name=password]').value='abc12345'; document.querySelector('[data-onboarding-step=\"4\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"5\"]:not([hidden])'))", "the optional phone question");
  assert(await evaluate("!document.querySelector('input[name=phone]').required && document.querySelector('[data-onboarding-step=\"5\"]').textContent.includes('اختيارية') && document.querySelector('[data-skip-field=phone]').textContent.includes('ليس لدي رقم هاتف')"), "phone number must offer an explicit no-phone option");
  await captureScreenshot("account-phone-optional.png");
  await evaluate("document.querySelector('[data-skip-field=phone]').click()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('.topbar-auth-member').hidden", "free-account return to the existing Learn page");
  assert(await evaluate("!document.querySelector('[data-verification-form]') && !document.body.textContent.includes('رمز تحقق')"), "account creation must have no verification-code step");
  assert(await evaluate("document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new') && !document.querySelector('.dashboard-resume') && document.querySelectorAll('.dashboard-stat').length === 2 && document.querySelectorAll('[data-subject-progress]:not([hidden])').length === 1 && document.querySelectorAll('[data-subject-progress].is-empty:not([hidden])').length === 1 && document.querySelectorAll('.subject-card--locked:disabled').length === 7 && document.querySelector('.subject-card[data-subject=ict] [data-subject-action]').textContent === 'ابدأ الدرس 1'"), "a new learner must see the focused dashboard with seven locked subjects and a direct ICT lesson action");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("location.search === '?subject=ict' && Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap from the signed-in material card");
  assert(await evaluate("!document.querySelector('.markdown-authored-content') && document.querySelectorAll('.roadmap-lesson').length === 5"), "clicking the ICT material must show its map instead of opening a lesson directly");
  await evaluate("document.querySelector('.roadmap-lesson').click()");
  await waitFor("!document.querySelector('[data-roadmap-bubble]').hidden", "the first lesson information bubble for the signed-in learner");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("document.querySelector('.markdown-authored-content .markdown-rendered h1')?.textContent === 'إدارة قواعد البيانات'", "the lesson selected from the ICT roadmap");
  const signedInLessonCenter = await evaluate(`(() => { const content=document.querySelector('.markdown-authored-content').getBoundingClientRect(); const rtlScrollbarWidth=innerWidth-document.documentElement.clientWidth; return { contentCenter:content.left + content.width / 2, usableViewportCenter:(innerWidth + rtlScrollbarWidth) / 2, pageMarginRight:getComputedStyle(document.querySelector('main.page')).marginRight }; })()`);
  assert(Math.abs(signedInLessonCenter.contentCenter - signedInLessonCenter.usableViewportCenter) <= 6 && signedInLessonCenter.pageMarginRight === "0px", `the signed-in ICT lesson must be centered in the usable viewport (${JSON.stringify(signedInLessonCenter)})`);
  assert(await evaluate("getComputedStyle(document.querySelector('.dashboard-side-rail')).display === 'none'"), "opening a subject must hide the left dashboard rail");
  assert(await evaluate("document.querySelector('.lesson-top-title').getAttribute('aria-valuemax') === '24' && !document.querySelector('.lesson-label')?.textContent.includes('DAY 1')"), "the personalized Start lesson action must open the subject lesson without a day-based identity");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap after closing its lesson");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('.lesson-view').classList.contains('is-visible')", "the Learn page after leaving the ICT roadmap");
  await evaluate("document.querySelector('[data-auth-sign-out]').click(); document.querySelector('[data-auth-flow=sign-in]').click()");
  await waitFor("Boolean(document.querySelector('[data-sign-in-form]'))", "the simplified sign-in form");
  assert(await evaluate("[...document.querySelectorAll('[data-sign-in-form] input')].every((input) => input.offsetWidth > 400)"), "sign-in fields must fill the native account card");
  await captureScreenshot("account-sign-in.png");
  await evaluate(`(() => { const form=document.querySelector('[data-sign-in-form]'); form.elements.identifier.value='student-new'; form.elements.password.value='abc12345'; form.requestSubmit(); })()`);
  await waitFor("location.search === '?page=learn' && document.querySelector('[data-account-label]').textContent.includes('مجاني')", "restored free-account Learn page");
  assert(await evaluate("document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new') && document.querySelectorAll('.dashboard-stat').length === 2"), "a returning learner must restore the account created through the backend");
  const dashboardShell = await evaluate(`(() => {
    const navigation=document.querySelector('.topbar-wrap').getBoundingClientRect();
    const dashboard=document.querySelector('[data-learner-dashboard]').getBoundingClientRect();
    const railElement=document.querySelector('.dashboard-side-rail');
    const rail=railElement.getBoundingClientRect();
    const railStyle=getComputedStyle(railElement);
    return {navigationLeft:navigation.left,navigationRight:navigation.right,navigationTop:navigation.top,navigationBottom:navigation.bottom,dashboardLeft:dashboard.left,dashboardRight:dashboard.right,railLeft:rail.left,railRight:rail.right,railPosition:railStyle.position,railOverflow:railStyle.overflowY,questCount:document.querySelectorAll('.dashboard-quest').length};
  })()`);
  assert(dashboardShell.navigationLeft > dashboardShell.dashboardRight && dashboardShell.navigationTop === 0 && dashboardShell.navigationBottom === 900, `signed-in navigation must occupy the right rail instead of the top (${JSON.stringify(dashboardShell)})`);
  assert(dashboardShell.railRight < dashboardShell.dashboardLeft && dashboardShell.questCount === 3, `challenges and quests must occupy the left rail (${JSON.stringify(dashboardShell)})`);
  assert(dashboardShell.railPosition === "sticky" && dashboardShell.railOverflow === "auto", `the left dashboard rail must stay visible and own its vertical scrolling (${JSON.stringify(dashboardShell)})`);
  await evaluate("window.scrollTo({ top:document.documentElement.scrollHeight, behavior:'auto' })");
  await delay(100);
  const scrolledRailTop = await evaluate("Math.round(document.querySelector('.dashboard-side-rail').getBoundingClientRect().top)");
  assert(scrolledRailTop === 32, `the left dashboard rail must remain fixed while the subject list scrolls (top ${scrolledRailTop})`);
  await evaluate("window.scrollTo({ top:0, behavior:'auto' })");
  await captureScreenshot("learner-dashboard.png");
  await navigate(`${appUrl}?page=learn`);
  await waitFor("!document.querySelector('.topbar-auth-member').hidden && document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new')", "hard-refresh session restoration");
  await evaluate("document.querySelector('[data-auth-sign-out]').click()");
  await waitFor("!document.querySelector('.topbar-auth-guest').hidden", "backend sign out");
  await evaluate("document.querySelector('[data-auth-flow=register]').click()");
  await waitFor("Boolean(document.querySelector('[data-register-form]'))", "registration duplicate check");
  await evaluate("document.querySelector('[data-onboarding-step=\"intro\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) input[name=username]'))", "the duplicate-check name question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"] img'))", "the duplicate-check name transition");
  await evaluate("document.querySelector('input[name=username]').value='student-new'; document.querySelector('[data-onboarding-step=\"0\"] [data-step-next]').click()");
  await waitFor("document.querySelector('[data-field-error=username]')?.textContent.includes('مستخدم بالفعل')", "the immediate duplicate username error");
  assert(await evaluate("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden])'))"), "a duplicate username must be reported before leaving the username step");
  await navigate(`${appUrl}?page=learn`);

  await navigate(`${appUrl}?page=learn&prototype=1`);
  await waitFor("document.body.dataset.prototypeScenario === 'visitor-new'", "the opt-in development-only prototype scenario tools");
  assert(await evaluate("Boolean(document.querySelector('.prototype-tools') && document.querySelector('#prototype-tools-styles'))"), "development must load the prototype switcher and its owned styles");
  await evaluate(`(() => { const toggle = document.querySelector('.prototype-tools__toggle'); toggle.click(); const select = document.querySelector('#prototype-scenario'); select.value = 'student-expired'; select.dispatchEvent(new Event('change', { bubbles:true })); })()`);
  await waitFor("document.body.dataset.prototypeScenario === 'student-expired'", "a selected prototype fixture state");
  assert(await evaluate("document.body.dataset.prototypeActor === 'student' && sessionStorage.getItem('tawjihi:prototype-scenario') === 'student-expired'"), "the prototype service must expose and retain the selected fixture scenario");
  await evaluate("document.querySelector('[data-prototype-reset]').click(); document.querySelector('.prototype-tools').dispatchEvent(new KeyboardEvent('keydown', { key:'Escape', bubbles:true }))");
  assert(await evaluate("document.querySelector('.prototype-tools__panel').hidden && document.activeElement === document.querySelector('.prototype-tools__toggle')"), "Escape must close the prototype tools and restore focus");

  await navigate(`${appUrl}?page=learn`);
  await waitFor("document.querySelectorAll('.subject-card').length === 8 && !document.body.classList.contains('product-flow-active')", "the legacy subject scaffold");
  const course = await evaluate(`(() => ({
    subjects:[...document.querySelectorAll('.subject-card')].map((card) => ({ id:card.dataset.subject, status:card.dataset.status, name:card.querySelector('h2')?.textContent, tag:card.tagName, disabled:card.disabled })),
    days:document.querySelectorAll('[data-day]').length,
    overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
    heading:document.querySelector('h1')?.textContent,
    mapImages:document.querySelectorAll('.subject-map img').length,
  }))()`);
  assert(course.subjects.length === 8, `course map rendered ${course.subjects.length} subjects instead of 8`);
  assert(course.subjects.filter(({ status, disabled }) => status === "locked" && disabled).length === 7, "seven non-ICT subjects must be locked and disabled");
  assert(course.subjects.find(({ id }) => id === "ict")?.status === "in-progress" && !course.subjects.find(({ id }) => id === "ict")?.disabled, "ICT must remain available");
  assert(course.subjects.every(({ tag }) => tag === "BUTTON"), "every subject card must retain button semantics");
  assert(course.days === 0, `course map must not render day controls; found ${course.days}`);
  assert(course.overflow === false, "desktop course map has horizontal overflow");
  assert(course.heading?.includes("المواد الدراسية"), "subject map is missing its accessible page heading");
  assert(course.mapImages === 7 && await evaluate("[...document.querySelectorAll('.subject-map img')].every((image) => image.getAttribute('src') === 'assets/icons/subject-lock.svg' && image.complete && image.naturalWidth > 0)"), "each locked subject must render the minimal lock SVG and no other card artwork");
  assert(!await evaluate("Boolean(document.querySelector('.course-units [data-design-system]'))"), "the learning map must not expose development references");
  const initialResources = await evaluate("performance.getEntriesByType('resource').map(({ name }) => name)");
  assert(!initialResources.some((url) => url.includes("/src/styles/design-system") || url.includes("/src/ui/design-system-view.js")), "the normal learning path must not preload Design System resources");
  const lessonStepState = await evaluate(`(async () => {
    const [{ defineLesson }, { renderLesson }] = await Promise.all([import('/src/domain/lesson.js'), import('/src/ui/lesson-view.js')]);
    const host = document.createElement('div');
    document.body.append(host);
    const lesson = defineLesson({ title:'Test quest', summary:'Exercise progress mapping.', steps:[
      { id:'first-step', title:'First step', body:'First body.' },
      { id:'second-step', title:'Second step', body:'Second body.' },
    ] });
    let latestProgress = null;
    const rendered = renderLesson(host, 1, lesson, { onProgress:(progress) => { latestProgress = progress; } });
    host.querySelector('[data-flow-next]').click();
    const state = { visibleStep:host.querySelector('[data-lesson-step]:not([hidden])').dataset.lessonStep, completedStepIds:latestProgress.completedStepIds };
    rendered.destroy();
    host.remove();
    return state;
  })()`);
  assert(lessonStepState.visibleStep === "second-step", "continuing must reveal exactly the next lesson step");
  assert(lessonStepState.completedStepIds[0] === "first-step", "lesson progress events must use stable step ids");

  await evaluate("document.querySelector('[data-subject=\"ict\"]').click()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')", "the ICT roadmap view");
  assert(await evaluate("getComputedStyle(document.querySelector('.lesson-top-title')).display === 'none' && document.querySelectorAll('.roadmap-unit').length === 3"), "ICT must open directly on its three-unit roadmap without the repeated subject heading");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('.lesson-view').classList.contains('is-visible')", "return from the ICT status view");
  await waitFor("document.activeElement === document.querySelector('[data-subject=\"ict\"]')", "focus returning to the ICT subject button");

  await navigate(`${appUrl}?day=37`);
  await waitFor("Boolean(document.querySelector('.visitor-landing'))", "obsolete day route returning to visitor entry");
  assert((await evaluate("location.search")) === "", "obsolete day routes must normalize to visitor entry");
  assert(await evaluate("!document.querySelector('.lesson-view').classList.contains('is-visible')"), "obsolete day routes must not open lesson content");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  await navigate(appUrl);
  await waitFor("Boolean(document.querySelector('.visitor-landing'))", "mobile visitor entry");
  const mobileEntry = await evaluate(`(() => ({
    overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
    columns:getComputedStyle(document.querySelector('.visitor-landing')).gridTemplateColumns.split(' ').length,
    illustrationContained:(() => { const box=document.querySelector('.visitor-illustration-placeholder').getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; })(),
    legacyVisible:getComputedStyle(document.querySelector('.topbar-wrap')).display !== 'none',
  }))()`);
  assert(!mobileEntry.overflow && mobileEntry.columns === 1 && mobileEntry.illustrationContained, "mobile visitor entry must fit one clean column without horizontal overflow");
  assert(!mobileEntry.legacyVisible, "mobile entry must hide the Learn-page chrome until selection is complete");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1280, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  simulateStaticDocument = true;
  await navigate(`${appUrl}?page=more&static=1`);
  await waitFor("document.querySelectorAll('.subject-card').length === 8", "the raw-static More page");
  const staticReference = await evaluate(`(() => ({
    tabs:document.querySelectorAll('[data-more-tab]').length,
    prototypeTools:document.querySelectorAll('.prototype-tools').length,
    resources:performance.getEntriesByType('resource').map(({ name }) => name),
  }))()`);
  assert(staticReference.tabs === 3, "raw-static More must expose all three empty tool tabs");
  assert(staticReference.prototypeTools === 0, "raw-static output must not expose development prototype tools");
  assert(!staticReference.resources.some((url) => url.includes("/src/styles/design-system") || url.includes("/src/ui/design-system-view.js")), "raw-static output must not load Design System resources");
  simulateStaticDocument = false;

  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1280, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await navigate(`${appUrl}?page=more`);
  await waitFor("document.querySelector('.more-tabs:not([hidden]) [data-more-tab=\"design-system\"]')", "tool tabs in More");
  assert(await evaluate(`(() => {
    const tabs = [...document.querySelectorAll('[data-more-tab]')];
    const panels = [...document.querySelectorAll('.more-tab-panel')];
    return tabs.map((tab) => tab.textContent.trim()).join('|') === 'UI LAB|SHIP READY|DESIGN SYSTEM'
      && panels.length === 3
      && panels.every((panel) => !panel.textContent.trim() && panel.children.length === 0)
      && location.search === '?page=more';
  })()`), "More must start with English tabs and empty lazy panels");
  await evaluate("document.querySelector('[data-more-tab=\"ui-lab\"]').click()");
  assert(await evaluate("!document.querySelector('#ui-lab-panel').textContent.trim() && document.querySelector('#ui-lab-panel').children.length === 0"), "UI Lab must remain empty");
  await verifyShipReadyTemplates({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor });
  await evaluate("document.querySelector('[data-more-tab=\"design-system\"]').click()");
  await waitFor("document.querySelector('.ds-hero')", "restored Design System gallery");
  const restoredDesignSystem = await evaluate(`(() => ({
    route:location.search,
    title:document.querySelector('.ds-hero h1')?.textContent,
    sections:document.querySelectorAll('.ds-section').length,
    hasCodeLab:Boolean(document.querySelector('[data-code-lab]')),
    resources:performance.getEntriesByType('resource').map(({ name }) => name),
  }))()`);
  assert(restoredDesignSystem.route === "?view=design-system", "opening the More entry must use the canonical Design System route");
  assert(restoredDesignSystem.title === "Full-Stack Quest Design System" && restoredDesignSystem.sections >= 6, "the expandable Design System must render its complete reference sections");
  assert(restoredDesignSystem.hasCodeLab, "the restored Design System must retain its interactive code lab");
  assert(restoredDesignSystem.resources.some((url) => url.includes("/src/styles/design-system.css")), "the restored Design System must load its modular stylesheet");
  assert(await evaluate("document.querySelectorAll('[data-markdown-feature]').length >= 10"), "the restored Design System must retain its Markdown-style lesson reference");
  assert(await evaluate("Boolean(document.querySelector('.ds-section-toggle[aria-expanded]'))"), "the restored Design System must retain expandable sections");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?page=more'", "return from Design System to More");
  await waitFor("document.activeElement === document.querySelector('[data-more-tab=\"design-system\"]')", "Design System tab focus restoration");
  assert(await evaluate("document.activeElement === document.querySelector('[data-more-tab=\"design-system\"]')"), "closing the Design System must restore focus to its More tab");

  assert(browserErrors.length === 0, `browser reported errors: ${browserErrors.join(" | ")}`);
  assert(failedLocalRequests.length === 0, `browser requests failed: ${failedLocalRequests.join(" | ")}`);
  if (allowExternalAssets) assert(failedExternalRequests.length === 0, `external browser resources failed: ${failedExternalRequests.join(" | ")}`);
  assert(serverErrors.filter(Boolean).length === 0, `development server reported errors: ${serverErrors.filter(Boolean).join(" | ")}`);

  if (failures.length) {
    console.error(`Browser smoke tests failed:\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  } else {
    console.log("Browser smoke tests passed: route state, hidden development reference boundaries, lesson focus, modal containment, Design System return focus, responsive behavior, reduced motion, and server recovery.");
  }

  await cdp.send("Browser.close");
} catch (error) {
  if (error instanceof ScreenshotCaptureComplete) console.log(`Captured focused screenshot: ${error.filename}`);
  else throw error;
} finally {
  await terminateProcess(chromeProcess);
  await terminateProcess(serverProcess);
  if (profileDirectory) await rm(profileDirectory, { recursive:true, force:true, maxRetries:5, retryDelay:100 });
}
