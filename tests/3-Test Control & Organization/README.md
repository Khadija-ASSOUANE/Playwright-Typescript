# Test Control & Organization — Test Annotations, Grouping, Tags, Retry, Parameterization, Visual Testing & Timeouts

## 📌 About
This chapter covers advanced test organisation and execution control techniques
in Playwright with **TypeScript**. It demonstrates annotations (`test.only`,
`test.skip`), describe groups, custom tags, retry mechanics, parameterized loops,
visual screenshot comparison, and per-test / per-action timeout configuration —
all targeting **OrangeHRM** and **GitHub (Khadija-ASSOUANE)** as the applications
under test.

---

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 📁 Files Structure

```
Test Control & Organization/
├── 1_Annotations_Test.spec.ts
├── 2_Grouping_Test.spec.ts
├── 3_Tags_Test.spec.ts
├── 4_Retry_Test.spec.ts
├── 5_Parameterize_Test.spec.ts
├── 6_VisualTesting_Test.spec.ts
└── 7_Timeouts_Test.spec.ts
```

---

## 📄 Files Description

### `1_Annotations_Test.spec.ts` — Annotations
> Demonstrates the three core Playwright test annotations on the OrangeHRM login
> and dashboard pages: `test` (runs normally), `test.skip` (always skipped), and
> `test.only` (only this test runs in the file).

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test`, `test.skip`, `test.only` |
| **Key Concept** | Controlling which tests run with annotations |

---

### `2_Grouping_Test.spec.ts` — Grouping
> Demonstrates `test.describe` to organise tests into named groups. SmokeTesting
> verifies the login page loads; RegressionTesting covers successful login and
> invalid-credentials error handling on OrangeHRM.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.describe()` |
| **Key Concept** | Grouping related tests under a shared describe block |

---

### `3_Tags_Test.spec.ts` — Tags
> Demonstrates Playwright test tags (`@SmokeTesting`, `@RegressionTesting`) so
> tests can be filtered with `--grep @SmokeTesting` on the CLI. Three OrangeHRM
> tests cover login page load, successful login, and invalid-credentials error.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `{ tag: ['@SmokeTesting'] }`, `{ tag: ['@RegressionTesting'] }` |
| **Key Concept** | Tag-based test filtering at runtime |

---

### `4_Retry_Test.spec.ts` — Retry
> Demonstrates the retry mechanism with one passing test (correct title) and one
> intentionally failing test (wrong assertion) on OrangeHRM. Configure retries in
> `playwright.config.ts` with `retries: 2`.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `retries` in `playwright.config.ts` |
| **Key Concept** | Automatic retry of failed tests |

---

### `5_Parameterize_Test.spec.ts` — Parameterized Tests
> Demonstrates a for-loop over an array of credential datasets (valid + invalid)
> to generate multiple OrangeHRM login tests from a single test body.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `for...of`, array of datasets |
| **Key Concept** | Data-driven test generation via parameterization |

---

### `6_VisualTesting_Test.spec.ts` — Visual Testing
> Demonstrates `toHaveScreenshot()` for full-page and element-level visual
> comparison on the GitHub login page. GitHub is kept as the target because it
> provides a visually stable public page ideal for baseline screenshots.

| Property | Details |
|---|---|
| **Target** | https://github.com/login |
| **Key APIs** | `toHaveScreenshot()`, element locator screenshot |
| **Key Concept** | Pixel-level visual regression testing |

---

### `7_Timeouts_Test.spec.ts` — Timeouts
> Demonstrates three levels of Playwright timeout control on the OrangeHRM login
> and dashboard: `test.setTimeout` (whole test), `{ timeout: n }` on a click
> action, and `{ timeout: n }` on an expect assertion.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.setTimeout()`, `click({ timeout })`, `toBeVisible({ timeout })` |
| **Key Concept** | Test-level, action-level, and expect-level timeout configuration |

---

## 🧪 Test Summary

| File | Target | Key Concept |
|---|---|---|
| `1_Annotations_Test.spec.ts` | OrangeHRM | test / test.skip / test.only |
| `2_Grouping_Test.spec.ts` | OrangeHRM | test.describe grouping |
| `3_Tags_Test.spec.ts` | OrangeHRM | @SmokeTesting / @RegressionTesting tags |
| `4_Retry_Test.spec.ts` | OrangeHRM | Automatic retry on failure |
| `5_Parameterize_Test.spec.ts` | OrangeHRM | For-loop parameterization |
| `6_VisualTesting_Test.spec.ts` | GitHub login | toHaveScreenshot() visual comparison |
| `7_Timeouts_Test.spec.ts` | OrangeHRM | Test, action, and expect timeouts |

---

## ⚙️ Prerequisites
- Node.js v18+
- Playwright installed

```bash
npm init playwright@latest
```

---

## 🚀 Running Tests

### Run all Test Control & Organization tests
```bash
npx playwright test tests/Test Control & Organization
```

### Run a specific file
```bash
npx playwright test tests/Test Control & Organization/1_Annotations_Test.spec.ts
npx playwright test tests/Test Control & Organization/2_Grouping_Test.spec.ts
npx playwright test tests/Test Control & Organization/3_Tags_Test.spec.ts
npx playwright test tests/Test Control & Organization/4_Retry_Test.spec.ts
npx playwright test tests/Test Control & Organization/5_Parameterize_Test.spec.ts
npx playwright test tests/Test Control & Organization/6_VisualTesting_Test.spec.ts
npx playwright test tests/Test Control & Organization/7_Timeouts_Test.spec.ts
```

### Run only smoke tests (using tags)
```bash
npx playwright test tests/Test Control & Organization --grep @SmokeTesting
```

### Run only regression tests (using tags)
```bash
npx playwright test tests/Test Control & Organization --grep @RegressionTesting
```

### Run with retries enabled
```bash
npx playwright test tests/Test Control & Organization/4_Retry_Test.spec.ts --retries=2
```

### Update visual snapshots
```bash
npx playwright test tests/Test Control & Organization/6_VisualTesting_Test.spec.ts --update-snapshots
```

### Run in headed mode (see the browser)
```bash
npx playwright test tests/Test Control & Organization --headed
```

### Run in a specific browser
```bash
npx playwright test tests/Test Control & Organization --project=chromium
npx playwright test tests/Test Control & Organization --project=firefox
npx playwright test tests/Test Control & Organization --project=webkit
```

---

## 📊 View Test Report
```bash
npx playwright show-report
```

---

## 🎥 Generate Tests with Codegen
```bash
npx playwright codegen https://opensource-demo.orangehrmlive.com
npx playwright codegen https://github.com/login
```

---

## 🔑 Key Concepts Covered

| Concept | Description |
|---|---|
| `test` | Defines a standard test that runs normally |
| `test.skip` | Marks a test to be skipped — never executes |
| `test.only` | Restricts execution to only this test in the file |
| `test.describe()` | Groups related tests under a named block |
| `{ tag: ['@Tag'] }` | Adds a tag to a test for CLI filtering (`--grep`) |
| `retries` | Automatically re-runs failing tests up to N times |
| `for...of` over array | Generates multiple tests from a dataset in a loop |
| `toHaveScreenshot()` | Compares page or element against a baseline PNG |
| `test.setTimeout()` | Overrides the default timeout for a single test |
| `click({ timeout })` | Sets a custom timeout for a specific action |
| `expect(..., { timeout })` | Sets a custom timeout for a specific assertion |

---

## 🌐 Applications Under Test

| App | URL |
|---|---|
| **OrangeHRM** | https://opensource-demo.orangehrmlive.com |
| **GitHub Login** | https://github.com/login (visual testing only) |

---

## 🔐 OrangeHRM Demo Credentials

| Field | Value |
|---|---|
| **Username** | Admin |
| **Password** | admin123 |

---

## 👤 Author
**Khadija**

---

## 🔗 Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Annotations](https://playwright.dev/docs/test-annotations)
- [Playwright Test Retries](https://playwright.dev/docs/test-retries)
- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Timeouts](https://playwright.dev/docs/test-timeouts)
- [Playwright Tags](https://playwright.dev/docs/test-annotations#tag-tests)
