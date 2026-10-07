import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { loadSubjectLessonPart } from "../../src/data/lessons/subject-lesson-registry.js";
import { withBrowserPage } from "./browser-page.mjs";

const artifactDir = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-ui-fixes";
await mkdir(artifactDir, { recursive:true });
const firstStep = async (lesson, part) => (await loadSubjectLessonPart("ict", lesson, part)).steps[0].id;
const accessFirst = await firstStep("database-management", "access-basics");
const sqlFirst = await firstStep("sql-queries", "sql-introduction");
const androidFirst = await firstStep("smartphone-operating-systems", "android-features");
const tablesFirst = await firstStep("database-management", "tables-and-types");
await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
  const partQuery = "?subject=ict&lesson=database-management&part=access-basics";
  const step = "document.querySelector('[data-live-authored-step]')?.dataset.lessonStep";
  const navigateDocument = async (method, params) => {
    let timer;
    let stop;
    const loaded = new Promise((resolve, reject) => {
      stop = onEvent(({ method: event }) => {
        if (event === "Page.loadEventFired") resolve();
      });
      timer = setTimeout(() => reject(new Error("Document navigation timed out")), 15000);
    });
    try {
      await send(method, params);
      await loaded;
    } finally { clearTimeout(timer); stop?.(); }
  };
  const visit = async (query, { ready = true } = {}) => {
    await navigateDocument("Page.navigate", { url:base + query });
    // Account/history actions must not race startup or its bfcache recovery.
    if (ready) await waitFor("!document.querySelector('#app-splash')");
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
  const completeQuestion = async () => {
    const previous = await evaluate(step);
    const choice = await evaluate(`(async () => {
      const { loadSubjectLesson } = await import('/src/data/lessons/subject-lesson-registry.js');
      const params = new URLSearchParams(location.search);
      const lesson = await loadSubjectLesson(params.get('subject'),params.get('lesson'));
      return lesson.steps.find(candidate=>candidate.id === ${JSON.stringify(previous)}).question.correctChoiceId;
    })()`);
    await evaluate(`document.querySelector('[data-ui-lab-answer="${choice}"]').click(); document.querySelector('[data-template-primary]').click()`);
    await waitFor("document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')");
    await evaluate("document.querySelector('[data-template-primary]').click()");
    await waitFor(`${step} !== ${JSON.stringify(previous)}`);
  };
  await send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true });
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
  for (const width of [1440,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:844, deviceScaleFactor:1, mobile:width === 390 });
    for (const [subject, lesson, question] of [["mathematics-2", "integral-area", "math-kamel-u5-p058-r2"], ["mathematics", "geometric-physical-applications", "math-kamel-u1-p042-r3"]]) {
      const query = `?subject=${subject}&lesson=${lesson}&part=${lesson}-practice&question=${question}`;
      await visit(query);
      await waitFor(`${step} === ${JSON.stringify(question)} && !document.querySelector('#app-splash')`);
      assert.equal(await evaluate("location.search"), query);
      assert.equal(await evaluate("[...document.querySelectorAll('#lesson-content .lesson-question-image img')].every(img => img.complete && img.naturalWidth > 0)"), true);
      assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
      await navigateDocument("Page.reload", {});
      await waitFor(`${step} === ${JSON.stringify(question)} && !document.querySelector('#app-splash')`);
    }
    await evaluate("setTimeout(() => history.back(), 0)");
    await waitFor(`${step} === 'math-kamel-u5-p058-r2' && !document.querySelector('#app-splash')`);
    await evaluate("setTimeout(() => history.forward(), 0)");
    await waitFor(`${step} === 'math-kamel-u1-p042-r3' && !document.querySelector('#app-splash')`);
  }
  await visit("?page=learn");
  await waitFor("document.querySelector('[data-subject=ict]')");
  await evaluate("document.querySelector('[data-subject=ict]').click()");
  await waitFor("document.querySelector('[data-roadmap-part=access-basics]')");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').click();document.querySelector('[data-bubble-start]').click()");
  await waitFor(`${step} === ${JSON.stringify(accessFirst)}`);
  assert.equal(await evaluate("location.search"), partQuery);
  assert.equal(await evaluate("Boolean(document.querySelector('[data-test-lesson-pass], [data-lesson-markdown-input], .lesson-markdown-source, .lesson-markdown-toggle'))"), false, "ordinary lesson has no authoring or preview controls");
  await completeQuestion();
  const savedStep = await evaluate(step);
  await navigateDocument("Page.reload", {});
  await waitFor(`${step} === ${JSON.stringify(savedStep)} && !document.querySelector('#app-splash')`);
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
  await waitFor(`${step} === ${JSON.stringify(savedStep)}`);
  assert.equal(await evaluate("location.search"), "?subject=ict&lesson=database-management&part=keys-and-relations", "published parts remain directly accessible while all levels are unlocked");
  await visit("?subject=ict&lesson=sql-queries&part=sql-introduction");
  await waitFor(`${step} === ${JSON.stringify(sqlFirst)}`);
  assert.equal(await evaluate("location.search"), "?subject=ict&lesson=sql-queries&part=sql-introduction", "published SQL opens through its stable URL");
  await visit("?subject=ict&lesson=smartphone-operating-systems&part=android-features");
  await waitFor(`${step} === ${JSON.stringify(androidFirst)}`);
  assert.equal(await evaluate("location.search"), "?subject=ict&lesson=smartphone-operating-systems&part=android-features", "published mobile lesson opens through its stable URL");
  await visit("?subject=ict&lesson=smartphone-operating-systems&part=files-sensors");
  await waitFor(`${step} === ${JSON.stringify(androidFirst)}`);

  const alphaAccount = (await api("register", { username:"route-alpha", email:"route-alpha@example.com", phone:"+972598000001", password:"Learn12345", curriculum:"gaza", path:"scientific" })).account;
  await visit(partQuery);
  await waitFor(`${step} === ${JSON.stringify(accessFirst)}`);
  await completeQuestion();
  const alphaStep = await evaluate(step);
  // Await an actual server-confirmed saved step before switching identities.
  await waitFor("document.querySelector('.progress-feedback')?.hidden === true");
  await api("sign-out");
  await api("register", { username:"route-beta", email:"route-beta@example.com", phone:"+972598000002", password:"Learn12345", curriculum:"gaza", path:"scientific" });
  await visit(partQuery);
  await waitFor(`${step} === ${JSON.stringify(accessFirst)}`);
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
  await waitFor(`${step} === ${JSON.stringify(tablesFirst)}`);
  await completeQuestion();
  await waitFor("document.querySelector('.progress-feedback')?.hidden === true");
  await evaluate("history.back()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
  await evaluate("document.querySelector('[data-auth-sign-out]').click()");
  await waitFor("document.body.dataset.accountType === 'guest' && document.querySelector('.subject-roadmap')");
  await evaluate("history.forward()");
  await waitFor(`${step} === ${JSON.stringify(savedStep)}`);
  assert.equal(await evaluate("location.search"), "?subject=ict&lesson=database-management&part=tables-and-types", "Forward opens the published part with the guest's own progress, not the signed-out member's saved step");
  await evaluate("history.back()");
  await waitFor("location.search === '?subject=ict' && document.querySelector('.subject-roadmap')");
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
  await visit(partQuery, { ready:false });
  let pauseTimeout;
  const requestId = await Promise.race([paused, new Promise((_, reject) => {
    pauseTimeout = setTimeout(() => reject(new Error("Lesson module was not delayed")), 15000);
  })]).finally(() => clearTimeout(pauseTimeout));
  await evaluate("document.querySelector('[data-page=more]').click()");
  await send("Fetch.continueRequest", { requestId });
  await send("Fetch.disable");
  stopEvents?.();
  await waitFor("location.search === '?page=more' && document.querySelector('.coming-soon.is-visible')");
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  assert.equal(await evaluate("Boolean(document.querySelector('[data-live-authored-step]'))"), false, "stale lesson load cannot replace later navigation");
  await writeFile(`${artifactDir}/route-results.json`, JSON.stringify({ restoredGuestStep:savedStep, restoredMemberStep:alphaStep, checks:["stable URL", "saved answer", "Back/Forward", "Exit without duplicate history", "invalid target", "unlocked published parts", "published mobile route", "account isolation", "guest progress on Forward after sign-out", "interrupted module", "reduced motion"] }, null, 2));
});
console.log("Lesson route browser checks passed: saved part/step, Back/Forward, published mobile route, account isolation, reduced motion, and interrupted loading.");
