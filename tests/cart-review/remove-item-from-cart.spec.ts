// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('Remove item from cart', async ({ page }) => {
    // 1. Login and add 3 items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Add 3 items
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Verify user is logged in and 3 items are in cart
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
    
    // 2. Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart displays all 3 items
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(3);
    
    // 3. Click 'Remove' button for Sauce Labs Bike Light
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    
    // Verify Bike Light is removed from cart
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).not.toBeVisible();
    
    // Verify cart now shows 2 items
    await expect(cartItems).toHaveCount(2);
    
    // Verify remaining items are Backpack and T-Shirt
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    
    // Verify cart badge updates to '2'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    
    // 4. Click 'Remove' button for another item
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    
    // Verify item is removed successfully
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).not.toBeVisible();
    
    // Verify cart count decreases to 1
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    // Verify only T-Shirt remains in cart
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
  });
});
