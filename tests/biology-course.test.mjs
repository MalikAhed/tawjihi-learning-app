import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { BIOLOGY_LESSONS } from "../src/data/lessons/biology/biology-course.js";
import { loadSubjectLesson, loadSubjectLessonPart } from "../src/data/lessons/subject-lesson-registry.js";
import { parseLessonMarkdown } from "../src/markdown/lesson-authoring.js";

test("the Gaza 2026 biology bank covers the reduced pack in MCQ and flashcard formats", async () => {
  assert.deepEqual(BIOLOGY_LESSONS.map(lesson => lesson.id), [
    "energy-flow", "gene-to-protein", "inheritance", "human-systems", "microbes", "past-papers-800", "tasnif-written",
  ]);
  let mcqs = 0;
  let cards = 0;
  const ids = [];
  for (const catalog of BIOLOGY_LESSONS) {
    const lesson = await loadSubjectLesson("biology", catalog.id);
    const parsed = parseLessonMarkdown(lesson.authoringSource, { published:true });
    assert.deepEqual(parsed.issues, [], catalog.id);
    assert.deepEqual(parsed.steps.map(step => step.id), catalog.questionIds, catalog.id);
    mcqs += parsed.steps.filter(step => step.type === "mcq").length;
    cards += parsed.steps.filter(step => step.type === "exam-question").length;
    ids.push(...catalog.questionIds);
    const part = await loadSubjectLessonPart("biology", catalog.id, `${catalog.id}-practice`);
    assert.deepEqual(part.steps.map(step => step.id), catalog.questionIds);
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(mcqs, 714);
  assert.equal(cards, 84);
});

test("every biology figure used by the bank has a retained crop manifest entry", async () => {
  const manifest = JSON.parse(await readFile(new URL("../assets/lessons/biology/source-crops/sources.json", import.meta.url)));
  const files = new Set(manifest.map(item => item.file));
  for (const catalog of BIOLOGY_LESSONS) {
    const lesson = await loadSubjectLesson("biology", catalog.id);
    for (const file of lesson.authoringSource.match(/assets\/lessons\/biology\/source-crops\/[^)\"]+/g) || []) {
      assert.ok(files.has(file), file);
      await access(new URL(`../${file}`, import.meta.url));
    }
  }
  assert.equal(manifest.length, 45);
  assert.ok(manifest.every(item => item.clips.length > 0 && item.clips.every(clip => clip.page > 0 && clip.rect.length === 4)));

  const pageSources = JSON.parse(await readFile(new URL("../assets/lessons/biology/source-pages/sources.json", import.meta.url)));
  for (const source of pageSources.sources) {
    const pages = (await readdir(new URL(`../${source.directory}/`, import.meta.url))).filter(file => file.endsWith(".webp"));
    assert.equal(pages.length, source.pages, source.id);
  }
});
