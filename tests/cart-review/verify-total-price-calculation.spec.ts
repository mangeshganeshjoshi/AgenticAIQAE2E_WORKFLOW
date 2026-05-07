// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('Verify total price calculation in cart', async ({ page }) => {
    // 1. Login with standard_user / secret_sauce credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is logged in
    await expect(page).toHaveURL(/inventory/);
    
    // 2. Add multiple items: Backpack ($29.99), Fleece Jacket ($49.99), T-Shirt ($15.99)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    
    // Verify items are added successfully
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('3');
    
    // 3. Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart page loads with all items
    await expect(page).toHaveURL(/cart/);
    
    // 4. Manually calculate expected total: 29.99 + 49.99 + 15.99 = $95.97
    // Verify the cart displays all three items with quantities and prices
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);
    
    // 5. Verify each item is displayed with correct prices
    const prices = page.locator('.inventory_item_price');
    const priceTexts = await prices.allTextContents();
    expect(priceTexts).toContain('$29.99'); // Backpack
    expect(priceTexts).toContain('$49.99'); // Fleece Jacket
    expect(priceTexts).toContain('$15.99'); // T-Shirt
    
    // Verify all items have quantity display
    const quantities = page.locator('.cart_quantity');
    const quantityCount = await quantities.count();
    expect(quantityCount).toBe(3);
    
    // Verify cart summary section shows items
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
    await expect(page.locator('text=Test.allTheThings()')).toBeVisible();
  });
});
