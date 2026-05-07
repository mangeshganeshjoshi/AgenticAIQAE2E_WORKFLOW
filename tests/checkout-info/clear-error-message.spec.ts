// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Clear error message', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Click 'Continue' without filling any fields
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify error message appears: 'Error: First Name is required'
    const errorMessage = page.locator('h3:has-text("Error:")');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
    
    // 3. Click the close button (X) on the error message
    const closeButton = page.locator('[data-test="error-button"]');
    await closeButton.click();
    
    // Verify error message is closed/hidden
    await expect(errorMessage).not.toBeVisible();
    
    // Verify form is still visible and accessible
    await expect(page.locator('[data-test=firstName]')).toBeVisible();
    await expect(page.locator('[data-test=lastName]')).toBeVisible();
    await expect(page.locator('[data-test=postalCode]')).toBeVisible();
  });
});
