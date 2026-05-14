/**
 * @file        1_BrowserContext_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Browser Contexts and New Tabs
 * @description Demonstrates multiple browser contexts and new tabs. Context 1
 *              logs into OrangeHRM; Context 2 opens the GitHub profile page in
 *              a new context and then opens a new tab within that context.
 *
 * @target      https://opensource-demo.orangehrmlive.com + https://github.com/Khadija-ASSOUANE/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


test('Multiple browser contexts and tabs in Playwright TypeScript', async ({ page, browser }) => {

    // ── Context 1 (default): OrangeHRM login ──────────────────────────────
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login with valid credentials
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate dashboard loaded in context 1
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    console.log('Context 1 — OrangeHRM dashboard loaded');

    // ── Context 2: GitHub profile page ────────────────────────────────────
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    // Navigate to Khadija's GitHub profile
    await page2.goto('https://github.com/Khadija-ASSOUANE/');

    // Validate GitHub profile loaded in context 2
    await expect(page2).toHaveURL('https://github.com/Khadija-ASSOUANE/');
    await expect(page2.locator('[itemprop="additionalName"]')).toBeVisible();
    console.log('Context 2 — GitHub profile loaded');

    // ── New tab inside Context 2 ───────────────────────────────────────────
    const newTab = await context2.newPage();
    await newTab.goto('https://github.com/Khadija-ASSOUANE?tab=repositories');

    // Validate repositories tab loaded in the new tab
    await expect(newTab).toHaveURL(/tab=repositories/);
    console.log('Context 2 new tab — GitHub repositories tab loaded');

    // Cleanup
    await context2.close();
});
