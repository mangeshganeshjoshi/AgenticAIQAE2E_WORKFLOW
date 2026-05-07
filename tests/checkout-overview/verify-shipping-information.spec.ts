// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Verify shipping information display', async ({ page }) => {
    // 1. Login and add an item to cart, proceed to checkout overview
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Proceed to checkout overview
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify checkout overview page is displayed
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // 2. Locate Shipping Information section
    const shippingSection = page.locator('text=Shipping Information').first();
    await expect(shippingSection).toBeVisible();
    
    // 3. Verify shipping information content
    // Verify Shipping Information section shows 'Free Pony Express Delivery!'
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();
  });
});
