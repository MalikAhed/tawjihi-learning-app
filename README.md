# Tawjihi Learning App

Arabic-first learning and exam preparation for Palestinian Tawjihi students. The current product focus is the Gaza Scientific curriculum, beginning with ICT.

[Open the live preview](https://malikahed.github.io/tawjihi-learning-app/)

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
- Google Chrome or Chromium for the local browser gate.
- Firefox and WebKit builds for release checks: `npx playwright install --with-deps firefox webkit`. These are test dependencies; they are excluded from the static preview.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:4173` unless the server reports a different port.

Local account data is written under `data/` and is intentionally excluded from Git.

## Quality checks

```bash
npm run check       # syntax, checked JavaScript, Node tests, static validation, advisory inventory
npm run verify      # complete Chromium gate, including accessibility, render and media
npm run release     # verify + package preview + static journey + Firefox/WebKit
```

Run the same checks used by GitHub Actions with:

```bash
npm run ci
```

The separate maintainability audit can be run with `npm run audit:manageability`. It prints an advisory source/asset size inventory and is included in `npm run check`. Ownership and focused checks are documented in [ARCHITECTURE.md](docs/ARCHITECTURE.md).
Focused commands: `test:accounts`, `test:progress`, `test:progress-storage`, `test:motion`, `test:developer`, `test:a11y`, `test:render`, and `test:assets`. Full gates reject flags that shorten the run. Browser failures retain up to five temporary evidence bundles under `/tmp/learn-browser-failures`; all test accounts and browser profiles are disposable.

`npm run build` validates source; `npm run package:preview` creates `_site/`. `npm run test:preview` serves that artifact under `/learn-preview/` without an API. Pages uploads the exact artifact verified by the release gate.

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

Pushes to `main` deploy a public Phase 1 preview through GitHub Pages. The entry HTML explicitly selects fixture account mode in the packaged preview and HTTP mode on the Node server. Fixture sessions clear on ordinary refresh; member fixture progress stays in that browser’s IndexedDB. HTTP accounts and confirmed progress use SQLite, with account-bound pending answers in IndexedDB for retry. Guests remain session-scoped.

The Pages site is a product preview rather than a production account service. Persistent accounts and server-backed review tools require a Node hosting target with durable storage.


## Hosted runtime and recovery

The production entry is `npm start`. Configure `PUBLIC_ORIGIN` (HTTPS on a public host), `ACCOUNTS_DATABASE_PATH` (a durable SQLite path), and `REVIEW_PROVIDER_URL` before starting. `PORT` defaults to 4173. `TRUSTED_PROXY_ADDRESSES` is an optional comma-separated list of exact proxy IPs; forwarded headers from other peers are rejected. TLS terminates at the configured host/proxy, and the public origin controls secure cookies. Production disables developer reset, live reload, code-preview frames and author-supplied grading previews.

The review provider accepts a JSON POST with `answer`, `title`, `prompt`, `rubric` and `passScore`, and returns `{ "score": 9, "feedback": "..." }`. `REVIEW_PROVIDER_TOKEN` optionally supplies its server-side bearer token. The app validates results and returns an unavailable result if the provider fails. Review work is bounded to two active jobs plus eight queued jobs, with a 12-second whole-request deadline and per-account rate limits. Development retains the local CLI adapter. `/healthz` and `/readyz` report process readiness; they do not certify the external provider’s availability. SIGINT/SIGTERM stop accepting work, cancel reviews and close SQLite after active requests finish.

Use absolute database paths and a **new** backup destination:

```bash
npm run database:backup -- /absolute/accounts.sqlite /absolute/backups/accounts-2026-09-06.sqlite
npm run database:restore-check -- /absolute/backups/accounts-2026-09-06.sqlite
npm run database:migrate-check -- /absolute/accounts.sqlite
```

Backup uses SQLite `VACUUM INTO`, including committed WAL data, and refuses to overwrite an existing destination. Restore/migration checks operate on temporary copies, verify integrity and account/progress counts, and verify that the source did not change. The early account-schema migration invalidates old sessions and reports the count; current-schema recovery preserves them. Startup rejects newer database versions before altering schema.

Before changing a real database, test its backup with `database:migrate-check`. For rollback, stop the server, restore a verified backup to a **new database path**, configure that path and restart the compatible application version. Retain the original database and WAL together for recovery; do not overwrite or arbitrarily copy a running WAL database. The proposed one-hour data-loss and 30-minute restore objectives still require an actual host’s backup schedule and restore drill.

`npm run test:capacity` uses 100 disposable accounts, 20 progress writes and 20 session reads per second, a ten-user sign-in burst and a 600 ms review-provider stub. Run `npm run package:preview` before `npm run measure:browser` to measure the current artifact with fixed network/CPU throttling. Both measurements write local evidence under ignored `artifacts/`. Recorded results and limitations are in [the improvement plan](docs/AGENT_IMPROVEMENT_PLAN.md); repeat capacity and provider checks on the actual host before launch.
