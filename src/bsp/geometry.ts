import type { Edge } from "./types";
import csvData from "./doom-logo.csv?raw";

/**
 * Parse the DOOM logo CSV data into edges.
 * CSV format: x1,y1,x2,y2 per line (raw coordinates).
 * Y-axis is flipped to match the research implementation: y' = -(y - 15)
 */
export function loadDoomEdges(): Edge[] {
  const edges: Edge[] = [];
  let id = 0;

  for (const line of csvData.trim().split("\n")) {
    const parts = line.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length < 4 || parts.some(isNaN)) continue;

    const [x1, y1Raw, x2, y2Raw] = parts;
    const y1 = -(y1Raw - 15);
    const y2 = -(y2Raw - 15);

    // Skip degenerate zero-length edges
    if (Math.abs(x2 - x1) < 1e-6 && Math.abs(y2 - y1) < 1e-6) continue;

    edges.push({ id: id++, p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } });
  }

  return edges;
}

/**
 * Scale and center edges to fit within given pixel dimensions.
 * Maintains aspect ratio and adds padding.
 */
export function transformToCanvas(
  edges: Edge[],
  width: number,
  height: number,
  padding = 40,
): void {
  if (edges.length === 0) return;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const edge of edges) {
    for (const p of [edge.p1, edge.p2]) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
  }

  const dataW = maxX - minX;
  const dataH = maxY - minY;
  const scaleX = (width - 2 * padding) / dataW;
  const scaleY = (height - 2 * padding) / dataH;
  const scale = Math.min(scaleX, scaleY);

  const offX = (width - dataW * scale) / 2 - minX * scale;
  const offY = (height - dataH * scale) / 2 - minY * scale;

  for (const edge of edges) {
    edge.p1 = { x: edge.p1.x * scale + offX, y: edge.p1.y * scale + offY };
    edge.p2 = { x: edge.p2.x * scale + offX, y: edge.p2.y * scale + offY };
  }
}
