export function setupScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 }
  );

  for (const el of elements) {
    observer.observe(el);
  }
}

export function setupStaggeredCards(selector: string): void {
  const container = document.querySelector(selector);
  if (!container) return;

  const cards = container.querySelectorAll<HTMLElement>(".card");
  cards.forEach((card, i) => {
    card.style.setProperty("--index", String(i));
  });
}
