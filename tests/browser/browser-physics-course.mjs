import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { PHYSICS_LESSONS } from "../../src/data/lessons/physics/physics-course.js";
import { findChrome, getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";

const evidence = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-physics-course";
const questionCount = PHYSICS_LESSONS.reduce((total, lesson) => total + lesson.questionIds.length, 0);
await mkdir(evidence, { recursive:true });
const port = await getAvailablePort();
const base = `http://127.0.0.1:${port}/`;
const server = spawn(process.execPath, ["dev-server.mjs"], {
  env:{ ...process.env, PORT:String(port), LIVE_RELOAD:"0", ACCOUNTS_DATABASE_PATH:":memory:" }, stdio:"ignore",
});
let browser;
try {
  await waitForServer(port);
  browser = await chromium.launch({ executablePath:await findChrome(), args:["--no-sandbox"] });
  const page = await browser.newPage({ viewport:{ width:1440, height:900 }, reducedMotion:"reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => {
    if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.route("**/*", route => route.request().url().startsWith(base) ? route.continue() : route.abort());
  await page.goto(base + "?page=learn");
  await page.locator('[data-subject="physics"] [data-subject-count]').waitFor();
  assert.equal(await page.locator('[data-subject="physics"] [data-subject-count]').innerText(), `0 / ${questionCount}`);
  await page.locator('[data-subject="physics"]').click();
  await page.locator('[data-roadmap-lesson="momentum-impulse"]').waitFor();
  assert.equal(await page.locator('.roadmap-unit').count(), 3);
  assert.deepEqual(await page.locator('.roadmap-part-copy small').allTextContents(), PHYSICS_LESSONS.map(lesson => `0 من ${lesson.questionIds.length} سؤالًا`));
  assert.equal(await page.locator('[data-roadmap-lesson="latex-test"]').count(), 0);
  for (const width of [1440,390]) {
    await page.setViewportSize({ width, height:900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path:`${evidence}/roadmap-${width}.png` });
  }
  await page.locator('[data-roadmap-lesson="momentum-impulse"]').click();
  await page.locator('[data-bubble-start]').click();
  await page.locator('[data-exam-card]').waitFor();
  assert.match(await page.locator('[data-exam-front]').innerText(), /ما وحدة قياس الزخم/);
  assert.equal(await page.locator('.lesson-top-title').getAttribute('aria-valuemax'), String(PHYSICS_LESSONS[0].questionIds.length));
  await page.locator('[data-exam-front] .lesson-flashcard-scroll').focus();
  await page.keyboard.press('Enter');
  await page.locator('[data-exam-solution]').waitFor({ state:'visible' });
  await page.locator('[data-template-primary]').click();
  await page.locator('.lesson-back').click();
  await page.locator('.roadmap-question-ring').first().waitFor();
  assert.equal(await page.locator('.roadmap-question-ring').first().getAttribute('aria-valuenow'), '1');
  await page.reload();
  await page.locator('.roadmap-question-ring').first().waitFor();
  assert.equal(await page.locator('.roadmap-question-ring').first().getAttribute('aria-valuenow'), '1');

  // Check every retained formula in the real browser's sanitizing renderer.
  const formulaAudit = await page.evaluate(async ids => {
    const [{ loadSubjectLesson }, { renderLatex, renderMathML }] = await Promise.all([
      import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/math.js'),
    ]);
    let count = 0;
    const invalid = [];
    for (const id of ids) {
      const lesson = await loadSubjectLesson('physics', id);
      for (const match of lesson.authoringSource.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g)) {
        const formula = match[1] ?? match[2] ?? match[3];
        if (renderLatex(formula, { display:match[1] === undefined }).includes('lesson-math-error')) invalid.push({ id, formula });
        count++;
      }
      for (const formula of lesson.authoringSource.match(/<math\b[\s\S]*?<\/math>/g) || []) {
        if (renderMathML(formula).includes('lesson-math-error')) invalid.push({ id, formula });
        count++;
      }
    }
    return { count, invalid };
  }, PHYSICS_LESSONS.map(lesson => lesson.id));
  assert.deepEqual(formulaAudit.invalid, []);
  const formulaCount = formulaAudit.count;
  assert.ok(formulaCount > 2000);

  // Exercise both existing question components, with original figures, in each lesson.
  for (const lesson of PHYSICS_LESSONS) {
    for (const type of ['mcq','exam-question']) {
      await page.evaluate(async ({ id, type }) => {
        window.physicsPreviewCleanup?.();
        const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
          import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js'),
        ]);
        const lesson = await loadSubjectLesson('physics', id);
        const steps = parseLessonMarkdown(lesson.authoringSource).steps;
        const step = steps.find(step => step.type === type && JSON.stringify(step).includes('source-crops/')) || steps.find(step => step.type === type);
        window.physicsPreviewCleanup = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), lesson.title, lesson, [step], {});
      }, { id:lesson.id, type });
      await page.locator(type === 'mcq' ? '[data-ui-lab-answer]' : '[data-exam-card]').first().waitFor();
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('#lesson-content img')].map(img => img.decode()));
      });
      for (const width of [1440,390]) {
        await page.setViewportSize({ width, height:900 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${lesson.id}/${type}/${width}`);
        assert.equal(await page.locator('.lesson-math-error').count(), 0);
        await page.screenshot({ path:`${evidence}/${lesson.id}-${type}-${width}.png` });
      }
      const zoom = page.locator('#lesson-content [data-summary-scan-zoom]:visible').first();
      if (await zoom.count()) {
        await zoom.click();
        assert.equal(await zoom.getAttribute('aria-expanded'), 'true');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        await page.keyboard.press('Escape');
        await page.locator('.lesson-question-image-viewer[open]').waitFor({ state:'hidden' });
        await page.waitForFunction(button => button.getAttribute('aria-expanded') === 'false', await zoom.elementHandle());
        assert.equal(await zoom.getAttribute('aria-expanded'), 'false');
      }
      if (type === 'mcq') {
        const correct = page.locator('[data-ui-lab-answer][data-correct="true"]');
        await correct.focus();
        await page.keyboard.press('Space');
        await page.locator('[data-template-primary]').click();
        assert.match(await page.locator('[data-ui-lab-feedback]').getAttribute('class'), /is-correct/);
      } else {
        assert.equal(await page.locator('[data-template-primary]').isDisabled(), true);
        await page.locator('[data-exam-front] .lesson-flashcard-scroll').focus();
        await page.keyboard.press('Enter');
        await page.locator('[data-exam-solution]').waitFor({ state:'visible' });
        assert.equal(await page.locator('[data-template-primary]').isDisabled(), false);
        assert.equal(await page.locator('.lesson-math-error').count(), 0);
        await page.screenshot({ path:`${evidence}/${lesson.id}-solution-390.png` });
      }
    }
  }
  // Inspect every new crop through its actual question component and image viewer.
  const bookFigures = await page.evaluate(async ids => {
    const [{ loadSubjectLesson }, { parseLessonMarkdown }] = await Promise.all([
      import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'),
    ]);
    const figures = new Map();
    for (const lessonId of ids) {
      const lesson = await loadSubjectLesson('physics', lessonId);
      for (const step of parseLessonMarkdown(lesson.authoringSource).steps) {
        for (const file of JSON.stringify(step).match(/assets\/lessons\/physics\/source-crops\/physics-book-[^)"]+\.webp/g) || []) {
          if (!figures.has(file)) figures.set(file, { lessonId, stepId:step.id, file });
        }
      }
    }
    return [...figures.values()];
  }, PHYSICS_LESSONS.map(lesson => lesson.id));
  assert.equal(bookFigures.length, 85);
  for (const figure of bookFigures) {
    await page.evaluate(async ({ lessonId, stepId }) => {
      window.physicsPreviewCleanup?.();
      const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
        import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js'),
      ]);
      const lesson = await loadSubjectLesson('physics', lessonId);
      const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step => step.id === stepId);
      window.physicsPreviewCleanup = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), lesson.title, lesson, [step], {});
    }, figure);
    for (const width of [1440,390]) {
      await page.setViewportSize({ width, height:900 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('#lesson-content img')].map(img => img.decode()));
      });
      assert.equal(await page.locator('.lesson-math-error').count(), 0, figure.stepId);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${figure.file}/${width}`);
      const zoom = page.locator('#lesson-content [data-summary-scan-zoom]:visible').first();
      await zoom.click();
      assert.equal(await zoom.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({ path:`${evidence}/${figure.file.split('/').at(-1)}-${width}.png` });
      await page.keyboard.press('Escape');
      await page.locator('.lesson-question-image-viewer[open]').waitFor({ state:'hidden' });
    }
  }
  await page.evaluate(() => window.physicsPreviewCleanup?.());
  await page.goto(base + '?subject=ict');
  await page.locator('.roadmap-question-ring').first().waitFor();
  assert.equal(await page.locator('.roadmap-question-ring').first().getAttribute('aria-valuenow'), '0');
  assert.deepEqual(errors, []);
  console.log(`Physics: 3 units, 7 lessons, ${questionCount} questions, ${formulaCount} formulas; desktop/mobile, original diagrams, keyboard, saved progress and ICT isolation passed.`);
} finally {
  await browser?.close();
  await terminateProcess(server);
}
