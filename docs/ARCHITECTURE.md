# Application architecture

Start here for implementation work; read [AGENTS.md](../AGENTS.md) for product authority and mandatory navigation motion. The project remains in Phase 1. Existing local account/review server adapters are preserved; their presence does not advance the delivery phase or approve provisional stories.

## Entry points and responsibilities

This is a native ES-module application, without a bundler or framework. `npm run build` validates references and registered lessons; it does **not** produce a deployment directory.

| Area | Owner / where to change it |
|---|---|
| Document and eager styles | `index.html`; initial loading state; `src/ui/app-shell.js` mounts account-sensitive navigation after session restoration |
| App lifecycle and navigation | `src/main.js`; route dispatch, history and return focus; `src/app/view-lifecycle.js` owns one active operation’s cancellation and cleanup |
| URL vocabulary | `src/app/route.js`; optional validated lesson/part identity restores the active learner's saved step; see [route map](P1_ROUTE_STATE_MAP.md) |
| Entry and accounts | `src/ui/visitor-flow.js` controls forms; `visitor-flow-markup.js` owns markup; `visitor-mascot.js` owns SVG/pointer animation |
| Account modes and persistence | `src/services/learner-session.js` exports `createLearnerSession`, coordinating explicit fixture and HTTP account modes; `prototype-storage.js` owns session storage, `auth-client.js` owns requests; `src/app/app-config.js` reads the explicit entry-HTML account mode; `src/server/auth-api.mjs` and `account-store.mjs` own the local SQLite API |
| Subjects Home | `src/ui/course-map.js`, `learner-dashboard.js`, `auth-header.js`; subject metadata in `src/data/course.js` |
| Subject learning | `src/ui/subject-learning.js` controls map/part/review/completion; `subject-roadmap.js` and `subject-completion.js` render their surfaces; `src/domain/subject-access.js` supplies publication/account/sequence gates shared with direct links |
| Subject progress | `src/services/subject-progress-store.js` owns the shared learner/lesson/part cache, subscriptions and visible saving state; `src/domain/subject-progress.js` owns merge, review, XP and summary rules; `session-progress.js`, `indexeddb-progress.js` and `server-progress.js` are its IO adapters; `src/ui/subject-learning.js` applies access and completion in the journey; `src/styles/course-map.css` and `subject-learning.css` own their respective surfaces |
| Published content | `src/data/subject-roadmaps.js` defines navigation boundaries; `src/data/lessons/subject-lesson-registry.js` loads subject lessons |
| Lesson rendering | `src/ui/markdown-lab.js` renders authored steps; `lesson-view.js` dispatches to `lesson/authored.js`, `lesson/classic.js`, and `lesson/source-editor.js`; `lesson-content.js` renders semantic blocks |
| Authoring contract | `src/markdown/lesson-authoring.js`, `lesson-model.js`, `renderer.js`; [authoring guide](../LESSON_MARKDOWN_AUTHORING.md) before content changes |
| Developer routes | `src/ui/development-views.js`; UI Lab in `ui-lab/playground.js`, editable experiment in `ui-lab/board.js`; Ship Ready catalog in `src/data/ship-ready.js`, Arabic copy in `ship-ready-ar.js` |
| Current component reference | `src/ui/current-design-system.js`; `design-system-view.js` owns the code practice surface and delegates the reference route |
| Code editor | `design-system-code-quest.js` mounts `assets/vendor/lesson-code-editor.js`; sandbox protocol in `code-preview.js` and `src/server/code-preview-*` |
| Server | `dev-server.mjs` and production `server.mjs` use `src/server/app-server.mjs`; `runtime-config.mjs` validates host/proxy configuration; `progress-api.mjs`/`progress-store.mjs` add authenticated SQLite progress; preserve public-file allowlist, CSP and isolated preview origin |
| Checks | Node tests in `tests/`; `scripts/browser-session.mjs` owns Chrome transport/process cleanup, `scripts/browser-page.mjs` runs isolated focused pages, journeys in `scripts/browser-*.mjs` |

## State ownership

- `src/services/learner-session.js` owns account, curriculum/path, guest trial, scenario and subscriptions in both fixture and HTTP modes. `prototype-storage.js` owns session-storage IO and live-reload restoration; `auth-client.js` owns HTTP, timeout and cancellation. Call the service from UI instead of reading storage or fetching account endpoints there.
- `main.js` creates one `src/services/subject-progress-store.js` for both Home and lessons. It owns the optimistic cache, asynchronous writes, subscriptions, recoverable warnings and retry state. Guest records use session storage; fixture members use IndexedDB transactions; HTTP members use SQLite-confirmed records and an account-bound IndexedDB outbox. The retained v1 localStorage source imports idempotently. Completion and earned XP are monotonic; review answers apply to the latest committed record. Home derives its statistics from published roadmap parts. Keep access, completion, mastery and rewards separate. Published step IDs are persisted identities.
- `progress-store.js` and `domain/progression.js` retain the day-based lesson contracts. The day registry is empty, but these modules are used by tests and developer lesson tooling; candidate content and artwork are retained references.
- `view-lifecycle.js` owns the active content operation: `signal`, `isCurrent()` and `add(cleanup)`. Starting a destination aborts the previous operation and runs registered cleanups once. Register loading-shell restoration and the mounted renderer’s cleanup on the same operation; stale operations cannot attach to a new view. Every async destination checks its captured operation before committing. Visitor flows capture their own abort signal before awaiting a request; never read a replacement controller after the await.
- UI Lab edits live in its module/session state. Opening or running an experiment does not publish it.

## Shared UI and style conventions

- `base.css` owns global `--system-*` palette, spacing, radius and control tokens, focus, page primitives and component-arrival motion. Keep the established palette; add tokens only for repeated roles.
- Feature CSS owns internal component spacing; parent layouts own gaps between components. `course-map.css` is the sole subject-card owner. `system.css` owns common action/field/feedback styles and eager shell geometry. The reference route loads `current-system.css`; the playground loads `playground.css`. `stylesheet-loader.js` preserves cascade position and waits for readiness. Shared action and text colors live in `base.css`. `week-theme.css` provides lesson theme roles, not another global palette.
- `base.css` supplies the locally licensed Noto Sans Arabic UI font and type/control roles. The user's current visual direction retains the original vibrant card colors, subtle gradients, and white text on colored cards and filled actions. Secondary controls and pale inset panels retain their dark text. Some original white/bright color pairs remain below contrast targets; the accessibility audit continues to report them. See [visual roles](DEVELOPER_DESIGN_SYSTEM.md).
- `course-map.js` owns both initial card presentation and learner updates. `learner-format.js` owns repeated Arabic counts, level wording, and XP formatting. The header subscribes to the same learner/progress owners as Home. Original gem, heart, and level SVGs remain visible for members. Gem/heart displays currently start at zero; no balance service backs them. The learner level uses confirmed progress and omits its value while loading.
- Published lessons render in explicit learner mode. Developer/source and preview modes cannot write learner achievements. Illustrated explanations opt into the supported `rocky-dialogue` presentation while retaining their persisted step IDs; question headers share one responsive component owner.
- Eager styles in `index.html` establish shell geometry before asynchronous content appears. `lesson.css` owns shared shell/gallery primitives; `styles/lesson/` owns question types, published lessons, and completion. These are direct links to avoid CSS import waterfalls. `design-system.css` is the lazy code-editor stylesheet manifest; its loader waits for it before mounting the editor and preserves its intended cascade position.
- Reuse `template-shell.js` for lesson footers and scroll affordances, `dialog.js` for modal focus containment, and `view-motion.js` for every screen/tab transition. Keep DOM commits synchronous, cancel obsolete requests, and retain the component rise in `base.css`. Reduced-motion changes must also stop already-running animation.
- Preserve Arabic RTL, native control semantics, visible focus and wrapping Arabic labels. Code/editor surfaces remain LTR where needed. Feature breakpoints intentionally differ; do not unify them without browser evidence.
- Resolve required initial account/theme/layout state before mounting its UI. Use a real, accessible loading surface for pending data; do not flash a guessed guest layout or use timers/page hiding to mask transitions.

## Shortest reliable checks

Both apps use `npm run check` for non-browser validation and Node tests, and `npm run verify` to include their browser suites. Learn's `check` also prints `audit:manageability`, an advisory inventory of source and asset sizes. Size alone does not justify splitting a cohesive module; behavior is enforced by tests, and ownership is documented above.

| Change | Focused check, then required broader validation |
|---|---|
| Route/state/service | `node --test tests/route.test.mjs tests/learner-session.test.mjs tests/subject-progress.test.mjs` (select the relevant files) |
| Account modes / requests | `node --test tests/learner-session.test.mjs tests/auth-client.test.mjs tests/auth-api.test.mjs tests/account-store.test.mjs` |
| Subject progress / mistake review / completion | `node --test tests/subject-progress.test.mjs tests/subject-completion.test.mjs`; both exercise `src/services/subject-progress-store.js` |
| Server/cache/reload | `node --test tests/static-files.test.mjs tests/security-headers.test.mjs tests/live-reload.test.mjs` |
| Browser transport / readiness probes | `node --test tests/browser-session.test.mjs`; missing responses, process/pipe exit and disposal must reject with command/scenario context and clean up |
| Shared UI / navigation | `npm run test:browser`; browser journeys cover desktop/mobile, keyboard, reduced motion, account flows and templates |
| Render timing / async layout | `npm run test:render`; captures frame samples and screenshot sequences under delayed session/CSS loads and CPU throttling |
| Code editor / developer tools | `npm run test:developer` |
| ICT roadmap / local progress | `npm run test:progress` |
| Navigation motion | `npm run test:motion` |
| Lesson source or shared renderer | Use the local authoring guide; `npm run check:syntax`, `npm test`, `npm run build`, plus browser checks for changed interactions/media |
| Complete local / release gates | `npm run verify` includes `check`, accessibility/full Chromium journeys, progress storage/sync, render and assets; `npm run release` adds packaged-static, Firefox and WebKit checks |
| Checked public contracts / boundaries | `npm run check:types`; selective JSDoc `@ts-check` in route/session/progress/lifecycle owners, with no emitted code; `npm run build` rejects browser/server and domain/UI/storage dependencies |
| Account-owned durable progress | `node --test tests/progress-api.test.mjs`; `npm run test:progress-storage` checks real two-tab transactions and independent HTTP browser profiles |
| Hosted config / review bounds / recovery | `node --test tests/production-runtime.test.mjs tests/database-recovery.test.mjs`; reproducible commands in [README](../README.md#hosted-runtime-and-recovery) |
| UI fix regressions | `npm run test:ui-fixes`: Home/card rectangles, shell and popup occlusion, question headers and direction, lesson URL/history/access restoration; also included in `verify` |

For example, a progress persistence bug starts in `src/services/subject-progress-store.js` and `tests/subject-progress.test.mjs`; an account request bug starts in `src/services/auth-client.js` and `tests/auth-client.test.mjs`. Extend those owners while preserving storage keys and published IDs, then run the focused tests and `npm run check`.

Browser checks use a temporary profile and in-memory accounts. `CHROME_BIN` overrides Chrome discovery. `BROWSER_SCREENSHOT_DIR=/tmp/learn-review` saves smoke screenshots; `BROWSER_SCREENSHOT_FILTER=subjects-home.png` stops after that named capture. Default browser tests omit external font/CDN resources for deterministic offline validation; use `BROWSER_EXTERNAL_ASSETS=1` when verifying those resources.

Search `src/`, `tests/`, `scripts/`, `docs/` and `index.html` first. Existing `.gitignore` excludes dependencies, `artifacts/`, `exports/`, `tmp/`, screenshot folders and design-system backups. Keep those materials and local `data/` intact. Live reload reacts only to runtime inputs, so editing tests or exports does not interrupt an open screen.

## Media and loading

- `ui/media-ready.js` waits for actual image decoding, pauses component entrance while a content surface is pending, and provides retry or an explicit missing-image fallback. Its disposer/AbortSignal prevents stale reveals.
- Subjects Home, feature placeholders, visitor flows, authored Markdown steps, and completion use this boundary. Keep it scoped to the content surface, not the entire application shell.
- Published Markdown steps preload the next step's images through `ui/lesson/media.js`. Registration warms the next step; final lesson steps warm the celebration. The warm cache is bounded and respects Save-Data; do not preload the whole course. Fetch bytes without instantiating offscreen animated SVG images, so their playback does not start early.
- Lesson/editor renderers and the template catalog load when opened. Home must not import Markdown/highlighting libraries indirectly through a developer panel.
- Public static assets use ETag revalidation; injected HTML and account APIs remain uncached. Do not add a service worker or version-busting timestamp to every ordinary asset.
- Run `npm run test:assets` for slow/failed media, retry, navigation cancellation, deferred modules, next-step requests, and reduced motion.
- The entry's responsive `<picture>` uses lossless WebP hero copies with the original PNG fallbacks. The asset check compares actual decoded RGBA pixels. Regenerate a copy with `cwebp -lossless -exact -metadata all -m 6 -mt SOURCE.png -o SOURCE.webp`, then run that check; `cwebp` is an optional authoring tool, not an app dependency.

The Pages workflow runs `npm run ci` (the release gate), including `scripts/package-preview.mjs` and tests against its exact `_site/` artifact. It copies only the required browser dependencies, including the editor icon font, and excludes server/data/test tooling. TypeScript, axe-core and Playwright remain development-only dependencies. Codex is an environment tool, not an application dependency.

## Extension recipes

- **Add a lesson:** follow [the authoring guide](../LESSON_MARKDOWN_AUTHORING.md), register it in `src/data/lessons/subject-lesson-registry.js`, and set boundaries in `src/data/subject-roadmaps.js`. Preserve published IDs. Verify with `node --test tests/lesson-authoring.test.mjs tests/subject-lesson.test.mjs` and `npm run build`; exercise its questions in the browser.
- **Change a control:** start at its renderer in `src/ui/`; shared actions/fields belong to `src/styles/system.css`, tokens to `base.css`, and variants to the feature stylesheet. Run the feature's markup tests and browser journey; check keyboard, narrow layout and reduced motion.
- **Change an account result:** `src/services/learner-session.js` coordinates the session, `auth-client.js` carries requests, and `src/server/auth-api.mjs` validates HTTP input. Update `visitor-flow.js` at the consumer. Run `node --test tests/learner-session.test.mjs tests/auth-client.test.mjs tests/auth-api.test.mjs`.
- **Change progress:** start in `src/services/subject-progress-store.js` and its pure rules in `src/domain/subject-progress.js`; Home and the subject journey share the application-root store. Run `node --test tests/subject-progress.test.mjs tests/learner-dashboard.test.mjs` and the progress browser journey. Never rename persisted identities as a refactor.
