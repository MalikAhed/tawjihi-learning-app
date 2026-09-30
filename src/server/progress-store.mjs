import { createHash } from "node:crypto";
import { applyProgressUpdate, emptyPart, localDateKey, validReview } from "../domain/subject-progress.js";

export function assertSupportedDatabaseVersion(database) {
  const version = Number(database.prepare("PRAGMA user_version").get().user_version);
  if (version > 1) throw new Error("This server cannot open a newer database schema.");
 }

export function initializeProgressSchema(database) {
  assertSupportedDatabaseVersion(database);
  database.exec(`BEGIN IMMEDIATE;
    CREATE TABLE IF NOT EXISTS subject_progress (
      account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      subject_id TEXT NOT NULL, lesson_id TEXT NOT NULL, part_id TEXT NOT NULL,
      record TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY(account_id, subject_id, lesson_id, part_id)
    );
    CREATE TABLE IF NOT EXISTS progress_updates (
      account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      update_id TEXT NOT NULL, digest TEXT NOT NULL,
      PRIMARY KEY(account_id, update_id)
    );
    PRAGMA user_version = 1;
    COMMIT;`);
}

export function createDatabaseProgressStore(database) {
  initializeProgressSchema(database);
  const lookup = database.prepare('SELECT record,revision FROM subject_progress WHERE account_id=? AND subject_id=? AND lesson_id=? AND part_id=?');
  const upsert = database.prepare(`INSERT INTO subject_progress(account_id,subject_id,lesson_id,part_id,record,revision) VALUES(?,?,?,?,?,?)
    ON CONFLICT(account_id,subject_id,lesson_id,part_id) DO UPDATE SET record=excluded.record,revision=excluded.revision`);
  const receipt = database.prepare('SELECT digest FROM progress_updates WHERE account_id=? AND update_id=?');
  const remember = database.prepare('INSERT INTO progress_updates(account_id,update_id,digest) VALUES(?,?,?)');
  const readOwner = database.prepare('SELECT subject_id,lesson_id,part_id,record,revision FROM subject_progress WHERE account_id=?');
  return {
    read(accountId) {
      return readOwner.all(accountId)
        .map(row => [JSON.stringify([row.subject_id,row.lesson_id,row.part_id]), {...JSON.parse(row.record), revision:row.revision}]);
    },
    // Published identities and step lists are validated at the API boundary.
    update(accountId, input, stepIds) {
      const { subjectId, lessonId, partId, id, type } = input;
      const digest = createHash('sha256').update(JSON.stringify(Object.keys(input).sort().map(key=>[key,input[key]]))).digest('hex');
      const legacyDigest = createHash('sha256').update(JSON.stringify(input)).digest('hex');
      database.exec('BEGIN IMMEDIATE');
      try {
        const oldReceipt = receipt.get(accountId,id);
        if(oldReceipt) {
          if(type!=='import' && oldReceipt.digest!==digest && oldReceipt.digest!==legacyDigest) throw Object.assign(new Error('An update ID cannot be reused with different data.'),{status:409});
          database.exec('COMMIT');
          return;
        }
        const row = lookup.get(accountId,subjectId,lessonId,partId);
        const previous = row ? JSON.parse(row.record) : emptyPart();
        const key={ownerId:`account:${accountId}`,subjectId,lessonId,partId};
        let record;
        if(type==='import') {
          // Import a part once. Existing server review state always wins.
          const imported=applyProgressUpdate(emptyPart(),{type:'completion',value:{...key,stepIds,completedStepIds:input.completedStepIds,isComplete:input.isComplete,date:input.date||localDateKey()}});
          imported.review=validReview(input.review).filter(item=>stepIds.includes(item.stepId));
          record=row?{...previous,completedStepIds:[...new Set([...previous.completedStepIds,...imported.completedStepIds])],completed:previous.completed||imported.completed,
            rewardXp:Math.max(previous.rewardXp,imported.rewardXp),completedDate:previous.completedDate||imported.completedDate}:imported;
        } else {
          if(type==='answer' && input.reviewing && input.revision!==undefined && input.revision!==(row?.revision||0)) throw Object.assign(new Error('Review changed on another device. Refresh before retrying.'),{status:409});
          record=applyProgressUpdate(previous,{type,value:{...input,...key,stepIds,date:localDateKey()}});
        }
        upsert.run(accountId,subjectId,lessonId,partId,JSON.stringify(record),(row?.revision||0)+1);
        remember.run(accountId,id,digest);
        database.exec('COMMIT');
      } catch(error) { database.exec('ROLLBACK');throw error; }
    },
  };
}
