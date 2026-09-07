import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAppServer } from "./src/server/app-server.mjs";
import { readRuntimeConfig } from "./src/server/runtime-config.mjs";

const root=path.dirname(fileURLToPath(import.meta.url));
const config=readRuntimeConfig(process.env,{root,production:true});
const app=await createAppServer({root,config});
const port=await app.listen();
console.log(JSON.stringify({event:'listening',mode:'production',port}));
process.on('SIGINT',()=>void app.close());
process.on('SIGTERM',()=>void app.close());
