// @ts-check
import { applyProgressUpdate, emptyPart, partKey, restorePartEntries } from "../domain/subject-progress.js";

export const LEGACY_PROGRESS_PREFIX = "tawjihi:subject-parts:v1:";
/** @param {Pick<Storage,'getItem'>|null} storage @param {string} ownerId @param {(error:unknown, ownerId:string)=>void} onError @returns {Map<string,import('../domain/subject-progress.js').PartRecord>} */
export function readLegacyProgress(storage, ownerId, onError) {
  return restorePartEntries(JSON.parse(storage?.getItem(LEGACY_PROGRESS_PREFIX + encodeURIComponent(ownerId)) || "null"), (error) => onError(error, ownerId));
}

// Guest-only session scope; the member adapter uses IndexedDB transactions.
/** @param {{storage?:Pick<Storage,'getItem'|'setItem'>|null, onError?:(error:unknown, ownerId:string)=>void}} [options] @returns {import('./subject-progress-store.js').ProgressAdapter} */
export function createSessionProgressAdapter({ storage = null, onError = console.warn } = {}) {
  /** @type {Map<string,Map<string,import("../domain/subject-progress.js").PartRecord>>} */
  const memory = new Map();
  /** @param {string} ownerId */
  const read = (ownerId) => storage ? readLegacyProgress(storage, ownerId, onError) : new Map(memory.get(ownerId) || []);
  return {
    read,
    async update(update) {
      const { ownerId } = update.value;
      const records = read(ownerId);
      const id = partKey(update.value);
      records.set(id, applyProgressUpdate(records.get(id) || emptyPart(), update));
      if (storage) storage.setItem(LEGACY_PROGRESS_PREFIX + encodeURIComponent(ownerId), JSON.stringify({ version:1, records:[...records] }));
      memory.set(ownerId, records);
      return records;
    },
    close() {},
  };
}
