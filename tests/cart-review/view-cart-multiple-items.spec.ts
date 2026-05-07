// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('View cart with multiple items', async ({ page }) => {
    // 1. Login with standard_user / secret_sauce credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is logged in
    await expect(page).toHaveURL(/inventory/);
    
    // 2. Add three different products to cart
    const backpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const bikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    const tshirtButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    
    await backpackButton.click();
    await bikeLightButton.click();
    await tshirtButton.click();
    
    // Verify all three items show 'Remove' buttons
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
    
    // Verify cart badge shows '3'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('3');
    
    // 3. Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // 4. Verify all three items are displayed in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);
    
    // Verify cart shows correct count
    await expect(cartBadge).toHaveText('3');
    
    // 5. Verify all item details in cart
    const itemRows = page.locator('.cart_item');
    
    // Verify all items display correctly
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    
    // Verify prices
    const prices = page.locator('.inventory_item_price');
    const priceTexts = await prices.allTextContents();
    expect(priceTexts).toContain('$29.99'); // Backpack
    expect(priceTexts).toContain('$9.99');  // Bike Light
    expect(priceTexts).toContain('$15.99'); // T-Shirt
    
    // Verify each item has description text
    const descriptions = page.locator('.inventory_item_desc');
    const descCount = await descriptions.count();
    expect(descCount).toBe(3);
  });
});
