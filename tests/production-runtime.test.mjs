import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { createAppServer } from '../src/server/app-server.mjs';
import { createRequestPolicy,readRuntimeConfig } from '../src/server/runtime-config.mjs';
import { createReviewLimiter } from '../src/server/review-limiter.mjs';
import { createHttpReviewProvider } from '../src/server/review-provider.mjs';

const root=process.cwd();

test('an oversized provider response is cancelled while streaming',async()=>{
  let chunks=0;
  let cancelled=false;
  const provider=createHttpReviewProvider({url:'http://provider.invalid/review',fetchImpl:async()=>new Response(new ReadableStream({
    pull(controller){chunks++;controller.enqueue(new Uint8Array(8192).fill(120));if(chunks===100)controller.close();},
    cancel(){cancelled=true;},
  }))});
  await assert.rejects(provider({answer:'test',content:{title:'test',prompt:'test',rubric:[],review:{passScore:8}}}),/too much data/);
  assert.equal(cancelled,true);
  assert.ok(chunks<=4,'Reading must stop at the response bound, including one buffered chunk');
});

test('production configuration requires origin, durable data path and provider; proxies must be explicit',()=>{
  assert.throws(()=>readRuntimeConfig({}, {root,production:true}),/PUBLIC_ORIGIN/);
  assert.throws(()=>readRuntimeConfig({PUBLIC_ORIGIN:'http://public.example'}, {root,production:true}),/HTTPS/);
  assert.throws(()=>readRuntimeConfig({PUBLIC_ORIGIN:'http://127.0.0.1',ACCOUNTS_DATABASE_PATH:':memory:'},{root,production:true}),/durable/);
  const policy=createRequestPolicy({publicOrigin:'https://learn.example',trustedProxies:new Set(['127.0.0.1'])});
  const request={socket:{remoteAddress:'127.0.0.1'},headers:{'x-forwarded-for':'192.0.2.10'}};
  assert.equal(policy.clientAddress(request),'192.0.2.10');
  assert.equal(policy.clientAddress({...request,headers:{'x-forwarded-for':'192.0.2.11'}}),'192.0.2.11');
  assert.throws(()=>policy.clientAddress({...request,socket:{remoteAddress:'192.0.2.9'}}),/Untrusted/);
  assert.throws(()=>policy.clientAddress({...request,headers:{'x-forwarded-for':'192.0.2.10, 192.0.2.11'}}),/Untrusted/);
  assert.equal(policy.rejectOrigin({...request,headers:{origin:'https://evil.example'}}),true);
});

test('review queue has a fixed bound, cancels queued work and recovers after deadline',async()=>{
  const limiter=createReviewLimiter({maxConcurrent:1,maxQueue:1,timeoutMs:50});
  const running=limiter.run(signal=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true}))).catch(error=>error.code);
  const cancelled=new AbortController();
  const queued=limiter.run(()=>assert.fail('Cancelled job must not start'),{signal:cancelled.signal}).catch(error=>error.code);
  await assert.rejects(limiter.run(()=>{}),{code:'EBUSY'});
  assert.deepEqual(limiter.stats(),{active:1,queued:1,capacity:1,maxQueue:1});
  cancelled.abort();
  assert.equal(await queued,'ABORT_ERR');
  await delay(75);
  assert.equal(await running,'ETIMEDOUT');
  assert.equal(await limiter.run(()=>42),42);
  limiter.close();
});

test('production hides development endpoints and authenticates review before calling a real HTTP provider',async t=>{
  let calls=0;
  const provider=createServer(async(request,response)=>{
    calls++;for await(const _ of request) { /* consume the bounded test input */ }
    response.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify({score:9,feedback:'Clear explanation with one useful example.'}));
  });
  await new Promise(resolve=>provider.listen(0,'127.0.0.1',resolve));
  const config=readRuntimeConfig({PORT:'0',PUBLIC_ORIGIN:'http://127.0.0.1',ACCOUNTS_DATABASE_PATH:'/unused/isolated-test.sqlite',REVIEW_PROVIDER_URL:`http://127.0.0.1:${provider.address().port}/review`},{root,production:true});
  config.databasePath=':memory:'; // Explicit injected test store; production environment rejects this.
  const logs=[];
  const app=await createAppServer({root,config,logger:record=>logs.push(record)});
  const port=await app.listen();
  t.after(async()=>{await app.close();await new Promise(resolve=>provider.close(resolve));});
  const base=`http://127.0.0.1:${port}`;
  assert.equal((await fetch(base+'/readyz')).status,200);
  assert.equal((await fetch(base+'/__codex_live_reload.js')).status,404);
  assert.equal((await fetch(base+'/__codex_code_preview?run=1')).status,404);
  assert.equal((await fetch(base+'/api/developer/reset',{method:'POST'})).status,404);
  assert.doesNotMatch(await (await fetch(base)).text(),/__codex_live_reload/);
  assert.equal((await fetch(base+'/api/auth/session',{headers:{'X-Forwarded-For':'192.0.2.1'}})).status,400);
  const {account}=await app.accountStore.createAccount({username:'runtime-user',email:'runtime@example.com',curriculum:'gaza',path:'scientific',password:'Test123'});
  const cookie=`tawjihi_session=${app.accountStore.createSession(account.id).token}`;
  const answer='PRIVATE TEST ANSWER about browser request and response';
  const review=(extra={},body={route:'ship-ready-response',answer})=>fetch(base+'/api/explain-review',{method:'POST',headers:{'Content-Type':'application/json',Origin:config.publicOrigin,...extra},body:JSON.stringify(body)});
  assert.equal((await review()).status,401);
  assert.equal((await review({Cookie:cookie,Origin:'http://evil.example'})).status,403);
  assert.equal((await review({Cookie:cookie},{route:'lesson-authoring-preview',answer,authoredReview:{}})).status,400);
  assert.equal(calls,0);
  const response=await review({Cookie:cookie});
  assert.equal(response.status,200);
  assert.equal((await response.json()).source,'provider');
  assert.equal(calls,1);
  assert.ok(logs.some(log=>log.event==='request'&&log.durationMs>=0));
  assert.ok(!JSON.stringify(logs).includes(answer));
});


test('development composition preserves the isolated preview route before reserved-route denial',async t=>{
  const config=readRuntimeConfig({PORT:'0',LIVE_RELOAD:'0',ACCOUNTS_DATABASE_PATH:':memory:'},{root});
  const app=await createAppServer({root,config,logger:()=>{}});
  const port=await app.listen();
  t.after(()=>app.close());
  const response=await fetch(`http://127.0.0.1:${port}/__codex_code_preview?run=1`);
  assert.equal(response.status,200);
  assert.match(response.headers.get('content-security-policy'),/frame-ancestors 'self'/);
  assert.match(response.headers.get('content-security-policy'),/connect-src 'none'/);
  assert.equal(response.headers.get('x-frame-options'),null);
});
