import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { previewDirectory } from "./package-preview.mjs";

// Plain static artifact host: no API handlers, injected scripts or source fallback.
export async function startPreviewServer({ root = previewDirectory, prefix = "/learn-preview/" } = {}) {
  const types = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.json':'application/json', '.png':'image/png', '.webp':'image/webp', '.woff2':'font/woff2', '.ttf':'font/ttf' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
      const file = path.resolve(root, pathname.slice(prefix.length) || "index.html");
      if (!file.startsWith(path.resolve(root) + path.sep)) { response.writeHead(404).end(); return; }
      const info = await stat(file);
      const etag = `"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}"`;
      const headers = {"Content-Type":types[path.extname(file)] || "application/octet-stream", ETag:etag, "Cache-Control":"public, max-age=0, must-revalidate"};
      if (request.headers['if-none-match'] === etag) { response.writeHead(304, headers).end(); return; }
      const content = await readFile(file);
      response.writeHead(200, headers);
      response.end(content);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { base:`http://127.0.0.1:${server.address().port}${prefix}`, close:() => new Promise((resolve) => server.close(resolve)) };
}
