// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('Checkout button navigation from cart', async ({ page }) => {
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
    
    // Verify cart page displays
    await expect(page).toHaveURL(/cart/);
    
    // 3. Click 'Checkout' button
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Verify user is redirected to checkout step one page
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // Verify checkout form with First Name, Last Name, and Zip/Postal Code fields is displayed
    await expect(page.locator('[data-test=firstName]')).toBeVisible();
    await expect(page.locator('[data-test=lastName]')).toBeVisible();
    await expect(page.locator('[data-test=postalCode]')).toBeVisible();
  });
});
