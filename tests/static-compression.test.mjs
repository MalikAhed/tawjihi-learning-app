import test from 'node:test';
import assert from 'node:assert/strict';
import { Writable } from 'node:stream';
import { once } from 'node:events';
import { brotliDecompressSync, gunzipSync } from 'node:zlib';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createStaticFileHandler } from '../src/server/static-files.mjs';

async function request(handler, url, { encoding, etag, method='GET' } = {}) {
  const chunks=[];
  const response=new Writable({write(chunk, _encoding, done){chunks.push(Buffer.from(chunk));done();}});
  response.headers=new Map();
  response.statusCode=200;
  response.setHeader=(name,value)=>response.headers.set(name.toLowerCase(),value);
  response.writeHead=(status)=>{response.statusCode=status;return response;};
  const complete=once(response,'finish');
  await handler({url,method,headers:{'accept-encoding':encoding,'if-none-match':etag}},response);
  await complete;
  return {status:response.statusCode,headers:response.headers,body:Buffer.concat(chunks)};
}

test('text responses negotiate compression, validate each representation and preserve media bytes',async t=>{
  const root=await mkdtemp(path.join(tmpdir(),'learn-compression-'));
  t.after(()=>rm(root,{recursive:true,force:true}));
  await mkdir(path.join(root,'assets'));
  const source='const arabic = "مرحبا";\n'.repeat(300);
  const media=Buffer.alloc(4000,255);
  await writeFile(path.join(root,'assets/example.js'),source);
  await writeFile(path.join(root,'assets/example.webp'),media);
  await writeFile(path.join(root,'index.html'),'<body>'+source+'</body>');
  const handler=await createStaticFileHandler({root,htmlInjection:'<script src="reload.js"></script>'});
  const br=await request(handler,'/assets/example.js',{encoding:'gzip, br'});
  assert.equal(br.headers.get('content-encoding'),'br');
  assert.equal(br.headers.get('vary'),'Accept-Encoding');
  assert.equal(brotliDecompressSync(br.body).toString(),source);
  assert.ok(br.body.length<Buffer.byteLength(source)/4);
  const gzip=await request(handler,'/assets/example.js',{encoding:'br;q=0, gzip;q=0.8'});
  assert.equal(gzip.headers.get('content-encoding'),'gzip');
  assert.equal(gunzipSync(gzip.body).toString(),source);
  assert.notEqual(gzip.headers.get('etag'),br.headers.get('etag'));
  for(const encoding of [undefined,'gzip;q=0, br;q=0','identity;q=1, br;q=0.5']){
    const raw=await request(handler,'/assets/example.js',{encoding});
    assert.equal(raw.headers.get('content-encoding'),undefined);
    assert.equal(raw.body.toString(),source);
  }
  const fresh=await request(handler,'/assets/example.js',{encoding:'br',etag:br.headers.get('etag')});
  assert.equal(fresh.status,304);
  assert.equal(fresh.body.length,0);
  const different=await request(handler,'/assets/example.js',{encoding:'gzip',etag:br.headers.get('etag')});
  assert.equal(different.status,200);
  const head=await request(handler,'/assets/example.js',{encoding:'br',method:'HEAD'});
  assert.equal(head.headers.get('content-encoding'),'br');
  assert.equal(head.body.length,0);
  const image=await request(handler,'/assets/example.webp',{encoding:'br,gzip'});
  assert.equal(image.headers.get('content-encoding'),undefined);
  assert.deepEqual(image.body,media);
  const html=await request(handler,'/',{encoding:'br'});
  assert.equal(html.headers.get('cache-control'),'no-store');
  assert.match(brotliDecompressSync(html.body).toString(),/<script src="reload.js"><\/script><\/body>/);
});
