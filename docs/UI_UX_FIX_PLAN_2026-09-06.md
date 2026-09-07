**Learning app UI/UX findings and fix plan — 6 September 2026**

Status: implemented with final verification recorded in [the implementation report](UI_UX_FIX_IMPLEMENTATION_2026-09-06.md). This document retains the original 20 findings and their proposed fixes as audit context. The status register below tracks the implementation; original problem descriptions refer to the pre-fix app.

The user's subsequent visual direction supersedes conflicting color recommendations: preserve the original vibrant colors and subtle gradients, use white text on colored cards and filled buttons, and retain the original gems, hearts, and level SVGs in the navbar. Unsupported gem/heart numeric balances remain omitted; the level uses actual learner progress. F08 remains partially resolved because the requested white/bright palette does not meet every contrast target.

The main problem is inconsistent ownership. The app already generates much of its UI through shared renderers, but parent layouts, component styles, state updates, and presentation rules often make independent decisions. That produces both visible failures and smaller inconsistencies in spacing, colors, typography, labels, and interaction states. The recommended work strengthens the existing vanilla JavaScript/CSS structure.

**Scope and evidence**

The scope is the learner-facing app in `learn/`: entry, registration, sign-in, guest/member Home, subject cards, ICT roadmap and popups, published lessons and question types, review, completion, and learner-facing feature placeholders. The experimental More tab and its destinations are excluded. Files named `ui-lab` or `ship-ready` appear below because published lessons use their shared renderers.

The audit exercised Chrome with isolated profiles and temporary accounts. Home was sampled from 320 to 1440 CSS pixels, including widths around layout breakpoints. Other checks covered keyboard use, accessible names, reduced motion, delayed/failed media, and interrupted navigation. Screenshots and measurements remain in [the temporary audit directory](/tmp/learn-ui-audit/AUDIT.md). Those files are temporary; the descriptions and measurements in this document remain useful if they are removed. Physical iPhone/Safari behavior and a real external AI review submission were not verified.

Two updates matter when using the original screenshots:

- **Home progress is fixed in the latest audit retest.** A new account moved from 0 to 10 XP, 0% to 3% subject progress, 0 to 3 solved questions, and 0 to 1 streak day after completing the first database part. Keep this behavior. The remaining header resource problem is F04.
- **Contrast observations describe the audit snapshot.** Later user feedback explicitly restored white text and the original bright fills. Current contrast results and that decision are recorded in the implementation report; darker trial screenshots are superseded.

Concurrent maintenance is described in [AGENT_IMPROVEMENT_PLAN.md](AGENT_IMPROVEMENT_PLAN.md). Its progress, accessibility, and style-ownership work overlaps F04, F08, and F13. Reuse the current owners and completed work. This UI plan does not add backend persistence, deployment, or production-infrastructure work to that maintenance effort.

The [current entry/account decision](PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md) preserves the existing vibrant subject-map Home, guest account actions, and account flow. The hierarchy changes below refine that Home. Preserve working URLs, persisted lesson/part/step IDs, local accounts, approved artwork, and the existing account modes.

**Priority and status register**

P1 means a reproduced problem affects access, reading, interaction, or trust in results. P2 means a consistency, maintainability, or journey improvement. P3 means smaller presentation polish. Design judgments are identified separately from confirmed defects.

| ID | Finding | Priority | Current status |
|---|---|---|---|
| F01 | ICT card clips at intermediate widths | P1 | Implemented: intrinsic sizing and responsive rail |
| F02 | Three mobile question headers retain desktop space | P1 | Implemented: shared responsive header |
| F03 | Roadmap Start can sit behind bottom navigation | P1 | Implemented: measured shell bounds and bounded popup |
| F04 | Header resources are literal sample values | P2 | Implemented: actual level, original SVGs, no invented balances |
| F05 | Completion prints unmeasured accuracy and time | P1 | Implemented: actual progress/XP and explicit preview state |
| F06 | Normal lessons expose source editing and preview Skip | P1 | Implemented: explicit renderer modes |
| F07 | Mobile hides account access and guest navigation names | P1 | Implemented: reachable sign-out and named navigation |
| F08 | Bright surfaces and faint helper text have contrast gaps | P1 | Partial: helper/inset fixes; user-selected white/bright pairs remain below targets |
| F09 | Arabic typography changes across adjacent components | P2 | Implemented: local Arabic font and shared type roles |
| F10 | Runtime English defaults and RTL/LTR handling drift | P1 for unreadable exercises; P2 for copy | Implemented: stable locale defaults and code direction |
| F11 | Feature styles bypass shared design tokens | P2 | Implemented: consolidated shared roles |
| F12 | Buttons use independently authored size/state systems | P2 | Implemented: shared sizes and interaction states |
| F13 | Several stylesheets compete to own the same component | P2 | Implemented: component styles have one owner |
| F14 | Reusable lesson presentation depends on exact step IDs | P2 | Implemented: semantic presentation directive |
| F15 | Home overweights secondary and unavailable content | P2 | Implemented: compact summaries and unpublished cards |
| F16 | Availability treatments imply different unlock rules | P2 | Implemented: shared access rules and accurate copy |
| F17 | Onboarding choices use different selection signals | P2 | Implemented: persistent selected check on native radios |
| F18 | Refresh loses the current lesson destination | P2 | Implemented: validated part URLs, history and cancellation |
| F19 | CTA state, arrow, Arabic counts, and labels drift | P3 | Implemented: shared card presenter and formatting |
| F20 | Introduction promises absent video; completion pacing is timed | P2 | Implemented: accurate introduction and explicit Continue |

**Implementation order**

Use small, reviewable changes. Each batch should include the relevant before/after evidence and focused checks. A broad visual redesign is unnecessary.

| Batch | Work | Findings | Completion condition |
|---|---|---|---|
| 0 | Reproduce against the then-current working tree and note concurrent fixes | All | Open items are still reproducible; resolved items are preserved |
| 1 | Correct shell/card sizing, popup bounds, mobile account access and names | F01, F03, F07 | Content and actions remain visible and reachable across the width matrix |
| 2 | Correct shared question headers, exercise text direction, and runtime defaults | F02, F10 | Published question types remain readable and operable on narrow screens |
| 3 | Make results and resources truthful; separate learner/developer rendering modes | F04, F05, F06 | Normal journeys show only supported state and learner controls |
| 4 | Finish contrast corrections using existing color roles | F08; first part of F11 | Measured rendered foreground/background pairs pass their target |
| 5 | Consolidate typography, tokens, controls, and conflicting CSS owners | F09, F11, F12, F13 | Repeated roles have one owner; earlier layout fixes still pass |
| 6 | Remove lesson-ID presentation coupling | F14 | The same supported presentation works for different stable step IDs |
| 7 | Refine Home hierarchy, availability language, and small rendering/copy details | F15, F16, F19 | Learning is prominent; states and labels match actual behavior |
| 8 | Preserve lesson location through refresh and history | F18 | Old URLs still work; lesson/part links restore the intended destination |
| 9 | Align choice selection and first-lesson/onboarding pacing | F17, F20 | Selection is obvious; introductions and completion actions match expectations |
| 10 | Complete combined visual and interaction verification | All changed areas | Acceptance matrix passes and remaining limitations are recorded |

F08's small, already-understood contrast corrections can accompany earlier batches touching those controls. F11–F13 should consolidate those original rules instead of adding a second implementation. Typography changes in batch 5 require rechecking earlier width-sensitive layouts.

**Detailed findings and fixes**

**F01 — ICT card content is clipped at intermediate widths. P1, confirmed.**

Problem: the Home layout looks acceptable at 1440px and on phones, but hides meaningful progress content at intermediate widths. At 1280px, the ICT card has about 490px of inner space for a grid whose minimum is 594px. At 761px, available inner space falls to about 395px. The card's `overflow:hidden` masks the failure without producing page-level horizontal scrolling.

Cause: the page combines a 268px navigation rail, a 400px promotional column, and fixed minimums inside the ICT card: 210px + 360px + a 24px gap. The card only stacks below a 700px viewport. Its parent can be narrower long before that breakpoint.

Fix:

- Make the page layout own the navigation offset, content budget, rail placement, and gaps. Let the promotional rail move below the learning column when both cannot fit.
- Make the ICT card respond to its available inline width. Prefer intrinsic layout or a container-based rule; a viewport fallback must account for the actual shell and rails.
- Give shrinkable text/grid children `min-width:0` where appropriate. Keep meaningful text and progress panels inside the card; retain clipping only where it serves decorative artwork.
- Keep the subject card's existing identity and interaction. Its CTA is inside one clickable card; do not create nested buttons while changing the layout.

Owners: [base.css](../src/styles/base.css), [course-map.css](../src/styles/course-map.css), and the rail breakpoint in [learner-dashboard.css](../src/styles/learner-dashboard.css).

Acceptance: inspect 700, 760, 761, 820, 1024, 1180, 1181, 1280, 1366, and 1440px. The title, action, progress, solved count, and review count fit inside the visible content region. Include long Arabic labels and a large count. Check actual content rectangles and visibility, not only `document.scrollWidth`. The oversized decorative SVG is not itself a failure. Evidence: [1280px](/tmp/learn-ui-audit/member-home-1280.png), [761px](/tmp/learn-ui-audit/member-home-761.png).

**F02 — Mobile question headers reserve desktop mascot width. P1, confirmed.**

Problem: fill-in-the-blank, ordering, and find-the-error headers break at 390px. Titles wrap into very narrow columns, the mascot occupies excessive layout space, speech bubbles clip, and the answer area is pushed unnecessarily far down.

Cause: the mascot has a 220–236px `flex-basis`. Mobile CSS changes its width to roughly 80px without changing that basis. The three types share `renderMascotHeader()` but duplicate the layout CSS.

Fix:

- Add a shared header class to the existing renderer and give its responsive structure one CSS owner. Retain small type variants only where content genuinely differs.
- Set the mobile flex/grid allocation as well as the image size. Stack or rearrange the header when the title and mascot cannot fit comfortably.
- Keep speech bubbles within the header's usable width. Remove compensating negative offsets that depend on one exact viewport.
- Let Arabic prompts wrap naturally; do not solve the problem by shrinking text or enforcing a short heading.

Owners: [ship-ready-level.js](../src/ui/ship-ready-level.js), [fill-blanks.css](../src/styles/lesson/fill-blanks.css), [sequence.css](../src/styles/lesson/sequence.css), [spot-bug.css](../src/styles/lesson/spot-bug.css), and the existing shared lesson stylesheet or a cohesive header stylesheet if needed.

Acceptance: all three published question types work at 320, 390, 600, 680, 720, and 761px. Test long titles and a multi-line mascot message. No content clips, the mascot's allocated space matches the intended layout, and answer controls remain reachable with touch and keyboard. Inspect the answer area as well as the header. Evidence: [fill](/tmp/learn-ui-audit/question-fill-blanks-390.png), [ordering](/tmp/learn-ui-audit/question-sequence-390.png), [find-the-error](/tmp/learn-ui-audit/question-spot-bug-390.png).

**F03 — Roadmap popup positioning ignores occupied screen space. P1, confirmed.**

Problem: at one ordinary scroll position on a 390×844 member screen, Start occupied y≈735–779 while bottom navigation began at y=753. The navigation covered the label and center of the action.

Cause: placement uses `window.innerHeight - 20` and a hardcoded top threshold of 80. These limits do not reflect fixed navigation, the resource header, or safe-area space.

Fix:

- Let the shell own its visible top/bottom occupied space. Use those actual bounds when positioning the popup.
- Measure the popup after its copy/state is applied. Choose above/below placement inside the usable area, using one coordinate system for measurements and placement.
- When the popup is taller than the available area, use a bounded scrolling layout that keeps its actions reachable. A larger z-index alone does not fix placement.
- Reposition or close predictably on resize, orientation changes, and relevant scrolling. Cancel pending placement work when the view is disposed.
- Preserve Escape, focus restoration, and the existing account/sequence access behavior.

Owner: [subject-roadmap.js](../src/ui/subject-roadmap.js), with shell geometry in [base.css](../src/styles/base.css) and [learner-dashboard.css](../src/styles/learner-dashboard.css).

Acceptance: open top, middle, and bottom nodes with short/long text in available, completed, account-required, and unpublished states. Start and Close remain within usable bounds at 390×844 and short landscape heights. Hit-test the button center and edges to prove navigation does not cover it. Keyboard activation and Escape return focus correctly. Evidence: [overlap screenshot](/tmp/learn-ui-audit/roadmap-bubble-overlap-390.png), [coordinates](/tmp/learn-ui-audit/overlay.json).

**F04 — Header resources have no learner-state binding. P2; Home binding resolved.**

Problem: the header displays literal `120` gems, `5` hearts, and `Lv. 01`. The account-header controller updates account identity, but these resource values are independent of learner progress.

Fix:

- Bind level to the same current learner snapshot used by Home. Use a shared formatting rule for the value and accessible label.
- For gems/hearts, identify an existing authoritative state/rule before displaying a balance. If these features have no implemented state, omit their numeric displays from the ordinary learner shell until supported. Keep illustrative values in explicit fixtures.
- If a resource intentionally starts at a fixed allowance, initialize that allowance in its state owner; render from state rather than duplicating the value in HTML.
- Keep the already-fixed Home subscription and shared progress owner. Do not create another dashboard cache or recalculate rewards in the header.

Owners: [index.html](../index.html), [app-shell.js](../src/ui/app-shell.js), [auth-header.js](../src/ui/auth-header.js), [learner-session.js](../src/services/learner-session.js), and the existing [subject progress store](../src/services/subject-progress-store.js).

Acceptance: fresh account, completed part, repeat completion, account switch, sign-out, and reload show the correct owner's supported values. Guest Home retains its approved account-only header treatment. Preserve the verified Home transition of 0→10 XP, 0→3 solved questions, and 0→1 streak day for the sampled first completion. Compare like-for-like percentages: unit progress and whole-subject progress can correctly differ. Evidence: [latest progress retest](/tmp/learn-ui-audit/current-progress.json).

**F05 — Completion presents fabricated performance measurements. P1, confirmed.**

Problem: `renderSubjectCompletion()` always prints `100%` and `3:21`. A journey with incorrect attempts still shows 100%. The label “مجموع XP” receives `xpGain`, which is the gain from this completion rather than the accumulated total.

Fix:

- Immediately remove unavailable accuracy/time measures from the normal result, or supply genuinely measured values through the completion outcome. Missing measurements must not become zero or a sample value.
- Label `xpGain` as earned XP for this completion, or bind a total label to `totalXp`. Preserve the existing reward amount and repeat-completion behavior.
- If accuracy is retained, define its denominator and attempt policy before implementing it. A useful candidate is first-attempt correctness across scored questions; label that meaning clearly. Do not count eventually corrected answers as proof of a perfect first attempt.
- If time is retained, define whether it measures active lesson time or wall-clock duration, including pauses, hidden tabs, exits, and reloads. An unsupported measurement can stay absent while that contract is decided.
- Collect measurements at the interaction/session owner and pass a read-only outcome to the renderer. Keep preview outcomes explicit and non-persistent.

Owners: [subject-completion.js](../src/ui/subject-completion.js), [lesson/authored.js](../src/ui/lesson/authored.js), [subject-learning.js](../src/ui/subject-learning.js), and the current progress/domain contract if measurements must persist.

Acceptance: compare all-correct, wrong-then-correct, repeated completion, interrupted/reopened, and preview runs. No invented performance number appears. Earned and total XP labels agree with their values, and replays never award XP twice. If measurements are added, tests cover their chosen definitions. Evidence: [earned result](/tmp/learn-ui-audit-smoke/ict-ending-earned.png).

**F06 — Authoring and preview controls appear in the normal learning journey. P1, confirmed.**

Problem: desktop lessons expose “مصدر الدرس”, which opens editable Markdown. Desktop/mobile lessons expose “تخطّي للنهاية”, which opens a sample result without saving achievement. Its visible label does not communicate that behavior.

Cause: published lesson rendering always passes through the source-editor wrapper, and `subject-learning.js` passes `allowTestPass: true`.

Fix: make learner versus developer/preview mode an explicit renderer input. Ordinary lessons should mount the authored learning controller with the necessary shared shell lifecycle, without inserting editor or preview controls. Keep authoring tools available through their existing developer entry points. If Skip remains in a preview, give it visible preview wording. Share initialization and cleanup so separating the modes does not lose progress, keyboard handling, or media readiness.

Owners: [lesson-view.js](../src/ui/lesson-view.js), [lesson/source-editor.js](../src/ui/lesson/source-editor.js), [lesson/authored.js](../src/ui/lesson/authored.js), and [subject-learning.js](../src/ui/subject-learning.js).

Acceptance: ordinary lesson DOM and tab order contain neither authoring controls nor preview Skip. Learners finish through real answers. Existing developer previews still work and never write learner achievements. Verify exit/re-entry and interrupted loading in both modes; More itself remains outside this remediation.

**F07 — Narrow layouts remove essential account/navigation affordances. P1, confirmed.**

Problem: member layouts at ≤760px hide the entire account area, including sign-out. Guest layouts hide navigation text with `display:none`; decorative icons supply no accessible name. Audited guest navigation buttons were only 32px wide.

Fix:

- Provide a visible, labeled mobile account control outside More, using the existing account actions. A small account menu can reuse the existing dialog/focus utilities if a menu is needed.
- Preserve stable Arabic accessible names for in-scope navigation destinations whether labels are visible or compacted. Keep `aria-current` tied to the route.
- Increase compact hit areas and spacing; use 44×44 CSS pixels as the proposed usability target. Do not treat the icon's dimensions as the target dimensions.
- Preserve access to Create account and Sign in on guest Home while allocating space for navigation.

Owners: [index.html](../index.html), [app-shell.js](../src/ui/app-shell.js), [auth-header.js](../src/ui/auth-header.js), [base.css](../src/styles/base.css), [responsive.css](../src/styles/responsive.css), and [learner-dashboard.css](../src/styles/learner-dashboard.css).

Acceptance: at 320, 390, 560, 760, and 761px, guest account actions and member sign-out remain reachable. The four in-scope navigation destinations have nonempty names in the accessibility tree, a visible focus indicator, and usable hit areas. Check Tab/Shift+Tab, activation, Escape if a menu opens, and focus after closing. Evidence: [guest Home](/tmp/learn-ui-audit/guest-home-320.png), [accessibility results](/tmp/learn-ui-audit/details.json).

**F08 — Contrast fixes need to cover the rendered palette and every state. P1, partly improved.**

The original audit measured these color pairs. Current-source status is separated from the historical measurement:

| Pair | Ratio | Status at plan review |
|---|---:|---|
| White on level yellow `#ffca28` | 1.53:1 | Dashboard overrides still use white |
| White on streak orange `#ff8533` | 2.43:1 | Dashboard overrides still use white |
| Materials helper `#94a3b8` on white | 2.56:1 | Still present |
| White on action blue `#1cb0f6` | 2.45:1 | Still declared for guest actions and published primary overrides; inspect winning rules/state |
| White on green `#58cc02` | 2.09:1 | Visitor primary and roadmap Start now use dark ink; retain and verify those fixes |

Fix: keep the bright product palette and choose readable foreground/surface pairs by role. Existing `--system-green-ink` on green measures about 5.98:1; `--system-blue-action-ink` on blue measures about 4.89:1. Reuse them where semantically appropriate. Select and measure separate stat-card foregrounds; merely using a generic darker gray is insufficient. Correct the original feature rules and remove overrides that reintroduce unreadable text.

Target at least 4.5:1 for ordinary text; qualifying large text has a 3:1 minimum. Test the smallest responsive label size, hover/pressed/selected/error states, and text over translucent surfaces. Decorative and inactive elements have different requirements; do not use them to inflate defect counts. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Owners: [base.css](../src/styles/base.css), [learner-dashboard.css](../src/styles/learner-dashboard.css), [visitor-flow.css](../src/styles/visitor-flow.css), [responsive.css](../src/styles/responsive.css), and the shared/lesson action owners affected by F13.

Acceptance: measure computed colors on actual screens after styles load. Automated accessibility checks pass for the changed states, and any inconclusive contrast result receives manual inspection. A token declaration alone does not establish that a more-specific rule stopped winning. Coordinate with A07 of the maintenance plan.

**F09 — Arabic type lacks one intentional family and role scale. P2, confirmed with device-dependent impact.**

Problem: with external fonts enabled, audited Chrome rendered dashboard/ICT Arabic in DejaVu Sans and adjacent Premium Arabic in Noto Sans Arabic. Latin used downloaded Nunito. Different stacks produce different glyph forms, density, baselines, and wrapping. The page requests Nunito, Fredoka, and Bungee without supplying a consistent Arabic UI font.

Fix: choose one intentional Arabic-capable UI family/fallback chain and expose it through a global font role. Keep code monospace and any intentional display treatment separate. Check Arabic glyph coverage, weights, font loading, and fallbacks before migrating all screens. Prefer an appropriately licensed supplied font when cross-device consistency is required; a locally installed font alone cannot provide that consistency.

Define a compact type scale for page titles, section titles, body copy, control labels, helper text, and numeric metrics. Include line height and weight, not just size. Use relative sizing where suitable, permit Arabic wrapping, and avoid applying Latin letter spacing to Arabic labels. Optical icon/baseline adjustments may remain component-local after shared metrics are established.

Owners: [index.html](../index.html), [base.css](../src/styles/base.css), and typography rules in dashboard, visitor, course-card, lesson, and completion styles.

Acceptance: compare the same Arabic strings across adjacent components, long names, mixed Arabic/Latin values, 200% zoom, loaded fonts, and blocked fonts. Recheck F01/F02 after font changes. Verify actual rendered families rather than only computed `font-family` strings. Evidence: [font probe](/tmp/learn-ui-audit/overlay.json).

**F10 — Localization is lost during updates, and code direction is inconsistent. P1/P2, confirmed.**

Problem: ordering initially localizes its placeholder, but runtime updates/reset write `config.placeholder` back as “Choose a step below”. Glossary popups say “TECH TERM” and left-align Arabic explanations. Table accessibility text says “Scrollable table”. Latin schema fragments inherit RTL, and long find-the-error lines use hidden horizontal scrollbars that conceal overflow.

Fix:

- Resolve localized defaults once at the renderer/controller boundary. Use that resolved copy for initial markup, selection, removal, retry, and reset. Preserve explicitly authored non-default text.
- Extend the existing copy owner for glossary/table labels. Align prose with `text-align:start` and its actual language/direction.
- Isolate code/schema fragments as LTR while retaining RTL for Arabic instructions and navigation. Give mixed values appropriate bidi isolation.
- Make code overflow understandable and operable. Prefer a coherent code surface with line selection preserved; if per-line scrolling remains necessary, expose a visible overflow affordance and keyboard access. Keep line numbers and full code available.

Owners: [lesson-ui-copy.js](../src/ui/lesson-ui-copy.js), [ship-ready-level.js](../src/ui/ship-ready-level.js), [ui-lab/index.js](../src/ui/ui-lab/index.js), [markdown/renderer.js](../src/markdown/renderer.js), [markdown-lab.css](../src/styles/markdown-lab.css), and fill/bug styles. Remove reliance on the `system.css` direction rule that excludes published lessons.

Acceptance: Arabic ordering stays Arabic through every update/reset; English authored content remains supported. Parentheses, commas, identifiers, and answer placement read correctly in the database exercise. Keyboard and touch users can inspect the full code line. Glossary/table accessible labels use the lesson locale. Evidence: [glossary](/tmp/learn-ui-audit/lesson-tooltip-390.png) and F02's question captures.

**F11 — Tokens exist, but repeated visual roles still drift. P2, confirmed.**

Problem: `base.css` already defines spacing, radii, control height, and semantic colors. At this source review, `learner-dashboard.css` has 110 literal hex occurrences, 73 distinct hex strings, and no references to the shared spacing/radius/control/system/action tokens. Visitor styles have improved to six shared-role references, but retain 98 literal hex occurrences. These counts are inventory signals, not a requirement to eliminate every literal.

Fix: migrate repeated semantic roles while changing their owning component. Start with text, muted text, borders, surface/foreground pairs, control sizes, corner radii, padding, gaps, and press depth. Preserve feature-local artwork colors, gradients, connector coordinates, and measured positions. Replace duplicated meaning, not every repeated number.

Proposed role contract, using existing values as the starting point:

| Role | Starting rule | Owner |
|---|---|---|
| Spacing | Keep 8/12/16/24/32px scale; add a smaller step only for repeated fine spacing | Global values in `base.css`; component padding local; inter-component gap belongs to parent |
| Corner radius | Control 14px, card 16px, panel 24px; explicit exceptions only where justified | `base.css` values, feature variant selection |
| Controls | 48px default minimum; explicit compact/prominent variants where needed | Shared control styles |
| Text and surfaces | Reuse current semantic ink/muted/border roles; pair bright surfaces with measured ink | `base.css` plus named feature roles |
| Typography | UI/display/code families and a small size/weight/line-height scale | `base.css`, applied by role |
| Depth and focus | Shared control edge/press/focus rules | Shared action owner |
| Illustration geometry | Mascot size, path coordinates, artwork crop | Owning component, not global spacing tokens |

Acceptance: adjusting a shared role changes its intended consumers without tracing several near-identical constants. Feature-specific geometry remains understandable. New tokens have demonstrated consumers and meaning. No global search-and-replace of hex values or mechanical rounding of every dimension is required.

**F12 — Actions look and behave like separate control families. P2, confirmed.**

Observed baseline: account buttons use roughly 42px height/12px radius; onboarding 52/13; roadmap 44/12; lessons 52/13; shared system actions at least 48/14. Press depth varies between shadows and bottom borders. Focus color, thickness, offset, disabled treatment, and state colors also differ.

Fix: extend the existing shared action styles with a small explicit size/appearance/state vocabulary. Keep native buttons/links and existing render helpers. A universal JavaScript Button abstraction is unnecessary if CSS plus existing markup helpers gives a clear owner. Allow purposeful compact or prominent actions, but make each variant deliberate and reusable.

The existing visual-role note describes green for a main action, pale blue for selection, and red for errors; current lessons also use blue primary and red retry. Reconcile the intended learner-facing rule once. Recommended direction: preserve the action's identity across an incorrect answer and put error meaning in feedback. Update the existing design note and affected tests with the chosen rule.

Owners: [system.css](../src/styles/system.css), [base.css](../src/styles/base.css), [template-shell.js](../src/ui/template-shell.js), visitor/roadmap controls, and shared lesson navigation styles. [Current visual-role note](DEVELOPER_DESIGN_SYSTEM.md).

Acceptance: inspect default, hover, focus, pressed, disabled, submitting, correct, incorrect, and retry states side by side. No press-induced layout jump, clipped focus, or truncated Arabic label. Distinct roles remain distinguishable; equal roles share the same treatment. Test 44/48/52px minimum variants only where those roles are adopted, rather than forcing every action to a fixed height.

**F13 — The cascade hides the real style owner. P2, confirmed.**

Problem: lesson actions/progress are changed by shared lesson CSS, question styles, responsive CSS, completion styles, and `system.css`. For example, `lesson/progress.css` supplies `--lesson-progress-fill:#f4c430`, then a later `system.css` rule sets the same displayed fill to `#ffc800`. The onboarding picker gets `margin-top:12px` and then `8px` under the same selector two lines later.

Fix:

- Trace winning rules for each touched component and choose one authoritative owner. Move responsive rules with that component when they govern its internal layout.
- Keep shell/page geometry separate from component styling. A shared footer owner should define its sizing/states; question types supply content/state, and completion supplies a documented variant.
- Decide which progress treatment is current, put it in the progress owner, and remove contradictory copies. Update the existing role note if the decision differs from it.
- Edit/delete superseded declarations. Do not append another high-specificity override or `!important` layer.
- Coordinate any separation of reference-only CSS with maintenance A08. Reuse that work; do not turn this into a redesign of More.

Owners: [lesson.css](../src/styles/lesson.css), [lesson/progress.css](../src/styles/lesson/progress.css), [lesson/navigation.css](../src/styles/lesson/navigation.css), [responsive.css](../src/styles/responsive.css), [system.css](../src/styles/system.css), [lesson/completion.css](../src/styles/lesson/completion.css), and [visitor-flow.css](../src/styles/visitor-flow.css).

Acceptance: a reviewer can identify the authoritative spacing/color/state rule directly. Change a token in a disposable check and confirm its intended rendered effect. Compare Home, lesson, and completion before/after; preserve eager shell geometry, lazy-style readiness, and narrow layouts.

**F14 — Reusable lesson presentation is tied to persisted identities. P2, confirmed.**

Problem: `published.css` mentions `meet-rocky` 49 times and `watch-introduction-together` 49 times. `rocky-dialogue.js` explicitly lists those IDs and expects a particular Markdown child structure. Reusing the same presentation for another explanation requires more selectors and special cases.

Fix: introduce one supported semantic presentation/component for the repeated illustrated dialogue. The application owns its layout. The current Markdown parser has stable IDs but no generic explanation-presentation field; define the smallest supported contract through the parser/model and renderer, and document it in the authoring guide. It should select an existing presentation with content inputs, not allow authored CSS, arbitrary layout classes, or a layout DSL.

Have the renderer emit a presentation marker and predictable component structure. Style and mount dialogue by that marker, preserving every existing step ID for progress and navigation. Replace ID-based selectors in a controlled migration; keep illustration-specific art direction local where necessary. Preserve the existing measured dialogue height, media readiness, and reduced-motion behavior.

Owners: [lesson-authoring.js](../src/markdown/lesson-authoring.js), [lesson-model.js](../src/markdown/lesson-model.js), [lesson/authored.js](../src/ui/lesson/authored.js), [lesson/rocky-dialogue.js](../src/ui/lesson/rocky-dialogue.js), [lesson/published.css](../src/styles/lesson/published.css), and [LESSON_MARKDOWN_AUTHORING.md](../LESSON_MARKDOWN_AUTHORING.md).

Acceptance: two explanations with different stable IDs can use the same presentation without new ID selectors. Existing content/progress still loads, unsupported presentation values fail clearly, and long dialogue stays stable on mobile. Use a parser/renderer fixture for proof; do not add a throwaway published lesson.

**F15 — Home hierarchy gives too much space to lower-utility content. P2, design judgment.**

Observation: at 390×844, large level/streak cards push the available subject action below the initially usable area. Seven locked subjects repeat large cards with 144px lock art, producing a page over 4,000px long. The desktop Premium rail occupies 400px and competes with the learning column; its independent scrolling hides a scrollbar.

Fix: retain the current subject-map Home and its vibrant visual identity. Reduce the vertical weight of summary statistics on narrow screens, keep the available subject prominent, and compress unavailable cards within the existing card language. Keep their names and status readable. Bound the promotional rail according to available space, place it after learning content on narrow layouts, and expose an overflow affordance if independent scrolling remains.

Resolve F01 first. Then review hierarchy with the real fixed header/navigation bounds; do not optimize a full-page screenshot while ignoring the first usable viewport. Do not shrink essential text or touch targets to meet the hierarchy goal.

Owners: [learner-dashboard.js](../src/ui/learner-dashboard.js), [learner-dashboard.css](../src/styles/learner-dashboard.css), [course-map.css](../src/styles/course-map.css), and parent geometry in [base.css](../src/styles/base.css).

Acceptance: proposed target at 390×844 and normal text size: a fresh learner can identify the available subject and its starting action in the first usable viewport. A returning learner can identify how to resume equally quickly. At increased text size, allow reflow and scrolling rather than hiding content. Review desktop emphasis as well as phone height. Evidence: [mobile Home](/tmp/learn-ui-audit/member-home-390.png), [desktop Home](/tmp/learn-ui-audit/member-home-1440.png).

**F16 — Availability messages mix publication, progress, account, and subscription states. P2, design judgment.**

Problem: subjects say “مقفلة”, unfinished navigation destinations show coming-soon screens, quests sit under a blur, and Premium discloses its unfinished state only after a benefits presentation. A learner cannot consistently tell what action, if any, unlocks something.

Fix: separate underlying availability facts from progress. Use existing access rules and published metadata; do not infer that every lock means payment or account creation. Give each state a consistent visible explanation and action policy:

| Actual state | Proposed presentation | Action |
|---|---|---|
| Published, available, not started | Available/start wording | Open the supported learning destination |
| In progress | Continue wording | Resume through the existing progress rules |
| Completed | Completed/review wording | Open review/replay |
| Unpublished | “قيد الإعداد” or equivalent explicit copy | Explain availability; do not imply registration unlocks it |
| Account required | State the account requirement | Existing register/sign-in flow |
| Previous part required | Name the progression requirement | Direct the learner to the available previous part |
| Subscription feature not yet released | State that it is being prepared before benefit/action promises | Informational action only |

Use a small shared status/copy presenter when multiple surfaces render the same rule. Keep domain access decisions in their current owners. Paid entitlements beyond implemented behavior require a product decision, not a styling assumption.

Owners: [course.js](../src/data/course.js), [course-map.js](../src/ui/course-map.js), [subject-roadmap.js](../src/ui/subject-roadmap.js), [learner-dashboard.js](../src/ui/learner-dashboard.js), and [coming-soon.js](../src/ui/coming-soon.js).

Acceptance: for each rendered state, the learner can tell what is available now, why something is unavailable, and what the action will do. Copy, icon, accessible description, disabled behavior, and actual access agree. Keep the approved guest/account flow and existing gates.

**F17 — Onboarding selection needs a consistent persistent signal. P2, design judgment.**

Observation: curriculum selection uses a green border/background. The following academic-path step relies on illustration saturation and scale, without the same border or a persistent check/selected label. Native radio semantics and keyboard focus work. Existing tests explicitly expect the illustration-only treatment, so this is a deliberate design choice to review.

Fix: retain the illustrated choices and native radio inputs. Recommended direction: add the same compact persistent selected marker to both choice-card variants, while keeping their illustrations and existing focus treatment. The marker could be a check plus selected styling; it must not obscure the artwork. Keep focus and selection visually distinct. Conveying state beyond color supports users who cannot distinguish the colors. [W3C use-of-color guidance](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

Owners: [visitor-flow-markup.js](../src/ui/visitor-flow-markup.js), [visitor-flow.css](../src/styles/visitor-flow.css), and selection assertions in the existing account browser journey.

Acceptance: selected/unselected states are identifiable without hover, under grayscale inspection, and with blocked illustration loading. Keyboard arrows/Space, focus, back/forward within onboarding, and selected values still work. Update the intentional visual assertion alongside the adopted design rule. Evidence: [path selection](/tmp/learn-ui-audit/path-selected-320.png).

**F18 — The URL does not preserve the current lesson/part destination. P2, confirmed.**

Problem: opening a lesson leaves the address as `?subject=ict`. Refresh returns to the roadmap. Saved step progress can resume after reopening the part, but the current destination cannot be bookmarked. This is lost location context, not loss of all learning progress.

Fix: extend the route contract with optional stable lesson/part identity. A candidate URL is `?subject=ict&lesson=database-management&part=<existing-part-id>`; use actual registered IDs. Validate the relationship between subject, lesson, and part before opening it. Keep `?subject=ict` as the roadmap and retain current entry/page URLs.

Let `main.js`/the route owner manage history; let the subject controller request navigation and restore through the existing progress/access owners. Initially restore the part and its saved step, avoiding a history entry per question. Define predictable Back/Forward behavior, invalid-link fallback, and the existing account/sequence gate for direct links. A URL must not bypass access checks or restore another account's state.

Owners: [route.js](../src/app/route.js), [main.js](../src/main.js), [subject-learning.js](../src/ui/subject-learning.js), and [P1_ROUTE_STATE_MAP.md](P1_ROUTE_STATE_MAP.md).

Acceptance: open a part, answer, reload, use browser Back/Forward, open the copied URL, and switch test accounts. The destination and appropriate saved step restore predictably. Invalid or inaccessible targets receive the existing safe fallback/gate. Rapid navigation cancels stale loads. Existing URLs and persisted IDs remain valid. Evidence: [refresh probe](/tmp/learn-ui-audit/details.json).

**F19 — Small copy and DOM ownership defects make the UI feel unfinished. P3, confirmed.**

Fix these as a cohesive polish pass, using shared formatting only where it owns a repeated rule:

- **State-aware CTA:** ICT always says “متابعة الدروس”, even for a new learner. Derive Start/Continue/Review wording from actual progress and the destination it opens. Do not imply an immediate lesson resume if the action only opens the map.
- **Disappearing arrow:** `course-map.js` renders a decorative arrow, then `updateSubjectCards()` replaces the whole action's `textContent`. Give the label its own child and update that child, or let one card renderer own both initial and updated markup.
- **Arabic counts:** “1 أجزاء” and “1 أيام” concatenate numbers with fixed plurals. Add one small Arabic count formatter with noun-specific forms; cover zero, one, two, few, many, and other cases. Reuse it where the same count is shown on Home, roadmap, and completion.
- **Instruction/action agreement:** introduction copy says “التالي” while the actual action is “متابعة”. Match the real button label.
- **Number/label formatting:** choose one level format and consistent XP presentation, keeping Arabic prose and LTR values correctly isolated. Reuse formatting across the header and dashboard.

Owners: [course-map.js](../src/ui/course-map.js), [learner-dashboard.js](../src/ui/learner-dashboard.js), [subject-roadmap.js](../src/ui/subject-roadmap.js), [subject-completion.js](../src/ui/subject-completion.js), [lesson-ui-copy.js](../src/ui/lesson-ui-copy.js), and [course-introduction.js](../src/data/lessons/ict/course-introduction.js).

Acceptance: arrow and accessible action wording survive initial mount, progress updates, and account changes. Review Arabic forms for 0, 1, 2, 3, 11, and 100. Equivalent values use consistent formatting, and instructional copy names controls that actually exist. Use behavior checks for the lost-arrow/state defect and focused formatter cases; tiny spacing/copy edits do not need tests that merely repeat their implementation.

**F20 — Introduction content and completion pacing create avoidable friction. P2, design judgment.**

Problem: Rocky invites the learner to watch a video; the next step says it will be added later, with a play-shaped decoration that does not play. This occurs in the recommended introduction. Registration completion also advances after 3.4 seconds, or 0.5 seconds under reduced motion, without an explicit Continue action.

Fix:

- Until the video exists, revise the two introduction steps to set an accurate expectation and remove the false play affordance. Keep their persisted IDs and useful orientation content. Do not add unsupported media or silently delete persisted steps to shorten the flow.
- When a real video is available, use the supported media renderer and provide clear loading, unavailable, and continuation behavior.
- Give successful registration a visible, immediate Continue action. Recommended behavior: the learner controls when to leave; celebration animation can finish independently. Keep destination, account creation, and optional-phone behavior unchanged.
- Preserve reduced motion and cancellation. Reduced motion should not become a reason to provide less reading time.

Owners: [course-introduction.js](../src/data/lessons/ict/course-introduction.js), relevant introduction styles in [published.css](../src/styles/lesson/published.css), [visitor-flow.js](../src/ui/visitor-flow.js), and [visitor-flow-markup.js](../src/ui/visitor-flow-markup.js).

Acceptance: every apparent media action works or is clearly presented as unavailable before interaction. A learner can move through the current introduction without an unfulfilled watch instruction. Registration Continue works immediately by touch/keyboard, and leaving mid-animation never redirects a later view. Evidence: [invitation](/tmp/learn-ui-audit/intro-watch-390.png), [placeholder](/tmp/learn-ui-audit/intro-video-placeholder-390.png).

**Component ownership after the fixes**

Use this as a responsibility map for the touched code, not a requirement to create one new module per row.

| Area | Existing generation path | Intended responsibility |
|---|---|---|
| Shell/navigation | HTML template → `app-shell.js` → account controller | Responsive occupied space, navigation names, account actions, supported resource state |
| Subject cards | `COURSE_SUBJECTS.map()` in `course-map.js` plus dashboard updates | One card contract for status, label, icon, metrics, and updates; `course-map.css` owns its layout |
| Dashboard metrics | Local metric/progress/streak helpers | Read the shared learner snapshot; share formatting/presentation only where meaning matches |
| Roadmap | Unit/lesson/part metadata mapped to nodes | Domain supplies access/progress; renderer presents state; popup owns placement inside shell bounds |
| Lesson content | Markdown parser/model → authored controller → Markdown/question renderer | Authored content selects supported components; app owns presentation, navigation, and interaction |
| Question header | `renderMascotHeader()` with type-specific classes | One responsive structure/style, small content variants |
| Lesson footer | `renderTemplateShell()` / `renderTemplateFooter()` | Keep existing semantic/keyboard helpers; consolidate visual sizes and states |
| Account choices | Shared flow/field markup and native radios | Consistent selection/focus signals and control typography |
| Completion | Outcome → completion renderer | Display actual outcome; shared metric formatting, explicit preview state, no reward calculation in UI |
| Dialogs, motion, media | `dialog.js`, `view-motion.js`, `media-ready.js` | Retain existing focus, reduced motion, readiness, and cancellation behavior |

Share streak rendering only after choosing a common meaning for its seven positions: the current dashboard shows a moving range, while completion uses 1–7. Likewise, do not merge a lesson-position bar with a subject-completion bar merely because both use percentages. They can share appearance without sharing the calculation.

**Design decisions to record during implementation**

These decisions should be made against concrete before/after screens and the current approved product direction. They do not block preparing the fixes above.

| Decision | Recommended starting direction | Work that can proceed immediately |
|---|---|---|
| Primary/selected/error roles | One documented role rule; keep retry recognizable as an action | Correct unreadable foregrounds using existing tokens |
| Arabic type family | One intentional Arabic UI family with tested fallback and a small role scale | Inventory/reconcile duplicated type rules |
| Unmeasured results/resources | Omit unsupported measures; retain actual XP/progress | Remove fake values without inventing reward rules |
| Home density | Compact summaries/unpublished content within the existing vibrant subject map | Repair intermediate-width clipping |
| Choice selection | Shared persistent marker plus existing native semantics/artwork | Preserve working keyboard/focus behavior |
| Registration completion | Explicit Continue; animation independent of navigation | Preserve account result, destination, and cancellation |
| Lesson links | Optional lesson/part identity; restore saved step | Specify backward-compatible route and gate cases |

**Verification and completion criteria**

Every UI batch needs browser evidence for its actual failure mode. Source tests alone missed the intermediate-width clipping and the retained mobile flex basis.

| Dimension | Required cases |
|---|---|
| Width | 320, 390, 600, 700, 760, 761, 820, 1024, 1180, 1181, 1280, 1366, 1440px for shared Home/shell work; add 680/720px around question breakpoints |
| Height | 390×844 plus short portrait/landscape; include the actual top/bottom occupied areas |
| Learner state | Guest, fresh member, partial progress, completed/review, applicable fixture account states, account switch |
| Interaction | Keyboard traversal/activation, touch-sized targets, focus return, popup close, retry, selection removal/reset |
| Text/content | Long Arabic labels/names, mixed Latin code, large counts, 200% zoom, font loaded/blocked |
| Time/loading | Reduced motion before and during a view, slow/failed media, quick navigation away, interrupted session/route load |
| Correctness | No covered/clipped action, truthful values, stable IDs, appropriate access gates, no duplicate rewards |

Use the existing checks from `learn/`, selecting the focused checks that match the batch:

- Layout/card work: `node --test tests/course-map.test.mjs tests/learner-dashboard.test.mjs tests/subject-roadmap.test.mjs`, plus the targeted viewport/occlusion browser cases.
- Outcome/progress work: `node --test tests/subject-progress.test.mjs tests/subject-completion.test.mjs tests/learner-dashboard.test.mjs tests/learner-session.test.mjs`, then `npm run test:progress`.
- Route work: `node --test tests/route.test.mjs tests/view-lifecycle.test.mjs`, plus refresh/history/access browser cases.
- Parser/presentation work: `node --test tests/lesson-authoring.test.mjs tests/subject-lesson.test.mjs tests/ship-ready.test.mjs`, plus published lesson rendering in the browser.
- Account choices/pacing: `npm run test:accounts`, including keyboard and navigation interruption.
- Shared UI: `npm run test:browser` and the applicable `npm run test:a11y`, `npm run test:render`, and `npm run test:assets` checks.
- Run `npm run check` for each cohesive code batch. At integration, use the current `npm run verify` gate once; its current runner includes check, accessibility-enabled browser journeys, progress-storage, render, and asset checks. Do not repeat constituent suites without a new change or unresolved failure.

Extend existing browser scripts with the missing behavioral cases: inner-card visibility, header allocation, popup hit-testing above navigation, guest navigation names, mobile account access, actual completion values, reset localization, and route restoration. Add regressions for substantive defects. Avoid tests that count CSS literals, assert arbitrary file sizes, or merely duplicate a one-line cosmetic change.

Keep screenshots/measurement output in a temporary artifact directory and summarize the useful evidence in the change description. Check accessible names and computed styles as well as screenshots. Any incomplete automated accessibility result needs investigation; passing automation is not proof of complete assistive-technology usability. Repeat the critical narrow journeys on a physical iPhone/Safari before claiming device coverage.

The original audit's final `npm run check` passed 130 tests, syntax, and static validation. Its focused roadmap and asset browser suites passed before subsequent concurrent maintenance; that is historical evidence, not a claim that this plan or later source changes passed a new full browser run. This documentation-only task does not itself validate future fixes.

For this planning task, a fresh `npm run check` passed all 134 tests, syntax validation for 154 JavaScript files, type checking, and static application validation. Local file links were checked, and all 20 detailed findings were present. The only project file added by this task is this plan; browser evidence above comes from the earlier audit. [Planning-task check log](/tmp/learn-ui-plan-check.log).

An item is complete when its acceptance checks pass, its winning behavior/style has a clear owner, and its status is updated with evidence. Keep unresolved design judgments visible rather than marking them fixed through token replacement alone.
