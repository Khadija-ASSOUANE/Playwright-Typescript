/**
 * @file        10_Mock_API_Response.spec.ts
 * @chapter     API Testing and Mocking - Mock API Response
 * @description Demonstrates fetching a real API response and appending mock
 *              data to it before fulfilling. Uses the Playwright demo API
 *              mocking page with Khadija-branded mock entries appended.
 *
 * @target      https://demo.playwright.dev/api-mocking/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


test('Mock API response in Playwright', async ({ page }) => {

    // Mock API response — fetch real response then append mock data
    await page.route('*/**/api/v1/fruits', async route => {
        // Fetch the real API response
        const response = await route.fetch();
        const json = await response.json();

        // Append Khadija-branded mock entries to the real data
        json.push({ name: 'Khadija', id: 12 });
        json.push({ name: 'XYZ', id: 13 });
        json.push({ name: 'API Testing by Khadija', id: 14 });
        json.push({ name: 'OrangeHRM Automation by Khadija', id: 15 });

        // Fulfill with the modified response
        await route.fulfill({ response, json });
    });

    // Navigate to the Playwright demo API mocking page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validate that the appended mock data is visible alongside real data
    await expect(page.getByText('Khadija', { exact: true })).toBeVisible();
    await expect(page.getByText('XYZ')).toBeVisible();
    await expect(page.getByText('API Testing by Khadija')).toBeVisible();
    await expect(page.getByText('OrangeHRM Automation by Khadija')).toBeVisible();
});
