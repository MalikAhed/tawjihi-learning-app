import { createSplashScreen } from "./ui/splash-screen.js";
import { onboardingSources, fetchStartupAsset } from "./app/startup-assets.js";
import { waitForImage } from "./ui/media-ready.js";

const splash = createSplashScreen();
const controller = new AbortController();
window.addEventListener("pagehide", () => controller.abort(), { once:true });
window.addEventListener("pageshow", (event) => {
  if (event.persisted && controller.signal.aborted && document.querySelector("#app-splash")) location.reload();
});
const { signal } = controller;
const completed = new Set();
let application;
const params = new URLSearchParams(location.search);
const onboarding = params.get("flow") === "register" || (!params.has("page") && !params.has("subject") && !params.has("view") && !params.has("flow"));
const styles = [...document.querySelectorAll("[data-app-style]")];
const sources = onboarding ? onboardingSources() : [];
const total = styles.length + sources.length + 4;

async function bounded(task) {
  let timer;
  try {
    return await Promise.race([task(), new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("Startup timed out")), 20000);
    })]);
  } finally { clearTimeout(timer); }
}

function stylesheetReady(link) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timer);
      link.removeEventListener("load", ready);
      link.removeEventListener("error", failed);
    };
    const ready = () => { cleanup(); link.media = "all"; resolve(); };
    const failed = () => { cleanup(); reject(new Error(`Stylesheet failed: ${link.href}`)); };
    const timer = setTimeout(failed, 15000);
    link.addEventListener("load", ready, { once:true });
    link.addEventListener("error", failed, { once:true });
    if (link.sheet) ready();
    else if (link.dataset.startupAttempt) {
      const href = link.href;
      link.removeAttribute("href");
      link.href = href;
    }
    link.dataset.startupAttempt = "true";
  });
}

// Observe the current destination, including popstate during startup. Never
// release a superseded route or cover an actionable media error indefinitely.
function destinationReady() {
  return new Promise((resolve, reject) => {
    const check = () => {
      const visitor = document.querySelector("#visitor-flow-root:not([hidden])");
      const destination = visitor || document.querySelector(".lesson-view.is-visible, .coming-soon.is-visible") || document.querySelector(".course-units");
      const pending = [...destination.querySelectorAll('[data-media-state="loading"], [aria-busy="true"]')]
        .some((node) => !node.closest("[hidden]"));
      if (destination.matches('[data-media-state="loading"], [aria-busy="true"]') || pending) return;
      cleanup();
      resolve();
    };
    const observer = new MutationObserver(check);
    const abort = () => { cleanup(); reject(signal.reason); };
    const cleanup = () => { observer.disconnect(); signal.removeEventListener("abort", abort); };
    observer.observe(document.body, { subtree:true, childList:true, attributes:true, attributeFilter:["class", "hidden", "aria-busy", "data-media-state"] });
    signal.addEventListener("abort", abort, { once:true });
    if (signal.aborted) abort();
    else check();
  });
}

async function start() {
  try {
    const track = async (key, task) => {
      if (completed.has(key)) return;
      await bounded(task);
      completed.add(key);
      splash.progress(completed.size / total * 95);
    };
    const css = Promise.all(styles.map((link) => track(link.href, () => stylesheetReady(link))));
    const results = await Promise.allSettled([
      css,
      ...sources.map((source) => track(source, () => fetchStartupAsset(source, signal))),
      track("brand", async () => {
        await Promise.all([...document.querySelectorAll("#app-splash img")].map((image) => {
        if (image.complete && !image.naturalWidth) {
          const source = image.src;
          image.removeAttribute("src");
          image.src = source;
        }
        return waitForImage(image, { signal });
        }));
        splash.revealBrand();
      }),
      track("fonts", async () => {
        await css;
        await Promise.all([document.fonts.load('800 24px "Noto Sans Arabic"', "خطوة"), document.fonts.load('400 16px "Noto Sans Arabic"', "مرحبا")]);
      }),
      track("app", async () => {
        await css;
        application ||= import("./main.js");
        await application;
      }),
    ]);
    signal.throwIfAborted();
    const failed = results.find((result) => result.status === "rejected");
    if (failed) throw failed.reason;
    await track("destination", destinationReady);
    await splash.finish();
    document.querySelectorAll("[data-background-style]").forEach((link) => {
      if (link.sheet) link.media = "all";
      else link.addEventListener("load", () => { link.media = "all"; }, { once:true });
    });
    document.dispatchEvent(new Event("app:ready"));
  } catch (error) {
    if (signal.aborted) return;
    console.warn("Startup could not finish.", error);
    splash.error(() => {
      // Module evaluation errors are cached by browsers; a fresh document is
      // the reliable retry without changing routes or persisted account data.
      if (application && !completed.has("app")) location.reload();
      else void start();
    });
  }
}
void start();
