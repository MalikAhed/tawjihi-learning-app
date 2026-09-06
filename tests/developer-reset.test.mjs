import test from "node:test";
import assert from "node:assert/strict";
import { handleDeveloperReset } from "../src/server/developer-reset.mjs";
import { createAccountStore } from "../src/server/account-store.mjs";

function request(overrides = {}) {
  return { method:"POST", socket:{ remoteAddress:"127.0.0.1" }, headers:{ host:"localhost:4173", origin:"http://localhost:4173", "x-developer-reset":"confirm" }, ...overrides };
}
function run(req) {
  let resets = 0;
  const res = { setHeader() {}, writeHead(status) { this.status = status; return this; }, end(body) { this.body = body; } };
  handleDeveloperReset(req, res, { resetDevelopmentData() { resets++; } });
  return { status:res.status, resets };
}
test("only explicit same-origin localhost POST can reset the database", () => {
  assert.deepEqual(run(request()), { status:200, resets:1 });
  assert.deepEqual(run(request({ method:"GET" })), { status:405, resets:0 });
  for (const change of [
    { socket:{ remoteAddress:"192.168.1.1" } },
    { headers:{ host:"localhost:4173", origin:"https://evil.example", "x-developer-reset":"confirm" } },
    { headers:{ host:"evil.example", origin:"http://evil.example", "x-developer-reset":"confirm" } },
    { headers:{ host:"localhost:4173", origin:"http://localhost:4173" } },
  ]) assert.deepEqual(run(request(change)), { status:403, resets:0 });
});
test("development reset removes accounts, aliases and sessions while preserving the schema", async () => {
  const store = createAccountStore({ databasePath:":memory:" });
  try {
    const values = { username:"developer", email:"dev@example.com", phone:"", curriculum:"gaza", path:"scientific", password:"Learn123" };
    const created = await store.createAccount(values);
    const { token } = store.createSession(created.account.id);
    assert.ok(store.getAccountForSession(token));
    store.resetDevelopmentData();
    assert.equal(store.getAccountForSession(token), null);
    assert.equal(await store.authenticate(values.username, values.password), null);
    assert.equal(store.isIdentifierAvailable("username", "developer"), true);
    assert.equal((await store.createAccount(values)).status, "created");
  }
  finally { store.close(); }
});
