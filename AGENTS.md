# Working on the Tawjihi app

Arabic RTL learning for Palestinian Tawjihi students, starting with ICT. Browser JavaScript/CSS, Node and SQLite; no framework or bundler.

## Find the owner

Start with `npm run --silent map -- <topic-or-file>`. Read the returned source sections and tests; expand only when needed. Exclude generated folders, dependencies and data from routine searches. [ARCHITECTURE.md](docs/ARCHITECTURE.md) owns the map; read [PRODUCT.md](docs/PRODUCT.md) for product changes and [LESSON_AUTHORING.md](docs/LESSON_AUTHORING.md) for content changes.

This is the only agent guide. Put task history/evidence in change descriptions; do not add nested instructions, plans, handoff packs or reports.

## Change the smallest useful thing

- Check Git status/diffs; preserve concurrent edits. Assign agents disjoint files. No push or deployment unless requested.
- Extend the existing owner before adding modules. Split distinct responsibilities; avoid one-use wrappers, generic frameworks and speculative configuration/dependencies.
- Inside `src/`: `data/` is content, `domain/` pure rules, `services/` browser IO/state, `ui/` rendering, `server/` HTTP/SQLite. No browser-to-server imports or DOM/storage in domain rules.
- Preserve URLs, storage keys, account identities and published lesson/part/step IDs. Keep HTTP and fixture modes working. Never commit student data, credentials, generated artifacts or browser profiles.
- Share the root session/progress stores. Register async work and cleanup with `app/view-lifecycle.js`; cancelled work must not attach or save to a new learner/view.
- Preserve RTL, native controls, visible focus, reduced motion and loading/retry behavior. Reuse `ui/view-motion.js` and `ui/media-ready.js`; load lazy CSS before revealing content.
- Edit styles at their owner, not through appended overrides: `base.css` for tokens, `system.css` for shared controls, feature CSS for internals.
- Preserve the vibrant palette, white labels on filled actions/cards and original navbar icons. Keep known contrast failures reported; never silence failures to pass a gate.
- Rocky uses rod-free `assets/mascot/rocky-wave.svg`. The first Access summary (`styles/lesson/published.css`) is the visual reference. Reserve the brain icon and `يجب حفظه` for memorization. Keep lessons declarative; reuse shells/question controllers.
- Check imports, dynamic references and active lesson content before deleting files. More is blank; unfinished tabs are locked through the shared route policy. Add only used media; keep experiments on separate branches. Update existing guides when ownership changes.

## Verify

During edits, use the map's focused check. Before handing off code, run `npm run check` once after the final edit. Shared UI also needs `test:browser`; storage needs `test:progress-storage`; loading/motion needs `test:render`, `test:assets` or `test:splash`. Documentation-only edits need `npm run build` and `npm run audit:manageability`. Repeat passed checks only for new changes or unresolved failures. `npm run release` remains the full deployment gate.

Test behavior, not implementation copies. Review size/document budget changes deliberately. Never loosen checks, increase timeouts or hide failures just to pass. Report passed, failed and unrun checks.
