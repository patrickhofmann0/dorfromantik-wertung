import { v4 as uuidv4 } from 'uuid';
import { Wertung } from './wertung';
import { KampagnePfad, getKampagnenPfadListe } from './kampagneFortschritt';

export class Kampagne {
  id: string = uuidv4();
  name!: string;
  spielleiter!: string;
  anzahlSpieler = 1;
  startDate!: Date;
  wertungen: Wertung[] = [];
  pfade: KampagnePfad[] = getKampagnenPfadListe();
}
