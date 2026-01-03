import { Page } from "@playwright/test";

// utility method for click on button with given name
export async function clickButtonByLabel(page: Page, label: string) {
  await page.getByRole('button', { name: label }).click();
}

export async function fillTextboxByLabel(page: Page, label: string, text: string) {
  await page.getByRole('textbox', { name: label }).click();
  await page.getByRole('textbox', { name: label }).fill(text);
}