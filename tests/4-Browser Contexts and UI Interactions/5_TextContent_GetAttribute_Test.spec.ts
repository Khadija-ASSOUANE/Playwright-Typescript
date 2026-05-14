/**
 * @file        5_TextContent_GetAttribute_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Text Content and Get Attribute
 * @description Demonstrates innerText() to read visible text and getAttribute()
 *              to read element attributes on the GitHub profile page.
 *
 * @target      https://github.com/Khadija-ASSOUANE/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Get Text and Get Attribute value in Playwright', async ({ page }) => {
    // Navigate to Khadija's GitHub profile
    await page.goto('https://github.com/Khadija-ASSOUANE/');

    // Get element inner text — profile name
    const name = await page.locator('[itemprop="additionalName"]').innerText();
     console.log(`Name is : ${name}`);
    const finalName = name?.trim();
    console.log(`Profile name is : ${finalName}`);
    expect(finalName).toBeTruthy();

    // Get element inner text — username
    const username = await page.locator('[itemprop="additionalName"]').innerText();
    const finalUsername = username?.trim();
    console.log(`Username is : ${finalUsername}`);
    expect(finalUsername).toBe('Khadija-ASSOUANE');

    // Get href attribute from the Repositories tab link
    const repoTabHref = await page.getByRole('link', { name: /Repositories/ }).first().getAttribute('href');
    console.log(`Repositories tab href : ${repoTabHref}`);
    expect(repoTabHref).toContain('Khadija-ASSOUANE');
    expect(repoTabHref).toContain('repositories');
});
