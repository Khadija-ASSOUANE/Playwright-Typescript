/**
 * @file        3_Tags_Test.spec.ts
 * @chapter     Test Control & Organization - Test Tags
 * @description Demonstrates tagging tests with @SmokeTesting and @RegressionTesting
 *              targeting the OrangeHRM application.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Tag: @SmokeTesting — OrangeHRM login page sanity check
test('OrangeHRM Login Page Loads', { tag: ['@SmokeTesting'] }, async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Validate page title
    await expect(page).toHaveTitle('OrangeHRM');

    // Validate login button is present
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

// Tags: @SmokeTesting and @RegressionTesting — OrangeHRM successful login
test('OrangeHRM Successful Login', { tag: ['@SmokeTesting', '@RegressionTesting'] }, async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Enter valid credentials
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

// Tag: @RegressionTesting — OrangeHRM invalid login shows error
test('OrangeHRM Invalid Login Shows Error', { tag: ['@RegressionTesting'] }, async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Enter invalid credentials
    await page.getByPlaceholder('Username').fill('badUser');
    await page.getByPlaceholder('Password').fill('badPass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate error message is displayed
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});
