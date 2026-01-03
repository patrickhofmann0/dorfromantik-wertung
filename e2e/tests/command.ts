import { Page } from "@playwright/test";

// utility method for click on button with given name
export async function clickButtonByLabel(page: Page, label: string) {
  await page.getByRole('button', { name: label }).click();
}

export async function fillTextboxByLabel(page: Page, label: string, text: string) {
  await page.getByRole('textbox', { name: label }).click();
  await page.getByRole('textbox', { name: label }).fill(text);
}

export async function fillNumberboxByLabel(page: Page, label: string, number: string | number) {
  await page.getByRole('spinbutton', { name: label }).click();
  await page.getByRole('spinbutton', { name: label }).fill(number.toString());
}


// kampagne erstellen
export async function createKampagne(page: Page, 
  name: string, 
  spielleiter: string, 
  anzahlSpieler: string | number) {
  await clickButtonByLabel(page, 'Neue Kampagne anlegen');    
  await fillTextboxByLabel(page, 'Name der Kampagne', name);
  await fillTextboxByLabel(page, 'Spielleiter', spielleiter);
  await fillNumberboxByLabel(page, 'Anzahl der Spieler', anzahlSpieler);
  await clickButtonByLabel(page, 'Kampagne erstellen');


}