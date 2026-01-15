import { Injectable } from '@angular/core';
import { Kampagne } from './model/kampagne';
import { L } from '@angular/cdk/keycodes';
import { Wertung } from './model/wertung';

/**
 * Service for managing `Kampagne` data.
 * It uses the local storage to persist the data.
 */
@Injectable({
  providedIn: 'root',
})
export class KampagneService {
  keyKampagnenList = 'kampagnenList';

  /**
   * Saves a new campaign.
   * @param kampagne The campaign to save.
   */
  saveKampagne(kampagne: Kampagne): void {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    kampagnenList.push(kampagne);
    localStorage.setItem(this.keyKampagnenList, JSON.stringify(kampagnenList));
  }

  /**
   * Returns all campaigns.
   */
  getKampagnen(): Kampagne[] {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    return kampagnenList;
  }

  /**
   * Deletes a campaign by its id.
   * @param id The id of the campaign to delete.
   */
  deleteKampagne(id: string) {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    const updatedList = kampagnenList.filter((kampagne) => kampagne.id !== id);
    localStorage.setItem(this.keyKampagnenList, JSON.stringify(updatedList));
  }

  /**
   * Returns a campaign by its id.
   * @param id The id of the campaign to return.
   */
  getKampagneById(id: string): Kampagne | undefined {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    return kampagnenList.find((kampagne) => kampagne.id === id);
  }

  /**
   * Adds a new `Wertung` to a campaign.
   * @param kampagneId The id of the campaign.
   * @param wertung The `Wertung` to add.
   */
  addWertungToKampagne(kampagneId: string, wertung: Wertung) {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    const kampagne = kampagnenList.find((k) => k.id === kampagneId);
    if (kampagne) {
      kampagne.wertungen.push(wertung);
      localStorage.setItem(this.keyKampagnenList, JSON.stringify(kampagnenList));
    }
  }

  /**
   * Updates a campaign.
   * @param kampagne The campaign to update.
   */
  updateKampagne(kampagne: Kampagne): void {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList)
      ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!)
      : [];
    const index = kampagnenList.findIndex((k) => k.id === kampagne.id);
    if (index !== -1) {
      kampagnenList[index] = kampagne;
      localStorage.setItem(this.keyKampagnenList, JSON.stringify(kampagnenList));
    }
  }
}
