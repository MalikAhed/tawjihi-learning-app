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
  assert.equal(lesson.title, "برنامج إدارة قواعد البيانات");
  assert.ok(lesson.steps.some(step => step.id === "engineering-office-intro"));
  assert.equal(lesson.authoringSource.includes("# الدرس الأول: برنامج إدارة قواعد البيانات"), true);
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

test("registered Unit 1 lessons partition every published step once, preserving IDs and interactions", async () => {
  const { getSubjectRoadmapLesson } = await import("../src/data/subject-roadmaps.js");
  const { loadSubjectLessonPart } = await import("../src/data/lessons/subject-lesson-registry.js");
  const { parseLessonMarkdown } = await import("../src/markdown/lesson-authoring.js");
  for (const lessonId of ["database-management", "sql-queries"]) {
    const full = await loadSubjectLesson("ict", lessonId);
    assert.ok(full?.authoringSource, `${lessonId} must be registered`);
    const roadmapParts = getSubjectRoadmapLesson("ict", lessonId).parts;
    const parts = await Promise.all(roadmapParts.map(({ id }) => loadSubjectLessonPart("ict", lessonId, id)));
    assert.deepEqual(parts.flatMap(({ steps }) => steps.map(({ id }) => id)), full.steps.map(({ id }) => id));
    assert.deepEqual(parts.flatMap(({ steps }) => steps), full.steps);
    for (const [index, part] of parts.entries()) {
      assert.equal(part.steps[0].id, roadmapParts[index].startStepId);
      assert.ok(part.steps.length > 2 && part.steps.length < full.steps.length);
      assert.equal(part.reward, 0);
      const parsed = parseLessonMarkdown(part.authoringSource, { published:true });
      assert.deepEqual(parsed.issues, []);
      assert.equal(parsed.steps[0].presentation, "video-intro");
      assert.equal(parsed.steps[1].presentation, "lesson-summary");
      assert.ok(parsed.steps.slice(2).every(step => step.type === "mcq"));
    }
    assert.equal(await loadSubjectLessonPart("ict", lessonId, "unknown"), null);
  }
  assert.equal(await loadSubjectLessonPart("ict", "smartphone-operating-systems", "android-features"), null);
});
