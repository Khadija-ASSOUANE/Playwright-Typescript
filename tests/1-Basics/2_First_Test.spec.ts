/**
 * @file        2_First_Test.spec.ts
 * @chapter     Basics - Getting Started with Playwright & TypeScript
 * @description Demonstrates the first manually written Playwright TypeScript test.
 *              Performs a Google search for OrangeHRM, navigates to the official
 *              website via search results, and validates the page title.
 *
 * @tests
 *  - My First Playwright TypeScript Test → Searches Google for OrangeHRM,
 *                                          clicks the first result and validates
 *                                          the page title
 *
 * @steps
 *  1. Navigate to Google
 *  2. Search for 'orangehrmlive'
 *  3. Click on the OrangeHRM link from search results
 *  4. Validate the page title is 'OrangeHRM'
 *
 * @target      https://www.google.com | https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     1.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * khadija
 */
test('My First Playwright TypeScript Test', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.google.com/');
    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill('orangehrmlive');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on link
    await page.getByRole('link', { name: 'OrangeHRM' }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle('OrangeHRM');

});
