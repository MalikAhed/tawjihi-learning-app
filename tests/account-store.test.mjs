import assert from "node:assert/strict";
import test from "node:test";
import { createAccountStore } from "../src/server/account-store.mjs";

test("account store creates a free account and authenticates every supported identifier", async (context) => {
  const store = createAccountStore({ databasePath:":memory:" });
  context.after(() => store.close());
  const values = { username:"طالب_جديد", email:"Student@Example.com", phone:"", curriculum:"gaza", path:"scientific", password:"Learn123" };
  const created = await store.createAccount(values);

  assert.equal(created.status, "created");
  assert.equal(created.account.accountType, "free");
  assert.equal(created.account.phone, null);
  assert.equal(created.account.curriculum, "gaza");
  assert.equal(created.account.path, "scientific");
  assert.equal("password" in created.account, false);
  assert.equal((await store.authenticate("طالب_جديد", values.password))?.id, created.account.id);
  assert.equal((await store.authenticate("student@example.com", values.password))?.id, created.account.id);
  assert.equal((await store.authenticate("student@example.com", values.password))?.id, created.account.id);
  assert.equal(await store.authenticate(values.email, "wrong-password"), null);
});

test("account store enforces unique usernames, emails, and phone numbers", async (context) => {
  const store = createAccountStore({ databasePath:":memory:" });
  context.after(() => store.close());
  const account = (values) => ({ curriculum:"gaza", path:"scientific", password:"Learn123", ...values });
  await store.createAccount(account({ username:"first", email:"first@example.com", phone:"0591111111" }));

  assert.deepEqual(
    await store.createAccount(account({ username:"FIRST", email:"second@example.com", phone:"0592222222" })),
    { status:"duplicate", field:"username" },
  );
  assert.deepEqual(
    await store.createAccount(account({ username:"second", email:"FIRST@example.com", phone:"0592222222" })),
    { status:"duplicate", field:"email" },
  );
  assert.deepEqual(
    await store.createAccount(account({ username:"second", email:"second@example.com", phone:"059-111-1111" })),
    { status:"duplicate", field:"phone" },
  );
});

test("accounts may omit a phone number and still sign in by username", async (context) => {
  const store = createAccountStore({ databasePath:":memory:" });
  context.after(() => store.close());
  const base = { phone:"", curriculum:"gaza", path:"literary", password:"Learn123" };
  const first = await store.createAccount({ ...base, username:"no-phone-one", email:"one@example.com" });
  const second = await store.createAccount({ ...base, username:"no-phone-two", email:"two@example.com" });

  assert.equal(first.status, "created");
  assert.equal(first.account.phone, null);
  assert.equal(second.status, "created");
  assert.equal((await store.authenticate("no-phone-one", base.password))?.id, first.account.id);
});

test("login identifiers cannot collide across username, email, and phone fields", async (context) => {
  const store = createAccountStore({ databasePath:":memory:" });
  context.after(() => store.close());
  const account = (values) => ({ curriculum:"gaza", path:"scientific", password:"Learn123", ...values });
  await store.createAccount(account({ username:"0591111111", email:"number-name@example.com", phone:"" }));

  assert.equal(store.isIdentifierAvailable("phone", "059-111-1111"), false);
  assert.deepEqual(
    await store.createAccount(account({ username:"second-user", email:"second@example.com", phone:"059-111-1111" })),
    { status:"duplicate", field:"phone" },
  );
  assert.equal((await store.authenticate("059-111-1111", "Learn123"))?.username, "0591111111");
});

test("account sessions can be restored and revoked without exposing raw tokens", async (context) => {
  const store = createAccountStore({ databasePath:":memory:" });
  context.after(() => store.close());
  const created = await store.createAccount({ username:"session-user", email:"session@example.com", phone:null, curriculum:"full-palestinian", path:"literary", password:"Learn123" });
  const session = store.createSession(created.account.id);

  assert.equal(store.getAccountForSession(session.token)?.username, "session-user");
  store.deleteSession(session.token);
  assert.equal(store.getAccountForSession(session.token), null);
});
