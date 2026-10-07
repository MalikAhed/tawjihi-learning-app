import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer, request as httpRequest } from 'node:http';
import { createAppServer } from '../src/server/app-server.mjs';
import { createRequestPolicy,readRuntimeConfig } from '../src/server/runtime-config.mjs';

const root=process.cwd();

test('localhost serves startup files over both IPv4 and IPv6',async t=>{
  const config=readRuntimeConfig({PORT:'0',LIVE_RELOAD:'0',ACCOUNTS_DATABASE_PATH:':memory:'},{root});
  const app=await createAppServer({root,config,logger:()=>{}});
  t.after(()=>app.close());
  const port=await app.listen();
  for(const host of ['127.0.0.1','[::1]']) {
    for(const pathname of ['/','/src/bootstrap.js','/readyz']) {
      const response=await fetch(`http://${host}:${port}${pathname}`);
      assert.equal(response.status,200,`${host}${pathname}`);
      await response.arrayBuffer();
    }
  }
});

test('production requires origin, durable data and explicit trusted proxies',()=>{
  assert.throws(()=>readRuntimeConfig({}, {root,production:true}),/PUBLIC_ORIGIN/);
  assert.throws(()=>readRuntimeConfig({PUBLIC_ORIGIN:'http://public.example'}, {root,production:true}),/HTTPS/);
  assert.throws(()=>readRuntimeConfig({PUBLIC_ORIGIN:'http://127.0.0.1',ACCOUNTS_DATABASE_PATH:':memory:'},{root,production:true}),/durable/);
  const config=readRuntimeConfig({PUBLIC_ORIGIN:'https://learn.example',ACCOUNTS_DATABASE_PATH:'/durable/accounts.sqlite'},{root,production:true});
  const policy=createRequestPolicy({publicOrigin:'https://learn.example',trustedProxies:new Set(['127.0.0.1'])});
  const request={socket:{remoteAddress:'127.0.0.1'},headers:{'x-forwarded-for':'192.0.2.10'}};
  assert.equal(policy.clientAddress(request),'192.0.2.10');
  assert.equal(policy.clientAddress({...request,headers:{'x-forwarded-for':'192.0.2.11'}}),'192.0.2.11');
  assert.throws(()=>policy.clientAddress({...request,socket:{remoteAddress:'192.0.2.9'}}),/Untrusted/);
  assert.throws(()=>policy.clientAddress({...request,headers:{'x-forwarded-for':'192.0.2.10, 192.0.2.11'}}),/Untrusted/);
  assert.equal(policy.rejectOrigin({...request,headers:{origin:'https://evil.example'}}),true);
});

test('private preview permits same-origin localhost saves only in development',()=>{
  const config={publicOrigin:'https://preview.example',trustedProxies:new Set()};
  const development=createRequestPolicy({...config,production:false});
  const production=createRequestPolicy({...config,production:true});
  const request={headers:{host:'localhost:4173',origin:'http://localhost:4173'}};
  assert.equal(development.rejectOrigin(request),false);
  assert.equal(production.rejectOrigin(request),true);
  for(const origin of ['http://localhost:4174','http://127.0.0.1:4173','https://evil.example']) {
    assert.equal(development.rejectOrigin({headers:{...request.headers,origin}}),true);
  }
  assert.equal(development.rejectOrigin({headers:{...request.headers,'sec-fetch-site':'cross-site'}}),true);
  assert.equal(development.rejectOrigin({headers:{host:'preview.example',origin:config.publicOrigin}}),false);
});

test('malformed request URLs return 400 and leave the server available',async t=>{
  const config=readRuntimeConfig({PORT:'0',LIVE_RELOAD:'0',ACCOUNTS_DATABASE_PATH:':memory:'},{root});
  const app=await createAppServer({root,config,logger:()=>{}});
  t.after(()=>app.close());
  const port=await app.listen();
  const status=await new Promise((resolve,reject)=>{
    const request=httpRequest({host:'127.0.0.1',port,path:'http://[invalid/'},response=>{
      response.resume();
      response.once('end',()=>resolve(response.statusCode));
    });
    request.once('error',reject);
    request.end();
  });
  assert.equal(status,400);
  assert.equal((await fetch(`http://127.0.0.1:${port}/readyz`)).status,200);
});

test('a port conflict rejects listen instead of emitting an unhandled error',async t=>{
  const occupied=createServer();
  await new Promise(resolve=>occupied.listen(0,'0.0.0.0',resolve));
  t.after(()=>new Promise(resolve=>occupied.close(resolve)));
  const config=readRuntimeConfig({PORT:String(occupied.address().port),LIVE_RELOAD:'0',ACCOUNTS_DATABASE_PATH:':memory:'},{root});
  const app=await createAppServer({root,config,logger:()=>{}});
  t.after(()=>app.close());
  await assert.rejects(app.listen(),{code:'EADDRINUSE'});
});

test('production runs core learning and rejects retired experimental endpoints',async t=>{
  const config=readRuntimeConfig({PORT:'0',PUBLIC_ORIGIN:'http://127.0.0.1',ACCOUNTS_DATABASE_PATH:'/unused/isolated-test.sqlite'},{root,production:true});
  config.databasePath=':memory:';
  const logs=[];
  const app=await createAppServer({root,config,logger:record=>logs.push(record)});
  t.after(()=>app.close());
  const port=await app.listen();
  const base=`http://127.0.0.1:${port}`;
  assert.equal((await fetch(base+'/readyz')).status,200);
  assert.doesNotMatch(await (await fetch(base)).text(),/__codex_live_reload/);
  const {account}=await app.accountStore.createAccount({username:'runtime-user',email:'runtime@example.com',curriculum:'gaza',path:'scientific',password:'Test123'});
  const headers={'Content-Type':'application/json',Origin:config.publicOrigin,Cookie:`tawjihi_session=${app.accountStore.createSession(account.id).token}`};
  assert.equal((await fetch(base+'/api/progress',{headers:{...headers,'X-Progress-Owner':`account:${account.id}`}})).status,200);
  assert.equal((await fetch(base+'/api/auth/session',{headers:{'X-Forwarded-For':'192.0.2.1'}})).status,400);
  for(const route of ['/api/explain-review','/api/developer/reset','/__codex_code_preview?run=1']) {
    assert.equal((await fetch(base+route,{method:route.startsWith('/api/')?'POST':'GET',headers})).status,404);
  }
  assert.ok(logs.some(log=>log.event==='request'&&log.durationMs>=0));
});
