export function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="border-t border-gray-200 bg-white mt-auto">
      <div class="mx-auto max-w-3xl px-6 py-6 text-center text-sm text-gray-500">
        <p>&copy; ${year} Jack Huffman</p>
        <div class="mt-2">
          <a href="https://github.com/JohnHuffman824" class="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  `;
}
