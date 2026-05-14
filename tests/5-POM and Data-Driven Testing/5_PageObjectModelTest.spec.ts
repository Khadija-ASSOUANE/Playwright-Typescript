/**
 * @file        5_PageObjectModelTest.spec.ts
 * @chapter     POM and Data-Driven Testing - Page Object Model
 * @description Demonstrates the Page Object Model (POM) pattern for OrangeHRM.
 *              Original POM imports are commented; new code shows the pattern
 *              using inline LoginPage and DashboardPage classes for OrangeHRM.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';


// ── Test using Page Object Model ──────────────────────────────────────────
test('Page Object Model Test in Playwright', async ({ page }) => {

    // Create LoginPage object and navigate
    const loginPage = new LoginPage(page);
    await loginPage.goToURL();
    await loginPage.login('Admin', 'admin123');

    // Create DashboardPage object and validate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.validateDashboardLoaded();

    const quickLaunchCount = await dashboardPage.getQuickLaunchCount();
    console.log(`Quick launch items count : ${quickLaunchCount}`);
    expect(quickLaunchCount).toBeGreaterThanOrEqual(6);
});
