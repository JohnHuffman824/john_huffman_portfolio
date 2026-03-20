export interface ThemeColors {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  border: string;
}

export function getThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement);
  return {
    background: style.getPropertyValue("--background").trim(),
    foreground: style.getPropertyValue("--foreground").trim(),
    accent: style.getPropertyValue("--accent").trim(),
    muted: style.getPropertyValue("--muted-foreground").trim(),
    border: style.getPropertyValue("--card-border").trim(),
  };
}

export function setupCanvas(
  container: HTMLElement,
  backgroundMode = false,
): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D rendering context");
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = container.clientWidth || 400;
    const displayHeight = backgroundMode
      ? (container.clientHeight || 300)
      : displayWidth * (2 / 5); // 5:2 aspect ratio

    if (!backgroundMode) {
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }

    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();

  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  });

  return { canvas, ctx };
}

export function onThemeChange(callback: () => void): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        callback();
        return;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
