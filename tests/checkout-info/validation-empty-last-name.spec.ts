// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Submit form with empty Last Name', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Enter First Name: 'Jane', leave Last Name empty, enter Zip: '54321'
    await page.locator('[data-test=firstName]').fill('Jane');
    await page.locator('[data-test=postalCode]').fill('54321');
    
    // Verify First Name and Zip have values, Last Name is empty
    await expect(page.locator('[data-test=firstName]')).toHaveValue('Jane');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('54321');
    
    // 3. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify error message appears: 'Error: Last Name is required'
    const errorMessage = page.locator('h3:has-text("Error:")');
    await expect(errorMessage).toContainText('Last Name is required');
    
    // Verify user remains on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // Verify First Name and Zip values are preserved
    await expect(page.locator('[data-test=firstName]')).toHaveValue('Jane');
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('54321');
  });
});
