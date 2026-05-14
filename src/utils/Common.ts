import AzureDevOps from '../../src/utils/AzureDevOpsHelper';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function readJsonReport() {
    const azureDevOps = new AzureDevOps();
    const filePath = 'json-test-report.json';

    if (process.env.UPDATE_TEST_PLAN === 'Yes' && process.env.PIPELINE === 'Yes') {

        await waitForFile(filePath);

        try {
            const data: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            data.suites.forEach((suite: any) => {
                suite.specs.forEach((spec: any) => {
                    const testCaseTitle = `${spec.title}`;
                    spec.tests.forEach((test: any) => {
                        test.results.forEach(async (result: any) => {
                            const testCaseStatus = `${result.status}`;

                            const matches = testCaseTitle.match(/\[(.*?)\]/);
                            const numbersPart = matches?.[1];
                            const numbersArray: number[] = numbersPart?.split(',').map(num => parseInt(num.trim(), 10)) ?? [];

                            for (const testCaseId of numbersArray) {
                                console.log(`Test Case & Status : ${testCaseId} : ${testCaseStatus}`);
                                await azureDevOps.updateTestCaseStatus(String(testCaseId), testCaseStatus);
                            }
                        });
                    });
                });
            });
        } catch (error) {
            console.error('Error while readinf JSON report' + error)
        }
    } else {
        console.log('Update test plan or pipeline conditions not met.');
    }
}

async function waitForFile(filePath: string) {
    const fs = require('fs').promises;

    let fileExists = false;
    while (!fileExists) {
        try {
            await fs.access(filePath);
            fileExists = true;
        } catch (err) {
            console.log('Waiting for the file to be available...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    console.log(`File ${filePath} is now available!`);
}

export async function updateTestCaseStatusInTestPlan() {
    await readJsonReport();
}
