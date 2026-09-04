import { watch } from "node:fs";

export const LIVE_RELOAD_MARKUP = '<script src="/__codex_live_reload.js"></script>';

const LIVE_RELOAD_CLIENT = `
window.__FULL_STACK_QUEST_DEV__ = true;
(() => {
  const key = "codex-preview-scroll:" + location.pathname + location.search;
  history.scrollRestoration = "manual";
  const saveScroll = () => sessionStorage.setItem(key, String(window.scrollY));
  const restoreScroll = () => {
    const saved = Number(sessionStorage.getItem(key));
    if (Number.isFinite(saved) && saved > 0) window.scrollTo(0, saved);
  };
  addEventListener("scroll", saveScroll, { passive:true });
  addEventListener("load", () => {
    requestAnimationFrame(() => requestAnimationFrame(restoreScroll));
    setTimeout(restoreScroll, 180);
    setTimeout(restoreScroll, 500);
  }, { once:true });
  const updates = new EventSource("/__codex_reload");
  updates.addEventListener("reload", () => {
    saveScroll();
    sessionStorage.setItem("tawjihi:codex-live-reload", "1");
    location.reload();
  });
})();`;

function shouldReload(filename) {
  const normalized = String(filename).replaceAll("\\", "/");
  if (!normalized || ["artifacts/", "codex screen shots/", "tmp/"].some((directory) => normalized.startsWith(directory))) return false;
  if (normalized.startsWith(".git/") || normalized.includes("/.git/")) return false;
  return /\.(?:css|html|js|json|mjs|png|jpe?g|svg|webp)$/i.test(normalized);
}

export function createLiveReload({ root, watchFiles = watch } = {}) {
  if (!root) throw new TypeError("live reload root is required");
  const clients = new Set();
  let reloadTimer;
  const watcher = watchFiles(root, { recursive:true }, (_event, filename = "") => {
    if (!shouldReload(filename)) return;
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      for (const client of clients) client.write("event: reload\ndata: changed\n\n");
    }, 120);
  });

  function handle(request, response, pathname) {
    if (pathname === "/__codex_live_reload.js") {
      response.writeHead(200, { "Content-Type":"text/javascript; charset=utf-8", "Cache-Control":"no-store" });
      response.end(request.method === "HEAD" ? undefined : LIVE_RELOAD_CLIENT);
      return true;
    }
    if (pathname !== "/__codex_reload") return false;
    if (request.method === "HEAD") {
      response.writeHead(200, { "Content-Type":"text/event-stream", "Cache-Control":"no-cache" }).end();
      return true;
    }
    response.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
    });
    response.write("retry: 500\n\n");
    clients.add(response);
    request.on("close", () => clients.delete(response));
    return true;
  }

  return Object.freeze({
    handle,
    close() {
      clearTimeout(reloadTimer);
      watcher.close();
      clients.forEach((client) => client.end());
      clients.clear();
    },
  });
}
