# UI/UX fix implementation — 6 September 2026

Implementation of [the detailed fix plan](UI_UX_FIX_PLAN_2026-09-06.md), with functional and visual verification complete. F08 remains partially resolved under the user's explicit color preference, as recorded below. Three GPT-6 Astra agents at max effort implemented the Home/shell, lesson, and account/shared-style work, with route integration and combined review handled by the primary agent.

The user's final visual direction is authoritative: **white text on colored cards and filled buttons, with the original vibrant colors and subtle gradients restored.** The deeper colors tried during implementation were rejected and removed. The original gems, hearts, and level SVGs are also restored in the member navbar. The layout, interaction, typography, progress, and routing fixes remain. White inset panels and secondary controls keep readable dark text.

| Finding | Result and owner | Evidence |
|---|---|---|
| F01 | Home allocates space to the learning column before the promotional rail; ICT uses an intrinsic card grid. | `browser-home-layout.mjs`: inner text/panel rectangles throughout the width matrix; 761/1280px screenshots. |
| F02 | Fill, ordering, and bug questions share one responsive mascot header; code-grid minimum widths also shrink correctly. | `browser-question-layout.mjs`: 18 type/width combinations with long prompts and dialogue. |
| F03 | Roadmap popup measures shell bounds and its own content, bounds scrolling, keeps actions visible, and cancels placement on disposal. | Popup center/edge hit tests, long content, keyboard/Escape and landscape cases. |
| F04 | Header level subscribes to the shared learner/progress state. Original gem/heart/level SVGs remain; unsupported balances and unconfirmed loading values are absent. | Header/Home state checks and icon/sign-out geometry across the width matrix. |
| F05 | Completion shows actual earned/total XP and progress. Unmeasured accuracy/time and fake streak percentages are removed; previews are explicitly unsaved. | Real completion/replay/review journey and preview fixture. |
| F06 | Renderer modes separate learner, developer, and preview behavior. Learner DOM has no source editor or Skip; nonlearner modes do not write achievements. | Route DOM checks and authored/classic preview cleanup tests. |
| F07 | Mobile member sign-out remains visible. Navigation has stable Arabic names and 44px minimum targets. | Guest/member width matrix, native keyboard sign-out and short sidebar checks. |
| F08 | Helper/inset/feedback text was corrected. Original white/bright card and filled-action pairs remain below contrast targets under the user's final visual choice. | Computed color evidence and strict accessibility reports; this finding is **partially resolved**, not a WCAG pass. |
| F09 | Locally supplied, licensed Noto Sans Arabic and shared UI/type roles replace inconsistent learner-facing stacks. | Actual platform glyph-family probes, blocked-font fallback and enlarged-text checks. |
| F10 | Localized runtime defaults survive selection/removal/reset; glossary/table labels follow locale; schema/code stays LTR with usable overflow. | Arabic/explicit-English cases, code keyboard scrolling and renderer tests. |
| F11 | Repeated text, surface, spacing, radius, control and font roles use shared tokens; artwork geometry remains local. | Owning styles and [the visual-role note](DEVELOPER_DESIGN_SYSTEM.md). |
| F12 | Explicit compact/default/prominent control sizes share states; lesson actions retain blue through incorrect/retry feedback. | Native keyboard, pressed geometry, disabled, submitting, correct and retry checks. |
| F13 | Lesson progress/footer styles have clear component owners; conflicting system/responsive rules and picker duplicate spacing were removed. | Original owners: `lesson/progress.css`, `lesson/navigation.css`, `system.css`, `visitor-flow.css`. |
| F14 | Supported `rocky-dialogue` presentation selects one renderer/layout without coupling to step IDs. | Two different IDs in parser/renderer fixtures; unsupported values rejected; long mobile dialogue. |
| F15 | Compact summaries and unpublished cards make the available subject action visible in the first usable mobile viewport. | Restored-color 390px screenshot; CTA ends around 550px, above navigation around 753px. |
| F16 | Publication, account and sequence requirements share an explicit access presenter; Premium/quests state that they are being prepared. | Shared access tests and all popup states; informational feature actions. |
| F17 | Both illustrated native-radio variants have a persistent selected check, separate from focus. | Keyboard/back-forward, grayscale, failed artwork and selection checks. |
| F18 | Validated lesson/part URLs restore the active learner's saved step; history and stale-load cancellation remain predictable. | `browser-routes.mjs`: refresh, Back/Forward, invalid/gated links, account switching and interrupted module load. |
| F19 | Card labels reflect start/continue/review and their map destination; updating text preserves the arrow. Arabic count, XP and level formatting have one owner. | State/arrow browser checks and noun-specific 0/1/2/3/11/100 tests. |
| F20 | Introduction no longer promises an absent video; stable step IDs are retained. Registration has an immediate explicit Continue and no timed redirect. | Intro rendering and real-account/normal/reduced/interrupted completion cases. |

## Visual evidence

Final Home appearance: [320px](/tmp/learn-ui-fixes/restored-vibrant-home-320.png), [390px](/tmp/learn-ui-fixes/restored-vibrant-home-390.png), and [1440px](/tmp/learn-ui-fixes/restored-vibrant-home-1440.png). These captures include the restored navbar SVGs. Only the narrowest layout stacks the level icon above its Arabic label to keep sign-out separate. The original screenshots remain at `/tmp/learn-ui-audit/`; all new screenshots and measurements are temporary artifacts under `/tmp/learn-ui-fixes/` and `/tmp/learn-design-evidence/`.

Before/after inspection confirmed that the available subject and its action fit on a 390×844 screen, the ICT progress/answer/review panel stays inside its card at intermediate widths, and long question titles no longer collapse beside desktop-sized mascot allocations. Screenshots from the rejected deeper-color pass are superseded by the `restored-vibrant-home-*` captures and final runs.

## Verification record

| Check | Result |
|---|---|
| `npm run check` | Passed: 175 JavaScript syntax checks, checked JavaScript types, all 157 tests, static validation and advisory inventory. Log: `/tmp/learn-check-final.log`. |
| `node scripts/browser-home-layout.mjs` | Passed: 28 guest/member width cases, original SVGs and exact bright fills/white card text, font/fallback and enlarged-content checks, account/progress changes, keyboard sign-out and 19 popup cases. Log: `/tmp/learn-home-canonical-final.log`. |
| `node scripts/browser-question-layout.mjs` | Passed: 18 question type/width cases, locale state, retry, code scrolling, long dialogue, reduced motion and preview isolation. Log: `/tmp/learn-question-layout-final.log`. |
| `node scripts/browser-routes.mjs` | Passed: saved-step refresh, Back/Forward and exit, invalid/publication/sequence/account gates, account isolation and canceled module loading. Log: `/tmp/learn-route-final.log`. |
| `npm run test:progress-storage` | Passed: two-tab storage, interrupted migration, recoverable save warnings including accessibility checks, two independent HTTP profiles, lost-response retry and account isolation. Log: `/tmp/learn-storage-final.log`. |
| `npm run test:assets` | Passed: deferred imports, decoded media, retry/fallback, canceled navigation, next-step preloading and reduced motion. Log: `/tmp/learn-assets-final.log`. |
| `npm run test:browser` | Passed in full: learner and account journeys, completion/replay/review, developer previews and templates, focus, mobile/RTL, reduced motion and server recovery. Log: `/tmp/learn-ui-browser-final.log`. |
| `npm run test:render` | Passed: 242 recorded frames covering desktop/mobile, delayed initial loads, warm reloads, nested tabs, dialogs and focus, Back/Forward, rapid navigation and reduced motion. The dialog check waits for its queued close event and restored focus. Log: `/tmp/learn-render-final.log`; artifacts: `/tmp/learn-ui-fixes/render/`. |
| `npm run verify` | Does not pass: the strict accessibility stage stops at the visitor primary button's white-on-green contrast (2.08:1 against a 3:1 target for its large bold text). Report: `/tmp/learn-ui-fixes/final-a11y/visitor-entry.png.a11y.json`. Remaining commands are run independently as recorded above. |

The strict accessibility check remains enabled. No contrast rule or affected control was excluded to obtain a passing result. Other original solid pairs include white on blue `#1cb0f6` (2.45:1), yellow `#ffca28` (1.53:1), and orange `#ff8533` (2.43:1). The complete accessibility gate is therefore not claimed as verified.

Combined verification also caught an existing development preview route returning 404 before its handler ran. The explicit development route now reaches its existing isolated handler; production still blocks it and the normal application CSP is unchanged. Six focused server checks passed. Shared style ownership also preserves the previous developer footer direction, neutral MarkdownLab title and 62×34 Enter keycap.

Physical iPhone/Safari and a real external AI review submission were not exercised. Browser evidence is from isolated local Chromium sessions and temporary accounts. Existing local account data, URLs, persisted lesson/part/step IDs, and unrelated concurrent maintenance changes are preserved.
