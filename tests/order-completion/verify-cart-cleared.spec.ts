// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Completion Tests', () => {
  test('Verify cart is cleared after successful order', async ({ page }) => {
    // 1. Login and add 2 items to cart, proceed through complete checkout
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Proceed through checkout
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify order is completed successfully
    await expect(page).toHaveURL(/checkout-complete/);
    
    // 2. Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart page loads
    await expect(page).toHaveURL(/cart/);
    
    // 3. Verify cart is empty
    // Verify cart shows no items
    const cartItems = page.locator('.cart_item');
    const itemCount = await cartItems.count();
    expect(itemCount).toBe(0);
    
    // Verify cart badge shows '0' or is not displayed
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    const badgeVisible = await cartBadge.isVisible();
    if (badgeVisible) {
      await expect(cartBadge).toHaveText('0');
    }
    
    // Verify only 'Continue Shopping' and 'Checkout' buttons are visible
    await expect(page.getByRole('button', { name: /Continue Shopping/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });
});
