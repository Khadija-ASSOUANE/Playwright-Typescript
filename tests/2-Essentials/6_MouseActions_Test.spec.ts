/**
 * @file        6_MouseActions_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates mouse interactions in Playwright including left click,
 *              middle click, right click, hover, and double-click using OrangeHRM
 *              login and dashboard pages.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Mouse actions in playwright', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Hover - hover over the Username field to trigger focus styles
    await page.getByPlaceholder('Username').hover();

    // Left click - fill credentials and click Login button
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click({ button: 'left' });

    // Middle click - open a navigation link in a new tab
    await page.getByRole('link', { name: 'Admin' }).click({ button: 'middle' });

    // Right click - trigger browser context menu on the top navigation bar
    await page.locator('.oxd-topbar-header-breadcrumb').click({ button: 'right' });

    // Double click - on a dashboard widget title (for apps supporting dblclick actions)
    await page.locator('.oxd-grid-item').first().dblclick();
});
