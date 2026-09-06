# Tawjihi Learning App

Arabic-first learning and exam preparation for Palestinian Tawjihi students. The current product focus is the Gaza Scientific curriculum, beginning with ICT.

## Current status

The app is under active development. It currently includes Arabic RTL entry and account flows, a subject dashboard, an ICT roadmap, and the first interactive ICT lesson. It is not yet ready for a public launch.

The product is being built in three stages:

1. Complete and validate the clickable UI/UX.
2. Connect the approved experience to durable backend services.
3. Apply final visual polish without changing the validated journeys.

See [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) for the delivery plan and
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for entry points, state ownership, shared UI and focused checks.

## Requirements

- Node.js 24 recommended; Node.js 22.5 or newer is supported.
- npm
- Google Chrome or Chromium for browser tests.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:4173` unless the server reports a different port.

Local account data is written under `data/` and is intentionally excluded from Git.

## Quality checks

```bash
npm run check:syntax
npm test
npm run build
npm run test:browser
```

Run the same checks used by GitHub Actions with:

```bash
npm run ci
```

The separate maintainability audit can be run with `npm run audit:manageability`. It checks ownership boundaries and file-size budgets; it is also included in `npm run verify`.
For asynchronous rendering and first-paint changes, also run `npm run test:render`.

## Repository workflow

1. Create a short branch from `main`, such as `feature/ict-review-flow`.
2. Make one focused change and add or update tests.
3. Run `npm run ci` locally.
4. Push the branch and open a pull request.
5. Merge only after CI passes and the UI behavior has been reviewed.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contribution rules.

## Important boundaries

- Never commit `.env` files, database files, tokens, passwords, payment evidence, or student data.
- Keep internal authoring and development tools separate from learner-facing navigation.
- Do not present future features as first-release promises.
- Keep completion, mastery, review, XP, and paid access as separate concepts.
- Product behavior must stay aligned with the approved user stories before backend contracts are frozen.

## Main directories

```text
assets/       Images, icons, maps, and lesson media
docs/         Product decisions and UI/UX traceability
scripts/      Validation and browser checks
src/          Application source
tests/        Automated tests and fixtures
```

## Deployment

Pushes to `main` deploy a public Phase 1 preview through GitHub Pages. On that static preview, account flows use the browser prototype service and temporary session storage. Running `npm run dev` continues to use the local Node account API and SQLite store.

The Pages site is a product preview rather than a production account service. Persistent accounts and server-backed review tools require a Node hosting target with durable storage.
