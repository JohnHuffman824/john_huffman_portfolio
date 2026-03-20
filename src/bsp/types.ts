export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export interface Edge {
  id: number;
  p1: Point;
  p2: Point;
}

export interface BSPNode {
  edges: Edge[];
  front: BSPNode | null;
  back: BSPNode | null;
}

export type AnimationPhase = "idle" | "building" | "traversing" | "complete";

export interface BuildStep {
  type: "partition";
  partitionLine: Segment;
  frontEdgeIds: number[];
  backEdgeIds: number[];
}

export interface TraversalStep {
  type: "draw";
  edgeIds: number[];
}

export type AnimationStep = BuildStep | TraversalStep;

export interface AnimationState {
  phase: AnimationPhase;
  steps: AnimationStep[];
  currentStep: number;
  playing: boolean;
  speed: number;
}
