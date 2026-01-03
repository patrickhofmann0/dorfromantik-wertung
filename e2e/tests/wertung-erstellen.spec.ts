import { test, expect } from '@playwright/test';
import { clickButtonByLabel, createKampagne, fillNumberboxByLabel, fillTextboxByLabel } from './command';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test('new wertung only allgemein should be created and visible in kampagne details', async ({ page }) => {
    await createKampagne(page, 'Kampagne-Test', 'leiter', 4);
    await clickButtonByLabel(page, 'Kampagne-Test');
    await clickButtonByLabel(page, 'Zur Kampagne');
    await clickButtonByLabel(page, 'Neue Wertung');
    await fillNumberboxByLabel(page, 'Punkte Auftrag Feld', 50);
    await fillNumberboxByLabel(page, 'Punkte Auftrag Wald', 30);
    await fillNumberboxByLabel(page, 'Punkte Auftrag Dorf', 20);
    await fillNumberboxByLabel(page, 'Punkte Auftrag Fluss', 10);
    await fillNumberboxByLabel(page, 'Punkte Auftrag Schiene', 5);
    await fillNumberboxByLabel(page, 'Punkte längste Schiene', 40);
    await fillNumberboxByLabel(page, 'Punkte längster Fluss', 25);
    await fillNumberboxByLabel(page, 'Punkte abgeschlossene Fahnen Wald', 15);
    await fillNumberboxByLabel(page, 'Punkte abgeschlossene Fahnen Feld', 15);
    await fillNumberboxByLabel(page, 'Punkte abgeschlossene Fahnen Dorf', 15);
    await clickButtonByLabel(page, 'Wertung speichern');

    // check if the current date is shown as wertung name
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();
    const dateString = `${day}.${month}.${year}`;
    await expect(page.locator('mat-panel-title')).toContainText(dateString);
});
