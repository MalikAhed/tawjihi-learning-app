import { createServer } from "node:http";
import { createAccountStore } from "./account-store.mjs";
import { createAuthApi } from "./auth-api.mjs";
import { createProgressApi } from "./progress-api.mjs";
import { createExplanationReviewApi } from "./explanation-review-api.mjs";
import { createExplanationReviewService } from "./explanation-review.mjs";
import { createHttpReviewProvider } from "./review-provider.mjs";
import { handleDeveloperReset } from "./developer-reset.mjs";
import { handleCodePreviewFrame } from "./code-preview-frame.mjs";
import { createLiveReload, LIVE_RELOAD_MARKUP } from "./live-reload.mjs";
import { applySecurityHeaders } from "./security-headers.mjs";
import { createStaticFileHandler } from "./static-files.mjs";
import { readJsonBody, sendJson } from "./http.mjs";
import { createRequestPolicy } from "./runtime-config.mjs";

export async function createAppServer({root,config,reviewProvider,logger=record=>console.log(JSON.stringify(record))}) {
  const accountStore=createAccountStore({databasePath:config.databasePath});
  const policy=createRequestPolicy(config);
  const reviewExplanation=createExplanationReviewService({projectRoot:root,hosted:config.production,
    ...(reviewProvider?{runCli:reviewProvider}:config.production?{runCli:createHttpReviewProvider({url:config.reviewUrl,token:config.reviewToken})}:{})});
  const handleAuth=createAuthApi({accountStore,readJsonBody,originPolicy:policy.rejectOrigin,clientAddress:policy.clientAddress,secureCookies:config.secureCookies});
  const handleProgress=createProgressApi({accountStore,readJsonBody,originPolicy:policy.rejectOrigin});
  const handleReview=createExplanationReviewApi({accountStore,reviewExplanation,readJsonBody,production:config.production,originPolicy:policy.rejectOrigin,clientAddress:policy.clientAddress});
  const staticFiles=await createStaticFileHandler({root,htmlInjection:!config.production?LIVE_RELOAD_MARKUP:''});
  const liveReload=config.liveReload?createLiveReload({root}):null;
  let closing=false;
  const server=createServer(async(request,response)=>{
    const start=performance.now();
    const pathname=request.url?.split('?',1)[0]||'/';
    applySecurityHeaders(response);
    if(config.production) response.on('finish',()=>logger({event:'request',method:request.method,route:pathname.startsWith('/api/')?pathname:'static',status:response.statusCode,durationMs:Math.round(performance.now()-start)}));
    try {
      policy.clientAddress(request);
      if(pathname==='/healthz'||pathname==='/readyz') {sendJson(response,closing?503:200,{status:closing?'closing':'ready'});return;}
      if(closing){sendJson(response,503,{error:'Server is shutting down.'});return;}
      if(pathname==='/api/developer/reset') {
        if(config.production){sendJson(response,404,{error:'Not found'});return;}
        handleDeveloperReset(request,response,accountStore);return;
      }
      if(pathname.startsWith('/api/auth/')) {await handleAuth(request,response,pathname);return;}
      if(pathname==='/api/progress') {await handleProgress(request,response);return;}
      if(pathname==='/api/explain-review') {await handleReview(request,response);return;}
      if(request.method!=='GET'&&request.method!=='HEAD'){response.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
      if(liveReload?.handle(request,response,pathname))return;
      if(!config.production&&!config.liveReload&&pathname==='/__codex_live_reload.js') {
        response.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-store'}).end('window.__FULL_STACK_QUEST_DEV__=true;');return;
      }
      if(!config.production&&handleCodePreviewFrame(request,response,pathname))return;
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
    server,accountStore,reviewExplanation,
    listen:()=>new Promise(resolve=>server.listen(config.port,'0.0.0.0',()=>resolve(server.address().port))),
    async close() {
      if(closing)return;
      closing=true;liveReload?.close();reviewExplanation.close();
      await new Promise(resolve=>{server.close(resolve);server.closeIdleConnections();});
      accountStore.close();
    },
  };
}
