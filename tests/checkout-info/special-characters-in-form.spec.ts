// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Information Entry Tests', () => {
  test('Fill form with special characters', async ({ page }) => {
    // 1. Login and proceed to checkout step one form
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    
    // Verify checkout form is displayed
    await expect(page).toHaveURL(/checkout-step-one/);
    
    // 2. Enter First Name with special characters: 'Jean-Pierre'
    await page.locator('[data-test=firstName]').fill('Jean-Pierre');
    
    // Verify special characters (hyphen) are accepted in First Name field
    await expect(page.locator('[data-test=firstName]')).toHaveValue('Jean-Pierre');
    
    // 3. Enter Last Name with special characters: "O'Brien"
    await page.locator('[data-test=lastName]').fill("O'Brien");
    
    // Verify special characters (apostrophe) are accepted in Last Name field
    await expect(page.locator('[data-test=lastName]')).toHaveValue("O'Brien");
    
    // 4. Enter Zip/Postal Code with alphanumeric: 'SW1A 1AA'
    await page.locator('[data-test=postalCode]').fill('SW1A 1AA');
    
    // Verify alphanumeric zip code with space is accepted
    await expect(page.locator('[data-test=postalCode]')).toHaveValue('SW1A 1AA');
    
    // 5. Click 'Continue' button
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify form submits successfully
    // Verify user proceeds to checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
