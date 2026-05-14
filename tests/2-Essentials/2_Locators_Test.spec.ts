/**
 * @file        2_Locators_Test.spec.ts
 * @chapter     Chapter 2 - Core Playwright Techniques
 * @description Demonstrates all major Playwright locator strategies using
 *              GitHub profile and OrangeHRM login page as targets.
 *
 * @target      https://github.com/Khadija-ASSOUANE/ | https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Locators in Playwright', async ({ page }) => {
    // Go to Khadija's GitHub profile page
    await page.goto('https://github.com/Khadija-ASSOUANE/');

    // GetByRole - click the Sign in link
    //await page.getByRole('link', { name: 'Sign in' }).click();

    // GetByLabel - click the GitHub homepage logo
    //await page.getByLabel('Homepage', { exact: true }).first().click();

    // GetByAltText - locate avatar image on GitHub profile
     //await page.getByAltText("View Khadija-ASSOUANE's full-sized avatar").click();

    // GetByText - locate element by visible text content
      await page.getByText('Sign up').click();

    // GetByTestId - locate element by data-testid attribute
      //await page.getByTestId('header-search-button').click();

    // GetByPlaceholder & CSS Selectors - OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // GetByPlaceholder
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    // CSS Selector
    await page.locator('button[type="submit"]').click();

    // XPath - wait for the dashboard heading to confirm successful login
    await page.locator('//h6[contains(@class,"oxd-text")]').first().waitFor();

    // GetByRole - navigate using the sidebar
    await page.getByRole('link', { name: 'Dashboard' }).click();
});
