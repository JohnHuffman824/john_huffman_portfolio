import "./styles/main.css";
import { renderFooter } from "./components/footer";
import { renderTechMarquee } from "./components/tech-marquee";
import { initTheme } from "./theme";

// Footer + theme + marquee (no header on home page)
document.querySelector<HTMLDivElement>("#footer")!.innerHTML = renderFooter();
document.getElementById("tech-marquee")!.innerHTML = renderTechMarquee();
initTheme();

// Theme toggle in footer (if present)
const toggle = document.getElementById("theme-toggle");
if (toggle) {
  const { toggleTheme } = await import("./theme");
  toggle.addEventListener("click", toggleTheme);
}

// ── Scroll-triggered section reveals ──
const revealSections = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-visible", "true");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 },
);

for (const section of revealSections) {
  revealObserver.observe(section);
}

// ── Modal openers (all except BSP) ──
document.querySelectorAll<HTMLElement>("[data-modal]").forEach((card) => {
  const modalId = card.dataset.modal!;
  if (modalId === "bsp-modal") return;

  card.addEventListener("click", () => {
    const dialog = document.getElementById(modalId) as HTMLDialogElement;
    dialog?.showModal();
  });
});

// ── BSP demo: lazy init on scroll into view ──
const bspSection = document.querySelector(".bsp-showcase");
let bspInitialized = false;

if (bspSection) {
  const bspObserver = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !bspInitialized) {
          bspInitialized = true;
          const { initBSPDemo } = await import("./bsp/demo");
          requestAnimationFrame(() =>
            initBSPDemo({ autoplay: true, loop: true, backgroundMode: true }),
          );
          bspObserver.disconnect();
        }
      }
    },
    { threshold: 0.1 },
  );
  bspObserver.observe(bspSection);
}

// ── Modal close handlers ──
document.querySelectorAll<HTMLDialogElement>(".modal").forEach((dialog) => {
  dialog.querySelector(".modal-close")?.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
});
