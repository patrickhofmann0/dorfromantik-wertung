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

interface PathGeometry {
  pfad: KampagnePfad;
  pathData: string; // SVG path data for curved lines
  points: Point[]; // Progress point positions along the curve
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

  // Layout configuration
  private readonly VERTICAL_SPACING = 100;
  private readonly HORIZONTAL_SPACING = 200;
  private readonly BASE_X = 250; // Center point for single-column levels
  private readonly START_Y = 50;
  private readonly MILESTONE_WIDTH = 120;
  private readonly MILESTONE_HEIGHT = 40;
  private readonly PADDING = 50; // Padding around the graph

  // Dynamically calculate milestone positions based on graph structure
  meilensteinPositionen = computed(() => {
    return this.calculateMilestoneLayout();
  });

  // Calculate path geometries with curve routing to avoid overlaps
  pathGeometries = computed(() => {
    return this.calculatePathGeometries();
  });

  // Calculate viewBox dimensions dynamically based on milestone positions
  viewBoxDimensions = computed(() => {
    const positions = this.meilensteinPositionen();
    if (positions.length === 0) {
      return { x: 0, y: 0, width: 500, height: 650 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    positions.forEach(pos => {
      minX = Math.min(minX, pos.x);
      minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x + this.MILESTONE_WIDTH);
      maxY = Math.max(maxY, pos.y + this.MILESTONE_HEIGHT);
    });

    // Add padding
    const x = minX - this.PADDING;
    const y = minY - this.PADDING;
    const width = (maxX - minX) + (2 * this.PADDING);
    const height = (maxY - minY) + (2 * this.PADDING);

    return { x, y, width, height };
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

    // Calculate levels using BFS from START
    // Handle case where START might not exist
    if (!nodes.has(KampagneMeilenstein.START)) {
      // If no START, use any node as root (first milestone found)
      const firstMilestone = Array.from(allMilestones)[0];
      if (firstMilestone) {
        this.calculateLevelsFromRoot(firstMilestone, nodes);
      }
    } else {
      this.calculateLevelsFromRoot(KampagneMeilenstein.START, nodes);
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
    return this.convertNodesToPositions(nodes, levels);
  }

  private calculateLevelsFromRoot(
    root: KampagneMeilenstein,
    nodes: Map<KampagneMeilenstein, GraphNode>
  ): void {
    const queue: KampagneMeilenstein[] = [root];
    const visited = new Set<KampagneMeilenstein>();
    const queued = new Set<KampagneMeilenstein>([root]); // Track queued nodes to avoid duplicates
    
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
          
          // Only add to queue if not already queued or visited
          if (!queued.has(next) && !visited.has(next)) {
            queue.push(next);
            queued.add(next);
          }
        }
      });
    }
  }

  private convertNodesToPositions(
    nodes: Map<KampagneMeilenstein, GraphNode>,
    levels: Map<number, KampagneMeilenstein[]>
  ): MeilensteinPosition[] {
    const positions: MeilensteinPosition[] = [];

    nodes.forEach(node => {
      const levelNodes = levels.get(node.level)!;
      const totalInLevel = levelNodes.length;
      
      // Center nodes horizontally if multiple in same level
      let x: number;
      if (totalInLevel === 1) {
        x = this.BASE_X;
      } else {
        // Spread nodes horizontally around center
        const totalWidth = (totalInLevel - 1) * this.HORIZONTAL_SPACING;
        x = this.BASE_X - totalWidth / 2 + node.column * this.HORIZONTAL_SPACING;
      }

      const y = this.START_Y + node.level * this.VERTICAL_SPACING;

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

  private calculatePathGeometries(): PathGeometry[] {
    const geometries: PathGeometry[] = [];
    const positions = this.meilensteinPositionen();

    // Group paths by their target to detect multiple incoming edges
    const pathsByTarget = new Map<KampagneMeilenstein, KampagnePfad[]>();
    
    this.pfade().forEach(pfad => {
      if (!pathsByTarget.has(pfad.nachB)) {
        pathsByTarget.set(pfad.nachB, []);
      }
      pathsByTarget.get(pfad.nachB)!.push(pfad);
    });

    this.pfade().forEach(pfad => {
      const posA = positions.find(p => p.meilenstein === pfad.vonA);
      const posB = positions.find(p => p.meilenstein === pfad.nachB);

      if (!posA || !posB) {
        return;
      }

      const x1 = posA.x + this.MILESTONE_WIDTH / 2;
      const y1 = posA.y + this.MILESTONE_HEIGHT / 2;
      const x2 = posB.x + this.MILESTONE_WIDTH / 2;
      const y2 = posB.y + this.MILESTONE_HEIGHT / 2;

      // Check if there are multiple paths to the same target OR a bidirectional path
      const pathsToTarget = pathsByTarget.get(pfad.nachB) || [];
      const hasParallelEdge = this.pfade().some(p => 
        p.vonA === pfad.nachB && p.nachB === pfad.vonA
      );
      
      const needsCurve = hasParallelEdge || pathsToTarget.length > 1;

      let pathData: string;
      let points: Point[] = [];

      if (needsCurve) {
        // Calculate which offset to use based on the index of this path
        let offsetMultiplier = 0;
        
        if (hasParallelEdge) {
          // For bidirectional paths, offset one to the left
          offsetMultiplier = -1;
        } else if (pathsToTarget.length > 1) {
          // For multiple incoming paths, distribute them around the target
          const pathIndex = pathsToTarget.findIndex(p => 
            p.vonA === pfad.vonA && p.nachB === pfad.nachB
          );
          // Center the paths: -1, 0, 1 for 3 paths; -1.5, -0.5, 0.5, 1.5 for 4 paths, etc.
          const totalPaths = pathsToTarget.length;
          offsetMultiplier = pathIndex - (totalPaths - 1) / 2;
        }
        
        const offsetDistance = 35; // Base distance to offset the curve
        
        // Calculate midpoint
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        
        // Calculate perpendicular offset
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Perpendicular vector (rotated 90 degrees)
        const px = -dy / length * offsetDistance * offsetMultiplier;
        const py = dx / length * offsetDistance * offsetMultiplier;
        
        // Control point for quadratic bezier
        const cx = mx + px;
        const cy = my + py;
        
        // SVG quadratic bezier path
        pathData = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
        
        // Calculate points along the curve for progress indicators
        for (let i = 0; i < pfad.kosten; i++) {
          const t = (i + 1) / (pfad.kosten + 1);
          // Quadratic bezier formula: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
          const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
          const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
          points.push({ x: px, y: py });
        }
      } else {
        // Straight line for single, non-overlapping paths
        pathData = `M ${x1} ${y1} L ${x2} ${y2}`;
        
        // Calculate points along straight line
        for (let i = 0; i < pfad.kosten; i++) {
          const t = (i + 1) / (pfad.kosten + 1);
          points.push({
            x: x1 + (x2 - x1) * t,
            y: y1 + (y2 - y1) * t,
          });
        }
      }

      geometries.push({
        pfad,
        pathData,
        points,
      });
    });

    return geometries;
  }

  getPathGeometry(pfad: KampagnePfad): PathGeometry | undefined {
    return this.pathGeometries().find(g => 
      g.pfad.vonA === pfad.vonA && g.pfad.nachB === pfad.nachB
    );
  }
}
