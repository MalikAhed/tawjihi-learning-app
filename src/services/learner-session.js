// @ts-check
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { DEFAULT_PROTOTYPE_SCENARIO_ID, getPrototypeScenario, PROTOTYPE_DEMO_ACCOUNTS, PROTOTYPE_SCENARIOS } from "../data/prototype-fixtures.js";
import { duplicateAccountFieldMessage, identifierAliases, isAccountIdentifierField, isValidVisitorSelection } from "../domain/account.js";
import { createAuthClient } from "./auth-client.js";
import { createPrototypeStorage, defaultErrorReporter, GUEST_TRIAL_STORAGE_KEY, PROTOTYPE_SCENARIO_STORAGE_KEY, TEMPORARY_ACCOUNT_STORAGE_KEY, VISITOR_SELECTION_STORAGE_KEY } from "./prototype-storage.js";

/** @typedef {'free'|'subscribed'|'banned'} AccountType */
/** @typedef {{curriculum:string, path:string}} VisitorSelection */
/** @typedef {VisitorSelection & {id:string, username:string, accountType:AccountType, displayName?:string}} ApiAccount */
/** @typedef {{progressOwner:string, type:AccountType, displayName:string, homeScenarioId:string}} LearnerAccount */
/** @typedef {VisitorSelection & {username:string, password:string, email?:string, phone?:string}} Registration */
/** @typedef {{status:'invalid'|'unavailable'|'aborted'|'forbidden'|'rate-limited'|'duplicate', error?:string, field?:string, fieldErrors?:Record<string,string>}} AccountFailure */
/** @typedef {{status:'created'|'signed-in', accountType:AccountType}|AccountFailure} AccountResult */
/** @typedef {{status:'available', field:string}|AccountFailure} AvailabilityResult */
/** @typedef {{storage?:Storage|null, progressStore?:ReturnType<typeof import('./subject-progress-store.js').createSubjectProgressStore>|null, initialScenarioId?:string, onError?:(error:Error)=>void, apiBase?:string|null, fetchImpl?:typeof fetch}} SessionOptions */
/** @typedef {import('./auth-client.js').RequestOptions} RequestOptions */

/** @param {unknown} body @returns {AccountFailure} */
function accountFailure(body) {
  if (body && typeof body === "object" && "status" in body && ["invalid", "unavailable", "aborted", "forbidden", "rate-limited", "duplicate"].includes(String(body.status))) {
    // Only this transport boundary narrows the untrusted response after validation.
    const status = /** @type {AccountFailure['status']} */ (body.status);
    const fieldErrors = "fieldErrors" in body && body.fieldErrors && typeof body.fieldErrors === "object"
      ? Object.fromEntries(Object.entries(body.fieldErrors).filter(([, value]) => typeof value === "string")) : undefined;
    return { status, ...( "error" in body && typeof body.error === "string" ? { error:body.error } : {}),
      ...( "field" in body && typeof body.field === "string" ? { field:body.field } : {}), ...(fieldErrors ? { fieldErrors } : {}) };
  }
  return unavailableAccountResponse();
}

const accountTypes = new Set(["free", "subscribed", "banned"]);

/** @param {unknown} account @returns {account is ApiAccount} */
function isApiAccount(account) {
  return Boolean(account) && account !== null && typeof account === "object" && !Array.isArray(account)
    && "id" in account && typeof account.id === "string" && Boolean(account.id.trim())
    && "accountType" in account && accountTypes.has(String(account.accountType))
    && "username" in account && typeof account.username === "string" && Boolean(account.username.trim())
    && isValidVisitorSelection(account);
}

/** @returns {AccountFailure} */
function unavailableAccountResponse() {
  return { status:"unavailable", error:"تعذّر إكمال الطلب. حاول مرة أخرى." };
}

/** @param {SessionOptions} [options] */
export function createLearnerSession({
  storage = null,
  progressStore = null,
  initialScenarioId = DEFAULT_PROTOTYPE_SCENARIO_ID,
  onError = defaultErrorReporter,
  apiBase = null,
  fetchImpl = globalThis.fetch,
} = {}) {
  const fallbackScenario = getPrototypeScenario(initialScenarioId) || getPrototypeScenario(DEFAULT_PROTOTYPE_SCENARIO_ID);
  let activeScenario = fallbackScenario;
  /** @type {VisitorSelection|null} */
  let visitorSelection = null;
  /** @type {LearnerAccount|null} */
  let activeAccount = null;
  let guestTrial = { active:false, completedFirstLesson:false };
  const subscribers = new Set();
  const accountApi = apiBase ? createAuthClient({ baseUrl:apiBase, fetchImpl, onError }) : null;

  const persistence = createPrototypeStorage(storage, onError);
  const saved = persistence.restore();
  activeScenario = getPrototypeScenario(saved.scenarioId) || fallbackScenario;
  if (isValidVisitorSelection(saved.selection)) visitorSelection = Object.freeze({ ...saved.selection });
  if (saved.guestTrial?.active === true) guestTrial = { active:true, completedFirstLesson:saved.guestTrial.completedFirstLesson === true };
  if (accountTypes.has(saved.account?.type) && getPrototypeScenario(saved.account?.homeScenarioId)) activeAccount = { ...saved.account };

  const { save, remove } = persistence;
  const notify = () => subscribers.forEach((subscriber) => subscriber(activeScenario.snapshot, activeScenario));
  const saveGuestTrial = () => save(GUEST_TRIAL_STORAGE_KEY, JSON.stringify(guestTrial));
  const clearGuestTrial = () => {
    guestTrial = { active:false, completedFirstLesson:false };
    remove(GUEST_TRIAL_STORAGE_KEY);
  };
  const saveActiveAccount = () => activeAccount
    ? save(TEMPORARY_ACCOUNT_STORAGE_KEY, JSON.stringify(activeAccount))
    : remove(TEMPORARY_ACCOUNT_STORAGE_KEY);
  const learnerAccountForScenario = (selectedScenario) => selectedScenario.snapshot.actor === "student"
    ? { progressOwner:`scenario:${selectedScenario.id}`, type:selectedScenario.snapshot.account.type, displayName:selectedScenario.snapshot.account.displayName, homeScenarioId:selectedScenario.id }
    : null;
  /** @param {ApiAccount|null} account */
  const useApiAccount = (account) => {
    activeAccount = account ? {
      progressOwner:`account:${account.id}`,
      type:account.accountType,
      displayName:account.displayName || account.username,
      homeScenarioId:account.accountType === "free" ? "student-free-new"
        : account.accountType === "subscribed" ? "student-paid" : "student-banned",
    } : null;
    if (account) clearGuestTrial();
    if (account && isValidVisitorSelection(account)) {
      visitorSelection = Object.freeze({ curriculum:account.curriculum, path:account.path });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
    }
    saveActiveAccount();
    notify();
  };
  /** @param {import('./auth-client.js').HttpResult} result @param {{optional?:boolean}} [options] @returns {{valid:true, account:ApiAccount|null}|{valid:false, account:null}} */
  const readApiAccount = (result, { optional = false } = {}) => {
    const account = result.body && typeof result.body === "object" && "account" in result.body ? result.body.account : undefined;
    if ((optional && account === null) || isApiAccount(account)) return { valid:true, account };
    onError(new Error("The account service returned an invalid success response."));
    return { valid:false, account:null };
  };
  const selectScenario = (scenarioId) => {
    const nextScenario = getPrototypeScenario(scenarioId);
    if (!nextScenario) throw new RangeError(`Unknown prototype scenario: ${scenarioId}`);
    activeScenario = nextScenario;
    activeAccount = learnerAccountForScenario(nextScenario);
    saveActiveAccount();
    save(PROTOTYPE_SCENARIO_STORAGE_KEY, activeScenario.id);
    notify();
    return activeScenario.snapshot;
  };

  /** @param {{field:string, value:string}} values @param {RequestOptions} [options] @returns {Promise<AvailabilityResult>} */
  const checkAccountAvailability = async ({ field, value }, { signal } = {}) => {
    if (accountApi) {
      const result = await accountApi.checkAvailability({ field, value }, { signal });
      const body = result.body;
      return result.ok && body && typeof body === "object" && "status" in body && body.status === "available"
        ? { status:"available", field } : accountFailure(body);
    }
    if (!isAccountIdentifierField(field)) return { status:"invalid" };
    const aliases = new Set(identifierAliases(value));
    const duplicate = PROTOTYPE_DEMO_ACCOUNTS.some(({ identifier, email, phone }) => [identifier, email, phone]
      .flatMap((candidate) => identifierAliases(candidate))
      .some((alias) => aliases.has(alias)));
    return duplicate
      ? { status:"duplicate", field, error:duplicateAccountFieldMessage(field) }
      : { status:"available", field };
  };

  return Object.freeze({
    kind:accountApi ? "http" : "fixture",
    listScenarios:() => PROTOTYPE_SCENARIOS.map(({ id, group, label, description }) => ({ id, group, label, description })),
    getScenario:() => activeScenario,
    getSnapshot:() => activeScenario.snapshot,
    getVisitorSelection:() => visitorSelection ? { ...visitorSelection } : null,
    /** @param {VisitorSelection} selection */
    saveVisitorSelection(selection) {
      if (!isValidVisitorSelection(selection)) throw new TypeError("visitor selection is invalid");
      visitorSelection = Object.freeze({ curriculum:selection.curriculum, path:selection.path });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
      return { ...visitorSelection };
    },
    getAccountType:() => activeAccount?.type || "guest",
    getLearnerProgressOwner:() => activeAccount?.progressOwner || (activeAccount ? `legacy:${activeAccount.displayName}` : "guest"),
    getLearnerDisplayName:() => activeAccount?.displayName || "",
    getGuestTrialState:() => ({ ...guestTrial }),
    startGuestTrial() {
      activeAccount = null;
      guestTrial = { active:true, completedFirstLesson:false };
      visitorSelection ||= Object.freeze({ curriculum:"gaza", path:"scientific" });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
      saveActiveAccount();
      saveGuestTrial();
      notify();
      return { status:"guest-started", accountType:"guest" };
    },
    completeGuestFirstLesson() {
      if (!guestTrial.active || guestTrial.completedFirstLesson) return { ...guestTrial };
      guestTrial = { ...guestTrial, completedFirstLesson:true };
      saveGuestTrial();
      notify();
      return { ...guestTrial };
    },
    getLearnerHomeSnapshot:() => {
      if (!activeAccount || activeAccount.type === "banned") return null;
      const example = activeAccount.progressOwner?.startsWith("scenario:");
      const snapshot = getPrototypeScenario(activeAccount.homeScenarioId)?.snapshot;
      if (example || !progressStore) return snapshot || null;
      return { ...snapshot, account:{ ...snapshot.account, displayName:activeAccount.displayName },
        learning:progressStore.getHomeLearning(activeAccount.progressOwner, [getSubjectRoadmap("ict")].filter(roadmap => roadmap !== null)) };
    },
    async restoreSession() {
      if (!accountApi) return { status:"fixture", accountType:activeAccount?.type || "guest" };
      const result = await accountApi.restoreSession();
      if (!result?.ok) {
        useApiAccount(null);
        return { status:"unavailable", accountType:"guest" };
      }
      const payload = readApiAccount(result, { optional:true });
      if (!payload.valid) {
        useApiAccount(null);
        return { status:"unavailable", accountType:"guest" };
      }
      useApiAccount(payload.account);
      return { status:payload.account ? "signed-in" : "guest", accountType:payload.account?.accountType || "guest" };
    },
    checkAccountAvailability,
    /** @param {Registration} values @param {RequestOptions} [options] @returns {Promise<AccountResult>} */
    async createAccount({ username, email, phone, curriculum, path, password }, { signal } = {}) {
      if (accountApi) {
        const result = await accountApi.register({ username, email, phone, curriculum, path, password }, { signal });
        if (!result.ok) return accountFailure(result.body);
        const payload = readApiAccount(result);
        if (!payload.valid || !payload.account) return unavailableAccountResponse();
        useApiAccount(payload.account);
        return { status:"created", accountType:payload.account.accountType };
      }
      const identifiers = { username, email, phone };
      for (const [field, value] of Object.entries(identifiers)) {
        if (!value) continue;
        const availability = await checkAccountAvailability({ field, value });
        if (availability.status === "duplicate") return availability;
      }
      activeAccount = { progressOwner:`prototype:${String(username || "").trim().toLowerCase()}`, type:"free", displayName:String(username || "").trim(), homeScenarioId:"student-free-new" };
      clearGuestTrial();
      saveActiveAccount();
      notify();
      return { status:"created", accountType:"free" };
    },
    getDemoAccounts:() => PROTOTYPE_DEMO_ACCOUNTS.map((account) => ({ ...account })),
    /** @param {{identifier:string, password:string}} values @param {RequestOptions} [options] @returns {Promise<AccountResult>} */
    async signIn({ identifier, password }, { signal } = {}) {
      if (accountApi) {
        const result = await accountApi.signIn({ identifier, password }, { signal });
        if (!result.ok) return accountFailure(result.body);
        const payload = readApiAccount(result);
        if (!payload.valid || !payload.account) return unavailableAccountResponse();
        useApiAccount(payload.account);
        return { status:"signed-in", accountType:payload.account.accountType };
      }
      const normalized = String(identifier || "").trim().toLowerCase();
      const demo = PROTOTYPE_DEMO_ACCOUNTS.find(({ identifier:username, email, phone }) => [username, email, phone].includes(normalized));
      if (!demo || String(password) !== demo.password) return { status:"invalid" };
      activeAccount = { progressOwner:`demo:${demo.identifier}`, type:demo.type, displayName:demo.displayName, homeScenarioId:demo.homeScenarioId };
      clearGuestTrial();
      saveActiveAccount();
      visitorSelection ||= Object.freeze({ curriculum:"gaza", path:"scientific" });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
      notify();
      return { status:"signed-in", accountType:demo.type };
    },
    signOut() {
      if (accountApi) {
        return accountApi.signOut().then((result) => {
          if (!result.ok) return { status:"unavailable", accountType:activeAccount?.type || "guest" };
          useApiAccount(null);
          return { status:"signed-out", accountType:"guest" };
        });
      }
      useApiAccount(null);
      return { accountType:"guest" };
    },
    selectScenario,
    reset() { return selectScenario(DEFAULT_PROTOTYPE_SCENARIO_ID); },
    subscribe(subscriber) {
      if (typeof subscriber !== "function") throw new TypeError("subscriber must be a function");
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  });
}
