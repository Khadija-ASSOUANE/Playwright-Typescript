/**
 * @file        1_Annotations_Test.spec.ts
 * @chapter     Test Control & Organization - Test Annotations
 * @description Demonstrates test, test.skip, and test.only annotations
 *              targeting the OrangeHRM login page.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Test 1 — runs normally: validates OrangeHRM login page title
test('Test 1 - OrangeHRM login page is reachable', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Validate page title
    await expect(page).toHaveTitle('OrangeHRM');

    // Validate login form is visible
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
     console.log('console log : test1')
});

// Test 2 — skipped: login with invalid credentials (skipped intentionally)
test.skip('Test 2 - Login with invalid credentials (skipped)', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Enter wrong credentials
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
     console.log('console log : test2')
});

// Test 3 — only: login with valid credentials and validate dashboard
test.only('Test 3 - Login with valid credentials (only)', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
     
    // Enter valid credentials
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate dashboard loaded
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    console.log('console log : test3')
});
