import assert from "node:assert/strict";
import { installAccessibility, auditAccessibility } from "./browser-accessibility.mjs";
import { withBrowserPage } from "./browser-page.mjs";
import { delay } from "./browser-session.mjs";

await withBrowserPage(async ({ base, cdp, send, evaluate, waitFor }) => {
  await installAccessibility(send);
  await send("Page.navigate", { url:base });
  await waitFor("document.querySelector('.visitor-landing')");
  const { targetId } = await cdp.send("Target.createTarget", { url:'about:blank' });
  const { sessionId:second } = await cdp.send("Target.attachToTarget", { targetId, flatten:true });
  const evaluateSecond = async (expression) => {
    const response = await cdp.send("Runtime.evaluate", { expression, awaitPromise:true, returnByValue:true }, second);
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description);
    return response.result.value;
  };
  await cdp.send('Page.enable',{},second);
  await cdp.send('Network.enable',{},second);
  await cdp.send('Network.setBlockedURLs',{urls:['*fonts.googleapis.com*','*fonts.gstatic.com*']},second);
  await cdp.send('Page.navigate',{url:base},second);
  const secondReady=`location.origin===${JSON.stringify(new URL(base).origin)} && document.querySelector('.visitor-landing')`;
  const deadline=Date.now()+15000;
  while(!await evaluateSecond(`Boolean(${secondReady})`)) {
    if(Date.now()>deadline)throw new Error('The second progress tab did not reach the HTTP app');
    await delay(30);
  }
  const setup = `(async () => {
    const { createSubjectProgressStore } = await import('/src/services/subject-progress-store.js');
    const { createIndexedDbProgressAdapter } = await import('/src/services/indexeddb-progress.js');
    window.progress = createSubjectProgressStore({ adapter:createIndexedDbProgressAdapter({ name:'concurrency-check', legacyStorage:localStorage }) });
    window.key = { ownerId:'test-a', subjectId:'ict', lessonId:'database-management', partId:'access-basics' };
    await progress.ready(key.ownerId);
  })()`;
  await Promise.all([evaluate(setup), evaluateSecond(setup)]);
  await Promise.all([
    evaluate(`progress.record({...key, stepIds:['one','two'], completedStepIds:['one'], isComplete:true})`),
    evaluateSecond(`progress.record({...key, partId:'second', stepIds:['one'], completedStepIds:['one'], isComplete:true})`),
  ]);
  await evaluateSecond(`progress.record({...key, stepIds:['one','two'], completedStepIds:['two'], isComplete:true})`);
  await Promise.all([
    evaluate(`progress.record({...key, stepIds:['one','two'], completedStepIds:['one','two'], isComplete:true})`),
    evaluateSecond(`progress.record({...key, stepIds:['one','two'], completedStepIds:['one','two'], isComplete:true})`),
  ]);
  await Promise.all([
    evaluate(`progress.recordAnswer({...key, stepId:'two', correct:false})`),
    evaluateSecond(`progress.recordAnswer({...key, stepId:'two', correct:false})`),
  ]);
  assert.deepEqual(await evaluate(`(async()=>{await progress.refresh(key.ownerId);return { part:progress.get(key), xp:progress.getOutcome({...key,totalParts:2}).totalXp, review:progress.getReview(key)};})()`), {
    part:{ completedStepIds:['one','two'], completed:true }, xp:20, review:[{ stepId:'two', misses:2, active:true }],
  });
  // Mutable review answers apply in transaction-start order; a later correct review clears earlier misses.
  await evaluateSecond(`progress.recordAnswer({...key, stepId:'two', correct:true, reviewing:true})`);
  await evaluate(`progress.refresh(key.ownerId)`);
  assert.equal(await evaluate(`progress.getReview(key)[0].active`), false);
  await evaluate(`progress.ready('test-b')`);
  assert.equal(await evaluate(`progress.get({...key,ownerId:'test-b'}).completed`), false);
  await send("Page.reload");
  await waitFor("document.querySelector('.visitor-landing')");
  await evaluate(setup);
  assert.equal(await evaluate(`progress.getOutcome({...key,totalParts:2}).totalXp`), 20);

  const migration = await evaluate(`(async()=>{
    const {createIndexedDbProgressAdapter}=await import('/src/services/indexeddb-progress.js');
    const {createSubjectProgressStore}=await import('/src/services/subject-progress-store.js');
    const sourceKey='tawjihi:subject-parts:v1:migration';
    const record={completedStepIds:['one'],completed:true,rewardXp:10,completedDate:'2026-09-06'};
    const source=JSON.stringify({version:1,records:[null,[JSON.stringify(['ict','lesson','part']),record]]});
    localStorage.setItem(sourceKey,source);
    const errors=[];
    const adapter=createIndexedDbProgressAdapter({name:'migration-check',legacyStorage:localStorage,onError:e=>errors.push(e.message)});
    const original=IDBDatabase.prototype.transaction;
    let abortOnce=true;
    IDBDatabase.prototype.transaction=function(...args){const tx=original.apply(this,args); if(args[1]==='readwrite'&&abortOnce){abortOnce=false;queueMicrotask(()=>tx.abort());}return tx;};
    const store=createSubjectProgressStore({adapter,onError:e=>errors.push(e.message)});
    await store.ready('migration');
    const failed=store.getSaveState('migration');
    IDBDatabase.prototype.transaction=original;
    await store.ready('migration');
    const key={ownerId:'migration',subjectId:'ict',lessonId:'lesson',partId:'part'};
    await store.recordAnswer({...key,stepId:'one',correct:false});
    await store.recordAnswer({...key,stepId:'one',correct:false});
    await adapter.close();
    const restored=createSubjectProgressStore({adapter:createIndexedDbProgressAdapter({name:'migration-check',legacyStorage:localStorage,onError:()=>{}})});
    await restored.ready('migration');
    return {failed,original:localStorage.getItem(sourceKey)===source,completed:restored.get(key).completed,review:restored.getReview(key)[0].misses,errors:errors.length};
  })()`);
  assert.equal(migration.failed, "failed");
  assert.equal(migration.original, true);
  assert.equal(migration.completed, true);
  assert.equal(migration.review, 2);
  assert.ok(migration.errors >= 2);
  await cdp.send("Target.closeTarget", { targetId });
  await send("Emulation.setDeviceMetricsOverride",{width:320,height:760,deviceScaleFactor:1,mobile:true});
  await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
  await evaluate(`(async()=>{
    const {createSubjectProgressStore}=await import('/src/services/subject-progress-store.js');
    const {mountProgressFeedback}=await import('/src/ui/progress-feedback.js');
    window.storageDenied=false;
    const source=new Map([['tawjihi:subject-parts:v1:feedback',JSON.stringify({version:1,records:[null]})]]);
    const storage={getItem:key=>source.get(key)||null,setItem:(key,value)=>{if(storageDenied)throw new Error('Simulated storage denial');source.set(key,value);}};
    window.feedbackStore=createSubjectProgressStore({storage,onError:()=>{}});
    await feedbackStore.ready('feedback');
    window.dismissFeedback=mountProgressFeedback({store:feedbackStore,service:{getLearnerProgressOwner:()=> 'feedback',subscribe:()=>()=>{}}});
  })()`);
  assert.equal(await evaluate("document.querySelector('.progress-feedback:not([hidden])')?.textContent.includes('السجلات القديمة')"),true);
  await auditAccessibility(evaluate,'recoverable-progress-warning-320px',{selector:'.progress-feedback:not([hidden])'});
  await evaluate("document.querySelector('.progress-feedback:not([hidden]) button:not([hidden])').click();storageDenied=true;window.feedbackWrite=feedbackStore.recordAnswer({ownerId:'feedback',subjectId:'ict',lessonId:'lesson',partId:'part',stepId:'one',correct:false})");
  await evaluate('feedbackWrite');
  assert.equal(await evaluate("feedbackStore.getSaveState('feedback')"),'failed');
  assert.equal(await evaluate("document.documentElement.scrollWidth<=innerWidth"),true);
  await auditAccessibility(evaluate,'failed-progress-save-320px',{selector:'.progress-feedback:not([hidden])'});
  await evaluate("storageDenied=false;document.querySelector('.progress-feedback:not([hidden]) button:not([hidden])').focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await waitFor("feedbackStore.getSaveState('feedback')==='saved'");
  await evaluate('dismissFeedback()');
  // The application root must also report denial of the storage getter itself;
  // falling back to an in-memory guest adapter would otherwise claim a save.
  await send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Simulated blocked storage','SecurityError');}});`});
  const previous=await evaluate('performance.timeOrigin');
  await send('Page.navigate',{url:base});
  await waitFor(`performance.timeOrigin!==${previous} && document.querySelector('.visitor-landing')`);
  assert.equal(await evaluate("document.querySelector('.progress-feedback:not([hidden])')?.textContent.includes('تعذّر حفظ تقدّمك')"),true,'Blocked browser storage must produce visible recovery feedback');
});
console.log("Progress browser checks passed: HTTP host, two tabs, interleaved completion/review, reload, isolation, interrupted migration and idempotent import.");
