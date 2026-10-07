import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { findChrome, getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";

const originalBody = `اقرأ الجدول ثم أجب عن البندين.

| Num | Name | Mark |
| --- | --- | --- |
| 101 | علي | 90 |
| 102 | سارة | 80 |

1. اكتب نتيجة الاستعلام.
2. وضح وظيفة الشرط.

\`\`\`sql
SELECT Student.Name, Student.Mark FROM Student WHERE Student.Mark >= 80 AND Student.Mark <= 100 ORDER BY Student.Mark DESC;
\`\`\`

![الشكل الأصلي للسؤال](assets/lessons/ict/exams/book-p54-bmi.webp)`;
const fixture = `:::exam-question
id: written-source-one
title: سؤال كتابي
question: أجب عن السؤال كما ورد
reference: مصدر الاختبار، PDF ص 3، السؤال 2
answer-label: حل تعليمي للمقارنة
body:
${originalBody}
solution:
الناتج المرجعي: علي ثم سارة.

| Name | Mark |
| --- | --- |
| علي | 90 |
| سارة | 80 |

![الرسم الأصلي للإجابة](assets/lessons/ict/exams/book-p12-center-solution.webp)

${Array.from({length:16}, (_, index) => `الخطوة ${index + 1}: قارن قيم السجلات بالشروط، ثم راجع النتيجة بالترتيب المطلوب.`).join("\n\n")}
guidance:
افحص الشرط ثم رتب السجلات؛ اكتب أسماء الحقول كما وردت.
:::`;
const nextQuestion = fixture.replaceAll("written-source-one", "written-source-two");
const port = await getAvailablePort();
const server = spawn(process.execPath, ["dev-server.mjs"], {
  env:{ ...process.env, PORT:String(port), LIVE_RELOAD:"0", ACCOUNTS_DATABASE_PATH:":memory:" }, stdio:"ignore",
});
let browser;
try {
  await mkdir('/tmp/ict-questions/flashcards', {recursive:true});
  await waitForServer(port);
  browser = await chromium.launch({ executablePath:await findChrome(), args:["--no-sandbox"] });
  for (const viewport of [{ width:1280, height:900 }, { width:390, height:844 }, { width:390, height:568 }, { width:844, height:390 }]) {
    const reducedMotion = viewport.width === 1280 ? "no-preference" : "reduce";
    const context = await browser.newContext({ viewport, reducedMotion });
    try {
      // Use production styles and renderers with an isolated source fixture; no account or paper bank is needed.
      await context.route("**/src/bootstrap.js", route => route.fulfill({ contentType:"text/javascript", body:"" }));
      const page = await context.newPage();
      const errors = [];
      const mutations = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("request", request => { if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method())) mutations.push(request.url()); });
      await page.goto(`http://127.0.0.1:${port}/`);
      await page.evaluate(async source => {
        document.querySelectorAll("link[data-app-style]").forEach(link => { link.media = "all"; });
        const [{ parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
          import("/src/markdown/lesson-authoring.js"), import("/src/ui/lesson/authored.js"),
        ]);
        const { steps, issues } = parseLessonMarkdown(source, { published:true });
        if (issues.length) throw new Error(issues.join("; "));
        const shell = document.querySelector(".lesson-shell");
        document.body.replaceChildren(shell);
        document.body.removeAttribute("data-startup");
        window.examAnswers = [];
        window.examProgress = [];
        window.examCleanup = renderAuthoredInteractiveLesson(shell.querySelector(".lesson-card"), "تدريب", {
          title:"أسئلة المصدر", summary:"مراجعة ذاتية", authoringSource:source,
        }, steps, {
          onAnswer:answer => window.examAnswers.push(answer),
          onProgress:progress => window.examProgress.push(progress),
        });
      }, `${fixture}\n\n${nextQuestion}`);
      await page.locator("[data-exam-front] img").waitFor();
      await page.waitForFunction(() => [...document.querySelectorAll(".lesson-exam-question img")].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.locator("[data-live-authored-step]").getAttribute("data-lesson-step"), "written-source-one");
      assert.equal(await page.locator(".lesson-exam-question table").first().locator("tbody tr").count(), 2);
      assert.equal(await page.locator(".lesson-exam-question ol li").count(), 2);
      assert.match(await page.locator(".lesson-exam-question pre code").innerText(), /SELECT Student\.Name.*ORDER BY Student\.Mark DESC;/);
      assert.equal(await page.locator("[data-exam-front] img").getAttribute("alt"), "الشكل الأصلي للسؤال");
      const figureZoom = page.locator("[data-exam-front] [data-summary-scan-zoom]");
      await figureZoom.focus();
      await figureZoom.press("Enter");
      const figureViewport = page.locator("[data-exam-front] .lesson-summary-scan-viewport");
      assert.equal(await figureZoom.getAttribute("aria-expanded"), "true");
      assert.equal(await figureViewport.evaluate(element => element === document.activeElement && element.scrollWidth > element.clientWidth), true, "keyboard zoom focuses a pannable original figure");
      await figureViewport.press("ArrowLeft");
      await page.waitForFunction(() => Math.abs(document.querySelector(".lesson-summary-scan-viewport").scrollLeft) > 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, "zoom never widens the lesson");
      await figureZoom.focus();
      await figureZoom.press("Enter");
      assert.equal(await figureZoom.getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator("[data-exam-solution]").getAttribute("aria-hidden"), "true", "zoom never flips the card");
      assert.equal(await page.locator("[data-exam-solution]").isVisible(), false);
      assert.equal(await page.locator("[data-template-primary]").isDisabled(), true);
      assert.doesNotMatch(await page.locator(".lesson-exam-question").innerText(), /الناتج المرجعي/);
      assert.deepEqual(await page.evaluate(() => window.examAnswers), []);

      assert.equal(await page.locator(".lesson-exam-question textarea, .lesson-exam-question input, .lesson-exam-question [contenteditable]").count(), 0);
      assert.equal(await page.locator(".lesson-exam-question h1").innerText(), "اقرأ الجدول ثم أجب عن البندين.");
      const fixedBounds = await page.locator('[data-exam-card]').boundingBox();
      await page.locator('[data-exam-front] .lesson-flashcard-scroll').evaluate(node=>node.scrollTop=0);
      await page.screenshot({path:`/tmp/ict-questions/flashcards/front-${viewport.width}-${viewport.height}.png`});
      const questionScroll = page.locator("[data-exam-front] .lesson-flashcard-scroll");
      await questionScroll.focus();
      await questionScroll.press("Enter");
      assert.equal(await page.locator("[data-exam-solution]").isVisible(), true);
      if (reducedMotion === 'no-preference') assert.equal(await page.locator('.lesson-flashcard-rotor').evaluate(node=>node.getAnimations().length > 0), true, 'turning the card animates');
      await page.waitForFunction(()=>document.querySelector('[data-exam-front]').hidden);
      assert.equal(await page.evaluate(() => document.activeElement === document.querySelector("[data-exam-solution] .lesson-flashcard-scroll")), true);
      assert.match(await page.locator("[data-exam-solution]").innerText(), /الناتج المرجعي: علي ثم سارة/);
      assert.deepEqual(await page.evaluate(() => window.examProgress), [], "reveal alone does not save completion");
      assert.equal(await page.locator("[data-template-primary]").isEnabled(), true);
      assert.match(await page.locator("[data-template-primary]").innerText(), /متابعة/);
      assert.deepEqual(await page.locator('[data-exam-card]').boundingBox(),fixedBounds,'turning to a long answer keeps the card fixed');
      assert.equal(await page.locator('[data-exam-solution]').evaluate(node=>getComputedStyle(node).backgroundColor),'rgb(255, 255, 255)');
      assert.equal(await page.locator('[data-exam-front]').evaluate(node=>node.inert),true);
      assert.equal(await page.locator('[data-exam-solution] img').getAttribute('alt'),'الرسم الأصلي للإجابة');
      const answerScroll = page.locator('[data-exam-solution] .lesson-flashcard-scroll');
      assert.equal(await answerScroll.evaluate(node=>node.scrollHeight > node.clientHeight),true,'long answers scroll inside the card');
      await answerScroll.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForFunction(()=>document.querySelector('[data-exam-solution] .lesson-flashcard-scroll').scrollTop > 0);
      assert.equal(await page.locator('[data-exam-solution]').getAttribute('aria-hidden'),'false','scrolling never flips the card');
      await answerScroll.evaluate(node=>node.scrollTop=node.scrollHeight);
      await page.mouse.wheel(0,600);
      assert.equal(await page.evaluate(()=>window.scrollY===0 && document.querySelector('.level-layout-task').scrollTop===0),true,'scroll does not escape the card at its boundary');
      await answerScroll.evaluate(node=>node.scrollTop=0);
      await page.screenshot({path:`/tmp/ict-questions/flashcards/back-${viewport.width}-${viewport.height}.png`});
      const layout = await page.evaluate(() => {
        const task = document.querySelector(".level-layout-task");
        const image = document.querySelector("[data-exam-solution] img");
        return { page:document.documentElement.scrollWidth <= innerWidth + 1 && document.documentElement.scrollHeight <= innerHeight + 1, task:task.scrollWidth <= task.clientWidth + 1 && task.scrollHeight <= task.clientHeight + 1,
          image:image.getBoundingClientRect().width <= task.clientWidth };
      });
      assert.deepEqual(layout, { page:true, task:true, image:true }, `question stays within ${viewport.width}px; long SQL can scroll inside its code block`);
      await answerScroll.focus();
      await answerScroll.press('Space');
      await page.waitForFunction(()=>document.querySelector('[data-exam-solution]').hidden);
      assert.equal(await page.locator('[data-exam-front]').getAttribute('aria-hidden'),'false');
      await page.locator('[data-exam-front] h1').click();
      await page.waitForFunction(()=>document.querySelector('[data-exam-front]').hidden);
      assert.equal(await page.locator('[data-exam-solution]').getAttribute('aria-hidden'),'false','clicking the card content flips it too');
      assert.deepEqual(await page.locator('[data-exam-card]').boundingBox(),fixedBounds);
      await page.locator("[data-template-primary]").focus();
      await page.locator("[data-template-primary]").press("Enter");
      await page.locator('[data-lesson-step="written-source-two"]').waitFor();
      assert.equal(await page.locator("[data-template-primary]").isDisabled(), true, "each answer starts unrevealed");
      assert.equal(await page.locator("[data-exam-solution]").isVisible(), false);
      assert.deepEqual(await page.evaluate(() => window.examAnswers), [], "written self-review never emits a scored answer");
      assert.deepEqual(await page.evaluate(() => window.examProgress.at(-1)), { completedStepIds:["written-source-one"], isComplete:false });
      await page.locator("[data-template-back]").click();
      await page.locator('[data-lesson-step="written-source-one"]').waitFor();
      assert.equal(await page.locator("[data-exam-solution]").isVisible(), false);
      // Cancelling a turn when navigating away must leave no live animation or save.
      await page.locator('[data-exam-front] h1').click();
      await page.evaluate(() => window.examCleanup());
      await page.locator('[data-exam-card]').evaluate(node=>node.click());
      assert.equal(await page.locator('[data-exam-solution]').getAttribute('aria-hidden'),'false','cleanup detaches stale flip listeners');
      assert.equal(await page.locator('.lesson-flashcard-rotor').evaluate(node=>node.getAnimations().length),0);
      assert.deepEqual(mutations, [], "written answers stay offline and are never submitted for grading");
      assert.deepEqual(errors, []);
    } finally { await context.close(); }
  }
} finally {
  await browser?.close();
  await terminateProcess(server);
}
console.log("Flashcards passed: white fixed faces, original images, internal scrolling, mouse/keyboard flips, reduced motion, review progress and cleanup.");
