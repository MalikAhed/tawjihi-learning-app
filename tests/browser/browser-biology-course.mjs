import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { BIOLOGY_LESSONS } from "../../src/data/lessons/biology/biology-course.js";
import { findChrome, getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";

const port = await getAvailablePort();
const base = `http://127.0.0.1:${port}/`;
const server = spawn(process.execPath, ["dev-server.mjs"], { env:{ ...process.env, PORT:String(port), LIVE_RELOAD:"0", ACCOUNTS_DATABASE_PATH:":memory:" }, stdio:"ignore" });
let browser;
try {
  await waitForServer(port);
  browser = await chromium.launch({ executablePath:await findChrome(), args:["--no-sandbox"] });
  const page = await browser.newPage({ viewport:{ width:1440, height:900 }, reducedMotion:"reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(base + "?subject=biology");
  await page.locator(".subject-roadmap").waitFor();
  assert.equal(await page.locator(".roadmap-unit").count(), 5);
  assert.deepEqual(await page.locator("[data-roadmap-lesson]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-roadmap-lesson"))), BIOLOGY_LESSONS.map(lesson => lesson.id));
  for (const width of [1440,390]) {
    await page.setViewportSize({ width, height:900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }
  await page.locator('[data-roadmap-lesson="energy-flow"]').click();
  await page.locator('[data-bubble-start]').click();
  await page.locator('[data-ui-lab-answer]').first().waitFor();
  assert.equal(await page.locator('[data-ui-lab-answer]').count(), 4);
  await page.locator('[data-ui-lab-answer][data-correct="true"]').click();
  await page.locator('[data-template-primary]').click();
  await page.locator('[data-template-primary]').click();
  await page.locator('.lesson-back').click();
  await page.locator('.subject-roadmap').waitFor();
  await page.locator('[data-roadmap-lesson="human-systems"]').click();
  await page.locator('[data-bubble-start]').click();
  await page.evaluate(async () => {
    const [{ loadSubjectLesson }, { parseLessonMarkdown }, { renderAuthoredInteractiveLesson }] = await Promise.all([
      import("./src/data/lessons/subject-lesson-registry.js"),
      import("./src/markdown/lesson-authoring.js"),
      import("./src/ui/lesson/authored.js"),
    ]);
    const lesson = await loadSubjectLesson("biology", "human-systems");
    const step = parseLessonMarkdown(lesson.authoringSource).steps.find(item => item.type === "exam-question");
    window.destroyBiologyPreview = renderAuthoredInteractiveLesson(document.querySelector("#lesson-content"), lesson.title, lesson, [step], {});
  });
  await page.locator('[data-exam-card]').first().waitFor();
  await page.locator('[data-exam-front]').first().click();
  await page.locator('[data-exam-solution]').first().waitFor({ state:"visible" });
  await page.evaluate(async () => { await Promise.all([...document.querySelectorAll("img")].map(img => img.decode().catch(() => {}))); });
  for (const width of [1440,390]) {
    await page.setViewportSize({ width, height:900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }
  assert.deepEqual(errors, []);
  console.log(`Biology browser check passed: 5 units, ${BIOLOGY_LESSONS.length} lessons, desktop/mobile MCQ and flashcard flows.`);
} finally {
  await browser?.close();
  await terminateProcess(server);
}
