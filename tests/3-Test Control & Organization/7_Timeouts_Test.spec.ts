/**
 * @file        7_Timeouts_Test.spec.ts
 * @chapter     Test Control & Organization - Timeouts
 * @description Demonstrates test.setTimeout, per-action timeout, and per-expect
 *              timeout on the OrangeHRM login and dashboard pages.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


// Timeout demonstration — OrangeHRM login with custom test, action, and expect timeouts
test('Timeouts in Playwright', async ({ page }) => {
    // Override the default test timeout to 60 seconds for this test
    test.setTimeout(1 * 60 * 1000);

    // Navigate to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Fill username — using default action timeout
    await page.getByPlaceholder('Username').fill('Admin');

    // Fill password — using default action timeout
    await page.getByPlaceholder('Password').fill('admin123');

    // Click Login button with a specific per-action timeout of 5 seconds
    await page.getByRole('button', { name: 'Login' }).click({ timeout: 5000 });

    // Validate dashboard heading with a specific per-expect timeout of 5 seconds
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });

    // Validate URL with a specific per-expect timeout of 5 seconds
    await expect(page).toHaveURL(/dashboard/, { timeout: 5000 });

    // Uncomment to simulate a long-running test (demonstrates test.setTimeout usage)
     //await page.waitForTimeout(60000);
});
