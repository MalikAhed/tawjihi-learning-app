import test from 'node:test';
import assert from 'node:assert/strict';
import { access, cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { packageApp } from '../scripts/package-app.mjs';
import { PUBLIC_DEPENDENCIES } from '../src/server/static-files.mjs';

test('static artifact is self-contained, fixture-only and excludes private/source tooling', async () => {
  const output = await packageApp();
  const html = await readFile(path.join(output, 'index.html'), 'utf8');
  assert.match(html, /name="learn-account-mode" content="fixture"/);
  for (const dependency of PUBLIC_DEPENDENCIES) await access(path.join(output, dependency.slice(1)));
  for (const excluded of ['src/server', 'tests', 'scripts', 'data', 'docs', 'node_modules/typescript', 'src/data/lessons/candidates', 'assets/biomes', 'assets/course-cards']) {
    await assert.rejects(access(path.join(output, excluded)), { code:'ENOENT' });
  }
  const files = await readdir(output, { recursive:true });
  assert.ok(files.every(file => !/\.(?:map|scene\.json|prompt\.txt)$/.test(file)));
  await access(path.join(output, 'assets/fonts/noto-sans-arabic/OFL.txt'));
  assert.ok(files.every(file => !file.endsWith('.pdf')), 'source PDFs are archived outside the website');
  await access(path.join(output, 'assets/lessons/ict/exams/source-pages/classified-p006.webp'));
  await access(path.join(output, 'node_modules/dompurify/LICENSE'));

});

test('server artifact runs independently with SQLite and no installed development packages', async () => {
  const output = await packageApp({ server:true });
  const isolated = await mkdtemp(path.join(tmpdir(), 'learn-package-'));
  let app;
  try {
    await cp(output, isolated, { recursive:true });
    const { createAppServer } = await import(pathToFileURL(path.join(isolated, 'src/server/app-server.mjs')));
    const { readRuntimeConfig } = await import(pathToFileURL(path.join(isolated, 'src/server/runtime-config.mjs')));
    const config = readRuntimeConfig({ PORT:'0', PUBLIC_ORIGIN:'http://localhost', ACCOUNTS_DATABASE_PATH:path.join(isolated, 'data/accounts.sqlite') }, { root:isolated, production:true });
    app = await createAppServer({ root:isolated, config, logger:() => {} });
    const port = await app.listen();
    const base = `http://127.0.0.1:${port}`;
    assert.equal((await fetch(`${base}/readyz`)).status, 200);
    assert.match(await (await fetch(base)).text(), /name="learn-account-mode" content="http"/);
    assert.doesNotMatch(await (await fetch(base)).text(), /learn-app-mode/);
    assert.equal((await fetch(`${base}/api/auth/session`)).status, 200);
    assert.equal((await fetch(`${base}/node_modules/marked/lib/marked.esm.js`)).status, 200);
    assert.equal((await fetch(`${base}/src/server/account-store.mjs`)).status, 404);
    assert.equal((await fetch(`${base}/api/developer/reset`, { method:'POST' })).status, 404);
    await access(path.join(isolated, 'data/accounts.sqlite'));
    const manifest = JSON.parse(await readFile(path.join(isolated, 'package.json'), 'utf8'));
    assert.equal(manifest.scripts.start, 'node server.mjs');
    assert.equal(manifest.dependencies, undefined);
    for (const excluded of ['tests', 'scripts', 'dev-server.mjs', 'node_modules/typescript', 'node_modules/playwright']) {
      await assert.rejects(access(path.join(isolated, excluded)), { code:'ENOENT' });
    }
  } finally {
    await app?.close();
    await rm(isolated, { recursive:true, force:true });
  }
});
