import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAppServer } from "./src/server/app-server.mjs";
import { readRuntimeConfig } from "./src/server/runtime-config.mjs";

const root=path.dirname(fileURLToPath(import.meta.url));
const app=await createAppServer({root,config:readRuntimeConfig(process.env,{root})});
const port=await app.listen();
console.log(`Live preview: http://localhost:${port}/`);
if(process.env.LIVE_RELOAD!=='0')console.log('Watching source files and preserving scroll position on reload.');
const shutdown=()=>void app.close();
process.on('SIGINT',shutdown);
process.on('SIGTERM',shutdown);
