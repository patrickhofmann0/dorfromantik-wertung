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

interface Point {
  x: number;
  y: number;
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

  calculatePointOnLine(x1: number, y1: number, x2: number, y2: number, index: number, total: number): Point {
    // Calculate position along the line for progress points
    // Distribute points evenly between the milestones (not at the edges)
    const segmentLength = 1 / (total + 1);
    const t = segmentLength * (index + 1);
    
    return {
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t,
    };
  }

  onProgressPointClick(pfad: KampagnePfad, index: number): void {
    // Toggle: if this point is completed, uncomplete from here; if incomplete, complete up to here
    if (pfad.fortschritt > index) {
      // Clicking a completed point - set progress to this point (uncomplete it and everything after)
      pfad.fortschritt = index;
    } else {
      // Clicking an incomplete point - complete up to and including this point
      pfad.fortschritt = index + 1;
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
