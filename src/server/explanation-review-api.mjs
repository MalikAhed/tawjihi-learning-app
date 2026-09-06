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
} = {}) {
  if (!reviewExplanation || !readJsonBody) throw new TypeError("explanation review API dependencies are required");

  return async function handleExplanationReview(request, response) {
    if (request.method !== "POST") {
      response.writeHead(405, { Allow:"POST" }).end("Method not allowed");
      return;
    }
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
        : route === "lesson-authoring-preview" ? readAuthoredReview(body.authoredReview) : null;
      if (!content) {
        sendJson(response, 400, { error:"Unknown explanation template." });
        return;
      }
      if (!answer || answer.length > content.maxLength) {
        sendJson(response, 400, { error:`Answer must contain 1-${content.maxLength} characters.` });
        return;
      }
      const result = await reviewExplanation({ answer, content, route });
      sendJson(response, result.source === "codex" ? 200 : 503, result);
    } catch (error) {
      if (error?.code === "ETOOBIG") sendJson(response, 413, { error:"Request body is too large." });
      else if (error instanceof SyntaxError) sendJson(response, 400, { error:"Request body must be valid JSON." });
      else {
        console.error("Could not review the explanation.", error);
        sendJson(response, 500, { error:"The explanation could not be reviewed." });
      }
    }
  };
}
