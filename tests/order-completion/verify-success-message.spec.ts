// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Completion Tests', () => {
  test('Verify success confirmation message', async ({ page }) => {
    // 1. Login and complete a full checkout
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Proceed through checkout
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Click Finish to complete order
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify user is redirected to order completion page
    await expect(page).toHaveURL(/checkout-complete/);
    
    // 2. Verify page title shows 'Checkout: Complete!'
    await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
    
    // 3. Verify success heading is present
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    
    // 4. Verify confirmation message is displayed
    await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
  });
});
