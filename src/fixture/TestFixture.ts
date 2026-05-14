import { test as base, type Page } from '@playwright/test';
import { LoggedInPage } from '../pages/LoggedInPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * khadija
 */
export const test = base.extend<{
    saveLogs: void;
    loggedInPage: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],// it runs for every test regardless of whether it's requested or not.

    loggedInPage: async ({ page }, use) => {
        const loggedInPage = new LoggedInPage(page);
        await loggedInPage.login('Admin', 'admin123');
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
});

export { expect } from '@playwright/test';