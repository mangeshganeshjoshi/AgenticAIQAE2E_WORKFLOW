// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Cancel button functionality on overview page', async ({ page }) => {
    // 1. Login and add items to cart, proceed to checkout overview
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
    
    // 2. Click 'Cancel' button
    const cancelButton = page.locator('[data-test="cancel"]');
    await cancelButton.click();
    
    // Verify user is redirected back to the inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // Verify cart still contains the added item via cart badge
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
