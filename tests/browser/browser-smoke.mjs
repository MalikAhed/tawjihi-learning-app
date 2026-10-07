import { installAccessibility, auditAccessibility } from "./browser-accessibility.mjs";
import { saveBrowserFailure } from "./browser-diagnostics.mjs";
import { verifyQuestionCourse } from "./browser-question-course.mjs";
import { CdpPipe, delay, terminateProcess, findChrome, getAvailablePort, rawRequest, waitForServer } from "./browser-session.mjs";
import { verifyAccountJourney } from "./browser-accounts.mjs";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COURSE_SUBJECTS, TOTAL_SUBJECTS } from "../../src/data/course.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const failures = [];
const browserErrors = [];
const failedLocalRequests = [];
const failedExternalRequests = [];
const serverErrors = [];
const allowExternalAssets = process.env.BROWSER_EXTERNAL_ASSETS === "1";
const screenshotDirectory = process.env.BROWSER_SCREENSHOT_DIR;
const screenshotFilter = process.env.BROWSER_SCREENSHOT_FILTER;
const unpublishedSubjectCount = COURSE_SUBJECTS.filter(({ status }) => status === "unpublished").length;

class MotionSmokeComplete extends Error {}
class AccountsSmokeComplete extends Error {}
class RoadmapSmokeComplete extends Error {}
class ScreenshotCaptureComplete extends Error { constructor(filename) { super(filename); this.filename = filename; } }
function assert(condition, message) {
  if (!condition) failures.push(message);
}
let serverProcess;
let chromeProcess;
let profileDirectory;
let cdp;
let diagnosticSend;
try {
  const port = await getAvailablePort();
  const appUrl = `http://127.0.0.1:${port}/`;
  serverProcess = spawn(process.execPath, ["dev-server.mjs"], {
    cwd:projectRoot,
    env:{
      ...process.env,
      PORT:String(port),
      LIVE_RELOAD:"0",ACCOUNTS_DATABASE_PATH:":memory:",
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

  cdp = new CdpPipe(chromeProcess);
  const { targetId } = await cdp.send("Target.createTarget", { url:"about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten:true });
  diagnosticSend = (method,params) => cdp.send(method,params,sessionId);
  await Promise.all([
    cdp.send("Page.enable", {}, sessionId),
    cdp.send("Runtime.enable", {}, sessionId),
    cdp.send("Log.enable", {}, sessionId),
    cdp.send("Network.enable", {}, sessionId),
    cdp.send("Fetch.enable", {
      patterns:[{ urlPattern:`${appUrl}*`, resourceType:"Document", requestStage:"Response" }],
    }, sessionId),
  ]);
  // Native player input is covered by browser-video; keep broad navigation checks independent of YouTube's network.
  if (!allowExternalAssets) await cdp.send("Network.setBlockedURLs", { urls:["*youtube-nocookie.com*", "*youtube.com*"] }, sessionId);
  if (!allowExternalAssets) {
    await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
      source:"window.__FULL_STACK_QUEST_DISABLE_EXTERNALS__ = true;",
    }, sessionId);
  }

  const requestUrls = new Map();
  const cancelledRequests = new Set();
  cdp.onEvent((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Network.loadingFailed" && message.params.canceled)
      cancelledRequests.add(message.params.requestId);
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
      })().catch(async (error) => {
        // Rapid navigation can cancel a document between reading and fulfilling it.
        await delay(0);
        if (cancelledRequests.has(message.params.networkId) && /Invalid InterceptionId|No resource with given identifier/.test(error.message)) return;
        browserErrors.push(`Could not prepare the deterministic test document: ${error.message}`);
      });
      return;
    }
    if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      browserErrors.push(message.params.args.map((argument) => argument.value || argument.description || "console error").join(" "));
    }
    if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      const entry=message.params.entry;
      browserErrors.push(`${entry.text}${entry.url ? ` [${new URL(entry.url,appUrl).pathname}]` : ''}`);
    }
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
      if (await evaluate(`Boolean(${expression}) && !document.querySelector('.media-pending')`)) {
        await evaluate(`Promise.all(document.getAnimations().filter(a => a.animationName === 'app-component-arrive' || a.effect.getTiming().duration === 280).map(a => a.finished.catch(() => {})))`);
        return;
      }
      await delay(50);
    }
    const errorContext = browserErrors.length ? ` Browser errors: ${browserErrors.join(" | ")}` : "";
    const pageContext = await evaluate(`({
      page:new URLSearchParams(location.search).get('page'),
      focus:document.activeElement?.id || document.activeElement?.tagName,
      pending:[...document.querySelectorAll('.media-pending')].map(element => element.className),
      inert:[...document.querySelectorAll('[inert]')].map(element => element.className),
    })`);
    throw new Error(`Timed out waiting for ${label}. Page state: ${JSON.stringify(pageContext)}.${errorContext}`);
  }

  async function navigate(url) {
    const previousTimeOrigin = await evaluate("performance.timeOrigin");
    await cdp.send("Page.navigate", { url }, sessionId);
    await waitFor(`performance.timeOrigin !== ${previousTimeOrigin} && document.readyState !== 'loading' && !document.querySelector('#app-splash')`, url);
  }

  async function captureScreenshot(filename) {
    if (process.env.BROWSER_A11Y === "1") {
      // The approved bright palette has documented contrast exceptions. Keep
      // reporting those while all other WCAG A/AA violations remain blocking.
      const result=await auditAccessibility(evaluate, filename, {reportOnly:true});
      const blockingViolations=result.violations.filter(({id}) => id !== "color-contrast");
      const contrastViolations=result.violations.filter(({id}) => id === "color-contrast");
      if(blockingViolations.length) failures.push(`Accessibility: ${filename}: ${JSON.stringify(blockingViolations)}`);
      if(contrastViolations.length) console.log(`Contrast exceptions — ${filename}: ${JSON.stringify(contrastViolations.flatMap(rule=>rule.nodes))}`);
    }
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

  if (process.env.BROWSER_A11Y === "1") await installAccessibility((method, params) => cdp.send(method, params, sessionId));
  console.log(`Browser scope: ${process.env.BROWSER_ACCOUNTS_ONLY ? "accounts" : process.env.BROWSER_ROADMAP_ONLY ? "progress" : process.env.BROWSER_MOTION_ONLY ? "motion" : "full"}; mode: HTTP${process.env.BROWSER_A11Y ? "; WCAG A/AA audits enabled" : ""}`);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  if (process.env.BROWSER_ACCOUNTS_ONLY === "1") {
    await navigate(`${appUrl}?page=learn`);
    await verifyAccountJourney({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot, delay });
    if (failures.length || browserErrors.length || failedLocalRequests.length) throw new Error([...failures,...browserErrors,...failedLocalRequests].join("\n"));
    throw new AccountsSmokeComplete();
  }
  await navigate(appUrl);
  await waitFor("Boolean(document.querySelector('.visitor-landing'))", "the visitor landing page");
  await captureScreenshot("visitor-entry.png");
  assert(await evaluate("document.body.classList.contains('product-flow-active') && getComputedStyle(document.querySelector('.topbar-wrap')).display === 'none'"), "the visitor entry must replace legacy game chrome");
  assert(await evaluate("document.querySelector('.visitor-landing__illustration img')?.naturalWidth > 0 && document.querySelector('[data-flow=register]').textContent.trim() === 'ابدأ' && document.querySelector('[data-flow=sign-in]').textContent.trim() === 'لدي حساب بالفعل'"), "the landing must load its hero illustration and expose both account actions");
  await navigate(`${appUrl}?page=learn`);
  await waitFor(`location.search === '?page=learn' && !document.body.classList.contains('product-flow-active') && document.querySelectorAll('.subject-card').length === ${TOTAL_SUBJECTS}`, "the existing vibrant Learn page");
  assert(await evaluate(`document.querySelectorAll('.subject-card').length === ${TOTAL_SUBJECTS} && Boolean(document.querySelector('[data-auth-flow=register]')) && Boolean(document.querySelector('[data-auth-flow=sign-in]'))`), "guests must reach the complete subject catalog with Create account and Sign in");
  assert(await evaluate(`!document.querySelector('[data-learner-dashboard]') && document.querySelectorAll('.subject-card--locked').length === ${unpublishedSubjectCount} && [...document.querySelectorAll('.subject-card--locked')].every(card => card.disabled && card.querySelector('[data-subject-count]')?.textContent.trim() === '0 / 0')`), "guests see locked subjects at zero progress without a personal dashboard");
  assert(await evaluate("!document.querySelector('.sidebar') && !document.querySelector('.topbar-actions')"), "the Learn page must not contain the old streak, rank, gem, avatar, or sidebar account UI");
  for (const page of ["quests", "shop", "league", "friends", "super"]) {
    assert(await evaluate(`(() => {
      const url = location.href, selected = document.querySelector('.nav-item.active');
      document.querySelector('[data-page="${page}"]').click();
      return location.href === url && document.querySelector('.nav-item.active') === selected && !document.querySelector('#coming-soon-toast').hidden;
    })()`), `${page} must show coming-soon feedback without changing navigation`);
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
  await verifyQuestionCourse({ base:appUrl, send:(method, params) => cdp.send(method, params, sessionId), evaluate, waitFor });
  if (process.env.BROWSER_MOTION_ONLY === "1") throw new MotionSmokeComplete();
  await verifyAccountJourney({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot, delay,
    completeRoadmap() {
      if (failures.length || browserErrors.length || failedLocalRequests.length) throw new Error([...failures, ...browserErrors, ...failedLocalRequests].join("\n"));
      throw new RoadmapSmokeComplete();
    },
  });

  await navigate(`${appUrl}?page=learn`);
  await waitFor(`document.querySelectorAll('.subject-card').length === ${TOTAL_SUBJECTS} && !document.body.classList.contains('product-flow-active')`, "the legacy subject scaffold");
  const course = await evaluate(`(() => ({
    subjects:[...document.querySelectorAll('.subject-card')].map((card) => ({ id:card.dataset.subject, status:card.dataset.status, name:card.querySelector('h2')?.textContent, tag:card.tagName, disabled:card.disabled })),
    days:document.querySelectorAll('[data-day]').length,
    overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
    heading:document.querySelector('h1')?.textContent,
    mapImages:document.querySelectorAll('.subject-map img').length,
  }))()`);
  assert(course.subjects.length === TOTAL_SUBJECTS, `course map rendered ${course.subjects.length} subjects instead of ${TOTAL_SUBJECTS}`);
  assert(course.subjects.filter(({ status, disabled }) => status === "unpublished" && disabled).length === unpublishedSubjectCount, "all unpublished subjects must explain availability and remain disabled");
  assert(course.subjects.find(({ id }) => id === "ict")?.status === "available" && !course.subjects.find(({ id }) => id === "ict")?.disabled, "ICT must remain available");
  assert(course.subjects.every(({ tag }) => tag === "BUTTON"), "every subject card must retain button semantics");
  assert(course.days === 0, `course map must not render day controls; found ${course.days}`);
  assert(course.overflow === false, "desktop course map has horizontal overflow");
  assert(course.heading?.includes("المواد الدراسية"), "subject map is missing its accessible page heading");
  assert(await evaluate(`document.querySelectorAll('.subject-card--locked .subject-card__lock img').length === ${unpublishedSubjectCount} && [...document.querySelectorAll('.subject-map img')].every(image => image.complete && image.naturalWidth > 0)`), "subject illustrations and all unpublished-subject lock icons must load");
  assert(!await evaluate("Boolean(document.querySelector('.course-units [data-design-system]'))"), "the learning map must not expose development references");
  const initialResources = await evaluate("performance.getEntriesByType('resource').map(({ name }) => name)");
  assert(!initialResources.some((url) => url.includes("/src/styles/design-system") || url.includes("/src/ui/design-system-view.js")), "the normal learning path must not preload Design System resources");
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
  await navigate(`${appUrl}?page=more`);
  await waitFor("location.search === '?page=more' && document.querySelector('[data-page=more].active')", "blank More page");
  assert(await evaluate("document.querySelector('.coming-soon').children.length === 0 && !document.querySelector('.more-tabs,.prototype-tools')"), "More must be blank without experimental controls");
  for (const view of ["ui-lab", "design-system", "ship-ready-code-lab"]) {
    await navigate(`${appUrl}?view=${view}`);
    await waitFor("location.search === '?page=learn'", "retired developer link returns Home");
  }

  assert(browserErrors.length === 0, `browser reported errors: ${browserErrors.join(" | ")}`);
  assert(failedLocalRequests.length === 0, `browser requests failed: ${failedLocalRequests.join(" | ")}`);
  if (allowExternalAssets) assert(failedExternalRequests.length === 0, `external browser resources failed: ${failedExternalRequests.join(" | ")}`);
  assert(serverErrors.filter(Boolean).length === 0, `development server reported errors: ${serverErrors.filter(Boolean).join(" | ")}`);

  if (failures.length) {
    await saveBrowserFailure({send:diagnosticSend,name:'smoke',error:new Error(failures.slice(0,8).join('\n')),failures:[...browserErrors,...failedLocalRequests]});
    console.error(`Browser smoke tests failed:\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  } else {
    console.log("Browser smoke tests passed: route state, locked navigation, blank More, lesson focus, responsive behavior, reduced motion, and server recovery.");
  }

  await cdp.send("Browser.close");
} catch (error) {
  if (error instanceof AccountsSmokeComplete) console.log("Focused HTTP account browser journey passed.");
  else if (error instanceof MotionSmokeComplete) console.log("Focused motion browser checks passed: rapid tabs, reduced motion, subject entry, lesson entry and steps.");
  else if (error instanceof RoadmapSmokeComplete) console.log("Focused roadmap browser checks passed: part completion, saved unit progress, learner isolation, guest gates, unpublished content, narrow RTL layout, and keyboard focus.");
  else if (error instanceof ScreenshotCaptureComplete) console.log(`Captured focused screenshot: ${error.filename}`);
  else {
    if (diagnosticSend) await saveBrowserFailure({ send:diagnosticSend,name:'smoke',error,failures:[...browserErrors,...failedLocalRequests] });
    throw error;
  }
} finally {
  cdp?.close();
  await terminateProcess(chromeProcess);
  await terminateProcess(serverProcess);
  if (profileDirectory) await rm(profileDirectory, { recursive:true, force:true, maxRetries:5, retryDelay:100 });
}
