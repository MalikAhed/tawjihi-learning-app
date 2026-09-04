import assert from "node:assert/strict";
import test from "node:test";
import { handleCodePreviewFrame } from "../src/server/code-preview-frame.mjs";

function createResponse() {
  const headers = new Map([["X-Frame-Options", "DENY"]]);
  return {
    body:null,
    headers,
    removeHeader(name) { headers.delete(name); },
    setHeader(name, value) { headers.set(name, value); },
    end(body) { this.body = body; },
  };
}

test("the code preview frame binds its runner nonce to its isolated CSP", () => {
  const response = createResponse();
  assert.equal(handleCodePreviewFrame({ method:"GET" }, response, "/__codex_code_preview"), true);

  const nonce = response.body.match(/<script nonce="([A-Za-z0-9_-]+)">/)?.[1];
  assert.ok(nonce);
  assert.match(response.headers.get("Content-Security-Policy"), new RegExp(`script-src 'nonce-${nonce}' 'unsafe-eval'`));
  assert.match(response.headers.get("Content-Security-Policy"), /frame-ancestors 'self'/);
  assert.equal(response.headers.has("X-Frame-Options"), false);
  assert.match(response.body, /full-stack-quest-code-lab/);
  assert.doesNotMatch(response.body, /<script(?! nonce=)/);
});

test("the code preview handler ignores unrelated routes and honors HEAD", () => {
  const unrelated = createResponse();
  assert.equal(handleCodePreviewFrame({ method:"GET" }, unrelated, "/another-route"), false);
  assert.equal(unrelated.body, null);

  const head = createResponse();
  assert.equal(handleCodePreviewFrame({ method:"HEAD" }, head, "/__codex_code_preview"), true);
  assert.equal(head.body, undefined);
});
