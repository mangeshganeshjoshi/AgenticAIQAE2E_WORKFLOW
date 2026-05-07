// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Form fields are case-insensitive', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Enter all lowercase text: first name 'john', last name 'doe', zip '90210'
    await page.locator('[data-test=firstName]').fill('john');
    await page.locator('[data-test=lastName]').fill('doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    
    // Verify lowercase text is accepted in all fields
    await expect(page.locator('[data-test=firstName]')).toHaveValue('john');
    await expect(page.locator('[data-test=lastName]')).toHaveValue('doe');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('90210');
    
    // 3. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify form submits successfully
    // Verify user proceeds to checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
