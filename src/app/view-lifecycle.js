// @ts-check
/** @typedef {() => void} Cleanup */
/** @typedef {{signal:AbortSignal, isCurrent:()=>boolean, add:(cleanup:Cleanup)=>void}} ViewOperation */

// Route/history and view animation remain with their existing owners.
export function createViewLifecycle() {
  /** @type {Cleanup|null} */
  let dispose = null;
  const clear = () => { const previous = dispose; dispose = null; previous?.(); };
  return Object.freeze({
    clear,
    /** @returns {ViewOperation} */
    begin() {
      clear();
      const controller = new AbortController();
      /** @type {Cleanup[]} */
      const cleanups = [];
      dispose = () => {
        controller.abort();
        for (const cleanup of cleanups.splice(0).reverse()) cleanup();
      };
      return Object.freeze({
        signal:controller.signal,
        isCurrent:() => !controller.signal.aborted,
        add(cleanup) {
          if (typeof cleanup !== "function") throw new TypeError("A view cleanup must be a function.");
          if (controller.signal.aborted) cleanup();
          else cleanups.push(cleanup);
        },
      });
    },
  });
}
