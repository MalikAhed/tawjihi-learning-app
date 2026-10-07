import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { getSubjectRoadmap } from "../../src/data/subject-roadmaps.js";
import { loadSubjectLesson } from "../../src/data/lessons/subject-lesson-registry.js";
import { findChrome, getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";

const evidence = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-math-course";
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
  const roadmap = getSubjectRoadmap("mathematics");
  const lessons = roadmap.units.flatMap(unit => unit.lessons.filter(lesson => !lesson.hidden));
  const questionCounts = await Promise.all(lessons.map(async lesson => {
    const content = await loadSubjectLesson("mathematics", lesson.id);
    const ids = content.steps.filter(step => step.type !== "markdown").map(step => step.id);
    assert.deepEqual(lesson.parts.flatMap(part => part.questionIds), ids, `${lesson.id}: level IDs must match real questions`);
    return ids.length;
  }));
  await page.goto(base + "?subject=mathematics");
  await page.locator('[data-roadmap-lesson]').first().waitFor();
  assert.equal(await page.locator('[data-roadmap-lesson="math-symbols"]').count(), 0);
  assert.equal(await page.locator(".roadmap-level-art").count(), lessons.length);
  assert.deepEqual(await page.locator(".roadmap-question-ring").evaluateAll(nodes => nodes.map(node => Number(node.getAttribute("aria-valuemax")))),
    questionCounts);
  assert.deepEqual(await page.locator(".roadmap-part-copy small").allTextContents(), questionCounts.map(count => `0 من ${count} سؤالًا`));
  for (const width of [1440,390]) {
    await page.setViewportSize({ width, height:900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path:`${evidence}/roadmap-${width}.png` });
  }
  // Render the actual source items with the shared ICT components. Preview mode
  // keeps this broad layout review independent of the progress check below.
  let mcqs = 0, cards = 0;
  for (const lesson of lessons) {
    const types = await page.evaluate(async lessonId => {
      const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderMathML }] = await Promise.all([
        import("./src/data/lessons/subject-lesson-registry.js"), import("./src/markdown/lesson-authoring.js"), import("./src/markdown/math.js"),
      ]);
      const lesson = await loadSubjectLesson("mathematics", lessonId);
      const parsed = parseLessonMarkdown(lesson.authoringSource, { published:true });
      if (parsed.issues.length) throw new Error(parsed.issues.join("; "));
      for (const formula of lesson.authoringSource.match(/<math\b[\s\S]*?<\/math>/g) || []) {
        if (renderMathML(formula).includes("lesson-math-error")) throw new Error(`Invalid formula in ${lessonId}`);
      }
      return [...new Set(parsed.steps.map(step => step.type))];
    }, lesson.id);
    for (const type of types) {
      assert.ok(["mcq", "exam-question"].includes(type));
      await page.evaluate(async ({ lessonId, type }) => {
        window.mathCoursePreviewCleanup?.();
        const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
          import("./src/data/lessons/subject-lesson-registry.js"), import("./src/markdown/lesson-authoring.js"), import("./src/ui/lesson/authored.js"),
        ]);
        const lesson = await loadSubjectLesson("mathematics", lessonId);
        const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step => step.type === type);
        window.mathCoursePreviewCleanup = renderAuthoredInteractiveLesson(document.querySelector("#lesson-content"), lesson.title, lesson, [step], {});
      }, { lessonId:lesson.id, type });
      await page.locator(type === "mcq" ? "[data-ui-lab-answer]" : "[data-exam-card]").first().waitFor();
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll("#lesson-content img")].map(img => img.decode()));
      });
      assert.equal(await page.locator("#lesson-content").evaluate(root => [...root.querySelectorAll('.lesson-flashcard-copy, .lesson-flashcard-copy p, .lesson-flashcard-copy h1, .ui-lab-mcq > h1, .lesson-question-example, math, mi, mn, mo:not([stretchy="true"]):not([largeop="true"]), mtext')].every(node => getComputedStyle(node).fontFamily.startsWith("Amiri"))), true, `${lesson.id}/${type}: Amiri question text and formulas`);
      assert.equal(await page.locator("#lesson-content").evaluate(root => [...root.querySelectorAll('button')].every(node => getComputedStyle(node).fontFamily.startsWith('"Noto Sans Arabic"'))), true, `${lesson.id}/${type}: standard button font`);
      for (const width of [1440,390]) {
        await page.setViewportSize({ width, height:900 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${lesson.id}/${type}/${width}`);
        assert.equal(await page.locator(".lesson-math-error").count(), 0);
        await page.screenshot({ path:`${evidence}/${lesson.id}-${type}-${width}.png` });
      }
      if (type === "mcq") {
        mcqs++;
        const correct = page.locator('[data-ui-lab-answer][data-correct="true"]');
        await correct.focus();
        await page.keyboard.press("Space");
        assert.equal(await correct.getAttribute("aria-pressed"), "true");
        await page.locator("[data-template-primary]").click();
      } else {
        cards++;
        assert.equal(await page.locator("[data-exam-solution]").isVisible(), false);
        assert.equal(await page.locator("[data-template-primary]").isDisabled(), true);
        await page.locator("[data-exam-front] .lesson-flashcard-scroll").focus();
        await page.keyboard.press("Enter");
        assert.equal(await page.locator("[data-exam-solution]").isVisible(), true);
        assert.equal(await page.locator("[data-template-primary]").isDisabled(), false);
        await page.screenshot({ path:`${evidence}/${lesson.id}-solution-390.png` });
      }
    }
  }
  assert.ok(mcqs > 0 && cards > 0);
  await page.evaluate(() => { window.mathCoursePreviewCleanup?.(); });
  await page.goto(base + "?subject=mathematics");
  await page.locator("[data-roadmap-lesson]").first().click();
  await page.locator("[data-bubble-start]").click();
  await page.locator("[data-exam-card]").waitFor();
  assert.equal(await page.locator(".lesson-top-title").getAttribute("aria-valuemax"), String(questionCounts[0]));
  await page.locator("[data-exam-front] .lesson-flashcard-scroll").focus();
  await page.keyboard.press("Enter");
  await page.locator("[data-template-primary]").click();
  await page.locator(".lesson-back").click();
  await page.locator(".roadmap-question-ring").first().waitFor();
  assert.equal(await page.locator(".roadmap-question-ring").first().getAttribute("aria-valuenow"), "1");
  await page.reload();
  await page.locator(".roadmap-question-ring").first().waitFor();
  assert.equal(await page.locator(".roadmap-question-ring").first().getAttribute("aria-valuenow"), "1");
  await page.goto(base + "?subject=ict");
  await page.locator(".roadmap-question-ring").first().waitFor();
  assert.equal(await page.locator(".roadmap-question-ring").first().getAttribute("aria-valuenow"), "0");
  assert.deepEqual(errors, []);
  console.log(`Math course: ${lessons.length} lessons; ${mcqs} MCQ and ${cards} flashcard layouts; desktop/mobile, keyboard, original images, saved progress and ICT isolation passed.`);
} finally {
  await browser?.close();
  await terminateProcess(server);
}
