import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { access } from "node:fs/promises";
import { createServer } from "node:http";
import test from "node:test";
import { rawRequest } from "../scripts/browser-session.mjs";

for (const fault of ["silence", "exit", "pipe", "dispose"]) {
  test(`browser ${fault} fails with command context and cleans up`, { timeout: 5_000 }, async () => {
    // A separate runner proves failures produce a nonzero exit, without leaving
    // timers, a profile or a test-owned browser process alive.
    const source = `
      import { spawn } from 'node:child_process';
      import { mkdtemp, rm } from 'node:fs/promises';
      import { tmpdir } from 'node:os';
      import path from 'node:path';
      import { CdpPipe, terminateProcess } from ${JSON.stringify(new URL("../scripts/browser-session.mjs", import.meta.url).href)};
      const profile = await mkdtemp(path.join(tmpdir(), 'learn-transport-fault-'));
      const child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], {
        stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'],
      });
      const cdp = new CdpPipe(child, { timeout: 100, scenario: 'fault-${fault}' });
      console.log(JSON.stringify({ profile, pid: child.pid }));
      try {
        const response = cdp.send('Runtime.evaluate', { expression: 'private-fixture-value' });
        if (${JSON.stringify(fault)} === 'exit') child.kill('SIGKILL');
        if (${JSON.stringify(fault)} === 'pipe') child.stdio[4].destroy();
        if (${JSON.stringify(fault)} === 'dispose') cdp.close();
        await response;
      } finally {
        cdp.close();
        await terminateProcess(child);
        await rm(profile, { recursive: true, force: true });
        if (cdp.pending.size) throw Error('Requests survived cleanup');
      }
    `;
    const runner = spawn(process.execPath, ["--input-type=module", "-e", source], { timeout: 3_000 });
    let stdout = "", stderr = "";
    runner.stdout.on("data", (chunk) => { stdout += chunk; });
    runner.stderr.on("data", (chunk) => { stderr += chunk; });
    const [code, signal] = await once(runner, "close");
    assert.equal(signal, null, "runner should fail itself before the outer timeout");
    assert.notEqual(code, 0);
    assert.match(stderr, new RegExp(`fault-${fault}: Runtime.evaluate:`));
    assert.doesNotMatch(stderr.split("Error:").at(-1), /private-fixture-value/);
    const { profile, pid } = JSON.parse(stdout.trim());
    await assert.rejects(access(profile), { code: "ENOENT" });
    assert.throws(() => process.kill(pid, 0), { code: "ESRCH" });
  });
}

for (const headersSent of [false, true]) {
  test(`HTTP readiness bounds a stalled ${headersSent ? "body" : "response"}`, async () => {
    const server = createServer((_request, response) => {
      if (headersSent) response.write("unfinished");
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      await assert.rejects(rawRequest(server.address().port, "/", "GET", { timeout: 80 }), { code: "ETIMEDOUT" });
    } finally {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    }
  });
}
