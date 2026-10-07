# Runtime and recovery

The smallest supported stack is static files for fixture previews, or one Node process plus a durable SQLite file for real accounts. Core HTTP/SQLite code has no external server package dependencies. Browser libraries are installed by npm; test tooling is development-only. Use `npm run package:server` to create `_server/`: copy that folder to a Node host and run `node server.mjs` with the variables below; no npm install or test tools are needed on the host. The artifact's size is printed by packaging and source/media budgets by `npm run audit:manageability`.

## Server

Use Node 24. `npm run dev` enables local watching; `npm start` disables live reload. Experimental reset, code-preview and answer-review endpoints have been removed. Production requires:

```sh
PUBLIC_ORIGIN=https://your-app.example \
ACCOUNTS_DATABASE_PATH=/absolute/durable/accounts.sqlite \
npm start
```

`PORT` defaults to 4173. Terminate TLS at the host/proxy. `TRUSTED_PROXY_ADDRESSES` accepts exact proxy IPs; only those peers may supply forwarded headers, and the current parser expects a single forwarded client IP. Public origin controls secure cookies. `/healthz` and `/readyz` report process readiness. SIGINT/SIGTERM stop new work, close SQLite after active requests finish.

Keep data on durable storage. SQLite is currently one server's source of truth; adding replicas or multiple writer instances requires a separate design backed by measured workload needs. Do not introduce a distributed stack speculatively.

## Backups

Run maintenance commands from the source checkout, with access to the database volume; the minimal `_server/` artifact excludes maintenance/test scripts. Use absolute paths and a new destination:

```sh
npm run database:backup -- /absolute/accounts.sqlite /absolute/backups/accounts-copy.sqlite
npm run database:restore-check -- /absolute/backups/accounts-copy.sqlite
npm run database:migrate-check -- /absolute/accounts.sqlite
```

Backup uses SQLite `VACUUM INTO`, includes committed WAL data and refuses to overwrite a destination. Recovery checks work on temporary copies, verify integrity/account/progress counts and check that the source remains unchanged. Future database schemas are rejected before alteration; legacy migrations can invalidate old sessions and report that count.

Before changing a real database, test its backup. To roll back: stop the server, restore a verified backup to a new path, configure that path and restart a compatible app version. Preserve the original database and WAL together; do not copy a running database file alone.

`npm run test:recovery` checks disposable recovery cases. `npm run test:capacity` measures disposable account/progress workloads; `npm run package:preview && npm run measure:browser` measures the packaged browser. Evidence goes to ignored `artifacts/`. Local results do not establish hosting capacity, live-provider latency, scheduled backup guarantees or physical-device accessibility.

## Static preview and installation

`npm run package:preview` creates `_site/` with fixture mode. It excludes server files, tests, unused source maps and authoring metadata, and includes only selected dependency runtime files with their license notices. `npm run test:preview` exercises the artifact under `/learn-preview/` with no API fallback.

One GitHub Actions workflow runs the complete release gate before publishing the same artifact on `main`. Blocking accessibility failures stop publishing; existing palette contrast exceptions remain reported. Keep production accounts out of the public fixture preview.

See [INSTALL_WEB_APP.md](INSTALL_WEB_APP.md) for standalone-window installation. The manifest adds an app window, not offline support.

Reference PDFs are excluded from deployment and kept in a separate source archive. Serve text assets through the Node handler or a CDN with Brotli/gzip support; image formats are already compressed. Guest/Home startup avoids question banks, future onboarding artwork and optional prefetch on constrained connections.
