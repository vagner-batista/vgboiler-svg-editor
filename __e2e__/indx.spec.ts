import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Ir para página', () => {
  test('Contém header', async ({ page }) => {
    await page.goto('http://localhost:3000/sobre');
    await page.screenshot({ fullPage: true });
  });
});
