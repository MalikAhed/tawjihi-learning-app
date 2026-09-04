import { createHash, randomBytes, scrypt as scryptCallback, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { DatabaseSync } from "node:sqlite";
import { identifierAliases, isAccountIdentifierField, normalizeEmail, normalizePhone, normalizeUsername } from "../domain/account.js";
import { initializeAccountSchema } from "./account-schema.mjs";

export { normalizeEmail, normalizePhone, normalizeUsername } from "../domain/account.js";

const scrypt = promisify(scryptCallback);
const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1_000;
const DUMMY_PASSWORD_SALT = "tawjihi-invalid-account";
const DUMMY_PASSWORD_HASH = scryptSync("invalid-password-sentinel", DUMMY_PASSWORD_SALT, 64).toString("base64url");

function publicAccount(row) {
  if (!row) return null;
  return {
    id:String(row.id),
    username:row.username,
    email:row.email,
    phone:row.phone,
    curriculum:row.curriculum,
    path:row.path,
    displayName:row.username,
    accountType:row.account_type,
    createdAt:row.created_at,
  };
}

function tokenDigest(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password, salt = randomBytes(16).toString("base64url")) {
  const derived = await scrypt(String(password), salt, 64);
  return { salt, hash:Buffer.from(derived).toString("base64url") };
}

async function passwordMatches(password, salt, expectedHash) {
  const { hash } = await hashPassword(password, salt);
  const actual = Buffer.from(hash, "base64url");
  const expected = Buffer.from(expectedHash, "base64url");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createAccountStore({ databasePath } = {}) {
  const filename = databasePath || path.resolve("data/accounts.sqlite");
  if (filename !== ":memory:") mkdirSync(path.dirname(filename), { recursive:true });
  const database = new DatabaseSync(filename);
  initializeAccountSchema(database);

  const insertAccount = database.prepare(`
    INSERT INTO accounts (
      username, username_normalized, email, email_normalized, phone, phone_normalized,
      curriculum, path, password_hash, password_salt, account_type, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'free', ?)
  `);
  const findAccountsByIdentifier = database.prepare(`
    SELECT DISTINCT accounts.* FROM account_identifiers
    JOIN accounts ON accounts.id = account_identifiers.account_id
    WHERE account_identifiers.alias IN (?, ?, ?)
  `);
  const findAccountByAlias = database.prepare(`
    SELECT 1 FROM account_identifiers
    WHERE alias IN (?, ?, ?)
    LIMIT 1
  `);
  const insertIdentifier = database.prepare("INSERT INTO account_identifiers (alias, account_id, kind) VALUES (?, ?, ?)");
  const insertIdentifierIfMissing = database.prepare("INSERT OR IGNORE INTO account_identifiers (alias, account_id, kind) VALUES (?, ?, ?)");
  const insertSession = database.prepare("INSERT INTO sessions (token_hash, account_id, created_at, expires_at) VALUES (?, ?, ?, ?)");
  const findSession = database.prepare(`
    SELECT accounts.* FROM sessions
    JOIN accounts ON accounts.id = sessions.account_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?
    LIMIT 1
  `);
  const deleteSession = database.prepare("DELETE FROM sessions WHERE token_hash = ?");
  const deleteExpiredSessions = database.prepare("DELETE FROM sessions WHERE expires_at <= ?");

  const paddedAliases = (value) => {
    const aliases = identifierAliases(value).slice(0, 3);
    while (aliases.length < 3) aliases.push(null);
    return aliases;
  };
  const identifierExists = (value) => Boolean(value && findAccountByAlias.get(...paddedAliases(value)));
  const findDuplicateField = ({ username, email, phone }) => {
    if (identifierExists(username)) return "username";
    if (identifierExists(email)) return "email";
    if (identifierExists(phone)) return "phone";
    return null;
  };
  const addAccountIdentifiers = (accountId, values, insert = insertIdentifier) => {
    const insertedAliases = new Set();
    for (const [kind, value] of Object.entries(values)) {
      for (const alias of identifierAliases(value)) {
        if (insertedAliases.has(alias)) continue;
        insert.run(alias, Number(accountId), kind);
        insertedAliases.add(alias);
      }
    }
  };

  database.exec("BEGIN");
  try {
    const existingAccounts = database.prepare("SELECT id, username_normalized, email_normalized, phone_normalized FROM accounts").all();
    for (const row of existingAccounts) {
      addAccountIdentifiers(row.id, {
        username:row.username_normalized,
        email:row.email_normalized,
        phone:row.phone_normalized,
      }, insertIdentifierIfMissing);
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  async function createAccount({ username, email, phone, curriculum, path:learningPath, password }) {
    const usernameNormalized = normalizeUsername(username);
    const emailNormalized = normalizeEmail(email) || null;
    const phoneNormalized = normalizePhone(phone) || null;
    const normalizedIdentifiers = { username:usernameNormalized, email:emailNormalized, phone:phoneNormalized };
    const duplicateField = findDuplicateField(normalizedIdentifiers);
    if (duplicateField) return { status:"duplicate", field:duplicateField };
    const credentials = await hashPassword(password);
    const createdAt = new Date().toISOString();
    let transactionOpen = false;
    try {
      database.exec("BEGIN IMMEDIATE");
      transactionOpen = true;
      const racedDuplicateField = findDuplicateField(normalizedIdentifiers);
      if (racedDuplicateField) {
        database.exec("ROLLBACK");
        transactionOpen = false;
        return { status:"duplicate", field:racedDuplicateField };
      }
      const result = insertAccount.run(
        String(username).trim(), usernameNormalized,
        String(email || "").trim() || null, emailNormalized,
        String(phone || "").trim() || null, phoneNormalized,
        curriculum, learningPath, credentials.hash, credentials.salt, createdAt,
      );
      addAccountIdentifiers(result.lastInsertRowid, normalizedIdentifiers);
      database.exec("COMMIT");
      transactionOpen = false;
      return { status:"created", account:publicAccount({
        id:result.lastInsertRowid, username:String(username).trim(), email:String(email || "").trim() || null,
        phone:String(phone || "").trim() || null, curriculum, path:learningPath,
        account_type:"free", created_at:createdAt,
      }) };
    } catch (error) {
      if (transactionOpen) database.exec("ROLLBACK");
      if (String(error?.message).includes("UNIQUE constraint failed")) {
        return { status:"duplicate", field:findDuplicateField(normalizedIdentifiers) || "identifier" };
      }
      throw error;
    }
  }

  async function authenticate(identifier, password) {
    const rows = findAccountsByIdentifier.all(...paddedAliases(identifier));
    const candidates = rows.length ? rows : [{ password_salt:DUMMY_PASSWORD_SALT, password_hash:DUMMY_PASSWORD_HASH }];
    let authenticatedRow = null;
    for (const row of candidates) {
      if (await passwordMatches(password, row.password_salt, row.password_hash)) authenticatedRow ||= row;
    }
    return publicAccount(authenticatedRow);
  }

  function createSession(accountId) {
    deleteExpiredSessions.run(new Date().toISOString());
    const token = randomBytes(32).toString("base64url");
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + SESSION_LIFETIME_MS);
    insertSession.run(tokenDigest(token), Number(accountId), createdAt.toISOString(), expiresAt.toISOString());
    return { token, expiresAt };
  }

  function getAccountForSession(token) {
    if (!token) return null;
    deleteExpiredSessions.run(new Date().toISOString());
    return publicAccount(findSession.get(tokenDigest(token), new Date().toISOString()));
  }

  return Object.freeze({
    createAccount,
    authenticate,
    isIdentifierAvailable(field, value) {
      if (!isAccountIdentifierField(field)) throw new RangeError("unsupported account identifier field");
      return !identifierExists(value);
    },
    createSession,
    getAccountForSession,
    deleteSession(token) { if (token) deleteSession.run(tokenDigest(token)); },
    close() { database.close(); },
  });
}
