# Portfolio

Personal portfolio website. Vanilla TypeScript multi-page static site.

## Stack

- **Build:** Vite (multi-page, static output)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`)
- **Hosting:** Vercel (static)
- **Package Manager:** Bun

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server (http://localhost:5173)
bun run build        # Production build to dist/
bun run preview      # Preview production build locally
```

## Structure

```
index.html              — Home page (/)
projects/index.html     — Projects page (/projects)
about/index.html        — About page (/about)
src/main.ts             — Home entry
src/projects.ts         — Projects entry
src/about.ts            — About entry
src/components/         — Shared header, footer (vanilla JS injection)
src/styles/main.css     — Tailwind entry
docs/                   — Project docs (symlinked to vault)
```

## Conventions

- No framework — vanilla TypeScript only
- Shared UI via JS injection (`src/components/`), not HTML duplication
- All TypeScript, strict mode
- No AI attribution in commits
- Commit frequently, push after committing
