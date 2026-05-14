/**
 * @file        6_Iterating_Elements_Test.spec.ts
 * @chapter     Browser Contexts and UI Interactions - Iterating Matching Elements
 * @description Demonstrates three iteration patterns — for-of loop, index loop,
 *              and nth() loop — on repository links from the GitHub profile page.
 *
 * @target      https://github.com/Khadija-ASSOUANE/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

/*
 * ── ORIGINAL CODE ──────────────────────────────────────────────────────────
 * // Import playwright module
 * import { test, expect } from '@playwright/test';
 *
 * /**
 *  * khadija
 *  *\/
 * test('Iterating matching elements in playwright', async ({ page }) => {
 *     await page.goto('https://github.com/BakkappaN');
 *
 *     // For of loop
 *     const repositoryLinks = await page.$$('.repo');
 *     for (const repositoryLink of repositoryLinks) {
 *         const text = await repositoryLink.textContent();
 *         console.log(`Text from 1st for loop: ${text}`);
 *     }
 *
 *     // For loop using index
 *     for (let index = 0; index < repositoryLinks.length; index++) {
 *         const text = await repositoryLinks[index].textContent();
 *         console.log(`Text from 2nd for loop: ${text}`);
 *     }
 *
 *     // For loop using nth() method
 *     const repositoryLinks2 = page.locator('.repo');
 *     const count = await repositoryLinks2.count();
 *     for (let index = 0; index < count; index++) {
 *         const text = await repositoryLinks2.nth(index).textContent();
 *         console.log(`Text from 3rd for loop: ${text}`);
 *     }
 * });
 * ───────────────────────────────────────────────────────────────────────────
 */

test('Iterating matching elements in Playwright', async ({ page }) => {
    // Navigate to a GitHub profile with public repositories
    await page.goto('https://github.com/BakkappaN?tab=repositories');

    // ── Method 1: for-of loop using $$() ──────────────────────────────────
    const repositoryLinks = await page.$$('[itemprop="name codeRepository"]');
    for (const repositoryLink of repositoryLinks) {
        const text = await repositoryLink.textContent();
        console.log(`Text from 1st for loop (for-of): ${text?.trim()}`);
    }

    console.log('==========================');

    // ── Method 2: for loop using index ────────────────────────────────────
    for (let index = 0; index < repositoryLinks.length; index++) {
        const text = await repositoryLinks[index].textContent();
        console.log(`Text from 2nd for loop (index): ${text?.trim()}`);
    }

    console.log('==========================');

    // ── Method 3: for loop using nth() ────────────────────────────────────
    const repositoryLinks2 = page.locator('[itemprop="name codeRepository"]');
    const count = await repositoryLinks2.count();
    for (let index = 0; index < count; index++) {
        const text = await repositoryLinks2.nth(index).textContent();
        console.log(`Text from 3rd for loop (nth): ${text?.trim()}`);
    }

    // Validate at least one repository is listed
    expect(count).toBeGreaterThan(0);
});
