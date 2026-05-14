/**
 * @file        11_Mock_From_HAR_File.spec.ts
 * @chapter     API Testing and Mocking - Mock from HAR File
 * @description Demonstrates mocking API responses from a pre-recorded HAR file
 *              using routeFromHAR(). The HAR file contains recorded API calls
 *              from the Playwright demo mocking page.
 *
 * @target      https://demo.playwright.dev/api-mocking/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Mock API from HAR file in Playwright', async ({ page }) => {

    // Route API calls through the pre-recorded HAR file
    // Set update: true once to record/update the HAR, then set to false to replay
    await page.routeFromHAR('./har/fruits.har', {
        url: '*/**/api/v1/fruits',
        update: false,
    });

    // Navigate to the Playwright demo API mocking page
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validate real fruits from the recorded HAR response are visible
   // await expect(page.getByText('API Testing by Khadija')).toBeVisible();
    await expect(page.getByText('API Testing by Khadija')).toBeVisible();
    await expect(page.getByText('OrangeHRM Automation by Khadija')).toBeVisible();
});
