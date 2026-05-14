/**
 * @file        2_Grouping_Test.spec.ts
 * @chapter     Test Control & Organization - Test Grouping
 * @description Demonstrates test.describe groups (SmokeTesting, RegressionTesting)
 *              targeting the OrangeHRM login and dashboard pages.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Smoke Testing group — quick sanity checks
test.describe('SmokeTesting', () => {

    // Verify the login page loads correctly
    test('Test 1 - Login page loads', async ({ page }) => {
        // Navigate to OrangeHRM login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Validate page title and key elements
        await expect(page).toHaveTitle('OrangeHRM');
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
});

// Regression Testing group — broader functional coverage
test.describe('RegressionTesting', () => {

    // Verify successful login leads to dashboard
    test('Test 2 - Successful login redirects to dashboard', async ({ page }) => {
        // Navigate to OrangeHRM login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login with valid credentials
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate dashboard URL
        await expect(page).toHaveURL(/dashboard/);
    });

    // Verify failed login shows error
    test('Test 3 - Failed login shows error message', async ({ page }) => {
        // Navigate to OrangeHRM login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login with invalid credentials
        await page.getByPlaceholder('Username').fill('invalid_user');
        await page.getByPlaceholder('Password').fill('invalid_pass');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate error message
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });
});
