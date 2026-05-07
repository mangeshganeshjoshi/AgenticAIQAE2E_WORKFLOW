// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Completion Tests', () => {
  test('Verify order completion after adding multiple items', async ({ page }) => {
    // 1. Login and add 4 different items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    
    // Verify all 4 items are in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('4');
    
    // 2. Complete full checkout process
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify all items are shown in overview before finishing
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(4);
    
    // 3. Click Finish to complete order
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify order completion page is displayed
    await expect(page).toHaveURL(/checkout-complete/);
    
    // Verify success confirmation message appears
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    
    // 4. Verify cart is cleared
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart is empty after successful order
    const emptyCartItems = page.locator('.cart_item');
    const emptyCount = await emptyCartItems.count();
    expect(emptyCount).toBe(0);
  });
});
