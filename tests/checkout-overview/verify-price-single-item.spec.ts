// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test('Verify price calculations with single high-priced item', async ({ page }) => {
    // 1. Login and add single item: Fleece Jacket ($49.99)
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    
    // Verify item is added
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    
    // 2. Proceed through checkout
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await page.locator('[data-test=firstName]').fill('John');
    await page.locator('[data-test=lastName]').fill('Doe');
    await page.locator('[data-test=postalCode]').fill('90210');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify checkout overview page is displayed
    await expect(page).toHaveURL(/checkout-step-two/);
    
    // 3. Verify Item total: $49.99
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $49.99');
    
    // 4. Verify Tax calculation: $49.99 * 0.08 ≈ $4.00
    await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $4.00');
    
    // 5. Verify Total: $49.99 + $4.00 = $53.99
    await expect(page.locator('.summary_total_label')).toHaveText('Total: $53.99');
  });
});
