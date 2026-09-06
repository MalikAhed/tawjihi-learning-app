# Current developer workspace

The More tools and component reference use Arabic and RTL, matching the current application. Technical file names and code remain LTR.

- UI Lab (`?view=ui-lab`) is a full-screen blank board, with only close and code controls. It has no lesson shell, template navigation, or experiment archive. Edit `src/ui/ui-lab/board.js` for the current AI-created HTML/CSS/JS experiment. Browser edits survive reopening during the current session. Source edits reload through the existing development server.
- Preview execution uses the existing isolated code runner. Runtime errors reopen the editor. Do not loosen the application CSP or grant the frame same-origin access.
- Refine one experiment through feedback. Add it to Ship Ready only when the user explicitly asks. Opening or running an experiment does not publish it.
- Ship Ready retains its eight reusable templates. Its Arabic presentation lives in `src/data/ship-ready-ar.js`; its IDs and interaction contracts remain in the shared registry.
- The current reference groups actions/navigation, colors, cards/sections, fields/states, SVGs/Rocky, and type/motion. See `src/ui/current-design-system.js` and `src/styles/system.css`.

## Visual roles

Green: the main action for a task. Pale blue: current destination or selected option. White with dark blue text: a secondary action. Quiet text/icons: supplementary navigation. Red: errors and destructive actions. A wrong answer does not turn the retry button red.

Lesson progress is glossy yellow, with a light upper highlight and darker lower edge. The Arabic footer places Previous on the right and the primary action on the left. Feedback sits between them on desktop and above them on narrow screens. Long Arabic labels wrap; code stays LTR.

Use the existing Rocky SVGs, with static alternatives for reduced motion. Reuse navigation icons rather than redrawing them. Every screen transition uses the shared motion helper.
