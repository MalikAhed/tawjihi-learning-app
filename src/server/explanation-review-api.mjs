import { getSessionToken, isCrossSiteRequest } from "./auth-api.mjs";
import { createAuthRateLimiter } from "./auth-rate-limiter.mjs";
import { localizeShipReady } from "../data/ship-ready-ar.js";
import { getShipReadyTemplate } from "../data/ship-ready.js";
import { hasJsonContentType, sendJson } from "./http.mjs";

export function readAuthoredReview(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const prompt = typeof value.prompt === "string" ? value.prompt.trim() : "";
  const rubric = Array.isArray(value.rubric) ? value.rubric.map((item) => typeof item === "string" ? item.trim() : "") : [];
  const maxLength = Number(value.maxLength);
  const passScore = Number(value.passScore);
  if (!title || title.length > 160 || !prompt || prompt.length > 800 || rubric.length < 1 || rubric.length > 8
    || rubric.some((item) => !item || item.length > 240) || !Number.isInteger(maxLength) || maxLength < 80 || maxLength > 2_000
    || !Number.isInteger(passScore) || passScore < 1 || passScore > 10) return null;
  return { title, prompt, rubric, maxLength, review:{ passScore } };
}

export function createExplanationReviewApi({
  reviewExplanation,
  readJsonBody,
  getTemplate = getShipReadyTemplate,
  accountStore = null,
  production = false,
  originPolicy = isCrossSiteRequest,
  clientAddress = request => request.socket?.remoteAddress || "unknown",
  rateLimiter = createAuthRateLimiter(),
} = {}) {
  if (!reviewExplanation || !readJsonBody) throw new TypeError("explanation review API dependencies are required");

  return async function handleExplanationReview(request, response) {
    if (request.method !== "POST") {
      response.writeHead(405, { Allow:"POST" }).end("Method not allowed");
      return;
    }
    if (originPolicy(request)) { sendJson(response,403,{error:"Invalid request origin."}); return; }
    const account=accountStore?.getAccountForSession(getSessionToken(request));
    if (production && (!account || account.accountType==="banned")) { sendJson(response,401,{error:"Sign in to request a review."}); return; }
    const actor=account ? `account:${account.id}` : `trial:${clientAddress(request)}`;
    const allowance=rateLimiter.consume(actor,account?"review":"trialReview");
    if(!allowance.allowed) { sendJson(response,429,{source:"unavailable",feedback:"محاولات كثيرة. حاول بعد قليل."},{"Retry-After":String(allowance.retryAfterSeconds)});return; }
    if (!hasJsonContentType(request)) {
      sendJson(response, 415, { error:"Content-Type must be application/json." });
      return;
    }
    try {
      const body = await readJsonBody(request);
      const route = typeof body.route === "string" ? body.route : "";
      const answer = typeof body.answer === "string" ? body.answer.trim() : "";
      const originalDefinition = getTemplate(route);
      const definition = body.locale === "ar" ? localizeShipReady(originalDefinition) : originalDefinition;
      const content = definition?.type === "response" ? definition.content
        : !production && route === "lesson-authoring-preview" ? readAuthoredReview(body.authoredReview) : null;
      if (!content) {
        sendJson(response, 400, { error:"Unknown explanation template." });
        return;
      }
      if (!answer || answer.length > content.maxLength) {
        sendJson(response, 400, { error:`Answer must contain 1-${content.maxLength} characters.` });
        return;
      }
      const controller=new AbortController();
      const disconnected=()=>{if(!response.writableEnded)controller.abort();};
      response.on("close",disconnected);
      try {
        const result = await reviewExplanation({ answer, content, route, actor, signal:controller.signal });
        if(!response.destroyed) sendJson(response, ["codex","provider"].includes(result.source) ? 200 : 503, result);
      } finally { response.removeListener("close",disconnected); }
    } catch (error) {
      if(response.destroyed)return;
      if(["EBUSY","ETIMEDOUT","ABORT_ERR"].includes(error?.code)) sendJson(response,503,{source:"unavailable",code:error.code,feedback:"المراجعة مشغولة الآن. حاول مجددًا بعد قليل."},{"Retry-After":"5"});
      else if (error?.code === "ETOOBIG") sendJson(response, 413, { error:"Request body is too large." });
      else if (error instanceof SyntaxError) sendJson(response, 400, { error:"Request body must be valid JSON." });
      else {
        console.error(JSON.stringify({event:"review_error",code:error.code||"UNKNOWN"}));
        sendJson(response, 500, { error:"The explanation could not be reviewed." });
      }
    }
  };
}
