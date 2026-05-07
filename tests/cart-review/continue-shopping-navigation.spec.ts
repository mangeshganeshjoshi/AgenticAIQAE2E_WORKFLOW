// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('Continue Shopping button navigation', async ({ page }) => {
    // 1. Login with standard_user / secret_sauce credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is on inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // 2. Add an item to cart and navigate to cart page
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart page displays with 1 item
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    
    // 3. Click 'Continue Shopping' button
    await page.getByRole('button', { name: /Continue Shopping/ }).click();
    
    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // Verify user can see all available products
    await expect(page.locator('text=Products')).toBeVisible();
    
    // Verify added item still shows 'Remove' button
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  });
});
