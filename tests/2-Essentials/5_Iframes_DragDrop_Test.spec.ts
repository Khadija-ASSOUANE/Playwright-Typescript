/**
 * @file        5_Iframes_DragDrop_Test.spec.ts
 * @chapter     Essentials - Core Playwright Techniques
 * @description Demonstrates handling iframes and drag-and-drop interactions
 *              in Playwright using jQuery UI demo pages. OrangeHRM and GitHub
 *              do not expose iframe-based drag-and-drop UIs, so jqueryui.com
 *              is used as it is the standard demo target for these concepts.
 *
 * @target      https://jqueryui.com/droppable/ | https://jqueryui.com/draggable/
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';

test('Handling Iframes, Drag and Drop element in playwright', async ({ page }) => {
    // Go to jQuery UI droppable demo (content lives inside an iframe)
    await page.goto('https://jqueryui.com/droppable/');

    // Access elements inside the iframe using frameLocator
    const iframe = page.frameLocator('.demo-frame');

    // Locate the draggable and droppable elements inside the iframe
    const dragElement = iframe.locator('#draggable');
    const dropElement = iframe.locator('#droppable');

    // Validate initial state before drag
    await expect(dropElement).toContainText('Drop here');

    // Perform drag and drop
    await dragElement.dragTo(dropElement);

    // Validate the drop target updated its text after the drop
    await expect(dropElement).toContainText('Dropped!');
});
