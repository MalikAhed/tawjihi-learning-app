import assert from "node:assert/strict";
import test from "node:test";
import { applyCodePreviewSecurityHeaders, applySecurityHeaders } from "../src/server/security-headers.mjs";

test("security headers block framing and inline scripts", () => {
  const headers = new Map();
  applySecurityHeaders({ setHeader:(name, value) => headers.set(name, value) });

  assert.equal(headers.get("X-Frame-Options"), "DENY");
  assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
  assert.match(headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.match(headers.get("Content-Security-Policy"), /script-src 'self' https:\/\/cdn\.jsdelivr\.net/);
  assert.doesNotMatch(headers.get("Content-Security-Policy"), /script-src[^;]*'unsafe-inline'/);
  assert.doesNotMatch(headers.get("Content-Security-Policy"), /unsafe-eval/);
});

test("the sandboxed code runner owns the only dynamic execution permission", () => {
  const headers = new Map([["X-Frame-Options", "DENY"]]);
  applyCodePreviewSecurityHeaders({
    removeHeader:(name) => headers.delete(name),
    setHeader:(name, value) => headers.set(name, value),
  }, "fixed_test_nonce_123");

  assert.equal(headers.has("X-Frame-Options"), false);
  assert.match(headers.get("Content-Security-Policy"), /frame-ancestors 'self'/);
  assert.match(headers.get("Content-Security-Policy"), /script-src 'nonce-fixed_test_nonce_123' 'unsafe-eval'/);
  assert.match(headers.get("Content-Security-Policy"), /connect-src 'none'/);
  assert.throws(() => applyCodePreviewSecurityHeaders({ removeHeader() {}, setHeader() {} }, "bad"), /valid code preview nonce/);
});
