/**
 * @file        4_GET_API_Request.spec.ts
 * @chapter     API Testing and Mocking - GET API Request
 * @description Demonstrates a GET API request: POST /booking to create a booking
 *              using getPOSTAPIRequestBody, then GET /booking/{id} to retrieve
 *              it and validate the response matches what was sent.
 *
 * @target      https://restful-booker.herokuapp.com
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper';
import { faker } from '@faker-js/faker';

test.use({
    baseURL: process.env.BASE_API_URL,
});

test('Create GET API Request using Playwright and TypeScript', async ({ request }) => {

    // ── Step 1: POST /booking to create a booking ─────────────────────────
    const firstName  = faker.person.firstName();
    const lastName   = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 5000 });

    console.log(`Faker firstName  : ${firstName}`);
    console.log(`Faker lastName   : ${lastName}`);
    console.log(`Faker totalPrice : ${totalPrice}`);

    const postAPIRequest = await getPOSTAPIRequestBody(
        firstName, lastName, totalPrice,
        true, 'breakfast', '2027-01-15', '2027-01-17'
    );

    const postAPIResponse = await request.post('/booking', { data: postAPIRequest });

    // Validate POST status BEFORE parsing
    console.log('POST Response status : ' + postAPIResponse.status());
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    // Extract the booking ID returned by the POST
    const bookingId: number = jsonPOSTAPIResponse.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    console.log('Created Booking ID : ' + bookingId);

    // ── Step 2: GET /booking/{id} to retrieve the created booking ─────────
    const getAPIResponse = await request.get(`/booking/${bookingId}`);

    // Validate GET status BEFORE parsing
    console.log('GET Response status : ' + getAPIResponse.status());
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');

    // Print and validate GET response
    const getAPIJSONResponse = await getAPIResponse.json();
    console.log('GET API Response : ' + JSON.stringify(getAPIJSONResponse, null, 2));

    // Validate GET response matches what was sent in POST
    expect(getAPIJSONResponse.firstname).toBe(firstName);
    expect(getAPIJSONResponse.lastname).toBe(lastName);
    expect(getAPIJSONResponse.totalprice).toBe(totalPrice);
    expect(getAPIJSONResponse.depositpaid).toBe(true);
    expect(getAPIJSONResponse.bookingdates.checkin).toBe('2027-01-15');
    expect(getAPIJSONResponse.bookingdates.checkout).toBe('2027-01-17');
    expect(getAPIJSONResponse.additionalneeds).toBe('breakfast');

    console.log('GET validation passed — booking data matches POST request');
});
