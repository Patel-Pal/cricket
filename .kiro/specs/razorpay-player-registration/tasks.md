# Implementation Plan: Razorpay Player Registration

## Overview

Integrate Razorpay payment gateway into the player registration flow. The implementation follows the sequence: install dependencies → data models → service layer → API routes → frontend integration → wiring and testing. Each step builds incrementally so the feature is functional at each checkpoint.

## Tasks

- [x] 1. Install dependencies and configure environment
  - [x] 1.1 Install the `razorpay` npm package
    - Run `npm install razorpay`
    - _Requirements: 6.1_
  - [x] 1.2 Install test framework and property testing library
    - Run `npm install --save-dev vitest fast-check`
    - Add a `"test"` script to `package.json`: `"test": "vitest --run"`
    - _Requirements: Testing infrastructure_
  - [x] 1.3 Add environment variables to `.env.example`
    - Add `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `REGISTRATION_FEE_AMOUNT` with placeholder values
    - _Requirements: 6.2, 6.3_

- [x] 2. Create Payment data model
  - [x] 2.1 Create `models/Payment.js` with the Payment schema
    - Define schema with fields: `playerId` (ObjectId ref to Player), `razorpayOrderId` (String, required, unique), `razorpayPaymentId` (String, required, unique), `razorpaySignature` (String, required), `amount` (Number, required), `currency` (String, default 'INR'), `status` (enum: paid/failed/refunded, default 'paid')
    - Enable `timestamps: true` for automatic `createdAt`/`updatedAt`
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 2.2 Add `paymentStatus` field to the existing Player model in `models/Player.js`
    - Add field: `paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }`
    - _Requirements: 5.4, 5.5_

- [x] 3. Implement payment service layer
  - [x] 3.1 Create `services/paymentService.js` with Razorpay integration functions
    - Implement `createRazorpayOrder(playerName, mobile)` — creates a Razorpay order using the `razorpay` SDK with amount from `REGISTRATION_FEE_AMOUNT` env var
    - Implement `verifyPaymentSignature(orderId, paymentId, signature)` — verifies HMAC SHA256 signature using `RAZORPAY_KEY_SECRET`
    - Implement `createPaymentRecord(paymentData)` — creates a Payment document in MongoDB
    - _Requirements: 1.1, 1.4, 3.2, 3.4_
  - [ ]* 3.2 Write property test for signature verification (Property 4)
    - **Property 4: Signature verification correctness**
    - Generate random orderId, paymentId, and secret strings
    - Compute expected signature as HMAC_SHA256(orderId + "|" + paymentId, secret)
    - Assert verification returns true for correct signature and false for incorrect signature
    - Create test file: `__tests__/payments/signatureVerification.test.js`
    - **Validates: Requirements 3.2**

- [x] 4. Implement create-order API route
  - [x] 4.1 Create `app/api/payments/create-order/route.js`
    - Implement POST handler that calls `createRazorpayOrder`
    - Return `{ success: true, data: { orderId, amount, currency } }` on success
    - Return `{ success: false, error: "Failed to create payment order" }` with status 500 on failure
    - Amount MUST come from `REGISTRATION_FEE_AMOUNT` env var, ignore any client-sent amount
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 4.2 Write property test for order amount server control (Property 1)
    - **Property 1: Order amount is server-controlled**
    - Generate arbitrary request bodies with random fields including `amount`
    - Assert the order amount always equals the configured env var value
    - Create test file: `__tests__/payments/createOrder.test.js`
    - **Validates: Requirements 1.1, 1.4**
  - [ ]* 4.3 Write property test for order response fields (Property 2)
    - **Property 2: Successful order response contains required fields**
    - Generate random valid player names and mobile numbers
    - Mock Razorpay to return random valid order IDs
    - Assert response always has non-empty `orderId`, positive `amount`, non-empty `currency`
    - Add to test file: `__tests__/payments/createOrder.test.js`
    - **Validates: Requirements 1.2**

- [x] 5. Implement verify-payment API route
  - [x] 5.1 Create `app/api/payments/verify-payment/route.js`
    - Implement POST handler that verifies Razorpay signature via `verifyPaymentSignature`
    - On valid signature: create Player record with `paymentStatus: 'paid'`, create Payment record linked to player
    - On invalid signature: return `{ success: false, error: "Payment verification failed" }` with status 400
    - On success: return `{ success: true, data: { player, payment } }` with status 201
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 5.2 Write property test for valid payment creates paid player (Property 5)
    - **Property 5: Valid payment creates player with paid status**
    - Generate random valid player data and valid payment tuples
    - Assert created player has `paymentStatus === 'paid'`
    - Create test file: `__tests__/payments/verifyPayment.test.js`
    - **Validates: Requirements 3.3, 5.4**
  - [ ]* 5.3 Write property test for invalid signature blocking (Property 6)
    - **Property 6: Invalid signature blocks player creation**
    - Generate random player data and random invalid signatures
    - Assert error response and no Player record created
    - Add to test file: `__tests__/payments/verifyPayment.test.js`
    - **Validates: Requirements 3.5**
  - [ ]* 5.4 Write property test for payment record completeness (Property 7)
    - **Property 7: Payment record completeness and referential integrity**
    - Generate random valid payment verifications
    - Assert Payment record contains all required fields and `playerId` matches created Player
    - Add to test file: `__tests__/payments/verifyPayment.test.js`
    - **Validates: Requirements 3.4, 5.1, 5.2, 5.3**

- [x] 6. Checkpoint - Ensure backend is solid
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Integrate Razorpay checkout into the registration page
  - [x] 7.1 Add Razorpay SDK script loader to `app/players/register/page.js`
    - Load `https://checkout.razorpay.com/v1/checkout.js` dynamically on component mount
    - Track script load status in state; if script fails to load, show error toast and disable submit
    - _Requirements: 6.1, 6.4_
  - [x] 7.2 Modify the form submission flow in `app/players/register/page.js`
    - After form validation and photo upload, call `/api/payments/create-order` instead of directly creating the player
    - On order creation success, open Razorpay Checkout modal with order details
    - Pre-fill player name and mobile number in checkout options
    - Use `NEXT_PUBLIC_RAZORPAY_KEY_ID` for the Razorpay key
    - Disable submit button during the entire payment flow
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.2_
  - [x] 7.3 Handle payment success callback
    - On successful payment, send payment details + player data to `/api/payments/verify-payment`
    - On verification success, show success toast and redirect to home page
    - _Requirements: 3.1, 3.6_
  - [x] 7.4 Handle payment failure and cancellation
    - On modal dismiss: show "Payment cancelled" toast, re-enable submit button
    - On payment error: show error description toast, re-enable submit button
    - Preserve all form data on failure so player can retry without re-entering
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [ ]* 7.5 Write property test for checkout options (Property 3)
    - **Property 3: Checkout options contain player contact info**
    - Extract the checkout options builder into a testable function
    - Generate random non-empty names and valid mobile numbers
    - Assert `prefill.name` equals input name and `prefill.contact` equals input mobile
    - Create test file: `__tests__/payments/checkoutOptions.test.js`
    - **Validates: Requirements 2.4**

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with Vitest as the test runner
- The implementation language is JavaScript (Next.js App Router conventions)
- All amounts are in paise (e.g., 50000 = ₹500)
