/**
 * @file        8_RunTestBasedOnEnv.spec.ts
 * @chapter     POM and Data-Driven Testing - Run Tests Based on Environment
 * @description Demonstrates running different OrangeHRM test logic based on the
 *              ENV environment variable (qa vs staging). Original TestFixture
 *              and POM imports are commented; new code uses direct Playwright.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Read the ENV variable — set via: ENV=qa npx playwright test  OR  ENV=staging npx playwright test
const env = process.env.ENV ?? 'qa';
console.log(`Running tests for environment: ${env}`);

// URL map — qa uses the public demo; staging would use a staging URL
const urls: Record<string, string> = {
    qa:      'https://opensource-demo.orangehrmlive.com',
    staging: 'https://opensource-demo.orangehrmlive.com', // replace with real staging URL
};

const baseUrl = urls[env] ?? urls['qa'];

test('Run Test Based on Environment in Playwright', async ({ page }) => {

    // Navigate using the environment-specific URL
    await page.goto(`${baseUrl}/web/index.php/auth/login`);

    if (env === 'qa') {
        console.log('QA environment — logging in with Admin credentials');

        // QA-specific credentials
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate QA dashboard
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
        console.log('QA: Dashboard loaded successfully');

    } else if (env === 'staging') {
        console.log('Staging environment — running staging-specific checks');

        // Staging-specific logic (adapt credentials and assertions as needed)
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Validate staging dashboard
        await expect(page).toHaveURL(/dashboard/);
        console.log('Staging: Dashboard loaded successfully');

    } else {
        throw new Error(`Unknown ENV value: ${env}. Use ENV=qa or ENV=staging`);
    }
});
