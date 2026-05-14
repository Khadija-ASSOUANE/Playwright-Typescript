/**
 * @file        3_Dynamic_TypeSafety_POST_API_Request.spec.ts
 * @chapter     API Testing and Mocking - Type-Safe POST API Request
 * @description Demonstrates a type-safe POST API request using the shared
 *              BookingAPI interface and getPOSTAPIRequestBody helper from
 *              APIHelper.ts, with faker-generated values.
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

// ── Test using shared BookingAPI interface + getPOSTAPIRequestBody ─────────
// Type safety: BookingAPI (src/interface/BookingAPI.interface.ts) enforces
// field names and types on the request body — wrong types caught at compile time
test('Create TypeSafety POST API Request using dynamic API request body in Playwright and TypeScript', async ({ request }) => {

    // Generate random values using faker
    const firstName  = faker.person.firstName();
    const lastName   = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    console.log(`Faker firstName  : ${firstName}`);
    console.log(`Faker lastName   : ${lastName}`);
    console.log(`Faker totalPrice : ${totalPrice}`);

    // Build type-safe request body — returns BookingAPI typed object
    const postAPIRequest = await getPOSTAPIRequestBody(
        firstName, lastName, totalPrice,
        true, 'breakfast', '2027-10-12', '2027-10-23'
    );

    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: postAPIRequest });

    // Validate status BEFORE parsing
    console.log('Response status : ' + postAPIResponse.status());
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Print and validate response
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    // Validate property/key names
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');

    // Validate response values match what was sent
    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName);
    expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName);
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2027-10-12');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2027-10-23');

    console.log('Booking ID : ' + jsonPOSTAPIResponse.bookingid);
});
