import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_PROTOTYPE_SCENARIO_ID, getPrototypeScenario, PROTOTYPE_SCENARIOS } from "../src/data/prototype-fixtures.js";
import { createFixtureProductService, GUEST_TRIAL_STORAGE_KEY, LIVE_RELOAD_STORAGE_KEY, PROTOTYPE_SCENARIO_STORAGE_KEY, TEMPORARY_ACCOUNT_STORAGE_KEY, VISITOR_SELECTION_STORAGE_KEY } from "../src/services/prototype-service.js";

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, value); }
  removeItem(key) { this.values.delete(key); }
}

test("prototype fixtures cover guests, students, recovery, and internal roles", () => {
  assert.equal(PROTOTYPE_SCENARIOS.length, 15);
  assert.equal(new Set(PROTOTYPE_SCENARIOS.map(({ id }) => id)).size, PROTOTYPE_SCENARIOS.length);
  assert.deepEqual(new Set(PROTOTYPE_SCENARIOS.map(({ group }) => group)), new Set(["Visitor", "Guest", "Student", "Recovery", "Operations"]));
  assert.equal(getPrototypeScenario(DEFAULT_PROTOTYPE_SCENARIO_ID)?.snapshot.actor, "visitor");
  assert.deepEqual(new Set(PROTOTYPE_SCENARIOS.map(({ snapshot }) => snapshot.account.type)), new Set(["guest", "free", "subscribed", "banned"]));
  assert.equal(Object.isFrozen(PROTOTYPE_SCENARIOS[0].snapshot), true);
});

test("fixture service selects, announces, and persists a scenario", () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  const changes = [];
  const unsubscribe = service.subscribe((snapshot, scenario) => changes.push([snapshot.actor, scenario.id]));
  const snapshot = service.selectScenario("student-paid");
  unsubscribe();
  service.selectScenario("visitor-supported");
  assert.equal(snapshot.access.status, "paid-active");
  assert.deepEqual(changes, [["student", "student-paid"]]);
  assert.equal(storage.getItem(PROTOTYPE_SCENARIO_STORAGE_KEY), "visitor-supported");
  assert.equal(createFixtureProductService({ storage }).getScenario().id, "visitor-supported");
});

test("fixture service safely rejects unknown scenarios and ignores invalid saved values", () => {
  const storage = new MemoryStorage();
  storage.setItem(PROTOTYPE_SCENARIO_STORAGE_KEY, "not-a-scenario");
  const service = createFixtureProductService({ storage });
  assert.equal(service.getScenario().id, DEFAULT_PROTOTYPE_SCENARIO_ID);
  assert.throws(() => service.selectScenario("not-a-scenario"), /Unknown prototype scenario/);
});

test("visitor selection stays behind the fixture service boundary", () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  assert.equal(service.getVisitorSelection(), null);
  assert.deepEqual(service.saveVisitorSelection({ curriculum:"gaza", path:"scientific" }), { curriculum:"gaza", path:"scientific" });
  assert.equal(storage.getItem(VISITOR_SELECTION_STORAGE_KEY), JSON.stringify({ curriculum:"gaza", path:"scientific" }));
  assert.throws(() => service.saveVisitorSelection({ curriculum:"unknown", path:"scientific" }), /invalid/);
});

test("guest trial persists its first-lesson gate and is cleared by account creation", async () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  assert.deepEqual(service.startGuestTrial(), { status:"guest-started", accountType:"guest" });
  assert.deepEqual(service.getGuestTrialState(), { active:true, completedFirstLesson:false });
  assert.deepEqual(service.completeGuestFirstLesson(), { active:true, completedFirstLesson:true });
  assert.match(storage.getItem(GUEST_TRIAL_STORAGE_KEY), /completedFirstLesson/);
  assert.deepEqual(createFixtureProductService({ storage }).getGuestTrialState(), { active:true, completedFirstLesson:true });
  await service.createAccount({ username:"guest-convert", email:"guest@example.com", password:"Secret123" });
  assert.deepEqual(service.getGuestTrialState(), { active:false, completedFirstLesson:false });
  assert.equal(storage.getItem(GUEST_TRIAL_STORAGE_KEY), null);
});

test("registration creates a free account directly without verification", async () => {
  const service = createFixtureProductService();
  const result = await service.createAccount({ username:"new-student", email:"new@example.com", phone:"0591234567", password:"Secret123" });
  assert.deepEqual(result, { status:"created", accountType:"free" });
  assert.equal(service.getAccountType(), "free");
  assert.equal(service.getLearnerHomeSnapshot().learning.completion, "not-started");
  assert.equal(JSON.stringify(service.getSnapshot()).includes("Secret123"), false);
});

test("registration rejects identifiers already used by a demo account", async () => {
  const service = createFixtureProductService();
  assert.equal((await service.checkAccountAvailability({ field:"username", value:"free" })).status, "duplicate");
  assert.equal((await service.checkAccountAvailability({ field:"username", value:"unused-name" })).status, "available");
  assert.equal((await service.createAccount({ username:"free", email:"new@example.com", phone:"0591234567" })).status, "duplicate");
  assert.equal((await service.createAccount({ username:"new", email:"subscribed@example.com", phone:"0591234567" })).status, "duplicate");
});

test("API sign-in restores the curriculum and path owned by the account", async () => {
  const storage = new MemoryStorage();
  const account = {
    username:"returning", displayName:"Returning", accountType:"free",
    curriculum:"full-palestinian", path:"literary",
  };
  const service = createFixtureProductService({
    storage,
    apiBase:"/api/auth",
    fetchImpl:async () => ({ ok:true, status:200, json:async () => ({ status:"signed-in", account }) }),
  });
  service.saveVisitorSelection({ curriculum:"gaza", path:"scientific" });

  assert.equal((await service.signIn({ identifier:"returning", password:"Learn123" })).status, "signed-in");
  assert.deepEqual(service.getVisitorSelection(), { curriculum:"full-palestinian", path:"literary" });
});

test("failed API session restoration clears temporary member state", async () => {
  const storage = new MemoryStorage();
  storage.setItem(LIVE_RELOAD_STORAGE_KEY, "1");
  storage.setItem(TEMPORARY_ACCOUNT_STORAGE_KEY, JSON.stringify({
    type:"subscribed", displayName:"Stale user", homeScenarioId:"student-paid",
  }));
  const service = createFixtureProductService({
    storage,
    apiBase:"/api/auth",
    fetchImpl:async () => ({ ok:false, status:503, json:async () => ({ status:"unavailable" }) }),
  });
  assert.equal(service.getAccountType(), "subscribed");

  assert.equal((await service.restoreSession()).accountType, "guest");
  assert.equal(service.getAccountType(), "guest");
  assert.equal(storage.getItem(TEMPORARY_ACCOUNT_STORAGE_KEY), null);
});

test("malformed successful API responses fail closed without changing account state", async () => {
  const errors = [];
  const service = createFixtureProductService({
    apiBase:"/api/auth",
    onError:(error) => errors.push(error),
    fetchImpl:async () => ({ ok:true, status:200, json:async () => ({ status:"signed-in" }) }),
  });

  assert.equal((await service.signIn({ identifier:"returning", password:"Learn123" })).status, "unavailable");
  assert.equal((await service.createAccount({ username:"new", password:"Learn123" })).status, "unavailable");
  assert.equal((await service.restoreSession()).status, "unavailable");
  assert.equal(service.getAccountType(), "guest");
  assert.equal(errors.length, 3);
});

test("sign-in accepts username, email, or phone for the three member account types", async () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  assert.equal((await service.signIn({ identifier:"unknown", password:"Learn123" })).status, "invalid");
  assert.equal((await service.signIn({ identifier:"free@example.com", password:"wrong" })).status, "invalid");
  assert.deepEqual(await service.signIn({ identifier:"free", password:"Learn123" }), { status:"signed-in", accountType:"free" });
  assert.equal(service.getAccountType(), "free");
  assert.equal(service.getLearnerHomeSnapshot().learning.mustReviewCount, 3);
  assert.deepEqual(await service.signIn({ identifier:"0592222222", password:"Learn123" }), { status:"signed-in", accountType:"subscribed" });
  assert.equal(service.getAccountType(), "subscribed");
  assert.equal(service.getLearnerHomeSnapshot().learning.requiredLessonsCompleted, 5);
  assert.deepEqual(await service.signIn({ identifier:"banned@example.com", password:"Learn123" }), { status:"signed-in", accountType:"banned" });
  assert.equal(service.getAccountType(), "banned");
  assert.equal(service.getLearnerHomeSnapshot(), null);
  assert.deepEqual(service.getVisitorSelection(), { curriculum:"gaza", path:"scientific" });
  assert.deepEqual(service.signOut(), { accountType:"guest" });
  assert.equal(service.getAccountType(), "guest");
  assert.equal(service.getLearnerHomeSnapshot(), null);
  assert.equal(JSON.stringify(service.getSnapshot()).includes("Learn123"), false);
});

test("a login survives in-app navigation state but is cleared by a hard refresh", async () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  await service.signIn({ identifier:"subscribed", password:"Learn123" });
  assert.equal(service.getAccountType(), "subscribed");
  assert.equal(service.getLearnerDisplayName(), "ليان");
  const refreshedService = createFixtureProductService({ storage });
  assert.equal(refreshedService.getAccountType(), "guest");
  assert.equal(refreshedService.getLearnerDisplayName(), "");
});

test("the development server live reload preserves the temporary login", async () => {
  const storage = new MemoryStorage();
  const service = createFixtureProductService({ storage });
  await service.signIn({ identifier:"subscribed", password:"Learn123" });
  assert.match(storage.getItem(TEMPORARY_ACCOUNT_STORAGE_KEY), /subscribed/);
  storage.setItem(LIVE_RELOAD_STORAGE_KEY, "1");
  const reloadedService = createFixtureProductService({ storage });
  assert.equal(reloadedService.getAccountType(), "subscribed");
  assert.equal(reloadedService.getLearnerDisplayName(), "ليان");
  assert.equal(storage.getItem(LIVE_RELOAD_STORAGE_KEY), null);
});
