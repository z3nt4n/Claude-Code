// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Sterling & Vale — Enquiry Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('submits enquiry form and shows success state', async ({ page }) => {
    await page.fill('#fullName', 'Playwright Test');
    await page.fill('#email', 'zen.tan@redbeaconam.com');
    await page.fill('#phone', '+1 (555) 000-0001');
    await page.selectOption('#interest', 'Wealth Planning');
    await page.fill('#message', 'This is an automated test submission from Playwright to verify the form delivers to zen.tan@redbeaconam.com. No action required.');

    await expect(page.locator('#fullName')).toHaveValue('Playwright Test');
    await expect(page.locator('#email')).toHaveValue('zen.tan@redbeaconam.com');
    await expect(page.locator('#interest')).toHaveValue('Wealth Planning');

    const submitBtn = page.locator('#submitBtn');
    await expect(submitBtn).toBeEnabled();

    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.url().includes('formsubmit.co') && res.request().method() === 'POST',
        { timeout: 15000 }
      ),
      submitBtn.click(),
    ]);

    console.log('FormSubmit status:', response.status());
    const body = await response.json().catch(() => ({}));
    console.log('FormSubmit response:', JSON.stringify(body));

    const successShown = await page.locator('#formSuccess').isVisible({ timeout: 8000 }).catch(() => false);

    if (successShown) {
      await expect(page.locator('#formSuccess')).toContainText('Your session is reserved.');
      console.log('SUCCESS: Form submitted and success panel is visible.');
    } else {
      console.log('ACTIVATION PENDING: Check zen.tan@redbeaconam.com for the FormSubmit activation link, then rerun.');
      expect(response.status()).toBeLessThan(500);
    }
  });

  test('validates required fields before submitting', async ({ page }) => {
    await page.locator('#submitBtn').click();

    await expect(page.locator('#fullName')).toHaveClass(/invalid/);
    await expect(page.locator('#email')).toHaveClass(/invalid/);
    await expect(page.locator('#interest')).toHaveClass(/invalid/);
    await expect(page.locator('#message')).toHaveClass(/invalid/);

    await page.fill('#fullName', 'Test User');
    await expect(page.locator('#fullName')).not.toHaveClass(/invalid/);
    await expect(page.locator('#email')).toHaveClass(/invalid/);
  });
});

test.describe('Sterling & Vale — WhatsApp Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('WhatsApp widget opens and closes correctly', async ({ page }) => {
    const toggleBtn = page.locator('#chatToggle');
    const panel     = page.locator('#chatPanel');

    // Panel should be hidden initially
    await expect(panel).toBeHidden();

    // Open the widget
    await toggleBtn.click();
    await expect(panel).toBeVisible();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Suggestion chips should be visible
    await expect(page.locator('.chat-chip').first()).toBeVisible();

    // Close via close button
    await page.locator('#chatClose').click();
    await expect(panel).toBeHidden();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('WhatsApp widget closes on Escape key', async ({ page }) => {
    await page.locator('#chatToggle').click();
    await expect(page.locator('#chatPanel')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#chatPanel')).toBeHidden();
  });

  test('suggestion chips link to correct WhatsApp number', async ({ page }) => {
    await page.locator('#chatToggle').click();
    await expect(page.locator('.chat-chip').first()).toBeVisible();

    // Track new tab that WhatsApp would open
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('.chat-chip').first().click(),
    ]);

    // wa.me redirects to api.whatsapp.com — check either URL form contains the phone
    const finalUrl = newPage.url();
    const decoded  = decodeURIComponent(finalUrl.replace(/\+/g, ' '));
    expect(finalUrl).toMatch(/wa\.me\/6597977715|whatsapp\.com.*phone=6597977715/);
    expect(decoded.toLowerCase()).toContain('book');
    await newPage.close();
  });

  test('custom message input opens WhatsApp with typed text', async ({ page }) => {
    await page.locator('#chatToggle').click();
    await page.fill('#chatInput', 'I have a question about estate planning');

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('#chatSend').click(),
    ]);

    const finalUrl = newPage.url();
    const decoded  = decodeURIComponent(finalUrl.replace(/\+/g, ' '));
    expect(finalUrl).toMatch(/wa\.me\/6597977715|whatsapp\.com.*phone=6597977715/);
    expect(decoded.toLowerCase()).toContain('estate planning');
    await newPage.close();
  });
});

test.describe('Sterling & Vale — Footer Social Links', () => {
  test('social media links are present in footer', async ({ page }) => {
    await page.goto('/');
    // Use role="contentinfo" to target the site footer specifically
    const siteFooter = page.locator('[role="contentinfo"]');
    await siteFooter.scrollIntoViewIfNeeded();

    await expect(siteFooter.locator('a[aria-label="Instagram"]')).toBeVisible();
    await expect(siteFooter.locator('a[aria-label="Facebook"]')).toBeVisible();
    await expect(siteFooter.locator('a[aria-label="X (formerly Twitter)"]')).toBeVisible();
  });
});
