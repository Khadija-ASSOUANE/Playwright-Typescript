/**
 * @file        1_POST_API_Request_Static.spec.ts
 * @chapter     API Testing and Mocking - POST API Request (Static)
 * @description Demonstrates a POST API request with a hardcoded (static) request
 *              body against the OrangeHRM REST API auth endpoint. Validates the
 *              token returned in the response.
 *
 * @target      https://opensource-demo.orangehrmlive.com/web/index.php/api/v2
 * @author      Khadija
 * @version     2.0.0
 */

// Import playwright module
import { test, expect } from '@playwright/test';
import postAPIRequest from '../../test-data/api_requests/POST_API_Request.json';

test.use({
    baseURL: process.env.BASE_API_URL,
});

test('Create POST API Request using static file in Playwright and TypeScript', async ({ request }) => {

    // Create POST API Request using the static JSON file
    const postAPIResponse = await request.post('/booking', { data: postAPIRequest });

    // Validate status BEFORE parsing — prevents cryptic JSON errors when server returns HTML
    console.log('Response status      : ' + postAPIResponse.status());
    console.log('Response status text : ' + postAPIResponse.statusText());
    console.log('Content-Type         : ' + postAPIResponse.headers()['content-type']);
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Safe to parse JSON only after confirming content-type is application/json
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    // Validate response structure
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');
    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);

    // Validate response values match the static request body
    expect(jsonPOSTAPIResponse.booking.firstname).toBe('khadija');
    expect(jsonPOSTAPIResponse.booking.lastname).toBe('khadija');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');

    console.log('Booking ID : ' + jsonPOSTAPIResponse.bookingid);
});
