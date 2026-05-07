// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Completion Tests', () => {
  test('Verify order completion page elements', async ({ page }) => {
    // 1. Complete a full checkout flow
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
    
    // 2. Verify Pony Express image is displayed
    const ponyExpressImage = page.locator('img[alt="Pony Express"]');
    await expect(ponyExpressImage).toBeVisible();
    
    // 3. Verify 'Back Home' button is displayed
    const backHomeButton = page.getByRole('button', { name: /Back Home/ });
    await expect(backHomeButton).toBeVisible();
    await expect(backHomeButton).toBeEnabled();
  });
});
