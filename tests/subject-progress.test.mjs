import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectProgressStore, getUnitPartProgress } from "../src/data/subject-progress-store.js";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";

function memoryStorage() {
  const values = new Map();
  return { getItem:(key) => values.get(key), setItem:(key, value) => values.set(key, value) };
}
const key = { ownerId:"student-a", subjectId:"ict", lessonId:"database-management", partId:"access-basics" };
const steps = ["intro", "check"];

test("progress resumes after reload, completion needs every step and a confirmed finish", () => {
  const storage = memoryStorage();
  const store = createSubjectProgressStore({ storage });
  assert.deepEqual(store.get(key), { completedStepIds:[], completed:false });
  store.record({ ...key, stepIds:steps, completedStepIds:["intro", "invalid"], isComplete:true });
  const restored = createSubjectProgressStore({ storage });
  assert.deepEqual(restored.get(key), { completedStepIds:["intro"], completed:false });
  restored.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:false });
  assert.equal(restored.get(key).completed, false);
  restored.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  assert.equal(createSubjectProgressStore({ storage }).get(key).completed, true);
});

test("retries and repeated completions cannot decrease or inflate unit progress", () => {
  const store = createSubjectProgressStore();
  const update = (completedStepIds, isComplete) => store.record({ ...key, stepIds:steps, completedStepIds, isComplete });
  update(steps, true);
  update([], false);
  update(steps, true);
  assert.deepEqual(store.get(key), { completedStepIds:steps, completed:true });
  const unit = getSubjectRoadmap("ict").units[0];
  const progress = getUnitPartProgress(unit, (lesson, part) => store.get({ ...key, lessonId:lesson.id, partId:part.id }));
  assert.deepEqual(progress, { completed:1, total:14, percent:7 });
});

test("progress is isolated by learner, lesson, and part", () => {
  const store = createSubjectProgressStore();
  store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  for (const alternative of [{ ownerId:"student-b" }, { ownerId:"guest" }, { lessonId:"other" }, { partId:"tables-and-types" }]) {
    assert.deepEqual(store.get({ ...key, ...alternative }), { completedStepIds:[], completed:false });
  }
});

test("unpublished parts cannot create unit completion and empty units have zero progress", () => {
  const unit = getSubjectRoadmap("ict").units[0];
  assert.deepEqual(getUnitPartProgress(unit, () => ({ completed:true })), { completed:7, total:14, percent:50 });
  assert.deepEqual(getUnitPartProgress({ lessons:[] }), { completed:0, total:0, percent:0 });
});

test("corrupt or unavailable storage keeps the lesson usable with memory progress", () => {
  let errors = 0;
  const store = createSubjectProgressStore({
    storage:{ getItem:() => "{broken", setItem:() => { throw new Error("quota"); } },
    onError:() => { errors += 1; },
  });
  assert.equal(store.get(key).completed, false);
  store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  assert.equal(store.get(key).completed, true);
  assert.equal(errors, 2);
});

test("repeated mistakes create one persistent review item without changing completion", () => {
  const storage = memoryStorage();
  const store = createSubjectProgressStore({ storage });
  store.recordAnswer({ ...key, stepId:"check", correct:false });
  assert.equal(store.getReview(key)[0].active, false);
  store.recordAnswer({ ...key, stepId:"check", correct:false });
  store.recordAnswer({ ...key, stepId:"check", correct:true });
  store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  const restored = createSubjectProgressStore({ storage });
  assert.deepEqual(restored.getReview(key), [{ stepId:"check", misses:2, active:true }]);
  assert.deepEqual(restored.getReview({ ...key, ownerId:"other" }), []);
  restored.recordAnswer({ ...key, stepId:"check", correct:false, reviewing:true });
  assert.equal(restored.getReview(key)[0].active, true);
  restored.recordAnswer({ ...key, stepId:"check", correct:true, reviewing:true });
  assert.equal(restored.getReview(key)[0].active, false);
  assert.equal(restored.get(key).completed, true);
  restored.recordAnswer({ ...key, stepId:"check", correct:false });
  restored.recordAnswer({ ...key, stepId:"check", correct:false });
  assert.equal(restored.getReview(key).length, 1);
  assert.equal(restored.getReview(key)[0].active, true);
});

test("completion gains are one-time, preview is read-only, and streak counts distinct days", () => {
  const storage = memoryStorage();
  const store = createSubjectProgressStore({ storage });
  const outcomeKey = { ...key, totalParts:28, date:"2026-09-05" };
  assert.equal(store.getOutcome({ ...outcomeKey, preview:true }).totalXp, 10);
  assert.equal(store.get(key).completed, false);
  assert.equal(store.getOutcome(outcomeKey).totalXp, 0);
  const finish = (partId, date) => store.record({ ...key, partId, date, stepIds:steps, completedStepIds:steps, isComplete:true });
  finish(key.partId, "2026-09-05");
  finish(key.partId, "2026-09-05");
  assert.equal(store.getOutcome(outcomeKey).totalXp, 10);
  assert.equal(store.getOutcome(outcomeKey).progress, 4);
  finish("second", "2026-09-05");
  assert.equal(store.getOutcome(outcomeKey).streak, 1);
  finish("third", "2026-09-06");
  const restored = createSubjectProgressStore({ storage });
  assert.equal(restored.getOutcome({ ...outcomeKey, date:"2026-09-06" }).streak, 2);
  assert.equal(restored.getOutcome({ ...outcomeKey, date:"2026-09-08" }).streak, 0);
  assert.equal(restored.getOutcome(outcomeKey).totalXp, 30);
  assert.equal(restored.getOutcome({ ...outcomeKey, ownerId:"other" }).totalXp, 0);
});
