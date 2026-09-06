import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { CdpPipe, findChrome, terminateProcess } from './browser-session.mjs';
const root = new URL('../', import.meta.url);
const svg = (await readFile(new URL('assets/icons/favicon.svg',root),'utf8')).replace('viewBox="0 0 64 64"','width="64" height="64" viewBox="0 0 64 64"');
const profile=await mkdtemp(`${tmpdir()}/app-icons-`);
const chrome=spawn(await findChrome(),['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-pipe',`--user-data-dir=${profile}`],{stdio:['ignore','ignore','ignore','pipe','pipe']});
try {
 const cdp=new CdpPipe(chrome);
 const {targetId}=await cdp.send('Target.createTarget',{url:'about:blank'});
 const {sessionId}=await cdp.send('Target.attachToTarget',{targetId,flatten:true});
 for (const [name,size,scale] of [['icon-180.png',180,1],['icon-192.png',192,1],['icon-512.png',512,1],['icon-maskable-512.png',512,.8]]) {
  const {result,exceptionDetails}=await cdp.send('Runtime.evaluate',{expression:`(async()=>{const img=new Image();img.src=${JSON.stringify('data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'))};await img.decode();const c=document.createElement('canvas');c.width=c.height=${size};const ctx=c.getContext('2d');ctx.fillStyle='#2563eb';ctx.fillRect(0,0,${size},${size});const side=${size*scale};ctx.drawImage(img,(${size}-side)/2,(${size}-side)/2,side,side);return c.toDataURL('image/png').split(',')[1];})()`,awaitPromise:true,returnByValue:true},sessionId);
  if(exceptionDetails)throw new Error(JSON.stringify(exceptionDetails));
  await writeFile(new URL(`assets/app/${name}`,root),Buffer.from(result.value,'base64'));
 }
 console.log('Generated four app icons from the existing favicon.');
} finally {await terminateProcess(chrome);await rm(profile,{recursive:true,force:true});}
