const DEFAULT_REQUEST_TIMEOUT_MS = 12_000;

function unavailable(error) {
  return { ok:false, status:0, body:{ status:"unavailable", error } };
}

/**
 * Small transport boundary for the account API. Keeping fetch, timeouts, and
 * cancellation here prevents the fixture service from knowing HTTP details.
 */
export function createAuthClient({
  baseUrl,
  fetchImpl = globalThis.fetch,
  onError = () => {},
  timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
} = {}) {
  if (!baseUrl || typeof fetchImpl !== "function") throw new TypeError("auth client dependencies are required");

  async function request(path, options = {}) {
    const requestController = new AbortController();
    const externalSignal = options.signal;
    const abortFromCaller = () => requestController.abort(externalSignal.reason);
    if (externalSignal?.aborted) abortFromCaller();
    else externalSignal?.addEventListener("abort", abortFromCaller, { once:true });
    const timeout = setTimeout(() => requestController.abort(), timeoutMs);

    try {
      const { signal:_externalSignal, ...fetchOptions } = options;
      const response = await fetchImpl(`${baseUrl}${path}`, {
        credentials:"same-origin",
        ...fetchOptions,
        signal:requestController.signal,
        headers:options.body ? { "Content-Type":"application/json", ...(options.headers || {}) } : options.headers,
      });
      const body = await response.json().catch(() => ({}));
      return { ok:response.ok, status:response.status, body };
    } catch (cause) {
      if (externalSignal?.aborted) return { ok:false, status:0, aborted:true, body:{ status:"aborted" } };
      if (requestController.signal.aborted) {
        return unavailable("استغرق الخادم وقتًا طويلًا. حاول مرة أخرى.");
      }
      onError(new Error("The account service could not be reached.", { cause }));
      return unavailable("تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.");
    } finally {
      clearTimeout(timeout);
      externalSignal?.removeEventListener("abort", abortFromCaller);
    }
  }

  return Object.freeze({
    restoreSession:({ signal } = {}) => request("/session", { signal }),
    checkAvailability(values, { signal } = {}) {
      return request("/availability", { method:"POST", body:JSON.stringify(values), signal });
    },
    register(values, { signal } = {}) {
      return request("/register", { method:"POST", body:JSON.stringify(values), signal });
    },
    signIn(values, { signal } = {}) {
      return request("/sign-in", { method:"POST", body:JSON.stringify(values), signal });
    },
    signOut:() => request("/sign-out", { method:"POST" }),
  });
}
