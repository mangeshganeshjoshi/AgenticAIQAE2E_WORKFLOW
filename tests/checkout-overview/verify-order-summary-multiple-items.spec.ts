// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Verify order summary with multiple items of different prices', async ({ page }) => {
    // 1. Login and add 3 items with different prices
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // $29.99
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click(); // $9.99
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click(); // $15.99
    
    // Verify all 3 items are in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
    
    // 2. Proceed through checkout
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify checkout overview shows all 3 items
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.cart_item')).toHaveCount(3);
    
    // 3. Verify Item total: $29.99 + $9.99 + $15.99 = $55.97
    const subtotal = page.locator('text=Item total:').locator('..').locator('text=$55.97');
    await expect(subtotal).toBeVisible();
    
    // 4. Verify Tax: $55.97 * 0.08 ≈ $4.48
    const tax = page.locator('text=Tax:').locator('..').locator('text=$4.48');
    await expect(tax).toBeVisible();
    
    // 5. Verify Total: $55.97 + $4.48 = $60.45
    const total = page.locator('text=Total:').locator('..').locator('text=$60.45');
    await expect(total).toBeVisible();
  });
});
