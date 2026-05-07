// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation and Flow Tests', () => {
  test('Navigate back from checkout overview to cart using Cancel button', async ({ page }) => {
    // 1. Add items to cart and proceed to checkout overview
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
    
    // Verify checkout overview page is displayed
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // 2. Click 'Cancel' button
    const cancelButton = page.locator('[data-test="cancel"]');
    await cancelButton.click();
    
    // Verify user is redirected to the inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // Verify the cart still contains the item via the cart badge
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    
    // 3. Open the cart and checkout again
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await page.getByRole('button', { name: 'Checkout' }).click();
    
    // Verify checkout form displays (fields should be empty for a new attempt)
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
  });
});
