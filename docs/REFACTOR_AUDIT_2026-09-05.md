> Historical snapshot: findings and ownership may be superseded. Use [the current architecture](ARCHITECTURE.md) and [the active improvement plan](AGENT_IMPROVEMENT_PLAN.md) for implementation.

# Refactor and rendering audit — 2026-09-05

## Scope and baseline

Read `AGENTS.md`, the implementation plan, product-decision override, route/traceability and developer-workspace documentation, and the product-definition status before changes. Remained in Phase 1 and preserved existing uncommitted work, URLs, eight templates, published content/step IDs, local data, artwork and reference archives. No dependencies added.

Baseline: syntax passed (110 JS files), all 110 Node tests passed, static validation passed (eight subjects, one published subject lesson). Full browser smoke completed with two pre-existing stale assertions: a hard-coded inline mascot prefix, and an old grammatical form of “optional” in phone copy. Updated those checks to resolve SVG references within their owning SVG and retain the required optional-phone/skip behavior. The maintainability audit initially failed four budgets: main 303/300, prototype service 246/220, visitor flow 528/300, browser smoke 768/550.

## Main changes

- Consolidated final subject-card appearance into `course-map.css`; removed the superseded gradient/lift rules and separate `dashboard-cards.css` override layer. Folded repeated `system.css` rules into their owners and reused a small existing-design palette, spacing/radius and control-size scale in `base.css`.
- Moved lazy destination shell geometry into eager lesson styles, with stable initial state and fixed stylesheet order. Preserved responsive differences, Arabic RTL, keyboard focus and required screen/component motion.
- Split visitor mascot SVG/pointer behavior from account forms; scoped injected SVG CSS and captured async request lifetimes so old form responses cannot affect newly opened flows. Reduced-motion changes cancel active pointer/exit behavior.
- Separated resilient prototype storage IO from service-owned account/scenario/trial state. Corrupt selection data no longer suppresses an independent valid guest trial; failed removal does not interrupt account conversion or subscribers.
- Removed the obsolete design-system gallery constructed behind the code-practice view. `design-system-view.js` fell from 1,165 to about 230 lines; the current gallery stays in `current-design-system.js` and the three-editor practice surface retains its established controls, markdown guide, splitters, sandbox, console and footer.
- Reused the existing dialog focus helper in Markdown Lab settings and added keyboard containment/return checks.
- Extracted reusable Chrome/CDP process helpers and the account journey from browser smoke (768 → 514 lines). Added `npm run test:render` for frame-by-frame rendering evidence. Live reload now ignores exports, backups, dependency installs, tests and screenshots.
- Added [architecture and focused validation](ARCHITECTURE.md), linked it from README, corrected the route inventory and marked the earlier audit as historical. Removed audit rules requiring the obsolete gallery and subjects-only implementation.

## Removal evidence

| Removed | Evidence and retained boundary |
|---|---|
| `src/styles/dashboard-cards.css` | Only loaded by its `index.html` link; its current declarations were merged into the existing subject-card owner in cascade order. Desktop/mobile comparisons verify final appearance. |
| Old gallery markup, constants and handlers in `design-system-view.js` | Non-practice calls already return `renderCurrentDesignSystem` before reaching it. Practice calls constructed all old sections, then `.ds-practice-only` CSS hid them. Current code practice requires only `#interactive`; all module callers, browser scripts and registry paths were checked. Existing artwork/reference archives were retained. |
| Practice renderer’s Prism request | Its retained markdown guide uses `renderMarkdownDocument` and local Highlight.js; the removed call only selected `.lesson-code pre code`, which does not exist in this view. This also removes unnecessary external scripts and late theme CSS from the current editor path. |
| `getBrowserStorage` in day progress store; `applyWeekThemeForDay` | No consumers in active source, tests, scripts or documentation, including dynamic import inventory. Core day store, palettes and used theme APIs remain. |
| Unused CSS tokens | `--block-dark`, `--course-unit-gap`, `--motion-standard`, `--ease-enter`, and `--ease-exit` had declarations but no consumers, including JS-set style references. Actual navigation timing remains in `view-motion.js` and component-arrival CSS. |
| Legacy reload ignore-list behavior | Actual watcher accepted JSON/JS/HTML from ignored exports/clones/dependencies. A runtime-input allowlist prevents these unrelated edits from reloading the app; tested with injected watcher events. |

Retained deliberately: candidate lessons and lesson assets; day-based stores and progression contracts; course/week data referenced by developer tooling; vendor editor and codicon font loaded dynamically; all declared dependencies (runtime imports, CLI execution or editor use); authoring directive exports that external lesson skills may consume; ignored backups, screenshots, exports and account databases. No unreferenced artwork was deleted merely because a text search did not find it.

## Rendering causes and verification

Confirmed first-paint defects were asynchronous account/layout ordering and lazy stylesheet order. Duplicate eager subject styles were maintenance debt: head stylesheets already block first paint, so those rules alone were not evidence of a flash. Redundant legacy markup and unscoped injected SVG styles were additional fragility removed at their owners. Existing static responses already send `Cache-Control: no-store`, and no service-worker registration was found; no cache purge or new cache layer was justified.

Temporal browser checks save timestamped CDP screencast frames plus requestAnimationFrame geometry/state samples. They delay session and lazy CSS responses, throttle CPU/network, and exercise desktop/mobile initial loads, cold/warm reloads, code tabs, dialogs, reference navigation, history, rapid navigation and reduced motion. The fixes add no artificial settling delay or blanket page hiding; pending content has an explicit loading surface.

Before the runtime fixes, the recorded desktop header painted at **1440 × 65** with no restored account, then changed to the member rail at **268 × 900**. At 390px it jumped from **390 × 57** to **390 × 71**. Code loading painted a **1240 × 900** shell before switching to the **1440 × 900** editor. The fixes mount the account-aware header only after restoration, apply full-screen code mode before loading, eagerly style shell geometry and insert lazy CSS before `system.css`.

The temporal audit also caught code tabs accepting clicks before the vendor editor installed their listeners. Editor controls now expose their pending state, and preview/console switching uses shared motion. Prototype controls wait for their stylesheet before mounting. Deferred account responses and canceled exits have dedicated lifecycle checks.

Final temporal run passed with **197 recorded frames** and no assertion failures. Under 4× CPU throttling, 60 ms network latency, 750 KB/s throughput and 700 ms held dependency responses, the wrong-account header frames fell from **66 desktop / 84 mobile to zero**. Pending editor and prototype controls waited for their actual dependencies. All four stale visitor-response/exit regressions passed.

Evidence is saved under ignored `artifacts/refactor-2026-09-05/`:

- [Before recording viewer](../artifacts/refactor-2026-09-05/render-before/index.html): 134 frames; `recording.json` includes the baseline failures.
- [After recording viewer](../artifacts/refactor-2026-09-05/render-after/index.html): 197 frames; `recording.json` has no failures.
- Both rendering directories contain timestamped per-stage geometry/state JSON and matching JPEG frames.
- `styles/`: original/refactored CSS replay at 390/1440px for Home and the current reference. Subject screens and desktop reference are byte-identical. Mobile reference differs in 81 of 351,000 pixels (0.023%), without a visible layout/content change.

Validation: syntax, all **113 Node tests**, static build validation and the manageability audit passed. Focused developer browser validation and the separate full browser run passed. The combined gate exposed a test that dereferenced the header during the new loading state; its wait now requires a mounted header and the final `npm run test:browser` rerun passed. The final syntax gate checked 118 JavaScript files. Main is now 293 lines, visitor flow 300, prototype service 217, code-practice renderer 227 and browser smoke 514.

## Limits of the conclusions

First-paint recordings verify the representative routes above, including delayed dependencies and both viewport sizes. They are not evidence that every fixture, every device or externally hosted cache is flash-free. Required navigation fades and component rises remain enabled; screenshots during those animations intentionally contain changing opacity/position.

## Remaining work and boundaries

- The 46 provisional stories and product-decision amendments still need product review; this refactor does not promote them to approved scope or remove existing requested prototype routes.
- `lesson-view.js`, markdown parsing and parts of the legacy design-system CSS are still sizable. They contain active renderer/editor contracts; further splitting or selector removal needs a focused interaction/coverage audit, rather than speculative deletion.
- Full-stack candidate/reference content and associated artwork remain intentionally retained. Removing or publishing them is a separate content decision.
- The deterministic browser gate omits external Google font/CDN loads. A separate online Home capture completed with external resources enabled, but it is a settled screenshot, not temporal font evidence. External font swaps and legacy Prism rendering still require focused online sequence testing before making claims about those optional paths. The current editor no longer requests unused Prism assets.
- This is Chromium verification, not a claim of cross-browser or physical-device coverage. No production deployment/cache environment exists in this workspace to validate.
