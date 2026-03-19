import { renderThemeToggle, toggleTheme } from "../theme";

function navLinkClass(href: string): string {
  const path = window.location.pathname;
  const active =
    path === href ||
    path === `${href}/` ||
    (href !== "/" && path.startsWith(href));
  return active
    ? "color: var(--accent); font-weight: 600;"
    : "";
}

export function renderHeader(): string {
  return `
    <header id="site-header" class="sticky top-0 z-50" style="background-color: color-mix(in srgb, var(--background) 80%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); transition: border-color 200ms;">
      <nav class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="/" class="text-xl font-bold" style="color: var(--foreground);">Jack Huffman</a>
        <div class="flex items-center gap-6">
          <ul class="flex gap-6">
            <li><a href="/" class="text-sm font-medium transition-colors hover:opacity-80" style="color: var(--muted-foreground); ${navLinkClass("/")}"}>Home</a></li>
            <li><a href="/projects/" class="text-sm font-medium transition-colors hover:opacity-80" style="color: var(--muted-foreground); ${navLinkClass("/projects")}">Projects</a></li>
            <li><a href="/about/" class="text-sm font-medium transition-colors hover:opacity-80" style="color: var(--muted-foreground); ${navLinkClass("/about")}">About</a></li>
          </ul>
          ${renderThemeToggle()}
        </div>
      </nav>
    </header>
  `;
}

export function initHeader(): void {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateBorder = () => {
    const scrolled = window.scrollY > 10;
    header.style.borderBottom = scrolled
      ? "1px solid var(--border)"
      : "1px solid transparent";
  };

  updateBorder();
  window.addEventListener("scroll", updateBorder, { passive: true });

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
}
