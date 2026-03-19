function navLinkClass(href: string): string {
  const path = window.location.pathname;
  const active = path === href || path === `${href}/` || (href !== "/" && path.startsWith(href));
  return active
    ? "text-blue-600 font-semibold"
    : "text-gray-600 hover:text-blue-600 transition-colors";
}

export function renderHeader(): string {
  return `
    <header class="border-b border-gray-200 bg-white">
      <nav class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="/" class="text-xl font-bold text-gray-900">Jack Huffman</a>
        <ul class="flex gap-6">
          <li><a href="/" class="${navLinkClass("/")}">Home</a></li>
          <li><a href="/projects/" class="${navLinkClass("/projects")}">Projects</a></li>
          <li><a href="/about/" class="${navLinkClass("/about")}">About</a></li>
        </ul>
      </nav>
    </header>
  `;
}
