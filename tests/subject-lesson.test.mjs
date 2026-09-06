import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectLessonLoader, loadSubjectLesson } from "../src/data/lessons/subject-lesson-registry.js";

test("loads Lesson 0 as the ICT course introduction", async () => {
  const lesson = await loadSubjectLesson("ict", "course-introduction");
  assert.equal(lesson.title, "مقدمة المسار");
  assert.deepEqual(lesson.steps.map(({ id }) => id), [
    "meet-rocky",
    "watch-introduction-together",
    "introduction-video",
    "lesson-flow",
    "lesson-flow-check",
    "progress-and-review",
  ]);
});

test("loads the first ICT lesson by subject and lesson id without a day slot", async () => {
  const lesson = await loadSubjectLesson("ict", "database-management");
  assert.equal(lesson.title, "إدارة قواعد البيانات");
  assert.equal(lesson.steps.length, 24);
  assert.equal(lesson.authoringSource.includes("# إدارة قواعد البيانات"), true);
  assert.equal(await loadSubjectLesson("ict", "unknown"), null);
});

test("subject lesson loading deduplicates concurrent imports", async () => {
  let imports = 0;
  const registry = new Map([["ict:database-management", async () => {
    imports += 1;
    return {
      default:{
        title:"إدارة قواعد البيانات",
        summary:"ملخص",
        steps:[{ id:"intro", title:"مقدمة", body:"محتوى" }],
      },
    };
  }]]);
  const load = createSubjectLessonLoader({ registry });
  const [first, second] = await Promise.all([
    load("ict", "database-management"),
    load("ict", "database-management"),
  ]);
  assert.equal(imports, 1);
  assert.strictEqual(first, second);
});

test("lesson parts partition every published step once, preserving IDs and interactions", async () => {
  const { getSubjectRoadmapLesson } = await import("../src/data/subject-roadmaps.js");
  const { loadSubjectLessonPart } = await import("../src/data/lessons/subject-lesson-registry.js");
  const full = await loadSubjectLesson("ict", "database-management");
  const parts = await Promise.all(getSubjectRoadmapLesson("ict", "database-management").parts.map(
    ({ id }) => loadSubjectLessonPart("ict", "database-management", id),
  ));
  assert.deepEqual(parts.flatMap(({ steps }) => steps.map(({ id }) => id)), full.steps.map(({ id }) => id));
  assert.deepEqual(parts.flatMap(({ steps }) => steps), full.steps);
  assert.ok(parts.every((part) => part.steps.length > 0 && part.steps.length < full.steps.length && part.reward === 0));
  assert.equal(await loadSubjectLessonPart("ict", "database-management", "unknown"), null);
  assert.equal(await loadSubjectLessonPart("ict", "sql-queries", "sql-introduction"), null);
});
