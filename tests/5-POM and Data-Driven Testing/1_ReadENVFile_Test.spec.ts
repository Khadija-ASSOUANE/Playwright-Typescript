/**
 * @file        1_ReadENVFile_Test.spec.ts
 * @chapter     POM and Data-Driven Testing - Read ENV File
 * @description Demonstrates reading environment variables (ORANGEHRM_URL,
 *              ADMIN_USERNAME, ADMIN_PASSWORD) and using them to drive an
 *              OrangeHRM login test.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Read ENV file config in Playwright', async ({ page }) => {
    // Read URL from environment variable (fallback to default)
    const orangehrmUrl = process.env.ORANGEHRM_URL ?? 'https://opensource-demo.orangehrmlive.com';
    const username     = process.env.ADMIN_USERNAME  ?? 'Admin';
    const password     = process.env.ADMIN_PASSWORD  ?? 'admin123';

    console.log(`ORANGEHRM_URL     : ${orangehrmUrl}`);
    console.log(`ADMIN_USERNAME    : ${username}`);
    console.log(`ADMIN_PASSWORD    : ${password}`);

    // Navigate to OrangeHRM using the URL from the ENV file
    await page.goto(`${orangehrmUrl}/web/index.php/auth/login`);

    // Fill credentials from ENV variables
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate dashboard loaded
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
