import assert from 'node:assert/strict';
import { cpus,totalmem,loadavg,platform,release,tmpdir } from 'node:os';
import { mkdtemp,mkdir,rm,writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import path from 'node:path';
import { createAppServer } from '../src/server/app-server.mjs';
import { readRuntimeConfig } from '../src/server/runtime-config.mjs';
import { loadSubjectLessonPart } from '../src/data/lessons/subject-lesson-registry.js';
import { verifyRecovery } from './database-maintenance.mjs';

const directory=await mkdtemp(path.join(tmpdir(),'learn-capacity-'));
const duration=Number(process.env.CAPACITY_SECONDS||60);
if(!Number.isInteger(duration)||duration<10||duration>300)throw new Error('CAPACITY_SECONDS must be 10–300.');
const config=readRuntimeConfig({PORT:'0',PUBLIC_ORIGIN:'http://127.0.0.1',TRUSTED_PROXY_ADDRESSES:'127.0.0.1',ACCOUNTS_DATABASE_PATH:path.join(directory,'test.sqlite'),REVIEW_PROVIDER_URL:'http://127.0.0.1/stub'},{root:process.cwd(),production:true});
const app=await createAppServer({root:process.cwd(),config,logger:()=>{},reviewProvider:async({signal})=>{
  await delay(600,null,{signal});
  return {source:'provider',score:9,passed:true,feedback:'A clear answer and a useful example.'};
}});
const port=await app.listen();
const base=`http://127.0.0.1:${port}`;
const samples={progress:[],session:[],signin:[],review:[]};
let unexpected=0,requests=0,peakRss=0,peakQueued=0;
const statusCounts={};
const memorySamples=[];
const users=[];
const initialLoadAverage=loadavg();
const request=async(user,route,body,kind)=>{
  const start=performance.now();
  const response=await fetch(base+route,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',Origin:config.publicOrigin,'X-Forwarded-For':user.address,'X-Progress-Owner':`account:${user.id}`,Cookie:user.cookie||''},...(body?{body:JSON.stringify(body)}:{})});
  const result=await response.json();
  requests++;if(!response.ok)unexpected++;
  const statusKey=`${kind}:${response.status}`;statusCounts[statusKey]=(statusCounts[statusKey]||0)+1;
  if(kind)samples[kind].push(performance.now()-start);
  return {response,result};
};
try {
  for(let index=0;index<100;index++) {
    const username=`capacity-${index}`;
    const {account}=await app.accountStore.createAccount({username,email:username+'@example.com',curriculum:'gaza',path:'scientific',password:'Test123'});
    users.push({id:account.id,username,address:`192.0.2.${index+1}`,cookie:`tawjihi_session=${app.accountStore.createSession(account.id).token}`});
  }
  await Promise.all(users.slice(0,10).map(user=>request(user,'/api/auth/sign-in',{identifier:user.username,password:'Test123'},'signin')));
  const lesson=await loadSubjectLessonPart('ict','course-introduction','getting-started');
  const stepIds=lesson.steps.map(step=>step.id);
  const writes=new Set();
  const start=performance.now();
  for(let tick=0;tick<duration*20;tick++) {
    await delay(Math.max(0,start+tick*50-performance.now()));
    const user=users[tick%users.length];
    const work=Promise.all([
      request(user,'/api/progress',{id:`capacity-${tick}`,type:'completion',subjectId:'ict',lessonId:'course-introduction',partId:'getting-started',completedStepIds:stepIds,isComplete:true},'progress'),
      request(user,'/api/auth/session',null,'session'),
      ...(tick%20===0?[request(users[Math.floor(tick/20)%users.length],'/api/explain-review',{route:'ship-ready-response',answer:`HTTP request and response example ${tick}`},'review')]:[]),
    ]);
    writes.add(work);work.then(()=>writes.delete(work),()=>{unexpected++;writes.delete(work);});
    if(writes.size>100)throw new Error('Client workload exceeded 100 in-flight sessions.');
    if(tick%200===0)memorySamples.push({seconds:tick/20,rssBytes:process.memoryUsage().rss});
    peakRss=Math.max(peakRss,process.memoryUsage().rss);peakQueued=Math.max(peakQueued,app.reviewExplanation.stats().queued);
  }
  await Promise.all(writes);
  for(const user of users) {
    const records=app.accountStore.progress.read(user.id);
    assert.equal(records.length,1);assert.equal(records[0][1].rewardXp,10);assert.equal(records[0][1].completedStepIds.length,stepIds.length);
  }
  const percentile=(values,p)=>[...values].sort((a,b)=>a-b)[Math.min(values.length-1,Math.floor(values.length*p))]||0;
  const report={recordedAt:new Date().toISOString(),scope:'Local single process, co-located HTTP client; not production-host capacity',machine:{os:platform(),release:release(),cpu:cpus()[0].model,logicalCpus:cpus().length,memoryBytes:totalmem(),node:process.version,initialLoadAverage,finalLoadAverage:loadavg()},
    workload:{activeSessions:100,progressOpsPerSecond:20,sessionReadsPerSecond:20,reviewRequestsPerSecond:1,reviewStubLatencyMs:600,signInBurst:10,durationSeconds:duration},
    timings:Object.fromEntries(Object.entries(samples).map(([kind,values])=>[kind,{requests:values.length,p50Ms:Math.round(percentile(values,.5)),p95Ms:Math.round(percentile(values,.95))}])),
    statusCounts,memorySamples,requests,unexpectedErrors:unexpected,unexpectedErrorRate:unexpected/requests,peakRssBytes:peakRss,peakReviewQueue:peakQueued,recovery:await verifyRecovery(config.databasePath)};
  await mkdir('artifacts',{recursive:true});await writeFile('artifacts/capacity.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  assert.ok(report.timings.progress.p95Ms<500&&report.timings.session.p95Ms<500);assert.ok(report.unexpectedErrorRate<.001);assert.ok(peakQueued<=8);assert.ok(peakRss<512*1024*1024);
}finally{await app.close();await rm(directory,{recursive:true,force:true});}
