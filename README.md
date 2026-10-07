# Khotwa · Tawjihi Learning App

> **Khotwa is my current startup:** an Arabic-first learning and exam-preparation platform for Palestinian Tawjihi students.

Khotwa turns the official study scope into a focused, RTL study experience with source-grounded questions, worked solutions, review cards, progress tracking and a responsive learner path. The live preview is available at [malikahed.github.io/tawjihi-learning-app](https://malikahed.github.io/tawjihi-learning-app/).

## Current product

- Seven published question paths: ICT, Mathematics 1, Mathematics 2, Physics, Chemistry, Biology and Islamic Education.
- Arabic-first interface with a phone-sized layout that also works on tablets and desktop.
- Original exam and textbook wording retained beside answer keys, page references and lightweight figure crops.
- Guest study, account-backed progress, IndexedDB caching and a Node/SQLite server adapter.
- Native MathML and local KaTeX rendering for Arabic mathematics, plus installable web-app metadata.
- A small, inspectable JavaScript application with no framework, bundler or AI service required for core learning.

English and Arabic language paths remain visible as clearly marked preparation areas while their content is authored. The product boundary and source decisions are recorded in [PRODUCT.md](docs/PRODUCT.md).

## Run it

Use Node 22.5+ and npm:

```sh
npm ci
npm run dev
```

Open `http://localhost:4173`. Development stores local accounts and progress in the ignored `data/` directory. The GitHub Pages preview is fixture-only; the server package enables real accounts.

## Verify it

```sh
npm run check           # syntax, types, unit tests, build and manageability
npm run test:browser    # Chromium learner journeys
npm run verify          # Chromium release gate and accessibility checks
npm run release         # verify, package, preview and compatibility checks
```

Install Firefox and WebKit once for compatibility checks with `npx playwright install --with-deps firefox webkit`. Browser evidence is written to ignored `artifacts/` or `/tmp/learn-browser-failures`. The accessibility gate records the retained bright-palette contrast exceptions; other violations fail the gate.

## Repository map

```text
src/       learner UI, curriculum, domain rules, browser services and Node server
assets/    runtime media, question figures, fonts and icons
scripts/   validation, packaging, release and maintenance tools
tests/     Node behavior tests plus browser journeys
docs/      architecture, product scope, authoring, coverage and operations
```

Start with [ARCHITECTURE.md](docs/ARCHITECTURE.md) for ownership and import boundaries. Use [LESSON_AUTHORING.md](docs/LESSON_AUTHORING.md) for new question content, then check the relevant coverage guide: [ICT](docs/ICT_COVERAGE.md) or [Islamic Education](docs/ISLAMIC_EDUCATION_COVERAGE.md), plus the subject source manifests under `src/data/lessons/` for mathematics, physics, chemistry and biology.

`npm run --silent map -- progress` prints the files and checks that own a feature. Keep source archives, student data, generated packages and scratch work outside the public artifact.

## Package and host

```sh
npm run build           # validates the source tree
npm run package:preview # creates the fixture-only _site/ artifact
npm run test:preview    # verifies that artifact under a URL prefix
npm run package:server  # creates the standalone _server/ artifact
```

The static package contains browser code, runtime media and dependency licenses only. Original PDFs and audit ledgers stay in the local source archive; the app ships lightweight, traceable page images where learners need them. The server package runs with Node built-ins and SQLite, negotiates compressed text responses and requires `PUBLIC_ORIGIN`, durable `ACCOUNTS_DATABASE_PATH` and the trusted-proxy settings documented in [OPERATIONS.md](docs/OPERATIONS.md).

GitHub Actions runs the release gate and deploys the fixture preview after a successful `main` build. Never commit student data, secrets, exports or generated screenshots. Work on focused branches and describe the validation result in each change.

## License

Original contributions are released under the [MIT License](LICENSE). Third-party code, source material, fonts and assets retain their own notices and licenses.
