export enum KampagneMeilenstein {
  START = 'START',
  ERSTE_SCHACHTEL_OFFNEN = 'ERSTE_SCHACHTEL_OFFNEN',
  ZWEITE_SCHACHTEL_OFFNEN = 'ZWEITE_SCHACHTEL_OFFNEN',
  BAUERNDORF_ERREICHT = 'BAUERNDORF_ERREICHT',
  WALDDORF_ERREICHT = 'WALDDORF_ERREICHT',
  STADTDORF_ERREICHT = 'STADTDORF_ERREICHT',
  BAECKERDORF_ERREICHT = 'BAECKERDORF_ERREICHT',
}

export class KampagnePfad {
  vonA!: KampagneMeilenstein;
  nachB!: KampagneMeilenstein;
  kosten!: number;
}

export function getKampagnenPfadListe(): KampagnePfad[] {
  return [
    {
      vonA: KampagneMeilenstein.START,
      nachB: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
      kosten: 3,
    },
    {
      vonA: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
      nachB: KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN,
      kosten: 4,
    },
    {
      vonA: KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN,
      nachB: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      kosten: 5,
    },
    {
      vonA: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      nachB: KampagneMeilenstein.WALDDORF_ERREICHT,
      kosten: 6,
    },
    {
      vonA: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      nachB: KampagneMeilenstein.STADTDORF_ERREICHT,
      kosten: 6,
    },
    {
      vonA: KampagneMeilenstein.WALDDORF_ERREICHT,
      nachB: KampagneMeilenstein.STADTDORF_ERREICHT,
      kosten: 7,
    },
    {
      vonA: KampagneMeilenstein.STADTDORF_ERREICHT,
      nachB: KampagneMeilenstein.BAECKERDORF_ERREICHT,
      kosten: 8,
    },
  ];
}
