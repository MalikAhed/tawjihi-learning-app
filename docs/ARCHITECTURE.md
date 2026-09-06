# Application architecture

Start here for implementation work; read [AGENTS.md](../AGENTS.md) for product authority and mandatory navigation motion. The project remains in Phase 1. Existing local account/review server adapters are preserved; their presence does not advance the delivery phase or approve provisional stories.

## Entry points and responsibilities

This is a native ES-module application, without a bundler or framework. `npm run build` validates references and registered lessons; it does **not** produce a deployment directory.

| Area | Owner / where to change it |
|---|---|
| Document and eager styles | `index.html`; initial loading state; `src/ui/app-shell.js` mounts account-sensitive navigation after session restoration |
| App lifecycle and navigation | `src/main.js`; route dispatch, current content cleanup, request generation, history and return focus |
| URL vocabulary | `src/app/route.js`; see [route map](P1_ROUTE_STATE_MAP.md) |
| Entry and accounts | `src/ui/visitor-flow.js` controls forms; `visitor-flow-markup.js` owns markup; `visitor-mascot.js` owns SVG/pointer animation |
| Subjects Home | `src/ui/course-map.js`, `learner-dashboard.js`, `auth-header.js`; subject metadata in `src/data/course.js` |
| Subject learning | `src/ui/subject-learning.js` controls map/part/review/completion; `subject-roadmap.js` and `subject-completion.js` render their surfaces |
| Published content | `src/data/subject-roadmaps.js` defines navigation boundaries; `src/data/lessons/subject-lesson-registry.js` loads subject lessons |
| Lesson rendering | `src/ui/markdown-lab.js` renders authored steps; `lesson-view.js` supports the validated lesson model; `lesson-content.js` renders semantic blocks |
| Authoring contract | `src/markdown/lesson-authoring.js`, `lesson-model.js`, `renderer.js`; [authoring guide](../LESSON_MARKDOWN_AUTHORING.md) and required lesson skills before content changes |
| Developer routes | `src/ui/development-views.js`; UI Lab in `ui-lab/playground.js`, editable experiment in `ui-lab/board.js`; Ship Ready catalog in `src/data/ship-ready.js`, Arabic copy in `ship-ready-ar.js` |
| Current component reference | `src/ui/current-design-system.js`; `design-system-view.js` owns the code practice surface and delegates the reference route |
| Code editor | `design-system-code-quest.js` mounts `assets/vendor/lesson-code-editor.js`; sandbox protocol in `code-preview.js` and `src/server/code-preview-*` |
| Local server | `dev-server.mjs` composes handlers from `src/server/`; preserve public-file allowlist, CSP and isolated preview origin |
| Checks | `scripts/`, Node tests in `tests/`; browser transport in `browser-session.mjs`, journeys in `browser-*.mjs` |

## State ownership

- `prototype-service.js` owns account, curriculum/path, guest trial, scenario and subscriptions. `prototype-storage.js` owns session-storage IO and live-reload restoration; `auth-client.js` owns HTTP, timeout and cancellation. Call the service from UI instead of reading storage or fetching account endpoints there.
- `subject-progress-store.js` owns versioned per-learner/per-lesson/per-part progress, review mistakes and local completion outcomes. Keep access, completion, mastery and rewards separate. Published step IDs are persisted identities.
- `progress-store.js` and `domain/progression.js` retain the day-based lesson contracts. The day registry is empty, but these modules are used by tests and developer lesson tooling; candidate content and artwork are retained references.
- `main.js` owns one active content disposer and request generation. Every async destination checks it before committing. Visitor flows capture their own abort signal before awaiting a request; never read a replacement controller after the await.
- UI Lab edits live in its module/session state. Opening or running an experiment does not publish it.

## Shared UI and style conventions

- `base.css` owns global `--system-*` palette, spacing, radius and control tokens, focus, page primitives and component-arrival motion. Keep the established palette; add tokens only for repeated roles.
- Feature CSS owns internal component spacing; parent layouts own gaps between components. `course-map.css` is the sole subject-card owner. `system.css` owns common action/field/feedback styles and the current reference gallery. `week-theme.css` provides lesson theme roles, not another global palette.
- Eager styles in `index.html` must establish shell geometry before asynchronous content appears. `design-system.css` is the lazy code-editor stylesheet manifest; its loader waits for it before mounting the editor and preserves its intended cascade position.
- Reuse `template-shell.js` for lesson footers and scroll affordances, `dialog.js` for modal focus containment, and `view-motion.js` for every screen/tab transition. Keep DOM commits synchronous, cancel obsolete requests, and retain the component rise in `base.css`. Reduced-motion changes must also stop already-running animation.
- Preserve Arabic RTL, native control semantics, visible focus and wrapping Arabic labels. Code/editor surfaces remain LTR where needed. Feature breakpoints intentionally differ; do not unify them without browser evidence.
- Resolve required initial account/theme/layout state before mounting its UI. Use a real, accessible loading surface for pending data; do not flash a guessed guest layout or use timers/page hiding to mask transitions.

## Shortest reliable checks

| Change | Focused check, then required broader validation |
|---|---|
| Route/state/service | `node --test tests/route.test.mjs tests/prototype-service.test.mjs tests/subject-progress.test.mjs` (select the relevant files) |
| Server/cache/reload | `node --test tests/static-files.test.mjs tests/security-headers.test.mjs tests/live-reload.test.mjs` |
| Shared UI / navigation | `npm run test:browser`; browser journeys cover desktop/mobile, keyboard, reduced motion, account flows and templates |
| Render timing / async layout | `npm run test:render`; captures frame samples and screenshot sequences under delayed session/CSS loads and CPU throttling |
| Code editor / developer tools | `BROWSER_DEVELOPER_ONLY=1 npm run test:browser` |
| ICT roadmap / local progress | `BROWSER_ROADMAP_ONLY=1 npm run test:browser` |
| Navigation motion | `BROWSER_MOTION_ONLY=1 npm run test:browser` |
| Lesson source or shared renderer | Follow required lesson skills; `npm run check:syntax`, `npm test`, `npm run build`, plus browser checks for changed interactions/media |
| Full repository gate | `npm run verify` (syntax, unit, build, manageability, browser); also `npm run test:render` for rendering changes |

Browser checks use a temporary profile and in-memory accounts. `CHROME_BIN` overrides Chrome discovery. `BROWSER_SCREENSHOT_DIR=/tmp/learn-review` saves smoke screenshots; `BROWSER_SCREENSHOT_FILTER=subjects-home.png` stops after that named capture. Default browser tests omit external font/CDN resources for deterministic offline validation; use `BROWSER_EXTERNAL_ASSETS=1` when verifying those resources.

Search `src/`, `tests/`, `scripts/`, `docs/` and `index.html` first. Existing `.gitignore` excludes dependencies, `artifacts/`, `exports/`, `tmp/`, screenshot folders and design-system backups. Keep those materials and local `data/` intact. Live reload reacts only to runtime inputs, so editing tests or exports does not interrupt an open screen.
