# Requirements Document

## Introduction

This feature integrates Razorpay payment gateway into the player registration flow of the Cricket Auction Platform. Players must pay a registration fee via Razorpay before their registration is submitted for admin approval. The payment step is added after form validation and photo upload, ensuring only paid registrations enter the approval queue.

## Glossary

- **Registration_Form**: The player registration page at `/players/register` where players enter personal and cricket details
- **Payment_Gateway**: The Razorpay payment processing service used to collect registration fees
- **Registration_Fee**: The fixed amount a player must pay to complete registration
- **Order_API**: The server-side API endpoint that creates a Razorpay order for the registration fee
- **Verification_API**: The server-side API endpoint that verifies Razorpay payment signatures
- **Player_Record**: The MongoDB document storing player registration data
- **Payment_Record**: The MongoDB document storing payment transaction details linked to a player registration
- **Razorpay_Checkout**: The Razorpay client-side SDK that renders the payment modal

## Requirements

### Requirement 1: Create Razorpay Order

**User Story:** As a player, I want the system to create a payment order when I submit my registration form, so that I can proceed to pay the registration fee.

#### Acceptance Criteria

1. WHEN the player submits a valid registration form, THE Order_API SHALL create a Razorpay order with the configured Registration_Fee amount in INR
2. WHEN the Razorpay order is created successfully, THE Order_API SHALL return the order ID, amount, and currency to the client
3. IF the Razorpay order creation fails, THEN THE Order_API SHALL return an error message with HTTP status 500
4. THE Order_API SHALL set the order amount from a server-side environment variable, not from client input

### Requirement 2: Display Payment Modal

**User Story:** As a player, I want to see a payment modal after form submission, so that I can pay the registration fee using my preferred payment method.

#### Acceptance Criteria

1. WHEN the Order_API returns a valid order ID, THE Registration_Form SHALL open the Razorpay_Checkout modal with the order details
2. THE Registration_Form SHALL display the Registration_Fee amount to the player before opening the payment modal
3. WHILE the Razorpay_Checkout modal is open, THE Registration_Form SHALL disable the submit button to prevent duplicate submissions
4. THE Registration_Form SHALL pre-fill the player name and mobile number in the Razorpay_Checkout modal from the form data

### Requirement 3: Verify Payment and Complete Registration

**User Story:** As a player, I want my registration to be submitted automatically after successful payment, so that I don't have to take additional steps.

#### Acceptance Criteria

1. WHEN Razorpay_Checkout returns a successful payment response, THE Registration_Form SHALL send the payment details and player data to the Verification_API
2. THE Verification_API SHALL verify the Razorpay payment signature using HMAC SHA256 with the Razorpay key secret
3. WHEN the payment signature is valid, THE Verification_API SHALL create the Player_Record with payment status marked as paid
4. WHEN the payment signature is valid, THE Verification_API SHALL create a Payment_Record linking the payment to the player registration
5. IF the payment signature verification fails, THEN THE Verification_API SHALL return an error and not create the Player_Record
6. WHEN registration is completed successfully, THE Registration_Form SHALL display a success message and redirect the player to the home page

### Requirement 4: Handle Payment Failures

**User Story:** As a player, I want clear feedback when my payment fails, so that I know what happened and can retry.

#### Acceptance Criteria

1. IF the player closes the Razorpay_Checkout modal without completing payment, THEN THE Registration_Form SHALL display a message indicating payment was cancelled
2. IF the payment fails due to a payment processing error, THEN THE Registration_Form SHALL display the error reason and allow the player to retry
3. WHILE a payment failure has occurred, THE Registration_Form SHALL retain all entered form data so the player does not need to re-enter information
4. IF a payment fails, THEN THE Registration_Form SHALL re-enable the submit button so the player can attempt payment again

### Requirement 5: Store Payment Information

**User Story:** As an admin, I want payment details stored with player registrations, so that I can verify payment status during the approval process.

#### Acceptance Criteria

1. THE Payment_Record SHALL store the Razorpay order ID, payment ID, and signature for each successful payment
2. THE Payment_Record SHALL store the payment amount, currency, and timestamp
3. THE Payment_Record SHALL reference the associated Player_Record by ID
4. THE Player_Record SHALL include a payment status field indicating whether the registration fee has been paid
5. WHEN an admin views a player registration, THE Player_Record SHALL include the payment status for review

### Requirement 6: Razorpay SDK Integration

**User Story:** As a developer, I want the Razorpay SDK loaded securely, so that the payment flow works reliably across browsers.

#### Acceptance Criteria

1. THE Registration_Form SHALL load the Razorpay checkout script from the official Razorpay CDN
2. THE Registration_Form SHALL use the Razorpay key ID from environment variables exposed to the client
3. THE Order_API SHALL use the Razorpay key secret from server-side environment variables only
4. IF the Razorpay script fails to load, THEN THE Registration_Form SHALL display an error message indicating payment is temporarily unavailable
