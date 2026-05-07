// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Submit form with empty fields - all fields empty', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed with empty fields
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Click 'Continue' button without filling any fields
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify form submission is prevented
    // Verify error message appears at top: 'Error: First Name is required'
    const errorMessage = page.locator('h3:has-text("Error:")');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
    
    // Verify user remains on checkout step one page
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // Verify error message has a close button
    const closeButton = page.locator('[data-test="error-button"]');
    await expect(closeButton).toBeVisible();
  });
});
