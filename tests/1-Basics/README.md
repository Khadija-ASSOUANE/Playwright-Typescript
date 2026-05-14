# Basics — Getting Started with Playwright & TypeScript

## 📌 About
This chapter introduces the foundational concepts of creating automated tests
using **Playwright with TypeScript**. It covers four different approaches to
writing tests, from manual coding to using Playwright's built-in recording
and code generation tools, all targeting **OrangeHRM** as the main application
under test.

---

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

---

## 📁 Files Structure

Basics/
├── 1_Record_Test.spec.ts
├── 2_First_Test.spec.ts
├── 3_RecordAtCursor_Test.spec.ts
├── 4_Codegen_Test.spec.ts
└── README.md

---

## 📄 Files Description

### `1_Record_Test.spec.ts` — Recorded Test
> Demonstrates Playwright's **Record** feature by automating an OrangeHRM
> login flow with invalid credentials and asserting the error message.
> Uses `test.step()` to organize actions into clearly named steps.

| Property | Details |
|---|---|
| **Method** | Playwright Record |
| **Target** | https://opensource-demo.orangehrmlive.com |
| **Assertion** | `Invalid credentials` error message visibility |
| **Key Concept** | `test.step()` for named steps |

---

### `2_First_Test.spec.ts` — First Manual Test
> The first manually written Playwright TypeScript test. Performs a Google
> search for OrangeHRM, navigates to the official website via search results,
> and validates the page title.

| Property | Details |
|---|---|
| **Method** | Manual |
| **Target** | https://www.google.com → OrangeHRM |
| **Assertion** | Page title `OrangeHRM` |
| **Key Concept** | `page.goto()`, `fill()`, `press()`, `expect()` |

---

### `3_RecordAtCursor_Test.spec.ts` — Record at Cursor Test
> Extends the basic Google search flow from `2_First_Test.spec.ts` by
> inserting additional recorded steps at a specific point in the test.
> Validates OrangeHRM login page elements visibility and text content.

| Property | Details |
|---|---|
| **Method** | Playwright Record at Cursor |
| **Target** | https://www.google.com → OrangeHRM |
| **Assertion** | Page title + Login heading + Username + Password fields |
| **Key Concept** | Inserting recorded actions into existing tests |

---

### `4_Codegen_Test.spec.ts` — Codegen Generated Test
> Auto-generated test using Playwright's Codegen tool. Navigates to OrangeHRM
> via Google search and validates all key login page elements. Represents
> the final and most complete test of this section.

| Property | Details |
|---|---|
| **Method** | `npx playwright codegen` |
| **Target** | https://www.google.com → OrangeHRM |
| **Assertion** | Page title + Login heading + Username + Password fields |
| **Key Concept** | Auto-generating tests from browser interactions |

---

## 🧪 Test Summary

| File | Method | Target | Assertions |
|---|---|---|---|
| `1_Record_Test.spec.ts` | Record | OrangeHRM direct URL | Invalid credentials error message |
| `2_First_Test.spec.ts` | Manual | Google → OrangeHRM | Page title |
| `3_RecordAtCursor_Test.spec.ts` | Record at Cursor | Google → OrangeHRM | Page title + 4 login page elements |
| `4_Codegen_Test.spec.ts` | Codegen | Google → OrangeHRM | Page title + 4 login page elements |

---

## ⚙️ Prerequisites
- Node.js v18+
- Playwright installed

```bash
npm init playwright@latest
```

---

## 🚀 Running Tests

### Run all Basics tests
```bash
npx playwright test tests/Basics
```

### Run a specific file
```bash
npx playwright test tests/Basics/1_Record_Test.spec.ts
npx playwright test tests/Basics/2_First_Test.spec.ts
npx playwright test tests/Basics/3_RecordAtCursor_Test.spec.ts
npx playwright test tests/Basics/4_Codegen_Test.spec.ts
```

### Run in headed mode (see the browser)
```bash
npx playwright test tests/Basics --headed
```

### Run in a specific browser
```bash
npx playwright test tests/Basics --project=chromium
npx playwright test tests/Basics --project=firefox
npx playwright test tests/Basics --project=webkit
```

---

## 📊 View Test Report
```bash
npx playwright show-report
```

---

## 🎥 Generate Tests with Codegen
```bash
npx playwright codegen https://www.google.com
npx playwright codegen https://opensource-demo.orangehrmlive.com
```

---

## 🔑 Key Concepts Covered

| Concept | Description |
|---|---|
| `test()` | Defines a test case |
| `test.step()` | Groups actions into named steps for better reporting |
| `page.goto()` | Navigates to a URL |
| `page.fill()` | Fills an input field |
| `page.press()` | Presses a keyboard key |
| `getByLabel()` | Locates elements by label |
| `getByRole()` | Locates elements by ARIA role |
| `getByText()` | Locates elements by text content |
| `getByPlaceholder()` | Locates elements by placeholder text |
| `expect()` | Asserts expected conditions |
| `toHaveTitle()` | Validates page title |
| `toBeVisible()` | Validates element visibility |
| `toContainText()` | Validates element text content |

---

## 🌐 Application Under Test
| App | URL |
|---|---|
| **OrangeHRM** | https://opensource-demo.orangehrmlive.com |
| **Google** | https://www.google.com |

---

## 👤 Author
**Khadija**

---

## 🔗 Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Codegen](https://playwright.dev/docs/codegen)
- [Playwright Test Steps](https://playwright.dev/docs/api/class-test#test-step)
- [Playwright Locators](https://playwright.dev/docs/locators)