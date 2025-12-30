import { v4 as uuidv4 } from 'uuid';


export class Wertung {
    punkteAuftragFeld!: number;
    punkteAuftragWald!: number;
    punkteAuftragDorf!: number;
    punkteAufragFluss!: number;
    punkteAuftragSchiene!: number;

    punkteLaengsteSchiene!: number;
    punkteLaengsteFluss!: number;

    punkteAbgeschlosseneFahnenWald!: number;
    punkteAbgeschlosseneFahnenFeld!: number;
    punkteAbgeschlosseneFahnenDorf!: number;

    id: string = uuidv4();
    dateCreated!: Date ;

    getAuftragPunkteListe(): number[] {
        return [
            this.punkteAuftragFeld,
            this.punkteAuftragWald,
            this.punkteAuftragDorf,
            this.punkteAufragFluss,
            this.punkteAuftragSchiene
        ];
    }

    getFahnenPunkteListe(): number[] {
        return [
            this.punkteAbgeschlosseneFahnenFeld,
            this.punkteAbgeschlosseneFahnenWald,
            this.punkteAbgeschlosseneFahnenDorf
        ];
    }
    
    
}