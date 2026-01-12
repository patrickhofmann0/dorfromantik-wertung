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
  fortschritt: number = 0; // How many points have been completed (0 to kosten)
}

export function getKampagnenPfadListe(): KampagnePfad[] {
  return [
    {
      vonA: KampagneMeilenstein.START,
      nachB: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
      kosten: 3,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
      nachB: KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN,
      kosten: 4,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN,
      nachB: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      kosten: 5,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      nachB: KampagneMeilenstein.WALDDORF_ERREICHT,
      kosten: 6,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      nachB: KampagneMeilenstein.STADTDORF_ERREICHT,
      kosten: 6,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.WALDDORF_ERREICHT,
      nachB: KampagneMeilenstein.STADTDORF_ERREICHT,
      kosten: 7,
      fortschritt: 0,
    },
    {
      vonA: KampagneMeilenstein.STADTDORF_ERREICHT,
      nachB: KampagneMeilenstein.BAECKERDORF_ERREICHT,
      kosten: 7,
      fortschritt: 0,
    },
  ];
}
