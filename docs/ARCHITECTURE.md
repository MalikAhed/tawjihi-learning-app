# Tawjihi Learning App architecture

This guide is the quick map for finding the code behind a feature. Keep the
owner rows current when moving a module or changing its focused regression
check. The `npm run map` command reads this table and reports the owning area,
its direct importers, and the check to run before opening a pull request.

| Task | Start here | Focused check |
| --- | --- | --- |
| Account, sessions, and request security | `src/server/` | `npm run test:accounts` |
| Course map, subjects, and lesson data | `src/data/` | `npm run test:navigation` |
| Learner progress and cross-device sync | `src/` | `npm run test:progress-storage` |
| Browser UI, responsive layout, and accessibility | `src/` | `npm run test:a11y` |
| Build, packaging, and release gates | `scripts/` | `npm run check` |

## How to use the map

Run `npm run map` to list the areas, or pass a task/file name:

```sh
npm run map progress
npm run map src/server/progress-api.mjs
```

The map is intentionally a starting point rather than a complete dependency
graph. After locating an owner, read the module's direct imports and run the
focused check before the full `npm run check` gate.
