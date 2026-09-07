import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";
import { delay } from "./browser-session.mjs";

await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
  const held = new Map();
  const requests = [];
  const errors = [];
  onEvent(({ method, params }) => {
    if (method === "Fetch.requestPaused") held.set(params.request.url, params.requestId);
    if (method === "Network.requestWillBeSent") requests.push(params.request.url);
    if (method === "Runtime.exceptionThrown") errors.push(params.exceptionDetails.text);
  });
  const release = async (suffix, fail = false) => {
    for (let n = 0; n < 300 && !held.has(base + suffix); n++) await delay(20);
    const requestId = held.get(base + suffix);
    assert.ok(requestId, `Expected ${suffix}`);
    held.delete(base + suffix);
    await send(fail ? "Fetch.failRequest" : "Fetch.continueRequest", fail ? { requestId, errorReason:"Failed" } : { requestId });
  };
  const output = process.env.BROWSER_SPLASH_DIR || "/tmp/learn-splash-review";
  await mkdir(output, { recursive:true });
  for (const width of [390, 1440, 320]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:width === 1440 ? 900 : 844, deviceScaleFactor:1, mobile:width < 500 });
    await send("Network.setCacheDisabled", { cacheDisabled:true });
    await send("Fetch.enable", { patterns:[{ urlPattern:"*assets/paths/generated-literary-light.png", requestStage:"Request" }] });
    await send("Page.navigate", { url:base });
    await waitFor("document.querySelector('#app-splash [role=progressbar]')?.getAttribute('aria-valuenow') > 0");
    await delay(800);
    const state = await evaluate(`({ progress:Number(document.querySelector('#app-splash [role=progressbar]').getAttribute('aria-valuenow')), overflow:document.documentElement.scrollWidth>innerWidth, breathing:getComputedStyle(document.querySelector('.app-splash__mascot img')).animationName, locked:[...document.body.children].filter(e=>!['SCRIPT','TEMPLATE'].includes(e.tagName)&&e.id!=='app-splash').every(e=>e.inert) })`);
    assert.ok(state.progress < 100, "Unfinished assets never report completion");
    assert.equal(state.overflow, false);
    assert.equal(state.locked, true);
    assert.equal(state.breathing, "splash-breathe");
    await send("Input.dispatchKeyEvent", { type:"keyDown", key:"Tab", code:"Tab", windowsVirtualKeyCode:9 });
    await send("Input.dispatchKeyEvent", { type:"keyUp", key:"Tab", code:"Tab", windowsVirtualKeyCode:9 });
    assert.equal(await evaluate("document.activeElement === document.body || Boolean(document.activeElement.closest('#app-splash'))"), true);
    const shot = await send("Page.captureScreenshot", { format:"png" });
    await writeFile(`${output}/splash-${width}.png`, Buffer.from(shot.data, "base64"));
    // A preference change must stop already-running breathing and entrances.
    await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.app-splash__mascot img')).animationName"), "none");
    await release("assets/paths/generated-literary-light.png");
    // Cache-disabled requests from future markup may request the same asset.
    await send("Fetch.disable");
    await waitFor("!document.querySelector('#app-splash')");
    assert.equal(await evaluate("Boolean(document.querySelector('.visitor-landing')) && !document.querySelector('#visitor-flow-root').inert"), true);
    await waitFor("document.activeElement.id === 'visitor-title'");
    await evaluate("document.querySelector('[data-flow=register]').click()");
    await waitFor("document.querySelector('[data-onboarding-step=intro][data-media-state=ready]')");
    await waitFor("performance.getEntriesByType('resource').some(r=>r.name.includes('/ui/lesson-view.js'))");
    await waitFor("performance.getEntriesByType('resource').some(r=>r.name.includes('/ict/course-introduction.js'))");
    await send("Emulation.setEmulatedMedia", { features:[] });
  }
  // Failed required asset: show a keyboard-operable retry, then recover.
  await send("Fetch.enable", { patterns:[{ urlPattern:"*assets/paths/generated-literary-light.png", requestStage:"Request" }] });
  await send("Page.navigate", { url:base });
  await release("assets/paths/generated-literary-light.png", true);
  await waitFor("document.querySelector('.app-splash__recovery:not([hidden])')");
  assert.equal(await evaluate("document.activeElement.textContent"), "إعادة المحاولة");
  await send("Fetch.disable");
  await evaluate("document.activeElement.click()");
  await waitFor("!document.querySelector('#app-splash')");
  // Change destination while startup is in flight; only the latest route wins.
  await send("Fetch.enable", { patterns:[{ urlPattern:"*assets/icons/subject-lock.svg", requestStage:"Request" }] });
  await send("Page.navigate", { url:base + "?page=learn" });
  await waitFor("document.querySelector('.course-units.media-pending')");
  await evaluate("history.pushState({},'', '?flow=sign-in'); dispatchEvent(new PopStateEvent('popstate'))");
  await release("assets/icons/subject-lock.svg");
  await send("Fetch.disable");
  await waitFor("!document.querySelector('#app-splash') && document.querySelector('[data-sign-in-form]')");
  assert.equal(await evaluate("location.search"), "?flow=sign-in");
  assert.deepEqual(errors, []);
  console.log(`Splash checks passed: narrow/desktop, honest readiness, keyboard, live reduced motion, retry, background loading, interrupted navigation. Screenshots: ${output}`);
});
