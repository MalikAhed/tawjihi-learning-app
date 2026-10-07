import test from "node:test";
import assert from "node:assert/strict";
import { ISLAMIC_LESSONS, ISLAMIC_UNIT_BANK } from "../src/data/lessons/islamic-education/islamic-bank.js";
import { loadSubjectLesson } from "../src/data/lessons/subject-lesson-registry.js";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";

const EXPECTED_SOURCE_LESSONS = [1, 3, 4, 5, 7, 8, 9, 10, 12, 13, 16, 17, 20, 21, 22, 23, 24, 26];
const EXPECTED_QUESTION_COUNTS = [38, 30, 28, 26, 43, 21, 30, 26, 30, 41, 29, 29, 34, 3, 4, 3, 2, 3];

test("Islamic course follows the book units and filters the supplied 2022 MCQs", async () => {
  assert.equal(ISLAMIC_LESSONS.length, 18);
  assert.deepEqual(ISLAMIC_LESSONS.map(lesson => lesson.sourceLesson), EXPECTED_SOURCE_LESSONS);
  assert.deepEqual(ISLAMIC_LESSONS.map(lesson => lesson.questionIds.length), EXPECTED_QUESTION_COUNTS);
  assert.deepEqual(getSubjectRoadmap("islamic-education").units.map(unit => unit.lessons.length), [8, 2, 2, 2, 4]);

  const questions = Object.values(ISLAMIC_UNIT_BANK).flatMap(unit => unit.questions);
  const ids = new Set(questions.map(question => question.id));
  assert.equal(questions.length, 420);
  assert.equal(ids.size, questions.length);
  assert.equal(questions.every(question => question.type === "mcq"), true);
  assert.equal(questions.every(question => question.id.startsWith("islamic-2022-") || question.id.startsWith("islamic-book-")), true);
  assert.equal(questions.every(question => EXPECTED_SOURCE_LESSONS.includes(question.sourceLesson)), true);

  for (const lesson of ISLAMIC_LESSONS) {
    const loaded = await loadSubjectLesson("islamic-education", lesson.id);
    assert.equal(loaded.status, "published");
    assert.equal(loaded.steps.length, lesson.questionIds.length || 1);
    if (lesson.questionIds.length) {
      assert.ok(loaded.authoringSource.includes(":::mcq"));
      assert.equal(loaded.authoringSource.includes("reference: undefined"), false);
    } else {
      assert.match(loaded.authoringSource, /لا توجد أسئلة مطابقة/);
    }
  }
});
