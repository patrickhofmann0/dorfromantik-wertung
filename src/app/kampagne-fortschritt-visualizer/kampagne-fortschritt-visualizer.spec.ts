import { KampagneFortschrittVisualizer } from './kampagne-fortschritt-visualizer';
import { KampagnePfad, KampagneMeilenstein } from '../model/kampagneFortschritt';

describe('KampagneFortschrittVisualizer', () => {
  let component: KampagneFortschrittVisualizer;
  let testPfade: KampagnePfad[];

  beforeEach(() => {
    component = new KampagneFortschrittVisualizer();
    testPfade = [
      {
        vonA: KampagneMeilenstein.START,
        nachB: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
        kosten: 3,
        fortschritt: 0,
      },
    ];
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get position for a milestone', () => {
    const position = component.getPosition(KampagneMeilenstein.START);
    expect(position).toBeDefined();
    expect(position?.meilenstein).toBe(KampagneMeilenstein.START);
  });

  it('should get milestone label', () => {
    const label = component.getMeilensteinLabel(KampagneMeilenstein.START);
    expect(label).toBe('Start');
  });

  it('should check if checkbox is checked', () => {
    const pfad = testPfade[0];
    pfad.fortschritt = 2;
    expect(component.isCheckboxChecked(pfad, 0)).toBe(true);
    expect(component.isCheckboxChecked(pfad, 1)).toBe(true);
    expect(component.isCheckboxChecked(pfad, 2)).toBe(false);
  });

  it('should create array of specified length', () => {
    const array = component.createArray(5);
    expect(array.length).toBe(5);
    expect(array).toEqual([0, 1, 2, 3, 4]);
  });
});
