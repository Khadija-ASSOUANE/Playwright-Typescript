# POM and Data-Driven Testing

## About
This chapter covers advanced Playwright patterns for real-world test suites:
reading environment variables, data-driven testing from JSON / CSV / Excel files,
the Page Object Model (POM), custom fixtures, environment-conditional test logic,
and authentication session validation — all targeting **OrangeHRM** as the
application under test.

---

## Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [csv-parse](https://csv.js.org/parse/) — CSV parsing
- [ExcelJS](https://github.com/exceljs/exceljs) — Excel reading
- [dotenv](https://github.com/motdotla/dotenv) — .env file support

---

## File Structure

```
5-POM and Data-Driven Testing/
├── 1_ReadENVFile_Test.spec.ts
├── 2_DataDrivenTestingUsingJSON.spec.ts
├── 3_DataDrivenTestingUsingCSV.spec.ts
├── 4_DataDrivenTestingUsingEXCEL.spec.ts
├── 5_PageObjectModelTest.spec.ts
├── 6_Fixture_Test.spec.ts
├── 7_Optimized_POM_Test.spec.ts
├── 8_RunTestBasedOnEnv.spec.ts
├── 9_Authentication_Test.spec.ts
├── 9_Without_PageObjectModel_Test.spec.ts
└── README.md
```

---

## File Descriptions

### `1_ReadENVFile_Test.spec.ts` — Read ENV File
Demonstrates reading `ORANGEHRM_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`
from environment variables (`.env` file) and using them to drive an OrangeHRM
login test.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `process.env.VARIABLE`, `dotenv` |
| **Key Concept** | Externalising configuration from code using .env files |

---

### `2_DataDrivenTestingUsingJSON.spec.ts` — Data-Driven Testing (JSON)
Demonstrates looping over a JSON object of credential datasets to generate
multiple OrangeHRM login tests — both valid and invalid — from a single test body.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `for...in`, JSON import |
| **Key Concept** | Data-driven test generation from a JSON file |

---

### `3_DataDrivenTestingUsingCSV.spec.ts` — Data-Driven Testing (CSV)
Demonstrates loading test data from a CSV file using `csv-parse/sync` and
looping over credential rows to test OrangeHRM login with multiple datasets.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `csv-parse/sync`, `fs.readFileSync()`, `for...of` |
| **Key Concept** | Data-driven test generation from a CSV file |

---

### `4_DataDrivenTestingUsingEXCEL.spec.ts` — Data-Driven Testing (Excel)
Demonstrates loading test data from an Excel file (via ExcelJS / ExcelHelper)
and looping over credential rows to test OrangeHRM login.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `ExcelJS`, `readExcelFile()` helper |
| **Key Concept** | Data-driven test generation from an Excel (.xlsx) file |

---

### `5_PageObjectModelTest.spec.ts` — Page Object Model
Demonstrates the POM pattern using `LoginPage` and `DashboardPage` classes for
OrangeHRM. Test actions are abstracted into reusable page object methods imported
from `src/pages/`.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | Class-based POM, `new LoginPage(page)`, `new DashboardPage(page)` |
| **Key Concept** | Page Object Model — separating test logic from UI selectors |

---

### `6_Fixture_Test.spec.ts` — Fixtures
Demonstrates a custom Playwright fixture that provides a pre-authenticated
OrangeHRM page to every test, eliminating repeated login setup code.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.extend()`, custom fixture with setup/teardown |
| **Key Concept** | Fixture-based shared test setup and teardown |

---

### `7_Optimized_POM_Test.spec.ts` — Optimized POM with Fixtures
Demonstrates the optimized POM pattern where page objects are injected directly
into tests via a custom fixture, combining the benefits of POM and fixtures.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.extend()` with page object fixtures |
| **Key Concept** | Injecting page objects via fixtures for cleaner tests |

---

### `8_RunTestBasedOnEnv.spec.ts` — Run Tests Based on Environment
Demonstrates branching test logic based on the `ENV` environment variable
(`qa` vs `staging`), using environment-specific URLs and assertions.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `process.env.ENV`, conditional test logic, URL map |
| **Key Concept** | Environment-conditional test execution |

---

### `9_Authentication_Test.spec.ts` — Authentication Test
Demonstrates a complete OrangeHRM login flow, session validation (authenticated
user name visible in the top bar), and session persistence (navigating to a
protected page without re-login).

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `goto()`, `fill()`, `click()`, `toHaveURL()`, `innerText()` |
| **Key Concept** | Authentication flow and session persistence validation |

---

### `9_Without_PageObjectModel_Test.spec.ts` — Without POM
Demonstrates the same OrangeHRM authentication flow as `9_Authentication_Test`
but with all selectors and actions written inline — no POM classes used. Shows
the contrast between with-POM and without-POM approaches.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | Direct Playwright API (no abstraction layer) |
| **Key Concept** | Inline test code — illustrates why POM improves maintainability |

---

## Test Summary

| File | Target | Key Concept |
|---|---|---|
| `1_ReadENVFile_Test.spec.ts` | OrangeHRM | process.env variables |
| `2_DataDrivenTestingUsingJSON.spec.ts` | OrangeHRM | Data-driven from JSON |
| `3_DataDrivenTestingUsingCSV.spec.ts` | OrangeHRM | Data-driven from CSV |
| `4_DataDrivenTestingUsingEXCEL.spec.ts` | OrangeHRM | Data-driven from Excel |
| `5_PageObjectModelTest.spec.ts` | OrangeHRM | Page Object Model |
| `6_Fixture_Test.spec.ts` | OrangeHRM | Custom Playwright fixture |
| `7_Optimized_POM_Test.spec.ts` | OrangeHRM | POM injected via fixture |
| `8_RunTestBasedOnEnv.spec.ts` | OrangeHRM | ENV-conditional test logic |
| `9_Authentication_Test.spec.ts` | OrangeHRM | Login + session validation |
| `9_Without_PageObjectModel_Test.spec.ts` | OrangeHRM | Inline test (no POM) |

---

## Prerequisites
- Node.js v18+
- Playwright installed
- csv-parse installed: `npm install csv-parse`
- ExcelJS installed: `npm install exceljs`
- dotenv installed: `npm install dotenv`

```bash
npm init playwright@latest
```

---

## Running Tests

### Run all POM and Data-Driven Testing tests
```bash
npx playwright test tests/5-POM and Data-Driven Testing
```

### Run a specific file
```bash
npx playwright test tests/5-POM and Data-Driven Testing/1_ReadENVFile_Test.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/2_DataDrivenTestingUsingJSON.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/3_DataDrivenTestingUsingCSV.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/4_DataDrivenTestingUsingEXCEL.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/5_PageObjectModelTest.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/6_Fixture_Test.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/7_Optimized_POM_Test.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/8_RunTestBasedOnEnv.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/9_Authentication_Test.spec.ts
npx playwright test tests/5-POM and Data-Driven Testing/9_Without_PageObjectModel_Test.spec.ts
```

### Run with ENV variable
```bash
ENV=qa npx playwright test tests/5-POM and Data-Driven Testing/8_RunTestBasedOnEnv.spec.ts
ENV=staging npx playwright test tests/5-POM and Data-Driven Testing/8_RunTestBasedOnEnv.spec.ts
```

### Run in headed mode
```bash
npx playwright test tests/5-POM and Data-Driven Testing --headed
```

### Run in a specific browser
```bash
npx playwright test tests/5-POM and Data-Driven Testing --project=chromium
npx playwright test tests/5-POM and Data-Driven Testing --project=firefox
npx playwright test tests/5-POM and Data-Driven Testing --project=webkit
```

---

## View Test Report
```bash
npx playwright show-report
```

---

## Generate Tests with Codegen
```bash
npx playwright codegen https://opensource-demo.orangehrmlive.com
```

---

## Key Concepts Covered

| Concept | Description |
|---|---|
| `process.env.VAR` | Reads an environment variable at runtime |
| JSON import + `for...in` | Loops over a typed JSON object as test datasets |
| `csv-parse/sync` | Synchronously parses a CSV file into a typed array |
| ExcelJS `readFile` | Reads an .xlsx file and provides worksheet/row/cell access |
| Page Object Model | Encapsulates page selectors and actions into reusable classes |
| `test.extend()` | Creates a custom fixture by extending the base test |
| Custom fixture | Provides shared setup (e.g. pre-logged-in page) to every test |
| ENV-conditional logic | Branches test behaviour based on `process.env.ENV` |
| Session validation | Verifies an authenticated session persists across page navigations |

---

## Application Under Test

| App | URL |
|---|---|
| **OrangeHRM** | https://opensource-demo.orangehrmlive.com |

---

## OrangeHRM Demo Credentials

| Field | Value |
|---|---|
| **Username** | Admin |
| **Password** | admin123 |

### .env File
```
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
ENV=qa
CSH_APPID=your-customer-service-hub-app-id
```

---

## Author
Khadija

---

## Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Environment Variables](https://playwright.dev/docs/test-parameterize#env-files)
- [Playwright Test Parameterization](https://playwright.dev/docs/test-parameterize)
- [csv-parse Documentation](https://csv.js.org/parse/)
- [ExcelJS Documentation](https://github.com/exceljs/exceljs)
