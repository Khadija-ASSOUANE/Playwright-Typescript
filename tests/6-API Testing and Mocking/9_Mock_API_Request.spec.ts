/**
 * @file        9_Mock_API_Request.spec.ts
 * @chapter     API Testing and Mocking - Mock API Request
 * @description Demonstrates mocking an API request entirely — intercepts the
 *              fruit list API call on the Playwright demo page and replaces the
 *              response with custom mock data referencing Khadija's projects.
 *
 * @target      https://demo.playwright.dev/api-mocking/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Mock API request in Playwright', async ({ page }) => {

    // Mock API request — intercept and replace the fruit list API entirely
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: 'Khadija', id: 12 },
            { name: 'XYZ', id: 13 },
            { name: 'API Testing by Khadija', id: 14 },
            { name: 'OrangeHRM Automation by Khadija', id: 15 },
        ];
        await route.fulfill({ json });
    });

    // Navigate to the Playwright demo API mocking page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validate that the mocked data is displayed on the page
    await expect(page.getByText('Khadija', { exact: true })).toBeVisible();
    await expect(page.getByText('XYZ')).toBeVisible();
    await expect(page.getByText('API Testing by Khadija')).toBeVisible();
    await expect(page.getByText('OrangeHRM Automation by Khadija')).toBeVisible();
});
