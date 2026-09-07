import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectProgressStore, getUnitPartProgress } from "../src/services/subject-progress-store.js";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";

function memoryStorage() {
  const values = new Map();
  return { getItem:(key) => values.get(key), setItem:(key, value) => values.set(key, value) };
}
const key = { ownerId:"student-a", subjectId:"ict", lessonId:"database-management", partId:"access-basics" };
const steps = ["intro", "check"];
async function openStore(options) {
  const store = createSubjectProgressStore(options);
  await store.ready(key.ownerId);
  return store;
}

test("progress resumes after reload, completion needs every step and a confirmed finish", async () => {
  const storage = memoryStorage();
  const store = await openStore({ storage });
  assert.deepEqual(store.get(key), { completedStepIds:[], completed:false });
  await store.record({ ...key, stepIds:steps, completedStepIds:["intro", "invalid"], isComplete:true });
  const restored = await openStore({ storage });
  assert.deepEqual(restored.get(key), { completedStepIds:["intro"], completed:false });
  await restored.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:false });
  assert.equal(restored.get(key).completed, false);
  await restored.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  assert.equal((await openStore({ storage })).get(key).completed, true);
});

test("retries and repeated completions cannot decrease or inflate unit progress", async () => {
  const store = await openStore();
  const update = (completedStepIds, isComplete) => store.record({ ...key, stepIds:steps, completedStepIds, isComplete });
  await update(steps, true);
  await update([], false);
  await update(steps, true);
  assert.deepEqual(store.get(key), { completedStepIds:steps, completed:true });
  const unit = getSubjectRoadmap("ict").units[0];
  const progress = getUnitPartProgress(unit, (lesson, part) => store.get({ ...key, lessonId:lesson.id, partId:part.id }));
  assert.deepEqual(progress, { completed:1, total:14, percent:7 });
});

test("progress is isolated by learner, lesson, and part", async () => {
  const store = await openStore();
  await store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  for (const alternative of [{ ownerId:"student-b" }, { ownerId:"guest" }, { lessonId:"other" }, { partId:"tables-and-types" }]) {
    assert.deepEqual(store.get({ ...key, ...alternative }), { completedStepIds:[], completed:false });
  }
});

test("unpublished parts cannot create unit completion and empty units have zero progress", async () => {
  const unit = getSubjectRoadmap("ict").units[0];
  assert.deepEqual(getUnitPartProgress(unit, () => ({ completed:true })), { completed:7, total:14, percent:50 });
  assert.deepEqual(getUnitPartProgress({ lessons:[] }), { completed:0, total:0, percent:0 });
});

test("corrupt or unavailable storage keeps the lesson usable with memory progress", async () => {
  let errors = 0;
  const store = await openStore({
    storage:{ getItem:() => "{broken", setItem:() => { throw new Error("quota"); } },
    onError:() => { errors += 1; },
  });
  assert.equal(store.get(key).completed, false);
  await store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  assert.equal(store.get(key).completed, true);
  assert.equal(errors, 2);
});

test("repeated mistakes create one persistent review item without changing completion", async () => {
  const storage = memoryStorage();
  const store = await openStore({ storage });
  await store.recordAnswer({ ...key, stepId:"check", correct:false });
  assert.equal(store.getReview(key)[0].active, false);
  await store.recordAnswer({ ...key, stepId:"check", correct:false });
  await store.recordAnswer({ ...key, stepId:"check", correct:true });
  await store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  const restored = await openStore({ storage });
  assert.deepEqual(restored.getReview(key), [{ stepId:"check", misses:2, active:true, solved:true }]);
  assert.deepEqual(restored.getReview({ ...key, ownerId:"other" }), []);
  await restored.recordAnswer({ ...key, stepId:"check", correct:false, reviewing:true });
  assert.equal(restored.getReview(key)[0].active, true);
  await restored.recordAnswer({ ...key, stepId:"check", correct:true, reviewing:true });
  assert.equal(restored.getReview(key)[0].active, false);
  assert.equal(restored.get(key).completed, true);
  await restored.recordAnswer({ ...key, stepId:"check", correct:false });
  await restored.recordAnswer({ ...key, stepId:"check", correct:false });
  assert.equal(restored.getReview(key).length, 1);
  assert.equal(restored.getReview(key)[0].active, true);
});

test("completion gains are one-time, preview is read-only, and streak counts distinct days", async () => {
  const storage = memoryStorage();
  const store = await openStore({ storage });
  const outcomeKey = { ...key, totalParts:28, date:"2026-09-05" };
  assert.equal(store.getOutcome({ ...outcomeKey, preview:true }).totalXp, 10);
  assert.equal(store.get(key).completed, false);
  assert.equal(store.getOutcome(outcomeKey).totalXp, 0);
  const finish = (partId, date) => store.record({ ...key, partId, date, stepIds:steps, completedStepIds:steps, isComplete:true });
  await finish(key.partId, "2026-09-05");
  await finish(key.partId, "2026-09-05");
  assert.equal(store.getOutcome(outcomeKey).totalXp, 10);
  assert.equal(store.getOutcome(outcomeKey).progress, 4);
  await finish("second", "2026-09-05");
  assert.equal(store.getOutcome(outcomeKey).streak, 1);
  await finish("third", "2026-09-06");
  const restored = await openStore({ storage });
  assert.equal(restored.getOutcome({ ...outcomeKey, date:"2026-09-06" }).streak, 2);
  assert.equal(restored.getOutcome({ ...outcomeKey, date:"2026-09-08" }).streak, 0);
  assert.equal(restored.getOutcome(outcomeKey).totalXp, 30);
  assert.equal(restored.getOutcome({ ...outcomeKey, ownerId:"other" }).totalXp, 0);
});

test("invalid stored neighbors do not discard valid progress", async () => {
  const storage = memoryStorage();
  storage.setItem("tawjihi:subject-parts:v1:student-a", JSON.stringify({ version:1, records:[
    null, [JSON.stringify([key.subjectId, key.lessonId, key.partId]), { completedStepIds:steps, completed:true }],
  ] }));
  assert.equal((await openStore({ storage })).get(key).completed, true);
});

test("interleaved stores preserve independent completions and same-part steps", async () => {
  const storage = memoryStorage();
  const first = await openStore({ storage });
  const second = await openStore({ storage });
  first.get(key);
  second.get(key);
  await first.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true });
  await second.record({ ...key, partId:"second", stepIds:steps, completedStepIds:steps, isComplete:true });
  const restored = await openStore({ storage });
  assert.equal(restored.get(key).completed, true);
  assert.equal(restored.get({ ...key, partId:"second" }).completed, true);
});

test("unsupported versions are retained and saving does not claim success", async () => {
  const storage = memoryStorage();
  const source = JSON.stringify({ version:2, records:["future"] });
  storage.setItem("tawjihi:subject-parts:v1:student-a", source);
  const store = await openStore({ storage, onError:() => {} });
  assert.equal(store.getSaveState(key.ownerId), "failed");
  assert.equal((await store.record({ ...key, stepIds:steps, completedStepIds:steps, isComplete:true })).status, "failed");
  assert.equal(store.get(key).completed, true);
  assert.equal(storage.getItem("tawjihi:subject-parts:v1:student-a"), source);
});

test("a denied write retains answers in memory and retry applies each answer once", async () => {
  const storage = memoryStorage();
  const write = storage.setItem;
  const store = await openStore({ storage, onError:() => {} });
  storage.setItem = () => { throw new Error("quota"); };
  await store.recordAnswer({ ...key, stepId:"check", correct:false });
  assert.equal(store.getSaveState(key.ownerId), "failed");
  assert.equal(store.getReview(key)[0].misses, 1);
  storage.setItem = write;
  await store.retry(key.ownerId);
  assert.equal(store.getSaveState(key.ownerId), "saved");
  assert.equal((await openStore({ storage })).getReview(key)[0].misses, 1);
});


test("recoverable legacy errors expose a dismissible warning without losing valid progress", async () => {
  const storage=memoryStorage();
  storage.setItem("tawjihi:subject-parts:v1:student-a",JSON.stringify({version:1,records:[null,[JSON.stringify([key.subjectId,key.lessonId,key.partId]),{completedStepIds:steps,completed:true,rewardXp:10}]]}));
  const store=await openStore({storage,onError:()=>{}});
  assert.equal(store.get(key).completed,true);
  assert.equal(store.getSaveState(key.ownerId),"saved");
  assert.equal(store.hasRecoveryWarning(key.ownerId),true);
  assert.equal(store.hasRecoveryWarning("student-b"),false);
  store.dismissRecoveryWarning(key.ownerId);
  assert.equal(store.hasRecoveryWarning(key.ownerId),false);
});
