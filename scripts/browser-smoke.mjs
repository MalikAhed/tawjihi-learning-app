import { CdpPipe, delay, terminateProcess, findChrome, getAvailablePort, rawRequest, waitForServer } from "./browser-session.mjs";
import { verifyAccountJourney } from "./browser-accounts.mjs";
import { verifyDeveloperWorkspace } from "./browser-developer-workspace.mjs";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
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

class DeveloperSmokeComplete extends Error {}
class MotionSmokeComplete extends Error {}
class RoadmapSmokeComplete extends Error {}
class ScreenshotCaptureComplete extends Error { constructor(filename) { super(filename); this.filename = filename; } }
function assert(condition, message) {
  if (!condition) failures.push(message);
}
let serverProcess;
let chromeProcess;
let profileDirectory;
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
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source:"window.__FULL_STACK_QUEST_DEV__ = !new URLSearchParams(location.search).has('static');" }, sessionId);
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
        // Keep the test page stable while other workspace processes edit files.
        html = html.replace('<script src="/__codex_live_reload.js"></script>', "");
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
      if (await evaluate(`Boolean(${expression})`)) {
        await evaluate(`Promise.all(document.getAnimations().filter(a => a.animationName === 'app-component-arrive' || a.effect.getTiming().duration === 280).map(a => a.finished.catch(() => {})))`);
        return;
      }
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
  if (process.env.BROWSER_DEVELOPER_ONLY === "1") {
    await verifyDeveloperWorkspace({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot });
    await verifyShipReadyTemplates({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor });
    assert(browserErrors.length === 0, `browser errors: ${browserErrors.join(' | ')}`);
    if (failures.length) throw new Error(failures.join('\n'));
    throw new DeveloperSmokeComplete();
  }
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
  for (const page of ["quests", "shop", "challenges", "learn", "shop", "learn"]) {
    assert(await evaluate(`(() => {
      document.querySelector('[data-page="${page}"]').click();
      const target = document.querySelector('${page === "learn" ? ".course-units" : ".coming-soon"}');
      return target.getAnimations().filter(a => a.effect.getTiming().duration === 280).length === 1;
    })()`), `${page} must retain one entrance during rapid tab navigation`);
  }
  await cdp.send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] }, sessionId);
  assert(await evaluate(`(() => {
    document.querySelector('[data-page="shop"]').click();
    return document.querySelector('.coming-soon').getAnimations().length === 0;
  })()`), "reduced motion must suppress tab entrances");
  await evaluate("document.querySelector('[data-page=learn]').click()");
  await cdp.send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"no-preference" }] }, sessionId);
  await captureScreenshot("subjects-home.png");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("location.search === '?subject=ict' && Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap");
  assert(await evaluate("document.querySelectorAll('.roadmap-unit').length === 3 && document.querySelectorAll('.roadmap-lesson-group').length === 5 && !document.querySelector('.roadmap-whole-entry') && Boolean(document.querySelector('.lesson-back__icon')) && document.querySelector('.lesson-back').textContent.trim().length > 0 && getComputedStyle(document.querySelector('.lesson-top-title')).display === 'none' && !document.querySelector('.subject-roadmap').textContent.includes('خريطة المادة') && !document.querySelector('.subject-roadmap').textContent.includes('محتوى تجريبي')"), "ICT must begin with the three textbook unit maps and five lessons, plus a labeled Back control whose arrow sits on the right and faces right");
  assert(await evaluate("[...document.querySelectorAll('.roadmap-unit progress')].every(bar=>bar.value === 0) && !document.querySelector('.subject-roadmap').textContent.includes('الدرس كاملًا')"), "a fresh roadmap must have zero progress and no full-lesson button");
  assert(await evaluate("!document.querySelector('.subject-roadmap details') && [...document.querySelectorAll('[data-roadmap-part]')].every(button=>button.getBoundingClientRect().width > 0) && document.querySelector('[data-roadmap-part=access-basics]').getBoundingClientRect().width >= 100 && Math.abs(document.querySelector('[data-roadmap-part=access-basics]').getBoundingClientRect().left - document.querySelector('[data-roadmap-part=tables-and-types]').getBoundingClientRect().left) > 40"), "the curriculum must remain an always-visible winding map of oval stops");
  await captureScreenshot("ict-roadmap.png");
  assert(await evaluate("!document.querySelector('.subject-roadmap').textContent.includes('ابدأ التعلّم') && [...document.querySelectorAll('.roadmap-connector path')].every(path=>{const start=path.getPointAtLength(0);const end=path.getPointAtLength(path.getTotalLength());return path.getAttribute('pathLength') === '100' && start.y >= 6 && end.y <= 42})"), "map labels must omit the redundant start prompt and connector ends must leave room for complete rounded caps");
  const ovalStop = await evaluate(`(() => { const button=document.querySelector('[data-roadmap-part=access-basics]'); const bounds=button.getBoundingClientRect(); const face=button.querySelector('.roadmap-part-number').getBoundingClientRect(); return { x:bounds.left+bounds.width/2, y:bounds.top+bounds.height/2, top:bounds.top, faceTop:face.top, baseTop:getComputedStyle(button,'::before').top, width:face.width, height:face.height }; })()`);
  assert(ovalStop.width / ovalStop.height > 1.2 && ovalStop.width / ovalStop.height < 1.45, "stops must have broad oval top faces");
  assert(await evaluate("[...document.querySelectorAll('.roadmap-part-copy,.roadmap-part-status')].every(label=>getComputedStyle(label).backgroundColor === 'rgba(0, 0, 0, 0)') && [...document.querySelectorAll('.roadmap-connector')].every(line=>line.getBoundingClientRect().top >= line.closest('.roadmap-stop').querySelector('.roadmap-node').getBoundingClientRect().bottom + 8)"), "labels must have no white backing and every connector must start below the text");
  await cdp.send("Input.dispatchMouseEvent", { type:"mouseMoved", x:ovalStop.x, y:ovalStop.y }, sessionId);
  await waitFor(`Math.abs(document.querySelector('[data-roadmap-part=access-basics] .roadmap-part-number').getBoundingClientRect().top - ${ovalStop.faceTop} - 4) < 0.2`, "the shallow hover press");
  assert(await evaluate(`document.querySelector('[data-roadmap-part=access-basics]').getBoundingClientRect().top === ${ovalStop.top} && getComputedStyle(document.querySelector('[data-roadmap-part=access-basics]'),'::before').top === ${JSON.stringify(ovalStop.baseTop)}`), "hover must leave the base fixed");
  await captureScreenshot("ict-stop-hover.png");
  await cdp.send("Input.dispatchMouseEvent", { type:"mousePressed", x:ovalStop.x, y:ovalStop.y, button:"left", clickCount:1 }, sessionId);
  await waitFor(`Math.abs(document.querySelector('[data-roadmap-part=access-basics] .roadmap-part-number').getBoundingClientRect().top - ${ovalStop.faceTop} - 12) < 0.2`, "the full click press");
  assert(await evaluate(`document.querySelector('[data-roadmap-part=access-basics]').getBoundingClientRect().top === ${ovalStop.top} && getComputedStyle(document.querySelector('[data-roadmap-part=access-basics]'),'::before').top === ${JSON.stringify(ovalStop.baseTop)}`), "clicking must press only the top, all the way down to the fixed base");
  await captureScreenshot("ict-stop-pressed.png");
  await cdp.send("Input.dispatchMouseEvent", { type:"mouseReleased", x:ovalStop.x, y:ovalStop.y, button:"left", clickCount:1 }, sessionId);
  await evaluate("document.querySelector('[data-bubble-close]').click()");
  await cdp.send("Input.dispatchMouseEvent", { type:"mouseMoved", x:0, y:0 }, sessionId);

  assert(await evaluate("document.querySelectorAll('.roadmap-lesson-divider').length === 5 && document.querySelectorAll('[data-roadmap-part]').length === 28"), "the textbook's five lessons must be separated into 28 named parts");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click()");
  assert(await evaluate("document.querySelector('[data-bubble-start]').textContent === 'ابدأ الجزء' && document.querySelector('[data-bubble-summary]').textContent.includes('3–5')"), "an available part must show its book pages and a part-specific action");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("document.querySelector('.current-view-title')?.textContent === 'برامج إدارة البيانات وبيئة Access' && document.querySelector('.markdown-rendered h1')?.textContent.includes('إدارة قواعد البيانات')", "the selected part teaching content");
  assert(await evaluate("Number(document.querySelector('.lesson-top-title').getAttribute('aria-valuemax')) < 24 && document.querySelector('.markdown-rendered h1')?.textContent.includes('إدارة قواعد البيانات')"), "a part must open its own teaching steps, not restart the whole lesson");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "the roadmap after closing a part");
  const lessonNodeColor = await evaluate("getComputedStyle(document.querySelector('[data-roadmap-part=access-basics]')).backgroundColor");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click()");
  await waitFor("!document.querySelector('[data-roadmap-bubble]').hidden", "the lesson information bubble");
  assert(await evaluate(`document.querySelector('[data-bubble-lesson]').textContent === 'برامج إدارة البيانات وبيئة Access' && document.activeElement === document.querySelector('[data-bubble-start]') && getComputedStyle(document.querySelector('[data-roadmap-part=access-basics]')).backgroundColor === ${JSON.stringify(lessonNodeColor)}`), "a map node must remain visually stable and open a nearby lesson brief before starting");
  assert(await evaluate("(() => { const bubble=document.querySelector('[data-roadmap-bubble]'); const r=bubble.getBoundingClientRect(); return r.left >= 0 && r.right <= document.documentElement.clientWidth && getComputedStyle(bubble).position === 'absolute' && getComputedStyle(document.querySelector('[data-bubble-start]')).backgroundColor === 'rgb(88, 204, 2)'; })()"), "desktop part details must be a contained floating bubble with the light-green start action");
  await captureScreenshot("ict-lesson-bubble.png");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("document.querySelector('.markdown-authored-content .markdown-rendered h1')?.textContent === 'إدارة قواعد البيانات'", "the published ICT database lesson");
  assert(await evaluate("document.querySelector('.lesson-top-title').getAttribute('aria-valuemax') === '7' && document.querySelector('.current-view-title').textContent === 'برامج إدارة البيانات وبيئة Access' && !document.querySelector('[data-roadmap-preview]')"), "starting a roadmap part must open only its seven authored steps");
  assert(await evaluate("getComputedStyle(document.querySelector('.markdown-authored-content')).direction === 'rtl'"), "the Arabic ICT lesson must inherit RTL reading direction");
  assert(await evaluate(`(() => { const primary=document.querySelector('.level-action--primary'); const back=document.querySelector('[data-template-back]'); const shortcut=primary.querySelector('kbd'); const group=document.querySelector('.level-layout-action-group').getBoundingClientRect(); const primaryRect=primary.getBoundingClientRect(); const backRect=back.getBoundingClientRect(); const shortcutRect=shortcut.getBoundingClientRect(); const shortcutStyle=getComputedStyle(shortcut); return primary.textContent.includes('متابعة') && back.textContent === 'السابق' && document.querySelector('.level-layout-kicker').textContent === 'تعلّم' && backRect.left > innerWidth / 2 && primaryRect.right < innerWidth / 2 && primaryRect.width === 240 && primaryRect.height === 52 && backRect.width === 128 && backRect.height === 52 && shortcutRect.width === 62 && shortcutRect.height === 34 && shortcut.textContent.includes('ENTER') && !shortcut.textContent.includes('إدخال') && shortcutStyle.backgroundColor === 'rgb(255, 255, 255)' && shortcutStyle.color === 'rgb(75, 85, 99)' && shortcutStyle.direction === 'ltr' && !document.querySelector('.prototype-tools'); })()`), "the Arabic lesson controls must use stable geometry and a solid-white English ENTER key with dark-grey text");
  const ictLessonPalette = await evaluate(`(() => ({
    continueBackground:getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor,
    continueText:getComputedStyle(document.querySelector('.level-action--primary')).color,
    progressFill:getComputedStyle(document.querySelector('.lesson-top-title'),'::after').backgroundImage,
  }))()`);
  assert(ictLessonPalette.continueBackground === "rgb(88, 204, 2)" && ictLessonPalette.continueText === "rgb(21, 60, 8)" && ictLessonPalette.progressFill.includes("linear-gradient") && ictLessonPalette.progressFill.includes("255, 212, 59"), `the lesson must use a green primary action and glossy yellow progress (${JSON.stringify(ictLessonPalette)})`);
  await captureScreenshot("ict-database-lesson-desktop.png");
  if (process.env.BROWSER_MOTION_ONLY === "1") {
    assert(await evaluate(`(() => {
      document.querySelector('[data-template-primary]').click();
      return document.querySelector('#lesson-content').getAnimations().some(a => a.effect.getTiming().duration === 280);
    })()`), "lesson steps must use shared motion");
    throw new MotionSmokeComplete();
  }

  await evaluate("document.querySelector('[data-test-lesson-pass]').click()");
  assert(await evaluate("document.querySelector('.subject-completion').dataset.animationState === 'running' && document.querySelector('.subject-gain--xp strong').textContent === '+0 XP' && document.querySelector('.subject-gain--progress strong').textContent === '0%'"), "ending gains and progress must start at their previous values");

  await waitFor("document.querySelector('.subject-completion-rocky')?.complete && document.querySelector('.subject-completion-rocky')?.naturalWidth > 0", "test pass ending preview");
  assert(await evaluate("document.querySelector('.subject-completion-rocky').src.endsWith('rocky-happy-jump.svg')"), "Rocky must begin the ending with his happy jump");
  await waitFor("document.querySelector('.subject-completion')?.dataset.animationState === 'complete'", "animated ending counters finish");
  assert(await evaluate("!document.querySelector('.subject-completion-preview') && getComputedStyle(document.querySelector('.lesson-top-title')).display === 'none' && document.querySelector('.subject-gain--xp strong').textContent === '+10 XP' && document.querySelector('.subject-completion-rocky').complete && document.querySelector('.subject-completion-rocky').naturalWidth > 0"), "preview must show sample gains and loaded happy Rocky");
  assert(await evaluate("document.querySelectorAll('.subject-gain').length === 2 && !document.querySelector('.subject-completion-progress') && document.querySelector('.subject-gain--progress strong').textContent === '4%'"), "minimal ending has two reward cards and animated subject progress");
  await waitFor("document.querySelector('.subject-completion-rocky').src.endsWith('rocky-standing-still.svg') && document.querySelector('.subject-completion-rocky').complete", "happy jump transitions into breathing and looking around");
  assert(await evaluate("document.querySelector('.subject-completion-rocky').src.endsWith('rocky-standing-still.svg') && !document.querySelector('.completion-spark')"), "ending Rocky must use the breathing and looking-around idle without stars");
  assert(await evaluate(`(() => { const footer=document.querySelector('.lesson-shell--completion .level-layout-actions'); const back=footer.querySelector('[data-template-back]').getBoundingClientRect(); const next=footer.querySelector('[data-template-primary]').getBoundingClientRect(); return getComputedStyle(footer).borderTopWidth === '0px' && back.left > innerWidth/2 && next.right < innerWidth/2 && getComputedStyle(footer.querySelector('.level-action--primary')).backgroundColor === 'rgb(88, 204, 2)'; })()`), "ending buttons must sit at opposite edges with a green primary action and no divider");
  await captureScreenshot("ict-ending-preview.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), "ending gain cards must fit a narrow screen");
  await captureScreenshot("ict-ending-mobile.png");
  for (const [width, height] of [[320,568],[390,667],[844,390],[1366,768]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor:1, mobile:width < 600 }, sessionId);
    const fit = await evaluate(`(() => {
      const task=document.querySelector('.lesson-shell--completion .level-layout-task');
      const result=document.querySelector('.subject-completion').getBoundingClientRect();
      const footer=document.querySelector('.lesson-shell--completion .level-layout-actions').getBoundingClientRect();
      return { fits:task.scrollHeight <= task.clientHeight + 1 && document.documentElement.scrollWidth <= innerWidth && result.top >= 0 && result.bottom <= footer.top + 1 && footer.bottom <= innerHeight + 1, scroll:task.scrollHeight, height:task.clientHeight, resultBottom:result.bottom, footerTop:footer.top };
    })()`);
    assert(fit.fits, `the complete ending and actions must fit without scrolling at ${width}x${height}: ${JSON.stringify(fit)}`);
    assert(await evaluate("(() => { const label=document.querySelector('.lesson-shell--completion [data-template-action-label]'); return label.scrollWidth <= label.clientWidth + 1; })()"), `the ending Continue label must be fully visible at ${width}x${height}`);
    await captureScreenshot(`ict-ending-fit-${width}.png`);
  }
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);

  await evaluate("document.querySelector('[data-authored-restart]').click()");
  assert(await evaluate("document.querySelector('.subject-completion--analytics')?.dataset.animationState === 'running' && !document.querySelector('.subject-completion-rocky')"), "Continue must reveal a separate animated analytics screen");
  await waitFor("document.querySelector('.subject-completion--analytics')?.dataset.animationState === 'complete'", "analytics count-up completes");
  assert(await evaluate("document.querySelector('.subject-analytics-row--xp strong').textContent === '+10 XP' && document.querySelector('.subject-analytics-row--streak strong').textContent.includes('1') && document.querySelector('[data-gain-bar]').value === 1 && document.querySelector('.subject-analytics-row--streak img').src.endsWith('streak-fire-burning.svg')"), "analytics must show XP, animated streak, and full material progress");
  for (const [width,height] of [[320,568],[844,390],[1366,768]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width,height,deviceScaleFactor:1,mobile:width<600 },sessionId);
    assert(await evaluate("(() => { const task=document.querySelector('.lesson-shell--completion .level-layout-task'); return task.scrollHeight <= task.clientHeight+1 && document.documentElement.scrollWidth<=innerWidth; })()"), `analytics must fit without scrolling at ${width}x${height}`);
    await captureScreenshot(`ict-analytics-${width}.png`);
  }
  await evaluate("document.querySelector('[data-authored-review]').click()");
  await waitFor("Boolean(document.querySelector('.subject-completion-rocky'))", "back from analytics returns to the celebration");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390,height:844,deviceScaleFactor:1,mobile:true },sessionId);
  await cdp.send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] }, sessionId);
  await evaluate("document.querySelector('[data-authored-review]').click(); document.querySelector('[data-test-lesson-pass]').click()");
  assert(await evaluate("document.querySelector('.subject-completion-rocky').src.endsWith('rocky-standing-still-reduced.svg') && !document.querySelector('.ui-lab-pinata')"), "reduced-motion ending uses a still Rocky and no particle animation");
  await evaluate("document.querySelector('[data-authored-restart]').click()");
  assert(await evaluate("document.querySelector('.subject-completion--analytics')?.dataset.animationState === 'complete' && document.querySelector('.subject-analytics-row--streak img').src.endsWith('streak-fire-burning-reduced.svg')"), "reduced-motion analytics shows final values and a still flame");
  await evaluate("document.querySelector('[data-authored-restart]').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "exit preview to map");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] progress').value === 0"), "test pass must not persist completion or gains");
  await cdp.send("Emulation.setEmulatedMedia", { features:[] }, sessionId);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click(); document.querySelector('[data-bubble-start]').click()");
  await waitFor("Boolean(document.querySelector('[data-live-authored-step]'))", "lesson after test preview");
  assert(await evaluate("!document.querySelector('.lesson-top-title').hidden"), "returning to the lesson restores its top progress bar");

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
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await evaluate("document.querySelector('[data-ui-lab-answer=insert]').click(); document.querySelector('[data-template-primary]').click()");
    assert(await evaluate("document.querySelector('[data-ui-lab-feedback]').classList.contains('is-wrong')"), "wrong answers must provide feedback before retry");
    await evaluate("document.querySelector('[data-template-primary]').click()");
  }
  await evaluate("document.querySelector('[data-ui-lab-answer=update]').click()");
  await waitFor("getComputedStyle(document.querySelector('[data-ui-lab-answer=update]')).borderColor === 'rgb(28, 176, 246)'", "the selected ICT MCQ color transition");
  const ictMcqPalette = await evaluate(`(() => { const answer=document.querySelector('[data-ui-lab-answer=update]'); return { border:getComputedStyle(answer).borderColor, progress:getComputedStyle(document.querySelector('.lesson-top-title'),'::after').backgroundImage, action:getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor }; })()`);
  assert(ictMcqPalette.border === "rgb(28, 176, 246)" && ictMcqPalette.action === "rgb(88, 204, 2)" && ictMcqPalette.progress.includes("linear-gradient") && ictMcqPalette.progress.includes("255, 212, 59"), `selected answers must use blue, actions green, and progress glossy yellow (${JSON.stringify(ictMcqPalette)})`);
  await captureScreenshot("ict-database-mcq-blue.png");
  await evaluate("document.querySelector('[data-live-authored-step]').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  await waitFor("getComputedStyle(document.querySelector('.level-action--primary')).backgroundColor === 'rgb(88, 204, 2)'", "the correct-answer Continue button success color");
  assert(await evaluate("document.querySelector('[data-ui-lab-check-label]').textContent === 'متابعة' && document.querySelector('[data-ui-lab-feedback]').classList.contains('is-correct')"), "a correct ICT answer must reveal an Arabic green Continue action");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('.markdown-rendered h1')?.textContent.includes('لماذا')", "Access characteristics in the first part");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('[data-ui-lab-answer=false]'))", "the true-false check");
  await evaluate("document.querySelector('[data-ui-lab-answer=false]').click(); document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')", "the correct true-false feedback");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('.markdown-rendered h1')?.textContent.includes('مكوّنات')", "Access components");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('[data-ui-lab-answer=form]'))", "the components check");
  await evaluate("document.querySelector('[data-ui-lab-answer=form]').click(); document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')", "the correct components feedback");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('#authored-lesson-complete-title'))", "the completed part");
  await waitFor("document.querySelector('.subject-completion')?.dataset.animationState === 'complete'", "earned reward count-up completes");
  assert(await evaluate("!document.querySelector('.subject-completion-preview') && document.querySelector('.subject-gain--xp strong').textContent === '+10 XP' && document.querySelector('.subject-gain--progress strong').textContent === '4%'"), "first completion displays 10 prototype XP and subject progress");
  await captureScreenshot("ict-ending-earned.png");
  await evaluate("document.querySelector('[data-authored-review]').click()");
  await evaluate(`(() => {
    for (let step = 0; step < 30 && !document.querySelector('.subject-completion'); step += 1) {
      const correct = document.querySelector('[data-ui-lab-answer][data-correct=true]');
      if (correct && !document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')) correct.click();
      document.querySelector('[data-template-primary]').click();
    }
  })()`);
  await waitFor("document.querySelector('.subject-completion')?.dataset.animationState === 'complete'", "replayed reward counters settle");
  assert(await evaluate("document.querySelector('.subject-gain--xp strong')?.textContent === '+0 XP' && document.querySelector('.subject-gain--progress strong').textContent === '4%'"), "replaying within the same lesson must not display duplicate XP or progress gains");

  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "unit progress after finishing a part");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] progress').value === 1 && document.querySelector('[data-unit=unit-1] progress').max === 13 && document.querySelector('[data-unit=unit-1] [data-unit-percent]').textContent === '8%' && document.querySelector('[data-roadmap-part=access-basics]').dataset.partState === 'completed' && document.activeElement.dataset.roadmapPart === 'access-basics'"), "finishing one part must update unit completion once and return focus to that part");
  await navigate(`${appUrl}?subject=ict`);
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "restored part progress after reload");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] progress').value === 1"), "completed part progress must survive a reload");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] [data-review-count]').textContent === '1' && document.querySelectorAll('[data-review-part=access-basics]').length === 1"), "repeated mistakes must persist as one review part after reload");
  await captureScreenshot("ict-review-card.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), "populated review cards must fit mobile RTL layouts");
  await captureScreenshot("ict-review-card-mobile.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('[data-review-part=access-basics]').click()");
  await waitFor("document.querySelector('.markdown-rendered h1')?.textContent === 'ما الذي يديره برنامج قواعد البيانات؟'", "targeted explanation for the missed question");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('[data-review-part=access-basics]'))", "interrupted review remains active");
  await evaluate("document.querySelector('[data-review-part=access-basics]').click()");
  await waitFor("Boolean(document.querySelector('[data-live-authored-step]'))", "reopened review explanation");
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('[data-ui-lab-answer=update]'))", "review follow-up question");
  await evaluate("document.querySelector('[data-ui-lab-answer=update]').click(); document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "return after targeted review");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] [data-review-count]').textContent === '0' && document.querySelector('[data-unit=unit-1] progress').value === 1"), "successful targeted review clears the review item and preserves completion");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click()");
  assert(await evaluate("document.querySelector('[data-bubble-start]').textContent === 'راجع الجزء'"), "completed parts must offer review");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("Boolean(document.querySelector('[data-live-authored-step]'))", "review of a completed part");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "map after revisiting a completed part");
  assert(await evaluate("document.querySelector('[data-unit=unit-1] progress').value === 1"), "reviewing a part must preserve its completion");
  await verifyAccountJourney({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot, delay,
    completeRoadmap() {
      if (failures.length || browserErrors.length || failedLocalRequests.length) throw new Error([...failures, ...browserErrors, ...failedLocalRequests].join("\n"));
      throw new RoadmapSmokeComplete();
    },
  });

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
    illustrationContained:(() => { const box=document.querySelector('.visitor-landing__illustration').getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; })(),
    legacyVisible:getComputedStyle(document.querySelector('.topbar-wrap')).display !== 'none',
  }))()`);
  assert(!mobileEntry.overflow && mobileEntry.columns === 1 && mobileEntry.illustrationContained, "mobile visitor entry must fit one clean column without horizontal overflow");
  assert(!mobileEntry.legacyVisible, "mobile entry must hide the Learn-page chrome until selection is complete");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1280, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await navigate(`${appUrl}?page=more&static=1`);
  await waitFor("document.querySelectorAll('.subject-card').length === 8", "the raw-static More page");
  const staticReference = await evaluate(`(() => ({
    tabs:document.querySelectorAll('[data-more-tab]').length,
    prototypeTools:document.querySelectorAll('.prototype-tools').length,
    resources:performance.getEntriesByType('resource').map(({ name }) => name),
  }))()`);
  assert(staticReference.tabs === 5, "raw-static More must expose the five developer tools");
  assert(staticReference.prototypeTools === 0, "raw-static output must not expose development prototype tools");
  assert(!staticReference.resources.some((url) => url.includes("/src/styles/design-system") || url.includes("/src/ui/design-system-view.js")), "raw-static output must not load Design System resources");

  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1280, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await verifyDeveloperWorkspace({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot });
  await verifyShipReadyTemplates({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor });

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
  if (error instanceof DeveloperSmokeComplete) console.log("Developer workspace browser checks passed.");
  else if (error instanceof MotionSmokeComplete) console.log("Focused motion browser checks passed: rapid tabs, reduced motion, subject entry, lesson entry and steps.");
  else if (error instanceof RoadmapSmokeComplete) console.log("Focused roadmap browser checks passed: part completion, saved unit progress, learner isolation, guest gates, unpublished content, narrow RTL layout, and keyboard focus.");
  else if (error instanceof ScreenshotCaptureComplete) console.log(`Captured focused screenshot: ${error.filename}`);
  else throw error;
} finally {
  await terminateProcess(chromeProcess);
  await terminateProcess(serverProcess);
  if (profileDirectory) await rm(profileDirectory, { recursive:true, force:true, maxRetries:5, retryDelay:100 });
}
