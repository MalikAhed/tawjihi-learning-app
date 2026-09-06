import { once } from "node:events";
import { access } from "node:fs/promises";
import { request } from "node:http";
import { createServer } from "node:net";

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
export function rawRequest(port, target, method = "GET") {
  return new Promise((resolve, reject) => {
    const outgoing = request({ host:"127.0.0.1", port, path:target, method }, (response) => {
      response.resume();
      response.once("end", () => resolve(response.statusCode));
    });
    outgoing.once("error", reject);
    outgoing.end();
  });
}
export class CdpPipe {
  constructor(processHandle) {
    this.process = processHandle;
    this.pending = new Map();
    this.nextId = 1;
    this.buffer = Buffer.alloc(0);
    this.listeners = new Set();
    processHandle.stdio[4].on("data", (chunk) => this.handleData(chunk));
  }

  handleData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    let boundary = this.buffer.indexOf(0);
    while (boundary >= 0) {
      const payload = this.buffer.subarray(0, boundary).toString("utf8");
      this.buffer = this.buffer.subarray(boundary + 1);
      if (payload) this.handleMessage(JSON.parse(payload));
      boundary = this.buffer.indexOf(0);
    }
  }

  handleMessage(message) {
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
      else pending.resolve(message.result);
      return;
    }
    this.listeners.forEach((listener) => listener(message));
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.process.stdio[3].write(`${JSON.stringify(payload)}\0`);
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
