---
title: Portfolio Research
type: reference
status: active
area: portfolio
created: 2026-03-19
updated: 2026-03-19
tags: [design, research, portfolio, inspiration]
---

# Portfolio Research

Comprehensive reference on developer portfolio design — what works, what doesn't, notable examples, techniques, content strategy, and current trends. This is an accumulation of external research, not a build plan.

---

## Table of Contents

1. [What Hiring Managers Actually Look At](#1-what-hiring-managers-actually-look-at)
2. [Content Strategy](#2-content-strategy)
3. [Notable Portfolio Examples](#3-notable-portfolio-examples)
4. [Design Patterns & Layout](#4-design-patterns--layout)
5. [Animation & Motion Techniques](#5-animation--motion-techniques)
6. [Interactive Elements & Delight](#6-interactive-elements--delight)
7. [Navigation Patterns](#7-navigation-patterns)
8. [Performance & Technical Excellence](#8-performance--technical-excellence)
9. [SEO, Metadata & Discoverability](#9-seo-metadata--discoverability)
10. [Accessibility](#10-accessibility)
11. [Design Trends 2025-2026](#11-design-trends-2025-2026)
12. [Tech Stack Landscape](#12-tech-stack-landscape)
13. [Common Mistakes & Anti-Patterns](#13-common-mistakes--anti-patterns)
14. [Sources](#14-sources)

---

## 1. What Hiring Managers Actually Look At

### The Two Audiences

Your portfolio serves two distinct groups (per Josh Comeau's research):

- **HR recruiters** — Scan quickly for signals of professionalism, business impact keywords, and polish. They spend ~6 seconds on a resume and similarly brief time on a portfolio.
- **Technical hiring managers** — Evaluate depth, craft, technical decision-making, and authenticity. They'll read case studies and check live demos.

Design for both. Lead with clean professionalism (for HR), with depth available for those who dig deeper.

### The Review Process

A survey of 60+ hiring managers found portfolios rated 0-1 out of 5 for influence on hiring decisions — but a **bad** one actively hurts. The typical flow: resume first (6 seconds) → GitHub → portfolio if it exists. Your portfolio is evidence that supports the resume, not a replacement for it.

### What Actually Matters

- **Live demos** — 85% of tech recruiters value them. A working link beats any screenshot.
- **3-5 deep project showcases** beat a long list. Each should take ~3 minutes to read.
- **Business impact framing** — "Reduced load time by 40%" beats "Built with React and Node."
- **The portfolio itself as proof** — A fast, well-designed, accessible site demonstrates your skills before they read a word.
- **Custom domain** — `yourname.com` is a baseline professionalism signal.

### What Gets Ignored or Hurts

- Skill bars / percentage ratings (meaningless self-assessment)
- Tutorial project clones presented as original work
- Broken demos or stale content
- Generic "passionate about building things" copy

---

## 2. Content Strategy

### Project Presentation

**Structure each project as a mini case study:**
1. Context — What is it and why does it exist?
2. Your role — What specifically did YOU do?
3. Process — Key technical decisions and challenges
4. Outcome — Measurable results, what you learned

**Frame titles around outcomes, not tech.** "Reduced playbook creation time from hours to minutes" > "React Canvas Application."

The test: "If we scroll through and only read your captions, we should still understand the project."

### Writing Tone

- First person, conversational but competent
- Show genuine personality — hobbies, quirks, what drives you
- A "Why I enjoy building" section prompted HR mentions "every single time" in interviews (per one hiring manager)
- Humor works if natural to you; forced humor reads worse than no humor
- The test: "If you replaced your name with any other developer's, would the bio still work? If so, it's too generic."

### The About Section

- 250-500 words
- Lead with something interesting, not "Hi I'm a developer"
- Include a quality photo
- Tell your story — what got you into engineering, what excites you now
- Show personality beyond code

### Content Pages That Work Well

| Page | Origin | Purpose |
|------|--------|---------|
| **/now** | Derek Sivers (nownownow.com) | What you're currently focused on — projects, reading, learning. Updated regularly. Signals you're active. |
| **/uses** | Wes Bos (uses.tech) | Your tools, setup, gear, and why you chose them. Developers love reading these. |
| **/colophon** | Web tradition | How the portfolio itself was built — the site IS a project. Great meta-showcase. |
| **Blog** | Universal | Possibly the highest-ROI addition. "I would prefer a non-experienced person with articles over a person with less than 1 year of experience." One post every two weeks is plenty. Short posts about problems solved work fine. |

### Call to Action

- Provide multiple contact methods (email, form, LinkedIn, GitHub)
- Put CTAs in multiple places, not just a dedicated contact page
- Include a downloadable resume PDF
- Calendar scheduling link (Calendly/Cal.com) reduces friction for recruiters

### Personal Branding

- Specialize: "Full-stack developer" is invisible; "I build accessible React apps for healthcare" is memorable
- Consistent identity (photo, tone, positioning) across portfolio, GitHub, LinkedIn, and social
- Pin 3-6 best GitHub repos with excellent READMEs
- Resume gets you past the screen; portfolio provides evidence. They complement each other.

---

## 3. Notable Portfolio Examples

### Clean / Minimal Developer Portfolios

**Brittany Chiang** — brittanychiang.com
- The single most cloned developer portfolio on the internet (8,200+ GitHub stars)
- Dark background, teal accent, sticky sidebar nav, smooth scroll sections
- Signature hover effect: highlights one element while dimming the rest
- Proves restraint and polish beat complexity
- Tech: React, Gatsby, Styled-components

**Lee Robinson** — leerob.com
- Ultra-minimal, content-focused. Blog and writing are the centerpiece.
- Spotify "now playing" integration, structured schema.org data
- Treats his portfolio as a real product (analytics, auth, database)
- Tech: Next.js, Tailwind CSS, PlanetScale, Vercel Analytics

**Rauno Freiberg** — rauno.me
- Staff Design Engineer at Vercel (previously Arc browser)
- Styled like a desktop OS with obsessive interaction detail
- Created cmdk (command menu library, millions of weekly downloads)
- Also runs devouringdetails.com — 23 chapters on interaction design with downloadable React components
- Tech: Next.js, Stitches, Vercel

**Maxime Bonhomme** — bonhomme.lol
- Extreme minimalism — text and whitespace only
- No animations or effects. Lets credentials and writing speak for themselves.

### Portfolios Famous for Getting People Hired

**Josh Comeau** — joshwcomeau.com
- Interactive tutorials embedded in blog posts — readers manipulate code and see results live
- Custom animated icons, sound effects on hover, extraordinary polish
- Over 100,000 lines of code in the blog alone
- Wrote "Building an Effective Dev Portfolio" (the definitive guide)
- Tech: MDX, React, Algolia search, custom animation system

**Adham Dannaway** — adhamdannaway.com
- The iconic "half designer / half developer" split-face concept (2008)
- Went viral, copied by 20+ designers. The concept itself became his brand.
- Detailed case studies with real product impact
- Tech: WordPress, PHP, jQuery

**Matt Farley** — mattfarley.ca
- Only 3-5 curated projects. Client testimonials for social proof.
- Proves a portfolio doesn't need to be flashy to land work
- Clear value proposition, outcomes for each project, easy contact

### Interactive / Creative Portfolios

**Bruno Simon** — bruno-simon.com
- The most famous interactive portfolio. A 3D game where you drive a toy truck through a physics world.
- Won Awwwards Site of the Month. Open source on GitHub.
- Tech: Three.js, Cannon.js, Blender, custom GLSL shaders

**Robby Leonardi** — rleonardi.com/interactive-resume/
- Resume as a Mario-style side-scroller. Game enemies become bar charts, game levels become resume sections.
- Won FWA, Awwwards, CSS Design Awards

**Samuel Honigstein (Samsy)** — samsy.ninja
- Cyberpunk 3D world powered by WebGPU (not WebGL), achieving 120+ FPS
- Neon cityscape with first-person controls. One of the first WebGPU portfolios.

**Jesse Zhou** — jesse-zhou.com
- Interactive 3D ramen shop with audio integration
- WebGL shaders create atmosphere, Howler.js adds immersion
- Tech: Three.js, GLSL shaders, Howler.js, GSAP

**Patrick Heng** — patrickheng.com
- Immersive WebGL experiences with smooth UI animations
- Won Awwwards Site of the Day
- Tech: Nuxt.js, Three.js, GSAP, Vue.js

### Well-Known Tech People

**Kent C. Dodds** — kentcdodds.com
- Full-stack implementation (not static). Includes course platform, blog, podcast.
- The site's complexity IS the portfolio piece.
- Tech: React, TypeScript, Remix, Prisma, Redis, Postgres

**Lynn Fisher** — lynnandtonic.com
- Redesigns her entire portfolio from scratch **every single year** for 10+ years
- Each version experiments with a different CSS/web technique
- 2017: new layout every 100px of viewport width. 2019: browser as physical space.
- Archives of all past versions preserved. A living CSS mastery demonstration.
- Tech: HTML5, CSS, JavaScript, SVG, Netlify

**Cassie Evans** — cassie.codes
- GSAP core team member. Custom illustrated desk scene with cozy workspace.
- SVG animation specialist — demos and CodePen experiments are legendary.
- Pairs playful illustration with bold typography

**Sara Soueidan** — sarasoueidan.com
- Accessibility specialist (Netflix, Smashing Magazine). Content-first, no gimmicks.
- The site practices what she preaches — is itself an accessibility reference.

**Dan Abramov** — overreacted.io
- A blog, not a traditional portfolio — but it IS his portfolio
- Deep technical writing demonstrating understanding of React internals
- Minimalist design. Proves that for senior engineers, thoughtful writing trumps flashy design.

**Cassidy Williams** — cassidoo.co
- Playful color-shifting interaction — links randomly change to one of four accent colors
- Newsletter hub, tag-based content browsing
- "Memes and dreams and software" — personality as brand

**Jhey Tompkins** — jhey.dev
- DevRel at Google. Hundreds of creative CSS demos.
- Integrates headless CMS + Storybook-documented component library
- Tech: Astro, Sanity CMS, Tailwind, React, Storybook

### Distinctive Design Approaches

**Sam Goddard** — samgoddard.co.uk
- Images appear on hover over text links — no thumbnails until interaction
- Won 3 Awwwards Site of the Day, CSSDA Developer of the Year
- Tech: Next.js, Framer Motion, Sanity CMS, Tailwind

**Jordan Cruz-Correa**
- Windows 98 nostalgia theme with working Notepad and recycle bin
- A cohesive concept executed well > raw technical power

**Braydon Coyer** — braydoncoyer.dev
- Uses Notion API as headless CMS — blog posts written in Notion, pulled into site
- Tech: Next.js, Tailwind, Notion API, Supabase

**Shane Mielke** — shanemielke.com
- Background alternates black/white. Project cards have signature somersault hover animation.

**Olaolu Olawuyi** — olaolu.dev
- Vibrant color palette breaking the "dark mode developer" mold
- Tech: Vue.js, Styled-components, Sass

**Michael Kolesidis** — michaelkolesidis.com
- Self-coined "Frivobrutalism" — multiple clashing colors, huge fonts, deliberately informal
- Anti-minimalist; stands out by rejecting convention

---

## 4. Design Patterns & Layout

### Bento Grid

The dominant layout pattern of 2025-2026 (popularized by Apple, Notion). Modular grid with content blocks of varying sizes. Evolving toward "Bento 2.0" with animated tiles, hover-triggered video/data reveals, and scroll-driven rearrangement.

- Implementation: 12-column CSS Grid with `grid-auto-flow: dense` and three size variants (1x1, 2x1, 2x2)
- Tailwind approach: `grid-cols-4` with `col-span-2`, `row-span-2` variants
- Exaggerated corner rounding (12-24px) is part of the current aesthetic

### Two-Column Sticky Sidebar

Popularized by Brittany Chiang. Sidebar with name/bio/nav stays fixed, content scrolls on the right. Scroll-aware highlighting shows which section is active.

- Good for single-page portfolios with distinct sections
- Uses IntersectionObserver to detect active section

### Timeline / Journey

Vertical timeline for experience/career history using pseudo-elements (`::before` for the line, `::after` for dots) with IntersectionObserver triggering reveal animations.

### Card Grids

Auto-fill responsive grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` adapts to any viewport without breakpoints.

### Split-Screen

Left and right panels with contrasting content (e.g., Adham Dannaway's half-designer/half-developer concept).

---

## 5. Animation & Motion Techniques

### Scroll-Triggered Reveals

The most common portfolio animation. Elements fade/slide in as they enter the viewport.

| Approach | Tool | Notes |
|----------|------|-------|
| Vanilla JS | IntersectionObserver | Zero dependency, threshold + rootMargin for control |
| Lightweight lib | Sal.js | Simple, tiny footprint |
| React | Framer Motion `whileInView` | Declarative, handles mount/unmount |
| Complex scenes | GSAP ScrollTrigger | Pin, scrub, timeline control. Industry standard for scroll storytelling. |
| Native CSS (2026) | `animation-timeline: scroll()` | Runs on compositor thread (60fps), zero JS. Chrome/Edge/Opera. |

### Text Reveal Animations

Character-by-character or word-by-word reveals using `clip-path` with staggered delays. GSAP's SplitText plugin is the standard tool. CSS approach: split text into `<span>`s, animate `clip-path: inset()` or `translateY` with `calc(var(--index) * delay)`.

### Page Transitions

- **View Transitions API** — Now baseline in Chrome. Cross-document (MPA) transitions supported. Astro has first-class support via `astro:transitions`. Creates smooth morph effects between pages.
- **Framer Motion AnimatePresence** — For React SPAs. Handles exit animations before component unmount.

### Smooth Scrolling

Lenis is the current standard (Locomotive Scroll is older). Normalizes scroll across browsers, enables scroll-linked effects. Use sparingly — hijacking scroll is controversial for accessibility.

### Card Hover Lift

The standard portfolio card interaction: `translateY(-4px) scale(1.01)` with shadow escalation on hover. Spring easing adds polish.

### Magnetic Buttons

Buttons that subtly follow the cursor when it's nearby. Track cursor position relative to button center, apply small `translate` offset. Libraries: GSAP or vanilla with `mousemove` listener.

### Staggered Reveals

Cards/list items animate in sequence. Set `--index` CSS variable per item, use `animation-delay: calc(var(--index) * 80ms)`. Standard stagger interval: 60-100ms.

### Hero Text Fade-Up

Staggered `translateY` + opacity animation on hero elements. Title first, subtitle 150ms later, CTA buttons 300ms later. Use `animation-fill-mode: both` to hold the start state.

---

## 6. Interactive Elements & Delight

### Custom Cursor Effects

Dot + circle follower that trails the cursor, often with `mix-blend-mode: difference` for automatic contrast on any background. Track with `mousemove`, apply position with `transform` (GPU-accelerated). Sam Goddard's portfolio shows images on cursor hover over text links.

### Theme Toggle

The web.dev approach: SVG mask transition between sun/moon icons. Community resource: toggles.dev for creative toggle designs. FOUC prevention: inline `<script>` in `<head>` before stylesheets that reads localStorage and applies the class.

### Code Playgrounds

Embed live, editable code demos. Sandpack (by CodeSandbox) for React projects. Google Playground Elements for vanilla JS. Josh Comeau embeds interactive playgrounds directly in blog posts.

### Draggable Elements

Hero sections with draggable items (photos, cards, stickers). Andre Souza's portfolio features draggable platters and a scratch-off card. Creates tactile, memorable first impressions.

### Easter Eggs

| Type | Implementation |
|------|----------------|
| **Konami Code** | Listen for `keydown` sequence: up up down down left right left right B A. Trigger hidden mode/theme/page. |
| **Console messages** | CSS-styled `console.log` with ASCII art or a witty hiring message. Many top sites do this. |
| **Source code art** | ASCII art in HTML comments visible in View Source |
| **Hover secrets** | Hidden elements that only appear on hover over specific areas |
| **Multi-tap unlock** | Tapping an element 5+ times reveals hidden content |

### Sound Design

A growing trend. Josh Comeau's hover sounds are the most cited example. Use Web Audio API or Tone.js. **Always off by default** — never autoplay audio. Provide a clear toggle. Keep sounds subtle and non-repetitive.

### GitHub Activity Visualization

Embed your contribution graph using the GitHub GraphQL API. Libraries: github-readme-stats, githubchart-api, Jandi. Shows you're actively building.

### Live Project Metrics

Star counts, download numbers, uptime monitors, Lighthouse scores as badges, "last deployed" timestamps. Signals active maintenance.

---

## 7. Navigation Patterns

### Command Palette (Cmd+K)

A search-driven navigation overlay. Library: cmdk (by Rauno Freiberg, used on Vercel, Linear). Bind to `Cmd+K` / `Ctrl+K`. Uses ARIA combobox roles for accessibility. Great for developer audiences who expect keyboard-driven UIs.

### Sticky Nav with Scroll Effects

`position: sticky` with `backdrop-filter: blur(12px)`. Border/shadow appears on scroll (listen for `scrollY > threshold`). 22% faster navigation stat compared to non-sticky nav. Current standard.

### Sidebar Navigation

Fixed left sidebar with name, bio, and nav links. Content area scrolls independently. Scroll-aware active section highlighting via IntersectionObserver. Best for single-page portfolios.

### Full-Screen Overlay Menu

Mobile-first hamburger that expands to a full-viewport overlay with large-type navigation. Staggered animation on each link. Common on creative portfolios.

---

## 8. Performance & Technical Excellence

### Core Web Vitals Targets (2025-2026)

| Metric | Good Threshold | Notes |
|--------|---------------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | Hardest to pass globally (62% mobile pass rate) |
| CLS (Cumulative Layout Shift) | < 0.1 | Best performing (81% pass rate) |
| INP (Interaction to Next Paint) | < 200ms | Replaced FID in 2024 |

Top portfolios achieve: Lighthouse 95-100, LCP under 1.0s on edge-hosted static, zero CLS, JS bundle 8-15KB (Astro) to 40-80KB (Next.js).

### Image Optimization

- Serve WebP/AVIF with fallback. Use `<picture>` or framework `<Image>` components.
- Set explicit `width`/`height` to prevent CLS
- `fetchpriority="high"` on LCP image
- Lazy-load below-the-fold images with `loading="lazy"`
- Low-quality image placeholders (LQIP) for perceived performance

### Font Loading

- `font-display: swap` (or `optional` for non-essential fonts)
- WOFF2 format only (best compression)
- Subset fonts to used character ranges
- `size-adjust` on fallback font to reduce CLS during swap
- Preload the primary font: `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- Variable fonts reduce total file count

### Critical CSS

Inline above-the-fold CSS in `<head>` to avoid render-blocking. Astro and Next.js handle this automatically. For vanilla sites, tools like Critical or Critters extract it at build time.

### Skeleton Screens

Placeholder shapes shown during load. CSS shimmer effect with `background: linear-gradient` animation. Use `:empty` pseudo-class to show skeleton only when content hasn't loaded.

---

## 9. SEO, Metadata & Discoverability

### Structured Data (JSON-LD)

Add to `<head>` for rich search results:

- **Person schema** — name, job title, URLs, social profiles
- **WebSite schema** — site name, URL
- **BlogPosting schema** — for each blog post (title, date, author, description)
- **BreadcrumbList schema** — for navigation context

Google's Rich Results Test validates your markup.

### Open Graph & Twitter Cards

- `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type`
- `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- These control how your portfolio appears when shared on social media / Slack / Discord

### Sitemap & Robots

- `sitemap.xml` listing all pages. Next.js generates automatically; for static sites, generate at build time.
- `robots.txt` allowing all crawlers
- Canonical URLs on each page

---

## 10. Accessibility

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Decision framework: decorative animations (card reveals, parallax) → disable completely. Informational animations (progress indicators, state changes) → simplify to opacity-only.

JS detection: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`

### Skip Navigation Link

Off-screen link as first focusable element: "Skip to main content." Becomes visible on focus. Links to `#main`. Required for keyboard accessibility.

### Focus Indicators

Use `:focus-visible` (keyboard only), not `:focus` (fires on click too). Minimum 3px ring with sufficient contrast. Never `outline: none` without a replacement.

### Keyboard Navigation

All interactive elements reachable via Tab. Logical tab order. Modal/overlay traps focus within. Escape closes overlays. Arrow keys for menu navigation.

### Color Contrast

Minimum 4.5:1 for body text (WCAG AA). 7:1 for AAA. Avoid pure black (#000) on pure white (#fff) in dark mode — slightly off-values reduce eye strain while maintaining contrast.

### Semantic HTML

`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`. ARIA labels on icon-only buttons (e.g., theme toggle). `lang` attribute on `<html>`.

---

## 11. Design Trends 2025-2026

### Current & Dominant

- **Bento grids** — The defining layout pattern. See [Design Patterns section](#4-design-patterns--layout).
- **Dark mode as default** — Design dark-first with light mode toggle. Use dark gray (`#1a1a1a` range), not pure black.
- **Kinetic typography** — Text that animates on scroll (stretching, rotating, fading). Variable fonts enable expressive type without load overhead.
- **Organic shapes and soft gradients** — Flowing lines and natural shapes replacing hard-edge minimalism.
- **Functional micro-interactions** — Animations serving UX purpose (feedback, navigation cues), not just decoration.

### Emerging

- **Retrofuturism** — 80s/90s-inspired aesthetics with futuristic fonts. Particularly effective for personality.
- **Maximalism** — Counter-reaction to years of minimalism. Richer textures, bolder color, more visual density.
- **AI chatbot integration** — LLM-powered chatbots trained on your resume/projects. "Ask me anything about my work." Architecture: LangChain + Claude/OpenAI + vector store (pgvector, Pinecone).
- **CSS scroll-driven animations** — Native browser support (Chrome/Edge/Opera) for scroll-linked effects with zero JS.
- **View Transitions API** — Smooth page-to-page morphing built into the browser. First-class Astro support.

### Fading

- Infinite scrolling → "contained clarity"
- Flat minimalism with no personality
- Stock photography hero sections
- Cookie-cutter Bootstrap layouts
- Gatsby as a framework choice (replaced by Next.js and Astro)

---

## 12. Tech Stack Landscape

### Frameworks

| Framework | Best For | Key Advantage |
|-----------|----------|---------------|
| **Astro** | Content-driven portfolios, blogs | Zero JS by default. 5x faster than Next.js for static content. Lighthouse 100 achievable. Acquired by Cloudflare (Jan 2026). First-class View Transitions. |
| **Next.js** | Dynamic/interactive portfolios | React Server Components, ISR, massive ecosystem. Best for auth, real-time data, complex interactivity. |
| **SvelteKit** | Performance-obsessed minimal sites | Smallest runtime overhead. Excellent Core Web Vitals. |
| **Vanilla TS** | Maximum control, framework-agnostic | No framework tax. Our current stack. |

Real-world Astro migration: load time 2.1s → 0.4s, JS bundle 120KB → 8KB, Lighthouse 78 → 100.

### Styling

- **Tailwind CSS v4** (Jan 2025) — CSS-first config via `@theme`, no JS config file. Rust engine: 5x faster builds, 100x faster incremental. Native container query support. Our current choice.
- **CSS native** — Increasingly powerful: container queries, cascade layers, nesting, `:has()`. Some devs going frameworkless.

### Animation Libraries

| Library | License | Best For |
|---------|---------|----------|
| **Motion** (formerly Framer Motion) | MIT | React projects. 30M+ monthly npm downloads. Declarative API, gesture support, layout animations. |
| **GSAP** | Proprietary (Webflow-owned) | Complex scroll storytelling. ScrollTrigger plugin. License prohibits use in Webflow-competing tools. |
| **CSS native** | N/A | Lightweight effects. `animation-timeline: scroll()` for scroll-driven animations. Compositor thread, 60fps. |

### CMS for Blog Content

| Option | Best For |
|--------|----------|
| **Astro Content Collections** | Astro portfolios. 5x faster Markdown builds with Content Layer API. |
| **MDX** | Embedding interactive components in blog posts |
| **Velite** | Next.js with type-safe Markdown + Zod validation. Contentlayer replacement. |
| **Notion as CMS** | Teams already using Notion |
| **Contentlayer** | **Abandoned — do not use** |

### Deployment

| Platform | Strengths |
|----------|-----------|
| **Cloudflare Pages** | 300+ edge locations, <50ms global TTFB, unlimited free bandwidth, Astro-aligned |
| **Vercel** | Best DX, zero-config Next.js, built-in analytics, preview deploys per PR. Our current host. |
| **Netlify** | Declining: reduced free tier, slowest edge performance of the three |

### Analytics

| Tool | Model |
|------|-------|
| **Umami** | Open source, self-hostable (free) or hosted ($9/mo). No cookies, GDPR compliant. |
| **Plausible** | Open source, hosted (~$9/mo). Single dashboard, <1KB script, EU-owned. |
| **Vercel Analytics** | Built into Vercel. Real User Monitoring, zero-config. |

---

## 13. Common Mistakes & Anti-Patterns

| Mistake | Why It Hurts |
|---------|-------------|
| Skill bars / percentage ratings | Meaningless self-assessment. What does "85% JavaScript" mean? |
| Too many projects | Dilutes impact. 3-5 strong > 15 mediocre. |
| No live demos | 85% of recruiters want to see working software |
| Tutorial clones as "projects" | Immediately recognized. Shows you followed instructions, not that you can build. |
| Writing for engineers only | HR reads your portfolio too. Use plain language for descriptions, tech details in case studies. |
| Broken or stale demos | Worse than no demo. Test your links regularly. |
| Excessive animation everywhere | Fatiguing. 1-2 decorative moments per page. Animate intentionally. |
| Not mobile responsive | Expected, not optional |
| Generic about section | "Passionate full-stack developer" describes everyone. Be specific. |
| Poor accessibility | An accessibility failure on a developer's portfolio is a statement about your engineering values. |
| Hijacking scroll without reason | Smooth scroll libraries can break expected behavior. Use sparingly. |
| No meta tags / OG images | Your portfolio looks broken when shared on social media |
| Heavy JS bundles on static content | If your portfolio loads 500KB of JS for a page that's mostly text, it undermines your technical credibility |
| Sound that autoplays | Universally hated. Always off by default with explicit opt-in. |

---

## 14. Sources

### Guides & Advice
- Josh Comeau — "Building an Effective Dev Portfolio" (free book)
- Scrimba Podcast — How to Create a Web Dev Portfolio (interview with Josh Comeau)
- DEV Community — The Anthology of a Creative Developer: A 2026 Portfolio

### Curated Lists & Galleries
- Emma Bostian — developer-portfolios (GitHub, massive collection)
- Awwwards — Portfolio Winners (awwwards.com/websites/winner_category_portfolio/)
- Muzli — Top 100 Most Creative Portfolio Websites 2025
- Wall of Portfolios (wallofportfolios.in)
- WebPortfolios.dev
- uses.tech — Developer /uses pages
- nownownow.com — Developer /now pages

### Trend Reports
- Wix — 11 Biggest Web Design Trends 2026
- Webflow — 8 Web Design Trends 2026
- Figma — Top Web Design Trends 2026
- AI Goodies — Aesthetics in the AI Era: Visual + Web Design Trends 2026
- Senorit — Bento Grid Design Trend 2025
- Design Shack — 30+ Portfolio Design Trends 2025

### Technical References
- MDN — View Transitions API
- MDN — CSS Scroll-Driven Animations
- Chrome Developers — Scroll-Triggered Animations (Chrome 145)
- scroll-driven-animations.style (demos and examples)
- Motion.dev — GSAP vs Motion comparison
- Tailwind CSS v4.0 Blog

### Portfolio Roundups
- Colorlib — 21 Best Developer Portfolios 2026
- Hostinger — 25 Web Developer Portfolio Examples
- Alvaro Trigo — 27 Web Developer Portfolio Examples
- WeAreDevelopers — Portfolio Inspiration March 2025
- SiteBuilderReport — Web Designer & Developer Portfolios 2026
- Really Good Designs — 18 Interactive Portfolio Examples
- CreativeDevJobs — Best Three.js Portfolio Examples 2025

### Stack & Deployment
- Pagepro — Astro vs Next.js 2026 (benchmarks)
- Cloudflare — Acquires Astro (press release, Jan 2026)
- DEV — Cloudflare vs Vercel vs Netlify Edge Performance 2026
- Plausible vs Umami comparison (vemetric.com)
- Core Web Vitals 2026 (corewebvitals.io)
