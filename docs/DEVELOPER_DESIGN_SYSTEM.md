# Current developer workspace

The More tools and component reference use Arabic and RTL, matching the current application. Technical file names and code remain LTR.

- UI Lab (`?view=ui-lab`) is a full-screen blank board, with only close and code controls. It has no lesson shell, template navigation, or experiment archive. Edit `src/ui/ui-lab/board.js` for the current AI-created HTML/CSS/JS experiment. Browser edits survive reopening during the current session. Source edits reload through the existing development server.
- Preview execution uses the existing isolated code runner. Runtime errors reopen the editor. Do not loosen the application CSP or grant the frame same-origin access.
- Refine one experiment through feedback. Add it to Ship Ready only when the user explicitly asks. Opening or running an experiment does not publish it.
- Ship Ready retains its eight reusable templates. Its Arabic presentation lives in `src/data/ship-ready-ar.js`; its IDs and interaction contracts remain in the shared registry.
- The current reference groups actions/navigation, colors, cards/sections, fields/states, SVGs/Rocky, and type/motion. See `src/ui/current-design-system.js` and `src/styles/current-system.css`; shared controls live in `src/styles/system.css`.

## Visual roles

The latest user direction keeps the **original vibrant cards, subtle gradients, and bright filled buttons with white text**. `--system-green-action` aliases the original `#58cc02` green and `--system-blue-action` aliases the original `#1cb0f6` blue; both use `--system-action-ink` (white) and the established edges. Do not darken these fills to resolve contrast. White or pale secondary surfaces retain dark ink. Ordinary helper text uses `--system-muted`.

This aesthetic choice leaves ordinary white-label contrast below 4.5:1 on the bright fills: about 2.09:1 on green and 2.45:1 on blue. The corresponding card/gradient combinations must also remain visible in accessibility reports. These are known unresolved contrast findings under the explicit user preference, not passing accessibility results; do not hide them from axe or claim they are fixed.

An action keeps its identity across answer feedback. Blue advances the learning task; green confirms account setup or starts learning. Incorrect answers use error copy and feedback surfaces, while Retry remains the same action color. Pale blue plus a visible check marks a selected choice. White with dark blue text is secondary; quiet text/icons provide supplementary navigation; red identifies errors or destructive actions.

`base.css` owns the shared values. `system.css` owns native `.system-action` geometry and states: 48px default minimum, `--compact` at 44px and `--prominent` at 52px, 14px corners, a 4px edge, and a 3px press translation. Presses preserve the control's layout size. Controls may grow for wrapping labels. Feature owners may opt into these classes or consume the same tokens through an existing renderer. Lesson controls are owned by `lesson/navigation.css`; their compact mobile stack and completion variant belong there or in the completion owner. Focus is a dark 3px outline, separate from selection.

Arabic UI text uses the locally supplied **Noto Sans Arabic** variable family, with Tahoma/Arial/system sans-serif fallbacks. Arabic and Latin web font subsets and the SIL OFL license live in `assets/fonts/noto-sans-arabic/`; `index.html` preloads both subsets. `font-display:swap` keeps failed or blocked fonts readable. Code uses `--font-code`. Existing display fonts remain confined to intentional developer/reference treatments.

The compact type roles include weight and leading: `--type-title` (800, 24–32px, 1.5), `--type-section` (800, 20px, 1.5), `--type-body` (400, 16px, 1.7), `--type-control` (700, 15px, 1.5), `--type-helper` (600, 13px, 1.6), and `--type-metric` (800, 30px, 1.2). These sizes use rem units. Components can keep a measured local size while using the same family. Arabic prose has no Latin letter spacing; labels wrap and mixed code/numeric values use appropriate bidi isolation.

Spacing retains 8/12/16/24/32px roles. Control/card/panel radii are 14/16/24px. The parent owns the gap between components; each feature owns internal spacing and artwork geometry. `base.css` owns shell space, `course-map.css` owns cards, `visitor-flow.css` owns onboarding composition, and the `lesson/` styles own lesson internals. `system.css` and `responsive.css` do not override lesson actions, progress, or completion.

Curriculum and path cards retain native radios and their approved artwork. Both show the same persistent check marker, independent of image saturation; the keyboard focus outline remains distinct. Successful registration shows an enabled Continue action immediately. Celebration loading is scoped to its illustration; the learner decides when to leave, including under reduced motion.

Lesson progress remains yellow with a light upper highlight; its final treatment lives in `lesson/progress.css`. The Arabic footer follows the existing task arrangement, with a full-width primary and Previous action on narrow screens. Long Arabic labels wrap; code stays LTR.

Use the existing Rocky SVGs, with static alternatives for reduced motion. Reuse navigation icons rather than redrawing them. Every screen transition uses the shared motion helper.
