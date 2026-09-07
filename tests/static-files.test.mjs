import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { resolvePublicFilePath } from "../src/server/static-files.mjs";
import { createStaticFileHandler } from "../src/server/static-files.mjs";
import { createServer } from "node:http";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

test("static file resolver exposes only browser application files", () => {
  assert.equal(
    resolvePublicFilePath(projectRoot, "/"),
    path.join(projectRoot, "index.html"),
  );
  assert.equal(
    resolvePublicFilePath(projectRoot, "/src/main.js"),
    path.join(projectRoot, "src/main.js"),
  );
  assert.equal(
    resolvePublicFilePath(projectRoot, "/assets/icons/favicon.svg"),
    path.join(projectRoot, "assets/icons/favicon.svg"),
  );
  assert.equal(
    resolvePublicFilePath(projectRoot, "/src/server/account-store.mjs"),
    null,
  );
  assert.equal(resolvePublicFilePath(projectRoot, "/package.json"), null);
  assert.equal(
    resolvePublicFilePath(projectRoot, "/assets/../package.json"),
    null,
  );
});

test("static file resolver rejects malformed and null-byte paths", () => {
  assert.throws(() => resolvePublicFilePath(projectRoot, "/%"), URIError);
  assert.throws(
    () => resolvePublicFilePath(projectRoot, "/assets/file.js%00.png"),
    URIError,
  );
});

test("public assets revalidate without resending bytes and edits invalidate the cache", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "learn-static-cache-"));
  let server;
  try {
    await mkdir(path.join(root, "assets"));
    await writeFile(path.join(root, "assets/example.svg"), "<svg/>");
    await writeFile(path.join(root, "index.html"), "<body></body>");
    server = createServer(await createStaticFileHandler({ root }));
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const initial = await fetch(base + "/assets/example.svg");
    const etag = initial.headers.get("etag");
    assert.equal(initial.headers.get("cache-control"), "no-cache");
    assert.equal(await initial.text(), "<svg/>");
    const cached = await fetch(base + "/assets/example.svg", {
      headers: { "if-none-match": etag },
    });
    assert.equal(cached.status, 304);
    assert.equal(await cached.text(), "");
    await writeFile(path.join(root, "assets/example.svg"), '<svg width="20"/>');
    const changed = await fetch(base + "/assets/example.svg", {
      headers: { "if-none-match": etag },
    });
    assert.equal(changed.status, 200);
    assert.notEqual(changed.headers.get("etag"), etag);
    assert.equal((await fetch(base)).headers.get("cache-control"), "no-store");
    assert.equal((await fetch(base + "/assets/")).status, 404);
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
