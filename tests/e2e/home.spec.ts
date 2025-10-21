import { test, expect } from '@playwright/test';

test('homepage has hero and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Stop Fighting Fires/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request a Demo/i })).toBeVisible();
});
