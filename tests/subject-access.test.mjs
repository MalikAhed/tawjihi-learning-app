import assert from "node:assert/strict";
import test from "node:test";
import { getSubjectPartAccess, getNextSubjectPart } from "../src/domain/subject-access.js";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";

const roadmap = getSubjectRoadmap("ict");
const access = (partId, options = {}) => getSubjectPartAccess(roadmap, {
  lessonId:"database-management", partId, ...options,
});

test("direct links and roadmap unlock published parts while retaining publication boundaries", () => {
  assert.equal(access("unknown"), null);
  assert.equal(getSubjectPartAccess(null, {}), null);
  assert.equal(access("access-basics").state, "available");
  assert.equal(access("tables-and-types").state, "available");
  assert.equal(access("tables-and-types").previous.part.id, "access-basics");
  assert.equal(access("access-basics", { accountRequired:true }).state, "available");
  assert.equal(getSubjectPartAccess(roadmap, { lessonId:"sql-queries", partId:"sql-introduction", accountRequired:true }).state, "available");
  assert.equal(getSubjectPartAccess(roadmap, { lessonId:"smartphone-operating-systems", partId:"android-features", accountRequired:true }).state, "unpublished");
  assert.equal(getSubjectPartAccess(roadmap, { lessonId:"course-introduction", partId:"getting-started" }).state, "available");
});

test("unlocking preserves each learner's progress and completed parts remain replayable", () => {
  const getPartProgress = (_lesson, part) => ({ completed:part.id === "access-basics", completedStepIds:part.id === "tables-and-types" ? ["tables-fields-records"] : [] });
  assert.equal(access("access-basics", { getPartProgress }).state, "completed");
  assert.equal(access("tables-and-types", { getPartProgress }).state, "in-progress");
  assert.equal(access("keys-and-relations", { getPartProgress }).state, "available");
  assert.equal(getNextSubjectPart(roadmap, getPartProgress).part.id, "tables-and-types");
  // Unlocking does not give a different learner saved progress.
  assert.equal(access("tables-and-types").state, "available");
});
