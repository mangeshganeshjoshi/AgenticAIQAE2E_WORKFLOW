import { test, expect } from '@playwright/test';

test.describe('SAP Fiori Fixed Asset Creation - AC2: Asset Creation', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to Create Asset screen
    await page.goto('https://sap-s1q-web.lower.internal.sephora.com:49001/sap/bc/ui2/flp?saml2=disabled&sap-client=300&sap-language=EN#Launchpad-openFLPPage?pageId=ZP_FUN_SUPL_CUSTM&spaceId=ZS_IT_FUN_FIORI');

    await page.locator('[data-testid="username-input"]').fill('MJOSHI');
    await page.locator('[data-testid="password-input"]').fill('Te$t123456');
    await page.locator('[data-testid="login-button"]').click();

    // Navigate to Create Asset
    await page.locator('[data-testid="search-input"]').fill('Create Asset');
    await page.locator('[data-testid="search-button"]').click();
    await page.locator('[data-testid="create-asset-tile"]').click();
  });

  test('should create new asset successfully', async ({ page }) => {
    // Enter initial asset details
    await page.locator('[data-testid="asset-class-field"]').selectOption('US21841');
    await page.locator('[data-testid="company-code-field"]').fill('US10');

    // Click Master Data button
    await page.locator('[data-testid="master-data-button"]').click();

    // Verify Master Data screen appears
    await expect(page.locator('[data-testid="master-data-screen"]')).toBeVisible();

    // Fill master data
    await page.locator('[data-testid="description-field"]').fill('Test description');

    // Navigate to Time-Dependent tab
    await page.locator('[data-testid="time-dependent-tab"]').click();

    // Fill time-dependent data
    await page.locator('[data-testid="cost-center-field"]').fill('USJ1201');
    await page.locator('[data-testid="location-field"]').fill('100');

    // Click Save
    await page.locator('[data-testid="save-button"]').click();

    // Verify success notification
    await expect(page.locator('[data-testid="success-notification"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-notification"]')).toContainText('Asset created successfully');

    // Click view details
    await page.locator('[data-testid="view-details-link"]').click();

    // Verify asset details
    await expect(page.locator('[data-testid="asset-description"]')).toHaveText('Test description');
    await expect(page.locator('[data-testid="asset-cost-center"]')).toHaveText('USJ1201');
    await expect(page.locator('[data-testid="asset-location"]')).toHaveText('100');
  });

  test('should validate mandatory fields', async ({ page }) => {
    // Click Master Data without filling required fields
    await page.locator('[data-testid="master-data-button"]').click();

    // Verify validation messages
    await expect(page.locator('[data-testid="asset-class-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-code-error"]')).toBeVisible();
  });
});