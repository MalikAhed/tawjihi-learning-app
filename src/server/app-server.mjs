import { createServer } from "node:http";
import { createAccountStore } from "./account-store.mjs";
import { createAuthApi, getSessionToken, sessionCookie } from "./auth-api.mjs";
import { createProgressApi } from "./progress-api.mjs";
import { createLiveReload, LIVE_RELOAD_MARKUP } from "./live-reload.mjs";
import { applySecurityHeaders } from "./security-headers.mjs";
import { createStaticFileHandler } from "./static-files.mjs";
import { readJsonBody, sendJson } from "./http.mjs";
import { createRequestPolicy } from "./runtime-config.mjs";

export async function createAppServer({root,config,logger=record=>console.log(JSON.stringify(record))}) {
  const accountStore=createAccountStore({databasePath:config.databasePath});
  const policy=createRequestPolicy(config);
  const handleAuth=createAuthApi({accountStore,readJsonBody,originPolicy:policy.rejectOrigin,clientAddress:policy.clientAddress,secureCookies:config.secureCookies});
  const handleProgress=createProgressApi({accountStore,readJsonBody,originPolicy:policy.rejectOrigin});
  const staticFiles=await createStaticFileHandler({root,htmlInjection:config.liveReload?LIVE_RELOAD_MARKUP:''});
  const liveReload=config.liveReload?createLiveReload({root}):null;
  let closing=false;
  const server=createServer(async(request,response)=>{
    const start=performance.now();
    const pathname=request.url?.split('?',1)[0]||'/';
    applySecurityHeaders(response);
    if(config.production) response.on('finish',()=>logger({event:'request',method:request.method,route:pathname.startsWith('/api/')?pathname:'static',status:response.statusCode,durationMs:Math.round(performance.now()-start)}));
    try {
      try { new URL(request.url || "/", "http://localhost"); }
      catch { throw Object.assign(new Error("Invalid request URL."), {status:400}); }
      policy.clientAddress(request);
      if(pathname==='/healthz'||pathname==='/readyz') {sendJson(response,closing?503:200,{status:closing?'closing':'ready'});return;}
      if(closing){sendJson(response,503,{error:'Server is shutting down.'});return;}
      if(pathname==='/__codex_dev_ready' && config.devAutoLogin) {response.writeHead(204).end();return;}
      if(config.devAutoLogin && pathname==='/' && !getSessionToken(request)) {
        const account = await accountStore.ensureDeveloperAccount();
        const session = accountStore.createSession(account.id);
        response.writeHead(302, {
          Location:'/',
          'Set-Cookie':sessionCookie(session.token, session.expiresAt, false),
        }).end();
        return;
      }
      if(pathname.startsWith('/api/auth/')) {await handleAuth(request,response,pathname);return;}
      if(pathname==='/api/progress') {await handleProgress(request,response);return;}
      if(pathname.startsWith('/api/')) {sendJson(response,404,{error:'Not found'});return;}
      if(request.method!=='GET'&&request.method!=='HEAD'){response.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
      if(liveReload?.handle(request,response,pathname))return;
      if(pathname.startsWith('/__codex_')){response.writeHead(404).end();return;}
      await staticFiles(request,response);
    }catch(error){
      if(!response.headersSent&&!response.destroyed)sendJson(response,error.status|| (error.code==='ETOOBIG'?413:error instanceof SyntaxError?400:500),{error:'The request could not be completed.'});
      logger({event:'request_error',route:pathname.startsWith('/api/')?pathname:'static',code:error.code||'UNKNOWN'});
    }
  });
  server.requestTimeout=15000;
  server.headersTimeout=10000;
  server.keepAliveTimeout=5000;
  return {
    server,accountStore,
    listen:()=>new Promise((resolve,reject)=>{
      const onError=error=>reject(error);
      server.once('error',onError);
      // Let Node accept both localhost families (and fall back on IPv4-only hosts).
      // Binding only 0.0.0.0 refuses clients that resolve localhost to ::1.
      server.listen(config.port,()=>{
        server.removeListener('error',onError);
        resolve(server.address().port);
      });
    }),
    async close() {
      if(closing)return;
      closing=true;liveReload?.close();
      await new Promise(resolve=>{server.close(resolve);server.closeIdleConnections();});
      accountStore.close();
    },
  };
}
