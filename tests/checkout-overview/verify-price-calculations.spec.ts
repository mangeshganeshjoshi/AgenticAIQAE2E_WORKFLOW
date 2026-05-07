// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Verify price calculations - subtotal, tax, and total', async ({ page }) => {
    // 1. Login and add two items: Backpack ($29.99) and T-Shirt ($15.99)
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Verify items are added to cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    
    // 2. Proceed through checkout with valid information
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify checkout overview page is displayed
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // 3. Verify Item total calculation: $29.99 + $15.99 = $45.98
    const subtotal = page.locator('text=Item total:').locator('..').locator('text=$45.98');
    await expect(subtotal).toBeVisible();
    
    // 4. Verify Tax calculation (approximately 8% of subtotal): $45.98 * 0.08 ≈ $3.68
    const tax = page.locator('text=Tax:').locator('..').locator('text=$3.68');
    await expect(tax).toBeVisible();
    
    // 5. Verify Total calculation: $45.98 + $3.68 = $49.66
    const total = page.locator('text=Total:').locator('..').locator('text=$49.66');
    await expect(total).toBeVisible();
  });
});
