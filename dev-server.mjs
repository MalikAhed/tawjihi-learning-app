import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAccountStore } from "./src/server/account-store.mjs";
import { createAuthApi } from "./src/server/auth-api.mjs";
import { handleCodePreviewFrame } from "./src/server/code-preview-frame.mjs";
import { createExplanationReviewApi } from "./src/server/explanation-review-api.mjs";
import { createExplanationReviewService } from "./src/server/explanation-review.mjs";
import { readJsonBody, sendJson } from "./src/server/http.mjs";
import { createLiveReload, LIVE_RELOAD_MARKUP } from "./src/server/live-reload.mjs";
import { applySecurityHeaders } from "./src/server/security-headers.mjs";
import { createStaticFileHandler } from "./src/server/static-files.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 4173);
if (!Number.isInteger(port) || port < 0 || port > 65_535) {
  throw new TypeError("PORT must be an integer between 0 and 65535.");
}

const accountStore = createAccountStore({
  databasePath:process.env.ACCOUNTS_DATABASE_PATH || path.join(root, "data", "accounts.sqlite"),
});
const reviewExplanation = createExplanationReviewService({ projectRoot:root });
const handleAuthApi = createAuthApi({ accountStore, readJsonBody });
const handleExplanationReview = createExplanationReviewApi({ reviewExplanation, readJsonBody });
const handleStaticFile = await createStaticFileHandler({ root, htmlInjection:LIVE_RELOAD_MARKUP });
const liveReload = createLiveReload({ root });

async function handleAuthRequest(request, response, pathname) {
  try {
    await handleAuthApi(request, response, pathname);
  } catch (error) {
    if (error?.code === "ETOOBIG") sendJson(response, 413, { error:"Request body is too large." });
    else if (error instanceof SyntaxError) sendJson(response, 400, { error:"Request body must be valid JSON." });
    else {
      console.error("Could not complete the account request.", error);
      sendJson(response, 500, { error:"تعذّر إكمال الطلب. حاول مرة أخرى." });
    }
  }
}

const server = createServer(async (request, response) => {
  applySecurityHeaders(response);
  const pathname = request.url?.split("?", 1)[0] || "/";

  if (pathname.startsWith("/api/auth/")) {
    await handleAuthRequest(request, response, pathname);
    return;
  }
  if (pathname === "/api/explain-review") {
    await handleExplanationReview(request, response);
    return;
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow:"GET, HEAD" }).end("Method not allowed");
    return;
  }
  if (liveReload.handle(request, response, pathname)) return;
  if (handleCodePreviewFrame(request, response, pathname)) return;
  await handleStaticFile(request, response);
});

server.listen(port, "0.0.0.0", () => {
  const address = server.address();
  const activePort = typeof address === "object" && address ? address.port : port;
  console.log(`Live preview: http://localhost:${activePort}/`);
  console.log("Watching source files and preserving scroll position on reload.");
});

let isShuttingDown = false;
function shutDown() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  liveReload.close();
  server.close(() => {
    accountStore.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
