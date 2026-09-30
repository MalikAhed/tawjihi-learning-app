// @ts-check
import { applyProgressUpdate, emptyPart, mergeImportedPart, partKey } from "../domain/subject-progress.js";
import { readLegacyProgress } from "./session-progress.js";

/** @typedef {import('../domain/subject-progress.js').ProgressKey} ProgressKey */
/** @typedef {import('../domain/subject-progress.js').PartRecord} PartRecord */
/** @typedef {import('../domain/subject-progress.js').ProgressUpdate} ProgressUpdate */
/** @typedef {import('./subject-progress-store.js').ProgressAdapter & {
 * enqueue:(update:ProgressUpdate)=>Promise<void>, pending:(ownerId:string)=>Promise<ProgressUpdate[]>,
 * importAcknowledged:(ownerId:string)=>Promise<boolean>, acknowledgeImport:(ownerId:string)=>Promise<void>,
 * confirm:(ownerId:string, records:Map<string,PartRecord>, updateId?:string|null)=>Promise<void>
 * }} IndexedProgressAdapter */

/** @param {ProgressKey} key */
const identity = (key) => [key.ownerId, key.subjectId, key.lessonId, key.partId];
/** @param {{indexedDB?:IDBFactory, legacyStorage?:Pick<Storage,'getItem'>|null, name?:string, onError?:(error:unknown, ownerId:string)=>void}} [options] @returns {IndexedProgressAdapter} */
export function createIndexedDbProgressAdapter({ indexedDB = globalThis.indexedDB, legacyStorage = null, name = "tawjihi-subject-progress", onError = console.warn } = {}) {
  /** @type {Promise<IDBDatabase>|null} */
  let connection = null;
  const open = () => connection ||= new Promise((resolve, reject) => {
    if (!indexedDB) { reject(new Error("Progress storage is unavailable.")); return; }
    const request = indexedDB.open(name, 2);
    let abandoned = false;
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("parts")) db.createObjectStore("parts", { keyPath:["ownerId", "subjectId", "lessonId", "partId"] }).createIndex("owner", "ownerId");
      if (!db.objectStoreNames.contains("imports")) db.createObjectStore("imports");
      if (!db.objectStoreNames.contains("outbox")) {
        const outbox = db.createObjectStore("outbox", {keyPath:"sequence",autoIncrement:true});
        outbox.createIndex("id","id",{unique:true}); outbox.createIndex("owner","ownerId");
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      if (abandoned) { db.close(); return; }
      db.onversionchange = () => { db.close(); connection = null; };
      resolve(db);
    };
    request.onerror = () => { connection = null; reject(request.error); };
    request.onblocked = () => { abandoned = true; connection = null; reject(new Error("Close other app tabs to finish updating progress storage.")); };
  });
  /** @template [Result=void] @param {string[]} stores @param {IDBTransactionMode} mode @param {(tx:IDBTransaction, done:(value:Result)=>void)=>void} run @returns {Promise<Result>} */
  const transaction = async (stores, mode, run) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(stores, mode);
      /** @type {Result} */
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error || new Error("Progress transaction was interrupted."));
      try { run(tx, (value) => { result = value; }); }
      catch (error) { tx.abort(); reject(error); }
    });
  };
  /** @param {string} ownerId */
  const importOwner = async (ownerId) => {
    /** @type {boolean|undefined} */
    const alreadyImported = await transaction(["imports"], "readonly", (tx, done) => {
      const request=tx.objectStore("imports").get(ownerId); request.onsuccess=()=>done(request.result);
    });
    if (alreadyImported) return;
    // Reading the source can fail; never mark such an import complete.
    const records = readLegacyProgress(legacyStorage, ownerId, onError);
    await transaction(["parts", "imports"], "readwrite", (tx) => {
      const markers = tx.objectStore("imports");
      const request = markers.get(ownerId);
      request.onsuccess = () => {
        if (request.result) return;
        const parts = tx.objectStore("parts");
        for (const [key, record] of records) {
          const [subjectId, lessonId, partId] = JSON.parse(key);
          const ids = { ownerId, subjectId, lessonId, partId };
          const current = parts.get(identity(ids));
          current.onsuccess = () => parts.put({ ...ids, record:mergeImportedPart(current.result?.record, record) });
        }
        markers.put(true, ownerId);
      };
    });
  };
  /** @type {Set<string>} */
  const imported = new Set();
  /** @param {string} ownerId */
  const ensureImport = async (ownerId) => { if (!imported.has(ownerId)) { await importOwner(ownerId); imported.add(ownerId); } };
  /** @param {string} ownerId @returns {Promise<Map<string,PartRecord>>} */
  const read = async (ownerId) => {
    await ensureImport(ownerId);
    return transaction(["parts"], "readonly", (tx, done) => {
      const request = tx.objectStore("parts").index("owner").getAll(ownerId);
      request.onsuccess = () => done(new Map(request.result.map((row) => [partKey(row), row.record])));
    });
  };
  return {
    read,
    async update(update) {
      const key = update.value;
      await ensureImport(key.ownerId);
      await transaction(["parts"], "readwrite", (tx) => {
        const parts = tx.objectStore("parts");
        const request = parts.get(identity(key));
        request.onsuccess = () => parts.put({ ownerId:key.ownerId, subjectId:key.subjectId, lessonId:key.lessonId, partId:key.partId,
          record:applyProgressUpdate(request.result?.record || emptyPart(), update) });
      });
      return read(key.ownerId);
    },
    async enqueue(update) {
      if (!update.id) throw new TypeError("A pending progress update requires an id.");
      await transaction(["outbox"],"readwrite",tx=>{
        const outbox=tx.objectStore("outbox");const request=outbox.index("id").get(/** @type {string} */ (update.id));
        request.onsuccess=()=>{if(!request.result)outbox.add({id:update.id,ownerId:update.value.ownerId,update});};
      });
    },
    pending(ownerId) {
      return transaction(["outbox"],"readonly",(tx,done)=>{
        const request=tx.objectStore("outbox").index("owner").getAll(ownerId);request.onsuccess=()=>done(request.result.map(row=>row.update));
      });
    },
    importAcknowledged(ownerId) {
      return transaction(["imports"],"readonly",(tx,done)=>{const request=tx.objectStore("imports").get(`server:${ownerId}`);request.onsuccess=()=>done(Boolean(request.result));});
    },
    acknowledgeImport(ownerId) { return transaction(["imports"],"readwrite",tx=>tx.objectStore("imports").put(true,`server:${ownerId}`)); },
    confirm(ownerId, records, updateId = null) {
      return transaction(["parts","outbox"],"readwrite",tx=>{
        const parts=tx.objectStore("parts");
        for(const [key,record] of records) {
          const [subjectId,lessonId,partId]=JSON.parse(key);const ids={ownerId,subjectId,lessonId,partId};
          const current=parts.get(identity(ids));
          current.onsuccess=()=>{if((current.result?.record.revision||0)<=(record.revision||0))parts.put({...ids,record});};
        }
        if(updateId) {const outbox=tx.objectStore("outbox");const request=outbox.index("id").getKey(updateId);request.onsuccess=()=>{if(request.result!==undefined)outbox.delete(request.result);};}
      });
    },
    async close() { if (connection) (await connection).close(); connection = null; },
  };
}
