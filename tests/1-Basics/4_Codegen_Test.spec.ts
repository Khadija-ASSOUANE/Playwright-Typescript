/**
 * @file        4_Codegen_Test.spec.ts
 * @chapter     Basics - Getting Started with Playwright & TypeScript
 * @description Auto-generated test using Playwright's Codegen tool. Navigates to
 *              OrangeHRM via a Google search and validates all key login page
 *              elements. Represents the final and most complete test of this section.
 *
 * @target      https://www.google.com → https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     1.0.0
 */

import { test, expect } from '@playwright/test';

test('test1',{tag:['@PlaywrightWithJenkins']} ,async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1778113574381');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('orangehrmlive');
  await page.getByLabel('Search', { exact: true }).press('Enter');
   // Click on link
    await page.getByRole('link', { name: 'OrangeHRM' }).first().click();
  //await page.getByRole('link', { name: 'OrangeHRM OrangeHRM https://' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Username', { exact: true })).toBeVisible();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Login');
});

test('test2 should fail',{tag:['@PlaywrightWithJenkins']} ,async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1778113574381');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('orangehrmlive');
  await page.getByLabel('Search', { exact: true }).press('Enter');
   // Click on link
    await page.getByRole('link', { name: 'OrangeHRM' }).first().click();
  //await page.getByRole('link', { name: 'OrangeHRM OrangeHRM https://' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Username', { exact: true })).toBeVisible();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Dash');
});