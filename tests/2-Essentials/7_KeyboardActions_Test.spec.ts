/**
 * @file        7_KeyboardActions_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates keyboard interactions in Playwright including
 *              Tab navigation, Enter to submit, and Ctrl+A / Delete to clear
 *              input fields on the OrangeHRM login page.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Keyboard actions in playwright', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Enter action - type wrong username first, then clear and retype
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('wrongUser');

    // Selecting all text and deleting using keyboard shortcut
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    // Fill the correct username and Tab to Password field
    await page.getByPlaceholder('Username').fill('Admin');
    await page.keyboard.press('Tab');

    // Fill password while focus is on Password field
    await page.getByPlaceholder('Password').fill('admin123');

    // Press Enter to submit the login form (equivalent to clicking Login)
    await page.keyboard.press('Enter');

    // Validate successful login
    await expect(page).toHaveURL(/dashboard/);
});
