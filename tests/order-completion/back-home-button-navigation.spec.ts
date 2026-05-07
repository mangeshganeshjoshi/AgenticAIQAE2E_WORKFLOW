// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Completion Tests', () => {
  test('Back Home button navigation', async ({ page }) => {
    // 1. Complete a full checkout to reach order completion page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('button', { name: 'Finish' }).click();
    
    // Verify order completion page is displayed
    await expect(page).toHaveURL(/checkout-complete/);
    
    // 2. Click 'Back Home' button
    const backHomeButton = page.getByRole('button', { name: /Back Home/ });
    await backHomeButton.click();
    
    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // Verify inventory page displays all available products
    await expect(page.locator('text=Products')).toBeVisible();
    
    // Verify user can add items to cart again
    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartButton).toBeVisible();
  });
});
