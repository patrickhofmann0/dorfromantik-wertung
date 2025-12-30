import { Injectable } from '@angular/core';
import { Kampagne } from './model/kampagne';
import { L } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class KampagneService {

  keyKampagnenList = 'kampagnenList';

  saveKampagne(kampagne: Kampagne): void {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList) ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!) : [];
    kampagnenList.push(kampagne);
    localStorage.setItem(this.keyKampagnenList, JSON.stringify(kampagnenList));
  }

  getKampagnen(): Kampagne[] {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList) ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!) : [];
    return kampagnenList;
  }   
  
  deleteKampagne(id: string) {
      const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList) ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!) : [];
      const updatedList = kampagnenList.filter(kampagne => kampagne.id !== id);
      localStorage.setItem(this.keyKampagnenList, JSON.stringify(updatedList));
  } 

  getKampagneById(id: string): Kampagne | undefined {
    const kampagnenList: Kampagne[] = localStorage.getItem(this.keyKampagnenList) ? JSON.parse(localStorage.getItem(this.keyKampagnenList)!) : [];
    return kampagnenList.find(kampagne => kampagne.id === id);
  }
  
}
