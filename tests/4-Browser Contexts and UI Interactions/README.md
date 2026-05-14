# Browser Contexts and UI Interactions

## 📌 About
This chapter covers browser context management, popup handling, test reporting,
text and attribute extraction, iterating over matched elements, and interacting
with checkboxes — all using **TypeScript** and **Playwright**. Targets include
**OrangeHRM**, **GitHub (Khadija-ASSOUANE)**, and **selenium.dev** for JS alerts
(OrangeHRM has no native JS dialogs).

---

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 📁 Files Structure

```
Browser Contexts and UI Interactions/
├── 1_BrowserContext_Test.spec.ts
├── 2_ReRunFailed_Test.spec.ts
├── 3_AlertsPopups_Test.spec.ts
├── 4_TestReports_Test.spec.ts
├── 5_TextContent_GetAttribute_Test.spec.ts
├── 6_Iterating_Elements_Test.spec.ts
├── 7_Checkbox_RadioButton_Test.spec.ts
└── README.md
```

---

## 📄 Files Description

### `1_BrowserContext_Test.spec.ts` — Browser Contexts and Tabs
> Demonstrates multiple browser contexts and new tabs. Context 1 logs into
> OrangeHRM and validates the dashboard. Context 2 opens the GitHub profile page
> and then spawns a new tab to the repositories view.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com + https://github.com/Khadija-ASSOUANE/ |
| **Key APIs** | `browser.newContext()`, `context.newPage()` |
| **Key Concept** | Isolated browser sessions with multiple contexts and tabs |

---

### `2_ReRunFailed_Test.spec.ts` — Re-Run Failed Tests
> Contains one passing OrangeHRM login test and two intentionally failing tests.
> Used to demonstrate Playwright's `--last-failed` flag which re-runs only the
> tests that failed in the previous run.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `--last-failed` CLI flag |
| **Key Concept** | Selective re-run of failed tests |

---

### `3_AlertsPopups_Test.spec.ts` — Alerts and Popups
> Demonstrates handling native JS dialogs — alert, confirm, and prompt — using
> Playwright's `page.once('dialog', ...)` event. selenium.dev is kept as the
> target since OrangeHRM does not expose native JS dialogs.

| Property | Details |
|---|---|
| **Target** | https://www.selenium.dev/documentation/webdriver/interactions/alerts/ |
| **Key APIs** | `page.once('dialog', handler)`, `dialog.accept()`, `dialog.dismiss()` |
| **Key Concept** | Handling alert, confirm, and prompt dialog types |

---

### `4_TestReports_Test.spec.ts` — Test Reports
> Demonstrates SmokeTesting and RegressionTesting describe groups targeting
> OrangeHRM. The SmokeTesting group passes; RegressionTesting contains one
> intentionally failing test to illustrate failure representation in the HTML report.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.describe()`, HTML reporter |
| **Key Concept** | Generating structured test reports with passing and failing tests |

---

### `5_TextContent_GetAttribute_Test.spec.ts` — Text Content and Get Attribute
> Demonstrates `innerText()` to extract visible text (profile name, username)
> and `getAttribute()` to read href values from the GitHub profile page.

| Property | Details |
|---|---|
| **Target** | https://github.com/Khadija-ASSOUANE/ |
| **Key APIs** | `innerText()`, `getAttribute()` |
| **Key Concept** | Extracting text content and HTML attributes at runtime |

---

### `6_Iterating_Elements_Test.spec.ts` — Iterating Elements
> Demonstrates three iteration strategies over repository links on the GitHub
> profile: `for-of` with `$$()`, index-based `for` loop, and `nth()` with a count
> loop.

| Property | Details |
|---|---|
| **Target** | https://github.com/Khadija-ASSOUANE?tab=repositories |
| **Key APIs** | `page.$$()`, `locator.count()`, `locator.nth()` |
| **Key Concept** | Three patterns to iterate over matching elements |

---

### `7_Checkbox_RadioButton_Test.spec.ts` — Checkbox and Radio Button
> Demonstrates checkbox interactions in the OrangeHRM Admin > User Management
> table — verifying initial unchecked state, checking, re-unchecking, and
> using the select-all header checkbox.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `check()`, `uncheck()`, `toBeChecked()`, `not.toBeChecked()` |
| **Key Concept** | Checkbox state verification and interaction |

---

## 🧪 Test Summary

| File | Target | Key Concept |
|---|---|---|
| `1_BrowserContext_Test.spec.ts` | OrangeHRM + GitHub | Multiple contexts and new tabs |
| `2_ReRunFailed_Test.spec.ts` | OrangeHRM | --last-failed re-run mechanics |
| `3_AlertsPopups_Test.spec.ts` | selenium.dev | Alert, confirm, and prompt dialogs |
| `4_TestReports_Test.spec.ts` | OrangeHRM | HTML report with pass/fail groups |
| `5_TextContent_GetAttribute_Test.spec.ts` | GitHub profile | innerText() and getAttribute() |
| `6_Iterating_Elements_Test.spec.ts` | GitHub repositories | for-of, index, nth() iteration |
| `7_Checkbox_RadioButton_Test.spec.ts` | OrangeHRM Admin | check / uncheck / toBeChecked |

---

## ⚙️ Prerequisites
- Node.js v18+
- Playwright installed

```bash
npm init playwright@latest
```

---

## 🚀 Running Tests

### Run all Chapter 4 tests
```bash
npx playwright test tests/Browser Contexts and UI Interactions
```

### Run a specific file
```bash
npx playwright test tests/Browser Contexts and UI Interactions/1_BrowserContext_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/2_ReRunFailed_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/3_AlertsPopups_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/4_TestReports_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/5_TextContent_GetAttribute_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/6_Iterating_Elements_Test.spec.ts
npx playwright test tests/Browser Contexts and UI Interactions/7_Checkbox_RadioButton_Test.spec.ts
```

### Re-run only failed tests
```bash
npx playwright test tests/Browser Contexts and UI Interactions/2_ReRunFailed_Test.spec.ts --last-failed
```

### Run in headed mode (see the browser)
```bash
npx playwright test tests/Browser Contexts and UI Interactions --headed
```

### Run in a specific browser
```bash
npx playwright test tests/Browser Contexts and UI Interactions --project=chromium
npx playwright test tests/Browser Contexts and UI Interactions --project=firefox
npx playwright test tests/Browser Contexts and UI Interactions --project=webkit
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
npx playwright codegen https://github.com/Khadija-ASSOUANE/
```

---

## 🔑 Key Concepts Covered

| Concept | Description |
|---|---|
| `browser.newContext()` | Creates an isolated browser context with its own cookies and storage |
| `context.newPage()` | Opens a new page (tab) within a browser context |
| `--last-failed` | Re-runs only the tests that failed in the previous run |
| `page.once('dialog', handler)` | Registers a one-time handler for the next dialog event |
| `dialog.accept()` | Accepts an alert, confirm, or prompt dialog |
| `dialog.dismiss()` | Dismisses a confirm or prompt dialog |
| `dialog.accept(text)` | Accepts a prompt dialog and types the given text |
| `innerText()` | Returns the visible text content of an element |
| `getAttribute()` | Returns the value of a specified HTML attribute |
| `page.$$()` | Returns all matching elements as an array (ElementHandle[]) |
| `locator.count()` | Returns the number of elements matching the locator |
| `locator.nth(index)` | Returns the nth matching element |
| `check()` | Checks a checkbox or radio button |
| `uncheck()` | Unchecks a checkbox |
| `toBeChecked()` | Asserts that a checkbox or radio button is checked |

---

## 🌐 Applications Under Test

| App | URL |
|---|---|
| **OrangeHRM** | https://opensource-demo.orangehrmlive.com |
| **GitHub Profile** | https://github.com/Khadija-ASSOUANE/ |
| **Selenium Dev** | https://www.selenium.dev (JS alerts only) |

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
- [Playwright Browser Contexts](https://playwright.dev/docs/browser-contexts)
- [Playwright Dialogs](https://playwright.dev/docs/dialogs)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
