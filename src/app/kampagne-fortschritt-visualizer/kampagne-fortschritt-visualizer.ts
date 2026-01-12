import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { KampagnePfad, KampagneMeilenstein } from '../model/kampagneFortschritt';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MeilensteinPosition {
  meilenstein: KampagneMeilenstein;
  x: number;
  y: number;
  label: string;
}

@Component({
  selector: 'app-kampagne-fortschritt-visualizer',
  imports: [CommonModule, FormsModule],
  templateUrl: './kampagne-fortschritt-visualizer.html',
  styleUrl: './kampagne-fortschritt-visualizer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KampagneFortschrittVisualizer {
  pfade = input.required<KampagnePfad[]>();
  pfadeChange = output<KampagnePfad[]>();

  // Define positions for each milestone for visualization
  meilensteinPositionen: MeilensteinPosition[] = [
    {
      meilenstein: KampagneMeilenstein.START,
      x: 50,
      y: 200,
      label: 'Start',
    },
    {
      meilenstein: KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN,
      x: 200,
      y: 200,
      label: 'Erste Schachtel',
    },
    {
      meilenstein: KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN,
      x: 350,
      y: 200,
      label: 'Zweite Schachtel',
    },
    {
      meilenstein: KampagneMeilenstein.BAUERNDORF_ERREICHT,
      x: 500,
      y: 200,
      label: 'Bauerndorf',
    },
    {
      meilenstein: KampagneMeilenstein.WALDDORF_ERREICHT,
      x: 650,
      y: 100,
      label: 'Walddorf',
    },
    {
      meilenstein: KampagneMeilenstein.STADTDORF_ERREICHT,
      x: 650,
      y: 300,
      label: 'Stadtdorf',
    },
    {
      meilenstein: KampagneMeilenstein.BAECKERDORF_ERREICHT,
      x: 800,
      y: 200,
      label: 'Bäckerdorf',
    },
  ];

  getPosition(meilenstein: KampagneMeilenstein): MeilensteinPosition | undefined {
    return this.meilensteinPositionen.find((p) => p.meilenstein === meilenstein);
  }

  getMeilensteinLabel(meilenstein: KampagneMeilenstein): string {
    const pos = this.getPosition(meilenstein);
    return pos?.label || meilenstein;
  }

  onCheckboxChange(pfad: KampagnePfad, index: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      pfad.fortschritt = Math.max(pfad.fortschritt, index + 1);
    } else {
      pfad.fortschritt = index;
    }
    this.pfadeChange.emit(this.pfade());
  }

  isCheckboxChecked(pfad: KampagnePfad, index: number): boolean {
    return pfad.fortschritt > index;
  }

  createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
