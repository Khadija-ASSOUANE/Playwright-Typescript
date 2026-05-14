/**
 * @file        2_DataDrivenTestingUsingJSON.spec.ts
 * @chapter     POM and Data-Driven Testing - Data-Driven Testing Using JSON
 * @description Demonstrates data-driven testing by importing a JSON file and
 *              looping over credential datasets to run OrangeHRM login tests.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import rawData from '../../test-data/qa/testdata.json';

const testData = rawData.testData;

type CredentialDataSet = {
    username: string;
    password: string;
    expectSuccess: boolean;
};

for (const dataSetName in testData) {
    const dataset = testData[dataSetName as keyof typeof testData] as CredentialDataSet;

    test(`Data Driven Testing Using JSON file in Playwright : ${dataSetName}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log(`Dataset name : ${dataSetName}`);
        console.log(`Username     : ${dataset.username}`);
        console.log(`Password     : ${dataset.password}`);

        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill credentials from JSON dataset
        await page.getByPlaceholder('Username').fill(dataset.username);
        await page.getByPlaceholder('Password').fill(dataset.password);
        await page.getByRole('button', { name: 'Login' }).click();

        if (dataset.expectSuccess) {
            // Validate successful login
            await expect(page).toHaveURL(/dashboard/);
        } else {
            // Validate error message
            await expect(page.getByText('Invalid credentials')).toBeVisible();
        }
    });
}
