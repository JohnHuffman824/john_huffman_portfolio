import type {
  AnimationState,
  AnimationStep,
  AnimationPhase,
  Polygon,
  Segment,
  BuildStep,
  TraversalStep,
} from "./types";

type RenderCallback = (state: {
  polygons: Polygon[];
  filledIds: Set<number>;
  partitionLines: Segment[];
  highlightedFront: Set<number>;
  highlightedBack: Set<number>;
}) => void;

type PhaseCallback = (phase: AnimationPhase) => void;

export class AnimationController {
  private state: AnimationState;
  private allPolygons: Polygon[];
  private rafId: number | null = null;
  private lastTick: number = 0;
  private tickInterval: number = 800;
  private onRender: RenderCallback;
  private onPhaseChange: PhaseCallback;

  constructor(
    steps: AnimationStep[],
    polygons: Polygon[],
    onRender: RenderCallback,
    onPhaseChange: PhaseCallback,
  ) {
    this.allPolygons = polygons;
    this.onRender = onRender;
    this.onPhaseChange = onPhaseChange;
    this.state = {
      phase: "idle",
      steps,
      currentStep: 0,
      playing: false,
      speed: 1,
    };
  }

  play(): void {
    if (this.prefersReducedMotion()) {
      this.jumpToEnd();
      return;
    }

    if (this.state.phase === "complete") {
      this.reset();
    }

    this.state.playing = true;
    this.lastTick = performance.now();
    this.startLoop();
  }

  pause(): void {
    this.state.playing = false;
    this.cancelLoop();
  }

  reset(): void {
    this.cancelLoop();
    this.state.playing = false;
    this.state.currentStep = 0;
    this.setPhase("idle");
    this.render();
  }

  stepForward(): void {
    if (this.state.playing) {
      this.pause();
    }
    if (this.state.currentStep < this.state.steps.length) {
      this.advance();
    }
  }

  stepBackward(): void {
    if (this.state.playing) {
      this.pause();
    }
    if (this.state.currentStep > 0) {
      this.state.currentStep--;
      this.updatePhaseFromCurrentStep();
      this.render();
    }
  }

  setSpeed(speed: number): void {
    this.state.speed = speed;
  }

  getState(): AnimationState {
    return { ...this.state };
  }

  destroy(): void {
    this.cancelLoop();
  }

  // --- Private ---

  private prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  private jumpToEnd(): void {
    this.state.currentStep = this.state.steps.length;
    this.state.playing = false;
    this.setPhase("complete");
    this.render();
  }

  private startLoop(): void {
    this.cancelLoop();
    const tick = (now: number): void => {
      if (!this.state.playing) return;

      const elapsed = now - this.lastTick;
      const interval = this.tickInterval / this.state.speed;

      if (elapsed >= interval) {
        this.lastTick = now;
        this.advance();
      }

      if (this.state.playing) {
        this.rafId = requestAnimationFrame(tick);
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private cancelLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private advance(): void {
    if (this.state.currentStep >= this.state.steps.length) {
      this.state.playing = false;
      this.cancelLoop();
      this.setPhase("complete");
      this.render();
      return;
    }

    this.state.currentStep++;
    this.updatePhaseFromCurrentStep();
    this.render();

    if (this.state.currentStep >= this.state.steps.length) {
      this.state.playing = false;
      this.cancelLoop();
      this.setPhase("complete");
    }
  }

  private updatePhaseFromCurrentStep(): void {
    if (this.state.currentStep === 0) {
      this.setPhase("idle");
      return;
    }

    if (this.state.currentStep >= this.state.steps.length) {
      this.setPhase("complete");
      return;
    }

    const currentStep = this.state.steps[this.state.currentStep - 1];
    if (currentStep.type === "partition") {
      this.setPhase("building");
    } else {
      this.setPhase("traversing");
    }
  }

  private setPhase(phase: AnimationPhase): void {
    if (this.state.phase !== phase) {
      this.state.phase = phase;
      this.onPhaseChange(phase);
    }
  }

  private computeRenderState(): {
    filledIds: Set<number>;
    partitionLines: Segment[];
    highlightedFront: Set<number>;
    highlightedBack: Set<number>;
  } {
    const filledIds = new Set<number>();
    const partitionLines: Segment[] = [];
    const highlightedFront = new Set<number>();
    const highlightedBack = new Set<number>();

    for (let i = 0; i < this.state.currentStep && i < this.state.steps.length; i++) {
      const step = this.state.steps[i];

      if (step.type === "partition") {
        partitionLines.push(step.partition);
      } else {
        for (const id of step.polygonIds) {
          filledIds.add(id);
        }
      }
    }

    // Highlight only from the current step (the one just processed)
    if (this.state.currentStep > 0 && this.state.currentStep <= this.state.steps.length) {
      const current = this.state.steps[this.state.currentStep - 1];
      if (current.type === "partition") {
        for (const id of current.frontPolygons) {
          highlightedFront.add(id);
        }
        for (const id of current.backPolygons) {
          highlightedBack.add(id);
        }
      }
    }

    return { filledIds, partitionLines, highlightedFront, highlightedBack };
  }

  private render(): void {
    const { filledIds, partitionLines, highlightedFront, highlightedBack } =
      this.computeRenderState();

    this.onRender({
      polygons: this.allPolygons,
      filledIds,
      partitionLines,
      highlightedFront,
      highlightedBack,
    });
  }
}
