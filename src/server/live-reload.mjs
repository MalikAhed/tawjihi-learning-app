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
  let currentRevision = null;
  let reloading = false;
  const reload = () => {
    if (reloading) return;
    reloading = true;
    saveScroll();
    sessionStorage.setItem("tawjihi:codex-live-reload", "1");
    location.reload();
  };
  updates.addEventListener("reload", reload);
  const checkRevision = async () => {
    try {
      const response = await fetch("/__codex_revision", { cache:"no-store" });
      if (!response.ok) return;
      const nextRevision = await response.text();
      if (currentRevision === null) currentRevision = nextRevision;
      else if (nextRevision !== currentRevision) reload();
    } catch {}
  };
  checkRevision();
  setInterval(checkRevision, 750);
})();`;

function shouldReload(filename) {
  const normalized = String(filename).replaceAll("\\", "/");
  // Watch runtime inputs only. Editing a backup, export, test, or dependency
  // must not interrupt the page currently being reviewed.
  if (!["index.html", "dev-server.mjs"].includes(normalized)
    && !normalized.startsWith("src/") && !normalized.startsWith("assets/")) return false;
  if (normalized.split("/").some((part) => part.startsWith("."))) return false;
  return /\.(?:css|html|js|json|mjs|png|jpe?g|svg|webp)$/i.test(normalized);
}

export function createLiveReload({ root, watchFiles = watch } = {}) {
  if (!root) throw new TypeError("live reload root is required");
  const clients = new Set();
  let revision = 0;
  let reloadTimer;
  const watcher = watchFiles(root, { recursive:true }, (_event, filename = "") => {
    if (!shouldReload(filename)) return;
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      revision += 1;
      for (const client of clients) client.write("event: reload\ndata: changed\n\n");
    }, 120);
  });

  function handle(request, response, pathname) {
    if (pathname === "/__codex_live_reload.js") {
      response.writeHead(200, { "Content-Type":"text/javascript; charset=utf-8", "Cache-Control":"no-store" });
      response.end(request.method === "HEAD" ? undefined : LIVE_RELOAD_CLIENT);
      return true;
    }
    if (pathname === "/__codex_revision") {
      response.writeHead(200, { "Content-Type":"text/plain; charset=utf-8", "Cache-Control":"no-store" });
      response.end(request.method === "HEAD" ? undefined : String(revision));
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
      "Content-Encoding":"identity",
      "X-Accel-Buffering":"no",
    });
    // Some HTTPS tunnel proxies wait for a larger first chunk before they begin
    // streaming. Padding this comment makes reload events reach phone previews
    // immediately without changing EventSource semantics.
    response.write(`: ${" ".repeat(2048)}\nretry: 500\n\n`);
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
