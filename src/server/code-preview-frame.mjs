import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  CODE_PREVIEW_FRAME_PATH,
  PREVIEW_CONTROL_SOURCE,
  PREVIEW_MESSAGE_SOURCE,
} from "../ui/code-preview.js";
import { escapeHtml } from "../lib/dom.js";
import { applyCodePreviewSecurityHeaders } from "./security-headers.mjs";

const RUNNER_SOURCE = readFileSync(new URL("./code-preview-runner.js", import.meta.url), "utf8")
  .replace(/<\/script/gi, "<\\/script");

function createFrameDocument(nonce) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { height:100%; overflow:hidden; }
      * { box-sizing:border-box; }
      body { display:grid; place-items:center; margin:0; padding:28px; font-family:Arial,sans-serif; color:#35404a; background:#f7f7f7; }
    </style>
    <style data-preview-style></style>
  </head>
  <body data-control-source="${escapeHtml(PREVIEW_CONTROL_SOURCE)}" data-message-source="${escapeHtml(PREVIEW_MESSAGE_SOURCE)}">
    <main data-preview-root></main>
    <script nonce="${nonce}">${RUNNER_SOURCE}</script>
  </body>
</html>`;
}

export function handleCodePreviewFrame(request, response, pathname) {
  if (pathname !== CODE_PREVIEW_FRAME_PATH) return false;
  const nonce = randomBytes(18).toString("base64url");
  applyCodePreviewSecurityHeaders(response, nonce);
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(request.method === "HEAD" ? undefined : createFrameDocument(nonce));
  return true;
}
