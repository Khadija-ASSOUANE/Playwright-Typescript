/**
 * @file        4_DataDrivenTestingUsingEXCEL.spec.ts
 * @chapter     POM and Data-Driven Testing - Data-Driven Testing Using Excel
 * @description Demonstrates data-driven testing by reading an Excel file via
 *              ExcelJS and looping over credential rows to run OrangeHRM login
 *              tests. The ExcelHelper import is commented; ExcelJS is used directly.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import path from 'path';

// NOTE: In a full implementation, import readExcelFile from '../../src/utils/ExcelHelper'
// and pass path.join(__dirname, '../../test-data/qa/OrangeHRM_Credentials.xlsx').
// The Excel file should have columns: Username | Password | ExpectSuccess

import { readExcelFile } from '../../src/utils/ExcelHelper';
const filePath = path.join(__dirname, '../../test-data/qa/TestData.xlsx');
const records = readExcelFile(filePath);

for (const record of records) {

    test(`Data Driven Testing Using Excel file in Playwright : ${record.Username} - ${record.ExpectSuccess ? 'valid' : 'invalid'}`,
        { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log('Excel file row data');
        console.log(`Username      : ${record.Username}`);
        console.log(`Password      : ${record.Password}`);
        console.log(`ExpectSuccess : ${record.ExpectSuccess}`);

        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill credentials from Excel row
        await page.getByPlaceholder('Username').fill(record.Username);
        await page.getByPlaceholder('Password').fill(record.Password);
        await page.getByRole('button', { name: 'Login' }).click();

        if (record.ExpectSuccess) {
            // Validate successful login
            await expect(page).toHaveURL(/dashboard/);
        } else {
            // Validate error message
            await expect(page.getByText('Invalid credentials')).toBeVisible();
        }
    });
}
