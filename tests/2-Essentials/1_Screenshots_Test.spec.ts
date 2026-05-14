/**
 * @file        1_Screenshots_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates capturing screenshots in Playwright:
 *              element-level, page-level, and full-page screenshots
 *              targeting the OrangeHRM login page.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


test('Capture screenshots in playwright', async ({ page }) => {
    // Go to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Element screenshot - capture only the login form panel
    await page.locator('.orangehrm-login-form').screenshot({ path: './screenshots/ElementScreenshot.png' });

    // Page screenshot - capture the visible viewport
    await page.screenshot({ path: './screenshots/PageScreenshot.png' });

    // Full page screenshot - capture the entire scrollable page
    await page.screenshot({ path: './screenshots/FullPageScreenshot.png', fullPage: true });
});
