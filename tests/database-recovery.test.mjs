import assert from 'node:assert/strict';
import test from 'node:test';
import { access,mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createAccountStore } from '../src/server/account-store.mjs';
import { backupDatabase,verifyRecovery,databaseSummary } from '../scripts/database-maintenance.mjs';

test('an unreadable database does not leave a misleading empty backup',async t=>{
  const directory=await mkdtemp(path.join(tmpdir(),'learn-failed-backup-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const destination=path.join(directory,'backup.sqlite');
  await assert.rejects(backupDatabase(directory,destination));
  await assert.rejects(access(destination),{code:'ENOENT'});
});

test('live-WAL backup restores identities, sessions, progress and schema; rollback leaves source intact',async t=>{
  const directory=await mkdtemp(path.join(tmpdir(),'learn-recovery-test-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const source=path.join(directory,'source.sqlite');
  const backup=path.join(directory,'backup.sqlite');
  const store=createAccountStore({databasePath:source});
  const {account}=await store.createAccount({username:'restore-user',email:'restore@example.com',curriculum:'gaza',path:'scientific',password:'Test123'});
  const session=store.createSession(account.id);
  const key={id:'saved-progress',type:'completion',subjectId:'ict',lessonId:'course-introduction',partId:'getting-started',completedStepIds:['one'],isComplete:true};
  store.progress.update(account.id,key,['one']);
  await backupDatabase(source,backup);
  await assert.rejects(backupDatabase(source,backup),{code:'EEXIST'});
  const restored=createAccountStore({databasePath:backup});
  assert.equal(restored.getAccountForSession(session.token).id,account.id);
  assert.deepEqual(restored.progress.read(account.id),store.progress.read(account.id));
  restored.close();
  const drill=await verifyRecovery(backup);
  assert.deepEqual(drill.before,drill.after);
  assert.ok(drill.restoredInMs<30*60*1000);
  // Simulate a failed migration on the restored copy, then a destructive incident.
  const copy=new DatabaseSync(backup);
  copy.exec('BEGIN IMMEDIATE; DELETE FROM subject_progress; ROLLBACK;');
  assert.equal(copy.prepare('SELECT count(*) AS n FROM subject_progress').get().n,1);
  copy.exec('DELETE FROM subject_progress');copy.close();
  const recovered=path.join(directory,'recovered.sqlite');
  await backupDatabase(source,recovered);
  assert.equal(databaseSummary(recovered).subject_progress,1);
  assert.equal(store.progress.read(account.id)[0][1].rewardXp,10);
  store.close();
});


test('legacy account migration runs on a copy and preserves the source for rollback', async t => {
  const directory=await mkdtemp(path.join(tmpdir(),'learn-legacy-recovery-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const source=path.join(directory,'legacy.sqlite');
  const legacy=new DatabaseSync(source);
  legacy.exec(`CREATE TABLE accounts (id INTEGER PRIMARY KEY, username TEXT NOT NULL, username_normalized TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL, email_normalized TEXT NOT NULL UNIQUE, phone TEXT NOT NULL, phone_normalized TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, account_type TEXT NOT NULL, created_at TEXT NOT NULL);
    INSERT INTO accounts VALUES (42,'original','original','original@example.com','original@example.com','0591234567','0591234567','test-hash','test-salt','free','2026-09-01');`);
  legacy.close();
  const result=await verifyRecovery(source);
  assert.equal(result.before.version,0);
  assert.equal(result.after.version,1);
  assert.equal(result.after.accounts,1);
  assert.equal(result.sourceUnchanged,true);
  const original=new DatabaseSync(source,{readOnly:true});
  assert.equal(original.prepare('SELECT id FROM accounts').get().id,42);
  assert.equal(original.prepare('PRAGMA table_info(accounts)').all().some(column=>column.name==='curriculum'),false);
  original.close();
});


test('a newer database is rejected before any schema migration', async t => {
  const directory=await mkdtemp(path.join(tmpdir(),'learn-future-schema-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const filename=path.join(directory,'future.sqlite');
  const database=new DatabaseSync(filename);
  database.exec(`PRAGMA user_version=99; CREATE TABLE retained(value TEXT); INSERT INTO retained VALUES ('future record');`);
  database.close();
  assert.throws(()=>createAccountStore({databasePath:filename}),/newer database/);
  const untouched=new DatabaseSync(filename,{readOnly:true});
  assert.equal(untouched.prepare('PRAGMA user_version').get().user_version,99);
  assert.deepEqual(untouched.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(row=>row.name),['retained']);
  untouched.close();
});
