import type { BSPNode, Point, Edge, TraversalStep } from "./types";

function cross2D(a: Point, b: Point): number {
  return a.x * b.y - a.y * b.x;
}

/**
 * Determine which side of the node's edge the viewpoint is on.
 * Ported from research: relative_position(scene, viewpoint)
 *
 * Returns: 1 = front (positive cross product), -1 = back, 0 = on line
 */
function relativePosition(edges: Edge[], viewpoint: Point): number {
  if (edges.length === 0) return 0;
  const edge = edges[0]!;
  const dir = { x: edge.p2.x - edge.p1.x, y: edge.p2.y - edge.p1.y };
  const toView = { x: viewpoint.x - edge.p1.x, y: viewpoint.y - edge.p1.y };
  const side = cross2D(dir, toView);

  if (Math.abs(side) < 1e-6) return 0;
  return side > 0 ? 1 : -1;
}

/**
 * Painter's algorithm traversal of the BSP tree.
 * Draws far side first, then current node, then near side.
 * Ported from research: traverse(bsp_tree, viewpoint, win)
 */
export function traverseBSP(
  node: BSPNode | null,
  viewpoint: Point,
  steps: TraversalStep[],
): void {
  if (!node) return;

  const position = relativePosition(node.edges, viewpoint);

  if (position > 0) {
    // Viewpoint is on front side — draw far (back) first
    traverseBSP(node.back, viewpoint, steps);
    if (node.edges.length > 0) {
      steps.push({ type: "draw", edgeIds: node.edges.map((e) => e.id) });
    }
    traverseBSP(node.front, viewpoint, steps);
  } else if (position < 0) {
    // Viewpoint is on back side — draw far (front) first
    traverseBSP(node.front, viewpoint, steps);
    if (node.edges.length > 0) {
      steps.push({ type: "draw", edgeIds: node.edges.map((e) => e.id) });
    }
    traverseBSP(node.back, viewpoint, steps);
  } else {
    // Viewpoint is on the line — draw both sides then current
    traverseBSP(node.front, viewpoint, steps);
    traverseBSP(node.back, viewpoint, steps);
    if (node.edges.length > 0) {
      steps.push({ type: "draw", edgeIds: node.edges.map((e) => e.id) });
    }
  }
}
