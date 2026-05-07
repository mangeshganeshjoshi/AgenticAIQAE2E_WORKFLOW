# SauceDemo Checkout Test Plan

## Application Overview

This test plan covers the complete e-commerce checkout process for SauceDemo, including cart management, information entry, order review, completion, and error handling. The application URL is https://www.saucedemo.com with test credentials standard_user/secret_sauce.

## Test Scenarios

### 1. Cart Review

**Seed:** `tests/seed.spec.ts`

#### 1.1. View Cart with Single Item

**File:** `tests/cart-review/view-cart-single-item.spec.ts`

**Steps:**
  1. Add one item to cart and navigate to cart page
    - expect: Cart badge shows 1
    - expect: Item details displayed correctly
  2. Verify navigation options
    - expect: Continue Shopping and Checkout buttons visible

#### 1.2. View Cart with Multiple Items

**File:** `tests/cart-review/view-cart-multiple-items.spec.ts`

**Steps:**
  1. Add multiple items and view cart
    - expect: All items listed with quantities and prices
  2. Verify price calculations
    - expect: Total price calculated correctly

#### 1.3. Remove Item from Cart

**File:** `tests/cart-review/remove-item-from-cart.spec.ts`

**Steps:**
  1. Click Remove button on cart item
    - expect: Item removed from cart
    - expect: Cart badge updated

#### 1.4. Continue Shopping Navigation

**File:** `tests/cart-review/continue-shopping-navigation.spec.ts`

**Steps:**
  1. Click Continue Shopping from cart
    - expect: Redirected to inventory page

#### 1.5. Checkout Button Navigation

**File:** `tests/cart-review/checkout-button-navigation.spec.ts`

**Steps:**
  1. Click Checkout from cart
    - expect: Redirected to checkout information page

#### 1.6. Verify Total Price Calculation

**File:** `tests/cart-review/verify-total-price-calculation.spec.ts`

**Steps:**
  1. Add items with different prices and check total
    - expect: Subtotal matches sum of item prices

### 2. Checkout Information

**Seed:** `tests/seed.spec.ts`

#### 2.1. Fill Form with Valid Data

**File:** `tests/checkout-info/fill-form-valid-data.spec.ts`

**Steps:**
  1. Enter valid first name, last name, zip code and click Continue
    - expect: Redirected to order overview page

#### 2.2. Validation - All Fields Empty

**File:** `tests/checkout-info/validation-all-fields-empty.spec.ts`

**Steps:**
  1. Leave all fields empty and click Continue
    - expect: Error message 'First Name is required' displayed

#### 2.3. Validation - Empty First Name

**File:** `tests/checkout-info/validation-empty-first-name.spec.ts`

**Steps:**
  1. Fill last name and zip, leave first name empty
    - expect: Error message for first name

#### 2.4. Validation - Empty Last Name

**File:** `tests/checkout-info/validation-empty-last-name.spec.ts`

**Steps:**
  1. Fill first name and zip, leave last name empty
    - expect: Error message for last name

#### 2.5. Validation - Empty Zip Code

**File:** `tests/checkout-info/validation-empty-zip-code.spec.ts`

**Steps:**
  1. Fill first and last name, leave zip empty
    - expect: Error message for zip code

#### 2.6. Zip Code Numeric Validation

**File:** `tests/checkout-info/zip-code-numeric-validation.spec.ts`

**Steps:**
  1. Enter non-numeric zip code
    - expect: Error or acceptance based on input

#### 2.7. Special Characters in Form

**File:** `tests/checkout-info/special-characters-in-form.spec.ts`

**Steps:**
  1. Enter special characters in fields
    - expect: Form accepts or rejects special characters

#### 2.8. Form Case Sensitivity

**File:** `tests/checkout-info/form-case-sensitivity.spec.ts`

**Steps:**
  1. Enter names with mixed case
    - expect: Form accepts mixed case

#### 2.9. Clear Error Message

**File:** `tests/checkout-info/clear-error-message.spec.ts`

**Steps:**
  1. Fill required field after error
    - expect: Error message disappears after filling field

#### 2.10. Cancel Button Navigation

**File:** `tests/checkout-info/cancel-button-checkout-info.spec.ts`

**Steps:**
  1. Click Cancel on checkout info page
    - expect: Redirected back to cart

### 3. Checkout Overview

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify Order Summary Display

**File:** `tests/checkout-overview/verify-order-summary-display.spec.ts`

**Steps:**
  1. Navigate to overview page
    - expect: All cart items displayed with quantities

#### 3.2. Verify Order Summary Multiple Items

**File:** `tests/checkout-overview/verify-order-summary-multiple-items.spec.ts`

**Steps:**
  1. Add multiple items and check overview
    - expect: Multiple items shown correctly

#### 3.3. Verify Payment Information

**File:** `tests/checkout-overview/verify-payment-information.spec.ts`

**Steps:**
  1. Check payment section
    - expect: SauceCard #31337 displayed

#### 3.4. Verify Shipping Information

**File:** `tests/checkout-overview/verify-shipping-information.spec.ts`

**Steps:**
  1. Check shipping section
    - expect: Free Pony Express Delivery displayed

#### 3.5. Verify Price Calculations

**File:** `tests/checkout-overview/verify-price-calculations.spec.ts`

**Steps:**
  1. Check price breakdown
    - expect: Subtotal, tax, total correct

#### 3.6. Verify Price Single Item

**File:** `tests/checkout-overview/verify-price-single-item.spec.ts`

**Steps:**
  1. Single item order
    - expect: Prices match inventory

#### 3.7. Cancel Button on Overview

**File:** `tests/checkout-overview/cancel-button-overview-page.spec.ts`

**Steps:**
  1. Click Cancel on overview page
    - expect: Redirected to inventory

#### 3.8. Finish Button Navigation

**File:** `tests/checkout-overview/finish-button-navigation.spec.ts`

**Steps:**
  1. Click Finish
    - expect: Redirected to completion page

#### 3.9. Cancel from Overview to Cart

**File:** `tests/checkout-overview/cancel-from-overview-to-cart.spec.ts`

**Steps:**
  1. Cancel from overview
    - expect: Back to cart page

### 4. Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify Completion Page Elements

**File:** `tests/order-completion/verify-completion-page-elements.spec.ts`

**Steps:**
  1. Complete order
    - expect: Thank you message and pony image displayed

#### 4.2. Verify Success Message

**File:** `tests/order-completion/verify-success-message.spec.ts`

**Steps:**
  1. Check confirmation text
    - expect: 'Thank you for your order!' message

#### 4.3. Back Home Button Navigation

**File:** `tests/order-completion/back-home-button-navigation.spec.ts`

**Steps:**
  1. Click Back Home
    - expect: Redirected to inventory

#### 4.4. Verify Cart Cleared

**File:** `tests/order-completion/verify-cart-cleared.spec.ts`

**Steps:**
  1. After completion, check cart
    - expect: Cart badge not visible

#### 4.5. Completion After Multiple Items

**File:** `tests/order-completion/completion-after-multiple-items.spec.ts`

**Steps:**
  1. Complete order with multiple items
    - expect: Same success flow
