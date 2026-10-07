# Lesson Markdown authoring contract

Authors provide content. The app owns the shell, progress, navigation, controls, feedback, spacing, typography, motion, accessibility and responsive layout.

The content pipeline is:

```text
Markdown source → lesson-authoring parser → existing StepRenderer → locked template shell
```

## Source-to-question pipeline for any subject

Use this workflow for supplied textbooks, past papers, worksheets, summaries and answer keys. It is an authoring procedure using existing components, not an automatic extraction service. The source restrictions here take precedence over the general authoring examples below. Never invent practice questions, scenarios, numbers, distractors or unsupported answers.

1. **Define scope first.** Identify the main textbook, edition, subject and required lessons from the supplied requirements and current subject roadmap. Record included lessons and their printed/PDF page ranges; distinguish PDF page numbers from printed labels. Resolve missing scope before selecting questions. Inventory only the supplied resources for this subject and identify each answer key.
2. **Visually review the entire main book.** Render and open every page as an image, in order, including covers, contents, activities, review pages and appendices. Zoom until small text, symbols, tables and diagrams are legible. Text extraction, OCR, search results and thumbnail sheets do not count as page review. Mark each page reviewed only after actually viewing it; record excluded pages with their scope reason. Select questions only for the required lessons, retaining relevant shared context from adjacent pages.
3. **Complete textbook questions first.** Inventory every in-scope question and explicit subpart, including questions embedded in activities and worked examples. Preserve wording, conditions, units, symbols, original choices and shared figures. Do not turn ordinary exposition into new questions. Map each source item to a stable lesson/part and question ID. Verify answers against visually reviewed supplied answer keys or explicit textbook evidence; record the evidence page. Unreadable questions, missing answer evidence and unresolved source conflicts remain blocked, never guessed or silently omitted.
4. **Crop original visuals.** Extract or crop the actual source image/page pixels, never redraw, trace or regenerate them. Include all required labels, axes, legends, units, arrows, captions and table cells, with a small clean margin. Exclude unrelated questions and answer keys from the prompt crop. Keep multiple figures and continuation crops in reading order. Inspect each crop at full size against its source, then in the question at desktop and mobile widths; confirm readability and working enlargement. If the scan is poor, retain a blocked item rather than fabricate missing detail. Put prompt figures on the front and solution figures on the back/answer. Alt text describes the figure without revealing the answer; transcribed text does not replace the original visual.
5. **Use the existing ICT formats.** Original single-answer MCQs keep their supplied choices and verified correct option. Written, drawing, calculation and multi-answer questions use the existing `exam-question` flashcard, with the original prompt in `body` and the supported answer in `solution`. Convert a written item to MCQ only when supplied material supports the prompt, correct answer and every alternative without inventing content or changing what is tested; otherwise retain a flashcard. Each source question appears once, as either an MCQ or a flashcard, following ICT. Split only explicit subparts, keeping all shared context; do not add a combined duplicate alongside them.
6. **Review supplementary sources second.** Once textbook items are accounted for, visually inspect every page of each additional supplied resource, including its answers, with the same page ledger and crop requirements. Map questions to the required textbook lessons. Add only relevant questions absent from the textbook bank and all previously processed sources. Record excluded and duplicate items with reasons; a new resource does not expand the approved lesson scope.
7. **Audit duplicates across the whole subject.** Compare against existing published questions as well as this batch. Compare wording, choices, correct answer, requested task, figures, values and context. Ignore cosmetic whitespace, Arabic diacritics/tatweel, numbering and reordered options when finding candidates, but do not alter displayed source text. Visually inspect paraphrases and identical diagrams; string matching alone is insufficient. Keep materially different tasks or data distinct. Prefer the textbook as the canonical source for new duplicates and retain all source citations. Preserve existing published IDs and progress; do not delete or rename a published question to resolve duplication. Record which canonical item covers each duplicate and resolve conflicting answer keys before inclusion.
8. **Reconcile and verify.** Every page must have a visual-review disposition; every in-scope source question/subpart must map to an included canonical item, a recorded duplicate, or a visible blocker. Check that total inventoried items equals included items plus duplicate occurrences plus blocked items, with exclusions counted separately. Reopen source pages alongside final questions to verify prompts, answers, choices, symbols, crops and citations. Run the existing lesson parser/build checks and focused desktop/mobile MCQ and flashcard checks for integrated content. Report missing pages, blocked questions and unrun checks; never claim full coverage while they remain. Publishing/deployment is a separate user request.

Keep the following evidence with the subject's existing coverage records and crop manifest. These are review records, not extra fields to add to directives or new student UI:

| Record | Required evidence |
| --- | --- |
| Scope | Subject, book/edition, required lessons, printed and PDF page ranges, supplied source files |
| Page review | Source file, PDF/image page, printed label, visually reviewed status, lesson or exclusion reason, question/figure/answer references |
| Question | Stable ID, lesson/part, source/page/question/subpart, original prompt, format, answer evidence, figure paths, canonical duplicate ID or blocker |
| Crop | Output file, source file, one-based page, bounding rectangle and coordinate units, ordered clips, visual-review result |
| Completion | Pages reviewed/total, source items inventoried, included items, duplicates, exclusions, blockers and verification results |

ICT's crop convention is `assets/lessons/ict/exams/source-crops/sources.json`: `file`, `source`, and ordered `clips` containing `page` and `rect` in PDF points. Reuse that convention under the relevant subject; record provenance for every prompt and solution crop. Keep original source files available for checking.

### Ready-to-fill ICT component templates

Replace all `{{...}}` placeholders with verified source content and stable IDs. These are content templates, not new HTML/CSS. Use only the existing parser, MCQ controller, `src/ui/lesson/exam-question.js`, template shell and their styles. Do not copy renderers, add subject-specific UI, or add new controls. The ICT bank adapter in `src/data/lessons/ict/exam-lessons.js` is ICT-specific; for another subject, supply the same supported Markdown through the existing lesson registration contract below without copying that adapter or its hard-coded paths.

```md
:::mcq
id: {{stable-question-id}}
title: {{source-label}}
kicker: {{source-label}}
reference: [{{source-page-label}}]({{original-source-url}})
question: {{source-question-on-one-line}}
- [ ] option-1 | {{original-incorrect-choice}}
- [x] option-2 | {{original-correct-choice}}
explanation: {{source-supported-answer-and-reason}}
hint: {{neutral-reading-instruction}}
example:
![{{original-figure-alt}}]({{original-figure-crop-path}})
:::
```

Keep the actual number/order of supplied choices and mark the verified answer, wherever it occurs; the two rows above are placeholders only. Omit the whole `example:` section when no figure exists. Put original figures in this existing section; use a flashcard if the prompt cannot fit the supported MCQ content contract faithfully.

```md
:::exam-question
id: {{stable-question-id}}
title: {{source-label}}
question: {{short-question-heading}}
reference: [{{source-page-label}}]({{original-source-url}})
answer-label: {{accurate-answer-provenance-label}}
body:
{{original-question-and-shared-context}}

![{{original-figure-alt}}]({{original-figure-crop-path}})
solution:
{{verified-source-supported-answer}}
:::
```

Omit the image line when absent; include original solution crops under `solution:` when needed. An answer derived from explicit book evidence must be labelled accordingly, not presented as a printed answer key. Document source corrections with their evidence; if the supplied sources cannot resolve the conflict, keep the item blocked.

## Existing component owners

| Responsibility | Existing source of truth |
| --- | --- |
| Content/footer shell | `src/ui/template-shell.js` |
| Question markup | `src/ui/lesson/question-layout.js` |
| MCQ interactions | `src/ui/lesson/question.js` |
| Written question cards | `src/ui/lesson/exam-question.js` |
| Lesson flow/progress | `src/ui/lesson-view.js`, `src/ui/lesson/authored.js` |
| Markdown sanitizing | `src/markdown/renderer.js` |
| Declarative lesson parsing | `src/markdown/lesson-authoring.js` |

Published question courses use single-choice MCQs, true/false through that same controller, and original written question flashcards. The learner explicitly reviews a flashcard answer before continuing; MCQ feedback preserves correct/incorrect progress rules. The app owns progress and layout. Experimental galleries, source editors, code exercises and external answer grading have been removed.

## Normal lesson content

Write regular Markdown for headings, paragraphs, lists, tasks, tables, emphasis, links, images, and fenced code. Existing callouts, reveals, technical terms, and standalone YouTube links continue to work.

```md
# HTTP Requests

The browser sends an **HTTP request** to a server.

:::tip Keep this in mind
The application controls how this callout looks.
:::

An [[term: origin | A URL's scheme, host, and port.]] controls same-origin checks.
```

Supported content syntax includes:

- `#` through `######` headings, paragraphs, blockquotes, horizontal rules, ordered and unordered lists, and GFM task lists and tables.
- `**bold**`, `*emphasis*`, `~~strikethrough~~`, inline code, and normal Markdown links.
- `![Useful alt text](assets/lessons/day-001/request-flow.png)` for local or HTTPS images. There is no Mermaid or generated-image directive; save a generated diagram as an asset and reference it with normal image syntax.
- Fenced code. Put the language first, then optional `title=` and `highlight=` metadata: ```` ```javascript title=request.js highlight=2,4-6 ````. Highlight values are one-based lines or inclusive ranges separated by commas.
- `[[term: term | Definition shown to the learner.]]` for an explicit technical term. `[[API]]`, `[[HTTP]]`, `[[origin]]`, and `[[runtime]]` are the only built-in shorthand definitions; prefer the explicit form for everything else.
- `:::tip`, `:::note`, `:::remember`, `:::warning`, `:::mistake`, `:::security`, and `:::accessibility` callouts. Put an optional title after the type, content on following lines, then close with `:::`.
- `:::reveal Optional title` for a learner-controlled disclosure. Use it for delayed reasoning or an answer, not essential content the learner may never open.
- A supported YouTube URL alone on a line for a privacy-enhanced responsive player. Supported URL forms are `youtube.com/watch`, `youtu.be`, `/shorts/`, `/live/`, and `/embed/`, including `t` or `start` timestamps. A YouTube URL inside a sentence remains a link.

Raw HTML is not lesson syntax. The authoring validator rejects it outside fenced code. Never use HTML, CSS, JSX, classes, inline styles, iframes, or wrappers to create lesson UI. HTML/CSS/JS inside a fenced code example is lesson subject matter and is allowed.

Math uses native MathML with local XITS and Amiri fonts. A fenced `mathml` block renders a formula card; optional `title="..."` adds its caption. Inline formulas use a code span prefixed with `mathml:`, including in MCQ prompts, choices and explanations. Each input must contain one well-formed `<math>` root; `dir="rtl"` is the default, and `dir="ltr"` preserves Latin notation. Use separate `<mi>` tokens for variables, `<mn>` for complete numbers and `<mtext dir="rtl">` for joined Arabic function names and prose. Set `stretchy="true"` on a single bracket beside a table. Add an Arabic `aria-label` when a verbal description helps. Styling and non-MathML elements are rejected or stripped. Mathematics follows the same question and progress pipeline as ICT. Symbol gallery samples live only in test fixtures.

LaTeX works in MCQs and flashcards: `\(...\)` inline, `\[...\]` or `$$...$$` in blocks; use `String.raw` in JS. Local KaTeX compiles to native MathML.

## Published lesson learning arc

Student lessons use a predictable three-phase order:

1. One video, original Arabic summary crops, then accessible text recap. Topic controls stay in the same player.
2. The recap separates memorization, understanding and notes. Use relevant Arabic source crops, not English interface screenshots.
3. Source practice: original MCQs or written `exam-question` self-review. Progress measures practice steps only; self-review does not contribute an automatic accuracy score. The opening action starts questions without repeating the recap on another screen.

Author the opening as `video-intro` and the next step as `lesson-summary`, retaining stable IDs for both. The runtime combines them on one screen, records both IDs on Continue, and restores old summary resumes to that combined screen. Back from the first question returns to the video and recap. Targeted review opens that explanation and then jumps to its requested question.

Put one supported YouTube URL alone after the opening title. Optional paragraphs and bullets state scope and source pages; the actual teaching belongs in the following recap. Keep source links for provenance; render book/summary pages in separate cards below the title, spelling out page ranges. Reading needs no external tab. Verified timestamps become chapter buttons beneath the player. Source-only parts omit the URL and show their full recap without an empty player. Do not add extra headings, images, directives, bare URLs or custom controls to `video-intro`. A title-only opening remains a neutral draft placeholder.

To skip a reviewed interval during playback, append `&skip=FROM-TO` to the opening YouTube URL, with times in seconds from the start. Multiple reviewed intervals use commas, for example `&skip=0-100,300-450`; optional `&duration=900` bounds validation. The player checks initial, chapter and manual seeks and reports API failure visibly. The video still uses YouTube's native controls, and direct YouTube links remain unchanged.

```md
<!-- step-id: stable-video-id -->
<!-- presentation: video-intro -->
# Lesson title

https://www.youtube.com/watch?v=AlkDbnbv7dk

Book pages 42–45: tables, records, and fields. The video also mentions an optional topic outside these pages.

- [Read the book, page 42](assets/books/ict.pdf#page=42)
- [Open the summary](assets/books/summary.pdf#page=8)
- [Tables and records (02:15)](https://www.youtube.com/watch?v=AlkDbnbv7dk&t=135s)
```

Use `lesson-summary`. Put source images immediately after its H1, with full Arabic topic/page alt text. `summary-scans.js` displays them with in-place enlargement; an immediately following blockquote stays beside its image as a source correction. Record crops in `assets/lessons/ict/summary/crops.json`. Then write accessible teaching text:

```md
<!-- step-id: stable-summary-id -->
<!-- presentation: lesson-summary -->
# Lesson summary

## Memorize

- The smallest set of facts needed for recall.

## Understand

- A plain-language explanation of why the idea works.

:::note Important note
One easy-to-miss boundary or exception.
:::
```

Keep most MCQs to three useful choices. Two-choice questions remain supported, and the shared question component owns the responsive layout: two or four choices form two columns on desktop, three choices stack, and all choices stack on mobile.

## Shared directive rules

- Open with `:::type` and close with `:::`.
- Put an interactive opening such as `:::mcq` on a line by itself. Only content callouts and `:::reveal` accept a title on the opening line.
- Use `title:`, `question:`, `explanation:`, and `hint:` for content strings.
- Use `id | Label` when a stable item ID is useful. The renderer creates an ID when it is omitted.
- Markdown inside answer labels and feedback is rendered through the existing sanitized inline renderer.
- Directives select an existing component. They never contain HTML, CSS, JSX, layout classes, or shell configuration.
- Use `<!-- lesson-step -->` between two consecutive explanation screens. Interactive directives already create their own step boundaries.
- Published lessons must add `<!-- step-id: stable-kebab-id -->` to every explanation and `id: stable-kebab-id` to every interaction so saved progress remains stable. IDs must be unique lowercase kebab-case.
- Unsupported directives and fields are validation errors. Do not add `phase:`, `critical:`, arbitrary attributes, or renderer options.
- Raw HTML and nested directives are rejected inside interactive blocks. Content callouts must also close cleanly and cannot contain another directive.

## Illustrated Rocky dialogue

An explanation can select the existing illustrated dialogue presentation with `<!-- presentation: rocky-dialogue -->`. Keep its separate stable step ID. This presentation requires exactly one heading, one image with useful alt text, and one non-empty `:::note` containing the dialogue:

```md
<!-- step-id: welcome-to-this-topic -->
<!-- presentation: rocky-dialogue -->
# Welcome

![Rocky waves hello](assets/mascot/rocky-wave.svg)

:::note Welcome
Let’s learn this idea together, one step at a time.
:::
```

The application owns the bubble, illustration layout, measured text height, animation, responsive behavior, and reduced motion. The marker selects this one supported presentation; arbitrary names, classes, styles, or layout fields are rejected. Another stable explanation ID can reuse it without code or stylesheet changes. Normal explanations omit the marker.

## Single choice

```md
:::mcq
title: HTTP responses
question: Which status code means Not Found?

- [ ] ok | `200 OK`
- [x] missing | `404 Not Found`
- [ ] error | `500 Internal Server Error`

explanation: `404` means the resource could not be found.
hint: Look for the missing-resource client error.
:::
```

Required: `id`, `title` (metadata), `question`, `explanation`, `hint`, at least two choices and exactly one `[x]`. Optional: `kicker`, unique choice IDs, and a final `example:` block containing Markdown tables. The question is the visible heading. Examples replace Rocky below the question or beside the answers. Single choice only.

## True or false

True/false intentionally maps to the existing single-choice component.

```md
:::true-false
title: URL fragments
question: A URL fragment is sent in the HTTP request.
answer: false
explanation: The browser uses the fragment locally.
hint: Think about the part after `#`.
:::
```

Use only `answer: true` or `answer: false`; checkbox choices are rejected. For a published lesson, provide `id`, `title`, `question`, `answer`, `explanation`, and `hint`. Optional: `kicker`.

## Original written exam question

Use `:::exam-question` to preserve a source question without changing its format. Required one-line fields: `id`, `title`, `question` (screen heading), `reference` (paper/page/question), `answer-label` (printed, corrected or teaching solution). Then multiline `body:`, `solution:` and optional `guidance:` sections contain sanitized Markdown, tables, code and original figures. Keep source wording in `body`, and corrections outside it. Figures use `assets/lessons/ict/exams/` and the shared in-place zoom controls.

The renderer is a fixed white flashcard: `body` is the front and `solution` the back. Format answers with bold key terms, lists for distinct points, and code fences for SQL. Click the card or focus it and press Enter/Space to flip; reduced motion switches faces immediately. Long content and original images scroll inside the card. No answer field or grading request exists. Continue records the stable step ID only after the answer has been revealed. See `exam-question.js` and `tests/browser/browser-exam-question.mjs`.

## Publishing and validation

Follow `src/data/lessons/ict/course-introduction.js`: export the Markdown source, pass it to `defineMarkdownLesson(...)` with lesson metadata, register the module in `src/data/lessons/subject-lesson-registry.js`, and add its parts and stable boundary IDs to `src/data/subject-roadmaps.js`. Because the source currently lives in a JavaScript template literal, escape Markdown backticks and any literal `${` sequence.

`defineMarkdownLesson(...)` enforces the published-only IDs and complete fields described above when `status` is `published` or omitted. `status: "candidate"` keeps draft fallbacks available while a lesson is being developed; it does not waive the requirements for publication.

Before publishing:

1. Confirm every explanation and interaction has a stable unique ID.
2. Confirm `parseLessonMarkdown(source, { published:true })` reports zero authoring issues.
3. Run `npm run build`; this imports and validates every registered lesson.
4. Run `npm test`.
5. Exercise every used interaction in the rendered lesson. Run `npm run test:browser` when parser, renderer, shared component behavior, or published ICT lesson interactions change.

Known unsupported capabilities include multiple-select, matching, free-form diagram DSLs such as Mermaid, arbitrary embeds, custom HTML/CSS lesson UI, custom code tests, Node/React/backend execution, and author-controlled progress or checkpoint scoring. Use a supported representation that tests the intended understanding, or leave the activity non-interactive rather than inventing a component.

## Extension rule

To add another question type, first create or approve one reusable StepRenderer and one shared behavior controller. Then add a parser mapping from content fields to that component's data contract. Do not allow lesson source to provide tags, classes, styles, templates, or arbitrary attributes.

After ICT curriculum edits, run `node scripts/update-ict-question-index.mjs`; the catalog-sync test checks all question IDs and ordering. Original PDFs live in the separate reference archive. Runtime classified references use full-page images with provenance in `assets/lessons/ict/exams/source-pages/source-pages.json`; retain source page numbers and update image identities after re-encoding.
