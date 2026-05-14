/**
 * @file        2_ReRunFailed_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Re-Run Failed Tests
 * @description Demonstrates re-run mechanics using OrangeHRM: one passing test
 *              and two intentionally failing tests to exercise the --last-failed flag.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

// Passing test — OrangeHRM login page title
test('Test 1 - OrangeHRM login page title is correct', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Validate title — this test PASSES
    await expect(page).toHaveTitle('OrangeHRMM');
});

// Intentionally failing test — used to demonstrate --last-failed re-run
test('Test 2 - Intentionally failing (for re-run demo)', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wrong assertion — this test FAILS intentionally
    expect(true).toBe(false);
});

// Intentionally failing test — second failing test for re-run demo
test('Test 3 - Intentionally failing (for re-run demo)', async ({ page }) => {
    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wrong assertion — this test FAILS intentionally
    expect(true).toBe(false);
});
