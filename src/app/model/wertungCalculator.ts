import { Wertung } from "./wertung";

export class WertungCalculator {

    private wertung: Wertung;

    constructor(wertung: Wertung) {
        this.wertung = wertung;
    }

    calculateAufragScore(): number {
        return this.wertung.getAuftragPunkteListe().reduce((a, b) => a + b, 0);
    }

    calculatLaengsteScore(): number {
        return this.wertung.punkteLaengsteFluss + this.wertung.punkteLaengsteSchiene;
    }

    calculateFahnenScore(): number {
        return this.wertung.getFahnenPunkteListe().reduce((a, b) => a + b, 0);
    }

    calculateTotalScore(): number {
        return this.calculateAufragScore() 
        + this.calculatLaengsteScore() 
        + this.calculateFahnenScore()
        + this.calculateFreigespieltScore();
    }

    calculateFreigespieltScore(): number {
        return this.wertung.getFreigespieltPunkteListe().reduce((a, b) => a + b, 0);
    }

}