/**
 * @file        6_Fixture_Test.spec.ts
 * @chapter     POM and Data-Driven Testing - Fixtures
 * @description Demonstrates the Playwright fixture pattern for OrangeHRM.
 *              Original TestFixture and POM imports are commented; new code
 *              shows an inline fixture that provides a pre-logged-in page.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import the extended test from TestFixture as `base` so we can chain further
import { test as base, expect } from '../../src/fixture/TestFixture';
import type { Page } from '@playwright/test';

// ── Extend the TestFixture base further with a page-specific fixture ────────
// base already provides `loggedInPage` (authenticated OrangeHRM session).
// base.extend adds `myInfoPage` on top — navigates to My Info using that session.
const test = base.extend<{ myInfoPage: Page }>({
    myInfoPage: async ({ loggedInPage }, use) => {
        // goto() already waits for load — no need for waitForURL here
        await loggedInPage.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewMyDetails'
        );

        // Provide the already-navigated page to the test
        await use(loggedInPage);
    },
});

// ── Test using both chained fixtures ──────────────────────────────────────
test('Implementing fixture in Playwright', async ({ loggedInPage, myInfoPage }) => {

    console.log('Test execution started...');

    // loggedInPage: authenticated session — validate dashboard heading
    await expect(loggedInPage.getByRole('heading', { name: 'PIM' })).toBeVisible();
    console.log('Dashboard heading visible');

    // myInfoPage: already navigated to My Info via base.extend — validate URL
    await expect(myInfoPage).toHaveURL(/viewPersonalDetails/);
    console.log('My Info page loaded via chained fixture');
    console.log('Test execution ended...');
});
