import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { withBrowserPage } from "./browser-page.mjs";
import { getSubjectRoadmap } from "../../src/data/subject-roadmaps.js";
import { getIctPartQuestions } from "../../src/data/lessons/ict/exam-lessons.js";

const lessonQuestionCounts = getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons)
  .filter(lesson => !lesson.hidden)
  .map(lesson => lesson.parts.reduce((count, part) => count + getIctPartQuestions(part.id).length, 0));

export async function verifyQuestionCourse({ base, send, evaluate, waitFor }) {
  const evidence = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/ict-questions/browser";
  await mkdir(evidence, { recursive:true });
  const navigate = async path => {
    await send("Page.navigate", { url:base + path });
    await waitFor("!document.querySelector('#app-splash') && document.querySelector('.subject-roadmap')");
  };
  const shot = async name => {
    const { data } = await send("Page.captureScreenshot", { format:"png" });
    await writeFile(`${evidence}/${name}.png`, Buffer.from(data, "base64"));
  };
  const ring = () => evaluate("Number(document.querySelector('.roadmap-question-ring').getAttribute('aria-valuenow'))");
  const open = async (id = "database-management") => {
    await evaluate(`document.querySelector('[data-roadmap-lesson="${id}"]').click(); document.querySelector('[data-bubble-start]').click()`);
    await waitFor("document.querySelector('[data-ui-lab-answer]') || document.querySelector('[data-exam-card]')");
  };
  const exit = async () => {
    await evaluate("document.querySelector('.lesson-back').click()");
    await waitFor("document.querySelector('.subject-roadmap')");
  };
  await navigate("?subject=ict");
  assert.deepEqual(await evaluate("[...document.querySelectorAll('.roadmap-question-ring')].map(node=>Number(node.getAttribute('aria-valuemax')))"), lessonQuestionCounts);
  assert.equal(await ring(), 0);
  for (const width of [1440,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
    assert.equal(await evaluate("document.querySelectorAll('[data-roadmap-part]').length"), 5);
    await shot(`five-lessons-${width}`);
    await open();
    assert.equal(await evaluate("Boolean(document.querySelector('.lesson-question-rocky,.lesson-question-mascot,.lesson-video-intro,.lesson-study-heading,iframe'))"), false);
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
    const layout = await evaluate("[...document.querySelectorAll('[data-ui-lab-answer]')].map(button=>({left:button.getBoundingClientRect().left,right:button.getBoundingClientRect().right,top:Math.round(button.getBoundingClientRect().top)}))");
    assert.ok(layout.every(rect => rect.left >= 0 && rect.right <= width));
    assert.equal(new Set(layout.map(rect => rect.top)).size, width < 600 ? 4 : 2);
    await shot(`question-${width}`);
    await exit();
  }
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
  await open();
  const first = await evaluate("document.querySelector('[data-live-authored-step]').dataset.lessonStep");
  await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=false]').click(); document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click()");
  await waitFor(`document.querySelector('[data-live-authored-step]')?.dataset.lessonStep !== ${JSON.stringify(first)}`);
  await exit();
  assert.equal(await ring(), 0, "Continue after an incorrect answer does not count it as solved");
  await open();
  await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click(); document.querySelector('[data-template-primary]').click()");
  await exit();
  assert.equal(await ring(), 1, "a correct answer counts even if the learner exits before Continue");
  await navigate("?subject=ict");
  assert.equal(await ring(), 1, "solved question counts survive refresh");
  await open();
  // Complete the full lesson using real answers and explicit written self-review.
  for (let action = 0; action < lessonQuestionCounts[0] * 3 + 10; action += 1) {
    await waitFor("document.querySelector('.subject-completion') || document.querySelector('[data-template-primary]')");
    if (await evaluate("Boolean(document.querySelector('.subject-completion'))")) break;
    assert.equal(await evaluate("Boolean(document.querySelector('#lesson-content textarea, #lesson-content [contenteditable=true]'))"), false);
    await evaluate(`(() => {
      const correct = document.querySelector('[data-ui-lab-answer][data-correct=true]');
      if (correct && !document.querySelector('[data-ui-lab-feedback]')?.classList.contains('is-correct')) correct.click();
      const card = document.querySelector('[data-exam-card]');
      if (card && document.querySelector('[data-exam-solution]').inert) card.click();
      document.querySelector('[data-template-primary]').click();
    })()`);
  }
  await waitFor("document.querySelector('.subject-completion')");
  await exit();
  assert.equal(await ring(), lessonQuestionCounts[0], "all question types count once across the seven preserved storage parts");
  await navigate("?subject=ict");
  assert.equal(await ring(), lessonQuestionCounts[0]);
  assert.equal(await evaluate("document.querySelector('.roadmap-question-fill').getAttribute('stroke-dasharray')"), "100 100");
  await shot("completed-ring");
  // Old introduction URLs now reach questions. No video/tour may re-enter the course.
  await send("Page.navigate", { url:base + "?subject=ict&lesson=course-introduction&part=getting-started" });
  await waitFor("document.querySelector('[data-ui-lab-answer]')");
  assert.equal(await evaluate("Boolean(document.querySelector('iframe,.lesson-video-intro,.lesson-video-tour'))"), false);
  await exit();
  // Source corrections and original diagrams must use the same selectable MCQ layout.
  for (const [lessonId, stepId] of [["database-management", "exam-p09-q1-1"], ["database-management", "classified-p07-q1-09"], ["my-mobile-app", "past-p73-q1-9"]]) {
    await evaluate(`(async () => {
      const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
        import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js')]);
      const lesson = await loadSubjectLesson('ict', '${lessonId}');
      const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step=>step.id==='${stepId}');
      window.destroyQuestion = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), 'ICT', lesson, [step], {});
    })()`);
    await waitFor("document.querySelectorAll('[data-ui-lab-answer]').length === 4 && [...document.querySelectorAll('.lesson-question-example img')].every(img=>img.complete && img.naturalWidth > 0)");
    assert.equal(await evaluate("[...document.querySelectorAll('.lesson-question-example img')].every(img=>img.complete && img.naturalWidth>0)"), true, "original question diagrams remain available");
    assert.equal(await evaluate("Boolean(document.querySelector('.lesson-question-reference,.lesson-source-tag'))"), false);
    assert.equal(await evaluate("Boolean(document.querySelector('#lesson-content textarea, #lesson-content input, .lesson-question-rocky'))"), false);
    for (const width of [1440,390]) {
      await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
      assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
      assert.equal(await evaluate(`(() => {
        const heading = document.querySelector('.ui-lab-mcq h1').getBoundingClientRect();
        const answers = document.querySelector('.lesson-answer-list').getBoundingClientRect();
        const figure = document.querySelector('.lesson-question-example')?.getBoundingClientRect();
        return answers.top >= heading.bottom && (!figure || figure.top >= heading.bottom);
      })()`), true, "the prompt must appear above its figure and choices");
      if (await evaluate("Boolean(document.querySelector('.lesson-question-example img'))")) {
        assert.equal(await evaluate(`(() => {
          const figure = document.querySelector('.lesson-question-example img').getBoundingClientRect();
          const answers = [...document.querySelectorAll('[data-ui-lab-answer]')].map(node => node.getBoundingClientRect());
          return figure.bottom <= Math.min(...answers.map(rect => rect.top))
            && new Set(answers.map(rect => Math.round(rect.top))).size === ${width === 1440 ? 2 : 4};
        })()`), true, "image MCQs place the original image before a compact choice grid");
      }
      await shot(`${stepId}-${width}`);
    }
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click()");
    await evaluate("document.querySelector('[data-template-primary]').click()");
    assert.equal(await evaluate("Boolean(document.querySelector('[data-question-explanation]'))"), false);
    await evaluate("document.querySelector('[data-template-primary]').click()");
    await evaluate("destroyQuestion()");
  }
  // Original diagrams remain inline and the answer stays hidden until the card flips.
  await evaluate(`(async () => {
    const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
      import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js')]);
    const lesson = await loadSubjectLesson('ict', 'osi-model-layers');
    const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step=>step.id==='past-p125-q2-2');
    window.destroyFigure = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), 'OSI', lesson, [step], {});
  })()`);
  await waitFor("document.querySelector('.lesson-exam-question img')?.naturalWidth > 0");
  const originalFigure = await evaluate("document.querySelector('.lesson-exam-question img').getAttribute('src')");
  await evaluate("document.querySelector('.lesson-exam-question [data-summary-scan-zoom]').click()");
  await waitFor("document.querySelector('.lesson-question-image-viewer[open]')");
  assert.equal(await evaluate("document.querySelector('.lesson-question-image-viewer[open] img').getAttribute('src')"),originalFigure,"enlargement keeps the original diagram");
  await send("Input.dispatchKeyEvent", { type:"keyDown",key:"Escape",code:"Escape",windowsVirtualKeyCode:27 });
  await send("Input.dispatchKeyEvent", { type:"keyUp",key:"Escape",code:"Escape",windowsVirtualKeyCode:27 });
  await waitFor("!document.querySelector('.lesson-question-image-viewer[open]') && document.querySelector('.lesson-exam-question [data-summary-scan-zoom]').getAttribute('aria-expanded')==='false'");
  assert.equal(await evaluate("Boolean(document.querySelector('.lesson-exam-source,.lesson-question-reference,.lesson-source-tag'))"), false);
  assert.equal(await evaluate("document.querySelector('[data-exam-solution]').hidden"), true);
  assert.equal(await evaluate("document.querySelector('[data-template-primary]').disabled"), true);
  assert.equal(await evaluate("Boolean(document.querySelector('#lesson-content textarea, #lesson-content input:not([data-question-rating])'))"), false);
  assert.equal(await evaluate("document.querySelector('.lesson-exam-question h1').textContent"), "ما نوع التخاطب في الشكل المجاور مع توضيح السبب؟");
  for (const width of [1440,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
    await shot(`original-diagram-${width}`);
  }
  await evaluate("document.querySelector('[data-exam-front] .lesson-flashcard-scroll').focus()");
  await send("Input.dispatchKeyEvent", { type:"keyDown", key:"Enter", code:"Enter", windowsVirtualKeyCode:13, text:"\r" });
  await send("Input.dispatchKeyEvent", { type:"keyUp", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 });
  assert.equal(await evaluate("document.querySelector('[data-exam-solution]').hidden"), false);
  assert.equal(await evaluate("document.querySelector('[data-template-primary]').disabled"), false);
  await shot("revealed-answer-390");
  await evaluate("destroyFigure()");
  await evaluate(`(async () => {
    const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
      import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js')]);
    const lesson = await loadSubjectLesson('ict', 'osi-model-layers');
    const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step=>step.id==='classified-p127-q6-1-4');
    window.destroyClassifiedFigure = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), 'OSI', lesson, [step], {});
  })()`);
  await waitFor("document.querySelector('.lesson-exam-question img')?.naturalWidth > 0");
  assert.equal(await evaluate("document.querySelector('[data-exam-solution]').hidden"), true);
  for (const width of [1440,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
    await shot(`classified-nic-${width}`);
  }
  await evaluate("destroyClassifiedFigure()");
  await evaluate(`(async () => {
    const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
      import('./src/data/lessons/subject-lesson-registry.js'), import('./src/markdown/lesson-authoring.js'), import('./src/ui/lesson/authored.js')]);
    const lesson = await loadSubjectLesson('ict', 'my-mobile-app');
    const step = parseLessonMarkdown(lesson.authoringSource).steps.find(step=>step.id==='classified-u2-p81-written-10');
    window.destroyBlockFigure = renderAuthoredInteractiveLesson(document.querySelector('#lesson-content'), 'ICT', lesson, [step], {});
  })()`);
  await waitFor("document.querySelector('.lesson-exam-question img')?.naturalWidth > 0");
  for (const width of [1440,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
    await shot(`classified-app-block-${width}`);
  }
  await evaluate("destroyBlockFigure()");
  await send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false });
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"no-preference" }] });
  await navigate("?subject=ict");
  console.log("Questions-only course: desktop/mobile, 5 rings, wrong/correct answers, written review, saved progress, legacy URL and original diagram passed.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await withBrowserPage(verifyQuestionCourse);
