/**
 * @file        5_Parameterize_Test.spec.ts
 * @chapter     Test Control & Organization - Parameterized Tests
 * @description Demonstrates parameterized tests using a for-loop over an array
 *              of credential datasets targeting OrangeHRM login.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


// Dataset — array of login scenarios for OrangeHRM
const loginScenarios = [
    { description: 'Admin user',   username: 'Admin', password: 'admin123', expectSuccess: true  },
    { description: 'Wrong pass',   username: 'Admin', password: 'wrongpass', expectSuccess: false },
    { description: 'Wrong user',   username: 'nobody', password: 'admin123', expectSuccess: false },
];

for (const scenario of loginScenarios) {

    test(`OrangeHRM Parameterized Login - ${scenario.description}`, async ({ page }) => {
        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill credentials
        await page.getByPlaceholder('Username').fill(scenario.username);
        await page.getByPlaceholder('Password').fill(scenario.password);
        await page.getByRole('button', { name: 'Login' }).click();

        if (scenario.expectSuccess) {
            // Validate successful login — redirected to dashboard
            await expect(page).toHaveURL(/dashboard/);
            await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
            console.log(`[PASS] ${scenario.description} logged in successfully`);
        } else {
            // Validate failed login — error message shown
            await expect(page.getByText('Invalid credentials')).toBeVisible();
            console.log(`[PASS] ${scenario.description} correctly rejected`);
        }
    });
}
