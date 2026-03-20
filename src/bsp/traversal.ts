import type { BSPNode, Point, TraversalStep } from "./types";
import { classifyPoint } from "./tree";

/**
 * Perform a back-to-front (painter's algorithm) traversal of the BSP tree.
 *
 * At each node, we classify the viewpoint against the node's partition line.
 * We visit the far side first, then emit the node's own polygons, then visit
 * the near side. This ensures polygons farther from the viewer are drawn first
 * and correctly occluded by closer polygons.
 */
export function traverseBSP(
  node: BSPNode | null,
  viewpoint: Point,
  steps: TraversalStep[],
): void {
  if (node === null) {
    return;
  }

  const d = classifyPoint(viewpoint, node.partition);

  if (d >= 0) {
    // Viewpoint is on the front side (or on the line).
    // Far side = back, near side = front.
    traverseBSP(node.back, viewpoint, steps);

    if (node.polygons.length > 0) {
      steps.push({
        type: "fill",
        polygonIds: node.polygons.map((p) => p.id),
      });
    }

    traverseBSP(node.front, viewpoint, steps);
  } else {
    // Viewpoint is on the back side.
    // Far side = front, near side = back.
    traverseBSP(node.front, viewpoint, steps);

    if (node.polygons.length > 0) {
      steps.push({
        type: "fill",
        polygonIds: node.polygons.map((p) => p.id),
      });
    }

    traverseBSP(node.back, viewpoint, steps);
  }
}
