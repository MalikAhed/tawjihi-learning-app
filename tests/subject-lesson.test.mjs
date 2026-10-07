import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectLessonLoader, loadSubjectLesson } from "../src/data/lessons/subject-lesson-registry.js";

test("loads Rocky's welcome before the ICT course introduction video", async () => {
  const lesson = await loadSubjectLesson("ict", "course-introduction");
  assert.equal(lesson.title, "مقدمة للمادة");
  assert.deepEqual(lesson.steps.map(({ id, type }) => ({ id, type })), [
    { id:"meet-rocky", type:"explanation" },
    { id:"course-introduction-video", type:"explanation" },
  ]);
  assert.match(lesson.authoringSource, /presentation: rocky-dialogue/);
  assert.match(lesson.authoringSource, /presentation: video-intro/);
  assert.match(lesson.authoringSource, /youtube\.com\/watch\?v=d3gaYsONaIc&t=702s/);
});

test("loads the first ICT lesson by subject and lesson id without a day slot", async () => {
  const lesson = await loadSubjectLesson("ict", "database-management");
  assert.equal(lesson.title, "برنامج إدارة قواعد البيانات");
  assert.ok(lesson.steps.some(step => step.id === "book-p12-engineering"));
  assert.ok(lesson.steps.every(step => ["question", "activity"].includes(step.type)));
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

test("registered ICT lessons partition every published step once, preserving IDs and interactions", async () => {
  const { getSubjectRoadmapLesson } = await import("../src/data/subject-roadmaps.js");
  const { loadSubjectLessonPart } = await import("../src/data/lessons/subject-lesson-registry.js");
  const { parseLessonMarkdown } = await import("../src/markdown/lesson-authoring.js");
  for (const lessonId of ["database-management", "sql-queries", "smartphone-operating-systems", "my-mobile-app", "osi-model-layers"]) {
    const full = await loadSubjectLesson("ict", lessonId);
    assert.ok(full?.authoringSource, `${lessonId} must be registered`);
    const roadmapParts = getSubjectRoadmapLesson("ict", lessonId).parts;
    const parts = await Promise.all(roadmapParts.map(({ id }) => loadSubjectLessonPart("ict", lessonId, id)));
    assert.deepEqual(parts.flatMap(({ steps }) => steps.map(({ id }) => id)), full.steps.map(({ id }) => id));
    assert.deepEqual(parts.flatMap(({ steps }) => steps), full.steps);
    for (const [index, part] of parts.entries()) {
      assert.ok(part.steps.length > 0 && part.steps.length < full.steps.length);
      assert.equal(part.reward, 0);
      const parsed = parseLessonMarkdown(part.authoringSource, { published:true });
      assert.deepEqual(parsed.issues, []);
      assert.ok(parsed.steps.every(step => ["mcq", "exam-question"].includes(step.type)));
    }
    assert.equal(await loadSubjectLessonPart("ict", lessonId, "unknown"), null);
  }
  const android = await loadSubjectLessonPart("ict", "smartphone-operating-systems", "android-features");
  assert.equal(parseLessonMarkdown(android.authoringSource, { published:true }).steps[0].type, "mcq");
});
