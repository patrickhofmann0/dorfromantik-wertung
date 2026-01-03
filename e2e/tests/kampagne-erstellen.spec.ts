import { test, expect } from '@playwright/test';
import { clickButtonByLabel, fillTextboxByLabel } from './command';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('kampagne erstellen soll sichtbar in der kampagnenliste sein', async ({ page }) => {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');    
  await fillTextboxByLabel(page, 'Name der Kampagne', 'test');
  await fillTextboxByLabel(page, 'Spielleiter', 'tesr');

  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).click();
  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).fill('13');
  await clickButtonByLabel(page, 'Kampagne erstellen');

  await expect(page.locator('mat-panel-title')).toContainText('test');
  await page.getByRole('button', { name: 'test' }).click();
  await expect(page.getByLabel('test').locator('div')).toContainText('Anzahl der Spieler: 13');
  await expect(page.getByLabel('test').locator('div')).toContainText('Spielleiter: tesr');
});


test('Fehler bei leerem Namen anzeigen', async ({ page }) => {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');    
  await fillTextboxByLabel(page, 'Name der Kampagne', '');
  await fillTextboxByLabel(page, 'Spielleiter', 'tesr');

  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).click();
  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).fill('13');
  await clickButtonByLabel(page, 'Kampagne erstellen');

  await expect(page.getByText('Name der Kampagne ist erforderlich.')).toBeVisible();
});

test('Fehler bei leerem Spielleiter anzeigen', async ({ page }) => {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');    
  await fillTextboxByLabel(page, 'Name der Kampagne', 'test');
  await fillTextboxByLabel(page, 'Spielleiter', '');

  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).click();
  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).fill('13');
  await clickButtonByLabel(page, 'Kampagne erstellen');

  await expect(page.getByText('Name des Spielleiters ist erforderlich.')).toBeVisible();
});

test('Fehler bei ungültiger Spieleranzahl anzeigen', async ({ page }) => {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');    
  await fillTextboxByLabel(page, 'Name der Kampagne', 'test');
  await fillTextboxByLabel(page, 'Spielleiter', 'tesr');

  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).click();
  await page.getByRole('spinbutton', { name: 'Anzahl der Spieler' }).fill('');
  await clickButtonByLabel(page, 'Kampagne erstellen');

  await expect(page.getByText('Die Anzahl der Spieler ist erforderlich.')).toBeVisible();
}); 