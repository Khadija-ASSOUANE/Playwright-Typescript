/**
 * @file        3_AlertsPopups_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Alerts and Popups
 * @description Demonstrates handling JS alert, confirm dialog, and prompt popup
 *              using selenium.dev. OrangeHRM does not expose native JS dialogs,
 *              so selenium.dev is kept as the target for this concept.
 *
 * @target      https://www.selenium.dev/documentation/webdriver/interactions/alerts/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';


// Handle JS alert dialog — accept and log message
test('Handling Alert popups in Playwright', async ({ page }) => {
    // Navigate to selenium.dev alerts demo page
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    // Register one-time dialog handler — accept the alert
    page.once('dialog', dialog => {
        dialog.accept();
        console.log(`Alert message is : ${dialog.message()}`);
        console.log(`Dialog type is : ${dialog.type()}`);
    });

    // Trigger the alert
    await page.getByText('See an example alert', { exact: true }).click();
});

// Handle confirm dialog — dismiss and log message
test('Handling Popups in Playwright', async ({ page }) => {
    // Navigate to selenium.dev alerts demo page
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    // Register one-time dialog handler — dismiss the confirm
    page.once('dialog', dialog => {
        console.log(`Dialog type is : ${dialog.type()}`);
        dialog.dismiss();
        console.log(`Popup message is : ${dialog.message()}`);
    });

    // Trigger the confirm dialog
    await page.getByText('See a sample confirm', { exact: true }).click();
});

// Handle prompt dialog — accept with typed value
test('Handling Prompt Popups in Playwright', async ({ page }) => {
    // Navigate to selenium.dev alerts demo page
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    // Register one-time dialog handler — accept with input text
    page.once('dialog', async (dialog) => {
        console.log(`Dialog type is : ${dialog.type()}`);
        console.log(`Prompt popup message is : ${dialog.message()}`);
        await dialog.accept('Khadija');
    });

    // Trigger the prompt dialog
    await page.getByText('See a sample prompt', { exact: true }).click();
});
