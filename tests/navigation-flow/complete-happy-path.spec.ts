// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and Flow Tests', () => {
  test('Complete happy path from login to order confirmation', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveURL(/\//);
    
    // 2. Enter username 'standard_user' and password 'secret_sauce'
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Verify credentials are entered in respective fields
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');
    
    // 3. Click 'Login' button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is logged in and redirected to inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // 4. Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verify item is added; button shows 'Remove'
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    
    // 5. Add Sauce Labs Bolt T-Shirt to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Verify item is added; cart badge shows '2'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    
    // 6. Navigate to cart
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart shows both items
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    
    // 7. Click 'Checkout' button
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 8. Fill checkout form: First Name 'John', Last Name 'Doe', Zip '90210'
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    
    // Verify all fields are filled
    await expect(page.locator('[data-test=firstName]')).toHaveValue('John');
    await expect(page.locator('[data-test=lastName]')).toHaveValue('Doe');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('90210');
    
    // 9. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify checkout overview page is displayed with items and totals
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    
    // 10. Verify order details and click 'Finish' button
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify order completion page is displayed with success message
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    
    // 11. Click 'Back Home' button
    await page.getByRole('button', { name: /Back Home/ }).click();
    
    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // Verify user can add more items to a fresh cart
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  });
});
