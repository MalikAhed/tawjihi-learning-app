// @ts-check
/** @param {Document} document */
export function readAppConfig(document) {
  const accountMode = document.querySelector('meta[name="learn-account-mode"]')?.getAttribute("content");
  if (accountMode !== "http" && accountMode !== "fixture") throw new Error("The app account mode must be http or fixture.");
  return Object.freeze({ accountMode, apiBase:accountMode === "http" ? new URL("api/auth", document.baseURI).pathname : null });
}
