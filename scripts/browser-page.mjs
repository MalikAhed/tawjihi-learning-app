import { saveBrowserFailure } from "./browser-diagnostics.mjs";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CdpPipe,
  delay,
  findChrome,
  getAvailablePort,
  terminateProcess,
  waitForServer,
} from "./browser-session.mjs";

// Isolated transport for focused browser checks; never touches local accounts.
export async function withBrowserPage(run, { baseUrl = null } = {}) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const port = await getAvailablePort();
  const base = baseUrl || `http://127.0.0.1:${port}/`;
  let server, chrome, profile;
  let cdp;
  let pageSend;
  const failures = [];
  const requests = new Map();
  try {
    if (!baseUrl) {
    server = spawn(process.execPath, ["dev-server.mjs"], {
      cwd: root,
      env: {
        ...process.env,
        PORT: String(port),
        LIVE_RELOAD:"0",ACCOUNTS_DATABASE_PATH: ":memory:",
      },
      stdio: "ignore",
    });
    await waitForServer(port);
    }
    profile = await mkdtemp(path.join(tmpdir(), "learn-focused-browser-"));
    chrome = spawn(
      await findChrome(),
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-background-networking",
        "--remote-debugging-pipe",
        `--user-data-dir=${profile}`,
        "about:blank",
      ],
      { stdio: ["ignore", "ignore", "ignore", "pipe", "pipe"] },
    );
    cdp = new CdpPipe(chrome);
    const { targetId } = await cdp.send("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const send = (method, params = {}) => cdp.send(method, params, sessionId);
    pageSend = send;
    cdp.onEvent(({method,params,sessionId:active}) => {
      if(active!==sessionId) return;
      if(method==='Runtime.exceptionThrown') failures.push(params.exceptionDetails.exception?.description || params.exceptionDetails.text || 'Uncaught browser error');
      if(method==='Network.requestWillBeSent') requests.set(params.requestId,new URL(params.request.url).pathname);
      if(method==='Network.responseReceived' && params.response.status>=400) failures.push(`${params.response.status}: ${new URL(params.response.url).pathname}`);
      if(method==='Network.loadingFailed' && !params.canceled) failures.push(`${params.errorText || 'Request failed'}: ${requests.get(params.requestId) || 'unknown resource'}`);
      if(['Network.loadingFinished','Network.loadingFailed'].includes(method)) requests.delete(params.requestId);
    });
    const evaluate = async (expression) => {
      const result = await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      if (result.exceptionDetails)
        throw new Error(
          result.exceptionDetails.exception?.description ||
            result.exceptionDetails.text,
        );
      return result.result.value;
    };
    const waitFor = async (expression, { timeoutMs = 15000 } = {}) => {
      const until = Date.now() + timeoutMs;
      while (Date.now() < until) {
        if (await evaluate(`Boolean(${expression})`)) return;
        await delay(30);
      }
      throw new Error("Browser readiness timed out: " + expression);
    };
    await Promise.all([
      send("Page.enable"),
      send("Runtime.enable"),
      send("Network.enable"),
    ]);
    await send("Network.setBlockedURLs", {
      urls: ["*fonts.googleapis.com*", "*fonts.gstatic.com*"],
    });
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await run({
      base,
      cdp,
      sessionId,
      send,
      evaluate,
      waitFor,
      onEvent: (callback) =>
        cdp.onEvent((message) => {
          if (message.sessionId === sessionId) callback(message);
        }),
    });
  } catch (error) {
    if (pageSend) await saveBrowserFailure({send:pageSend,name:process.argv[1]?.split('/').at(-1)||'focused',error,failures});
    throw error;
  } finally {
    cdp?.close();
    await terminateProcess(chrome);
    await terminateProcess(server);
    if (profile) await rm(profile, { recursive: true, force: true, maxRetries:5, retryDelay:100 });
  }
}
