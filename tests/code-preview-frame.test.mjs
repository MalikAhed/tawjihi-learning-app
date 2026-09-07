import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createAppServer } from "../src/server/app-server.mjs";
import { handleCodePreviewFrame } from "../src/server/code-preview-frame.mjs";
import { readRuntimeConfig } from "../src/server/runtime-config.mjs";

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

test("the development server routes isolated previews before rejecting reserved paths", async t => {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const config = readRuntimeConfig({ PORT:"0", LIVE_RELOAD:"0", ACCOUNTS_DATABASE_PATH:":memory:" }, { root });
  const app = await createAppServer({ root, config, logger:() => {} });
  t.after(() => app.close());
  const base = `http://127.0.0.1:${await app.listen()}`;

  const preview = await fetch(`${base}/__codex_code_preview?run=1`);
  assert.equal(preview.status, 200);
  assert.equal(preview.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(preview.headers.get("X-Frame-Options"), null);
  assert.match(preview.headers.get("Content-Security-Policy"), /frame-ancestors 'self'/);
  assert.match(preview.headers.get("Content-Security-Policy"), /connect-src 'none'/);
  assert.match(await preview.text(), /<script nonce="[A-Za-z0-9_-]+">/);

  const head = await fetch(`${base}/__codex_code_preview?run=2`, { method:"HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  assert.equal((await fetch(`${base}/__codex_code_preview`, { method:"POST" })).status, 405);
  assert.equal((await fetch(`${base}/__codex_unknown`)).status, 404);
  const page = await fetch(base);
  assert.match(page.headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.equal(page.headers.get("X-Frame-Options"), "DENY");
  await page.arrayBuffer();
});
