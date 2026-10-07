import assert from "node:assert/strict";
import test from "node:test";
import { createAuthClient } from "../src/services/auth-client.js";

test("auth client owns JSON requests and same-origin credentials", async () => {
  let captured;
  const client = createAuthClient({
    baseUrl:"/api/auth",
    fetchImpl:async (url, options) => {
      captured = { url, options };
      return { ok:true, status:200, json:async () => ({ status:"available" }) };
    },
  });

  const result = await client.checkAvailability({ field:"username", value:"learner" });

  assert.equal(result.body.status, "available");
  assert.equal(captured.url, "/api/auth/availability");
  assert.equal(captured.options.credentials, "same-origin");
  assert.equal(captured.options.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(captured.options.body), { field:"username", value:"learner" });
});

test("auth client distinguishes caller cancellation from an unavailable server", async () => {
  const request = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once:true });
  });
  const client = createAuthClient({ baseUrl:"/api/auth", fetchImpl:request });
  const controller = new AbortController();
  const pending = client.signIn({ identifier:"learner", password:"secret" }, { signal:controller.signal });

  controller.abort();

  assert.deepEqual(await pending, { ok:false, status:0, aborted:true, body:{ status:"aborted" } });
});

for (const rejectsBody of [false, true]) {
  test(`cancellation while reading the response body stays aborted (${rejectsBody ? "rejected" : "resolved"} body)`, async () => {
    let finishBody;
    const body = new Promise((resolve, reject) => {
      finishBody = () => rejectsBody
        ? reject(new DOMException("Aborted", "AbortError"))
        : resolve({ status:"signed-in", account:{ id:"student-a" } });
    });
    const client = createAuthClient({
      baseUrl:"/api/auth",
      fetchImpl:async () => ({ ok:true, status:200, json:() => body }),
    });
    const controller = new AbortController();
    const pending = client.signIn({ identifier:"learner", password:"secret" }, { signal:controller.signal });
    await Promise.resolve();
    controller.abort();
    finishBody();
    assert.deepEqual(await pending, { ok:false, status:0, aborted:true, body:{ status:"aborted" } });
  });
}
