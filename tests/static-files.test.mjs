import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { resolvePublicFilePath } from "../src/server/static-files.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("static file resolver exposes only browser application files", () => {
  assert.equal(resolvePublicFilePath(projectRoot, "/"), path.join(projectRoot, "index.html"));
  assert.equal(resolvePublicFilePath(projectRoot, "/src/main.js"), path.join(projectRoot, "src/main.js"));
  assert.equal(resolvePublicFilePath(projectRoot, "/assets/icons/favicon.svg"), path.join(projectRoot, "assets/icons/favicon.svg"));
  assert.equal(resolvePublicFilePath(projectRoot, "/src/server/account-store.mjs"), null);
  assert.equal(resolvePublicFilePath(projectRoot, "/package.json"), null);
  assert.equal(resolvePublicFilePath(projectRoot, "/assets/../package.json"), null);
});

test("static file resolver rejects malformed and null-byte paths", () => {
  assert.throws(() => resolvePublicFilePath(projectRoot, "/%"), URIError);
  assert.throws(() => resolvePublicFilePath(projectRoot, "/assets/file.js%00.png"), URIError);
});
