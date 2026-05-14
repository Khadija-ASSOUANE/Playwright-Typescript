/**
 * @file        4_DropdownList_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates handling custom Vue-based dropdowns in Playwright
 *              using OrangeHRM's My Info page. Covers selecting options by
 *              visible text and validating selected values.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Handling Dropdown list in playwright', async ({ page }) => {
    // Login to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to My Info > Personal Details
    await page.getByRole('link', { name: 'My Info' }).click();

    // Select dropdown using visible text - Nationality
    // OrangeHRM uses custom Vue dropdowns: click to open, then click the option
    await page.locator('.oxd-select-wrapper').first().click();
    await page.getByRole('option', { name: 'Afghan' }).click();

    // Select dropdown using visible text - Marital Status
    await page.locator('.oxd-select-wrapper').nth(1).click();
    await page.getByRole('option', { name: 'Single' }).click();

    // Validate selected values
    await expect(page.locator('.oxd-select-wrapper').first()).toContainText('Afghan');
    await expect(page.locator('.oxd-select-wrapper').nth(1)).toContainText('Single');

    // Validate all available Marital Status options
    await page.locator('.oxd-select-wrapper').nth(1).click();
    await expect(page.locator('.oxd-select-option')).toHaveText(['-- Select --', 'Single', 'Married', 'Other']);
});
