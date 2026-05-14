/**
 * @file        1_Record_Test.spec.ts
 * @chapter     Basics - Getting Started with Playwright & TypeScript
 * @description Demonstrates Playwright's record feature by automating a GitHub
 *              login flow with invalid credentials and asserting the error message.
 *
 * @tests
 *  - test → Validates GitHub login error message using named steps
 *
 * @steps
 *  1. Navigate to Orangehrmlive and click Sign in
 *  2. Enter invalid username and password
 *  3. Click the Sign in button
 *  4. Validate the error alert message
 *
 * @target      https://opensource-demo.orangehrmlive.com/
 * @author      Khadija
 * @version     1.0.0
 */

import { test, expect } from '@playwright/test';

/**
 * khadija
 */
test('test',  { tag: ['@PlaywrightWithAzureDevOpsPipeline','@PlaywrightWithGitHubActions'] },  async ({ page }) => {

  console.log('Test execution started...');
  await test.step('Navigating to URL', async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    //await page.getByRole('link', { name: 'Sign in' }).click();
  });

    await test.step('Enter username & password', async () => {
    await page.getByPlaceholder('Username').fill('invalidUser');
    await page.getByPlaceholder('Password').fill('invalidPass');
  });

  await test.step('Click on Login', async () => {
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Validate error message', async () => {
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
