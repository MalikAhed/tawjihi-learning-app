import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";

const artifactDir = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-ui-fixes";
await mkdir(artifactDir, { recursive:true });
await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
  const partQuery = "?subject=ict&lesson=database-management&part=access-basics";
  const step = "document.querySelector('[data-live-authored-step]')?.dataset.lessonStep";
  const visit = async (query) => {
    const origin = await evaluate("performance.timeOrigin");
    await send("Page.navigate", { url:base + query });
    await waitFor(`performance.timeOrigin !== ${origin} && document.readyState !== 'loading'`);
  };
  const api = (endpoint, body = {}) => evaluate(`(async () => {
    const response = await fetch('/api/auth/${endpoint}', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(${JSON.stringify(body)})});
    const result = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(result));
    return result;
  })()`);
  const screenshot = async (name) => {
    const { data } = await send("Page.captureScreenshot", { format:"png", captureBeyondViewport:false });
    await writeFile(`${artifactDir}/${name}.png`, Buffer.from(data, "base64"));
  };
  const advanceToQuestion = async () => {
    for (let count = 0; count < 2; count++) {
      const previous = await evaluate(step);
      await evaluate("document.querySelector('[data-template-primary]').click()");
      await waitFor(`${step} && ${step} !== ${JSON.stringify(previous)}`);
    }
    await waitFor("document.querySelector('[data-ui-lab-answer=update]')");
  };
  await send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true });
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
  await visit("?page=learn");
  await waitFor("document.querySelector('[data-subject=ict]')");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("document.querySelector('[data-roadmap-part=access-basics]')");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click();document.querySelector('[data-bubble-start]').click()");
  await waitFor(`${step} === 'database-management-mission'`);
  assert.equal(await evaluate("location.search"), partQuery);
  assert.equal(await evaluate("Boolean(document.querySelector('[data-test-lesson-pass], [data-lesson-markdown-input], .lesson-markdown-source, .lesson-markdown-toggle'))"), false, "ordinary lesson has no authoring or preview controls");
  await advanceToQuestion();
  await evaluate("document.querySelector('[data-ui-lab-answer=update]').click();document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')");
  const questionStep = await evaluate(step);
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor(`${step} !== ${JSON.stringify(questionStep)}`);
  const savedStep = await evaluate(step);
  const reloadOrigin = await evaluate("performance.timeOrigin");
  await send("Page.reload");
  await waitFor(`performance.timeOrigin !== ${reloadOrigin}`);
  await waitFor(`${step} === ${JSON.stringify(savedStep)}`);
  await screenshot("route-restored-mobile");
  await evaluate("history.back()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
  await evaluate("history.forward()");
  await waitFor(`location.search === ${JSON.stringify(partQuery)} && ${step} === ${JSON.stringify(savedStep)}`);
  await evaluate("document.querySelector('.lesson-back').click();document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
  assert.equal(await evaluate("document.activeElement.dataset.roadmapPart"), "access-basics");
  await evaluate("history.back()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('main').classList.contains('lesson-mode')");

  await visit("?subject=ict&lesson=course-introduction&part=access-basics");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
  await visit("?subject=ict&lesson=database-management&part=keys-and-relations");
  await waitFor("location.search === '?subject=ict' && document.querySelector('[data-roadmap-bubble]')?.hidden === false");
  assert.equal(await evaluate("Boolean(document.querySelector('[data-live-authored-step]'))"), false, "direct link cannot bypass sequence");
  assert.match(await evaluate("document.querySelector('[data-roadmap-bubble]').textContent"), /السابق|برامج إدارة/);
  await visit("?subject=ict&lesson=sql-queries&part=sql-introduction");
  await waitFor("location.search === '?subject=ict' && document.querySelector('[data-roadmap-bubble]')?.hidden === false");
  assert.match(await evaluate("document.querySelector('[data-roadmap-bubble]').textContent"), /قيد الإعداد|إعداد هذا الجزء/);
  assert.equal(await evaluate("document.querySelector('[data-bubble-start]').disabled"), true);

  const alphaAccount = (await api("register", { username:"route-alpha", email:"route-alpha@example.com", phone:"+972598000001", password:"Learn12345", curriculum:"gaza", path:"scientific" })).account;
  await visit(partQuery);
  await waitFor(`${step} === 'database-management-mission'`);
  await advanceToQuestion();
  const alphaStep = await evaluate(step);
  // Await an actual server-confirmed saved step before switching identities.
  await waitFor("document.querySelector('.progress-feedback')?.hidden === true");
  await api("sign-out");
  await api("register", { username:"route-beta", email:"route-beta@example.com", phone:"+972598000002", password:"Learn12345", curriculum:"gaza", path:"scientific" });
  await visit(partQuery);
  await waitFor(`${step} === 'database-management-mission'`);
  await api("sign-out");
  await api("sign-in", { identifier:"route-alpha", password:"Learn12345" });
  await visit(partQuery);
  await waitFor(`${step} === ${JSON.stringify(alphaStep)}`);

  await evaluate(`(async () => {
    const { loadSubjectLessonPart } = await import('/src/data/lessons/subject-lesson-registry.js');
    const lesson = await loadSubjectLessonPart('ict','database-management','access-basics');
    const response = await fetch('/api/progress', { method:'POST', headers:{'Content-Type':'application/json','X-Progress-Owner':${JSON.stringify("account:" + alphaAccount.id)}}, body:JSON.stringify({id:crypto.randomUUID(),type:'completion',subjectId:'ict',lessonId:'database-management',partId:'access-basics',completedStepIds:lesson.steps.map(step=>step.id),isComplete:true}) });
    if (!response.ok) throw new Error('Could not prepare the isolated member progression fixture');
  })()`);
  await visit("?page=learn");
  await waitFor("document.querySelector('[data-subject=ict]') && document.body.dataset.accountType === 'free'");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("document.querySelector('[data-roadmap-part=tables-and-types]')");
  await evaluate("document.querySelector('[data-roadmap-part=tables-and-types]').scrollIntoView({block:'center',behavior:'instant'});document.querySelector('[data-roadmap-part=tables-and-types]').click();document.querySelector('[data-bubble-start]').click()");
  await waitFor(`${step} === 'tables-fields-records'`);
  await evaluate("history.back()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
  await evaluate("document.querySelector('[data-auth-sign-out]').click()");
  await waitFor("document.body.dataset.accountType === 'guest' && document.querySelector('.subject-roadmap')");
  await evaluate("history.forward()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('[data-roadmap-bubble]')?.hidden === false");
  assert.equal(await evaluate("Boolean(document.querySelector('[data-live-authored-step]'))"), false, "Forward cannot restore the signed-out member's unlocked part");
  await evaluate("history.back()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('main').classList.contains('lesson-mode')");
  await api("sign-in", { identifier:"route-alpha", password:"Learn12345" });

  // Pause a genuine lesson module and leave while it is still loading.
  let releaseRequest;
  const paused = new Promise((resolve) => { releaseRequest = resolve; });
  const stopEvents = onEvent(({ method, params }) => {
    if (method === "Fetch.requestPaused") releaseRequest(params.requestId);
  });
  await send("Network.setCacheDisabled", { cacheDisabled:true });
  await send("Fetch.enable", { patterns:[{ urlPattern:"*/src/data/lessons/ict/database-management.js", requestStage:"Request" }] });
  await visit(partQuery);
  let pauseTimeout;
  const requestId = await Promise.race([paused, new Promise((_, reject) => {
    pauseTimeout = setTimeout(() => reject(new Error("Lesson module was not delayed")), 15000);
  })]).finally(() => clearTimeout(pauseTimeout));
  await evaluate("document.querySelector('[data-page=quests]').click()");
  await send("Fetch.continueRequest", { requestId });
  await send("Fetch.disable");
  stopEvents?.();
  await waitFor("location.search === '?page=quests' && document.querySelector('.coming-soon.is-visible')");
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  assert.equal(await evaluate("Boolean(document.querySelector('[data-live-authored-step]'))"), false, "stale lesson load cannot replace later navigation");
  await writeFile(`${artifactDir}/route-results.json`, JSON.stringify({ restoredGuestStep:savedStep, restoredMemberStep:alphaStep, checks:["stable URL", "saved answer", "Back/Forward", "Exit without duplicate history", "invalid target", "sequence gate", "publication gate", "account isolation", "gated Forward after sign-out", "interrupted module", "reduced motion"] }, null, 2));
});
console.log("Lesson route browser checks passed: saved part/step, Back/Forward, invalid and gated links, account isolation, reduced motion, and interrupted loading.");
