import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { createLiveReload } from "../src/server/live-reload.mjs";

test("live reload ignores workspace noise and coalesces runtime changes", async (t) => {
  const callbacks = new Map();
  const closed = new Set();
  const reload = createLiveReload({ root:"/project", watchFiles(folder, _options, callback) {
    callbacks.set(folder, callback);
    return { close() { closed.add(folder); } };
  } });
  t.after(() => reload.close());
  const chunks = [];
  const response = { writeHead() {}, write(chunk) { chunks.push(chunk); }, end() {} };
  const request = Object.assign(new EventEmitter(), { method:"GET" });
  assert.equal(reload.handle(request, response, "/__codex_reload"), true);
  chunks.length = 0;
  for (const file of ["exports/site/src/main.js", "design-system-clone/index.html", "node_modules/marked/index.js", "tmp/view.png", "artifacts/frame.png", "user screenshots /screen.png", "tests/browser/browser-smoke.mjs", "tests/route.test.mjs", ".git/config", "src/.backup/main.js", "data/accounts.sqlite"]) {
    callbacks.get("/project")("change", file);
  }
  await delay(160);
  assert.deepEqual(chunks, [], "reference material and checks must not reload an open page");
  callbacks.get("/project")("change", "index.html");
  callbacks.get("/project/src")("change", "main.js");
  callbacks.get("/project/src")("change", "styles/base.css");
  callbacks.get("/project/assets")("change", "icons/subject-lock.svg");
  await delay(160);
  assert.equal(chunks.length, 1);
  assert.match(chunks[0], /event: reload/);
  request.emit("close");
  reload.close();
  assert.deepEqual([...closed].sort(), [...callbacks.keys()].sort());
});
