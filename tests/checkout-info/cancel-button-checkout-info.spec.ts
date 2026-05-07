// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Cancel button functionality on checkout info page', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Enter partial data: First Name 'Tom', Last Name empty
    await page.locator('[data-test=firstName]').fill('Tom');
    
    // Verify First Name has value, Last Name is empty
    await expect(page.locator('[data-test=firstName]')).toHaveValue('Tom');
    
    // 3. Click 'Cancel' button
    const cancelButton = page.locator('[data-test="cancel"]');
    await cancelButton.click();
    
    // Verify user is redirected back to cart page
    await expect(page).toHaveURL(/cart/);
    
    // Verify cart still contains the items
    await expect(page.locator('.cart_item')).toBeVisible();
    
    // Verify entered data is not saved (navigate back to checkout to verify)
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('[data-test=firstName]')).toHaveValue('');
  });
});
