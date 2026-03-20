export function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="mt-auto" style="border-top: 1px solid var(--border);">
      <div class="mx-auto max-w-3xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style="color: var(--muted-foreground);">
        <p>&copy; ${year} Jack Huffman</p>
        <div class="flex gap-6">
          <a href="https://github.com/JohnHuffman824" class="transition-colors hover:opacity-70" style="color: var(--muted-foreground);" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jack-huffman-953153164/" class="transition-colors hover:opacity-70" style="color: var(--muted-foreground);" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:jackhuffman424@gmail.com" class="transition-colors hover:opacity-70" style="color: var(--muted-foreground);">Email</a>
          <a href="/resume.pdf" class="transition-colors hover:opacity-70" style="color: var(--muted-foreground);" target="_blank" rel="noopener noreferrer">Resume</a>
        </div>
      </div>
    </footer>
  `;
}
