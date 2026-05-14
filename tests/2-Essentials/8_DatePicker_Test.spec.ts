/**
 * @file        8_DatePicker_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates date picker interactions in Playwright using
          OrangeHRM's Leave module. Covers hardcoded date input,
          selecting today's date, and navigating to past/future months.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

/*
 * ── ORIGINAL CODE ──────────────────────────────────────────────────────────
 */ test('Selecting date value in playwright', async ({ page }) => {
     // Go to URL
      await page.goto('https://jqueryui.com/datepicker/');
 
      // Hardcoded date
    const iframe = page.frameLocator('[class="demo-frame"]');
    //await iframe.locator('[id="datepicker"]').fill('12/15/2027');
    
    // Selecting dynamic date
    //await iframe.locator('[id="datepicker"]').click();
    //await iframe.locator('.ui-datepicker-today').click();
    
    // Selecting past date
    // await iframe.locator('[id="datepicker"]').click();
    // await iframe.locator('[title="Prev"]').click();
    // await iframe.locator('text="15"').click();
    
    // Selecting future date
     await iframe.locator('[id="datepicker"]').click();
     await iframe.locator('[title="Next"]').click();
     await iframe.locator('text="15"').click();
 });
 /* ───────────────────────────────────────────────────────────────────────────
 */

/**
 * Khadija

test('Selecting date value in playwright', async ({ page }) => {
    // Login to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to Leave > Apply Leave
    await page.getByRole('link', { name: 'Leave' }).click();
    await page.getByText('Apply').click();

    // Hardcoded date - type directly into the date input field (format: YYYY-MM-DD)
    // await page.locator('.oxd-date-input input').first().fill('2025-12-15');

    // Selecting today's date using the calendar icon
    // await page.locator('.oxd-date-input .oxd-icon-button').first().click();
    // await page.locator('.oxd-calendar-date-current').click();

    // Selecting a past date - go to previous month, then pick day 15
    // await page.locator('.oxd-date-input .oxd-icon-button').first().click();
    // await page.locator('.oxd-calendar-selector-prev').click();
    // await page.locator('.oxd-calendar-date:not(.oxd-calendar-date--disabled)').filter({ hasText: '15' }).first().click();

    // Selecting a future date - go to next month, then pick day 15
    await page.locator('.oxd-date-input .oxd-icon-button').first().click();
    await page.locator('.oxd-calendar-selector-next').click();
    await page.locator('.oxd-calendar-date:not(.oxd-calendar-date--disabled)').filter({ hasText: '15' }).first().click();
}); */
