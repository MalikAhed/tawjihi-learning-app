# Tawjihi Learning App

مساحة تعلّم عربية باتجاه RTL لطلاب التوجيهي. The app combines a course map,
interactive lessons, mathematics practice, learner progress, and an optional
account-backed server for synchronising progress between browsers.

## Current scope

- ICT and Mathematics 1 are published in the course map.
- Mathematics 2, Physics, Biology, Chemistry, English, Arabic, and Islamic
  Education are represented as planned subjects and remain unpublished.
- The browser UI is Arabic-first and includes responsive, keyboard, reduced
  motion, and accessibility-focused flows.
- Accounts and progress APIs run from the bundled Node server. Production uses
  an on-disk SQLite database; development defaults to a local database file.

## Run locally

Requires Node.js 22.5 or newer:

\`\`\`sh
npm ci
npm run dev
\`\`\`

Open the URL printed by the server (normally
[http://localhost:4173](http://localhost:4173)). Keep the server running while
using the browser app; opening \`index.html\` directly skips the module server,
live reload, and account/progress endpoints.

## Checks

Run the complete local gate before submitting a change:

\`\`\`sh
npm run check
\`\`\`

It covers syntax, TypeScript checking, Node tests, application validation, and
the manageability audit. Focused checks are available for navigation, math,
accounts, progress storage, rendering, assets, accessibility, motion, and
browser compatibility. For example:

\`\`\`sh
npm run test:navigation
npm run test:progress-storage
npm run test:a11y
\`\`\`

Browser checks require the installed Playwright browsers. \`npm run map\` shows
the ownership map in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), and accepts a
task or module path to print its focused check and direct importers.

## Production server

Use \`npm start\` to run the production-mode server. Production configuration
must set:

- \`PUBLIC_ORIGIN\`: the HTTPS origin used by the app (loopback HTTP is allowed
  only for local development)
- \`ACCOUNTS_DATABASE_PATH\`: a durable path for the SQLite account database
- \`PORT\`: optional listening port (defaults to \`4173\`)
- \`TRUSTED_PROXY_ADDRESSES\`: optional comma-separated IPs when a reverse proxy
  supplies forwarded client headers

The server rejects invalid origins, untrusted proxy headers, and in-memory
account storage in production. Keep the database path outside transient build
directories and back it up before upgrades.

## Project layout

\`\`\`text
index.html             browser entry point and app shell
src/                   UI, lesson data, progress, account and server modules
tests/                 Node and Playwright regression checks
scripts/               validation, packaging, mapping and maintenance tools
assets/                bundled curriculum and visual assets
docs/ARCHITECTURE.md   ownership map used by npm run map
\`\`\`

## License

MIT. See [LICENSE](LICENSE).
