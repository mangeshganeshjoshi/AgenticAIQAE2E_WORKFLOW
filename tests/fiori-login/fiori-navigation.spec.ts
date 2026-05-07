import { test, expect } from '@playwright/test';

test.describe('SAP Fiori Fixed Asset Creation - AC1: Login and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to SAP Fiori launchpad
    await page.goto('https://sap-s1q-web.lower.internal.sephora.com:49001/sap/bc/ui2/flp?saml2=disabled&sap-client=300&sap-language=EN#Launchpad-openFLPPage?pageId=ZP_FUN_SUPL_CUSTM&spaceId=ZS_IT_FUN_FIORI');

    // Login process
    await page.locator('[data-testid="username-input"]').fill('MJOSHI');
    await page.locator('[data-testid="password-input"]').fill('Te$t123456');
    await page.locator('[data-testid="login-button"]').click();

    // Verify login success
    await expect(page.locator('.sapFioriLaunchpad')).toBeVisible();
  });

  test('should navigate to Create Asset tile successfully', async ({ page }) => {
    // Use search to find Create Asset tile
    await page.locator('[data-testid="search-input"]').fill('Create Asset');
    await page.locator('[data-testid="search-button"]').click();

    // Click on Create Asset tile
    await page.locator('[data-testid="create-asset-tile"]').click();

    // Verify Create Asset initial screen
    await expect(page.locator('[data-testid="asset-class-field"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-code-field"]')).toBeVisible();
    await expect(page.locator('[data-testid="master-data-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="depreciation-areas-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="exit-button"]')).toBeVisible();
  });
});