import assert from 'node:assert/strict';
import { withBrowserPage } from './browser-page.mjs';

// Separate Chrome profiles share only the HTTP account, never browser storage.
await withBrowserPage(async first => {
  const visit = async (page, route='?page=learn') => {
    const previous=await page.evaluate('performance.timeOrigin');
    await page.send('Page.navigate',{url:first.base+route});
    await page.waitFor(`performance.timeOrigin!==${previous} && document.querySelector('.course-units,.visitor-shell') && !document.querySelector('.media-pending')`);
  };
  const accountRequest=(page,path,body)=>page.evaluate(`fetch('/api/auth/${path}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(${JSON.stringify(body)})}).then(async response=>({status:response.status,body:await response.json()}))`);
  await visit(first);
  const registered=await accountRequest(first,'register',{username:'sync-a',email:'sync-a@example.com',curriculum:'gaza',path:'scientific',password:'Learn123'});
  assert.equal(registered.status,201);
  const owner=`account:${registered.body.account.id}`;
  await visit(first);
  await first.waitFor("document.querySelector('[data-learner-dashboard]') && document.querySelector('.progress-feedback')?.hidden");

  await withBrowserPage(async second => {
    await visit(second,'?flow=sign-in');
    await second.waitFor("document.querySelector('[data-sign-in-form]')");
    await second.evaluate("document.querySelector('[name=identifier]').value='sync-a';document.querySelector('[name=password]').value='Learn123';document.querySelector('[data-sign-in-form]').requestSubmit()");
    await second.waitFor("document.querySelector('[data-learner-dashboard]') && document.querySelector('.progress-feedback')?.hidden");
    assert.equal(await second.evaluate("document.querySelector('.dashboard-progress--level').getAttribute('aria-valuenow')"),'0');

    await first.evaluate("document.querySelector('[data-subject=ict]').click()");
    await first.waitFor("document.querySelector('[data-roadmap-part=getting-started]')");
    await first.evaluate("document.querySelector('[data-roadmap-part=getting-started]').click();document.querySelector('[data-bubble-start]').click()");
    for(let step=0;step<12;step++) {
      await first.waitFor("document.querySelector('.subject-completion') || document.querySelector('[data-template-primary]') && !document.querySelector('.media-pending,[aria-busy=true]')");
      if(await first.evaluate("Boolean(document.querySelector('.subject-completion'))"))break;
      await first.evaluate("if(!document.querySelector('[data-ui-lab-answer=retry][aria-pressed=true]'))document.querySelector('[data-ui-lab-answer=retry]')?.click();document.querySelector('[data-template-primary]').click()");
    }
    await first.waitFor("document.querySelector('.subject-completion') && document.querySelector('.progress-feedback')?.hidden");
    await first.evaluate("document.querySelector('[data-authored-restart]').click()");
    await first.waitFor("document.querySelector('[data-completion-step=\"1\"]') && !document.querySelector('.media-pending')");
    await first.evaluate("document.querySelector('[data-authored-restart]').click()");
    await first.waitFor("document.querySelector('.subject-roadmap')");
    assert.equal(await first.evaluate("document.querySelector('[data-roadmap-part=getting-started]').dataset.partState"),'completed');
    await first.evaluate("document.querySelector('.lesson-back').click()");
    await first.waitFor("document.querySelector('.dashboard-progress--level')?.getAttribute('aria-valuenow')==='10'");
    await second.evaluate("document.dispatchEvent(new Event('visibilitychange'))");
    await second.waitFor("document.querySelector('.dashboard-progress--level')?.getAttribute('aria-valuenow')==='10'");

    // Lose the response after the server commits an answer. Keep the operation
    // in IndexedDB, switch the cookie to B, reload, then resume A's exact update.
    const setup=`(async()=>{
      const {createSubjectProgressStore}=await import('/src/services/subject-progress-store.js');
      const {createIndexedDbProgressAdapter}=await import('/src/services/indexeddb-progress.js');
      const {createServerProgressAdapter}=await import('/src/services/server-progress.js');
      const {loadSubjectLessonPart}=await import('/src/data/lessons/subject-lesson-registry.js');
      const lesson=await loadSubjectLessonPart('ict','course-introduction','getting-started');
      window.syncKey={ownerId:${JSON.stringify(owner)},subjectId:'ict',lessonId:'course-introduction',partId:'getting-started'};
      window.syncStep=lesson.steps.at(-1).id;
      window.dropProgressResponse=false;
      window.syncLocal=createIndexedDbProgressAdapter({name:'sync-outbox-check'});
      window.syncStore=createSubjectProgressStore({onError:()=>{},adapter:createServerProgressAdapter({local:syncLocal,fetchImpl:async(...args)=>{
        const response=await fetch(...args);
        if(dropProgressResponse && args[1]?.method==='POST'){await response.text();dropProgressResponse=false;throw new Error('Simulated lost response after commit');}
        return response;
      }})});
      await syncStore.ready(syncKey.ownerId);
    })()`;
    await first.evaluate(setup);
    await first.evaluate('dropProgressResponse=true');
    assert.equal((await first.evaluate('syncStore.recordAnswer({...syncKey,stepId:syncStep,correct:false})')).status,'failed');
    assert.equal(await first.evaluate('syncLocal.pending(syncKey.ownerId).then(updates=>updates.length)'),1);
    await accountRequest(first,'sign-out',{});
    const other=await accountRequest(first,'register',{username:'sync-b',email:'sync-b@example.com',curriculum:'gaza',path:'scientific',password:'Learn123'});
    assert.equal(other.status,201);
    assert.equal((await first.evaluate('syncStore.retry(syncKey.ownerId)')).status,'failed');
    const otherRecords=await first.evaluate(`fetch('/api/progress',{headers:{'X-Progress-Owner':${JSON.stringify(`account:${other.body.account.id}`)}}}).then(response=>response.json())`);
    assert.deepEqual(otherRecords.records,[]);
    await first.evaluate('syncStore.close()');
    await accountRequest(first,'sign-out',{});
    assert.equal((await accountRequest(first,'sign-in',{identifier:'sync-a',password:'Learn123'})).status,200);
    await visit(first);
    await first.evaluate(setup);
    assert.equal(await first.evaluate('syncLocal.pending(syncKey.ownerId).then(updates=>updates.length)'),0);
    assert.equal(await first.evaluate('syncStore.getReview(syncKey).find(item=>item.stepId===syncStep).misses'),1);
    assert.equal(await first.evaluate('syncStore.getOutcome({...syncKey,totalParts:1}).totalXp'),10);
    await first.evaluate('syncStore.close()');

    // A response for imported part A also contains server part B. If B has not
    // been imported yet, that response must not overwrite B's recovery source.
    const migrationSetup = `(async()=>{
      const {createSubjectProgressStore}=await import('/src/services/subject-progress-store.js');
      const {createIndexedDbProgressAdapter}=await import('/src/services/indexeddb-progress.js');
      const {createServerProgressAdapter}=await import('/src/services/server-progress.js');
      window.migrationOwner=${JSON.stringify(owner)};
      window.migrationLocal=createIndexedDbProgressAdapter({name:'server-import-recovery',legacyStorage:localStorage});
      window.migrationStore=createSubjectProgressStore({onError:()=>{},adapter:createServerProgressAdapter({local:migrationLocal,fetchImpl:async(url,options)=>{
        const body=options?.body?JSON.parse(options.body):null;
        if(window.interruptImport && body?.type==='import' && body.partId==='access-basics') throw new Error('Simulated interrupted migration');
        return fetch(url,options);
      }})});
      await migrationStore.ready(migrationOwner);
    })()`;
    await first.evaluate(`(async()=>{
      const {loadSubjectLessonPart}=await import('/src/data/lessons/subject-lesson-registry.js');
      const first=await loadSubjectLessonPart('ict','course-introduction','getting-started');
      const second=await loadSubjectLessonPart('ict','database-management','access-basics');
      const record=lesson=>({completedStepIds:lesson.steps.map(step=>step.id),completed:true,rewardXp:10,completedDate:'2026-09-01',review:[]});
      window.legacySource=JSON.stringify({version:1,records:[
        [JSON.stringify(['ict','course-introduction','getting-started']),record(first)],
        [JSON.stringify(['ict','database-management','access-basics']),record(second)]
      ]});
      window.legacyKey='tawjihi:subject-parts:v1:'+encodeURIComponent(${JSON.stringify(owner)});
      localStorage.setItem(legacyKey,legacySource);
      const response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json','X-Progress-Owner':${JSON.stringify(owner)}},body:JSON.stringify({
        id:'partial-before-import',type:'completion',subjectId:'ict',lessonId:'database-management',partId:'access-basics',completedStepIds:[second.steps[0].id],isComplete:false
      })});
      if(!response.ok)throw new Error('Could not seed the partial server record');
      window.interruptImport=true;
    })()`);
    await first.evaluate(migrationSetup);
    assert.equal(await first.evaluate("migrationStore.getSaveState(migrationOwner)"),'failed');
    assert.equal(await first.evaluate("migrationLocal.importAcknowledged(migrationOwner)"),false);
    assert.equal(await first.evaluate("migrationLocal.read(migrationOwner).then(records=>records.get(JSON.stringify(['ict','database-management','access-basics'])).completed)"),true,'An interrupted import must retain the next part until acknowledgement');
    assert.equal(await first.evaluate("localStorage.getItem(legacyKey)===legacySource"),true);
    await first.evaluate('migrationStore.close()');
    await visit(first);
    await first.evaluate(migrationSetup);
    assert.equal(await first.evaluate("migrationStore.getSaveState(migrationOwner)"),'saved');
    assert.equal(await first.evaluate("migrationLocal.importAcknowledged(migrationOwner)"),true);
    assert.equal(await first.evaluate("migrationStore.getOutcome({ownerId:migrationOwner,subjectId:'ict',lessonId:'database-management',partId:'access-basics',totalParts:2}).totalXp"),20);
    assert.equal(await first.evaluate("migrationStore.get({ownerId:migrationOwner,subjectId:'ict',lessonId:'database-management',partId:'access-basics'}).completed"),true);
    await first.evaluate('migrationStore.close()');
  },{baseUrl:first.base});
});
console.log('HTTP progress sync passed: two independent profiles, real lesson/Home consistency, lost-response reload, account-switch isolation, idempotent retries, and resumable multi-part migration.');
