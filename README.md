# APACHE SPARK — Enterprise Technical Engineering Portfolio & Project Mini-System

An award-winning, production-ready marketing website and past-projects case study system engineered for technology services firm **APACHE SPARK**.

Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, and **Framer Motion**, strictly conforming to the authoritative Apache Spark Brand Guidelines, Design Tokens, and Drafting Motion Language.

---

## 1. System Architecture & Ethos

### 1.1 Brand Identity & Color System
The visual language reflects physical architectural drafting, technical press plates, and engineering schematics:
- **Default Theme (Paper)**:
  - `Ink`: `#14181C` — Structural line work, headers, primary typography, solid buttons.
  - `Paper`: `#F2EFE8` — Primary substrate/canvas background.
  - `Accent`: `#9E5430` — Single copper/rust accent for focal points, inner diamonds, active indicators.
  - `Soft`: `#7C7568` — Secondary annotations, dimension lines, drafting metadata.
  - `Hairline Rules`: `rgba(20,24,28,0.16)` / `rgba(20,24,28,0.12)` — 1px seam borders, coordinate ticks.
- **Inverted Sheets (`data-sheet="inverted"`)**:
  - Strictly limited by design policy to:
    1. **Section 07: Metrics**
    2. **Section 14: CTASheet**
    3. **Global Footer**
  - Inverted Tokens: Background `#14181C`, Foreground `#F2EFE8`, Accent `#C97A4A`, Rules `rgba(242,239,232,0.16)`.
- **Zero Cosmetic Ornaments**:
  - **No box shadows**.
  - **No radial/linear gradients**.
  - **No neon glows**.
  - Visual hierarchy and depth are rendered purely through 1px drafting seams, precise padding multiples, hairline rules, and negative space.

### 1.2 Five-Scene Motion Language & Cue Sheet
The preloader and core entry interactions implement the five-scene choreography calibrated from `spark-preloader.js`:
1. **Scene 1: Locate** (`0.00s – 0.62s`) — Crosshair reticles locate center, 1px registration rules extend across the viewport.
2. **Scene 2: Draft** (`0.62s – 1.42s`) — Geometric diamond mark strokes draw via `stroke-dashoffset`.
3. **Scene 3: Set** (`1.42s – 2.50s`) — Inner copper diamond pops, vertices lock into coordinate grid.
4. **Scene 4: Hold** (`2.50s – 3.00s+`) — Stable inspection hold (min 1.1s, cap 4.0s).
5. **Scene 5: Print** (`3.00s+`) — 3px accent press-sweep bar traverses viewport; content resolves into the canvas.

Preloader features session-storage bypass (`sessionStorage.getItem('spark_preloaded')`), single-click or keystroke skip, and full `prefers-reduced-motion` compliance.

---

## 2. Directory Structure

```
apache-spark-portfolio/
├── public/
│   ├── brand/               # Brand SVG, PNG, and favicon assets
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── @modal/          # Next.js Parallel & Intercepting route slot
│   │   │   ├── (.)projects/[slug]/
│   │   │   └── default.tsx
│   │   ├── about/           # About engineering firm page
│   │   ├── contact/         # Direct client intake & PGP specification
│   │   ├── projects/        # URL-filtered project archive
│   │   │   ├── [slug]/      # Deep static case studies
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── services/        # 4 Core engineering pillars
│   │   ├── error.tsx        # Global error boundary with diagnostic trace
│   │   ├── globals.css      # Tailwind v4 @theme, brand tokens, grid utilities
│   │   ├── layout.tsx       # Root layout, fonts, smooth scroll, organization JSON-LD
│   │   ├── loading.tsx      # Global drafting skeleton
│   │   ├── not-found.tsx    # Global 404 engineering sheet
│   │   ├── opengraph-image.tsx # Dynamic OG image generator
│   │   ├── page.tsx         # Home page (Sections 01–14)
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── brand/           # Mark, Preloader, SheetLabel, DimensionLine, Crosshair, etc.
│   │   ├── fx/              # SmoothScroll (Lenis+GSAP), CustomCursor, Magnetic, WipeText, Counter
│   │   ├── layout/          # Navbar, Footer, MobileDrawer, CommandPalette (⌘K)
│   │   ├── projects/        # ProjectCard, ProjectCover (SVG generator), Filters, Modal, Lightbox
│   │   ├── sections/        # Sections 01 through 14
│   │   └── webgl/           # R3F Canvas, PlotterField, PaperGrainPass, WebGLGuard
│   ├── data/                # Typed data models (12 full case studies, services, team, FAQ, etc.)
│   ├── hooks/               # useReducedMotion, useProjectFilters, useWebGLSupport, etc.
│   ├── lib/                 # animations.ts, utils.ts, constants.ts
│   ├── shaders/             # Custom GLSL shaders (plotterField, paperGrain, pressSweep, coverEngrave)
│   └── types/               # TypeScript interfaces for all data structures
├── next.config.ts           # Next.js 15 production config
├── tsconfig.json            # Strict TypeScript configuration
└── package.json
```

---

## 3. Key Technical Features

### 3.1 Procedural Technical Drawing Engine (`ProjectCover.tsx`)
Each project card and case study header features a deterministic, vector-accurate SVG plate generated by hashing the project slug with a linear-congruential pseudo-random number generator (PRNG):
1. **Rack Elevation**: 42U equipment cabinet with patch panels, switches, cable managers, and PDU rails.
2. **Network Topology**: Redundant core/distribution switches, edge firewalls, and SFP+ trunk indicators.
3. **Floor Plan**: IDF/MDF closets, conduit runs, structured cabling drop matrices, and dimension hairlines.
4. **Cable Schedule**: Patch matrix, termination terminals, color-coded accent routes, and run measurements.

### 3.2 Intercepting Route Project Mini-System
- Clicking any project card in the archive smoothly opens an intercepted Quick-Preview Modal (`@modal/(.)projects/[slug]`) preserving scroll position and URL history.
- Direct navigation or page refreshes automatically render the full static case-study sheet (`/projects/[slug]`) complete with side-rail Table of Contents, Before/After architectural sliders, Lightbox gallery, and JSON-LD `CreativeWork` metadata.

### 3.3 Offline-Ready & Self-Contained
- **Zero External API Calls**: All 12 comprehensive case studies, service definitions, testimonials, team members, and FAQs are modeled in typed TypeScript files.
- **Zero External CDN Dependencies**: Archivo and IBM Plex Mono fonts are integrated through Next.js font optimization.
- **WebGL Hardware Guard**: Automatically detects WebGL2 capability, battery saver mode (`navigator.getBattery`), `prefers-reduced-motion`, and CPU core count (`hardwareConcurrency`), gracefully degrading to clean 2D vector plates when appropriate.

---

## 4. Getting Started

### Prerequisites
- Node.js `v20.x` or higher (tested on Node `v22.14.0`)
- npm `v10.x` or higher

### Installation
```bash
# Install project dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Type Checking
```bash
# Type check without emitting
npx tsc --noEmit

# Compile production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Keyboard Navigation & Accessibility

- **⌘K / Ctrl+K**: Toggle Global Command Palette (navigate between routes, services, and projects).
- **Tab / Shift+Tab**: Full focus management across cards, accordions, filters, and modal dialogs.
- **Esc**: Dismiss preloader, command palette, quick-preview modals, or image lightboxes.
- **Left / Right Arrows**: Traverse project images in Lightbox mode.

---

## 6. Specification & Quality Assurance

- [x] **Phase 1**: Configuration, CSS tokens, library helpers, custom hooks, and brand assets.
- [x] **Phase 2**: Comprehensive data system (12 complete enterprise case studies, services, FAQ, team).
- [x] **Phase 3**: Brand components (Mark, MarkDrafted, Lockup, Preloader, SheetLabel, DimensionLine).
- [x] **Phase 4**: GLSL shaders (PaperGrain, PlotterField, PressSweep, CoverEngrave) & WebGL guard.
- [x] **Phase 5**: Motion & layout components (Lenis smooth scroll, Cursor, Navbar, Footer, Command Palette).
- [x] **Phase 6**: Home page sections (Sections 01 through 14) with scrollytelling and interactive network diagram.
- [x] **Phase 7**: Past-projects mini-system with URL-driven filtering, intercepting modal, and full case study pages.
- [x] **Phase 8**: Sub-pages (/services, /about, /contact), SEO (sitemap, robots, OG image), loading/error boundaries, and README.
