/**
 * @file        3_Hooks_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates Playwright lifecycle hooks (beforeAll, beforeEach,
 *              afterEach, afterAll) with OrangeHRM login page as shared setup.
 *              Each test navigates to the login page before running.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


test.beforeAll(async () => {
    console.log('Running before all tests...');
});

test.beforeEach(async ({ page }) => {
    console.log('Running before each test...');
    // Navigate to OrangeHRM login page before each test
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test.afterEach(async () => {
    console.log('Running after each test...');
});

test.afterAll(async () => {
    console.log('Running after all tests...');
});

/**
 * Khadija
 */
test('Login with valid credentials', async ({ page }) => {
    console.log('Test 1 execution started...');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard/);
});

/**
 * Khadija
 */
test('Login with invalid credentials', async ({ page }) => {
    console.log('Test 2 execution started...');
    await page.getByPlaceholder('Username').fill('invalidUser');
    await page.getByPlaceholder('Password').fill('wrongPass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});
