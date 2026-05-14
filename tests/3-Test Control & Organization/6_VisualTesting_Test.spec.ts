/**
 * @file        6_VisualTesting_Test.spec.ts
 * @chapter     Test Control & Organization - Visual Testing
 * @description Demonstrates visual comparison using toHaveScreenshot() on the
 *              GitHub login page (stable public page ideal for visual baselines).
 *
 * @target      https://github.com/login
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


// Full-page visual comparison — GitHub login page baseline screenshot
test('Visual Comparison in Playwright', async ({ page }) => {
    // Navigate to GitHub login page
    await page.goto('https://github.com/login');

    // Compare full page screenshot against stored baseline
    await expect(page).toHaveScreenshot('GitHubLoginPage.png');

    // Fill username field (visual change — screenshot would differ if re-compared)
    await page.locator('#login_field').fill('Khadija-ASSOUANE');

    // Uncomment below to compare after filling (will detect visual diff)
    // await expect(page).toHaveScreenshot('GitHubLoginPage.png');
});

// Element-level visual comparison — GitHub login form component
test('Element Visual Comparison in Playwright', async ({ page }) => {
    // Navigate to GitHub login page
    await page.goto('https://github.com/login');

    // Full page screenshot comparison
    await expect(page).toHaveScreenshot('GitHubLoginPage.png');

    // Compare only the login form element
    const element = page.locator('form[action="/session"]').first();
    await expect(element).toHaveScreenshot('GitHubLoginForm.png');

    // Fill username field (visual change after this point)
    await page.locator('#login_field').fill('Khadija-ASSOUANE');

    // Uncomment below to detect visual diff after fill
    //await expect(element).toHaveScreenshot('GitHubLoginForm.png');
});
