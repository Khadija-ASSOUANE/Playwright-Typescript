/**
 * @file        4_Retry_Test.spec.ts
 * @chapter     Test Control & Organization - Test Retry
 * @description Demonstrates test retry behavior with a passing test and an
 *              intentionally failing test on OrangeHRM.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Passing test — OrangeHRM login page title validation
test('OrangeHRM Login Page Title Is Correct', { tag: ['@SmokeTesting'] }, async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Validate correct page title — this test will PASS
        await expect(page).toHaveTitle('OrangeHRM');
});

// Intentionally failing test — used to demonstrate retry mechanism
// Configure retries in playwright.config.ts: retries: 2
test.describe('OrangeHRM Login Page Title Is Correct', () => {                   
   test.describe.configure({ retries: 2 });
   test('OrangeHRM Dashboard Heading Is Wrong (intentionally failing)', async ({ page }) => {
        // Navigate to OrangeHRM and login
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Intentionally wrong assertion — this test will FAIL and be retried
        await expect(page).toHaveTitle('Wrong Title That Does Not Exist');
  });
});
