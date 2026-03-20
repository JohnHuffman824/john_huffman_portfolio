import { loadDoomEdges, transformToCanvas } from "./geometry";
import { generateBSP, collectAllEdges } from "./tree";
import { traverseBSP } from "./traversal";
import { setupCanvas, getThemeColors, onThemeChange } from "./canvas";
import { createRenderer } from "./renderer";
import { AnimationController } from "./animation";
import { renderControls, updatePlayButton } from "./controls";
import type { BuildStep, TraversalStep, Edge } from "./types";

interface BSPDemoOptions {
  autoplay?: boolean;
  loop?: boolean;
  backgroundMode?: boolean;
}

export function initBSPDemo(options: BSPDemoOptions = {}): void {
  const { autoplay = false, loop = false, backgroundMode = false } = options;
  const canvasContainer = document.getElementById("bsp-canvas");
  const controlsContainer = document.getElementById("bsp-controls");

  if (!canvasContainer) {
    console.warn("BSP demo canvas container not found; skipping initialization.");
    return;
  }

  // Set up the canvas
  const { canvas, ctx } = setupCanvas(canvasContainer, backgroundMode);
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.width / dpr;
  const cssHeight = canvas.height / dpr;

  // Load DOOM logo edges from CSV and scale to fit the canvas
  const edges = loadDoomEdges();
  transformToCanvas(edges, cssWidth, cssHeight);

  // Build the BSP tree
  const nextId = { value: edges.length };
  const buildSteps: BuildStep[] = [];
  const tree = generateBSP(edges, nextId, buildSteps);

  // Collect all final edges (including splits from BSP construction)
  const treeEdges = collectAllEdges(tree);
  const edgeMap = new Map<number, Edge>();
  for (const e of edges) edgeMap.set(e.id, e);
  for (const e of treeEdges) edgeMap.set(e.id, e);
  const allEdges = Array.from(edgeMap.values());

  // Traverse the BSP tree from a viewpoint
  function randomViewpoint(): { x: number; y: number } {
    return {
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
    };
  }

  function retraverse(): TraversalStep[] {
    const steps: TraversalStep[] = [];
    if (tree) {
      traverseBSP(tree, randomViewpoint(), steps);
    }
    return steps;
  }

  const traversalSteps = retraverse();

  // Background mode: only show traversal. Interactive: show build + traversal.
  const allSteps = backgroundMode
    ? [...traversalSteps]
    : [...buildSteps, ...traversalSteps];

  const renderer = createRenderer(ctx, canvas, { transparent: backgroundMode });

  const controller = new AnimationController(
    allSteps,
    allEdges,
    (state) => {
      const colors = getThemeColors();
      renderer.drawAll({ ...state, colors });
    },
    (phase) => {
      updatePlayButton(phase, controller.getState().playing);
    },
    {
      loop,
      tickInterval: backgroundMode ? 150 : 800,
      onReplay: backgroundMode ? retraverse : undefined,
    },
  );

  if (controlsContainer) {
    renderControls(controlsContainer, controller);
  }

  onThemeChange(() => {
    if (!controller.getState().playing) {
      controller.rerender();
    }
  });

  controller.reset();

  if (autoplay) {
    controller.play();
  }
}
