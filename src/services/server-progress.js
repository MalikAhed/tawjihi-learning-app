// @ts-check
import { applyProgressUpdate, emptyPart, partKey, restorePartEntries } from "../domain/subject-progress.js";

/** @typedef {import('../domain/subject-progress.js').PartRecord} PartRecord */
/** @typedef {import('../domain/subject-progress.js').ProgressUpdate} ProgressUpdate */

// The server owns confirmed rewards. IndexedDB retains confirmed records and an
// account-bound outbox so a lost response, reload or account switch can be retried.
/** @param {{local:import('./indexeddb-progress.js').IndexedProgressAdapter, baseUrl?:string, fetchImpl?:typeof fetch, onError?:(error:unknown,ownerId:string)=>void}} options @returns {import('./subject-progress-store.js').ProgressAdapter} */
export function createServerProgressAdapter({ local, baseUrl = "/api/progress", fetchImpl = globalThis.fetch, onError = console.warn }) {
  /** @param {string} ownerId @param {object} [body] @returns {Promise<Map<string,PartRecord>>} */
  async function request(ownerId, body) {
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),12000);
    try {
      const response=await fetchImpl(baseUrl,{method:body?'POST':'GET',credentials:'same-origin',signal:controller.signal,
        headers:{'X-Progress-Owner':ownerId,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
      const result=await response.json();
      if(!response.ok) throw Object.assign(new Error(result.error||'Progress could not be saved.'),{status:response.status});
      if(`account:${result.accountId}`!==ownerId||!Array.isArray(result.records))throw new Error('The progress response does not belong to this account.');
      // Validate HTTP data at the boundary. Preserve the server's review revision.
      const records=restorePartEntries({version:1,records:result.records},error=>{throw error;});
      for(const [key,record] of result.records)if(records.has(key)&&Number.isSafeInteger(record.revision))(/** @type {PartRecord} */ (records.get(key))).revision=record.revision;
      return records;
    } finally {clearTimeout(timeout);}
  }
  /** @param {string} ownerId */
  async function importLocal(ownerId) {
    if(await local.importAcknowledged(ownerId))return;
    const records=await local.read(ownerId);
    for(const [key,record] of records) {
      const [subjectId,lessonId,partId]=JSON.parse(key);
      const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
      const id='legacy-v1:'+Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
      try {
      await request(ownerId,{id,type:'import',subjectId,lessonId,partId,completedStepIds:record.completedStepIds,isComplete:record.completed,
        ...(record.completedDate?{date:record.completedDate}:{}),review:record.review});
      // Responses contain other server parts too. Keep the entire local import
      // source until all parts are acknowledged, so a restart can resume it.
      } catch (error) {
        // A removed or malformed legacy part must not block valid neighbors.
        // The original local records remain available for recovery.
        if (error instanceof Error && 'status' in error && error.status === 422) onError(error, ownerId);
        else throw error;
      }
    }
    await local.acknowledgeImport(ownerId);
  }
  /** @param {ProgressUpdate} update */
  const payload = (update) => {
    const {subjectId,lessonId,partId}=update.value;
    return {id:update.id,type:update.type,subjectId,lessonId,partId,...(update.type==='completion'
      ?{completedStepIds:update.value.completedStepIds,isComplete:update.value.isComplete}
      :{stepId:update.value.stepId,correct:update.value.correct,reviewing:update.value.reviewing===true})};
  };
  /** @param {string} ownerId */
  async function flush(ownerId) {
    await importLocal(ownerId);
    for(const update of await local.pending(ownerId)) {
      const confirmed=await request(ownerId,payload(update));
      await local.confirm(ownerId,confirmed,update.id);
    }
  }
  return {
    isRemoteOwner:() => true,
    async readCached(ownerId) {
      const records=await local.read(ownerId);
      for(const update of await local.pending(ownerId)) {
        const id=partKey(update.value);const previous=records.get(id)||emptyPart();
        const next=applyProgressUpdate(previous,update);
        // Unconfirmed completions never become a second authority for rewards.
        next.rewardXp=previous.rewardXp;
        next.completedDate=previous.completedDate;
        records.set(id,next);
      }
      return records;
    },
    async read(ownerId) {
      await flush(ownerId);
      const records=await request(ownerId);
      await local.confirm(ownerId,records);
      return local.read(ownerId);
    },
    async update(update) {
      await local.enqueue(update);
      await flush(update.value.ownerId);
      return local.read(update.value.ownerId);
    },
    close:()=>local.close(),
  };
}
