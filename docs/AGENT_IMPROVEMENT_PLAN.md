**Learning app — concrete improvement plan for agent-led development**

Prepared 2026-09-06 against the current working tree. Scope: `learn/`, the app rated in the preceding review. The original findings below describe the starting tree. Implementation and verification evidence is recorded at the end of this document. Mascot Studio needs its own assessment before receiving these scores or changes.

The objective is to make useful changes easy for an agent to locate, implement, and verify, while making learner data and the eventual hosted service reliable. A higher score must follow demonstrated behavior. File moves, extra documentation, test counts, and new dependencies do not earn points on their own.

This is the user's newly requested, broader plan for Learn. It supersedes the Learn prioritization in [the earlier bounded handoff](QUALITY_IMPROVEMENT_HANDOFF.md); that document's Studio work is outside this plan. Current user instructions and [AGENTS.md](../AGENTS.md) still govern implementation. A plan is a backlog, not permission to publish or deploy.

**What already works and should be retained**

The previous sessions made useful improvements: documented feature ownership, separated lesson renderers/styles, cancellation and media readiness, bounded browser protocol requests, static-file revalidation, and verification before Pages packaging. The review ran `npm run verify` successfully: 124 Node tests, syntax/static validation, browser journeys, and asset/loading checks. These are the baseline, not evidence that all behavior is covered.

Keep native ES modules, the existing Node server handlers, SQLite accounts, the authoring format, stable URLs/query parameters, published lesson/step/part IDs, account identities, and existing artwork. Preserve Arabic RTL, loading states, focus restoration, motion preferences, and both local-account and static-fixture modes. Preserve local data and unrelated uncommitted work. No framework rewrite, monorepo conversion, automatic deployment, or bulk cleanup of reference assets is needed.

**Execution order and expected outcome**

The sections below retain the original requirements and acceptance checks. Use the implementation record at the end for current status; the whole plan remains incomplete while A07 conflicts with the current white-text/bright-color direction in AGENTS.md.

| Order | Item | Main outcome |
| --- | --- | --- |
| 1 | A01 — Correct the agent entry points | Accurate owners, commands, and current instructions. |
| 2 | A02 — Repair progress ownership and persistence | Home agrees with lessons; valid progress survives corrupt records and concurrent tabs. |
| 3 | A03 — Check the contracts agents depend on | Incorrect calls fail before an agent reaches the browser. |
| 4 | A04 — Simplify the active-view lifetime | Navigation has one small, explicit cleanup/cancellation contract. |
| 5 | A05 — Make account modes and static packaging explicit | Tests exercise the actual shipped preview without a hidden API. |
| 6 | A06 — Make verification complete and diagnostic | One clear gate, targeted entry points, useful failure evidence. |
| 7 | A07 — Fix accessibility defects and add a gate | Contrast, names, focus, errors, and keyboard behavior are checked. |
| 8 | A08 — Clarify the remaining style owners | Shared controls and reference-only styles stop sharing an ambiguous owner. |
| 9 | A09 — Check the other browser engines | Core journeys pass in Firefox and WebKit as well as Chromium. |
| 10 | A10 — Add durable account-owned progress | Two devices agree; retries and migrations preserve progress. |
| 11 | A11 — Prepare the existing server for hosting | Development capabilities are explicit; review requests cannot build an unlimited queue. |
| 12 | A12 — Prove capacity, recovery, and delivery cost | Measured workload support, a successful restore, and reproducible performance evidence. |

Implement sequentially by default. A07 can move earlier after A02 if it does not overlap another change. Do not combine persistence migration, CSS reorganization, and test-harness changes in one patch.

**A01 — Correct navigation and naming at the actual source**

Problem: [README.md](../README.md), line 50, says the manageability audit enforces ownership and file-size budgets. [The script](../scripts/audit-manageability.mjs) now prints an advisory inventory. [the former prototype service](../src/services/learner-session.js) exports `createFixtureProductService` and reports `kind: "fixture"` even when it uses the real account API. [subject-progress-store.js](../src/services/subject-progress-store.js) performs persistence under `data/`. The architecture guide has to explain these exceptions. Historical audits also describe superseded code.

Fix:

- Correct README's check descriptions and link to the existing architecture/check map. Mark old findings as historical or superseded in place. Keep AGENTS short; put detailed ownership in ARCHITECTURE only.
- Rename the account/visitor coordinator to `src/services/learner-session.js`, exporting `createLearnerSession`. Keep guest-trial, account, selection, and fixture-scenario coordination together until an actual behavior requires another owner. Give its mode an accurate value.
- Move the existing progress persistence module to `src/services/subject-progress-store.js` during A02. Keep pure progress rules in the domain layer when extracted for transaction/backend reuse. These are targeted moves, not a directory-wide naming campaign.
- Update internal imports, tests, and the existing architecture rows in the same change. Keep all persisted key strings and account/lesson identifiers stable. Do not leave permanent forwarding-only modules unless an actual external consumer needs compatibility.
- Add short extension recipes to ARCHITECTURE for adding a lesson, changing a control, changing an account result, and changing progress. Reuse the authoring guide; do not duplicate it.

Acceptance: a fresh agent can follow each recipe directly to the implementation, style owner where relevant, and focused test. The normal validator resolves all maintained links/imports. The README describes the commands that actually run. No runtime behavior or persisted identity changes merely because of the rename.

**A02 — Give progress one owner and fix the reproduced data defects**

Problems and evidence:

- [subject-progress-store.js](../src/services/subject-progress-store.js), `recordsFor` and `record`, caches an owner's whole record collection and writes that collection back. In an in-memory reproduction, two store instances loaded the same empty owner; A completed part A, then B completed part B. Reload retained B and lost A.
- `recordsFor` destructures each stored entry before checking its shape. Inserting `null` before an otherwise valid entry caused restoration to stop; the later valid part became incomplete. The default error callback is empty, so ordinary callers can also hide persistence failures.
- [learner-dashboard.js](../src/ui/learner-dashboard.js) uses `getLearnerHomeSnapshot()`. [the former prototype service](../src/services/learner-session.js) returns a predefined account scenario there, including in API mode. [subject-learning.js](../src/ui/subject-learning.js) creates its own progress stores. A probe recorded one completion/10 XP while the Home snapshot still reported zero completion/zero XP. This is a current fixture boundary that must be connected for a real learning experience.

Fix in three cohesive steps:

1. Validate each stored entry before destructuring it. Skip only the invalid entry, preserve subsequent valid records, and report a recoverable storage error through the existing application feedback pattern. Do not overwrite unsupported/newer versions with an empty collection.
2. Compose progress once at the application root and inject the same progress owner into Home and the subject journey. Calculate dashboard progress, XP, streak, solved/review counts from the learner's records and published roadmap. Fixture scenarios remain explicit developer examples; they must not supply real member statistics. Reuse the existing reward/completion rules. Do not invent mastery or achievements for which there is no evidence.
3. Make persistent member updates transactional. The recommended local implementation is one narrow IndexedDB adapter, keyed by the existing owner/subject/lesson/part identities, with each read-current/apply-update/write in one read-write transaction. Keep guest state in its current session scope. This is justified by the reproduced lost-update defect; rereading localStorage before writing is not an atomic concurrency fix. Browser transaction scheduling provides the needed serialization. [IndexedDB transaction rules](https://www.w3.org/TR/IndexedDB/#transaction-scheduling).

Use the existing store interface as the caller boundary, with explicit asynchronous writes and subscriptions. Define completion as monotonic, union valid completed step IDs, award completion XP once, and apply review answers against the latest record inside the transaction. Refresh cached summaries after a write and when another tab becomes active. Avoid a general event bus, arbitrary JSON deep-merging, or a custom conflict-resolution framework.

Import existing v1 localStorage records idempotently in a transaction. Retain the original keys/data as a recovery source; mark import complete only after commit. Do not continuously write both formats or re-import an old review state over a newer one. Expose pending/failed saving honestly and preserve the in-memory answer after storage denial/quota failures. A10 can reuse this local adapter for pending work; it must not become a second authority for server-confirmed rewards.

Acceptance:

- Regression tests first reproduce both failures above and pass after the fixes.
- A real two-tab check interleaves writes to different parts and the same part; reload preserves both valid completions and never duplicates XP. Simultaneous review updates follow the documented ordering rule.
- Completing a real part updates Home and roadmap summaries consistently without signing out or refreshing. Guest and account A/B data remain separate.
- Interrupted/failed migration preserves the original record set. Retry imports once. Invalid entries do not discard valid neighbors. Saving failures are observable and do not falsely claim durable success.

Use `tests/subject-progress.test.mjs`, `tests/learner-dashboard.test.mjs`, service tests, and the existing roadmap/account browser journeys. Add only the missing concurrency, restoration, and Home-consistency cases.

**A03 — Add checked contracts where agents currently have to guess**

Problem: [package.json](../package.json) checks JavaScript syntax but has no type-checking gate. Routes, account results, progress keys/outcomes, renderer results, and cancellation callbacks cross module boundaries as implicit object shapes. For example, some renderers return a disposer function while [lesson-view.js](../src/ui/lesson-view.js) returns an object containing `destroy`. A caller must learn the distinction from implementation code.

Fix: add TypeScript as a development-only checker for the existing JavaScript, using JSDoc and no emitted code. Start with route/session/progress contracts and the callers that use them, then the renderer/lifecycle boundaries. Use explicit success/failure result variants, required identity fields, and one documented cleanup type. Keep runtime validation for storage, authored content, and HTTP input; types do not validate untrusted data. Selective `@ts-check` supports incremental adoption without converting the app to TypeScript. [TypeScript's JavaScript checking guide](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html).

Put each type beside its existing owner; share a type only when multiple modules actually use it. Type empty arrays/null defaults explicitly where inference would permit arbitrary shapes. Do not introduce a large central types file, an ORM, a schema-generation system, or broad `any`/ignore directives to obtain a green result.

Add `check:types` to `check`. Extend the existing static validator with only the valuable boundaries: browser code must not import server-only modules, and domain rules must not depend on UI or browser storage. Use the installed checker's parser for import analysis if the current regex cannot handle a case; avoid creating another dependency-graph platform.

Acceptance: in a disposable copy, a wrong progress key, unknown account-result property, wrong cleanup value, or forbidden browser-to-server import fails with file/line context. Correct callers pass. New public functions in these areas have checked input/result contracts. Runtime output and deployment dependencies remain unchanged.

**A04 — Reduce the number of navigation rules an agent must remember**

Problem: [main.js](../src/main.js) owns generation and cleanup, but passes `beginRequest`, `isCurrentRequest`, `disposeActiveContent`, `useContentLifecycle`, and cleanup setters separately into [subject-learning.js](../src/ui/subject-learning.js) and [development-views.js](../src/ui/development-views.js). Different consumers use different cleanup return shapes. Existing cancellation works in tested flows; this is a maintenance risk, not a claim that every navigation currently fails.

Fix: give the existing active-content lifetime a small owner, `src/app/view-lifecycle.js`. A new view operation cancels/disposes the previous one and supplies its current-operation check, signal, and cleanup registration. Route parsing/history stay where they are. View motion and decoded-media readiness keep their existing owners. Local question/form operations keep their own shorter lifetimes.

Replace the related callback plumbing at actual call sites; do not add a generic router, lifecycle framework, dependency container, or global state manager. Preserve shell-restoration cleanup while a destination is loading, and compose it with the mounted renderer's cleanup. A stale operation cannot register cleanup for the new view.

Acceptance: delayed lesson/editor imports, failed CSS/media, rapid page changes, browser Back/Forward, and closing while loading all leave the latest view intact. Disposal happens once and removes listeners/pending controls. Focus and shell geometry match the existing behavior. Run the affected Node tests and browser, assets, and render suites. The result must remove duplicated coordination from callers, not merely rename it.

**A05 — Test the real account modes and the actual static artifact**

Problem: [main.js](../src/main.js), lines 33–36, chooses fixture mode only when the hostname ends in `.github.io`. [browser-smoke.mjs](../scripts/browser-smoke.mjs), lines 84 and 442, uses `?static=1` to change the development flag, while still serving the app through `dev-server.mjs`. A browser probe of that scenario requested `/api/auth/session`. It therefore does not establish that the packaged, API-free Pages preview works. Packaging itself lives in [pages.yml](../.github/workflows/pages.yml), separately from local validation.

Fix:

- Define one explicit boot setting for account mode in the entry HTML/config. The local/hosted server supplies HTTP mode; the static packager supplies fixture mode. Keep mode separate from permission to open developer tools. Read it through one small app-config owner. Preserve base paths and existing URLs.
- Replace hostname inference as the authority. Do not silently switch real-account users to fixture accounts when an API fails.
- Extract the current allowlisted copy operation into one `package:preview` script used locally and by Pages. Keep `build`'s current validation meaning until scripts/docs are deliberately updated together.
- Serve the assembled artifact from a temporary plain static server under a repository prefix, with no account API and no live-reload injection. Exercise entry, guest progression, fixture sign-in, lesson assets, and the existing developer-reference routes intended for that preview. Fail on account API requests, missing modules/styles/fonts, or leaked server/private files.
- Ensure the artifact tested by the release gate is the same artifact uploaded by Pages. Keep verification before upload/deploy; do not dispatch deployment during maintenance.

Acceptance: HTTP-mode accounts survive server restart as before. Fixture mode works on localhost under a path prefix without `.github.io` or test-only global overrides. The static journey fails if a required dependency is removed from the artifact. Server source, real data, and test tooling are absent from the artifact. Both modes preserve their documented refresh/session behavior.

**A06 — Make the check result a dependable handoff between agents**

Problem: the browser protocol is now bounded, but focused journeys are selected with environment flags and several scripts still own separate scenario setup. `verify` omits `test:render`; CI therefore does not automatically cover that class of regression. The deployed artifact, accessibility, and other browser engines are not yet covered by the normal gate. Passing counts can hide the missing behaviors reproduced in A02/A05.

Fix:

- Preserve `check` as the fast non-browser gate. Keep `verify` as the complete local Chromium gate, including render, media, and accessibility checks. Give common existing journeys discoverable npm aliases such as `test:accounts` and `test:progress`; invoke the existing scenarios instead of copying them.
- Add a release gate that also builds/tests the static artifact and runs A09's compatibility journeys. Have `ci` and the Pages workflow call that gate and preserve the tested output.
- Reuse `browser-session.mjs` for transport and `browser-page.mjs` where a focused isolated page fits. Keep fault/first-paint interception setup specific to those suites; do not create a universal test adapter.
- Make a failed journey report its name, mode, route, viewport, expected state, actual state, console/network failure summary, and a screenshot where useful. Save temporary artifacts with bounded retention. Exclude credentials, real learner data, and full account payloads.
- Retain process cleanup and command deadlines. Use readiness conditions for ordinary waits, and keep deliberate delays for slow/interrupted-load tests. A timeout increase requires a demonstrated timing need; it must not hide a missing response.
- Full gates must reject or clear focus-only/screenshot-stop flags that would silently shorten a run. Keep focused commands available for iteration, but print the actual scope and mode in every result.

Acceptance: every task has a direct focused command and a complete gate. Missing browser prerequisites produce a useful setup error and nonzero status. A deliberately broken assertion/protocol response in a disposable copy fails with useful evidence and leaves no test process/profile behind. CI does not upload/deploy after a failed check. No existing behavioral assertion is weakened merely to finish a refactor.

**A07 — Fix accessibility defects and keep agents from reintroducing them**

Confirmed defect: [visitor-flow.css](../src/styles/visitor-flow.css), lines 57–58, uses white text on `#58cc02` and `#1cb0f6` text on white. Computed browser colors at 1440px and 390px yield contrast ratios approximately 2.09:1 and 2.44:1. Both are below even the large-text minimum. Other action/focus colors need the same audit; do not assume only these two selectors are affected.

Fix the original rules while preserving the bright surfaces and layout. Reuse the existing dark green action ink and `--system-blue-ink` where appropriate; put repeated color roles in `base.css`. Target at least 4.5:1 for ordinary action labels, including narrow-screen text. The standard allows 3:1 for qualifying large text, but using readable pairs at all current sizes is simpler. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Add development-only `axe-core` to the existing browser harness and a `test:a11y` command. Audit rendered entry, each account step/error, Home, roadmap/brief, lesson question types, review, completion, and current dialogs. Fix exposed naming, grouping, live-region, contrast, and focus defects at their owners. Keep native controls; no custom accessibility widget library is needed.

Acceptance: no unresolved automated WCAG A/AA violations in the supported audited states; no blanket rule disables. Check keyboard-only completion, Tab/Shift+Tab and Escape, RTL arrow navigation, focus after errors/back navigation, 320/390px layout, 200% zoom, reduced motion, and failure/retry states. Uncertain automated results must be investigated. Automated checks cannot establish complete screen-reader usability; retain that limitation until assistive-technology testing is actually performed. [axe-core's coverage limits](https://github.com/dequelabs/axe-core).

**A08 — Give remaining shared styles clear responsibility**

Problem: [system.css](../src/styles/system.css) mixes shared action/field/feedback controls with UI Lab/playground and the current reference gallery. It is loaded eagerly by [index.html](../index.html). Alongside feature-local palettes, that makes an agent trace unrelated reference styles to understand an ordinary control. This is a concrete ownership mixture; its 660 lines are not the reason to change it.

Keep shared controls in their existing shared owner. Move reference-gallery-only selectors to a stylesheet owned and loaded by the current reference screen. Keep playground-only selectors with that feature. Use the existing loader/readiness pattern and preserve cascade position; keep shell geometry eager. Consolidate only actual repeated semantic colors/controls, starting with A07's demonstrated contrast defect. Do not consolidate unrelated layouts merely because their numbers happen to match.

Acceptance: a control color/spacing change has one documented authoritative rule; feature variants are explicit. A scoped style change leaves unrelated screens unchanged in before/after captures. Home no longer needs gallery-only CSS. First-paint, narrow layout, keyboard, and reduced-motion checks still pass. Keep all URLs/artwork and avoid mass selector renames, breakpoint unification, arbitrary file-size limits, or appended override layers.

**A09 — Add a small compatibility suite for the actual audience**

Problem: current CDP tests verify Chromium. Narrow emulation inside Chromium does not verify iPhone Safari's engine. Storage transactions, focus/inert handling, layout, media decoding, and native ES-module loading all matter to this app.

Add a development-only Playwright compatibility suite for six critical journeys: guest entry/trial, account registration/sign-in, lesson completion/Home consistency, reload/progress isolation, keyboard dialog/back navigation, and loading cancellation/reduced motion. Run it in WebKit and Firefox; retain the existing Chromium suites for detailed fault injection and first-paint evidence. Avoid migrating every existing test or building an abstraction to disguise the different harnesses.

Acceptance: these journeys pass against the appropriate HTTP and packaged-static modes in the release gate. Install/cache supported browser builds in CI explicitly. Record browser/version and platform. A WebKit run is useful engine coverage, not a claim of a physical iPhone or branded Safari test. [Playwright browser support and Safari limits](https://playwright.dev/docs/browsers).

**A10 — Add durable, account-owned progress using the current server**

Problem: accounts persist in SQLite, but member learning progress is browser-local. A second device cannot restore it. Browser-held completion/reward values are not a sufficient authority for a hosted account service. These limitations remain even after A02 fixes local consistency.

Build on the existing server and account identity. Add a progress API/client/store using the same SQLite database and the async progress boundary established in A02. Reuse pure progress rules from the domain owner. A read endpoint returns the authenticated learner's progress; writes resolve the account from its session and validate published subject/lesson/part/step IDs. Never accept another learner's owner ID or a client-supplied XP total as authority.

Apply updates in database transactions. Merge valid completed steps, enforce the existing completion rule, and make repeated completion/update IDs idempotent. Keep review state, completion, mastery, rewards, and access separate. Use revisions only where a mutable review record needs conflict detection; no general distributed merge protocol is needed.

Import the signed-in account's existing local progress with a resumable, idempotent migration. Preserve identities and visible earned history without awarding it again. Keep the source records until server acknowledgement. Do not automatically attach another account's or a guest's records. Preserve pending answers locally on network failure and retry through the same account-bound client; mark confirmed versus pending saves accurately. Reuse the local transaction adapter for that bounded pending work rather than adding a service worker or background job system.

Acceptance: two independent browser profiles signed into the same test account see consistent progress; another account cannot read/write it. Lost responses, retries, overlapping completions, and account switches cannot duplicate XP or attach data to the wrong learner. Restarting the server preserves progress. Failed migration can resume without changing IDs or losing the original data. Guest/static fixture behavior remains supported and clearly scoped.

This is real backend implementation, not a naming cleanup. Complete A03/A05 first so agents have a checked contract and a reliable way to exercise both modes.

**A11 — Make the existing runtime suitable for a hosted workload**

Problems: [dev-server.mjs](../dev-server.mjs) always composes live reload and developer handlers. [explanation-review-api.mjs](../src/server/explanation-review-api.mjs) does not perform the auth/origin/rate-limit checks used by the account API. [explanation-review.mjs](../src/server/explanation-review.mjs), `createLimiter`, limits active work to two jobs but accepts an unlimited waiting queue. Auth rate limits use the direct socket address, which needs an explicit policy behind a trusted proxy.

Fix:

- Add a production entry/configuration using the existing handler composition. Development-only reset, live reload, and author-supplied grading previews must be unavailable there. Preserve their local development behavior and URLs.
- Keep the normal app/static and sandbox protections. Make public origin, secure cookies, trusted proxy handling, database path, and shutdown behavior explicit and validated at startup. Do not trust arbitrary forwarded headers.
- Give review requests an authenticated or explicitly bounded trial policy consistent with the approved guest experience. Validate origin and input; add per-actor limits, a finite waiting queue, deadlines, and cancellation of disconnected queued requests. Return an honest busy/unavailable result with retry guidance when saturated.
- Reuse the existing review-provider boundary. The local CLI adapter remains useful for development; a hosted configuration must have a working provider and an integration test. Missing credentials/provider must not fabricate a score.
- Add a minimal health/readiness check and structured error/request timing logs with private content omitted. Keep one Node process and one local SQLite database for the initial deployment.

Acceptance: production mode does not expose reset/live reload/authoring-only mutation paths. Cross-origin/unauthorized review submissions cannot consume work. Queue saturation has a fixed bound and recovers after timeout/disconnect. Proxy tests demonstrate distinct clients are not accidentally treated as one rate-limit bucket and spoofed headers are rejected. Graceful shutdown does not report unfinished writes as saved. Existing local browser workflows still pass.

**A12 — Measure scale and prove recovery before claiming production readiness**

Problem: the asset inventory reports 28.9 MiB across the asset directory; that is not a measured page download. The entry currently links 25 local stylesheets. Existing media deferral and revalidation help, but there is no demonstrated production workload, recovery objective, or restore drill. SQLite itself is not a reason to replace the database.

For planning, start with a single-host release target of 100 simultaneously active learner sessions, a steady 20 progress operations/second, and a short sign-in burst. These are proposed test inputs, not measured capacity or a promise about launch traffic. Record the chosen machine and traffic mix; revise the workload when actual launch requirements are known.

Measure cold/warm entry, Home, lesson opening, next-step interaction, and return navigation at narrow/desktop widths using the existing Chrome harness, repeatable throttling, and the packaged artifact. Record actual transferred bytes, request counts, ready-to-use timing, layout shifts, and retained memory after repeated navigation. Keep approved media; optimize the assets/routes shown to dominate the measurements. Preserve decoded-media entrance ordering. Do not add a bundler, service worker, CDN product, or extra cache layer merely to reduce the request count.

Exercise the server with isolated HTTP test users under the chosen workload, including concurrent writes and a bounded review-provider stub with representative latency. Proposed initial acceptance: progress/session requests have p95 under 500 ms at that workload, unexpected server errors below 0.1%, no lost updates or duplicate rewards, and bounded queue/memory growth. Account hashing and external review need their own measured latency targets. A local run establishes local capacity only; repeat against the actual host before calling it production capacity.

Add a SQLite-aware backup command and a restore-to-temporary-database check, preserving accounts, sessions as appropriate, schema version, and progress. Test a migration on a copy before using real data. Use the supported backup mechanism or a quiescent backup procedure, not an arbitrary copy of a live WAL database. [SQLite backup guidance](https://www.sqlite.org/backup.html). Proposed first-release objectives are no more than one hour of data loss and restoration within 30 minutes; confirm these against the eventual hosting arrangement.

Acceptance: restore and migration rollback/recovery have been demonstrated using disposable data; capacities and recovery times are recorded with the environment and workload. Packaging, database migration, backup, and rollback commands are reproducible by an agent. No hosting purchase or deployment is part of writing or implementing the local maintenance plan unless separately requested. Add infrastructure only when a measured limit requires it.

**How agents should implement and verify this plan**

- Take one item and its acceptance checks. Read current guidance, the named owners, and their tests. Inspect the existing diff first. Match the task's scope; do not search product history or both apps for a local change.
- For the demonstrated defects, establish the failing regression first. For refactors, keep the existing behavior checks intact and add coverage only for a meaningful uncovered boundary.
- Keep one implementation owner at a time by default. If parallel work is later requested, use isolated worktrees based on an agreed checkpoint and disjoint responsibilities. Never use reset/clean/stash or a broad commit to sweep aside existing user work.
- Update the architecture row and focused command when ownership changes. Keep completion evidence in this plan or the change description, not a new report for every task.
- Run the focused checks while editing, then the affected gate once. UI work includes narrow screens, keyboard, reduced motion, and interrupted navigation; loading changes include the temporal tests. A green Node test run alone is not completion of a UI task.
- Review the diff and failure artifacts in a separate review pass. This can be an agent review; it does not require a human to read the code. Check that tests still exercise the original requirement and that no timeout, exclusion, copied implementation assertion, or screenshot rebaseline merely hid a failure.
- Report each item as verified, still failing, or not run, with the exact evidence. Record any new module/dependency and the responsibility it removes from existing callers. Do not mark the whole plan complete while an acceptance condition is unresolved.

The initial tooling additions are limited to checked JavaScript contracts, automated accessibility, and the small compatibility suite: TypeScript (and Node declarations if needed), axe-core, and Playwright. They remain development dependencies and stay out of the browser artifact. A formatter/linter overhaul, agent orchestration service, plugin system, generated architecture database, microservices, Redis, Kubernetes, and an ORM are unnecessary for these deliverables.

**What would justify higher scores**

The previous ratings were rough engineering judgments, not a measured before/after benchmark. These targets are conditional on the evidence above; they are not promised scores for completing a list of file changes.

| Area | Previous rating | Plausible target | Evidence required |
| --- | --- | --- | --- |
| Finding things / agent navigation | 8.5 | 9–9.5 | Current owner/recipe/check map; misleading names resolved; ordinary work stays within the relevant feature. |
| Simplicity to maintain | 8 | 9–9.5 | One progress owner and one active-view contract; clear style ownership; no duplicate data authority or speculative layers. |
| Testing and reliability | 8.5 | 9–9.5 | Reproduced data defects fixed; real HTTP/static artifacts and critical engines tested; useful, bounded failures. |
| Accessibility foundations | 7 | 9–9.5 | Contrast and audited semantic/keyboard/loading states pass; remaining assistive-technology limits stated accurately. |
| Production scalability | 5 | About 8 after implementation; 9+ only for a verified workload | Cross-device persistence, bounded work, successful restore, and tests on the actual intended hosting environment. |
| AI agent management / ease of improvement | 8 | 9–9.5 | Agents can locate the owner, rely on checked contracts, make a scoped change, and produce meaningful verification without human code interpretation. |

The practical agent-readiness check is the next real lesson addition, control change, and account/progress fix: each should follow the documented owners, avoid unrelated rewrites, and finish with the relevant gate and useful evidence. Observe those tasks when they are requested; do not manufacture throwaway product features to satisfy a score. A perfect score cannot guarantee that every future agent will make zero mistakes.


**Implementation record — 2026-09-06**

The changes retain native JavaScript modules, the existing Node server, SQLite, published identities and original image URLs. No framework, ORM, service worker, deployment or account-data reset was introduced. Other in-progress UI work, including deeper lesson URLs and the user's final bright palette, was preserved. All account/storage/recovery checks use disposable data.

Local implementation and verification are complete for **11 of the 12 items**: A01–A06 and A08–A12. **A07 remains partially resolved**, so the full plan is not complete and the release gate does not pass. The later instruction in [AGENTS.md](../AGENTS.md) preserves white text on bright cards and filled buttons; the current navbar also retains its bright resource-count colors. These remaining contrast findings are recorded below. The strict gate remains enabled.

| Item | Status | Implementation and evidence |
| --- | --- | --- |
| A01 | Verified locally | `learner-session.js` owns account/visitor coordination and reports its actual mode. README, ARCHITECTURE and historical audit banners were corrected. The validator now checks maintained entry-document links and browser imports. A disposable broken README link fails with its file/line. |
| A02 | Verified locally | One root-injected progress store owns cache, subscriptions, pending writes and recovery feedback. Domain rules are shared with transactional IndexedDB and SQLite adapters; guests stay session-scoped. Reproduced corrupt-neighbor and concurrent-write losses, then verified fixes in Node and two real tabs. Blocked storage getters, failed writes and interrupted imports produce visible feedback; originals survive. |
| A03 | Verified locally | Selective checked JavaScript covers route, session, progress, renderer and lifecycle boundaries. Disposable wrong progress keys, unknown account-result properties, wrong cleanup objects and forbidden browser/server imports all fail with file/line context. Correct code passes `check:types`. |
| A04 | Verified locally | `view-lifecycle.js` owns cancellation, current-operation checks and once-only cleanup. Controllers use that operation instead of the former callback bundle. Lifecycle Node tests pass; browser/render verification passed as recorded below. |
| A05 | Verified locally | HTML explicitly selects HTTP/fixture mode. The allowlisted packager and API-free prefix host test the actual `_site/` artifact. Removing `marked` from a disposable artifact fails the real lesson journey and cleans up its Chrome profile. HTTP and packaged-fixture journeys passed as recorded below. |
| A06 | Verified locally | `verify` includes full Chromium/accessibility journeys, UI regressions, storage/sync, render and media. `release` adds packaging, static journeys and Firefox/WebKit; CI uploads that tested artifact. Gates reject scope-shortening flags. Failures include state, mode, route, viewport and network context, with five retained failure bundles. |
| A07 | Still failing | Names, native-radio behavior, errors, recovery feedback, developer navigation, Markdown tasks, fill-slot semantics and editor keyboard access were corrected. Muted helper/code text was corrected at its owner. **Still failing:** contrast within the approved bright palette, including white labels and the navbar resource counts. No accessibility rule or affected control was excluded. |
| A08 | Verified locally | Shared controls remain in `system.css`; gallery and playground styles have separate lazy owners through the existing readiness pattern. Nine computed-style comparisons across Home/gallery/playground at 320/390/1440px found zero differences from the split itself. Later deliberate UI/color corrections are separate from that comparison. |
| A09 | Verified locally | Six critical journeys run in Firefox and WebKit against HTTP and packaged fixture modes. All 24 engine/mode journeys passed; versions are recorded below. WebKit on Linux is not a physical iPhone/Safari test. |
| A10 | Verified locally | Account-bound SQLite progress, validated identities, idempotent updates and an IndexedDB outbox support two profiles and offline retries. Tests cover lost responses, account switches, overlapping completion, mutable review ordering and restart persistence. A reproduced interrupted multi-part import now retains all local source records until every part is acknowledged. JSON property order no longer changes an update's identity. |
| A11 | Verified locally | Production configuration validates origin, durable database path and provider URL; proxy trust is explicit. Development endpoints are blocked in production. Review work has two active/eight queued limits, deadlines, cancellation, per-actor limits and a streamed response-size bound. HTTP provider/configuration/queue tests pass with a local provider; real-host/provider validation remains a launch task. |
| A12 | Verified locally | Local sustained capacity, live-WAL backup/restore and copy-only migration/rollback checks pass. Packaged-browser measurements identified the hero PNGs; lossless WebP copies preserve decoded pixels and PNG fallbacks. Quantitative results follow. |

The new development dependencies are TypeScript 5.9.3, Node declarations 24.3.0, axe-core 4.13.0 and Playwright 1.63.0. They are excluded from the preview. New modules separate only concrete owners: view lifetime, account-mode configuration, pure progress rules, persistence adapters, progress feedback, bounded review work, production composition and focused check/packaging tools. The existing root/controllers no longer own those mechanics.

The two accepted hero copies were made with `cwebp -lossless -exact -metadata all -m 6 -mt`; the browser asset check compares decoded RGBA hashes against the PNGs. Mobile falls from 1,867,580 to 1,474,524 bytes (21.0%); desktop from 1,344,223 to 1,003,700 bytes (25.3%). An attempted lesson-image WebP was rejected after decoded edge pixels differed; the original lesson PNG remains.

**Local capacity and recovery evidence**

The sustained run used Linux 6.6.135, Node 26.3.0, an Intel Celeron N4100 at 1.10 GHz, four logical CPUs and 6.88 GB RAM. Client and server ran on the same machine. `CAPACITY_SECONDS=180 npm run test:capacity` used 100 accounts, 20 progress writes and 20 session reads per second, one review per second with a 600 ms HTTP stub, and a ten-user sign-in burst.

All 7,390 responses were HTTP 200. Progress p95 was 93 ms; session p95 85 ms; sign-in p95 1,413 ms; review p95 764 ms. No updates were lost or rewards duplicated. Peak RSS was 266,551,296 bytes; after first-minute growth it stayed around 240–267 MB for the remaining two minutes. The review queue stayed at zero in this workload; separate saturation/deadline tests exercise its fixed bound. This establishes local capacity only, not launch-host capacity or a live review-provider latency guarantee.

A live-WAL snapshot restored 100 account IDs, 110 sessions, 100 progress records and 3,600 update receipts in 692 ms, preserving schema version 1 and invalidating no sessions. Separate tests migrate a legacy database on a copy, reject a future schema before alteration, exercise rollback/recovery, and clean up an unsuccessful backup destination. Original data remains unchanged. The proposed one-hour data-loss objective still requires scheduled backups on the eventual host; this local drill does not establish that objective.

Evidence: ignored `artifacts/capacity.json`; temporary `/tmp/learn-capacity-sustained.log` and `/tmp/learn-plan-runtime-final.log`. Backup, restore-check, migration-check and compatible-version rollback commands are in README.

**Packaged-browser measurement**

Chrome 151.0.7922.71 on the same Linux machine; CPU slowed 4×, 100 ms network latency, 1.6 Mbps download and 750 Kbps upload; reduced motion; self-hosted Arabic fonts included and external display-font services blocked for repeatability. Each viewport begins with a fresh disposable guest session. Warm requests use ordinary ETag revalidation. Deliberately throttled readiness permits 60 seconds because the measured cold entry exceeded the ordinary harness's 15-second bound; normal journey deadlines were retained.

| View | Width | Before → after ready time | After transferred bytes / requests |
| --- | ---: | ---: | ---: |
| Cold entry | 390 | 19,088 → 12,731 ms | 2,235,381 / 98 |
| Warm entry | 390 | 3,577 → 2,356 ms | 20,284 / 93 |
| Home | 390 | 4,327 → 2,632 ms | 30,260 / 95 |
| Lesson opening | 390 | 5,645 → 4,986 ms | 575,486 / 22 |
| Next step | 390 | 10,603 → 8,635 ms | 1,604,807 / 3 |
| Return to roadmap | 390 | 482 → 795 ms | 0 / 0 |
| Cold entry | 1440 | 13,606 → 11,905 ms | 1,764,555 / 98 |
| Warm entry | 1440 | 2,482 → 2,435 ms | 20,937 / 96 |
| Home | 1440 | 2,938 → 2,475 ms | 30,260 / 95 |
| Lesson opening | 1440 | 4,561 → 4,411 ms | 575,486 / 22 |
| Next step | 1440 | 9,000 → 8,614 ms | 1,604,807 / 3 |
| Return to roadmap | 1440 | 990 → 475 ms | 0 / 0 |

Cold-entry transfer fell 14.9% narrow and 16.2% desktop. These are single controlled before/after runs, not timing guarantees; unrelated warmed-route timings vary. The large lesson PNG remains a delivery cost. Entry/Home/next-step layout-shift sums were zero, apart from a 0.000011 desktop entry shift. Programmatic lesson opening/return produced 0.145/0.333 narrow and 0.364/0.616 desktop shift sums; these scripted route-transition observations are not a field Core Web Vitals score. Retained heap after garbage collection was 4,826,248 bytes before repeated navigation, 5,235,048 after ten cycles and 5,273,444 after twenty.

Evidence: ignored `artifacts/browser-performance-before.json` and `artifacts/browser-performance.json`. The measured encoding change preceded the final semantic and import-recovery corrections; rerunning `package:preview` then `measure:browser` measures the current tree. No transfer or timing threshold is being claimed beyond the recorded measurements.

**Final verification**

| Command / check | Result and evidence |
| --- | --- |
| `npm run check` | **Passed:** syntax, checked JavaScript, 160 Node tests, static validation and advisory inventory. `/tmp/learn-plan-release-final.log`; current catalog contains nine subjects, including the separately added Mathematics 2. |
| `npm run release` / its `test:a11y` stage | **Still failing:** the full Chromium journey audited 70 states and found nine contrast violations across five states. No naming, grouping or other automated WCAG violation remained; no browser/resource failure remained. The run also exposed an old seven-unpublished-subject assertion, subsequently corrected to use the catalog and verified by `test:accounts`. `/tmp/learn-plan-release-final.log`, `/tmp/learn-plan-a11y-final/`. |
| `npm run test:accounts` | **Passed:** account creation, sign-in, Home/lesson consistency, isolation and keyboard navigation with the current catalog. `/tmp/learn-plan-final-test-accounts.log`. |
| `npm run test:ui-fixes` | **Passed:** Home/shell widths and hit targets, font/fallback and long-text cases, lesson layouts, keyboard use, URL/history restoration and interrupted loading. `/tmp/learn-plan-final-test-ui-fixes.log`. |
| `npm run test:progress-storage` | **Passed:** two-tab transactions, getter/write denial, recovery feedback, interrupted imports, independent HTTP profiles, lost responses and account switches. The two focused feedback accessibility states also pass. `/tmp/learn-plan-final-test-progress-storage.log`. |
| `npm run test:render` | **Passed:** 330 recorded frames across delayed dependencies, cold/warm restoration, nested tabs, dialogs, Back/Forward, rapid navigation and reduced motion. `/tmp/learn-plan-final-test-render.log`. |
| `npm run test:assets` | **Passed:** decoding, retry/fallback, navigation cancellation, deferred imports, next-step requests, reduced motion and exact hero RGBA comparisons. `/tmp/learn-plan-final-test-assets.log`. |
| `npm run package:preview` then `npm run test:preview` | **Passed:** the actual `_site/` under `/learn-preview/`, including guest completion, fixture login, Home consistency, refresh isolation, gallery/editor/playground assets and zero API requests. `/tmp/learn-plan-final-package-preview.log`, `/tmp/learn-plan-final-test-preview.log`. |
| `npm run test:compat` | **Passed:** six journeys × HTTP/fixture × Firefox 155.0/WebKit 26.6 = 24 journeys on Linux 6.6.135. `/tmp/learn-plan-final-test-compat.log`. |
| Contract/boundary failure probes | **Passed:** wrong progress key, unknown account result, wrong cleanup, forbidden browser/server import and a broken maintained-document link each fail in disposable copies. `/tmp/learn-plan-contracts-final.log`. |
| Gate/failure cleanup probes | **Passed:** scope-shortening flags reject before work starts; missing protocol replies/process exits reject with context; removing `marked` from a disposable artifact reports its exact 404 path and cleans up the profile. `/tmp/learn-gate-guard-evidence.txt`, the browser-session Node tests and `/tmp/learn-plan-final-static-failure.log`. |

The commands after the failing accessibility stage were run individually. Their passing results do **not** mean `verify`, `release` or `ci` passed. No deployment was run. Temporary logs and screenshots may later be removed; the command scope and measured results are retained here.

The popup geometry regression was investigated with frame samples before changing the check: immediately after opening, its bottom was 296.08px against a 287px bound; the scheduled placement corrected it to 287px before the next paint and kept it there. The browser check now awaits the viewport media query and scheduled layout frames, retaining its original bounds, action hit tests and deadlines. `/tmp/learn-plan-popup-frame-2.log` records the reproduction. No production layout change or screenshot rebaseline was needed.

**A07 remaining findings and test limits**

The strict full audit reports white-on-green entry text at 2.08:1 and white Home headings on yellow/orange at 1.52:1/2.42:1, repeated at the tested widths. These are below even the 3:1 large-text minimum. The selected white/bright palette also affects other card/action states. Manual review of the short navbar numbers finds blue-on-white at 2.44:1 and red-on-white at 3.30:1, below the 4.5:1 ordinary-text target. These current visual choices remain unchanged.

Twenty-four of the 70 full-audit states also requested manual contrast review, including short glyphs/numbers, overlapping glossary content and gradient-backed labels. That review found two additional gray-number issues: template-preview line numbers and empty sequence slots. Their original rules were corrected. Focused rendered checks now measure 5.98–7.24:1 and 7.67:1 respectively and pass scoped accessibility checks; evidence is `/tmp/learn-plan-contrast-review.json` and `/tmp/learn-plan-final-contrast.log`. Gradient/card findings remain part of A07; uncertain results are not counted as an accessibility pass.

The harness normalizes stylesheet-relative CSS import URLs only while axe 4.13 runs, then restores the native getter. This corrects the audit library's document-relative fetches without disabling CSS preloading or any WCAG rule, changing production styles, or ignoring resource failures.

Keyboard, RTL controls, 320/390px layout, reduced motion, loading cancellation and retry states were exercised. The 200% reflow check uses 720 CSS pixels at device scale 2 for a 1440px desktop equivalent; native browser-menu zoom and physical assistive-technology use were **not run**. WebKit coverage is not a physical iPhone or branded Safari test. Actual hosting capacity, live provider credentials/latency and a scheduled host backup/restore drill were **not run**; they remain launch validation rather than a claim of production readiness.
