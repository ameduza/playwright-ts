# AGENTS.md

Playwright + TypeScript E2E suite (API + UI) for a RealWorld "Conduit" app.
Test code is in the root folders; `app/` is the vendored app under test
(Django REST backend + Angular frontend, served together on port 8000).

## Commands

- All tests: `npx playwright test` — there is no `test` npm script
- One file: `npx playwright test tests/articles.spec.ts`
- One test: `npx playwright test -g "create article"`
- Typecheck: `npx tsc --noEmit` — no npm script for it
- Lint: `npm run lint`
- Report: `npx playwright show-report tmp/playwright-report`

## Start the backend manually (it will not auto-start)

`npm run serve` hardcodes a Windows venv path (`app\.venv\Scripts\python`) and
dies on Linux/macOS with `sh: 1: app.venvScriptspython: not found`. Playwright's
`webServer` block runs that same script, so **test runs cannot start the server
themselves here**. Start it yourself from the repo root:

```bash
app/.venv/bin/python app/backend/manage.py runserver
```

`webServer.reuseExistingServer` is true off-CI, so Playwright reuses it.
`baseURL` is `http://localhost:8000/#/`; override with `BASE_URL`.

## Test data prerequisites (nothing in the repo seeds these)

- The `api` and `ui` fixtures log in as `user01@test.com` / `user01Pass` on
  every test. That row must already exist in the local, gitignored
  `app/backend/db.sqlite3`. A freshly migrated DB has no users, so **every test
  fails in the fixture** until it is created:
  `POST /api/users` with `{"user":{"username","email","password"}}`.
- `user02` in `fixtures/users.ts` is currently unused and is not in the DB.
- `tests/tags.spec.ts` asserts the tag list is non-empty, so it depends on tag
  rows already in the DB and fails on a fresh one. Per-test cleanup deletes
  created articles but leaves tags behind, so it passes on later runs. Tests are
  not hermetic — they share one persistent sqlite DB.

## UI tests need system libraries

Chromium currently cannot launch on this machine
(`libnspr4.so: cannot open shared object file`), so all UI specs fail while API
specs pass. Fix with `sudo npx playwright install-deps chromium` (or install
`libnspr4` / `libnss3`). Browser binaries themselves come from
`npx playwright install`.

## Prettier: never run it repo-wide

`.prettierignore` does **not** exclude `app/`, so `npx prettier --write .`
(as suggested by `README.md`) rewrites ~358 vendored app files. 362 files are
unformatted; only 4 are outside `app/`. Scope it instead:

```bash
npx prettier --write "{tests,steps,api-services,fixtures,generators,types,utils}/**/*.ts" "*.{ts,mjs,json}"
```

eslint and `tsc` _do_ exclude `app/` — do not import across that boundary.

## Architecture

- Specs import `test` from `fixtures/test-fixture.ts` (never `@playwright/test`)
  and `expect` from `@playwright/test`.
- Layering: `tests/` → `steps/` (business actions, own the assertions on status
  codes) → `api-services/` (thin per-resource controllers over `BaseRequest`) →
  HTTP. `BaseRequest` sets JSON headers, `Authorization: Token <jwt>`, and
  defaults `failOnStatusCode: true`.
- UI selectors live only in `utils/UiLocators/`; routes in
  `utils/configs/api-config.ts` and `ui-config.ts`.
- New API resource: controller in `api-services/` composing `BaseRequest`, a
  step class in `steps/`, then register it in `fixtures/test-fixture.ts`.
- `TestContext` records created articles and the `api` fixture deletes them
  after each test. `AuthAPI` caches tokens in a static Map keyed by email.
- Request/response types in `types/`; test data from faker generators in
  `generators/`, never hardcoded.

## Misc

- Only the `chromium` project is enabled; `actionTimeout` is 6s.
- Artifacts go to gitignored `tmp/` (`tmp/playwright-report`, `tmp/test-results`).
- This repo has no CI. `app/.github/workflows/ci.yml` is vendored upstream config
  targeting `master`/`deploy` branches and never runs here.
- `.github/copilot-instructions.md` is stale (claims `utils/` is empty and that
  JWTs are hardcoded — both untrue). Prefer this file and `README.md`.
