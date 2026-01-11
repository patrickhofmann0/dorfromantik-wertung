import { test, expect } from '@playwright/test';
import { clickButtonByLabel, createKampagne, fillTextboxByLabel } from './command';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('kampagne erstellen soll sichtbar in der kampagnenliste sein', async ({ page }) => {
  await createKampagne(page, 'test', 'tesr', 13);

  await expect(page.locator('summary')).toContainText('test');
  await page.locator('summary').click();
  await expect(page.getByRole('table')).toContainText('Spielleiter');
  await expect(page.getByRole('table')).toContainText('Anzahl der Spieler');
  await expect(page.getByRole('table')).toContainText('tesr');
  await expect(page.getByRole('table')).toContainText('1');
});

test('Fehler bei leerem Namen anzeigen', async ({ page }) => {
  await createKampagne(page, '', 'tesr', 13);
  await expect(page.getByText('Name der Kampagne ist erforderlich.')).toBeVisible();
});

test('Fehler bei leerem Spielleiter anzeigen', async ({ page }) => {
  await createKampagne(page, 'test', '', 13);
  await expect(page.getByText('Name des Spielleiters ist erforderlich.')).toBeVisible();
});

test('Fehler bei ungültiger Spieleranzahl anzeigen', async ({ page }) => {
  await createKampagne(page, 'test', 'tesr', '');
  await clickButtonByLabel(page, 'Kampagne erstellen');
  await expect(page.getByText('Die Anzahl der Spieler ist erforderlich.')).toBeVisible();
});
