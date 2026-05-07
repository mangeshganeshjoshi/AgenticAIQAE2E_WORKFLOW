// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Verify order summary display', async ({ page }) => {
    // 1. Login and add 2 items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Verify items are in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    
    // 2. Proceed through checkout
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify user reaches checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // 3. Verify page title shows 'Checkout: Overview'
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
    
    // 4. Verify cart items are displayed
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    
    // Verify QTY
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    
    // 5. Verify each item shows description and price
    const prices = page.locator('.inventory_item_price');
    const priceTexts = await prices.allTextContents();
    expect(priceTexts).toContain('$29.99'); // Backpack
    expect(priceTexts).toContain('$15.99'); // T-Shirt
    
    // Verify descriptions are visible
    const descriptions = page.locator('.inventory_item_desc');
    await expect(descriptions.first()).toBeVisible();
  });
});
