# Arash Ershadi — Architectural Designer Portfolio
### وبگاه و مونوگراف معماری آرش ارشادی

A production-grade, editorial architectural designer portfolio built with **Astro**, **TypeScript**, and **Playwright QA**. Designed in the tradition of physical architectural monographs, featuring warm restrained materiality, technical drawing plates, and full bilingual parity across English (LTR) and Persian / Farsi (RTL).

---

## Key Features

- **Editorial Monograph Aesthetic:** Warm off-white canvas (`#faf9f5`), deep charcoal typography (`#1a1a19`), architectural hairline grids, and restrained terracotta accents (`#b85d3b`).
- **True Bilingual Architecture (EN / FA):**
  - English LTR routes at root (`/`, `/projects/`, `/resume/`, `/about/`, `/contact/`, `/privacy/`, `/thank-you/`).
  - Persian RTL routes with localized typography (`/fa/`, `/fa/projects/`, `/fa/resume/`, `/fa/about/`, `/fa/contact/`, `/fa/privacy/`, `/fa/thank-you/`).
  - 1:1 dynamic language switcher maintaining exact equivalent subpage locations.
- **Client-Side Project Filtering:** Instant filtering by Typology and Status with zero backend required and live ARIA status counters.
- **Monograph Story Blocks & Accessible Lightbox:**
  - Composable editorial blocks: `fullBleed`, `twoUp`, `imageText`, `drawingPlate`, `gallery`, and `quote`.
  - Accessible modal lightbox with keyboard navigation (`ArrowLeft`, `ArrowRight`), `Escape` dismissal, focus trapping, and focus restoration to the trigger element.
- **Print Stylesheet & Curriculum Vitae:**
  - Dedicated `@media print` rules optimizing the résumé for clean single-page / multi-page physical printing and PDF export.
  - Local placeholder PDF downloads for English and Persian résumés.
- **Bilingual SEO & Structured Data:**
  - Automatic `sitemap.xml` with `xhtml:link` bilingual alternate annotations.
  - Dynamic canonical links, `hreflang="en"`, `hreflang="fa"`, and `hreflang="x-default"`.
  - JSON-LD schemas: `ProfilePage`, `Person`, `BreadcrumbList`, `CreativeWork`.
  - Configured `robots.txt` and custom bilingual `404` error recovery.
- **Privacy & Safety First:**
  - Zero default tracking, advertising pixels, or telemetry beacons.
  - Optional Google Analytics gated strictly behind `PUBLIC_GA_MEASUREMENT_ID`.
  - 100% original local SVG drawings and diagrams — zero hotlinked third-party assets.

---

## Project Structure

```
├── conductor/                 # Conductor task specifications, plans, and styleguides
├── public/                    # Static assets, SVG drawings, favicon, and PDF downloads
│   ├── favicon.svg
│   ├── images/                # Social sharing OpenGraph images
│   ├── projects/              # Project drawing plates and covers
│   ├── resume-en.pdf          # Downloadable English résumé
│   └── resume-fa.pdf          # Downloadable Persian résumé
├── src/
│   ├── components/            # Reusable Astro UI components
│   │   ├── Footer.astro       # Editorial monograph footer
│   │   ├── Header.astro       # Header, navigation, and mobile menu
│   │   ├── LanguageSwitcher.astro # 1:1 route language switcher
│   │   ├── Lightbox.astro     # Accessible dialog lightbox modal
│   │   ├── ProjectCard.astro  # Monograph project card with badge & metadata
│   │   ├── ProjectFilters.astro # Client-side reactive project filters
│   │   └── StoryBlockRenderer.astro # Composable editorial layout blocks
│   ├── content/               # Astro Content Collections
│   │   ├── config.ts          # Content collection configuration
│   │   ├── schema.ts          # Zod validation schema for projects
│   │   └── projects/          # Markdown projects + _template
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML document shell with SEO, metadata & analytics
│   ├── pages/                 # File-based routing (EN and /fa/ routes)
│   ├── styles/
│   │   └── global.css         # Design system tokens, typography & print styles
│   └── utils/
│       ├── i18n.ts            # Route normalizers, translation mappers & dictionary
│       ├── projects.ts        # Project query, sorting, and facet utilities
│       └── sitemapIntegration.ts # Custom bilingual XML sitemap & robots generator
├── tests/
│   ├── e2e/                   # Playwright end-to-end test suite
│   └── unit/                  # Vitest unit test suites (tokens, layout, i18n, schema, seo, dom)
├── astro.config.mjs
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation
```bash
# Install dependencies
npm install
```

### Local Development
```bash
# Start Astro development server
npm run dev
# Open http://localhost:4321 in your browser
```

### Production Build & Preview
```bash
# Build static site to dist/
npm run build

# Preview static build locally
npm run preview
```

### Running Test Suites
```bash
# Run unit, schema, SEO, and DOM QA tests with Vitest
npm test

# Run tests with code coverage report
npm run test:coverage

# Run Playwright End-to-End tests
npx playwright test
```

---

## How to Author New Projects

To add a new architectural project to the portfolio:

1. Duplicate the template folder:
   ```bash
   cp -r src/content/projects/_template src/content/projects/your-project-slug
   ```
2. Open `src/content/projects/your-project-slug/index.md` and update the metadata:
   - `order`: Numeric display order (e.g. `4`)
   - `featured`: `true` or `false`
   - `year`, `location`, `typology`, `scale`, `status`, `tools`, `collaborators`, `tags`
   - `en`: English `title`, `excerpt`, `premise`, `gallery`, and `storyBlocks`
   - `fa`: Persian `title`, `excerpt`, `premise`, `gallery`, and `storyBlocks`
3. Place project drawings / photographs in `public/projects/your-project-slug/`.
4. Run `npm run build` to verify static compilation and automatic sitemap inclusion.

---

## Story Block Types

Projects support rich editorial layouts via `storyBlocks`:
- **`fullBleed`**: Full-width hero drawing or photograph with caption.
- **`imageText`**: Two-column layout with technical diagram on the side and analytical text.
- **`drawingPlate`**: Technical card with drawing title, scale indicator (e.g., `SCALE 1:200`), and plate borders.
- **`twoUp`**: Side-by-side comparative drawings or before/after study.
- **`quote`**: Large-type architectural or theoretical premise quotation.

---

## Continuous Integration & Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) configured for automated deployment to **GitHub Pages**:
- Triggers on every push to `master`.
- Installs dependencies and runs unit test verification (`npm test`).
- Builds static production bundle (`npm run build`).
- Deploys static artifacts directly to GitHub Pages.

---

## License

Code is open-source under the MIT License. Architectural designs, project premises, and technical drawings are original works of Arash Ershadi.
