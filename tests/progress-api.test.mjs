import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { createAccountStore } from '../src/server/account-store.mjs';
import { createProgressApi } from '../src/server/progress-api.mjs';
import { readJsonBody } from '../src/server/http.mjs';
import { loadSubjectLessonPart } from '../src/data/lessons/subject-lesson-registry.js';

const part={subjectId:'ict',lessonId:'course-introduction',partId:'getting-started'};
const lesson=await loadSubjectLessonPart(part.subjectId,part.lessonId,part.partId);
const steps=lesson.steps.map(step=>step.id);

async function fixture(t) {
  const directory=await mkdtemp(path.join(tmpdir(),'learn-progress-api-'));
  const databasePath=path.join(directory,'test.sqlite');
  const store=createAccountStore({databasePath});
  const accounts=[];
  for(const username of ['learner-a','learner-b']) {
    const {account}=await store.createAccount({username,email:username+'@example.com',curriculum:'gaza',path:'scientific',password:'Test123'});
    accounts.push({id:account.id,token:store.createSession(account.id).token});
  }
  const handler=createProgressApi({accountStore:store,readJsonBody});
  const server=createServer(handler);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url=`http://127.0.0.1:${server.address().port}/api/progress`;
  t.after(async()=>{await new Promise(resolve=>server.close(resolve));store.close();await rm(directory,{recursive:true,force:true});});
  const request=async(body,actor=accounts[0],headers={})=>{
    const response=await fetch(url,{method:body?'POST':'GET',headers:{'Content-Type':'application/json','X-Progress-Owner':`account:${actor.id}`,Cookie:`tawjihi_session=${actor.token}`,...headers},...(body?{body:JSON.stringify(body)}:{})});
    return {status:response.status,body:await response.json()};
  };
  return {request,store,accounts,databasePath};
}

test('progress requires its authenticated owner, origin and published identities; clients cannot set XP',async t=>{
  const {request,accounts}=await fixture(t);
  assert.equal((await request(null,accounts[0],{Cookie:''})).status,401);
  assert.equal((await request(null,accounts[1],{'X-Progress-Owner':`account:${accounts[0].id}`})).status,409);
  assert.equal((await request(null,accounts[0],{Origin:'https://other.example'})).status,403);
  const update={...part,id:'completion-1',type:'completion',completedStepIds:steps,isComplete:true};
  assert.equal((await request({...update,rewardXp:1000})).status,422);
  assert.equal((await request({...update,partId:'invented'})).status,422);
  assert.equal((await request({...update,completedStepIds:['invented']})).status,422);
  assert.equal((await request(update)).status,200);
  assert.deepEqual((await request(null,accounts[1])).body.records,[]);
});

test('overlapping completions, lost responses and retries award once and survive reopen',async t=>{
  const {request,databasePath,accounts}=await fixture(t);
  const first={...part,id:'first-update',type:'completion',completedStepIds:steps.slice(0,3),isComplete:true};
  const second={...part,id:'second-update',type:'completion',completedStepIds:steps.slice(3),isComplete:true};
  const results=await Promise.all([request(first),request(second)]);
  assert.ok(results.every(result=>result.status===200));
  assert.equal((await request(second)).status,200);
  assert.equal((await request(Object.fromEntries(Object.entries(second).reverse()))).status,200, "JSON property order must not change an update identity");
  assert.equal((await request({...second,isComplete:false})).status,409);
  const record=(await request()).body.records[0][1];
  assert.equal(record.completed,true);
  assert.equal(record.rewardXp,10);
  assert.equal(record.completedStepIds.length,steps.length);
  const reopened=createAccountStore({databasePath});
  try {
    assert.equal(reopened.getAccountForSession(accounts[0].token).id,accounts[0].id);
    assert.equal(reopened.progress.read(accounts[0].id)[0][1].rewardXp,10);
  } finally {reopened.close();}
});

test('import is resumable and does not replay old reviews over newer answers',async t=>{
  const {request}=await fixture(t);
  const imported={...part,id:'legacy-import',type:'import',completedStepIds:steps,isComplete:true,date:'2026-09-01',review:[{stepId:steps[0],misses:2,active:true}]};
  assert.equal((await request(imported)).status,200);
  const answer={...part,id:'review-answer',type:'answer',stepId:steps[0],correct:true,reviewing:true,revision:1};
  assert.equal((await request(answer)).status,200);
  assert.equal((await request({...answer,id:'stale-review'})).status,409);
  assert.equal((await request(imported)).status,200);
  const record=(await request()).body.records[0][1];
  assert.equal(record.review[0].active,false);
  assert.equal(record.rewardXp,10);
  assert.equal(record.completedDate,'2026-09-01');
});
