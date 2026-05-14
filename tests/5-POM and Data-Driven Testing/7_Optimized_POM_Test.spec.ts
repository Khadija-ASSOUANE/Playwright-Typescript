/**
 * @file        7_Optimized_POM_Test.spec.ts
 * @chapter     POM and Data-Driven Testing - Optimized Page Object Model with Fixtures
 * @description Optimized version of 5_PageObjectModelTest.spec.ts.
 *              loginPage and dashboardPage are injected via TestFixture —
 *              the test body is identical to the original.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

import { test, expect } from '../../src/fixture/TestFixture';

test('Page Object Model Test in Playwright', async ({ loginPage, dashboardPage }) => {

    await loginPage.goToURL();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.validateDashboardLoaded();

    const quickLaunchCount = await dashboardPage.getQuickLaunchCount();
    console.log(`Quick launch items count : ${quickLaunchCount}`);
    expect(quickLaunchCount).toBeGreaterThanOrEqual(6);
});
