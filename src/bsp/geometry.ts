import type { Polygon } from "./types";

/**
 * Returns the DOOM logo decomposed into convex polygons.
 *
 * Canvas: 1000 x 400 (5:2 ratio)
 * Letters: D O O M — blocky, angular, thick-stroked, Doom aesthetic.
 *
 * Layout (with padding):
 *   Left pad  = 40
 *   Right pad = 40
 *   Gap between letters = 30
 *   Usable width = 1000 - 80 - 90 = 830
 *   Each letter width ≈ 207
 *
 * Vertical: letters span y 60..340  (height 280)
 * Stroke thickness: ~50 units
 */

let nextId = 0;

function poly(vertices: [number, number][]): Polygon {
  return {
    vertices: vertices.map(([x, y]) => ({ x, y })),
    id: nextId++,
  };
}

// ─── Letter D ───────────────────────────────────────────────
// x range: 40..237
// Composed of: left vertical bar + top horizontal + bottom horizontal
//   + upper-right diagonal + right vertical + lower-right diagonal
function letterD(): Polygon[] {
  const x0 = 40;
  const w = 197;
  const t = 50; // stroke thickness
  const yTop = 60;
  const yBot = 340;
  const xRight = x0 + w; // 237

  // Vertical left stroke (full height rectangle)
  const leftBar = poly([
    [x0, yTop],
    [x0 + t, yTop],
    [x0 + t, yBot],
    [x0, yBot],
  ]);

  // Top horizontal bar (connects left bar to the curve start)
  const topBar = poly([
    [x0 + t, yTop],
    [xRight - 50, yTop],
    [xRight - 50, yTop + t],
    [x0 + t, yTop + t],
  ]);

  // Upper-right angled piece (trapezoid slanting outward)
  const upperRight = poly([
    [xRight - 50, yTop],
    [xRight, yTop + 55],
    [xRight, yTop + 55 + t],
    [xRight - 50, yTop + t],
  ]);

  // Right vertical stroke (middle section)
  const rightBar = poly([
    [xRight - t, yTop + 55 + t],
    [xRight, yTop + 55 + t],
    [xRight, yBot - 55 - t],
    [xRight - t, yBot - 55 - t],
  ]);

  // Outer right fill (thin strip between angled and vertical)
  const rightOuter = poly([
    [xRight, yTop + 55],
    [xRight + 10, yTop + 80],
    [xRight + 10, yBot - 80],
    [xRight, yBot - 55],
  ]);

  // Lower-right angled piece (trapezoid slanting inward)
  const lowerRight = poly([
    [xRight - 50, yBot - t],
    [xRight, yBot - 55 - t],
    [xRight, yBot - 55],
    [xRight - 50, yBot],
  ]);

  // Bottom horizontal bar
  const botBar = poly([
    [x0 + t, yBot - t],
    [xRight - 50, yBot - t],
    [xRight - 50, yBot],
    [x0 + t, yBot],
  ]);

  return [leftBar, topBar, upperRight, rightBar, rightOuter, lowerRight, botBar];
}

// ─── Letter O ───────────────────────────────────────────────
// Thick ring approximated as 8 convex polygons (top, bottom, left, right,
// and four corner trapezoids).
function letterO(xStart: number): Polygon[] {
  const w = 197;
  const t = 50;
  const yTop = 60;
  const yBot = 340;
  const corner = 45; // size of the angled corner cuts

  const x0 = xStart;
  const x1 = x0 + corner;
  const x2 = x0 + w - corner;
  const x3 = x0 + w;

  const y0 = yTop;
  const y1 = yTop + corner;
  const y2 = yBot - corner;
  const y3 = yBot;

  // Inner edges
  const ix0 = x0 + t;
  const ix3 = x3 - t;
  const iy0 = yTop + t;
  const iy3 = yBot - t;

  // Top bar
  const top = poly([
    [x1, y0],
    [x2, y0],
    [x2, y0 + t],
    [x1, y0 + t],
  ]);

  // Bottom bar
  const bottom = poly([
    [x1, y3 - t],
    [x2, y3 - t],
    [x2, y3],
    [x1, y3],
  ]);

  // Left bar
  const left = poly([
    [x0, y1],
    [x0 + t, y1],
    [x0 + t, y2],
    [x0, y2],
  ]);

  // Right bar
  const right = poly([
    [x3 - t, y1],
    [x3, y1],
    [x3, y2],
    [x3 - t, y2],
  ]);

  // Top-left corner (trapezoid)
  const topLeft = poly([
    [x0, y1],
    [x1, y0],
    [x1, y0 + t],
    [x0 + t, y1],
  ]);

  // Top-right corner
  const topRight = poly([
    [x2, y0],
    [x3, y1],
    [x3 - t, y1],
    [x2, y0 + t],
  ]);

  // Bottom-left corner
  const bottomLeft = poly([
    [x0, y2],
    [x0 + t, y2],
    [x1, y3 - t],
    [x1, y3],
  ]);

  // Bottom-right corner
  const bottomRight = poly([
    [x3 - t, y2],
    [x3, y2],
    [x2, y3],
    [x2, y3 - t],
  ]);

  return [top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight];
}

// ─── Letter M ───────────────────────────────────────────────
// Two outer vertical strokes + a V-shaped middle (decomposed into
// left-diagonal, right-diagonal, and a small center join piece).
function letterM(): Polygon[] {
  const x0 = 733;
  const w = 227; // slightly wider for M
  const t = 50;
  const yTop = 60;
  const yBot = 340;
  const xMid = x0 + w / 2; // center x ≈ 846.5

  // Left vertical stroke
  const leftBar = poly([
    [x0, yTop],
    [x0 + t, yTop],
    [x0 + t, yBot],
    [x0, yBot],
  ]);

  // Right vertical stroke
  const rightBar = poly([
    [x0 + w - t, yTop],
    [x0 + w, yTop],
    [x0 + w, yBot],
    [x0 + w - t, yBot],
  ]);

  // Left diagonal of the V (trapezoid: top-left to center-bottom)
  const leftDiag = poly([
    [x0 + t, yTop],
    [x0 + t + 40, yTop],
    [xMid + 5, yTop + 160],
    [xMid - 15, yTop + 160],
  ]);

  // Right diagonal of the V (trapezoid: top-right to center-bottom)
  const rightDiag = poly([
    [x0 + w - t - 40, yTop],
    [x0 + w - t, yTop],
    [xMid + 15, yTop + 160],
    [xMid - 5, yTop + 160],
  ]);

  // Center V point (small triangle/trapezoid joining the two diagonals)
  const centerPoint = poly([
    [xMid - 15, yTop + 160],
    [xMid + 15, yTop + 160],
    [xMid + 5, yTop + 200],
    [xMid - 5, yTop + 200],
  ]);

  return [leftBar, rightBar, leftDiag, rightDiag, centerPoint];
}

/**
 * Returns all convex polygons forming the DOOM logo.
 * Each polygon has a unique `id` (0-based, sequential).
 */
export function getDoomPolygons(): Polygon[] {
  // Reset ID counter
  nextId = 0;

  const d = letterD(); // 7 polygons  (ids 0-6)
  const o1 = letterO(277); // 8 polygons  (ids 7-14)
  const o2 = letterO(504); // 8 polygons  (ids 15-22)
  const m = letterM(); // 5 polygons  (ids 23-27)

  return [...d, ...o1, ...o2, ...m];
}
