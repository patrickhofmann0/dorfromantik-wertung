import { test, expect } from '@playwright/test';
import { clickButtonByLabel } from './command';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dorfromantik | Wertung/);
});

test('has create new kampagne button', async ({ page }) => {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');
});

test('has got to kampagne liste button', async ({ page }) => {
  await clickButtonByLabel(page, 'Zu meinen Kampagnen');
});
