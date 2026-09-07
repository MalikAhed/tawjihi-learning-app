import { animateView } from "./view-motion.js";

// A bounded, low-priority warm cache. Only the next screen's images belong here.
const preloads = new Map();

export function waitForImage(image, { signal } = {}) {
  return new Promise((resolve, reject) => {
    let finished = false;
    const finish = (error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
      signal?.removeEventListener("abort", aborted);
      if (error) reject(error);
      else resolve(image);
    };
    const failed = () =>
      finish(
        new Error("Image could not load: " + (image.currentSrc || image.src)),
      );
    const aborted = () =>
      finish(signal.reason || new DOMException("Aborted", "AbortError"));
    const loaded = async () => {
      try {
        if (!image.naturalWidth) {
          failed();
          return;
        }
        await image.decode?.();
        finish();
      } catch (error) {
        finish(error);
      }
    };
    const timer = setTimeout(
      () => finish(new Error("Image loading timed out")),
      15000,
    );
    image.addEventListener("load", loaded, { once: true });
    image.addEventListener("error", failed, { once: true });
    signal?.addEventListener("abort", aborted, { once: true });
    if (signal?.aborted) aborted();
    else if (image.complete) void loaded();
  });
}

export function preloadImages(sources) {
  if (globalThis.navigator?.connection?.saveData) return;
  for (const source of new Set(sources)) {
    if (!source || preloads.has(source)) continue;
    // Fetch bytes without starting an animated SVG's playback off screen.
    const pending = fetch(source, {
      priority: "low",
      signal: AbortSignal.timeout(15000),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Prefetch failed");
        return response.arrayBuffer();
      })
      .then(() => undefined)
      .catch(() => preloads.delete(source));
    preloads.set(source, pending);
    if (preloads.size > 24) preloads.delete(preloads.keys().next().value);
  }
}

// Keeps the real layout while a named content surface waits for decoded media.
// The loading/error surface remains accessible; stale views cannot reveal later.
export function revealWhenReady(surface, { signal, onReady = () => {} } = {}) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  let status;
  const children = [...surface.children].map((element) => [
    element,
    element.inert,
  ]);
  const previousBusy = surface.getAttribute("aria-busy");
  const cleanup = () => {
    status?.remove();
    surface.classList.remove("media-pending");
    delete surface.dataset.mediaState;
    if (previousBusy === null) surface.removeAttribute("aria-busy");
    else surface.setAttribute("aria-busy", previousBusy);
    children.forEach(([element, inert]) => {
      element.inert = inert;
    });
    signal?.removeEventListener("abort", abort);
  };
  controller.signal.addEventListener("abort", cleanup, { once: true });
  if (signal?.aborted) {
    abort();
    return abort;
  }
  const images = [...surface.querySelectorAll("img")].filter(
    (image) => !image.closest("[hidden]") && image.loading !== "lazy",
  );
  const ready = () => {
    if (controller.signal.aborted || !surface.isConnected) return;
    cleanup();
    surface.dataset.mediaState = "ready";
    animateView(surface);
    onReady();
  };
  if (!images.length) {
    ready();
    return abort;
  }
  surface.classList.add("media-pending");
  surface.dataset.mediaState = "loading";
  surface.setAttribute("aria-busy", "true");
  children.forEach(([element]) => {
    element.inert = true;
  });
  status = document.createElement("div");
  status.dataset.mediaStatus = "";
  status.setAttribute("role", "status");
  status.className = "media-status";
  status.innerHTML = "<p>جارٍ تجهيز الصور…</p>";
  surface.append(status);
  const load = async () => {
    const results = await Promise.allSettled(
      images.map((image) => waitForImage(image, { signal: controller.signal })),
    );
    if (controller.signal.aborted || !surface.isConnected) return;
    const failed = images.filter(
      (_, index) => results[index].status === "rejected",
    );
    if (!failed.length) {
      ready();
      return;
    }
    surface.dataset.mediaState = "error";
    status.setAttribute("role", "alert");
    status.innerHTML =
      '<p>تعذّر تحميل بعض الصور.</p><button type="button">إعادة المحاولة</button><button type="button">متابعة بدون الصور</button>';
    const [retry, skip] = status.querySelectorAll("button");
    retry.onclick = () => {
      surface.dataset.mediaState = "loading";
      status.setAttribute("role", "status");
      status.innerHTML = "<p>جارٍ تجهيز الصور…</p>";
      failed.forEach((image) => {
        const source = image.src;
        image.removeAttribute("src");
        image.src = source;
      });
      void load();
    };
    skip.onclick = () => {
      failed.forEach((image) => {
        const fallback = document.createElement("span");
        fallback.className = "media-fallback";
        fallback.textContent = image.alt || "الصورة غير متاحة";
        image.replaceWith(fallback);
      });
      ready();
    };
  };
  void load();
  return abort;
}
