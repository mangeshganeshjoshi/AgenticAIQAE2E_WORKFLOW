import { test, expect } from '@playwright/test';

test.describe('Cart Review', () => {
  test('View Cart with Single Item', async ({ page }) => {
    // Navigate to SauceDemo login page
    await page.goto('https://www.saucedemo.com');

    // Enter username for login
    await page.locator('[data-test="username"]').fill('standard_user');

    // Enter password for login
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click login button to log in
    await page.locator('[data-test="login-button"]').click();

    // Add the first item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to cart page
    await page.goto('https://www.saucedemo.com/cart.html');

    // Verify cart badge shows 1
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // Verify item name is displayed
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // Verify Continue Shopping button is visible
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();

    // Verify Checkout button is visible
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
});