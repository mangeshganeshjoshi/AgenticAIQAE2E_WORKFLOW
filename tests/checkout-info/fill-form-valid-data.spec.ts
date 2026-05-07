// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Fill checkout form with valid data', async ({ page }) => {
    // 1. Login with standard_user / secret_sauce credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is logged in
    await expect(page).toHaveURL(/inventory/);
    
    // 2. Add an item to cart and proceed to checkout step one
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout information form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 3. Enter First Name: 'John'
    await page.locator('[data-test=firstName]').fill('John');
    await expect(page.locator('[data-test=firstName]')).toHaveValue('John');
    
    // 4. Enter Last Name: 'Doe'
    await page.locator('[data-test=lastName]').fill('Doe');
    await expect(page.locator('[data-test=lastName]')).toHaveValue('Doe');
    
    // 5. Enter Zip/Postal Code: '90210'
    await page.locator('[data-test=postalCode]').fill('90210');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('90210');
    
    // 6. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify form is submitted successfully
    // Verify user is redirected to checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
