import type { Edge, Segment } from "./types";
import type { ThemeColors } from "./canvas";

export function createRenderer(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options?: { transparent?: boolean },
) {
  const transparent = options?.transparent ?? false;

  function clear(colors: ThemeColors): void {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (!transparent) {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.width / dpr;
      const displayHeight = canvas.height / dpr;
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, displayWidth, displayHeight);
    }
  }

  function drawEdgeLine(
    edge: Edge,
    drawn: boolean,
    colors: ThemeColors,
  ): void {
    ctx.beginPath();
    ctx.moveTo(edge.p1.x, edge.p1.y);
    ctx.lineTo(edge.p2.x, edge.p2.y);

    if (drawn) {
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 1;
    } else {
      ctx.strokeStyle = colors.muted;
      ctx.lineWidth = 1;
      ctx.globalAlpha = transparent ? 0.1 : 0.25;
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawPartitionLine(segment: Segment, colors: ThemeColors): void {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(segment.start.x, segment.start.y);
    ctx.lineTo(segment.end.x, segment.end.y);
    ctx.stroke();
    ctx.restore();
  }

  function highlightEdge(
    edge: Edge,
    side: "front" | "back",
    colors: ThemeColors,
  ): void {
    ctx.beginPath();
    ctx.moveTo(edge.p1.x, edge.p1.y);
    ctx.lineTo(edge.p2.x, edge.p2.y);
    ctx.strokeStyle = side === "front" ? colors.accent : colors.muted;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawAll(params: {
    edges: Edge[];
    drawnIds: Set<number>;
    partitionLines: Segment[];
    highlightedFront: Set<number>;
    highlightedBack: Set<number>;
    colors: ThemeColors;
  }): void {
    const { edges, drawnIds, partitionLines, highlightedFront, highlightedBack, colors } = params;

    clear(colors);

    for (const line of partitionLines) {
      drawPartitionLine(line, colors);
    }

    // Draw undrawn edges first (faint outlines)
    for (const edge of edges) {
      if (!drawnIds.has(edge.id)) {
        drawEdgeLine(edge, false, colors);
      }
    }

    // Draw drawn edges on top (full color)
    for (const edge of edges) {
      if (drawnIds.has(edge.id)) {
        drawEdgeLine(edge, true, colors);
      }
    }

    // Highlights from build phase
    for (const edge of edges) {
      if (highlightedFront.has(edge.id)) {
        highlightEdge(edge, "front", colors);
      } else if (highlightedBack.has(edge.id)) {
        highlightEdge(edge, "back", colors);
      }
    }
  }

  return { clear, drawEdgeLine, drawPartitionLine, highlightEdge, drawAll };
}
