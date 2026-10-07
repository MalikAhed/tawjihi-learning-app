import assert from "node:assert/strict";
import test from "node:test";
import { getLessonQuestionProgress } from "../src/domain/subject-question-progress.js";

const lesson = { parts:[{ id:"first" }, { id:"second" }] };
const questions = (_lesson, part) => part.id === "first" ? ["a", "b"] : ["c", "d"];

test("the lesson ring counts unique current solved questions across old part records", () => {
  const progress = getLessonQuestionProgress(lesson, (_lesson, part) => part.id === "first"
    ? { completed:true, completedStepIds:["video", "retired-question", "a", "a"], review:[{ stepId:"a", solved:true }, { stepId:"b", solved:true }] }
    : { completedStepIds:["c", "d"], review:[{ stepId:"d", misses:2, active:true }] }, questions);
  assert.equal(progress.solved, 3);
  assert.equal(progress.total, 4);
  assert.equal(progress.percent, 75);
  assert.equal(progress.completed, false);
  assert.equal(progress.nextPart.id, "first", "an answer without Continue resumes at that question");
});

test("historical completed flags cannot complete new questions, and full completion is exactly 100%", () => {
  assert.equal(getLessonQuestionProgress(lesson, () => ({ completed:true }), questions).percent, 0);
  const done = getLessonQuestionProgress(lesson, (lesson, part) => ({ completedStepIds:questions(lesson, part) }), questions);
  assert.equal(done.percent, 100);
  assert.equal(done.completed, true);
  assert.equal(getLessonQuestionProgress({ parts:[] }).percent, 0);
});
