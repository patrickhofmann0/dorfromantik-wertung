import { Wertung } from './wertung';
import { WertungCalculator } from './wertungCalculator';

class MockWertung extends Wertung {
  constructor() {
    super();
    this.punkteAuftragFeld = 0;
    this.punkteAuftragWald = 0;
    this.punkteAuftragDorf = 0;
    this.punkteAufragFluss = 0;
    this.punkteAuftragSchiene = 0;
    this.punkteLaengsteSchiene = 0;
    this.punkteLaengsteFluss = 0;
    this.punkteAbgeschlosseneFahnenWald = 0;
    this.punkteAbgeschlosseneFahnenFeld = 0;
    this.punkteAbgeschlosseneFahnenDorf = 0;
  }
}

describe('WertungCalculator', () => {
  let wertung: MockWertung;
  let calculator: WertungCalculator;

  beforeEach(() => {
    wertung = new MockWertung();
    calculator = new WertungCalculator(wertung);
  });

  it('should create an instance', () => {
    expect(calculator).toBeTruthy();
  });

  describe('calculateAufragScore', () => {
    it('should return 0 for default values', () => {
      expect(calculator.calculateAufragScore()).toBe(0);
    });

    it('should return the sum of the auftrag punkte', () => {
      wertung.punkteAuftragFeld = 1;
      wertung.punkteAuftragWald = 2;
      wertung.punkteAuftragDorf = 3;
      wertung.punkteAufragFluss = 0;
      wertung.punkteAuftragSchiene = 0;
      expect(calculator.calculateAufragScore()).toBe(6);
    });
  });

  describe('calculatLaengsteScore', () => {
    it('should return the sum of laengste fluss and schiene', () => {
      wertung.punkteLaengsteFluss = 10;
      wertung.punkteLaengsteSchiene = 5;
      expect(calculator.calculatLaengsteScore()).toBe(15);
    });
  });

  describe('calculateFahnenScore', () => {
    it('should return 0 for default values', () => {
      expect(calculator.calculateFahnenScore()).toBe(0);
    });

    it('should return the sum of the fahnen punkte', () => {
      wertung.punkteAbgeschlosseneFahnenFeld = 4;
      wertung.punkteAbgeschlosseneFahnenWald = 5;
      wertung.punkteAbgeschlosseneFahnenDorf = 6;
      expect(calculator.calculateFahnenScore()).toBe(15);
    });
  });

  describe('calculateTotalScore', () => {
    it('should return the sum of all scores', () => {
      wertung.punkteAuftragFeld = 1;
      wertung.punkteAuftragWald = 2;
      wertung.punkteAuftragDorf = 3;
      wertung.punkteLaengsteFluss = 10;
      wertung.punkteLaengsteSchiene = 5;
      wertung.punkteAbgeschlosseneFahnenFeld = 4;
      wertung.punkteAbgeschlosseneFahnenWald = 5;
      wertung.punkteAbgeschlosseneFahnenDorf = 6;
      expect(calculator.calculateTotalScore()).toBe(36);
    });
  });
});
