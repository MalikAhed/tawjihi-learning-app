// @ts-check
import { applyProgressUpdate, emptyPart, homeLearningSummary, localDateKey, partKey, summarizeParts } from "../domain/subject-progress.js";
import { getIctPartQuestionIds } from "../data/lessons/ict/question-index.js";
import { createSessionProgressAdapter } from "./session-progress.js";
export { getUnitPartProgress, localDateKey } from "../domain/subject-progress.js";

/** @typedef {import('../domain/subject-progress.js').ProgressKey} ProgressKey */
/** @typedef {import('../domain/subject-progress.js').PartRecord} PartRecord */
/** @typedef {import('../domain/subject-progress.js').ProgressUpdate} ProgressUpdate */
/** @typedef {{read:(owner:string)=>Map<string,PartRecord>|Promise<Map<string,PartRecord>>, update:(update:ProgressUpdate)=>Promise<Map<string,PartRecord>>, close:()=>void|Promise<void>, readCached?:(owner:string)=>Map<string,PartRecord>|Promise<Map<string,PartRecord>>, isRemoteOwner?:(owner:string)=>boolean}} ProgressAdapter */

/** @typedef {{status:'saved'|'failed'}} SaveResult */
/** @typedef {{records:Map<string,PartRecord>, pending:ProgressUpdate[], failed:boolean, loaded:boolean, recoveryWarning:boolean, queue:Promise<void|SaveResult>}} OwnerState */
/** @typedef {{storage?:Pick<Storage,'getItem'|'setItem'>|null, onError?:(error:unknown)=>void, adapter?:ProgressAdapter}} ProgressStoreOptions */

// One cache/subscription boundary for Home and lessons. Writes are optimistic;
// only committed adapter writes report saved. Failed operations stay retryable.
/** @param {ProgressStoreOptions} [options] */
export function createSubjectProgressStore({ storage = null, onError = console.warn, adapter:providedAdapter } = {}) {
  /** @type {Map<string,OwnerState>} */
  const owners = new Map();
  /** @type {Set<()=>void>} */
  const subscribers = new Set();
  const adapter = providedAdapter || createSessionProgressAdapter({ storage, onError:(error, ownerId) => reportRecoveryWarning(ownerId, error) });
  const notify = () => subscribers.forEach((subscriber) => subscriber());
  /** @param {string} ownerId @returns {OwnerState} */
  const stateFor = (ownerId) => {
    if (!owners.has(ownerId)) owners.set(ownerId, { records:new Map(), pending:[], failed:false, loaded:false, recoveryWarning:false, queue:Promise.resolve() });
    return /** @type {OwnerState} */ (owners.get(ownerId));
  };
  /** @param {PartRecord} previous @param {ProgressUpdate} update */
  const applyCached = (previous, update) => {
    const next=applyProgressUpdate(previous,update);
    if(adapter.isRemoteOwner?.(update.value.ownerId)) { next.rewardXp=previous.rewardXp;next.completedDate=previous.completedDate; }
    return next;
  };
  /** @param {OwnerState} state @param {Map<string,PartRecord>} records */
  const overlay = (state, records) => {
    state.records = new Map(records);
    for (const update of state.pending) {
      const key = partKey(update.value);
      state.records.set(key, applyCached(state.records.get(key) || emptyPart(), update));
    }
  };
  /** @param {string} ownerId @param {unknown} error */
  function reportRecoveryWarning(ownerId, error) {
    stateFor(ownerId).recoveryWarning = true;
    onError(error);
    notify();
  }
  /** @param {string} ownerId */
  async function readOwner(ownerId) {
    const state = stateFor(ownerId);
    try {
      if (!state.loaded && adapter.readCached) overlay(state, await adapter.readCached(ownerId));
      overlay(state, await adapter.read(ownerId)); state.loaded = true; state.failed = false;
    }
    catch (error) { state.failed = true; onError(error); }
    notify();
  }
  /** @param {string} ownerId */
  function refresh(ownerId) {
    const state = stateFor(ownerId);
    // Reads and writes share one queue so an older read cannot undo a save.
    const ready = state.queue.then(() => readOwner(ownerId));
    state.queue = ready;
    return ready;
  }
  /** @param {string} ownerId */
  const recordsFor = (ownerId) => stateFor(ownerId).records;
  /** @param {ProgressKey} key */
  const get = (key) => {
    const record = recordsFor(key.ownerId).get(partKey(key)) || emptyPart();
    return { completedStepIds:[...record.completedStepIds], completed:record.completed };
  };
  /** @param {string} ownerId @returns {Promise<SaveResult>} */
  const savePending = async (ownerId) => {
    const state = stateFor(ownerId);
    while (state.pending.length) {
      try {
        const records = await adapter.update(state.pending[0]);
        state.pending.shift();
        state.failed = false;
        overlay(state, records);
      } catch (error) { state.failed = true; onError(error); break; }
    }
    notify();
    return { status:state.failed ? "failed" : "saved" };
  };
  /** @param {ProgressUpdate} update */
  function write(update) {
    if (!update.id) {
      // getRandomValues also works on local HTTP addresses outside localhost.
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      bytes[6] = (bytes[6] & 15) | 64;
      bytes[8] = (bytes[8] & 63) | 128;
      const hex = [...bytes].map(byte => byte.toString(16).padStart(2, "0")).join("");
      update.id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
    const key = update.value;
    if (![key.ownerId, key.subjectId, key.lessonId, key.partId].every((id) => typeof id === "string" && id)) throw new TypeError("Progress identity is required.");
    const state = stateFor(key.ownerId);
    state.pending.push(update);
    const id = partKey(key);
    state.records.set(id, applyCached(state.records.get(id) || emptyPart(), update));
    notify();
    state.queue = state.queue.then(() => savePending(key.ownerId));
    return state.queue;
  }
  return Object.freeze({
    get, refresh, ready:refresh, reportRecoveryWarning,
    /** @param {string} ownerId */
    hasRecoveryWarning:(ownerId) => stateFor(ownerId).recoveryWarning,
    /** @param {string} ownerId */
    dismissRecoveryWarning(ownerId) { stateFor(ownerId).recoveryWarning = false; notify(); },
    /** @param {import('../domain/subject-progress.js').CompletionUpdate} value */
    record:(value) => write({ type:"completion", value }),
    /** @param {import('../domain/subject-progress.js').AnswerUpdate} value */
    recordAnswer:(value) => write({ type:"answer", value }),
    /** @param {ProgressKey} key */
    getReview:(key) => structuredClone(recordsFor(key.ownerId).get(partKey(key))?.review || []),
    /** @param {ProgressKey & {totalParts:number, date?:string}} options */
    getOutcome({ ownerId, subjectId, totalParts, date = localDateKey() }) {
      const records = [...recordsFor(ownerId)].filter(([key]) => JSON.parse(key)[0] === subjectId).map(([, record]) => record);
      return summarizeParts(records, totalParts, date);
    },
    /** @param {string} ownerId @param {import('../domain/subject-progress.js').ProgressRoadmap[]} roadmaps */
    getHomeLearning:(ownerId, roadmaps) => homeLearningSummary(recordsFor(ownerId), roadmaps, undefined,
      (_lesson, part) => getIctPartQuestionIds(part.id)),
    /** @param {string} ownerId */
    getSaveState(ownerId) { const state = stateFor(ownerId); return state.failed ? "failed" : state.pending.length ? "pending" : state.loaded ? "saved" : "loading"; },
    /** @param {string} ownerId */
    retry(ownerId) { const state = stateFor(ownerId); state.queue = state.queue.then(async () => { await readOwner(ownerId); return savePending(ownerId); }); return state.queue; },
    /** @param {()=>void} callback */
    subscribe(callback) { subscribers.add(callback); return () => subscribers.delete(callback); },
    close:() => adapter.close(),
  });
}
