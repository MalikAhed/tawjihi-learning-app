import { once } from "node:events";
import { access } from "node:fs/promises";
import { request } from "node:http";
import { createServer } from "node:net";
import { basename } from "node:path";

// Shared Chrome process and CDP transport; scenarios own their page state and assertions.
export function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
export async function terminateProcess(processHandle) {
  if (!processHandle || processHandle.exitCode !== null || processHandle.signalCode !== null) return;
  const exited = once(processHandle, "exit");
  processHandle.kill("SIGTERM");
  await Promise.race([exited, delay(2_000)]);
  if (processHandle.exitCode === null && processHandle.signalCode === null) {
    const forcedExit = once(processHandle, "exit");
    processHandle.kill("SIGKILL");
    await forcedExit;
  }
}
export async function findChrome() {
  const candidates = [process.env.CHROME_BIN, "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  throw new Error("Chrome or Chromium is required for browser smoke tests. Set CHROME_BIN to its executable.");
}
export async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}
export function rawRequest(port, target, method = "GET", { timeout = 2_000 } = {}) {
  return new Promise((resolve, reject) => {
    const finish = (error, status) => {
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(status);
    };
    const outgoing = request({ host:"127.0.0.1", port, path:target, method }, (response) => {
      response.once("error", (error) => finish(error));
      response.resume();
      response.once("end", () => finish(null, response.statusCode));
    });
    // Bound the whole response, including a server that never ends its body.
    const timer = setTimeout(() => {
      const error = new Error(`Browser readiness: HTTP ${method} exceeded ${timeout}ms`);
      error.code = "ETIMEDOUT";
      outgoing.destroy(error);
    }, timeout);
    outgoing.once("error", (error) => finish(error));
    outgoing.end();
  });
}
export class CdpPipe {
  constructor(processHandle, { timeout = 30_000, scenario = basename(process.argv[1] || "Learn browser") } = {}) {
    this.process = processHandle;
    this.timeout = timeout;
    this.scenario = scenario;
    this.closed = null;
    this.pending = new Map();
    this.nextId = 1;
    this.buffer = Buffer.alloc(0);
    this.listeners = new Set();
    this.receive = (chunk) => this.handleData(chunk);
    processHandle.stdio[4].on("data", this.receive);
    processHandle.once("exit", (code, signal) => this.close(`Chrome exited (${signal ?? code})`));
    processHandle.on("error", (error) => this.close(`Chrome failed (${error.code || "process error"})`));
    for (const pipe of [processHandle.stdio[3], processHandle.stdio[4]]) {
      pipe.on("error", (error) => this.close(`Chrome pipe failed (${error.code || "stream error"})`));
      pipe.once("close", () => this.close("Chrome pipe closed"));
    }
    processHandle.stdio[4].once("end", () => this.close("Chrome pipe ended"));
    if (processHandle.exitCode !== null || processHandle.signalCode !== null) this.close("Chrome already stopped");
  }

  handleData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    let boundary = this.buffer.indexOf(0);
    while (boundary >= 0) {
      const payload = this.buffer.subarray(0, boundary).toString("utf8");
      this.buffer = this.buffer.subarray(boundary + 1);
      if (payload) {
        let message;
        try { message = JSON.parse(payload); }
        catch { this.close("Invalid Chrome protocol response"); return; }
        this.handleMessage(message);
      }
      boundary = this.buffer.indexOf(0);
    }
  }

  handleMessage(message) {
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      if (message.error) pending.reject(this.error(pending.method, message.error.message));
      else pending.resolve(message.result);
      return;
    }
    this.listeners.forEach((listener) => listener(message));
  }

  error(method, reason) {
    return new Error(`${this.scenario}: ${method}: ${reason}`);
  }

  // Idempotent disposal also rejects future sends; no request outlives its browser.
  close(reason = "Chrome transport disposed") {
    if (this.closed) return;
    this.closed = reason;
    this.process.stdio[4].off("data", this.receive);
    for (const pending of this.pending.values()) pending.reject(this.error(pending.method, reason));
    this.listeners.clear();
    this.buffer = Buffer.alloc(0);
  }

  send(method, params = {}, sessionId, timeout = this.timeout) {
    if (this.closed) return Promise.reject(this.error(method, this.closed));
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const settle = (callback, value) => {
        clearTimeout(timer);
        this.pending.delete(id);
        callback(value);
      };
      const timer = setTimeout(() => settle(reject, this.error(method, `No response within ${timeout}ms`)), timeout);
      this.pending.set(id, {
        resolve: (result) => settle(resolve, result),
        reject: (error) => settle(reject, error),
        method,
      });
      try {
        this.process.stdio[3].write(`${JSON.stringify(payload)}\0`, (error) => {
          if (error) this.close(`Chrome pipe write failed (${error.code || "stream error"})`);
        });
      } catch (error) {
        settle(reject, this.error(method, `Could not send command (${error.code || error.name})`));
      }
    });
  }

  onEvent(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
export async function waitForServer(port) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      if (await rawRequest(port, "/") === 200) return;
    } catch (error) {
      if (error?.code !== "ECONNREFUSED") throw error;
    }
    await delay(50);
  }
  throw new Error("Development server did not become ready.");
}
