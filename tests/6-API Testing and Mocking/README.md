# API Testing and Mocking

## 📌 About
This chapter covers Playwright's built-in API testing capabilities with
**TypeScript**. It demonstrates every HTTP method (POST, GET, PUT, PATCH, DELETE)
against the **OrangeHRM REST API**, followed by three mock techniques — full
mock, response append mock, and HAR file mock — on the Playwright API mocking
demo page.

---

## 🛠️ Tech Stack
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [@faker-js/faker](https://fakerjs.dev/) — random test data generation

---

## 📁 Files Structure

```
6-API Testing and Mocking/
├── 1_POST_API_Request_Static.spec.ts
├── 2_POST_API_Request_Dynamic.spec.ts
├── 3_Dynamic_TypeSafety_POST_API_Request.spec.ts
├── 4_GET_API_Request.spec.ts
├── 5_Query_Parameters.spec.ts
├── 6_PUT_API_Request.spec.ts
├── 7_PATCH_API_Request.spec.ts
├── 8_DELETE_API_Request.spec.ts
├── 9_Mock_API_Request.spec.ts
├── 10_Mock_API_Response.spec.ts
├── 11_Mock_From_HAR_File.spec.ts
└── README.md
```

---

## 📄 Files Description

### `1_POST_API_Request_Static.spec.ts` — POST (Static Body)
> Demonstrates a POST request to the OrangeHRM auth endpoint using a hardcoded
> (static) request body. Validates the Bearer token returned in the response.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` |
| **Key APIs** | `request.post()`, `response.json()`, `toHaveProperty()` |
| **Key Concept** | Static POST request body and token validation |

---

### `2_POST_API_Request_Dynamic.spec.ts` — POST (Dynamic Body)
> Demonstrates two POST patterns: one with fixed dynamic variables and one using
> faker-generated (invalid) credentials that validates the 401 error response.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` |
| **Key APIs** | `request.post()`, `@faker-js/faker` |
| **Key Concept** | Dynamic POST body with variable and faker-generated values |

---

### `3_Dynamic_TypeSafety_POST_API_Request.spec.ts` — Type-Safe POST
> Demonstrates type safety by defining TypeScript interfaces for the OrangeHRM
> login request body and response, then using a typed helper function to build
> the POST body.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` |
| **Key APIs** | TypeScript `interface`, `request.post()` |
| **Key Concept** | Type-safe API request body and response handling |

---

### `4_GET_API_Request.spec.ts` — GET Request
> Demonstrates a two-step flow: POST to `/auth/login` to obtain a Bearer token,
> then GET `/leave/leave-types` with the Authorization header to fetch and
> validate the leave types list.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` → `GET /leave/leave-types` |
| **Key APIs** | `request.get()`, `headers: { Authorization }`, `params` |
| **Key Concept** | Authenticated GET request and response structure validation |

---

### `5_Query_Parameters.spec.ts` — Query Parameters
> Demonstrates GET requests with query parameters (`limit`, `offset`) on the
> OrangeHRM leave-types endpoint. Validates the pagination meta and result count.

| Property | Details |
|---|---|
| **Target** | `GET /leave/leave-types?limit=10&offset=0` |
| **Key APIs** | `request.get()` with `params` object |
| **Key Concept** | Passing and validating query string parameters |

---

### `6_PUT_API_Request.spec.ts` — PUT Request
> Demonstrates a full PUT flow: POST auth → POST create user → PUT update user.
> Validates the updated user record in the response.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` → `POST /admin/users` → `PUT /admin/users/{id}` |
| **Key APIs** | `request.put()`, `Authorization: Bearer` header |
| **Key Concept** | Full resource update with a PUT request |

---

### `7_PATCH_API_Request.spec.ts` — PATCH Request
> Demonstrates a PATCH flow: POST auth → POST create user → PATCH partially
> update the user's status. Shows that PATCH only requires the fields to change.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` → `POST /admin/users` → `PATCH /admin/users/{id}` |
| **Key APIs** | `request.patch()`, partial update body |
| **Key Concept** | Partial resource update with a PATCH request |

---

### `8_DELETE_API_Request.spec.ts` — DELETE Request
> Demonstrates a DELETE flow: POST auth → POST create user → DELETE user using
> an array payload. Tagged for CI/CD pipeline integration.

| Property | Details |
|---|---|
| **Target** | `POST /auth/login` → `POST /admin/users` → `DELETE /admin/users` |
| **Key APIs** | `request.delete()`, `{ ids: [userId] }` payload |
| **Key Concept** | Deleting a resource via the REST API |

---

### `9_Mock_API_Request.spec.ts` — Mock API Request
> Demonstrates intercepting the fruit list API call and replacing the entire
> response with Khadija-branded mock data before the page receives it.

| Property | Details |
|---|---|
| **Target** | https://demo.playwright.dev/api-mocking/ |
| **Key APIs** | `page.route()`, `route.fulfill({ json })` |
| **Key Concept** | Full API mock — replace real response with mock data |

---

### `10_Mock_API_Response.spec.ts` — Mock API Response
> Demonstrates fetching the real API response, appending extra Khadija-branded
> mock entries to the JSON array, and fulfilling with the modified response.

| Property | Details |
|---|---|
| **Target** | https://demo.playwright.dev/api-mocking/ |
| **Key APIs** | `route.fetch()`, `route.fulfill({ response, json })` |
| **Key Concept** | Hybrid mock — real response + appended mock data |

---

### `11_Mock_From_HAR_File.spec.ts` — Mock from HAR File
> Demonstrates replaying a pre-recorded HAR file to mock API responses. Set
> `update: true` once to record the HAR, then `update: false` to replay it.

| Property | Details |
|---|---|
| **Target** | https://demo.playwright.dev/api-mocking/ |
| **Key APIs** | `page.routeFromHAR()` |
| **Key Concept** | HAR-based API mocking for offline/reproducible test runs |

---

## 🧪 Test Summary

| File | Endpoint / Target | Key Concept |
|---|---|---|
| `1_POST_API_Request_Static.spec.ts` | `POST /auth/login` | Static POST body |
| `2_POST_API_Request_Dynamic.spec.ts` | `POST /auth/login` | Dynamic + faker body |
| `3_Dynamic_TypeSafety_POST_API_Request.spec.ts` | `POST /auth/login` | TypeScript interface |
| `4_GET_API_Request.spec.ts` | `GET /leave/leave-types` | Authenticated GET |
| `5_Query_Parameters.spec.ts` | `GET /leave/leave-types?limit=10` | Query parameters |
| `6_PUT_API_Request.spec.ts` | `PUT /admin/users/{id}` | Full update |
| `7_PATCH_API_Request.spec.ts` | `PATCH /admin/users/{id}` | Partial update |
| `8_DELETE_API_Request.spec.ts` | `DELETE /admin/users` | Delete resource |
| `9_Mock_API_Request.spec.ts` | Playwright demo | Full mock |
| `10_Mock_API_Response.spec.ts` | Playwright demo | Append mock data |
| `11_Mock_From_HAR_File.spec.ts` | Playwright demo | HAR file replay |

---

## ⚙️ Prerequisites
- Node.js v18+
- Playwright installed
- faker installed: `npm install @faker-js/faker`

```bash
npm init playwright@latest
```

---

## 🚀 Running Tests

### Run all API Testing and Mocking tests
```bash
npx playwright test tests/6-API Testing and Mocking
```

### Run a specific file
```bash
npx playwright test tests/6-API Testing and Mocking/1_POST_API_Request_Static.spec.ts
npx playwright test tests/6-API Testing and Mocking/2_POST_API_Request_Dynamic.spec.ts
npx playwright test tests/6-API Testing and Mocking/3_Dynamic_TypeSafety_POST_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/4_GET_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/5_Query_Parameters.spec.ts
npx playwright test tests/6-API Testing and Mocking/6_PUT_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/7_PATCH_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/8_DELETE_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/9_Mock_API_Request.spec.ts
npx playwright test tests/6-API Testing and Mocking/10_Mock_API_Response.spec.ts
npx playwright test tests/6-API Testing and Mocking/11_Mock_From_HAR_File.spec.ts
```

### Run CI/CD tagged tests
```bash
npx playwright test tests/6-API Testing and Mocking --grep @PlaywrightWithGitHubActions
```

### Record a new HAR file (update snapshots)
```bash
# Set update: true in 11_Mock_From_HAR_File.spec.ts, then run:
npx playwright test tests/6-API Testing and Mocking/11_Mock_From_HAR_File.spec.ts
```

### Run in a specific browser
```bash
npx playwright test tests/6-API Testing and Mocking --project=chromium
```

---

## 📊 View Test Report
```bash
npx playwright show-report
```

---

## 🔑 Key Concepts Covered

| Concept | Description |
|---|---|
| `test.use({ baseURL })` | Sets the base URL for all requests in the file |
| `request.post(path, { data })` | Sends a POST request with a JSON body |
| `request.get(path, { params })` | Sends a GET request with query parameters |
| `request.put(path, { data })` | Sends a PUT request (full update) |
| `request.patch(path, { data })` | Sends a PATCH request (partial update) |
| `request.delete(path, { data })` | Sends a DELETE request |
| `response.json()` | Parses the API response body as JSON |
| `response.status()` | Returns the HTTP status code |
| `response.statusText()` | Returns the HTTP status text |
| `response.headers()` | Returns the response headers as an object |
| `toHaveProperty()` | Asserts that a JSON object has a specific key |
| TypeScript `interface` | Provides compile-time type safety for request/response |
| `page.route()` + `route.fulfill()` | Intercepts and mocks an API request entirely |
| `route.fetch()` | Forwards the intercepted request to the real server |
| `page.routeFromHAR()` | Replays recorded HTTP responses from a HAR file |

---

## 🌐 Applications Under Test

| App | URL |
|---|---|
| **OrangeHRM REST API** | https://opensource-demo.orangehrmlive.com/web/index.php/api/v2 |
| **Playwright Demo** | https://demo.playwright.dev/api-mocking/ (mock tests only) |

---

## 🔐 OrangeHRM API Auth

| Field | Value |
|---|---|
| **Endpoint** | `POST /auth/login` |
| **Username** | Admin |
| **Password** | admin123 |
| **Token type** | Bearer |

---

## 👤 Author
**Khadija**

---

## 🔗 Resources
- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [Playwright Network Mocking](https://playwright.dev/docs/mock)
- [Playwright HAR Files](https://playwright.dev/docs/mock#record-and-replay-requests)
- [OrangeHRM API](https://opensource-demo.orangehrmlive.com/web/index.php/api/v2)
- [Faker.js](https://fakerjs.dev/)
