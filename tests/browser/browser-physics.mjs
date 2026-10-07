import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { PHYSICS_LESSONS } from "../../src/data/lessons/physics/physics-course.js";
import { findChrome, getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";

const evidence = "/tmp/learn-physics-latex";
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
  for (const width of [1440,390]) {
    const context = await browser.newContext({ viewport:{ width, height:900 }, reducedMotion:"reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    // All runtime math must work without external requests.
    await page.route("**/*", route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    await page.goto(base + "?subject=physics");
    await page.locator('[data-roadmap-lesson="momentum-impulse"]').waitFor();
    assert.equal(await page.locator('[data-roadmap-lesson]').count(), 7);
    assert.equal(await page.locator('[data-roadmap-lesson="latex-test"]').count(), 0);
    assert.equal(await page.locator('.roadmap-unit-header').count(), 3);
    await page.screenshot({ path:`${evidence}/roadmap-${width}.png` });
    await page.locator('[data-roadmap-lesson="momentum-impulse"]').click();
    await page.locator('[data-bubble-start]').click();
    await page.locator('[data-exam-card]').waitFor();
    // Keep the renderer's complex LaTeX regression samples outside the course.
    await page.evaluate(async () => {
      const [{ loadSubjectLesson }, { renderAuthoredInteractiveLesson }, { parseLessonMarkdown }] = await Promise.all([
        import('./src/data/lessons/subject-lesson-registry.js'), import('./src/ui/lesson/authored.js'), import('./src/markdown/lesson-authoring.js'),
      ]);
      const sample = await loadSubjectLesson('physics', 'latex-test');
      window.physicsSampleCleanup = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), sample.title, sample, parseLessonMarkdown(sample.authoringSource).steps, {});
    });
    await page.locator('[data-ui-lab-answer="nine"] math').waitFor();
    const checkLayout = async () => {
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('.lesson-math-error').count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await page.locator('.lesson-math-scroll').evaluateAll(nodes => nodes.every(node =>
        getComputedStyle(node).direction === 'ltr' && node.scrollLeft === 0)), true);
      assert.equal(await page.locator('#lesson-content math').evaluateAll(nodes => nodes.every(node =>
        node.getAttribute('dir') === 'ltr' && node.namespaceURI === 'http://www.w3.org/1998/Math/MathML'
        && !node.textContent.includes('\\') && !node.querySelector('bdi,span,script,a'))), true);
    };
    await checkLayout();
    assert.equal(await page.locator('[data-ui-lab-answer] math').count(), 3);
    assert.equal(await page.locator('.ui-lab-mcq > h1 math').count(), 3);
    await page.screenshot({ path:`${evidence}/mcq-${width}.png` });
    await page.locator('[data-ui-lab-answer="nine"]').focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('[data-ui-lab-answer="nine"]').getAttribute('aria-pressed'), 'true');
    await page.locator('[data-template-primary]').click();
    assert.match(await page.locator('[data-ui-lab-feedback]').getAttribute('class'), /is-correct/);
    await checkLayout();
    await page.screenshot({ path:`${evidence}/feedback-${width}.png` });
    await page.locator('[data-template-primary]').click();
    await page.locator('[data-exam-card]').waitFor();
    await checkLayout();
    assert.ok(await page.locator('[data-exam-front] math').count() >= 6);
    assert.equal(await page.locator('[data-template-primary]').isDisabled(), true);
    await page.screenshot({ path:`${evidence}/card-front-${width}.png` });
    await page.locator('[data-exam-front] .lesson-flashcard-scroll').focus();
    await page.keyboard.press('Enter');
    await page.locator('[data-exam-solution]').waitFor({ state:'visible' });
    await checkLayout();
    assert.ok(await page.locator('[data-exam-solution] mtable').count() >= 3);
    assert.ok(await page.locator('[data-exam-solution] msqrt').count() >= 1);
    assert.equal(await page.locator('[data-template-primary]').isDisabled(), false);
    await page.screenshot({ path:`${evidence}/card-back-${width}.png` });
    await page.keyboard.press('Space');
    await page.locator('[data-exam-front]').waitFor({ state:'visible' });
    await page.keyboard.press('Enter');
    await page.locator('[data-exam-solution]').waitFor({ state:'visible' });
    const rendererChecks = await page.evaluate(async () => {
      const { renderMarkdownDocument, renderMarkdownInline } = await import('./src/markdown/renderer.js');
      const { renderLatex } = await import('./src/markdown/math.js');
      const samples = [
        String.raw`قبل \(\frac{1}{2}mv^2\) وبعد`,
        '`latex: \\sqrt{x}`',
        String.raw`\[\int_0^1 x\,\mathrm{d}x\]`,
        '$$x^2$$',
        '```latex\nx^2\n```',
      ];
      const valid = samples.every(source => {
        const markup = renderMarkdownDocument(source);
        return markup.includes('<math') && !markup.includes('lesson-math-error');
      });
      return {
        valid,
        invalid:renderLatex(String.raw`\unknowncommand{x}`).includes('lesson-math-error'),
        safe:!/<a|href=|style=|<script|<img/.test(renderMarkdownInline(String.raw`\(\href{javascript:alert(1)}{x}\)`)),
        mathml:renderMarkdownInline('`mathml: <math dir="rtl"><msup><mi>س</mi><mn>٢</mn></msup></math>`').includes('dir="rtl"'),
      };
    });
    assert.deepEqual(rendererChecks, { valid:true, invalid:true, safe:true, mathml:true });
    // The hidden samples never add questions to the real subject's count.
    assert.equal(await page.evaluate(async () => {
      const { getSubjectCardPresentation } = await import('./src/ui/course-map.js');
      const { getCourseSubject } = await import('./src/data/course.js');
      return getSubjectCardPresentation(getCourseSubject('physics')).totalCount;
    }), PHYSICS_LESSONS.reduce((total, lesson) => total + lesson.questionIds.length, 0));
    await page.evaluate(() => window.physicsSampleCleanup?.());
    assert.deepEqual(errors, []);
    console.log(`${width}px: Physics route, MCQ choices/feedback, card keyboard flips, inline Arabic/LaTeX, blocks, safe rendering and offline assets passed`);
    await context.close();
  }
} finally {
  await browser?.close();
  await terminateProcess(server);
}
