/**
 * @file        2_POST_API_Request_Dynamic.spec.ts
 * @chapter     API Testing and Mocking - POST API Request (Dynamic)
 * @description Demonstrates two POST API request patterns: one with fixed
 *              dynamic variables and one using faker-generated values, both
 *              targeting the OrangeHRM auth endpoint.
 *
 * @target      https://opensource-demo.orangehrmlive.com/web/index.php/api/v2
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import { formatAPIRequest } from '../../src/utils/APIHelper';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';

test.use({
    baseURL: process.env.BASE_API_URL,
});

// Test 1 — Dynamic body with fixed values injected into the JSON template
test('Create POST API Request using dynamic API request body in Playwright and TypeScript', async ({ request }) => {

    // Load the JSON template file
    const filePath = path.join(__dirname, '../../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    // Inject fixed values into {0}, {1}, {2} placeholders
    const values = ['khadija', 'XYZ', 1000];
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: JSON.parse(postAPIRequest) });

    // Validate status BEFORE parsing
    console.log('Response status : ' + postAPIResponse.status());
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Print and validate response
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.booking.firstname).toBe('khadija');
    expect(jsonPOSTAPIResponse.booking.lastname).toBe('XYZ');
    expect(jsonPOSTAPIResponse.booking.totalprice).toBe(1000);
    console.log('Booking ID (fixed values) : ' + jsonPOSTAPIResponse.bookingid);
});

// Test 2 — Dynamic body with faker-generated values injected into the JSON template
test('Create POST API Request using dynamic API request body in Playwright and TypeScript 2', async ({ request }) => {

    // Load the JSON template file
    const filePath = path.join(__dirname, '../../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    // Generate random values using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    console.log(`Faker firstName  : ${firstName}`);
    console.log(`Faker lastName   : ${lastName}`);
    console.log(`Faker totalPrice : ${totalPrice}`);

    // Inject faker values into {0}, {1}, {2} placeholders
    const values = [firstName, lastName, totalPrice];
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: JSON.parse(postAPIRequest) });

    // Validate status BEFORE parsing
    console.log('Response status : ' + postAPIResponse.status());
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Print and validate response
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName);
    expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName);
    expect(jsonPOSTAPIResponse.booking.totalprice).toBe(totalPrice);
    console.log('Booking ID (faker values) : ' + jsonPOSTAPIResponse.bookingid);
});
