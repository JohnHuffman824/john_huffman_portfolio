export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export interface Polygon {
  vertices: Point[];
  color?: string; // filled color (set during traversal)
  id: number; // unique identifier
}

export type Side = "front" | "back" | "coplanar" | "spanning";

export interface BSPNode {
  partition: Segment;
  polygons: Polygon[];
  front: BSPNode | null;
  back: BSPNode | null;
}

export type AnimationPhase = "idle" | "building" | "traversing" | "complete";

export interface BuildStep {
  type: "partition";
  partition: Segment;
  frontPolygons: number[]; // polygon IDs classified as front
  backPolygons: number[]; // polygon IDs classified as back
  splitPolygons: number[]; // polygon IDs that were split
}

export interface TraversalStep {
  type: "fill";
  polygonIds: number[]; // polygon IDs to fill in this step
}

export type AnimationStep = BuildStep | TraversalStep;

export interface AnimationState {
  phase: AnimationPhase;
  steps: AnimationStep[];
  currentStep: number;
  playing: boolean;
  speed: number; // multiplier: 0.5, 1, 2
}
