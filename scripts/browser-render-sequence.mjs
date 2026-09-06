import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CdpPipe, delay, findChrome, getAvailablePort, terminateProcess, waitForServer } from "./browser-session.mjs";
import { verifyVisitorLifecycle } from "./browser-visitor-lifecycle.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = process.env.BROWSER_RENDER_DIR || await mkdtemp(path.join(tmpdir(), "learn-render-sequence-"));
const baseline = process.env.BROWSER_RENDER_BASELINE === "1";
const failures = [];
const records = [];
const writes = [];
let server, chrome, profile;
let stage = "startup", frame = 0;
const assert = (condition, message) => { if (!condition) failures.push(message); };

try {
  await mkdir(output, { recursive:true });
  const port = await getAvailablePort();
  const appUrl = `http://127.0.0.1:${port}/`;
  server = spawn(process.execPath, ["dev-server.mjs"], { cwd:projectRoot, env:{ ...process.env, PORT:String(port), ACCOUNTS_DATABASE_PATH:":memory:" }, stdio:"ignore" });
  await waitForServer(port);
  profile = await mkdtemp(path.join(tmpdir(), "learn-render-chrome-"));
  chrome = spawn(await findChrome(), ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-background-networking", "--remote-debugging-pipe", `--user-data-dir=${profile}`, "about:blank"], { stdio:["ignore", "ignore", "ignore", "pipe", "pipe"] });
  const cdp = new CdpPipe(chrome);
  const { targetId } = await cdp.send("Target.createTarget", { url:"about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten:true });
  const send = (method, params = {}) => cdp.send(method, params, sessionId);
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, returnByValue:true, awaitPromise:true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const waitFor = async (expression) => {
    for (let attempt = 0; attempt < 300; attempt++) {
      if (await evaluate(`Boolean(${expression})`)) return;
      await delay(50);
    }
    throw new Error(`Timed out: ${expression}. ${failures.join(" | ")}`);
  };
  await Promise.all([send("Page.enable"), send("Runtime.enable"), send("Network.enable")]);
  await send("Network.setBlockedURLs", { urls:["*fonts.googleapis.com*", "*fonts.gstatic.com*"] });
  await send("Page.addScriptToEvaluateOnNewDocument", { source:`
    window.__FULL_STACK_QUEST_DEV__ = true;
    window.__FULL_STACK_QUEST_DISABLE_EXTERNALS__ = true;
    window.__renderFrames = [];
    const rect = element => { if (!element || !element.getClientRects().length) return null; const r=element.getBoundingClientRect(); const style=getComputedStyle(element); return { x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height),background:style.backgroundColor,padding:style.padding,display:style.display }; };
    function sample() {
      if (document.body) window.__renderFrames.push({ time:performance.now(),route:location.search,account:document.body.dataset.accountType || null,bodyClass:document.body.className,header:rect(document.querySelector('.topbar-wrap')),shell:rect(document.querySelector('.lesson-shell')),busy:document.querySelector('#lesson-content')?.getAttribute('aria-busy'),loading:Boolean(document.querySelector('.app-loading')),reference:Boolean(document.querySelector('.current-system')),editor:Boolean(document.querySelector('[data-editor-tab]')),editorBusy:document.querySelector('.ds-editor-card')?.getAttribute('aria-busy'),editorDisabled:document.querySelector('[data-editor-tab]')?.disabled,stylesheet:document.querySelector('[data-lazy-stylesheet]')?.dataset.loadState || null,prototype:Boolean(document.querySelector('.prototype-tools')),prototypeStyled:Boolean(document.querySelector('#prototype-tools-styles')?.sheet),dialog:rect(document.querySelector('dialog[open]')),overflow:document.documentElement.scrollWidth > innerWidth });
      if (window.__renderFrames.length < 6000) requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  ` });
  // Hold real dependencies long enough to inspect the intervening paints. These
  // delays belong only to the test; application navigation remains immediate.
  await send("Fetch.enable", { patterns:[{ urlPattern:"*/api/auth/session", requestStage:"Request" }, { urlPattern:"*/src/styles/design-system.css", requestStage:"Request" }, { urlPattern:"*/src/styles/prototype-tools.css", requestStage:"Request" }, { urlPattern:"*/assets/vendor/lesson-code-editor.js", requestStage:"Request" }, { urlPattern:appUrl + "*", resourceType:"Document", requestStage:"Response" }] });
  cdp.onEvent((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Page.screencastFrame") {
      const filename = `${String(frame++).padStart(5,"0")}-${stage}.jpg`;
      records.push({ frame:filename, timestamp:message.params.metadata.timestamp });
      writes.push(writeFile(path.join(output, filename), Buffer.from(message.params.data, "base64")));
      void send("Page.screencastFrameAck", { sessionId:message.params.sessionId });
    }
    if (message.method === "Fetch.requestPaused") void (async () => {
      const { requestId, resourceType } = message.params;
      if (resourceType === "Document") {
        const response = await send("Fetch.getResponseBody", { requestId });
        const html = Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8").toString().replace('<script src="/__codex_live_reload.js"></script>', "").replace(/\s*<link[^>]+href="https:\/\/fonts\.[^"]*"[^>]*>/g, "");
        await send("Fetch.fulfillRequest", { requestId, responseCode:200, responseHeaders:message.params.responseHeaders.filter(({ name }) => name.toLowerCase() !== "content-length"), body:Buffer.from(html).toString("base64") });
      } else {
        await delay(700);
        await send("Fetch.continueRequest", { requestId });
      }
    })().catch(error => failures.push(error.message));
    if (message.method === "Runtime.exceptionThrown") failures.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  });
  await send("Page.startScreencast", { format:"jpeg", quality:65, maxWidth:1440, maxHeight:900, everyNthFrame:2 });
  const snapshot = async (name) => {
    const frames = await evaluate("window.__renderFrames || []");
    await writeFile(path.join(output, `${name}.json`), JSON.stringify(frames, null, 2));
    return frames;
  };
  const navigate = async (route) => {
    const origin = await evaluate("performance.timeOrigin");
    await send("Page.navigate", { url:appUrl + route });
    await waitFor(`performance.timeOrigin !== ${origin} && document.querySelector('.topbar-wrap') && document.querySelector('.subject-map')`);
    await delay(350);
  };
  await navigate("?page=learn");
  const account = await evaluate(`fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'rendercheck',email:'rendercheck@example.com',password:'Learn123',curriculum:'gaza',path:'scientific'})}).then(r=>r.json())`);
  assert(account.status === "created", "render verification fixture account is created");
  await send("Emulation.setCPUThrottlingRate", { rate:4 });
  await send("Network.emulateNetworkConditions", { offline:false, latency:60, downloadThroughput:750000, uploadThroughput:750000 });
  for (const width of [1440, 390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 500 });
    stage = `${width}-signed-in-refresh`;
    await send("Network.setCacheDisabled", { cacheDisabled:true });
    await navigate("?page=learn");
    let samples = await snapshot(stage);
    assert(!samples.some(item => item.header && item.account !== "free"), `${width}: signed-in refresh never paints the guest navigation`);
    assert(samples.some(item => item.loading), `${width}: session restoration exposes a visible loading state`);
    assert(!samples.some(item => item.overflow), `${width}: startup stays within viewport`);

    stage = `${width}-cold-code`;
    await navigate("?view=ship-ready-code-lab");
    await waitFor("document.querySelector('[data-editor-tab]')");
    await delay(400);
    samples = await snapshot(stage);
    const loading = samples.filter(item => item.busy === "true");
    const ready = samples.findLast(item => item.editor);
    assert(loading.length > 0, `${width}: asynchronous editor loading is observed`);
    assert(loading.every(item => item.bodyClass.includes("ui-lab-open")), `${width}: code loading starts in its final layout mode`);
    assert(loading.every(item => item.shell?.width === ready.shell?.width && item.shell?.height === ready.shell?.height), `${width}: code shell dimensions stay stable during loading`);
    assert(samples.filter(item => item.editor).every(item => item.stylesheet === "loaded"), `${width}: code editor only paints after required CSS loads`);
    assert(!samples.some(item => item.overflow), `${width}: editor paints stay within viewport`);
    assert(samples.filter(item => item.editorBusy === "true").every(item => item.editorDisabled), `${width}: pending editor tabs cannot drop early input`);
    await waitFor("document.querySelector('.cm-editor') && !document.querySelector('[data-editor-tab=css]').disabled");
    await evaluate("window.__renderFrames = []; document.querySelector('[data-editor-tab=css]').click(); document.querySelector('[data-output-tab=console]').click()");
    await delay(400);
    await snapshot(`${width}-nested-tabs`);
    assert(await evaluate("!document.querySelector('[data-editor-host=css]').hidden && !document.querySelector('[data-output-panel=console]').hidden"), `${width}: nested tabs commit current selection`);

    stage = `${width}-navigation-dialog`;
    await evaluate("document.querySelector('.lesson-back').click(); document.querySelector('[data-more-tab=data]').click(); document.querySelector('[data-reset=browser]').click()");
    await delay(400);
    await snapshot(stage);
    assert(await evaluate("document.querySelector('dialog').open && document.querySelector('dialog').contains(document.activeElement)"), `${width}: dialog opens with focus inside`);
    await send("Input.dispatchKeyEvent", { type:"keyDown", key:"Escape", code:"Escape", windowsVirtualKeyCode:27 });
    await send("Input.dispatchKeyEvent", { type:"keyUp", key:"Escape", code:"Escape", windowsVirtualKeyCode:27 });
    await waitFor("!document.querySelector('dialog').open");
    assert(await evaluate("document.activeElement.matches('[data-reset=browser]')"), `${width}: dialog cancellation restores focus`);

    stage = `${width}-warm-reference`;
    await evaluate("window.__renderFrames = []; document.querySelector('[data-more-tab=design-system]').click()");
    await waitFor("document.querySelector('.current-system')");
    await delay(400);
    await snapshot(stage);
    assert(await evaluate("[...document.styleSheets].findIndex(s=>s.href?.endsWith('/design-system.css')) < [...document.styleSheets].findIndex(s=>s.href?.endsWith('/system.css'))"), `${width}: current shared styles retain final cascade order`);
    stage = `${width}-back-forward`;
    await evaluate("window.__renderFrames = []; history.back()");
    await waitFor("location.search === '?page=more'");
    await evaluate("history.forward()");
    await waitFor("document.querySelector('.current-system') && location.search === '?view=design-system'");
    await delay(400);
    await snapshot(stage);

    stage = `${width}-rapid-navigation`;
    await evaluate("document.querySelector('[data-page=more]').click(); document.querySelector('[data-more-tab=design-system]').click(); document.querySelector('[data-page=learn]').click()");
    await delay(1000);
    assert(await evaluate("location.search === '?page=learn' && !document.querySelector('.lesson-view.is-visible') && !document.body.classList.contains('ui-lab-open')"), `${width}: rapid navigation never restores a stale reference`);
    await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
    await evaluate("document.querySelector('[data-page=more]').click(); document.querySelector('[data-more-tab=data]').click()");
    assert(await evaluate("document.getAnimations().filter(a=>a.animationName === 'app-component-arrive' || a.effect.getTiming().duration === 280).every(a=>a.playState !== 'running')"), `${width}: reduced motion suppresses navigation animations`);
    await send("Emulation.setEmulatedMedia", { features:[] });
    await send("Network.setCacheDisabled", { cacheDisabled:false });
    stage = `${width}-warm-reload`;
    await navigate("?page=learn");
    samples = await snapshot(stage);
    assert(!samples.some(item => item.header && item.account !== "free"), `${width}: warm reload never paints guest navigation`);
    stage = `${width}-prototype-tools`;
    await navigate("?page=learn&prototype=1");
    await waitFor("document.querySelector('.prototype-tools')");
    samples = await snapshot(stage);
    assert(samples.filter(item => item.prototype).every(item => item.prototypeStyled), `${width}: prototype controls only mount after their stylesheet`);
  }
  await verifyVisitorLifecycle({ evaluate, assert });
  await send("Page.stopScreencast");
  await Promise.all(writes);
  await writeFile(path.join(output, "recording.json"), JSON.stringify({ frames:records, failures }, null, 2));
  console.log(`Rendering sequence artifacts: ${output} (${frame} recorded frames)`);
  if (failures.length) {
    console.log(failures.join("\n"));
    if (!baseline) process.exitCode = 1;
  } else console.log("Rendering sequences passed: desktop/mobile, slow initial loads, warm reloads, nested tabs, dialogs, back/forward, rapid navigation, and reduced motion.");
} finally {
  await terminateProcess(chrome);
  await terminateProcess(server);
  if (profile) await rm(profile, { recursive:true, force:true });
}
