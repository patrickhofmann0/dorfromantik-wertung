import { v4 as uuidv4 } from 'uuid';


export class Wertung {
    punkteAuftragFeld: number = 0;
    punkteAuftragWald: number = 0;
    punkteAuftragDorf: number = 0;
    punkteAufragFluss: number = 0;
    punkteAuftragSchiene: number = 0;
    punkteLaengsteSchiene: number= 0;;
    punkteLaengsteFluss: number = 0;

    punkteAbgeschlosseneFahnenWald: number = 0;
    punkteAbgeschlosseneFahnenFeld: number = 0;
    punkteAbgeschlosseneFahnenDorf: number = 0;

    id: string = uuidv4();
    dateCreated!: Date;

    punkteFreigespieltHerzen: number =  0;
    punkteFreigespieltZirkus: number =  0;
    punkteFreigespieltBahnwaerter: number =  0;
    punkteFreigespieltSchaeferin: number =  0;
    punkteFreigespieltHuegel: number =  0;
    punkteFreigespieltBaustelle: number =  0;
    punkteFreigespieltBallonStartplatz: number =  0;
    punkteFreigespieltGoldenesHerz: number =  0;
    punkteFreigespieltWaldhuette: number =  0;
    punkteFreigespieltErntefest: number =  0;
    punkteFreigespieltWachturm: number =  0;
    punkteFreigespieltLokomotive: number =  0;
    punkteFreigespieltSchiff: number =  0;
    punkteFreigespieltBahnhof: number =  0;
    punkteFreigespieltHafen: number =  0;

    gesamtPunkte!: number;
    punkteAuftrag!: number;
    punkteLaengste!: number
    punkteFahnen!: number;
    punkteFreigespielt!: number;

    getFreigespieltPunkteListe(): number[] {
        return [
            this.punkteFreigespieltHerzen,
            this.punkteFreigespieltZirkus,
            this.punkteFreigespieltBahnwaerter,
            this.punkteFreigespieltSchaeferin,
            this.punkteFreigespieltHuegel,
            this.punkteFreigespieltBaustelle,
            this.punkteFreigespieltBallonStartplatz,
            this.punkteFreigespieltGoldenesHerz,
            this.punkteFreigespieltWaldhuette,
            this.punkteFreigespieltErntefest,
            this.punkteFreigespieltWachturm,
            this.punkteFreigespieltLokomotive,
            this.punkteFreigespieltSchiff,
            this.punkteFreigespieltBahnhof,
            this.punkteFreigespieltHafen
        ];
    }

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