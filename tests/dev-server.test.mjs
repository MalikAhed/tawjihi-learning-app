import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { once } from 'node:events';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { createAccountStore } from '../src/server/account-store.mjs';
import { getSubjectRoadmap } from '../src/data/subject-roadmaps.js';

const root = fileURLToPath(new URL('../', import.meta.url));

test('preview reloads API lesson validation after content edits and preserves durable progress', async t => {
  const directory = await mkdtemp(path.join(tmpdir(), 'learn-dev-reload-'));
  let processHandle;
  t.after(async () => {
    if (processHandle && processHandle.exitCode === null) {
      const stopped = once(processHandle, 'exit');
      processHandle.kill('SIGTERM');
      await stopped;
    }
    await rm(directory, {recursive:true, force:true});
  });
  await cp(path.join(root, 'src'), path.join(directory, 'src'), {recursive:true});
  await cp(path.join(root, 'dev-server.mjs'), path.join(directory, 'dev-server.mjs'));
  await cp(path.join(root, 'index.html'), path.join(directory, 'index.html'));
  await writeFile(path.join(directory, 'package.json'), JSON.stringify({type:'module'}));
  await mkdir(path.join(directory, 'assets'));
  await symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
  const databasePath = path.join(directory, 'accounts.sqlite');
  const store = createAccountStore({databasePath});
  let account, token;
  try {
    ({account} = await store.createAccount({username:'reload-check', email:'reload@example.com', curriculum:'gaza', path:'scientific', password:'Test123'}));
    token = store.createSession(account.id).token;
  } finally { store.close(); }
  let output = '';
  let starts = 0;
  let base;
  processHandle = spawn(process.execPath, ['dev-server.mjs'], {
    cwd:directory, env:{...process.env, PORT:'0', LIVE_RELOAD:'1', DEV_AUTO_LOGIN:'0', ACCOUNTS_DATABASE_PATH:databasePath, LEARN_PREVIEW_WATCH_CHILD:'0'},
    stdio:['ignore', 'pipe', 'pipe'],
  });
  processHandle.stdout.on('data', chunk => {
    const text = String(chunk);
    output += text;
    for (const match of text.matchAll(/Live preview: http:\/\/localhost:(\d+)\//g)) {
      starts += 1;
      base = `http://127.0.0.1:${match[1]}`;
    }
  });
  processHandle.stderr.on('data', chunk => { output += String(chunk); });
  const waitFor = async predicate => {
    const until = Date.now() + 10000;
    while (Date.now() < until) {
      if (await predicate()) return;
      if (processHandle.exitCode !== null) break;
      await delay(40);
    }
    assert.fail(`Preview did not become ready:\n${output}`);
  };
  await waitFor(() => starts === 1);
  const lesson = getSubjectRoadmap('physics').units.flatMap(unit => unit.lessons).find(lesson => lesson.id === 'momentum-impulse');
  const part = lesson.parts[0];
  const key = {subjectId:'physics', lessonId:lesson.id, partId:part.id};
  const request = async body => {
    const response = await fetch(`${base}/api/progress`, {
      method:body ? 'POST' : 'GET', headers:{'Content-Type':'application/json', 'X-Progress-Owner':`account:${account.id}`, Cookie:`tawjihi_session=${token}`},
      ...(body ? {body:JSON.stringify(body)} : {}),
    });
    return {status:response.status, body:await response.json()};
  };
  const answer = {id:'before-content-edit', type:'answer', ...key, stepId:part.startStepId, correct:false};
  assert.equal((await request(answer)).status, 200, 'initial API loads the original catalog');
  const newStepId = `${part.startStepId}-updated`;
  for (const relative of ['src/data/lessons/physics/momentum-impulse.js', 'src/data/lessons/physics/physics-course.js']) {
    const filename = path.join(directory, relative);
    await writeFile(filename, (await readFile(filename, 'utf8')).replaceAll(part.startStepId, newStepId));
  }
  await waitFor(() => starts >= 2);
  let saved;
  await waitFor(async () => {
    try {
      saved = await request({...answer, id:'after-content-edit', stepId:newStepId});
      return saved.status === 200;
    } catch { return false; }
  });
  const record = saved.body.records.find(([id]) => id === JSON.stringify([key.subjectId, key.lessonId, key.partId]))[1];
  assert.deepEqual(record.review.map(item => [item.stepId, item.misses]), [[answer.stepId, 1], [newStepId, 1]], 'both answers survive the server restart');
  assert.equal(record.revision, 2, 'restart retries do not duplicate the answer');
  assert.equal((await request()).status, 200, 'account session remains valid');
});
