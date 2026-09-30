// @ts-check
/** @param {Document} document */
export function readAppConfig(document) {
  const configuredMode = document.querySelector('meta[name="learn-account-mode"]')?.getAttribute("content");
  // GitHub Pages is a static host and cannot serve the account API. Keep the
  // source index production-ready while making stale/older Pages artifacts
  // safe to use during deployment propagation.
  const githubPagesHost = document.defaultView?.location?.hostname?.endsWith(".github.io");
  const accountMode = configuredMode === "http" && githubPagesHost ? "fixture" : configuredMode;
  if (accountMode !== "http" && accountMode !== "fixture") throw new Error("The app account mode must be http or fixture.");
  return Object.freeze({ accountMode,
    apiBase:accountMode === "http" ? new URL("api/auth", document.baseURI).pathname : null });
}
