# Code map

Read the row for the feature you are changing. [AGENTS.md](../AGENTS.md) contains working rules; [PRODUCT.md](PRODUCT.md) contains current product boundaries. Paths below are relative to the repository root.

## Find a task or file

```sh
npm run --silent map                              # list task areas
npm run --silent map -- progress                  # owners and focused checks
npm run --silent map -- subject-progress-store.js # exports, imports and direct importers
```

The command reads this table and current source, without an index or cache. Unique JavaScript filenames work directly; ambiguous names list exact paths. File results include exports, imports and direct test importers with line numbers (`L` refers to the selected file). It scans only `src/`, `scripts/`, `tests/` and the two server entrypoints. Literal JavaScript imports/re-exports (including lazy imports) are indexed; CSS/HTML references, computed imports and runtime URLs still need a targeted search before moving or deleting files. No arguments or `--help` show usage. `--silent` removes npm's command banner, not errors or results.

`npm run check` validates every owner path and focused command in this table. Update the existing row when moving its files or changing a check. This is a task map, not an exhaustive file inventory.

## Owners

| Task | Start here | Focused check |
| --- | --- | --- |
| Startup/splash | `index.html`, `src/bootstrap.js`, `src/ui/splash-screen.js` | `npm run test:splash` |
| Routes/navigation | `src/main.js`, `src/app/route.js`, `src/app/view-lifecycle.js` | `node --test tests/route.test.mjs tests/view-lifecycle.test.mjs`; `npm run test:ui-fixes` |
| Accounts/onboarding | `src/services/learner-session.js`, `src/services/auth-client.js`, `src/ui/visitor-flow.js`, `src/ui/visitor-flow-markup.js` | `npm run test:accounts`; `node --test tests/auth-client.test.mjs tests/learner-session.test.mjs` |
| Subjects/Home | `src/data/course.js`, `src/ui/course-map.js`, `src/ui/learner-dashboard.js`, `src/ui/auth-header.js` | `node --test tests/course-map.test.mjs tests/learner-dashboard.test.mjs`; `npm run test:ui-fixes` |
| Roadmap/access | `src/data/subject-roadmaps.js`, `src/domain/subject-access.js`, `src/ui/subject-learning.js`, `src/ui/subject-roadmap.js` | `node --test tests/subject-access.test.mjs tests/subject-learning.test.mjs`; `npm run test:progress` |
| Progress/review/rewards | `src/services/subject-progress-store.js`, `src/domain/subject-progress.js`, `src/ui/subject-review.js`, `src/ui/subject-completion.js`, `src/ui/progress-feedback.js` | `node --test tests/subject-progress.test.mjs tests/subject-completion.test.mjs`; `npm run test:progress-storage` |
| ICT lessons | `src/data/lessons/ict/`, `src/data/lessons/subject-lesson-registry.js`, `src/data/subject-roadmaps.js`, `src/domain/subject-question-progress.js` | `node --test tests/subject-lesson.test.mjs tests/lesson-authoring.test.mjs`; `node tests/browser/browser-question-course.mjs` |
| Lesson rendering | `src/ui/lesson-view.js`, `src/ui/lesson/` | `node --test tests/lesson-authoring.test.mjs`; `npm run test:browser` |
| Lesson syntax/parser | `src/markdown/lesson-authoring.js`, `src/markdown/lesson-model.js`, `src/markdown/renderer.js` | `node --test tests/lesson-authoring.test.mjs` |
| Arabic math | `src/markdown/math.js`, `src/styles/lesson/math.css`, `src/data/lessons/mathematics/` | `node tests/browser/browser-math.mjs`; `node tests/browser/browser-math-course.mjs` |
| Gaza chemistry lessons | `src/data/lessons/chemistry/`, `src/data/lessons/subject-lesson-registry.js`, `src/data/subject-roadmaps.js` | `node --test tests/lesson-authoring.test.mjs tests/subject-lesson.test.mjs` |
| Shared UI/media | `src/ui/template-shell.js`, `src/ui/media-ready.js`, `src/ui/view-motion.js` | `npm run test:render`; `npm run test:assets` |
| App shell/navigation | `src/ui/app-shell.js`, `src/ui/coming-soon.js`, `src/styles/system.css` | `npm run test:ui-fixes`; `npm run test:browser` |
| Styles/layout | `src/styles/base.css`, `src/styles/course-map.css`, `src/styles/lesson.css`, `src/styles/lesson/`, `src/styles/responsive.css` | `npm run test:ui-fixes`; `npm run test:a11y` |
| Server/auth | `server.mjs`, `dev-server.mjs`, `src/server/app-server.mjs`, `src/server/runtime-config.mjs`, `src/server/auth-api.mjs`, `src/server/account-store.mjs` | `node --test tests/production-runtime.test.mjs tests/auth-api.test.mjs tests/account-store.test.mjs` |
| Durable progress | `src/server/progress-api.mjs`, `src/server/progress-store.mjs`, `src/services/server-progress.js`, `src/services/indexeddb-progress.js`, `src/services/session-progress.js` | `node --test tests/progress-api.test.mjs`; `npm run test:progress-storage` |
| Database schema/backups | `src/server/account-schema.mjs`, `src/server/account-store.mjs`, `scripts/database-maintenance.mjs` | `node --test tests/database-recovery.test.mjs` |
| Serving/packaging | `src/server/static-files.mjs`, `scripts/package-app.mjs`, `scripts/preview-server.mjs` | `node --test tests/static-files.test.mjs tests/package-app.test.mjs`; `npm run test:preview` |
| Test tooling/project map | `tests/browser/browser-session.mjs`, `tests/browser/browser-page.mjs`, `scripts/run-gate.mjs`, `scripts/project-map.mjs`, `scripts/validate-app.mjs` | `node --test tests/browser-session.test.mjs tests/project-map.test.mjs`; `npm run build` |

## State and boundaries

`main.js` creates one learner session and one subject progress store, shared by Home and the lesson journey. UI calls those services; it does not create parallel stores or directly access account endpoints. Domain modules implement pure rules shared by browser and server.

Progress adapters: `session-progress.js` for guests, `indexeddb-progress.js` for fixture members, `server-progress.js` for HTTP members and their account-bound IndexedDB outbox. Reads and writes are serialized per owner. Completion/XP are monotonic; mutable review answers follow committed order. Preserve legacy import keys and retry behavior. Retired developer routes normalize to Home.

Each navigation owns a `view-lifecycle.js` operation with `signal`, `isCurrent()` and `add(cleanup)`. New navigation aborts the old operation. Check the captured operation before committing asynchronous results; cleanup runs once. `media-ready.js` scopes image decoding/retry to the affected surface, and `view-motion.js` handles motion/reduced motion. Do not hide the whole page to mask loading.

Home reads question IDs from the small generated `ict/question-index.js`; banks and parsing load only with lessons. Regenerate it with `node scripts/update-ict-question-index.mjs` after curriculum changes. Published ICT content loads through `subject-lesson-registry.js`; `ict/exam-lessons.js` filters the student course to questions only. Five lesson circles aggregate question progress over preserved part records; `subject-question-progress.js` owns that calculation. Historical progress identities remain valid; the unused day catalog and developer lesson tools have been removed. `TOTAL_DAYS = 112` preserves the existing learner rank scale; it is not the ICT catalog size. Retired full-stack lessons and unused map artwork live in Git history.

Mathematics uses the same Markdown question pipeline and progress owners. `mathematics/math-course.js` lists the 25 indexed lessons and their stable question IDs; `mathematics/source-coverage.json` tracks catalog counts, recovered-source mappings, source issues and remaining coverage gaps. Original prompt/answer crops and provenance live in `assets/lessons/mathematics/source-crops/`. Mathematics lesson text uses Amiri with a math-font fallback for stretching operators. Symbol rendering samples are test fixtures, outside the learner catalog.

Chemistry uses the same Markdown question pipeline and progress owners. `chemistry/chemistry-bank.js` exposes six Al Tasnif units, while `chemistry/al-tasnif-bank.js` preserves the printed MCQ keys, turns written prompts into flashcards, and emits chemistry formulae with inline LaTeX. `chemistry/source-coverage.json` and the Al Tasnif inventory record the 174-page PDF, its WebP render, unit answer pages, and item-level visual crops. Full-page crops are never attached to a question.

## Styles and assets

More is blank. Locked navigation displays feedback without changing views. Subjects span the available content width and unpublished subjects show zero progress. Developer galleries, editors, source tools and scenario switches have been removed.

Shared controls live in `system.css`; Home layout lives in `course-map.css` and `learner-dashboard.css`; lesson styles live in `lesson.css` and `lesson/`. Keep stylesheet order in `index.html`. Home must not eagerly import the Markdown rendering stack. Fonts are local; keep their license. Hero and path artwork use compact WebP without duplicate PNG fallbacks; original images and PDFs are archived separately. Rocky SVG drawings and animation values remain exact. Hidden onboarding images and mascots initialize when their step opens. Slow links, Save-Data and low-end devices skip speculative warming. Text responses use negotiated Brotli/gzip.

## Extension recipes

- **Add a subject/lesson:** add catalog metadata, then content under `src/data/lessons/<subject>/`; register it and add roadmap boundaries. Use [LESSON_AUTHORING.md](LESSON_AUTHORING.md). Reuse the parser/renderers and preserve published IDs; do not create a subject-specific service or duplicate a shell.
- **Change persistence:** start in the shared progress store and pure domain rules; update its actual IO adapter. Test interruption, retries, learner isolation and concurrent writes. No storage migration for cosmetic renames.
- **Add tooling:** operations stay in `scripts/`; browser journeys/helpers in `tests/browser/`; Node tests stay `tests/*.test.mjs`. Keep the dependency-free server and current static packaging unless a concrete requirement justifies more.

## Gates

`npm run check` runs syntax, selective checked JavaScript, Node tests, reference/import validation and size budgets. Browser-to-server imports and domain-to-UI/storage coupling fail validation. `verify` adds the full Chromium/accessibility, UI, progress, render, assets and splash checks. `release` adds packaging, the API-free fixture journey and Firefox/WebKit. All full gates reject scope-shortening flags.

Browser tests start isolated servers and disposable data. `CHROME_BIN` overrides discovery; `BROWSER_SCREENSHOT_DIR` optionally retains images. Focused flags are for investigation only. The accessibility suite reports the preserved palette's known contrast exceptions; other WCAG violations block the gate. A passing functional gate does not imply full accessibility or product release readiness.
