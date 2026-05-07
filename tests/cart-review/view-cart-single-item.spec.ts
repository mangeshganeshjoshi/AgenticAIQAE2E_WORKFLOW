// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Review Tests', () => {
  test('View cart with single item', async ({ page }) => {
    // 1. Login with standard_user / secret_sauce credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is logged in and on inventory page
    await expect(page).toHaveURL(/inventory/);
    
    // 2. Locate and click 'Add to cart' button for 'Sauce Labs Backpack' product ($29.99)
    const backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await backpackAddButton.click();
    
    // Verify button changed to 'Remove'
    const backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(backpackRemoveButton).toBeVisible();
    
    // 3. Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');
    
    // Verify cart page loads successfully
    await expect(page).toHaveURL(/cart/);
    
    // Verify page title shows 'Your Cart'
    await expect(page.locator('text=Your Cart')).toBeVisible();
    
    // Verify cart item count badge shows '1'
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
    
    // 4. Verify cart contents
    // Verify 'Sauce Labs Backpack' is displayed in the cart
    await expect(page.locator('a:has-text("Sauce Labs Backpack")')).toBeVisible();
    
    // Verify Quantity shows '1'
    const cartQuantity = page.locator('.cart_quantity').first();
    await expect(cartQuantity).toHaveText('1');
    
    // Verify product description is visible
    await expect(page.locator('text=carry.allTheThings()')).toBeVisible();
    
    // Verify price shows '$29.99'
    const price = page.locator('.cart_item .inventory_item_price').first();
    await expect(price).toHaveText('$29.99');
    
    // 5. Verify cart has 'Continue Shopping' and 'Checkout' buttons
    // Verify both buttons are visible and enabled
    const continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/ });
    const checkoutButton = page.getByRole('button', { name: 'Checkout' });
    
    await expect(continueShoppingButton).toBeVisible();
    await expect(continueShoppingButton).toBeEnabled();
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });
});
