/**
 * @file        3_RecordAtCursor_Test.spec.ts
 * @chapter     Basics - Getting Started with Playwright & TypeScript
 * @description Demonstrates Playwright's 'Record at Cursor' feature by extending
 *              the basic Google search flow from 2_First_Test.spec.ts with
 *              additional assertions on the OrangeHRM login page elements.
 *              Validates the visibility of the Login heading, Username and
 *              Password fields after navigating from Google search results.
 *
 * @tests
 *  - Record at cursor test → Searches Google for OrangeHRM, navigates to the
 *                            login page and validates the presence of key
 *                            login page elements
 *
 * @steps
 *  1. Navigate to Google
 *  2. Search for 'orangehrmlive'
 *  3. Click on the OrangeHRM link from search results
 *  4. Validate the page title is 'OrangeHRM'
 *  5. Validate the Login heading is visible
 *  6. Validate the Username field is visible
 *  7. Validate the Password field is visible
 *  8. Validate the Login heading text content
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
test('Record at cursor test', async ({ page }) => {
    
       // Go to URL
    await page.goto('https://www.google.com/');
    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill('orangehrmlive');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on link
    await page.getByRole('link', { name: 'OrangeHRM' }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle('OrangeHRM');  
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByText('Username', { exact: true })).toBeVisible();
    await expect(page.getByText('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Login');
    //code below generated with Record at Cursor extension
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  });
  