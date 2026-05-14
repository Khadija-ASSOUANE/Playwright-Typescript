/**
 * @file        3_DataDrivenTestingUsingCSV.spec.ts
 * @chapter     POM and Data-Driven Testing - Data-Driven Testing Using CSV
 * @description Demonstrates data-driven testing by importing a CSV file via
 *              csv-parse/sync and looping over credential rows to run OrangeHRM
 *              login tests.
 *
 * @target      https://opensource-demo.orangehrmlive.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';



type CredentialRecord = {
    Username: string;
    Password: string;
    ExpectSuccess: string;
};

// Load CSV file — path relative to this file
const csvFilePath = path.join(__dirname, '../../test-data/qa/testdata.csv');

// Fallback inline data when CSV file does not exist
let records: CredentialRecord[];

try {
    records = parse(
        fs.readFileSync(csvFilePath),
        { columns: true, skipEmptyLines: true }
    ) as CredentialRecord[];
} catch {
    // CSV file not found — use inline fallback data
    console.warn('CSV file not found, using inline fallback data');
    records = [
        { Username: 'Admin',     Password: 'admin123',  ExpectSuccess: 'true'  },
        { Username: 'wrongUser', Password: 'admin123',  ExpectSuccess: 'false' },
    ];
}

for (const record of records) {

    test(`Data Driven Testing Using CSV file in Playwright : ${record.Username}`,
         { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log('CSV file row data');
        console.log(`Username      : ${record.Username}`);
        console.log(`Password      : ${record.Password}`);
        console.log(`ExpectSuccess : ${record.ExpectSuccess}`);

        // Navigate to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill credentials from CSV record
        await page.getByPlaceholder('Username').fill(record.Username);
        await page.getByPlaceholder('Password').fill(record.Password);
        await page.getByRole('button', { name: 'Login' }).click();

        if (record.ExpectSuccess === 'true') {
            // Validate successful login
            await expect(page).toHaveURL(/dashboard/);
        } else {
            // Validate error message
            await expect(page.getByText('Invalid credentials')).toBeVisible();
        }
    });
}
