import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectLessonLoader, loadSubjectLesson } from "../src/data/lessons/subject-lesson-registry.js";

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
