/**
 * @file        10_SoftAssertions_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates soft assertions in Playwright using OrangeHRM.
 *              Unlike hard assertions, expect.soft() does not stop test
 *              execution on failure — remaining steps continue to run and
 *              all failures are reported together at the end.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Soft Assertions in playwright', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Hard assertions - stop the test immediately on failure
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeEditable();
    await expect(page.getByPlaceholder('Username')).toBeEnabled();
    await expect(page.getByPlaceholder('Username')).toBeEmpty();

    // Login to OrangeHRM
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Soft assertion - intentionally wrong title to demonstrate that the test
    // continues executing even when this assertion fails
    await expect.soft(page).toHaveTitle('OrangeHRM Super Admin Dashboard');

    // Hard assertions continue running after the soft assertion failure above
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('.oxd-main-menu-item')).toHaveCount(12);
    await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText('Dashboard');
});
