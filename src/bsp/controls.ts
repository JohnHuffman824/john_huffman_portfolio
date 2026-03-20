import { AnimationController } from "./animation";
import type { AnimationPhase } from "./types";

const BUTTON_STYLE = [
  "padding: 0.5rem 1rem",
  "border-radius: 0.5rem",
  "font-size: 0.875rem",
  "font-weight: 500",
  "cursor: pointer",
  "border: 1px solid var(--card-border)",
  "background: var(--muted)",
  "color: var(--foreground)",
  "transition: background-color 200ms",
].join("; ");

const PLAY_BUTTON_STYLE = [
  "padding: 0.5rem 1rem",
  "border-radius: 0.5rem",
  "font-size: 0.875rem",
  "font-weight: 500",
  "cursor: pointer",
  "border: 1px solid var(--accent)",
  "background: var(--accent)",
  "color: #fff",
  "transition: background-color 200ms",
].join("; ");

const SELECT_STYLE = [
  "padding: 0.5rem 1rem",
  "border-radius: 0.5rem",
  "font-size: 0.875rem",
  "font-weight: 500",
  "cursor: pointer",
  "border: 1px solid var(--card-border)",
  "background: var(--muted)",
  "color: var(--foreground)",
  "appearance: auto",
].join("; ");

let playButton: HTMLButtonElement | null = null;

export function renderControls(
  container: HTMLElement,
  controller: AnimationController,
): void {
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 1rem; border: 1px solid var(--card-border); border-radius: 0.75rem; background: var(--card);">
      <button id="bsp-reset" style="${BUTTON_STYLE}">Reset</button>
      <button id="bsp-step-back" style="${BUTTON_STYLE}">&#9664;&#9664;</button>
      <button id="bsp-play" style="${PLAY_BUTTON_STYLE}">&#9654; Play</button>
      <button id="bsp-step-fwd" style="${BUTTON_STYLE}">&#9654;&#9654;</button>
      <select id="bsp-speed" style="${SELECT_STYLE}">
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="2">2x</option>
      </select>
    </div>
  `;

  const resetBtn = container.querySelector<HTMLButtonElement>("#bsp-reset")!;
  const stepBackBtn = container.querySelector<HTMLButtonElement>("#bsp-step-back")!;
  playButton = container.querySelector<HTMLButtonElement>("#bsp-play")!;
  const stepFwdBtn = container.querySelector<HTMLButtonElement>("#bsp-step-fwd")!;
  const speedSelect = container.querySelector<HTMLSelectElement>("#bsp-speed")!;

  resetBtn.addEventListener("click", () => {
    controller.reset();
    updatePlayButton("idle", false);
  });

  stepBackBtn.addEventListener("click", () => {
    controller.stepBackward();
    const state = controller.getState();
    updatePlayButton(state.phase, state.playing);
  });

  playButton.addEventListener("click", () => {
    const state = controller.getState();
    if (state.phase === "complete") {
      controller.reset();
      controller.play();
      updatePlayButton("building", true);
      return;
    }
    if (state.playing) {
      controller.pause();
      updatePlayButton(state.phase, false);
    } else {
      controller.play();
      updatePlayButton(state.phase, true);
    }
  });

  stepFwdBtn.addEventListener("click", () => {
    controller.stepForward();
    const state = controller.getState();
    updatePlayButton(state.phase, state.playing);
  });

  speedSelect.addEventListener("change", () => {
    controller.setSpeed(parseFloat(speedSelect.value));
  });

  // Keyboard shortcuts — only fire when the BSP section is focused or visible
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!isBspSectionFocused(container)) return;
    handleKeyboard(e);
  });

  function handleKeyboard(e: KeyboardEvent): void {
    // Ignore if the user is typing in an input or textarea
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    switch (e.key) {
      case " ": {
        e.preventDefault();
        const state = controller.getState();
        if (state.phase === "complete") {
          controller.reset();
          controller.play();
          updatePlayButton("building", true);
        } else if (state.playing) {
          controller.pause();
          updatePlayButton(state.phase, false);
        } else {
          controller.play();
          updatePlayButton(state.phase, true);
        }
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        controller.stepBackward();
        const state = controller.getState();
        updatePlayButton(state.phase, state.playing);
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        controller.stepForward();
        const state = controller.getState();
        updatePlayButton(state.phase, state.playing);
        break;
      }
    }
  }
}

export function updatePlayButton(phase: AnimationPhase, playing: boolean): void {
  if (!playButton) return;

  if (playing) {
    playButton.textContent = "Pause";
  } else if (phase === "complete") {
    playButton.textContent = "Replay";
  } else {
    playButton.innerHTML = "&#9654; Play";
  }
}

/**
 * Check whether the BSP section is currently focused or contains the active element.
 * We walk up from the container to find the nearest section-level ancestor and check
 * if the document's active element is within it, or if no specific element is focused
 * (activeElement is body), we check if the section is in the viewport.
 */
function isBspSectionFocused(container: HTMLElement): boolean {
  const section = container.closest("section") ?? container.parentElement;
  if (!section) return false;

  // If the active element is inside the BSP section, allow shortcuts
  if (section.contains(document.activeElement)) return true;

  // If nothing specific is focused (body), check if the section is visible in the viewport
  if (document.activeElement === document.body || document.activeElement === null) {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // Consider visible if at least partially in viewport
    return rect.top < viewportHeight && rect.bottom > 0;
  }

  return false;
}
