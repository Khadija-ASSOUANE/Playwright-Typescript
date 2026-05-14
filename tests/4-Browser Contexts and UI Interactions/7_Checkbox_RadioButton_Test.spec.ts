/**
 * @file        7_Checkbox_RadioButton_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Checkbox and Radio Button
 * @description Demonstrates checkbox interactions on the OrangeHRM Admin >
 *              User Management table — checking, unchecking, and validating
 *              row-level checkboxes.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


test('Working with checkboxes in OrangeHRM Admin User Management', async ({ page }) => {
    // Navigate to OrangeHRM login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login with valid credentials
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Admin > User Management
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

    // Wait for the table to load
    await page.waitForSelector('.oxd-table-body', { state: 'visible' });

    // Locate the first row checkbox
    const firstRowCheckbox = page.locator('.oxd-table-body .oxd-checkbox-input').first();

    // Validate the checkbox is initially unchecked
    await expect(firstRowCheckbox).not.toBeChecked();
    console.log('First row checkbox is initially unchecked');

    // Check the first row checkbox
    await firstRowCheckbox.check();

    // Validate the checkbox is now checked
    await expect(firstRowCheckbox).toBeChecked();
    console.log('First row checkbox is now checked');

    // Uncheck the checkbox
    await firstRowCheckbox.uncheck();

    // Validate the checkbox is unchecked again
    await expect(firstRowCheckbox).not.toBeChecked();
    console.log('First row checkbox is unchecked again');

    // Check the header/select-all checkbox
    const selectAllCheckbox = page.locator('.oxd-table-header .oxd-checkbox-input').first();
    await selectAllCheckbox.check();
    await expect(selectAllCheckbox).toBeChecked();
    console.log('Select-all checkbox checked');

    // Uncheck select-all
    await selectAllCheckbox.uncheck();
    await expect(selectAllCheckbox).not.toBeChecked();
    console.log('Select-all checkbox unchecked');
});
