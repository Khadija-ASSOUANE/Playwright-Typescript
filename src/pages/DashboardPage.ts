import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly quickLaunchItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.quickLaunchItems = page.locator('.orangehrm-quick-launch-card');
    }

    async validateDashboardLoaded() {
        await expect(this.page).toHaveURL(/dashboard/);
        await expect(this.dashboardHeading).toBeVisible();
    }

    async getQuickLaunchCount(): Promise<number> {
        await this.quickLaunchItems.first().waitFor();
        return this.quickLaunchItems.count();
    }
}
