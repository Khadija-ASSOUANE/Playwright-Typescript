/**
 * @file        4_TestReports_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Test Reports
 * @description Demonstrates test grouping for report generation. SmokeTesting
 *              group passes; RegressionTesting group has one intentionally
 *              failing test to illustrate failure reporting on OrangeHRM.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// SmokeTesting — quick sanity checks, all passing
test.describe('SmokeTesting', () => {

    test('Test 1 - OrangeHRM login page loads', async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Validate page title
        await expect(page).toHaveTitle('OrangeHRM');

        // Validate key elements are visible
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
    });
});

// RegressionTesting — broader tests, last one intentionally fails for report demo
test.describe('RegressionTesting', () => {

    test('Test 2 - Successful login reaches dashboard', async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate dashboard URL
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Test 3 - Invalid login shows error', async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login with invalid credentials
        await page.getByPlaceholder('Username').fill('wrongUser');
        await page.getByPlaceholder('Password').fill('wrongPass');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate error is shown
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

    // Intentionally failing test — demonstrates failure in the report
    test('Test 4 - Wrong title assertion (intentionally failing for report demo)', async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Wrong title — this test FAILS intentionally to illustrate report failure
        await expect(page).toHaveTitle('OrangeHRM Admin Portal - This Title Does Not Exist');
    });
});
