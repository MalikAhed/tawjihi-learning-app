import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { createLiveReload } from "../src/server/live-reload.mjs";

test("live reload ignores workspace noise and coalesces runtime changes", async (t) => {
  let onChange;
  let closed = false;
  const reload = createLiveReload({ root:"/project", watchFiles(_root, _options, callback) {
    onChange = callback;
    return { close() { closed = true; } };
  } });
  t.after(() => reload.close());
  const chunks = [];
  const response = { writeHead() {}, write(chunk) { chunks.push(chunk); }, end() {} };
  const request = Object.assign(new EventEmitter(), { method:"GET" });
  assert.equal(reload.handle(request, response, "/__codex_reload"), true);
  chunks.length = 0;
  for (const file of ["exports/site/src/main.js", "design-system-clone/index.html", "node_modules/marked/index.js", "tmp/view.png", "artifacts/frame.png", "user screenshots /screen.png", "scripts/browser-smoke.mjs", "tests/route.test.mjs", ".git/config", "src/.backup/main.js", "data/accounts.sqlite"]) {
    onChange("change", file);
  }
  await delay(160);
  assert.deepEqual(chunks, [], "reference material and checks must not reload an open page");
  for (const file of ["index.html", "src/main.js", "src\\styles\\base.css", "assets/icons/subject-lock.svg"]) onChange("change", file);
  await delay(160);
  assert.equal(chunks.length, 1);
  assert.match(chunks[0], /event: reload/);
  request.emit("close");
  reload.close();
  assert.equal(closed, true);
});
