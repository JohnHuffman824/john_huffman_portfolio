import type {
  Point,
  Segment,
  Polygon,
  Side,
  BSPNode,
  BuildStep,
} from "./types";

/**
 * Returns the cross product of the partition direction vector and the vector
 * from the partition's start to the given point. Positive means "front" side,
 * negative means "back" side, ~0 means on the line.
 */
export function classifyPoint(point: Point, partition: Segment): number {
  const dx = partition.end.x - partition.start.x;
  const dy = partition.end.y - partition.start.y;
  const px = point.x - partition.start.x;
  const py = point.y - partition.start.y;
  // 2D cross product: direction × point-vector
  return dx * py - dy * px;
}

/**
 * Classify a polygon as entirely front, entirely back, coplanar, or spanning
 * relative to a partition line.
 */
export function classifySide(polygon: Polygon, partition: Segment): Side {
  const EPSILON = 1e-6;
  let hasFront = false;
  let hasBack = false;

  for (const vertex of polygon.vertices) {
    const d = classifyPoint(vertex, partition);
    if (d > EPSILON) {
      hasFront = true;
    } else if (d < -EPSILON) {
      hasBack = true;
    }
    // If we already have vertices on both sides, no need to continue.
    if (hasFront && hasBack) {
      return "spanning";
    }
  }

  if (hasFront) return "front";
  if (hasBack) return "back";
  return "coplanar";
}

/**
 * Compute the intersection point of the line through segment `edge` and the
 * infinite line defined by `partition`. Returns the parametric t along the edge.
 */
function edgePartitionIntersection(
  edgeStart: Point,
  edgeEnd: Point,
  partition: Segment,
): { t: number; point: Point } {
  const dx = partition.end.x - partition.start.x;
  const dy = partition.end.y - partition.start.y;

  const ex = edgeEnd.x - edgeStart.x;
  const ey = edgeEnd.y - edgeStart.y;

  // We solve for t in: edgeStart + t*(edgeEnd - edgeStart) lies on partition line.
  // The partition line equation: dx*(P.y - partition.start.y) - dy*(P.x - partition.start.x) = 0
  // Substituting P = edgeStart + t*(edgeEnd - edgeStart):
  //   dx*((edgeStart.y + t*ey) - partition.start.y) - dy*((edgeStart.x + t*ex) - partition.start.x) = 0
  // Let d0 = classifyPoint(edgeStart, partition) = dx*(edgeStart.y - partition.start.y) - dy*(edgeStart.x - partition.start.x)
  // Let d1 = classifyPoint(edgeEnd, partition)
  // Then: d0 + t*(d1 - d0) = 0  →  t = -d0 / (d1 - d0) = d0 / (d0 - d1)

  const d0 = classifyPoint(edgeStart, partition);
  const d1 = classifyPoint(edgeEnd, partition);
  const t = d0 / (d0 - d1);

  return {
    t,
    point: {
      x: edgeStart.x + t * ex,
      y: edgeStart.y + t * ey,
    },
  };
}

/**
 * Split a spanning polygon along the partition line into front and back halves.
 * Each new polygon receives a unique id from nextId.
 */
export function splitPolygon(
  polygon: Polygon,
  partition: Segment,
  nextId: { value: number },
): { front: Polygon | null; back: Polygon | null } {
  const EPSILON = 1e-6;
  const frontVertices: Point[] = [];
  const backVertices: Point[] = [];
  const vertices = polygon.vertices;
  const count = vertices.length;

  for (let i = 0; i < count; i++) {
    const current = vertices[i];
    const next = vertices[(i + 1) % count];
    const dCurrent = classifyPoint(current, partition);
    const dNext = classifyPoint(next, partition);

    // Add current vertex to the appropriate list(s).
    if (dCurrent > EPSILON) {
      frontVertices.push(current);
    } else if (dCurrent < -EPSILON) {
      backVertices.push(current);
    } else {
      // On the line — add to both.
      frontVertices.push(current);
      backVertices.push(current);
    }

    // Check if the edge from current to next crosses the partition.
    const currentFront = dCurrent > EPSILON;
    const currentBack = dCurrent < -EPSILON;
    const nextFront = dNext > EPSILON;
    const nextBack = dNext < -EPSILON;

    if ((currentFront && nextBack) || (currentBack && nextFront)) {
      // Edge crosses the partition — compute intersection.
      const { point: intersection } = edgePartitionIntersection(
        current,
        next,
        partition,
      );
      frontVertices.push(intersection);
      backVertices.push(intersection);
    }
  }

  const front: Polygon | null =
    frontVertices.length >= 3
      ? {
          vertices: frontVertices,
          color: polygon.color,
          id: nextId.value++,
        }
      : null;

  const back: Polygon | null =
    backVertices.length >= 3
      ? {
          vertices: backVertices,
          color: polygon.color,
          id: nextId.value++,
        }
      : null;

  return { front, back };
}

/**
 * Choose a partition line using an alternating axis-aligned split through the
 * centroid midpoint of the polygon set. Even depths split vertically (x),
 * odd depths split horizontally (y).
 */
export function choosePartition(
  polygons: Polygon[],
  depth: number = 0,
): Segment {
  // Compute centroids of all polygons.
  let minCx = Infinity;
  let maxCx = -Infinity;
  let minCy = Infinity;
  let maxCy = -Infinity;

  for (const poly of polygons) {
    let cx = 0;
    let cy = 0;
    for (const v of poly.vertices) {
      cx += v.x;
      cy += v.y;
    }
    cx /= poly.vertices.length;
    cy /= poly.vertices.length;
    minCx = Math.min(minCx, cx);
    maxCx = Math.max(maxCx, cx);
    minCy = Math.min(minCy, cy);
    maxCy = Math.max(maxCy, cy);
  }

  const midX = (minCx + maxCx) / 2;
  const midY = (minCy + maxCy) / 2;

  if (depth % 2 === 0) {
    // Vertical split: a vertical line through midX.
    // The partition runs top-to-bottom so the direction vector is (0, 1).
    // "Front" = right side (positive cross product), "Back" = left side.
    return {
      start: { x: midX, y: minCy - 1000 },
      end: { x: midX, y: maxCy + 1000 },
    };
  } else {
    // Horizontal split: a horizontal line through midY.
    // The partition runs left-to-right so the direction vector is (1, 0).
    // "Front" = above (positive cross product means y above), but cross product
    // dx*py - dy*px with dy=0 gives dx*py. For left-to-right (dx>0), positive py
    // means point is above start → that's "front" = below in screen coords.
    return {
      start: { x: minCx - 1000, y: midY },
      end: { x: maxCx + 1000, y: midY },
    };
  }
}

/**
 * Recursively build a BSP tree from a set of polygons, recording each
 * partitioning decision as a BuildStep for animation playback.
 */
export function buildBSPTree(
  polygons: Polygon[],
  steps: BuildStep[],
  nextId: { value: number },
  depth: number = 0,
): BSPNode | null {
  if (polygons.length === 0) {
    return null;
  }

  // Base case: leaf node with 0 or 1 polygons — no partition needed.
  if (polygons.length <= 1) {
    return {
      // Leaf nodes still need a partition field for the type, but it won't be
      // used for traversal decisions. Use a degenerate segment.
      partition: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      polygons: [...polygons],
      front: null,
      back: null,
    };
  }

  const partition = choosePartition(polygons, depth);

  const frontPolygons: Polygon[] = [];
  const backPolygons: Polygon[] = [];
  const coplanarPolygons: Polygon[] = [];

  const frontIds: number[] = [];
  const backIds: number[] = [];
  const splitIds: number[] = [];

  for (const poly of polygons) {
    const side = classifySide(poly, partition);
    switch (side) {
      case "front":
        frontPolygons.push(poly);
        frontIds.push(poly.id);
        break;
      case "back":
        backPolygons.push(poly);
        backIds.push(poly.id);
        break;
      case "coplanar":
        // Coplanar polygons are stored in the current node.
        coplanarPolygons.push(poly);
        break;
      case "spanning": {
        splitIds.push(poly.id);
        const { front, back } = splitPolygon(poly, partition, nextId);
        if (front) {
          frontPolygons.push(front);
          frontIds.push(front.id);
        }
        if (back) {
          backPolygons.push(back);
          backIds.push(back.id);
        }
        break;
      }
    }
  }

  // Record this partitioning step.
  steps.push({
    type: "partition",
    partition,
    frontPolygons: frontIds,
    backPolygons: backIds,
    splitPolygons: splitIds,
  });

  const frontChild = buildBSPTree(frontPolygons, steps, nextId, depth + 1);
  const backChild = buildBSPTree(backPolygons, steps, nextId, depth + 1);

  return {
    partition,
    polygons: coplanarPolygons,
    front: frontChild,
    back: backChild,
  };
}
