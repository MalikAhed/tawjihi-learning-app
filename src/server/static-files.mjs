import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

const MIME_TYPES = Object.freeze({
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".zip": "application/zip",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
});
const PUBLIC_DEPENDENCIES = new Set([
  "/node_modules/dompurify/dist/purify.es.mjs",
  "/node_modules/@highlightjs/cdn-assets/es/highlight.min.js",
  "/node_modules/marked/lib/marked.esm.js",
  "/node_modules/@vscode/codicons/dist/codicon.ttf",
]);
const PUBLIC_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".ttf",
  ".woff",
  ".woff2",
]);

export function resolvePublicFilePath(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]).replaceAll(
    "\\",
    "/",
  );
  if (decoded.includes("\0"))
    throw new URIError("URL paths cannot contain null bytes");
  const normalizedPath = path.posix.normalize(
    `/${decoded.replace(/^\/+/, "")}`,
  );
  const isApplicationFile =
    normalizedPath.startsWith("/assets/") ||
    (normalizedPath.startsWith("/src/") &&
      !normalizedPath.startsWith("/src/server/"));
  const isPublic =
    normalizedPath === "/" ||
    normalizedPath === "/index.html" ||
    PUBLIC_DEPENDENCIES.has(normalizedPath) ||
    (isApplicationFile &&
      PUBLIC_EXTENSIONS.has(path.posix.extname(normalizedPath).toLowerCase()));
  if (!isPublic) return null;
  const relative =
    normalizedPath === "/" ? "index.html" : normalizedPath.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  return resolved === root || resolved.startsWith(`${root}${path.sep}`)
    ? resolved
    : null;
}

export async function createStaticFileHandler({
  root,
  htmlInjection = "",
} = {}) {
  if (!root) throw new TypeError("static file root is required");
  const realRoot = await fs.realpath(root);

  return async function handleStaticFile(request, response) {
    let filePath;
    try {
      filePath = resolvePublicFilePath(root, request.url || "/");
    } catch (error) {
      if (error instanceof URIError) {
        response.writeHead(400).end("Bad request");
        return;
      }
      throw error;
    }
    if (!filePath) {
      response.writeHead(404).end("Not found");
      return;
    }

    try {
      const target = filePath;
      const realTarget = await fs.realpath(target);
      if (
        realTarget !== realRoot &&
        !realTarget.startsWith(`${realRoot}${path.sep}`)
      ) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const stat = await fs.stat(realTarget);
      if (!stat.isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      const extension = path.extname(realTarget).toLowerCase();
      response.setHeader(
        "Content-Type",
        MIME_TYPES[extension] || "application/octet-stream",
      );
      // Revalidate public assets, so prefetch/revisits reuse bytes while edits
      // still appear immediately. Session APIs and injected HTML stay private.
      response.setHeader(
        "Cache-Control",
        extension === ".html" ? "no-store" : "no-cache",
      );
      if (extension === ".html") {
        const html = await fs.readFile(realTarget, "utf8");
        response.end(
          request.method === "HEAD"
            ? undefined
            : html.replace("</body>", `${htmlInjection}</body>`),
        );
        return;
      }
      const etag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;
      response.setHeader("ETag", etag);
      if (
        request.headers["if-none-match"]
          ?.split(/\s*,\s*/)
          .some((value) => value === etag || value === "*")
      ) {
        response.writeHead(304).end();
        return;
      }
      if (request.method === "HEAD") {
        response.end();
        return;
      }
      const stream = createReadStream(realTarget);
      stream.on("error", (error) => {
        console.error("Could not stream the requested file.", error);
        if (!response.headersSent)
          response.writeHead(500).end("Internal server error");
        else response.destroy(error);
      });
      stream.pipe(response);
    } catch (error) {
      if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
        response.writeHead(404).end("Not found");
        return;
      }
      console.error("Could not serve the requested file.", error);
      response.writeHead(500).end("Internal server error");
    }
  };
}
