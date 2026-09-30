const DIRECTIVE_TYPES = new Set(["mcq", "true-false", "exam-question"]);
const CONTENT_DIRECTIVE_TYPES = new Set(["tip", "note", "remember", "warning", "mistake", "security", "accessibility", "reveal"]);
const STEP_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHARED_QUESTION_FIELDS = ["id", "title", "question", "prompt", "kicker", "explanation", "hint"];
const DIRECTIVE_FIELDS = new Map([
  ["mcq", new Set([...SHARED_QUESTION_FIELDS, "example", "reference"])],
  ["true-false", new Set([...SHARED_QUESTION_FIELDS, "answer", "example"])],
  ["exam-question", new Set(["id", "title", "question", "reference", "body", "solution", "guidance", "answer-label"])],
]);

function slug(value, fallback) {
  const result = String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
  return result || fallback;
}

function field(source, name, fallback = "") {
  const match = new RegExp(`^${name}:[ \\t]*(.+)$`, "im").exec(source);
  return match?.[1]?.trim() || fallback;
}

function section(source, name, boundaries = null) {
  const lines = source.split("\n");
  const start = lines.findIndex((line) => new RegExp(`^${name}:[ \\t]*$`, "i").test(line));
  if (start < 0) return [];
  const result = [];
  let fenced = false;
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^```/.test(line.trim())) fenced = !fenced;
    const boundary = /^([a-z][a-z0-9-]*):[ \t]*(?:.*)$/i.exec(line)?.[1]?.toLowerCase();
    if (!fenced && boundary && !["http", "https"].includes(boundary) && (!boundaries || boundaries.includes(boundary))) break;
    result.push(line);
  }
  return result;
}

function checkboxItems(source) {
  return source.split("\n").map((line) => {
    const match = /^\s*-\s+\[([ xX])\]\s+(.+)$/.exec(line);
    if (!match) return null;
    const text = match[2].trim();
    const explicitId = /^([a-z0-9]+(?:-[a-z0-9]+)*)\s*\|\s*(.+)$/i.exec(text);
    return { checked:match[1].toLowerCase() === "x", id:explicitId?.[1] || "", text:explicitId?.[2]?.trim() || text };
  }).filter(Boolean);
}

function validateDirectiveFields(source, type, index, issues) {
  const allowed = DIRECTIVE_FIELDS.get(type);
  // Exam body/solution are literal multiline Markdown, including labels like
  // "Patients:" from the paper, not additional authoring metadata.
  if (type === "exam-question") source = source.split(/^body:[ \t]*$/m)[0];
  let fenced = false;
  source.split("\n").forEach((line) => {
    if (/^```/.test(line.trim())) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;
    const match = /^([a-z][a-z0-9-]*):(?:[ \t].*)?$/i.exec(line.trim());
    const name = match?.[1]?.toLowerCase();
    if (name && !allowed.has(name) && name !== "http" && name !== "https") {
      issues.push(`Step ${index + 1} (${type}) uses unsupported field “${name}”.`);
    }
  });
}

function validateDirectiveBody(source, type, index, issues) {
  if (containsRawHtml(source)) {
    issues.push(`Step ${index + 1} (${type}) must not contain raw HTML outside a fenced lesson example.`);
  }
  let fenced = false;
  source.split("\n").forEach((line) => {
    if (/^```/.test(line.trim())) {
      fenced = !fenced;
      return;
    }
    if (!fenced && /^:::[a-z][a-z0-9-]*/i.test(line.trim())) {
      issues.push(`Step ${index + 1} (${type}) must not contain a nested lesson directive.`);
    }
  });
}

function validateContentDirectiveBlocks(source, issues) {
  let active = "";
  let fenced = false;
  source.split("\n").forEach((line) => {
    if (/^```/.test(line.trim())) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;
    if (/^:::\s*$/.test(line.trim())) {
      active = "";
      return;
    }
    const opening = /^:::([a-z][a-z0-9-]*)(?:[ \t]+.*)?$/i.exec(line.trim());
    const type = opening?.[1]?.toLowerCase();
    if (!type || !CONTENT_DIRECTIVE_TYPES.has(type)) return;
    if (active) issues.push(`Content directive :::${type} must not be nested inside :::${active}.`);
    else active = type;
  });
  if (active) issues.push(`The :::${active} block is missing its closing :::.`);
}

function containsRawHtml(source) {
  let fenced = false;
  return source.split("\n").some((line) => {
    if (/^```/.test(line.trim())) {
      fenced = !fenced;
      return false;
    }
    if (fenced) return false;
    const withoutInlineCode = line.replace(/`[^`\n]*`/g, "");
    return /<\/?[A-Za-z][A-Za-z0-9-]*(?=\s|\/?>)/.test(withoutInlineCode);
  });
}

function commonConfig(source, type, index) {
  const title = field(source, "title", type === "mcq" ? "Knowledge check" : "Practice step");
  return {
    kicker:field(source, "kicker", type === "mcq" ? "KNOWLEDGE CHECK · CHOOSE ONE" : "PRACTICE"),
    title,
    prompt:field(source, "question", field(source, "prompt", title)),
    mascot:field(source, "mascot", "Take it one step at a time."),
    correctFeedback:field(source, "explanation", "Correct."),
    wrongFeedback:field(source, "hint", "Review the lesson and try again."),
    authoringId:`authored-${type}-${index + 1}`,
  };
}

function parseMcq(source, type, index, issues) {
  const config = commonConfig(source, "mcq", index);
  const reference = field(source, "reference");
  if (reference) config.reference = reference;
  const example = section(source, "example").join("\n").trim();
  if (example) config.example = example;
  config.phase = "practice";
  config.critical = false;
  let choices = checkboxItems(source);
  if (type === "true-false") {
    if (choices.length > 0) issues.push(`Step ${index + 1} (true-false) must use answer: true or answer: false instead of checkbox choices.`);
    const answer = field(source, "answer").toLowerCase();
    if (!["true", "false"].includes(answer)) issues.push(`Step ${index + 1} (true-false) answer must be true or false.`);
    choices = ["true", "false"].map((value) => ({ checked:value === answer, id:value, text:value === "true" ? "True" : "False" }));
  }
  if (choices.length < 2) issues.push(`Step ${index + 1} (${type}) needs at least two answer choices.`);
  if (type === "mcq" && choices.filter((choice) => choice.checked).length !== 1) issues.push(`Step ${index + 1} (${type}) must mark exactly one answer with [x].`);
  const explicitIds = choices.map((choice) => choice.id).filter(Boolean);
  if (new Set(explicitIds).size !== explicitIds.length) issues.push(`Step ${index + 1} (${type}) answer ids must be unique.`);
  const used = new Set();
  config.answers = choices.map((choice, choiceIndex) => {
    let id = choice.id || slug(choice.text, `choice-${choiceIndex + 1}`);
    while (used.has(id)) id = `${id}-${choiceIndex + 1}`;
    used.add(id);
    const text = /^https?:\/\/[^\s]+$/i.test(choice.text) ? `\`${choice.text}\`` : choice.text;
    return { id, text, correct:choice.checked };
  });
  config.idleFeedback = "Select the best answer, then check your choice.";
  config.selectedFeedback = "Answer selected. Check it when you are ready.";
  return { type:"mcq", content:config };
}

function parseDirective(type, source, index, issues) {
  validateDirectiveFields(source, type, index, issues);
  validateDirectiveBody(source, type, index, issues);
  if (type === "mcq" || type === "true-false") return parseMcq(source, type, index, issues);
  if (type === "exam-question") {
    const content = {
      title:field(source, "title"), prompt:field(source, "question"),
      reference:field(source, "reference"), answerLabel:field(source, "answer-label"),
      body:section(source, "body", ["solution", "guidance"]).join("\n").trim(),
      solution:section(source, "solution", ["guidance"]).join("\n").trim(),
      guidance:section(source, "guidance", []).join("\n").trim(),
    };
    for (const key of ["reference", "answerLabel", "body", "solution"]) {
      if (!content[key]) issues.push(`Step ${index + 1} (exam-question) needs ${key}.`);
    }
    return { type:"exam-question", content };
  }
  return null;
}

function isLessonVideoUrl(value) {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase().replace(/^(?:www\.|m\.)/, '');
    const path = url.pathname.split('/').filter(Boolean);
    const id = host === 'youtu.be' ? path[0]
      : host === 'youtube.com' && url.pathname === '/watch' ? url.searchParams.get('v')
        : host === 'youtube.com' && ['embed', 'shorts', 'live'].includes(path[0]) ? path[1] : '';
    return /^[A-Za-z0-9_-]{11}$/.test(id || '');
  } catch {
    return false;
  }
}

function validateVideoIntro(body, index, issues) {
  const lines = body.split('\n');
  if (!/^#\s+[^\n]+$/.test(lines.shift() || '')) {
    issues.push(`Explanation step ${index + 1} (video-intro) needs exactly one level-one lesson title.`);
    return false;
  }
  while (lines[0]?.trim() === '') lines.shift();
  if (/^https?:\/\/\S+$/i.test(lines[0] || '')) {
    if (!isLessonVideoUrl(lines.shift())) {
      issues.push(`Explanation step ${index + 1} (video-intro) needs a supported YouTube URL immediately after its title.`);
      return false;
    }
  }
  const invalid = lines.some((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (/^https?:\/\/\S+$/i.test(trimmed)) return true;
    if (/^(?:#{1,6}\s|:::|```|~~~|>\s|!\[|\d+[.)]\s|[-*_]{3,}$|\|)/.test(trimmed)) return true;
    if (/^(?:[-*+]\s+)?!\[/.test(trimmed)) return true;
    return false;
  });
  if (invalid) {
    issues.push(`Explanation step ${index + 1} (video-intro) may include only paragraphs and bullet links after one YouTube URL; no extra video or heading.`);
  }
  return !invalid;
}

function markdownStep(source, index, issues) {
  const heading = /^#{1,3}\s+(.+)$/m.exec(source)?.[1]?.replace(/[*_`]/g, "").trim();
  const explicitId = /^<!--\s*step-id:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*-->$/im.exec(source)?.[1];
  const markers = [...source.matchAll(/^<!--\s*presentation:\s*(.*?)\s*-->$/gim)];
  const presentation = markers[0]?.[1];
  const step = { type:"markdown", id:explicitId || `authored-content-${index + 1}`, title:heading || `Lesson content ${index + 1}`, source:source.trim() };
  if (markers.length > 1) issues.push(`Explanation step ${index + 1} can select only one presentation.`);
  const supportedPresentations = new Set(["rocky-dialogue", "video-intro", "lesson-summary"]);
  if (presentation !== undefined && !supportedPresentations.has(presentation)) {
    issues.push(`Explanation step ${index + 1} uses unsupported presentation “${presentation}”.`);
  }
  if (presentation === "rocky-dialogue") {
    // A dialogue is content: one heading, illustration and note. The renderer owns its structure.
    const body = source.replace(/^<!--\s*(?:step-id|presentation):.*?-->\s*$/gim, "").trim();
    const match = /^#\s+[^\n]+\n\s*(!\[[^\]\n]+\]\([^\n]+\))\s*\n\s*:::note(?:[ \t]+[^\n]+)?\n([\s\S]+?)\n:::\s*$/.exec(body);
    if (!match) issues.push(`Explanation step ${index + 1} (rocky-dialogue) needs one heading, one image with alt text, and one non-empty :::note dialogue.`);
    else {
      step.presentation = presentation;
      step.dialogue = { image: match[1], source: match[2].trim() };
    }
  }
  if (presentation === "video-intro") {
    const body = source.replace(/^<!--\s*(?:step-id|presentation):.*?-->\s*$/gim, "").trim();
    if (validateVideoIntro(body, index, issues)) step.presentation = presentation;
  }
  if (presentation === "lesson-summary") step.presentation = presentation;
  return step;
}

function validatePublishedFields(chunks, issues) {
  const feedbackTypes = new Set(["mcq", "true-false"]);
  chunks.forEach((chunk, index) => {
    if (chunk.kind === "markdown") {
      if (!/^<!--\s*step-id:\s*[a-z0-9]+(?:-[a-z0-9]+)*\s*-->$/im.test(chunk.source)) {
        issues.push(`Published explanation step ${index + 1} needs <!-- step-id: stable-kebab-id -->.`);
      }
      return;
    }
    const required = ["id", "title", "question-or-prompt"];
    if (feedbackTypes.has(chunk.type)) required.push("explanation", "hint");
    required.forEach((name) => {
      const present = name === "question-or-prompt"
        ? Boolean(field(chunk.source, "question") || field(chunk.source, "prompt"))
        : Boolean(field(chunk.source, name));
      if (!present) {
        const label = name === "question-or-prompt" ? "question or prompt" : name;
        issues.push(`Published step ${index + 1} (${chunk.type}) needs a non-empty ${label} field.`);
      }
    });
  });
}

export function parseLessonMarkdown(source, { published = false } = {}) {
  const lines = String(source).replace(/\r\n?/g, "\n").split("\n");
  const chunks = [];
  const issues = [];
  let markdown = [];
  let fenced = false;

  const flushMarkdown = () => {
    const value = markdown.join("\n").trim();
    if (value) {
      if (containsRawHtml(value)) issues.push("Lesson Markdown must not contain raw HTML; use supported Markdown or a lesson directive instead.");
      validateContentDirectiveBlocks(value, issues);
      chunks.push({ kind:"markdown", source:value });
    }
    markdown = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^```/.test(line.trim())) fenced = !fenced;
    if (!fenced && /^<!--\s*lesson-step\s*-->$/i.test(line.trim())) {
      flushMarkdown();
      continue;
    }
    const anyOpening = !fenced ? /^:::([a-z][a-z0-9-]*)(?:[ \t]+.*)?$/i.exec(line.trim()) : null;
    const openingType = anyOpening?.[1]?.toLowerCase();
    const opening = !fenced ? /^:::(\S+)\s*$/.exec(line.trim()) : null;
    if (anyOpening && !DIRECTIVE_TYPES.has(openingType) && !CONTENT_DIRECTIVE_TYPES.has(openingType)) {
      issues.push(`Unsupported lesson directive :::${openingType}.`);
    } else if (anyOpening && DIRECTIVE_TYPES.has(openingType) && !opening) {
      issues.push(`Interactive directive :::${openingType} must open on a line by itself.`);
    }
    if (!opening || !DIRECTIVE_TYPES.has(opening[1].toLowerCase())) {
      markdown.push(line);
      continue;
    }
    flushMarkdown();
    const type = opening[1].toLowerCase();
    const body = [];
    let closed = false;
    let directiveFence = false;
    for (index += 1; index < lines.length; index += 1) {
      const directiveLine = lines[index];
      if (/^```/.test(directiveLine.trim())) directiveFence = !directiveFence;
      if (!directiveFence && /^:::\s*$/.test(directiveLine.trim())) { closed = true; break; }
      body.push(directiveLine);
    }
    if (!closed) issues.push(`The :::${type} block is missing its closing :::.`);
    chunks.push({ kind:"directive", type, source:body.join("\n") });
  }
  flushMarkdown();
  if (published) validatePublishedFields(chunks, issues);

  const steps = chunks.map((chunk, index) => chunk.kind === "markdown"
    ? markdownStep(chunk.source, index, issues)
    : { ...parseDirective(chunk.type, chunk.source, index, issues), id:field(chunk.source, "id", `authored-${chunk.type}-${index + 1}`) }).filter(Boolean);
  const stepIds = steps.map((step) => step.id);
  if (new Set(stepIds).size !== stepIds.length) issues.push("Every authored lesson step needs a unique id.");
  if (stepIds.some((id) => !STEP_ID_PATTERN.test(id))) issues.push("Every authored lesson step id must use lowercase kebab-case.");
  const documentSource = chunks.filter((chunk) => chunk.kind === "markdown").map((chunk) => chunk.source).join("\n\n---\n\n");
  if (steps.length === 0) issues.push("Add Markdown content or an interactive directive to create a lesson.");
  return { steps, issues, documentSource };
}

export const LESSON_AUTHORING_DIRECTIVES = Object.freeze([...DIRECTIVE_TYPES]);
export const LESSON_CONTENT_DIRECTIVES = Object.freeze([...CONTENT_DIRECTIVE_TYPES]);
