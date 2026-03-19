const STORAGE_KEY = "theme";

export function initTheme(): void {
  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (!(STORAGE_KEY in localStorage)) applyTheme();
    });
}

export function toggleTheme(): void {
  const isDark = document.documentElement.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme();
}

export function renderThemeToggle(): string {
  return `
    <button id="theme-toggle" aria-label="Toggle dark mode"
      class="inline-flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-transform duration-150"
      style="transition-timing-function: var(--ease-spring);">
      <svg class="theme-icon-sun hidden w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
      <svg class="theme-icon-moon hidden w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  `;
}

function applyTheme(): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDark = stored === "dark" || (!stored && prefersDark);

  document.documentElement.classList.toggle("dark", isDark);
  updateToggleIcons(isDark);
}

function updateToggleIcons(isDark: boolean): void {
  const sun = document.querySelector(".theme-icon-sun");
  const moon = document.querySelector(".theme-icon-moon");
  if (sun) sun.classList.toggle("hidden", isDark);
  if (moon) moon.classList.toggle("hidden", !isDark);
}
