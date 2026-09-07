> Historical snapshot: findings and ownership may be superseded. Use [the current architecture](ARCHITECTURE.md) and [the active improvement plan](AGENT_IMPROVEMENT_PLAN.md) for implementation.

**Simpler maintenance and agent navigation — implementation handoff**

Updated 2026-09-06. This revision replaces the earlier broad improvement plan. Its purpose is to make the existing learning app and Mascot Studio easier to understand, change, and verify. Writing this guide does not implement its changes.

**The objective.** Reduce the amount of searching, guessing, and coordination needed for an ordinary change. Keep one clear owner for each behavior. Fix concrete reliability problems that make development uncertain. Preserve the working product.

Perfect scores are not an implementation target. A larger file, plain JavaScript, or the absence of a particular tool is not itself a defect. A successful cleanup may leave much of the code untouched.

All code paths below are relative to `/home/malikabuallatta/experiment-app/`. W01–W10 identifiers are retained from the earlier handoff so existing references still make sense; their scope and priority are revised here.

**Start with the relevant app.** Read its guidance and source map, then the affected implementation and tests. Do not load both apps or the full product history for every task.

| App | Start here | Normal check |
| --- | --- | --- |
| Learning | [AGENTS.md](../AGENTS.md), [architecture map](ARCHITECTURE.md) | `npm run check` from `learn/` |
| Studio | [AGENTS.md](../../mascot-studio/AGENTS.md), [architecture map](../../mascot-studio/docs/ARCHITECTURE.md) | `npm run verify` from `mascot-studio/` |

Search the relevant app's `src/`, `tests/`, and `scripts/` first. Use its docs when you need intent or a contract. Prefer `rg`; use a scoped fallback if unavailable. Retained backups, exports, screenshots, history, and candidate artwork are not ordinary search inputs. Their presence does not require deletion or a new indexing system.

The original review passed learning `check` with 118 Node tests, learning `test:browser`, and Studio `verify` with 54 Node tests. Those are historical results, not a guarantee about the current tree. That review did not run Studio's browser suite, learning's separate render/assets suites, screen-reader checks, or load tests.

**Preserve these boundaries.**

- Inspect the existing diff before editing. Modified and untracked files are user work. Preserve unrelated edits and data; do not reset, clean, stash, or commit them incidentally.
- Only `learn/` is a Git repository. Run Git commands there. Keep any Studio changes individually reviewable without introducing a repository reorganization.
- Keep native browser ES modules, the existing Node servers, and current storage modes. Learning's local account server and static Pages fixture preview must both keep working.
- Preserve URLs, query parameters, lesson/step/part IDs, account and clip IDs, storage keys, draft history, and current session behavior.
- Preserve Arabic RTL, the existing Home and design, native controls, visible focus, media readiness, and reduced motion. Rocky's approved rod-free SVG identity stays intact.
- The [current entry/account decision](PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md) still governs those flows. Read product records only when an actual product decision is involved.
- Use temporary accounts and uniquely named test clips. Never test resets, migrations, or recovery against the user's real records.
- Follow the current user's scope and authorizations. This maintenance pass does not include publishing, deploying, using skills, changing product behavior, or introducing production infrastructure.

**How to keep every change simple.**

1. Identify the concrete problem: an incorrect result, repeated ownership, a confusing lookup, or an unreliable check. Point to the relevant code or reproduction.
2. Prefer fixing the current owner. Reuse an existing helper when it owns the same rule. A short local function is often enough.
3. Add a module only when it gives a cohesive responsibility a clearer home and reduces the knowledge required by callers. Do not split files to meet an invented line limit, create forwarding-only layers, or move code solely for symmetry.
4. Add a dependency only when existing tools cannot reasonably meet a demonstrated need and its benefit outweighs setup and maintenance. Do not automatically install a formatter, linter, type checker, or testing framework.
5. Match local formatting in touched code. Separate any justified mechanical cleanup from behavior changes. Avoid repository-wide reformatting or mass renaming.
6. Test the outcome using existing checks. Add a regression test for a real defect when it improves confidence; avoid tests that restate the implementation or assert cosmetic file organization.
7. Update the existing source map only when ownership, navigation, or check commands change. Do not create another architecture catalog, policy system, or audit-document collection.
8. Once the item works and its required checks pass, move on. Do not keep exploring unrelated improvements to increase a score.

For a proposed refactor, briefly state: “This currently requires understanding X; the change makes Y the owner and removes Z duplication or coupling.” If you cannot explain the reduction in maintenance effort, keep the structure.

These are decision rules, not a new approval process. Make routine implementation choices within scope and continue. If an item is already resolved, record that with evidence and move to the next one.

**The bounded first pass.** Work through these items in order, one cohesive change at a time. Recheck every observation against current source before acting.

| Order | Item | Deliverable |
| --- | --- | --- |
| 1 | W06 — Navigation | Correct missing or misleading ownership/check references in the existing source maps. |
| 2 | W02 — Test reliability | Ensure browser-test requests terminate with useful failures and clean up. |
| 3 | W04 — Studio draft safety | Reproduce and fix outdated load/save responses if the risk remains. |
| 4 | W01 — Deployment checks | Make the existing Pages workflow run the verification gate before packaging. |
| 5 | W03 — Small clarity fixes | Remove confirmed duplicated rules and clarify only the contracts encountered above. |

W05 and W07 guide relevant changes and verification. W08–W10 are outside the default pass. Do not promote their observations into an additional project-wide backlog to complete automatically.

**W06 — Make owners and checks easy to find.**

The existing architecture maps are already useful. Improve their accuracy rather than replacing them.

Check that a reader can find the state owner, UI/style owner, and focused check for learning progress, account modes, lesson rendering/media, Studio document saving, and editor selection. Use the current maps as the entry point; expand only ambiguous rows.

Known naming details worth explaining in place:

- `learn/src/services/prototype-service.js` coordinates fixture and HTTP-backed account modes.
- `learn/src/data/subject-progress-store.js` owns subject progress despite living under `data/`.
- Studio's existing `src/editor/` modules already own selection, gestures, timeline, keyframes, and session coordination.

Keep names and locations when a short explanation solves the confusion. Do not rename persisted identifiers or relocate entire directory trees.

For extension guidance, add a short recipe only if the current authoring guide or source map lacks one: which existing owner to extend, which IDs/contracts to preserve, and which test to run. Do not add a runtime feature just to demonstrate extensibility.

**Done when:** the relevant map leads directly to real files and valid commands, with no conflicting owner descriptions. Record one or two actual lookup examples. No stopwatch benchmark, generated index, or extra documentation layer is required.

**W02 — Make browser tests fail clearly instead of hanging.**

Observed in `learn/scripts/browser-session.mjs`: `CdpPipe.send()` records pending protocol requests without a command deadline; outstanding requests are not centrally rejected when Chrome or its pipe exits. `rawRequest()` also lacks an explicit response deadline.

Studio's `scripts/browser-editor-smoke.mjs` has another small protocol helper. Some other Studio journeys use `server/browser.mjs`; inspect that implementation before changing or duplicating it.

Smallest useful fix:

1. Give each awaited protocol request a bounded timeout. Clear the timer and remove its pending entry on every completion path.
2. Reject pending requests on process/pipe failure or disposal. Include the command and scenario in the error, without sensitive data.
3. Bound HTTP readiness probes so one stuck request cannot defeat the retry loop.
4. Preserve `finally` cleanup for test-owned processes, profiles, intercepted requests, and fixtures.
5. Reuse the existing helper within its app where appropriate. Keep deliberate animation/delay tests; replace arbitrary readiness sleeps only where they cause a real problem.

**Done when:** a focused fault-injection check demonstrates that a missing response and a terminated test browser fail within the configured deadline, with a nonzero result and cleanup. A normal affected browser journey also passes. Stop without replacing the browser framework or building shared infrastructure across the two apps.

**W04 — Preserve Studio drafts during delayed loads and saves.**

Start in `mascot-studio/src/app.js`, especially `saveCurrentClip()`, `loadClip()`, and `loadRig()`, plus their callers and existing editor/session tests.

Source-level risk from the review: save submits a clip, awaits a response, then replaces the current clip, clears dirty state, and resets history without checking for newer local edits. Load operations also commit after awaits. The library's switching guard protects its own path, but may not cover every control or reload path. This was not a reproduced browser data-loss finding.

First exercise a disposable clip with a delayed response: edit while saving; switch documents while loading; then release the old response. If existing guards already prevent the problem, identify them and retain the working structure.

If a defect remains:

1. For replacement loads, capture an operation generation/document identity and check it before committing. Carry it through nested rig/clip loads. Aborting stale requests can help, but does not replace the check.
2. For saving, capture the submitted snapshot, active document identity, server revision, and local edit generation.
3. Mark the document clean only if that same draft is still current. Preserve newer edits and undo history. A response for document A must not replace document B.
4. Serialize duplicate saves or prevent a second submission while one is pending. Keep revision conflicts explicit and retain the local draft after failures.
5. When newer edits survive a successful save, track the saved base revision correctly. Handle any necessary server normalization explicitly; avoid a generic deep merge of clip data.
6. Verify Save/Discard/Cancel behavior so an older saved snapshot is never presented as saving newer edits.

Start by fixing the existing functions. Extract a document-operation owner only if those operations cannot remain clear without it. Keep one editor state owner and reuse the existing selection, timeline, gesture, history, and session modules. No general state framework, command bus, or service container is needed by default.

**Done when:** focused tests show that late results cannot discard newer work; normal save/reload and undo/redo still work; conflicts retain the draft; required Studio browser journeys pass. A coherent large controller is acceptable. Its line count is not an acceptance criterion.

**W01 — Keep deployment behind the existing checks.**

Observed: `learn/.github/workflows/ci.yml` runs `npm run ci`, while `pages.yml` independently packages and deploys on push/manual dispatch. The deployment workflow does not itself wait for that separate check run.

Prefer the direct fix: install dependencies consistently with CI and run `npm run ci` in the Pages job before artifact assembly. Keep verification, packaging, and deployment on the same checked-out source and lockfile. Preserve normal failure propagation and browser availability.

Keep the existing artifact allowlist, repository-prefix URLs, fixture mode, and exclusion of server/private files. Do not reorganize workflows to eliminate a little duplicated execution. If the current workflow already enforces the gate, retain it.

**Done when:** both trigger paths reach verification before packaging, the local gate passes, and a temporary assembled artifact preserves expected public files/URLs. Do not dispatch a deployment as part of this maintenance pass. State that hosted execution remains unverified until it actually runs.

**W03 — Remove specific duplication and clarify touched contracts.**

The review found `SAFE_ID` and `NUMERIC_PROPERTIES` in `mascot-studio/src/app.js`, with corresponding shared definitions in `src/contracts.js`. Check semantics and reuse the existing definitions where identical. Do not merge superficially similar rules that intentionally differ.

In code touched by this pass, clarify non-obvious inputs/results with concise names or JSDoc, particularly cancellation, save conflicts, and returned cleanup functions. Keep the existing runtime validation and tests.

Linting, formatting, and type checking are possible tools, not mandatory deliverables. The existing syntax/tests gate is useful. Add tooling only if a specific recurring problem makes it worthwhile; keep it development-only, narrowly configured, and exclude generated/vendor material. A broad tooling migration needs a separate task.

**Done when:** the identified duplicate rule has one owner, touched contracts are understandable, and existing checks pass. No requirement to annotate every file, reformat either app, convert JavaScript to TypeScript, or introduce another check framework.

**W05 — Change CSS structure only to fix a demonstrated ownership problem.**

Large files such as learning's `src/styles/system.css` or Studio's `src/styles/{base,layout,workshop}.css` are investigation pointers, not automatic refactor targets. Learning's lesson styles were already split into feature owners.

If a scoped task exposes competing rules, locate the intended owner and edit it. Keep tokens in the existing base owner, subject cards in `course-map.css`, and question styles in their current feature files. Preserve intentional responsive/context variants and stylesheet order.

Move styles only when doing so removes actual ambiguity. Capture relevant before/after states and keep eager geometry/lazy stylesheet readiness correct. Do not redesign screens, unify breakpoints, add override layers, or split all stylesheets.

**Done when:** the concrete styling issue is resolved, its owner is clear, and required visual/loading checks pass. Otherwise leave CSS unchanged and record no action needed.

**W07 — Verify the changed behavior proportionately.**

Use existing tests before adding new ones. Apply the app's guidance for the affected area:

| Change | Required verification |
| --- | --- |
| Learning source changes | Focused relevant tests, then `npm run check`. |
| Learning shared UI/navigation | Also `npm run test:browser`; exercise narrow layout, keyboard, reduced motion, and interrupted navigation. |
| Learning rendering/loading/media | Also the applicable `test:render` and `test:assets` suites. |
| Studio source/contracts | `npm run verify` plus focused regression coverage where needed. |
| Studio editor/UI behavior | Also `npm run test:browser`, preserving drafts and checking narrow layout, keyboard, reduced motion, and interrupted operations. |
| Documentation | Check paths, commands, and consistency; run the normal affected-app check. No browser run solely for prose edits. |

In learning, `npm run verify` currently includes `check`, `test:browser`, and `test:assets`; `test:render` is separate. Do not run both an umbrella command and all its parts again without a reason. Check current scripts before selecting commands.

Add meaningful failure-case coverage for the defects fixed in W02/W04. Do not pursue a test count or blanket coverage percentage. Once required checks pass, repeat them only after a relevant change, failure, or unresolved concern. Report failed or unperformed checks accurately.

**W08–W10 — Explicitly outside the default maintenance pass.**

These observations remain context for a future requested task. They are not conditions for declaring this bounded pass complete.

| Item | Retained observation | When to revisit |
| --- | --- | --- |
| W08 — Performance | Asset inventory and file size do not establish page-load cost. Existing lazy loading and bounded media/thumbnail work are useful. | A reported or measured delay, memory growth, or rendering regression. Measure the relevant device/journey first and fix that bottleneck. |
| W09 — Server/recovery review | Studio's static server uses workspace containment rather than an explicit public-file allowlist; mutation-origin handling and crash-leftover locks deserve a targeted review. These were source observations, not a demonstrated external exploit. | A dedicated boundary/recovery task or a concrete failure directly encountered in scoped work. Preserve private preview routes and existing safeguards; do not create an unsolicited security platform. |
| W10 — Production scaling | Learning progress is browser-local and accounts use local SQLite. Multi-device persistence and hosting capacity need explicit product requirements. | A requested production or synchronization task with a defined workload. Keep current storage and account behavior during this pass. |

If scoped work exposes a directly relevant correctness or data-loss defect, handle it with a focused fix and evidence. Report unrelated findings briefly for later work. Do not add hosted services, cloud sync, migration systems, workers, caches, observability infrastructure, or database replacements merely to complete this guide.

**Finish when the bounded work is verified.**

For each first-pass item, report one of: fixed with evidence; already satisfied with evidence; or unresolved with the specific reason. Conditional work can be marked not needed. Do not silently omit a required item, and do not expand the task to manufacture more improvements.

The final report should state:

- Which concrete problems were resolved and which files now own the behavior.
- How finding or changing that behavior became easier.
- Any new files/dependencies and why their maintenance cost was justified.
- Exact checks run and material remaining limitations.

Update the existing architecture map if necessary. One concise result table is enough; do not generate another large improvement report.

A useful final self-check is: can the next agent locate the owner, understand its contract, change it in a small number of places, and run a reliable check? If yes, preserve that simplicity and stop. Remaining production plans and optional tooling do not prevent this maintenance pass from being complete.
