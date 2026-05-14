# Essentials — Core Playwright Techniques

## 📌 About
This chapter covers the essential building blocks of Playwright automation using
**TypeScript**. It introduces ten practical techniques — from capturing screenshots
and mastering locators to handling dropdowns, date pickers, and assertions — all
targeting **OrangeHRM** and **GitHub (Khadija-ASSOUANE)** as the applications
under test.

---

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 📁 Files Structure

```
Essentials/
├── 1_Screenshots_Test.spec.ts
├── 2_Locators_Test.spec.ts
├── 3_Hooks_Test.spec.ts
├── 4_DropdownList_Test.spec.ts
├── 5_Iframes_DragDrop_Test.spec.ts
├── 6_MouseActions_Test.spec.ts
├── 7_KeyboardActions_Test.spec.ts
├── 8_DatePicker_Test.spec.ts
├── 9_Assertions_Test.spec.ts
├── 10_SoftAssertions_Test.spec.ts
└── README.md
```

---

## 📄 Files Description

### `1_Screenshots_Test.spec.ts` — Screenshots
> Demonstrates three types of screenshots on the OrangeHRM login page:
> element-level (login form only), page-level (visible viewport), and
> full-page (entire scrollable content).

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `locator().screenshot()`, `page.screenshot()`, `fullPage: true` |
| **Key Concept** | Element vs page vs full-page screenshots |

---

### `2_Locators_Test.spec.ts` — Locators
> Demonstrates all major Playwright locator strategies. Uses the GitHub profile
> for `getByRole`, `getByLabel`, and `getByAltText`, and OrangeHRM for
> `getByPlaceholder`, CSS selectors, and XPath.

| Property | Details |
|---|---|
| **Target** | https://github.com/Khadija-ASSOUANE/ + OrangeHRM |
| **Key APIs** | `getByRole()`, `getByLabel()`, `getByAltText()`, `getByText()`, `getByPlaceholder()`, `getByTestId()`, `locator()` (CSS & XPath) |
| **Key Concept** | Choosing the right locator strategy |

---

### `3_Hooks_Test.spec.ts` — Hooks
> Demonstrates Playwright lifecycle hooks using OrangeHRM as the shared setup.
> `beforeEach` navigates to the login page before every test. Two tests cover
> valid and invalid login scenarios.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `test.beforeAll()`, `test.beforeEach()`, `test.afterEach()`, `test.afterAll()` |
| **Key Concept** | Shared setup and teardown with hooks |

---

### `4_DropdownList_Test.spec.ts` — Dropdown List
> Demonstrates handling custom Vue-based dropdowns on OrangeHRM's My Info page.
> Covers opening a dropdown by click, selecting options by visible text, and
> validating both selected values and available options.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `locator().click()`, `getByRole('option')`, `toContainText()`, `toHaveText()` |
| **Key Concept** | Custom dropdown interaction (click-to-open pattern) |

---

### `5_Iframes_DragDrop_Test.spec.ts` — Iframes & Drag and Drop
> Demonstrates accessing elements inside an iframe using `frameLocator()` and
> performing drag-and-drop with `dragTo()`. Uses jQuery UI demo pages as the
> target since OrangeHRM and GitHub do not expose iframe-based drag-and-drop UIs.

| Property | Details |
|---|---|
| **Target** | https://jqueryui.com/droppable/ |
| **Key APIs** | `page.frameLocator()`, `dragTo()` |
| **Key Concept** | Iframe element access and drag-and-drop |

---

### `6_MouseActions_Test.spec.ts` — Mouse Actions
> Demonstrates mouse interactions on the OrangeHRM login and dashboard pages:
> hover, left click, middle click, right click, and double-click.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `hover()`, `click({ button: 'left' })`, `click({ button: 'middle' })`, `click({ button: 'right' })`, `dblclick()` |
| **Key Concept** | All mouse button interactions and hover |

---

### `7_KeyboardActions_Test.spec.ts` — Keyboard Actions
> Demonstrates keyboard interactions on the OrangeHRM login page: Tab to navigate
> between fields, `Control+A` and Delete to clear input, and Enter to submit the
> login form without clicking the button.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `keyboard.press()`, `press('Tab')`, `press('Control+A')`, `press('Delete')`, `press('Enter')` |
| **Key Concept** | Keyboard-only navigation and input control |

---

### `8_DatePicker_Test.spec.ts` — Date Picker
> Demonstrates date picker interactions on OrangeHRM's Leave > Apply page.
> Covers hardcoded date input, selecting today's date, and navigating the
> calendar to pick past and future dates.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `fill()`, `click()`, `locator().filter()` |
| **Key Concept** | Hardcoded, dynamic, past, and future date selection |

---

### `9_Assertions_Test.spec.ts` — Assertions
> Demonstrates standard (hard) Playwright assertions using OrangeHRM's login
> page and dashboard. Covers element state, URL, page title, text content,
> and element count assertions.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `toBeVisible()`, `toBeEditable()`, `toBeEnabled()`, `toBeEmpty()`, `toHaveURL()`, `toHaveTitle()`, `toContainText()`, `toHaveCount()` |
| **Key Concept** | Hard assertions — test stops immediately on first failure |

---

### `10_SoftAssertions_Test.spec.ts` — Soft Assertions
> Demonstrates soft assertions using OrangeHRM. Unlike hard assertions, `expect.soft()`
> does not stop test execution on failure — all remaining steps run and all
> failures are reported together at the end of the test.

| Property | Details |
|---|---|
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Key APIs** | `expect.soft()`, `toHaveTitle()`, `toHaveURL()`, `toHaveCount()`, `toContainText()` |
| **Key Concept** | Soft assertions — test continues after failure |

---

## 🧪 Test Summary

| File | Target | Key Concept |
|---|---|---|
| `1_Screenshots_Test.spec.ts` | OrangeHRM | Element, page, full-page screenshots |
| `2_Locators_Test.spec.ts` | GitHub + OrangeHRM | All major locator strategies |
| `3_Hooks_Test.spec.ts` | OrangeHRM | beforeAll / beforeEach / afterEach / afterAll |
| `4_DropdownList_Test.spec.ts` | OrangeHRM | Custom dropdown selection and validation |
| `5_Iframes_DragDrop_Test.spec.ts` | jQuery UI | Iframe access and drag-and-drop |
| `6_MouseActions_Test.spec.ts` | OrangeHRM | Hover, left/middle/right click, double-click |
| `7_KeyboardActions_Test.spec.ts` | OrangeHRM | Tab, Enter, Ctrl+A, Delete |
| `8_DatePicker_Test.spec.ts` | OrangeHRM | Hardcoded, today, past, future dates |
| `9_Assertions_Test.spec.ts` | OrangeHRM | Hard assertions (state, URL, title, text, count) |
| `10_SoftAssertions_Test.spec.ts` | OrangeHRM | Soft assertions with `expect.soft()` |

---

## ⚙️ Prerequisites
- Node.js v18+
- Playwright installed

```bash
npm init playwright@latest
```

---

## 🚀 Running Tests

### Run all Essentials tests
```bash
npx playwright test tests/Essentials
```

### Run a specific file
```bash
npx playwright test tests/Essentials/1_Screenshots_Test.spec.ts
npx playwright test tests/Essentials/2_Locators_Test.spec.ts
npx playwright test tests/Essentials/3_Hooks_Test.spec.ts
npx playwright test tests/Essentials/4_DropdownList_Test.spec.ts
npx playwright test tests/Essentials/5_Iframes_DragDrop_Test.spec.ts
npx playwright test tests/Essentials/6_MouseActions_Test.spec.ts
npx playwright test tests/Essentials/7_KeyboardActions_Test.spec.ts
npx playwright test tests/Essentials/8_DatePicker_Test.spec.ts
npx playwright test tests/Essentials/9_Assertions_Test.spec.ts
npx playwright test tests/Essentials/10_SoftAssertions_Test.spec.ts
```

### Run in headed mode (see the browser)
```bash
npx playwright test tests/Essentials --headed
```

### Run in a specific browser
```bash
npx playwright test tests/Essentials --project=chromium
npx playwright test tests/Essentials --project=firefox
npx playwright test tests/Essentials --project=webkit
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
| `page.screenshot()` | Captures a screenshot of the page or a specific element |
| `frameLocator()` | Accesses elements inside an iframe |
| `dragTo()` | Drags an element and drops it onto another |
| `getByRole()` | Locates elements by ARIA role |
| `getByLabel()` | Locates elements by associated label |
| `getByAltText()` | Locates elements by alt text |
| `getByPlaceholder()` | Locates elements by placeholder text |
| `getByText()` | Locates elements by visible text content |
| `getByTestId()` | Locates elements by `data-testid` attribute |
| `locator()` | Locates elements by CSS selector or XPath |
| `test.beforeAll()` | Runs once before all tests in the file |
| `test.beforeEach()` | Runs before each individual test |
| `test.afterEach()` | Runs after each individual test |
| `test.afterAll()` | Runs once after all tests in the file |
| `selectOption()` | Selects an option in a native `<select>` element |
| `hover()` | Moves the mouse over an element |
| `click({ button })` | Clicks with left, middle, or right mouse button |
| `dblclick()` | Double-clicks an element |
| `keyboard.press()` | Presses a keyboard key or shortcut |
| `toBeVisible()` | Asserts element is visible |
| `toBeEditable()` | Asserts element is editable |
| `toBeEnabled()` | Asserts element is enabled |
| `toBeEmpty()` | Asserts element has no value |
| `toHaveURL()` | Asserts the current page URL |
| `toHaveTitle()` | Asserts the page title |
| `toContainText()` | Asserts element contains specific text |
| `toHaveCount()` | Asserts the number of matched elements |
| `expect.soft()` | Soft assertion — test continues on failure |

---

## 🌐 Applications Under Test

| App | URL |
|---|---|
| **OrangeHRM** | https://opensource-demo.orangehrmlive.com |
| **GitHub Profile** | https://github.com/Khadija-ASSOUANE/ |
| **jQuery UI** | https://jqueryui.com (iframes & drag-drop only) |

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
- [Playwright Screenshots](https://playwright.dev/docs/screenshots)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Frames](https://playwright.dev/docs/frames)
- [Playwright Actions](https://playwright.dev/docs/input)
