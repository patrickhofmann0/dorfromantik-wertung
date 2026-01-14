import { Component, input, output, ChangeDetectionStrategy, computed } from '@angular/core';
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

interface GraphNode {
  meilenstein: KampagneMeilenstein;
  label: string;
  level: number;
  column: number;
  incomingEdges: KampagneMeilenstein[];
  outgoingEdges: KampagneMeilenstein[];
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

  // Dynamically calculate milestone positions based on graph structure
  meilensteinPositionen = computed(() => {
    return this.calculateMilestoneLayout();
  });

  private getMeilensteinLabelText(meilenstein: KampagneMeilenstein): string {
    const labels: Record<KampagneMeilenstein, string> = {
      [KampagneMeilenstein.START]: 'Start',
      [KampagneMeilenstein.ERSTE_SCHACHTEL_OFFNEN]: 'Erste Schachtel',
      [KampagneMeilenstein.ZWEITE_SCHACHTEL_OFFNEN]: 'Zweite Schachtel',
      [KampagneMeilenstein.BAUERNDORF_ERREICHT]: 'Bauerndorf',
      [KampagneMeilenstein.WALDDORF_ERREICHT]: 'Walddorf',
      [KampagneMeilenstein.STADTDORF_ERREICHT]: 'Stadtdorf',
      [KampagneMeilenstein.BAECKERDORF_ERREICHT]: 'Bäckerdorf',
    };
    return labels[meilenstein] || meilenstein;
  }

  private calculateMilestoneLayout(): MeilensteinPosition[] {
    // Build graph structure from paths
    const nodes = new Map<KampagneMeilenstein, GraphNode>();
    const allMilestones = new Set<KampagneMeilenstein>();

    // Collect all milestones
    this.pfade().forEach(pfad => {
      allMilestones.add(pfad.vonA);
      allMilestones.add(pfad.nachB);
    });

    // Initialize nodes
    allMilestones.forEach(milestone => {
      nodes.set(milestone, {
        meilenstein: milestone,
        label: this.getMeilensteinLabelText(milestone),
        level: 0,
        column: 0,
        incomingEdges: [],
        outgoingEdges: [],
      });
    });

    // Build edges
    this.pfade().forEach(pfad => {
      const fromNode = nodes.get(pfad.vonA);
      const toNode = nodes.get(pfad.nachB);
      if (fromNode && toNode) {
        fromNode.outgoingEdges.push(pfad.nachB);
        toNode.incomingEdges.push(pfad.vonA);
      }
    });

    // Calculate levels using topological sort (BFS from START)
    const queue: KampagneMeilenstein[] = [KampagneMeilenstein.START];
    const visited = new Set<KampagneMeilenstein>();
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);

      const currentNode = nodes.get(current);
      if (!currentNode) continue;

      // Process outgoing edges
      currentNode.outgoingEdges.forEach(next => {
        const nextNode = nodes.get(next);
        if (nextNode) {
          // Set level to be at least one more than current
          nextNode.level = Math.max(nextNode.level, currentNode.level + 1);
          queue.push(next);
        }
      });
    }

    // Group nodes by level
    const levels = new Map<number, KampagneMeilenstein[]>();
    nodes.forEach((node, milestone) => {
      if (!levels.has(node.level)) {
        levels.set(node.level, []);
      }
      levels.get(node.level)!.push(milestone);
    });

    // Assign column positions within each level
    levels.forEach((milestones, level) => {
      milestones.forEach((milestone, index) => {
        const node = nodes.get(milestone)!;
        node.column = index;
      });
    });

    // Convert to positions
    const positions: MeilensteinPosition[] = [];
    const verticalSpacing = 100;
    const horizontalSpacing = 200;
    const baseX = 250; // Center point for single-column levels

    nodes.forEach(node => {
      const levelNodes = levels.get(node.level)!;
      const totalInLevel = levelNodes.length;
      
      // Center nodes horizontally if multiple in same level
      let x: number;
      if (totalInLevel === 1) {
        x = baseX;
      } else {
        // Spread nodes horizontally around center
        const totalWidth = (totalInLevel - 1) * horizontalSpacing;
        x = baseX - totalWidth / 2 + node.column * horizontalSpacing;
      }

      const y = 50 + node.level * verticalSpacing;

      positions.push({
        meilenstein: node.meilenstein,
        x,
        y,
        label: node.label,
      });
    });

    return positions;
  }

  getPosition(meilenstein: KampagneMeilenstein): MeilensteinPosition | undefined {
    return this.meilensteinPositionen().find((p) => p.meilenstein === meilenstein);
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
    // Check if this point is clickable based on progressive activation
    if (!this.isProgressPointClickable(pfad, index)) {
      return;
    }

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

  isProgressPointClickable(pfad: KampagnePfad, index: number): boolean {
    // Progressive activation: only the next uncompleted point is clickable
    // Completed points can be clicked to undo progress
    
    // If this is a completed point, it's clickable (to undo)
    if (pfad.fortschritt > index) {
      return true;
    }
    
    // For incomplete points, only the next one is clickable
    // if the starting milestone of this path has been reached
    if (pfad.fortschritt === index) {
      return this.isMilestoneReached(pfad.vonA);
    }
    
    return false;
  }

  isMilestoneReached(meilenstein: KampagneMeilenstein): boolean {
    // Start is always reached
    if (meilenstein === KampagneMeilenstein.START) {
      return true;
    }
    
    // Check if any path leading to this milestone is completed
    const pathsToMilestone = this.pfade().filter(p => p.nachB === meilenstein);
    return pathsToMilestone.some(p => p.fortschritt >= p.kosten);
  }

  isCheckboxChecked(pfad: KampagnePfad, index: number): boolean {
    return pfad.fortschritt > index;
  }

  createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
