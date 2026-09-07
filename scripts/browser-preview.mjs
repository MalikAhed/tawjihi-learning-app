import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import { previewDirectory } from "./package-preview.mjs";
import { startPreviewServer } from "./preview-server.mjs";
import { withBrowserPage } from "./browser-page.mjs";

for (const forbidden of ["src/server", "data", "scripts", "tests", "node_modules/typescript", "node_modules/playwright", "node_modules/axe-core"]) {
  await assert.rejects(access(path.join(previewDirectory, forbidden)), `Artifact must exclude ${forbidden}`);
}
const server = await startPreviewServer();
try {
  await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
    const failures = [];
    onEvent(({ method, params }) => {
      if (method === "Network.requestWillBeSent" && new URL(params.request.url).pathname.includes("/api/")) failures.push("Unexpected API request: " + params.request.url);
      if (method === "Network.responseReceived" && params.response.url.startsWith(base) && params.response.status >= 400) failures.push(`${params.response.status}: ${params.response.url}`);
      if (method === "Runtime.exceptionThrown") failures.push(params.exceptionDetails.exception?.description || params.exceptionDetails.text);
    });
    const navigate = async (route) => {
      const previous = await evaluate("performance.timeOrigin");
      await send("Page.navigate", { url:base + route });
      await waitFor(`performance.timeOrigin !== ${previous} && document.querySelector('.visitor-shell, .course-units, .current-system')`);
    };
    await navigate("");
    await waitFor("document.querySelector('.visitor-landing') && !document.querySelector('.media-pending')");
    assert.equal(await evaluate("document.querySelector('meta[name=learn-account-mode]').content"), "fixture");
    await evaluate("document.querySelector('[data-flow=register]').click()");
    await waitFor("document.querySelector('[data-guest-start]') && !document.querySelector('.media-pending')");
    await evaluate("document.querySelector('[data-guest-start]').click()");
    await waitFor("document.querySelector('[data-guest-dashboard]') && !document.body.classList.contains('product-flow-active')");
    await evaluate("document.querySelector('[data-subject=ict]').click()");
    await waitFor("document.querySelector('[data-roadmap-part]')");
    const introduction = await evaluate("document.querySelector('[data-roadmap-lesson=course-introduction] [data-roadmap-part]')?.dataset.roadmapPart || document.querySelector('[data-roadmap-part]').dataset.roadmapPart");
    const openIntroduction = async () => {
      await evaluate(`document.querySelector('[data-roadmap-part="${introduction}"]').click();document.querySelector('[data-bubble-start]').click()`);
      await waitFor("document.querySelector('[data-live-authored-step]') && !document.querySelector('.media-pending')");
    };
    const completeIntroduction = async () => {
      for (let index = 0; index < 12; index += 1) {
        await waitFor("document.querySelector('.subject-completion') || document.querySelector('[data-template-primary]') && !document.querySelector('.media-pending,.app-loading')");
        if (await evaluate("Boolean(document.querySelector('.subject-completion'))")) return;
        await evaluate("if (!document.querySelector('[data-ui-lab-answer=retry][aria-pressed=true]')) document.querySelector('[data-ui-lab-answer=retry]')?.click();document.querySelector('[data-template-primary]').click()");
      }
      throw new Error("Static introduction did not complete: " + JSON.stringify(await evaluate("({step:document.querySelector('[data-live-authored-step]')?.dataset.lessonStep, action:document.querySelector('[data-template-primary]')?.outerHTML})")));
    };
    const exitCompletion = async () => {
      await evaluate("document.querySelector('[data-authored-restart]').click()");
      await waitFor("document.querySelector('[data-completion-step=\"1\"]') && !document.querySelector('.media-pending')");
      await evaluate("document.querySelector('[data-authored-restart]').click()");
      await waitFor("document.querySelector('.subject-roadmap')");
    };
    await openIntroduction();
    await completeIntroduction();
    await exitCompletion();
    await waitFor("document.querySelector('.subject-roadmap')");
    assert.equal(await evaluate(`document.querySelector('[data-roadmap-part="${introduction}"]').dataset.partState`), "completed");
    await navigate("?flow=sign-in");
    const signIn = async () => {
      await waitFor("document.querySelector('[data-sign-in-form]') && !document.querySelector('.media-pending')");
      await evaluate("document.querySelector('[name=identifier]').value='free';document.querySelector('[name=password]').value='Learn123';document.querySelector('[data-sign-in-form]').requestSubmit()");
      await waitFor("document.querySelector('[data-learner-dashboard]') && !document.querySelector('.media-pending')");
    };
    await signIn();
    assert.equal(await evaluate("document.querySelector('.dashboard-progress--level').getAttribute('aria-valuenow')"), "0");
    await evaluate("document.querySelector('[data-subject=ict]').click()");
    await waitFor("document.querySelector('.subject-roadmap')");
    await openIntroduction();
    await completeIntroduction();
    await exitCompletion();
    await waitFor("document.querySelector('.subject-roadmap')");
    await evaluate("document.querySelector('.lesson-back').click()");
    await waitFor("!document.querySelector('.progress-feedback:not([hidden])') && document.querySelector('[data-learner-dashboard]')");
    assert.equal(await evaluate("document.querySelector('.dashboard-progress--level').getAttribute('aria-valuenow')"), "10");
    await navigate("?page=learn");
    await waitFor("document.querySelector('[data-auth-flow=sign-in]')");
    assert.equal(await evaluate("Boolean(document.querySelector('[data-learner-dashboard]'))"), false);
    await navigate("?flow=sign-in");
    await signIn();
    assert.equal(await evaluate("document.querySelector('.dashboard-progress--level').getAttribute('aria-valuenow')"), "10");
    for (const [route, selector] of [["design-system", ".current-system .system-section"], ["ship-ready-code-lab", ".cm-editor"], ["ui-lab", ".playground-board"]]) {
      await navigate(`?view=${route}`);
      await waitFor(`document.querySelector(${JSON.stringify(selector)}) && !document.querySelector('[aria-busy=true],.media-pending')`);
      await evaluate("document.fonts.ready.then(()=>true)");
    }
    assert.deepEqual(failures, []);
  }, { baseUrl:server.base });
} finally { await server.close(); }
console.log("Packaged-static Chromium checks passed under /learn-preview/: guest lesson, fixture login, Home consistency, refresh isolation, reference assets; zero API requests.");
