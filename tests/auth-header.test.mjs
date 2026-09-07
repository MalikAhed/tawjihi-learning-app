import assert from "node:assert/strict";
import test from "node:test";
import { createAuthHeader } from "../src/ui/auth-header.js";
import { createLearnerSession } from "../src/services/learner-session.js";

test("header streak freeze follows learner switches, then unsubscribes", t => {
  const previousDocument = globalThis.document;
  globalThis.document = { body:{ dataset:{} } };
  t.after(() => { globalThis.document = previousDocument; });
  const service = createLearnerSession();
  service.selectScenario("student-free-new");
  const subscribers = new Set();
  const progressStore = { subscribe:callback => { subscribers.add(callback); return () => subscribers.delete(callback); } };
  const streakFreeze = { hidden:true };
  const guest = { hidden:false };
  const member = { hidden:true, ownerDocument:{ querySelector:selector => { assert.equal(selector, "[data-learner-streak-freeze]"); return streakFreeze; } } };
  const label = { textContent:"", lang:"" };
  const header = createAuthHeader({ guest, member, label, service, progressStore,
    flowButtons:[], signOutButton:{ addEventListener() {} }, courseContainer:{ querySelectorAll:() => [] }, onFlow() {} });
  assert.equal(streakFreeze.hidden, false);
  service.selectScenario("student-paid");
  assert.equal(streakFreeze.hidden, false);
  assert.equal(label.textContent, "حساب مشترك");
  subscribers.forEach(callback => callback());
  assert.equal(streakFreeze.hidden, false);
  service.selectScenario("visitor-supported");
  assert.equal(streakFreeze.hidden, true);
  assert.equal(member.hidden, true);
  assert.equal(guest.hidden, false);
  header.destroy();
  assert.equal(subscribers.size, 0);
  service.selectScenario("student-paid");
  assert.equal(member.hidden, true, "Destroyed headers do not react to later accounts");
});
