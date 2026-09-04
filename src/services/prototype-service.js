import { DEFAULT_PROTOTYPE_SCENARIO_ID, getPrototypeScenario, PROTOTYPE_DEMO_ACCOUNTS, PROTOTYPE_SCENARIOS } from "../data/prototype-fixtures.js";
import { duplicateAccountFieldMessage, identifierAliases, isAccountIdentifierField, isValidVisitorSelection } from "../domain/account.js";
import { createAuthClient } from "./auth-client.js";

export const PROTOTYPE_SCENARIO_STORAGE_KEY = "tawjihi:prototype-scenario";
export const VISITOR_SELECTION_STORAGE_KEY = "tawjihi:visitor-selection";
export const TEMPORARY_ACCOUNT_STORAGE_KEY = "tawjihi:temporary-account";
export const LIVE_RELOAD_STORAGE_KEY = "tawjihi:codex-live-reload";
export const GUEST_TRIAL_STORAGE_KEY = "tawjihi:guest-trial";
const defaultErrorReporter = (error) => console.warn(error);
const accountTypes = new Set(["free", "subscribed", "banned"]);

function isApiAccount(account) {
  return account && typeof account === "object" && !Array.isArray(account)
    && accountTypes.has(account.accountType)
    && typeof account.username === "string" && account.username.trim()
    && isValidVisitorSelection(account);
}

function unavailableAccountResponse() {
  return { status:"unavailable", error:"تعذّر إكمال الطلب. حاول مرة أخرى." };
}

export function getBrowserPrototypeStorage(onError = defaultErrorReporter) {
  try { return window.sessionStorage; }
  catch (cause) {
    onError(new Error("Prototype storage is unavailable; state will last only for this page view.", { cause }));
    return null;
  }
}

export function createFixtureProductService({
  storage = null,
  initialScenarioId = DEFAULT_PROTOTYPE_SCENARIO_ID,
  onError = defaultErrorReporter,
  apiBase = null,
  fetchImpl = globalThis.fetch,
} = {}) {
  const fallbackScenario = getPrototypeScenario(initialScenarioId) || getPrototypeScenario(DEFAULT_PROTOTYPE_SCENARIO_ID);
  let activeScenario = fallbackScenario;
  let visitorSelection = null;
  let activeAccount = null;
  let guestTrial = { active:false, completedFirstLesson:false };
  const subscribers = new Set();
  const accountApi = apiBase ? createAuthClient({ baseUrl:apiBase, fetchImpl, onError }) : null;

  if (storage) {
    try {
      activeScenario = getPrototypeScenario(storage.getItem(PROTOTYPE_SCENARIO_STORAGE_KEY)) || fallbackScenario;
      const savedSelection = JSON.parse(storage.getItem(VISITOR_SELECTION_STORAGE_KEY) || "null");
      if (isValidVisitorSelection(savedSelection)) visitorSelection = Object.freeze({ ...savedSelection });
      const savedGuestTrial = JSON.parse(storage.getItem(GUEST_TRIAL_STORAGE_KEY) || "null");
      if (savedGuestTrial?.active === true) guestTrial = { active:true, completedFirstLesson:savedGuestTrial.completedFirstLesson === true };
      const preserveAccount = storage.getItem(LIVE_RELOAD_STORAGE_KEY) === "1";
      const savedAccount = preserveAccount ? JSON.parse(storage.getItem(TEMPORARY_ACCOUNT_STORAGE_KEY) || "null") : null;
      if (["free", "subscribed", "banned"].includes(savedAccount?.type) && getPrototypeScenario(savedAccount?.homeScenarioId)) activeAccount = { ...savedAccount };
      storage.removeItem(LIVE_RELOAD_STORAGE_KEY);
      if (!preserveAccount) storage.removeItem(TEMPORARY_ACCOUNT_STORAGE_KEY);
    } catch (cause) { onError(new Error("Saved prototype state could not be read.", { cause })); }
  }

  const save = (key, value) => {
    if (!storage) return;
    try { storage.setItem(key, value); }
    catch (cause) { onError(new Error("Prototype state could not be saved.", { cause })); }
  };
  const notify = () => subscribers.forEach((subscriber) => subscriber(activeScenario.snapshot, activeScenario));
  const saveGuestTrial = () => save(GUEST_TRIAL_STORAGE_KEY, JSON.stringify(guestTrial));
  const clearGuestTrial = () => {
    guestTrial = { active:false, completedFirstLesson:false };
    storage?.removeItem(GUEST_TRIAL_STORAGE_KEY);
  };
  const saveActiveAccount = () => {
    if (!storage) return;
    try {
      if (activeAccount) storage.setItem(TEMPORARY_ACCOUNT_STORAGE_KEY, JSON.stringify(activeAccount));
      else storage.removeItem(TEMPORARY_ACCOUNT_STORAGE_KEY);
    } catch (cause) { onError(new Error("Temporary account state could not be saved.", { cause })); }
  };
  const learnerAccountForScenario = (selectedScenario) => selectedScenario.snapshot.actor === "student"
    ? { type:selectedScenario.snapshot.account.type, displayName:selectedScenario.snapshot.account.displayName, homeScenarioId:selectedScenario.id }
    : null;
  const useApiAccount = (account) => {
    activeAccount = account ? {
      type:account.accountType,
      displayName:account.displayName || account.username,
      homeScenarioId:account.accountType === "free" ? "student-free-new"
        : account.accountType === "subscribed" ? "student-paid" : "student-banned",
    } : null;
    if (account) clearGuestTrial();
    if (isValidVisitorSelection(account)) {
      visitorSelection = Object.freeze({ curriculum:account.curriculum, path:account.path });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
    }
    saveActiveAccount();
    notify();
  };
  const readApiAccount = (result, { optional = false } = {}) => {
    const hasAccount = result?.body && Object.hasOwn(result.body, "account");
    const account = hasAccount ? result.body.account : undefined;
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

  const checkAccountAvailability = async ({ field, value } = {}, { signal } = {}) => {
    if (accountApi) {
      const result = await accountApi.checkAvailability({ field, value }, { signal });
      return result.body;
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
    kind:"fixture",
    listScenarios:() => PROTOTYPE_SCENARIOS.map(({ id, group, label, description }) => ({ id, group, label, description })),
    getScenario:() => activeScenario,
    getSnapshot:() => activeScenario.snapshot,
    getVisitorSelection:() => visitorSelection ? { ...visitorSelection } : null,
    saveVisitorSelection(selection) {
      if (!isValidVisitorSelection(selection)) throw new TypeError("visitor selection is invalid");
      visitorSelection = Object.freeze({ curriculum:selection.curriculum, path:selection.path });
      save(VISITOR_SELECTION_STORAGE_KEY, JSON.stringify(visitorSelection));
      return { ...visitorSelection };
    },
    getAccountType:() => activeAccount?.type || "guest",
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
      return getPrototypeScenario(activeAccount.homeScenarioId)?.snapshot || null;
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
    async createAccount({ username, email, phone, curriculum, path, password } = {}, { signal } = {}) {
      if (accountApi) {
        const result = await accountApi.register({ username, email, phone, curriculum, path, password }, { signal });
        if (!result.ok) return result.body;
        const payload = readApiAccount(result);
        if (!payload.valid) return unavailableAccountResponse();
        useApiAccount(payload.account);
        return { status:"created", accountType:payload.account.accountType };
      }
      const identifiers = { username, email, phone };
      for (const [field, value] of Object.entries(identifiers)) {
        if (!value) continue;
        const availability = await checkAccountAvailability({ field, value });
        if (availability.status === "duplicate") return availability;
      }
      activeAccount = { type:"free", displayName:String(username || "").trim(), homeScenarioId:"student-free-new" };
      clearGuestTrial();
      saveActiveAccount();
      notify();
      return { status:"created", accountType:"free" };
    },
    getDemoAccounts:() => PROTOTYPE_DEMO_ACCOUNTS.map((account) => ({ ...account })),
    async signIn({ identifier, password } = {}, { signal } = {}) {
      if (accountApi) {
        const result = await accountApi.signIn({ identifier, password }, { signal });
        if (!result.ok) return result.body;
        const payload = readApiAccount(result);
        if (!payload.valid) return unavailableAccountResponse();
        useApiAccount(payload.account);
        return { status:"signed-in", accountType:payload.account.accountType };
      }
      const normalized = String(identifier || "").trim().toLowerCase();
      const demo = PROTOTYPE_DEMO_ACCOUNTS.find(({ identifier:username, email, phone }) => [username, email, phone].includes(normalized));
      if (!demo || String(password) !== demo.password) return { status:"invalid" };
      activeAccount = { type:demo.type, displayName:demo.displayName, homeScenarioId:demo.homeScenarioId };
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
