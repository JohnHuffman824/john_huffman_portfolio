import type { Point, Segment, Polygon } from "./types";
import type { ThemeColors } from "./canvas";

const WORLD_WIDTH = 1000;

export function createRenderer(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  function worldToCanvas(p: Point): Point {
    const displayWidth = parseFloat(canvas.style.width);
    const scale = displayWidth / WORLD_WIDTH;
    return { x: p.x * scale, y: p.y * scale };
  }

  function tracePath(vertices: Point[]) {
    if (vertices.length === 0) return;
    const first = worldToCanvas(vertices[0]);
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < vertices.length; i++) {
      const pt = worldToCanvas(vertices[i]);
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
  }

  function clear(colors: ThemeColors): void {
    const displayWidth = parseFloat(canvas.style.width);
    const displayHeight = parseFloat(canvas.style.height);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, displayWidth, displayHeight);
  }

  function drawPolygonOutline(polygon: Polygon, colors: ThemeColors): void {
    tracePath(polygon.vertices);
    ctx.strokeStyle = colors.muted;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawPolygonFilled(polygon: Polygon, colors: ThemeColors): void {
    tracePath(polygon.vertices);
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = polygon.color ?? colors.accent;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = colors.muted;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawPartitionLine(segment: Segment, colors: ThemeColors): void {
    const start = worldToCanvas(segment.start);
    const end = worldToCanvas(segment.end);
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
  }

  function highlightPolygon(
    polygon: Polygon,
    side: "front" | "back",
    colors: ThemeColors,
  ): void {
    tracePath(polygon.vertices);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = side === "front" ? colors.accent : colors.muted;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawAll(params: {
    polygons: Polygon[];
    filledIds: Set<number>;
    partitionLines: Segment[];
    highlightedFront: Set<number>;
    highlightedBack: Set<number>;
    colors: ThemeColors;
  }): void {
    const {
      polygons,
      filledIds,
      partitionLines,
      highlightedFront,
      highlightedBack,
      colors,
    } = params;

    clear(colors);

    for (const line of partitionLines) {
      drawPartitionLine(line, colors);
    }

    for (const polygon of polygons) {
      if (filledIds.has(polygon.id)) {
        drawPolygonFilled(polygon, colors);
      } else {
        drawPolygonOutline(polygon, colors);
      }
    }

    for (const polygon of polygons) {
      if (highlightedFront.has(polygon.id)) {
        highlightPolygon(polygon, "front", colors);
      } else if (highlightedBack.has(polygon.id)) {
        highlightPolygon(polygon, "back", colors);
      }
    }
  }

  return {
    clear,
    drawPolygonOutline,
    drawPolygonFilled,
    drawPartitionLine,
    highlightPolygon,
    drawAll,
  };
}
