import { duplicateAccountFieldMessage, isAccountIdentifierField, validateAccountField, validateRegistration } from "../domain/account.js";
import { createAuthRateLimiter } from "./auth-rate-limiter.mjs";
import { hasJsonContentType, sendJson } from "./http.mjs";

const SESSION_COOKIE = "tawjihi_session";
const AUTH_ROUTES = new Set(["/api/auth/session", "/api/auth/availability", "/api/auth/register", "/api/auth/sign-in", "/api/auth/sign-out"]);

function parseCookies(header = "") {
  return Object.fromEntries(String(header).split(";").map((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return [part.trim(), ""];
    const name = part.slice(0, separator).trim();
    try { return [name, decodeURIComponent(part.slice(separator + 1))]; }
    catch { return [name, ""]; }
  }).filter(([name]) => name));
}

export const getSessionToken = (request) => parseCookies(request.headers.cookie)[SESSION_COOKIE];

function sessionCookie(token, expiresAt, secure = false) {
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Priority=High",
    `Expires=${expiresAt.toUTCString()}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function expiredSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export function isCrossSiteRequest(request) {
  if (request.headers["sec-fetch-site"] === "cross-site") return true;
  const origin = request.headers.origin;
  if (!origin) return false;
  try { return new URL(origin).host !== request.headers.host; }
  catch { return true; }
}

function clientKey(request, pathname) {
  return `${request.socket?.remoteAddress || "unknown"}:${pathname}`;
}

export function createAuthApi({ accountStore, readJsonBody, rateLimiter = createAuthRateLimiter(), originPolicy = isCrossSiteRequest, clientAddress = request => request.socket?.remoteAddress || "unknown", secureCookies = false }) {
  if (!accountStore || !readJsonBody) throw new TypeError("auth API dependencies are required");

  return async function handleAuthApi(request, response, pathname) {
    if (!AUTH_ROUTES.has(pathname)) {
      sendJson(response, 404, { error:"Not found" });
      return;
    }
    const token = parseCookies(request.headers.cookie)[SESSION_COOKIE];

    if (pathname === "/api/auth/session") {
      if (request.method !== "GET") {
        response.writeHead(405, { Allow:"GET" }).end("Method not allowed");
        return;
      }
      sendJson(response, 200, { account:accountStore.getAccountForSession(token) });
      return;
    }

    if (request.method !== "POST") {
      response.writeHead(405, { Allow:"POST" }).end("Method not allowed");
      return;
    }
    if (originPolicy(request)) {
      sendJson(response, 403, { status:"forbidden", error:"تعذّر التحقق من مصدر الطلب." });
      return;
    }

    if (pathname === "/api/auth/sign-out") {
      accountStore.deleteSession(token);
      sendJson(response, 200, { status:"signed-out" }, { "Set-Cookie":expiredSessionCookie() });
      return;
    }

    if (!hasJsonContentType(request)) {
      sendJson(response, 415, { status:"invalid", error:"Content-Type must be application/json." });
      return;
    }

    const policyName = pathname === "/api/auth/availability" ? "availability"
      : pathname === "/api/auth/register" ? "register" : "signIn";
    const limiterKey = `${clientAddress(request)}:${pathname}`;
    const rateLimit = rateLimiter.consume(limiterKey, policyName);
    if (!rateLimit.allowed) {
      sendJson(response, 429, {
        status:"rate-limited",
        error:"محاولات كثيرة خلال وقت قصير. انتظر قليلًا ثم حاول مرة أخرى.",
      }, { "Retry-After":String(rateLimit.retryAfterSeconds) });
      return;
    }

    if (pathname === "/api/auth/availability") {
      const body = await readJsonBody(request);
      const field = String(body?.field || "");
      const value = String(body?.value || "").trim();
      if (!isAccountIdentifierField(field)) {
        sendJson(response, 422, { status:"invalid", error:"تعذّر التحقق من هذه البيانات." });
        return;
      }
      const validationError = validateAccountField(field, value);
      if (validationError) {
        sendJson(response, 422, { status:"invalid", fieldErrors:{ [field]:validationError } });
        return;
      }
      if (!accountStore.isIdentifierAvailable(field, value)) {
        sendJson(response, 200, { status:"duplicate", field, error:duplicateAccountFieldMessage(field) });
        return;
      }
      sendJson(response, 200, { status:"available", field });
      return;
    }

    if (pathname === "/api/auth/register") {
      const body = await readJsonBody(request);
      const { values, fieldErrors } = validateRegistration(body);
      if (Object.keys(fieldErrors).length) {
        sendJson(response, 422, { status:"invalid", fieldErrors });
        return;
      }
      const result = await accountStore.createAccount(values);
      if (result.status === "duplicate") {
        sendJson(response, 409, {
          status:"duplicate",
          field:result.field,
          error:duplicateAccountFieldMessage(result.field),
        });
        return;
      }
      const session = accountStore.createSession(result.account.id);
      sendJson(response, 201, { status:"created", account:result.account }, {
        "Set-Cookie":sessionCookie(session.token, session.expiresAt, secureCookies || Boolean(request.socket.encrypted)),
      });
      return;
    }

    if (pathname === "/api/auth/sign-in") {
      const body = await readJsonBody(request);
      const identifier = String(body?.identifier || "").trim();
      const password = String(body?.password || "");
      if (!identifier || !password || identifier.length > 254 || password.length > 128) {
        sendJson(response, 401, { status:"invalid", error:"لم نتمكن من تسجيل الدخول بهذه البيانات." });
        return;
      }
      const account = await accountStore.authenticate(identifier, password);
      if (!account) {
        sendJson(response, 401, { status:"invalid", error:"لم نتمكن من تسجيل الدخول بهذه البيانات." });
        return;
      }
      rateLimiter.reset(limiterKey);
      const session = accountStore.createSession(account.id);
      sendJson(response, 200, { status:"signed-in", account }, {
        "Set-Cookie":sessionCookie(session.token, session.expiresAt, secureCookies || Boolean(request.socket.encrypted)),
      });
      return;
    }

  };
}
