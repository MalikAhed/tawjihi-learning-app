import assert from "node:assert/strict";
import test from "node:test";
import { createAuthApi } from "../src/server/auth-api.mjs";
import { createAuthRateLimiter } from "../src/server/auth-rate-limiter.mjs";

function createResponse() {
  return {
    statusCode:null,
    headers:{},
    body:"",
    writeHead(statusCode, headers = {}) {
      this.statusCode = statusCode;
      Object.assign(this.headers, headers);
      return this;
    },
    end(body = "") {
      this.body = body;
      return this;
    },
  };
}

async function requestApi(handler, pathname, { method = "POST", body = {}, headers = {}, address = "127.0.0.1" } = {}) {
  const request = {
    method,
    body,
    headers:{ host:"app.test", "content-type":"application/json", ...headers },
    socket:{ remoteAddress:address, encrypted:false },
  };
  const response = createResponse();
  await handler(request, response, pathname);
  return { ...response, json:response.body ? JSON.parse(response.body) : null };
}

function createStore(overrides = {}) {
  return {
    getAccountForSession:() => null,
    deleteSession:() => {},
    isIdentifierAvailable:() => true,
    createAccount:async () => ({ status:"created", account:{ id:"1", username:"student", accountType:"free", curriculum:"gaza", path:"scientific" } }),
    authenticate:async () => null,
    createSession:() => ({ token:"secret-session-token", expiresAt:new Date("2030-01-01T00:00:00.000Z") }),
    ...overrides,
  };
}

const readJsonBody = async (request) => request.body;

test("availability reports a duplicate on the field being continued", async () => {
  const handler = createAuthApi({ accountStore:createStore({ isIdentifierAvailable:() => false }), readJsonBody });
  const response = await requestApi(handler, "/api/auth/availability", { body:{ field:"username", value:"student" } });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json.status, "duplicate");
  assert.equal(response.json.field, "username");
  assert.match(response.json.error, /اسم المستخدم مستخدم بالفعل/);
});

test("registration requires email and does not call the store with invalid data", async () => {
  let createCalls = 0;
  const handler = createAuthApi({
    accountStore:createStore({ createAccount:async () => { createCalls += 1; } }),
    readJsonBody,
  });
  const response = await requestApi(handler, "/api/auth/register", {
    body:{ username:"student", curriculum:"gaza", path:"scientific", email:"", password:"Learn123", phone:"" },
  });

  assert.equal(response.statusCode, 422);
  assert.match(response.json.fieldErrors.email, /الإلكتروني/);
  assert.equal(createCalls, 0);
});

test("registration requires a supported phone number", async () => {
  let createCalls = 0;
  const handler = createAuthApi({
    accountStore:createStore({ createAccount:async () => { createCalls += 1; } }),
    readJsonBody,
  });
  const response = await requestApi(handler, "/api/auth/register", {
    body:{ username:"student", curriculum:"gaza", path:"scientific", email:"student@example.com", password:"Learn123", phone:"" },
  });

  assert.equal(response.statusCode, 422);
  assert.match(response.json.fieldErrors.phone, /رقم هاتف/);
  assert.equal(createCalls, 0);
});

test("registration accepts nine Palestinian phone digits without dashes", async () => {
  const handler = createAuthApi({ accountStore:createStore(), readJsonBody });
  const response = await requestApi(handler, "/api/auth/register", {
    body:{ username:"student", curriculum:"gaza", path:"scientific", email:"student@example.com", password:"Learn123", phone:"+972598932239" },
  });

  assert.equal(response.statusCode, 201);
});

test("authentication rejects cross-site mutations and misleading JSON content types", async () => {
  let deleted = false;
  const handler = createAuthApi({ accountStore:createStore({ deleteSession:() => { deleted = true; } }), readJsonBody });
  const crossSite = await requestApi(handler, "/api/auth/sign-out", {
    headers:{ origin:"https://attacker.test", "sec-fetch-site":"cross-site" },
  });
  const invalidMediaType = await requestApi(handler, "/api/auth/sign-in", {
    headers:{ "content-type":"application/json-malformed" },
  });

  assert.equal(crossSite.statusCode, 403);
  assert.equal(deleted, false);
  assert.equal(invalidMediaType.statusCode, 415);
});

test("successful registration sets a protected strict same-site session cookie", async () => {
  const handler = createAuthApi({ accountStore:createStore(), readJsonBody });
  const response = await requestApi(handler, "/api/auth/register", {
    body:{ username:"student", curriculum:"gaza", path:"scientific", email:"student@example.com", password:"Learn123", phone:"+972598932239" },
  });

  assert.equal(response.statusCode, 201);
  assert.match(response.headers["Set-Cookie"], /HttpOnly/);
  assert.match(response.headers["Set-Cookie"], /SameSite=Strict/);
  assert.equal(response.body.includes("secret-session-token"), false);
});

test("authentication rate limiter blocks repeated attempts and recovers after its window", () => {
  let currentTime = 1_000;
  const limiter = createAuthRateLimiter({ now:() => currentTime });
  for (let attempt = 0; attempt < 10; attempt += 1) {
    assert.equal(limiter.consume("client:sign-in", "signIn").allowed, true);
  }
  assert.equal(limiter.consume("client:sign-in", "signIn").allowed, false);
  currentTime += 10 * 60_000;
  assert.equal(limiter.consume("client:sign-in", "signIn").allowed, true);
});
