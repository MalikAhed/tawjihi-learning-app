# Learning app

Read `docs/ARCHITECTURE.md` for the affected feature; do not load all product documents.

- Vanilla browser ES modules, CSS, and a Node development server. `npm run build` validates static files; it does not bundle the app.
- `src/main.js` wires routing and app lifetimes. UI belongs in `src/ui/`, domain rules in `src/domain/`, account IO/state in `src/services/`, lesson data in `src/data/`, server handlers in `src/server/`.
- The local server already supports accounts backed by SQLite. The static GitHub Pages preview uses session-storage fixtures. Preserve both modes; do not treat all accounts as production infrastructure.
- Preserve Arabic RTL, native controls, visible focus, and reduced motion. Use `src/ui/view-motion.js` for screen/tab transitions. Required media and styles must be ready before content entrance; handle errors and cancel stale navigation.
- Preserve the user's current visual direction: original vibrant card colors and subtle gradients, white text on colored cards and filled buttons, and the original gem, heart, and level navbar SVGs. Keep dark text on white inset panels and secondary controls. Report remaining contrast findings without silently changing this palette.
- `base.css` owns global tokens; feature styles own their components. Edit the original rule instead of appending another override. Avoid global selectors in lazy feature styles.
- Keep persisted lesson/step IDs stable. When changing lesson content, consult `LESSON_MARKDOWN_AUTHORING.md` and the current parser; use supported Markdown/directives.
- Product changes use the latest user decision, then approved records in `../user story plan/product-definition/`. `docs/PRODUCT_DECISION_2026-09-03_SIMPLIFIED_ENTRY_ACCOUNTS.md` supersedes conflicting older entry/account stories. Provisional stories and historical plans are not new requirements.
- Do not use or create skills unless the user asks. Do not require historical workflows or unavailable tools for ordinary code work.

## Checks

- `npm run check`: syntax, checked JavaScript, Node tests, static validation, and an advisory source/asset size report; no browser required.
- `npm run verify`: `check` plus browser journeys and asset/loading checks; requires Chrome.
- `npm run test:browser`: full browser journeys after shared UI changes.
- `npm run test:render`: delayed-load and first-paint checks after rendering changes.
- `npm run test:assets`: slow/failed media, background loading, and navigation cancellation.
- `npm run release`: the complete local gate plus the packaged-static preview and Firefox/WebKit journeys.
- `npm run dev`: local server. Browser checks start their own isolated server and use temporary accounts.
- Never commit local `data/`, credentials, generated output, or browser profiles.
