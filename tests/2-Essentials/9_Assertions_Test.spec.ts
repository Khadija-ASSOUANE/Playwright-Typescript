/**
 * @file        9_Assertions_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates standard (hard) Playwright assertions using OrangeHRM.
 *              Covers toBeVisible, toBeEditable, toBeEnabled, toBeEmpty,
 *              toHaveURL, toHaveTitle, toContainText, and toHaveCount.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Assertions in playwright', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // visible, editable, enabled, empty - Username field on login page
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeEditable();
    await expect(page.getByPlaceholder('Username')).toBeEnabled();
    await expect(page.getByPlaceholder('Username')).toBeEmpty();

    // Verify page title
    await expect(page).toHaveTitle('OrangeHRM');

    // Verify URL
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Verify login heading text
    await expect(page.getByRole('heading')).toContainText('Login');

    // Login and verify dashboard state
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify dashboard URL after login
    await expect(page).toHaveURL(/dashboard/);

    // Verify the number of main navigation menu items
    await expect(page.locator('.oxd-main-menu-item')).toHaveCount(12);

    // Verify Dashboard heading text content
    await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText('Dashboard');

    // Disabled assertion example (commented out - Login button is enabled by default)
    // await expect(page.getByRole('button', { name: 'Login' })).toBeDisabled();
});
