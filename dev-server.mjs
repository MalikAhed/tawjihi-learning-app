import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createAppServer } from "./src/server/app-server.mjs";
import { readRuntimeConfig } from "./src/server/runtime-config.mjs";

const root=path.dirname(fileURLToPath(import.meta.url));
// Browser reloads alone leave Node's imported lesson catalog cached. Native
// watch mode restarts the API too, keeping validation in sync with the page.
if (process.env.LIVE_RELOAD !== "0" && process.env.LEARN_PREVIEW_WATCH_CHILD !== "1") {
  const child = spawn(process.execPath, ["--watch", "--watch-preserve-output", fileURLToPath(import.meta.url)], {
    cwd:root, stdio:"inherit", env:{...process.env, LEARN_PREVIEW_WATCH_CHILD:"1"},
  });
  process.on("SIGINT", () => child.kill("SIGINT"));
  process.on("SIGTERM", () => child.kill("SIGTERM"));
  child.on("error", error => { console.error(error); process.exitCode = 1; });
  child.on("exit", code => { process.exitCode = code ?? 0; });
} else {
  const app=await createAppServer({root,config:readRuntimeConfig(process.env,{root})});
  const port=await app.listen();
  console.log(`Live preview: http://localhost:${port}/`);
  if(process.env.LIVE_RELOAD!=='0')console.log('Watching source files and preserving scroll position on reload.');
  const shutdown=()=>void app.close();
  process.on('SIGINT',shutdown);
  process.on('SIGTERM',shutdown);
}
