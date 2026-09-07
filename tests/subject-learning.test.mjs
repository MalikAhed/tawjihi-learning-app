import assert from "node:assert/strict";
import test from "node:test";
import { createSubjectLearningController } from "../src/ui/subject-learning.js";
import { createViewLifecycle } from "../src/app/view-lifecycle.js";

test("roadmap navigation records its destination before waiting and never mounts a previous owner's progress", async () => {
  let release;
  const ready = new Promise((resolve) => { release = resolve; });
  let owner = "account:first";
  const routes = [];
  const content = { innerHTML:"", removeAttribute() {} };
  const controller = createSubjectLearningController({
    elements:{ lessonShell:{ dataset:{} }, lessonTitle:{}, lessonStatus:{}, lessonContent:content },
    productService:{ getLearnerProgressOwner:() => owner, getAccountType:() => "free" },
    progressStore:{ getSaveState:() => "loading", ready:() => ready },
    viewLifecycle:createViewLifecycle(),
    setDevelopmentViewMode() {}, showContentView() {},
    writeRoute:(route) => routes.push(route),
  });
  const opening = controller.openSubject("ict");
  assert.deepEqual(routes, [{ subject:"ict" }], "account changes must already see the pending subject destination");
  assert.match(content.innerHTML, /lesson-loading/);
  const loading = content.innerHTML;
  owner = "guest";
  release();
  await opening;
  assert.equal(content.innerHTML, loading, "the old request cannot paint a roadmap or read the old owner's records");
});
