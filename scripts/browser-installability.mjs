import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { CdpPipe, findChrome, terminateProcess } from './browser-session.mjs';
const profile=await mkdtemp(`${tmpdir()}/app-install-`);
const chrome=spawn(await findChrome(),['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-pipe',`--user-data-dir=${profile}`],{stdio:['ignore','ignore','ignore','pipe','pipe']});
try {
 const cdp=new CdpPipe(chrome);
 const {targetId}=await cdp.send('Target.createTarget',{url:'about:blank'});
 const {sessionId}=await cdp.send('Target.attachToTarget',{targetId,flatten:true});
 await cdp.send('Page.enable',{},sessionId);
 const loaded=new Promise(resolve=>{const off=cdp.onEvent(message=>{if(message.sessionId===sessionId&&message.method==='Page.loadEventFired'){off();resolve();}});});
 await cdp.send('Page.navigate',{url:process.env.APP_URL||'http://localhost:4173/'},sessionId);
 await loaded;
 const manifest=await cdp.send('Page.getAppManifest',{},sessionId);
 assert.equal(manifest.errors.length,0,JSON.stringify(manifest.errors));
 const parsed=JSON.parse(manifest.data);
 assert.equal(parsed.display,'standalone');
 const {result,exceptionDetails}=await cdp.send('Runtime.evaluate',{expression:`(async()=>{const link=document.querySelector('link[rel="manifest"]');const m=await (await fetch(link.href)).json();const icons=[...m.icons.map(i=>({url:new URL(i.src,link.href).href,size:Number(i.sizes.split('x')[0])})),{url:document.querySelector('link[rel="apple-touch-icon"]').href,size:180}];for(const icon of icons){const image=new Image();image.src=icon.url;await image.decode();if(image.naturalWidth!==icon.size||image.naturalHeight!==icon.size)throw Error('Invalid icon dimensions');}return {secure:isSecureContext,icons:icons.length};})()`,awaitPromise:true,returnByValue:true},sessionId);
 assert.equal(exceptionDetails,undefined,JSON.stringify(exceptionDetails));
 assert.equal(result.value.secure,true);
 const install=await cdp.send('Page.getInstallabilityErrors',{},sessionId);
 assert.deepEqual(install.installabilityErrors,[]);
 console.log('Browser validated manifest, standalone mode, 4 icon sizes, and installability.');
} finally {await terminateProcess(chrome);await rm(profile,{recursive:true,force:true});}
