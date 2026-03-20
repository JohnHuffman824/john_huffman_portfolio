import type { Edge, Point, BSPNode, BuildStep, Segment } from "./types";

const EPSILON = 1e-6;
const MAX_DEPTH = 30;

function cross2D(a: Point, b: Point): number {
  return a.x * b.y - a.y * b.x;
}

function sub(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Deterministic RNG matching the research implementation (seed 12345).
 * Each call to generateBSP creates a fresh RNG so the partition selection
 * depends only on the number of edges at that level.
 */
function seededRandom(seed: number): (max: number) => number {
  // Recreate numpy's default_rng(12345) behavior: for a given max,
  // return a deterministic index. We use a simple LCG.
  let s = seed;
  return (max: number) => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) % max;
  };
}

/**
 * Split edges that intersect the bisecting line.
 * Ported from research: intersect(scene, bisecting_edge_ind)
 *
 * Math: t = ((q - p) × s) / (r × s) where
 *   p = edge start, r = edge direction
 *   q = bisector start, s = bisector direction
 */
function splitIntersecting(
  edges: Edge[],
  bisector: Edge,
  nextId: { value: number },
): Edge[] {
  const result: Edge[] = [];
  const s = sub(bisector.p2, bisector.p1);

  for (const edge of edges) {
    const r = sub(edge.p2, edge.p1);
    const qMinusP = sub(bisector.p1, edge.p1);
    const rCrossS = cross2D(r, s);

    if (Math.abs(rCrossS) > EPSILON) {
      const t = cross2D(qMinusP, s) / rCrossS;
      if (t > EPSILON && t < 1 - EPSILON) {
        const intersection = {
          x: edge.p1.x + t * r.x,
          y: edge.p1.y + t * r.y,
        };
        result.push({ id: nextId.value++, p1: edge.p1, p2: intersection });
        result.push({ id: nextId.value++, p1: intersection, p2: edge.p2 });
        continue;
      }
    }
    result.push(edge);
  }

  return result;
}

/**
 * Partition edges into front, back, and colinear sets relative to a bisecting edge.
 * Ported from research: bisect(input_scene, line)
 */
function bisect(
  edges: Edge[],
  bisectorIdx: number,
  nextId: { value: number },
): { back: Edge[]; colinear: Edge[]; front: Edge[] } {
  const bisector = edges[bisectorIdx]!;
  const split = splitIntersecting(edges, bisector, nextId);

  const dir = sub(bisector.p2, bisector.p1);
  const front: Edge[] = [];
  const back: Edge[] = [];
  const colinear: Edge[] = [];

  for (const edge of split) {
    const side1 = cross2D(dir, sub(edge.p1, bisector.p1));
    const side2 = cross2D(dir, sub(edge.p2, bisector.p1));

    if (side1 > EPSILON && side2 > EPSILON) {
      front.push(edge);
    } else if (side1 < -EPSILON && side2 < -EPSILON) {
      back.push(edge);
    } else if (Math.abs(side1) <= EPSILON && Math.abs(side2) <= EPSILON) {
      colinear.push(edge);
    } else if (Math.abs(side1) <= EPSILON) {
      (side2 > 0 ? front : back).push(edge);
    } else if (Math.abs(side2) <= EPSILON) {
      (side1 > 0 ? front : back).push(edge);
    }
  }

  return { back, colinear, front };
}

/**
 * Recursively build a BSP tree by selecting a random edge as the partition line.
 * Ported from research: generate_bsp(scene)
 */
export function generateBSP(
  edges: Edge[],
  nextId: { value: number },
  steps?: BuildStep[],
  depth: number = 0,
): BSPNode | null {
  if (edges.length === 0 || depth >= MAX_DEPTH) return null;

  // Deterministic edge selection (fresh RNG per call, matching research)
  const rng = seededRandom(12345);
  const idx = rng(edges.length);

  const { back, colinear, front } = bisect(edges, idx, nextId);

  if (steps) {
    const bisector = edges[idx]!;
    const dir = sub(bisector.p2, bisector.p1);
    const len = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
    if (len > EPSILON) {
      const nx = dir.x / len;
      const ny = dir.y / len;
      const extend = 2000;
      steps.push({
        type: "partition",
        partitionLine: {
          start: {
            x: bisector.p1.x - nx * extend,
            y: bisector.p1.y - ny * extend,
          },
          end: {
            x: bisector.p2.x + nx * extend,
            y: bisector.p2.y + ny * extend,
          },
        },
        frontEdgeIds: front.map((e) => e.id),
        backEdgeIds: back.map((e) => e.id),
      });
    }
  }

  return {
    edges: colinear,
    front: front.length > 0 ? generateBSP(front, nextId, steps, depth + 1) : null,
    back: back.length > 0 ? generateBSP(back, nextId, steps, depth + 1) : null,
  };
}

/** Collect all edges from every node in the BSP tree. */
export function collectAllEdges(node: BSPNode | null): Edge[] {
  if (!node) return [];
  return [
    ...node.edges,
    ...collectAllEdges(node.front),
    ...collectAllEdges(node.back),
  ];
}
