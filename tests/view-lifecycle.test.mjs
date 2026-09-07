import assert from "node:assert/strict";
import test from "node:test";
import { createViewLifecycle } from "../src/app/view-lifecycle.js";

test("a new destination cancels prior work and cleans renderer before loading shell", () => {
  const lifecycle = createViewLifecycle();
  const calls = [];
  const first = lifecycle.begin();
  first.add(() => calls.push("shell"));
  first.add(() => calls.push("renderer"));
  const second = lifecycle.begin();
  assert.equal(first.signal.aborted, true);
  assert.equal(first.isCurrent(), false);
  assert.deepEqual(calls, ["renderer", "shell"]);
  first.add(() => calls.push("late stale cleanup"));
  second.add(() => calls.push("latest"));
  assert.equal(second.isCurrent(), true);
  lifecycle.clear();
  lifecycle.clear();
  assert.deepEqual(calls, ["renderer", "shell", "late stale cleanup", "latest"]);
});
