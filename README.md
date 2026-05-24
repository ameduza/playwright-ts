# playwright-ts

End-to-end **API + UI** test suite written in **Playwright** and **TypeScript** for a
[RealWorld "Conduit"](https://github.com/gothinkster/realworld) clone — a Medium-like
blogging app built with a Django REST Framework backend and an Angular frontend.

The application under test lives in [app/](app/) and is included as a sub-project
purely so the suite can be run end-to-end against a real backend/frontend.

---

## Test Architecture

The suite is organized in layers so that low-level transport, domain calls,
reusable flows, and the actual test scenarios are cleanly separated.

```
tests/          # Playwright spec files (*.spec.ts) — assertions live here
steps/          # Reusable business-level steps (API + UI) used by specs
api-services/   # Thin HTTP clients per resource, built on BaseRequest
fixtures/       # Custom Playwright fixtures (test, context, users)
generators/     # Test data builders (e.g. articles) using @faker-js/faker
types/          # TypeScript request/response shapes
utils/          # Helpers, configs (api/ui), and UI locator objects
tmp/            # Playwright HTML report + test artifacts (gitignored)
app/            # Application under test (Django + Angular) — see app/README.md
```

### Layered flow

1. **Specs** in [tests/](tests/) import `test` from
   [fixtures/test-fixture.ts](fixtures/test-fixture.ts) (never directly from
   `@playwright/test`) so all custom fixtures are available.
2. **Fixtures** wire up dependencies: they authenticate a user via `AuthAPI`,
   build step objects (`ArticleApiStep`, `TagsApiStep`, `AuthUiStep`,
   `ArticleUiStep`), and expose them grouped as `api` and `ui`. A shared
   `TestContext` carries state (e.g. created articles) across steps and is used
   for automatic cleanup after each test.
3. **Steps** (in [steps/](steps/)) encapsulate business actions — "create
   article", "log in", "open editor" — composed from API services and UI
   locators. Specs call steps; they do not talk to HTTP or the DOM directly.
4. **API services** (in [api-services/](api-services/)) wrap a single REST
   resource. They delegate transport to `BaseRequest`
   ([api-services/baseRequest.ts](api-services/baseRequest.ts)), which wraps
   Playwright's `APIRequestContext`, always sets `Content-Type: application/json`
   plus an `Authorization: Token <jwt>` header, and defaults
   `failOnStatusCode: true`.
5. **UI locators** live in [utils/UiLocators/](utils/UiLocators/) so selectors
   are defined in one place and reused by UI steps.

### Configuration

- `baseURL` is `http://localhost:8000/#/` (Django serves both API and the
  built Angular app on port 8000). Override with the `BASE_URL` env var.
- Playwright config: [playwright.config.ts](playwright.config.ts).
  HTML reports are written to `tmp/playwright-report`, traces are retained on
  failure and retry, and a `webServer` block starts the backend automatically
  via `npm run serve`.
- Only the `chromium` project is enabled by default.

---

## Application Setup (run this first)

Before any tests can run, the application under test must be installed and
its database initialized. **Follow the setup instructions in
[app/README.md](app/README.md)** for the full Django + Angular setup
(virtualenv, `pip install`, migrations, optional frontend build).

Once the app is set up you can either start the server manually:

```bash
# from the repo root, using the venv created per app/README.md
npm run serve
```

…or just run the tests — Playwright's `webServer` will start it for you and
reuse it on subsequent runs (see `webServer` in
[playwright.config.ts](playwright.config.ts)).

---

## Install test dependencies

```bash
npm install
npx playwright install
```

## Running tests

```bash
# all tests (API + UI)
npx playwright test

# a single file
npx playwright test tests/articles.spec.ts

# a single test by title (substring match)
npx playwright test -g "create article"

# headed UI runs
npx playwright test --headed

# Playwright UI mode (watch + time-travel debugger)
npx playwright test --ui
```

### View the HTML report

```bash
npx playwright show-report tmp/playwright-report
```

### Lint & format

```bash
npm run lint
npx prettier --write .
```

---

## Conventions

- **Always extend `test` from [fixtures/test-fixture.ts](fixtures/test-fixture.ts)**
  when writing new tests so custom fixtures are available.
- **New API resource?** Add a client in [api-services/](api-services/) that
  composes `BaseRequest`, expose business actions through a `*-step.ts` file in
  [steps/](steps/), and register it as a fixture in
  [fixtures/test-fixture.ts](fixtures/test-fixture.ts).
- **Type all request/response shapes** in [types/](types/) before using them in
  API services.
- **UI selectors** belong in [utils/UiLocators/](utils/UiLocators/), not inline
  in steps or specs.
- **Test data** is built via factories in [generators/](generators/) using
  `@faker-js/faker`, not hardcoded.
- Prettier is configured with `singleQuote: true`; run it before committing.
- `app/` is excluded from `tsc` — don't import across that boundary.
