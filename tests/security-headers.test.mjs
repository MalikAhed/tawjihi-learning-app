import assert from "node:assert/strict";
import test from "node:test";
import { applySecurityHeaders } from "../src/server/security-headers.mjs";

test("security headers block framing and inline scripts", () => {
  const headers = new Map();
  applySecurityHeaders({ setHeader:(name, value) => headers.set(name, value) });

  assert.equal(headers.get("X-Frame-Options"), "DENY");
  assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
  assert.match(headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.match(
    headers.get("Content-Security-Policy"),
    /script-src 'self' https:\/\/www\.youtube\.com/,
  );
  assert.doesNotMatch(headers.get("Content-Security-Policy"), /script-src[^;]*'unsafe-inline'/);
  assert.doesNotMatch(headers.get("Content-Security-Policy"), /'unsafe-eval'/);
});
