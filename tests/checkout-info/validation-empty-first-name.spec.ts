// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Submit form with empty First Name', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Leave First Name empty, enter Last Name: 'Doe', enter Zip: '12345'
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('12345');
    
    // Verify Last Name and Zip fields have values, First Name is empty
    await expect(page.locator('[data-test=lastName]')).toHaveValue('Doe');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('12345');
    
    // 3. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify error message appears: 'Error: First Name is required'
    const errorMessage = page.locator('h3:has-text("Error:")');
    await expect(errorMessage).toContainText('First Name is required');
    
    // Verify user remains on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // Verify previously entered data in Last Name and Zip is preserved
    await expect(page.locator('[data-test=lastName]')).toHaveValue('Doe');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('12345');
  });
});
