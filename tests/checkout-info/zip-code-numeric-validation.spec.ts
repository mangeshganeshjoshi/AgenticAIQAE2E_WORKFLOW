// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Verify numeric-only validation for Zip Code', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Enter First Name: 'Test', Last Name: 'User'
    await page.locator('[data-test=firstName]').fill('Test');
    await page.locator('[data-test=lastName]').fill('User');
    
    // Verify values are entered
    await expect(page.locator('[data-test=firstName]')).toHaveValue('Test');
    await expect(page.locator('[data-test=lastName]')).toHaveValue('User');
    
    // 3. Enter only numeric Zip Code: '12345'
    await page.locator('[data-test=postalCode]').fill('12345');
    
    // Verify numeric zip code is accepted
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('12345');
    
    // 4. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify form submits successfully
    // Verify user proceeds to checkout overview
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
