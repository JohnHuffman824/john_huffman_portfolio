import { getDoomPolygons } from "./geometry";
import { buildBSPTree } from "./tree";
import { traverseBSP } from "./traversal";
import { setupCanvas, getThemeColors, onThemeChange } from "./canvas";
import { createRenderer } from "./renderer";
import { AnimationController } from "./animation";
import { renderControls, updatePlayButton } from "./controls";
import type { BuildStep, TraversalStep } from "./types";

export function initBSPDemo(): void {
  const canvasContainer = document.getElementById("bsp-canvas");
  const controlsContainer = document.getElementById("bsp-controls");

  if (!canvasContainer || !controlsContainer) {
    console.warn("BSP demo containers not found; skipping initialization.");
    return;
  }

  // Build the polygon set from the Doom-style letter geometry
  const polygons = getDoomPolygons();

  // Construct the BSP tree, collecting partition steps for animation
  const buildSteps: BuildStep[] = [];
  const nextId = { value: polygons.length };
  const tree = buildBSPTree([...polygons], buildSteps, nextId);

  // Traverse the tree from a fixed viewpoint, collecting fill steps
  const traversalSteps: TraversalStep[] = [];
  const viewpoint = { x: 500, y: 200 };

  if (tree) {
    traverseBSP(tree, viewpoint, traversalSteps);
  }

  const allSteps = [...buildSteps, ...traversalSteps];

  // Prepare the canvas and renderer
  const { canvas, ctx } = setupCanvas(canvasContainer);
  const renderer = createRenderer(ctx, canvas);

  // Wire up the animation controller with render and phase-change callbacks
  const controller = new AnimationController(
    allSteps,
    polygons,
    (state) => {
      const colors = getThemeColors();
      renderer.drawAll({ ...state, colors });
    },
    (phase) => {
      updatePlayButton(phase, controller.getState().playing);
    },
  );

  renderControls(controlsContainer, controller);

  // Re-render the current frame when the theme toggles (dark/light)
  onThemeChange(() => {
    if (!controller.getState().playing) {
      controller.rerender();
    }
  });

  // Show the initial idle state
  controller.reset();
}
