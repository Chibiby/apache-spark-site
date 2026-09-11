# APACHE SPARK — Comprehensive Engineering Handoff Document

**Project:** Apache Spark Marketing Site & Past-Projects Mini-System  
**Client / Brand:** APACHE SPARK (Technology Services: Systems, Software, Networks, Infrastructure)  
**Status:** 100% Production Ready — All 8 Phases Delivered & Verified  
**Date:** September 10, 2026  
**Build Status:** `npm run build` -> 0 Errors | `npx tsc --noEmit` -> 0 Errors | `npm run lint` -> 0 Warnings/Errors  

---

## 1. Executive Summary & Philosophy

This project delivers an Awwwards/FWA-caliber marketing website and past-projects case study system for technology services firm **APACHE SPARK**. The system is built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Three.js / React Three Fiber, GSAP ScrollTrigger, and Framer Motion.

The engineering ethos strictly follows the physical drafting aesthetic of engineering schematics, technical press plates, and architectural drawings:
1. **Light Mode Substrate**: Warm drafting paper substrate (`#F2EFE8`) with deep technical ink (`#14181C`).
2. **Strict Inverted Sheet Isolation**: Inverted dark sheets (`data-sheet="inverted"`) are strictly reserved for **Section 07 (Metrics)**, **Section 14 (CTASheet)**, and the **Global Footer**.
3. **Zero Cosmetic Ornaments**: No box shadows, no linear or radial gradients, and no neon glows. Depth and hierarchy are achieved exclusively through 1px drafting seams, hairlines (`rgba(20,24,28,0.16)`), dimension lines, and negative space.
4. **Offline-First & Self-Contained**: 100% offline-ready. Zero runtime external API calls, zero database connections, zero third-party CDN requests. All typography is bundled via Next.js font optimization (`Archivo` and `IBM Plex Mono`).

---

## 2. Design Tokens & Visual Specifications

### 2.1 Color Tokens
All tokens are defined in `src/app/globals.css` under Tailwind v4 `@theme` and CSS `:root`:

| Token | CSS Variable | Hex / RGBA Value | Usage Description |
| :--- | :--- | :--- | :--- |
| **Ink** | `--ink` | `#14181C` | Primary typography, headers, solid buttons, structural lines. |
| **Paper** | `--paper` | `#F2EFE8` | Primary page substrate and canvas background. |
| **Accent** | `--accent` | `#9E5430` | Single rust/copper accent for inner diamond, dimension ticks, active states. |
| **Accent-Lt** | `--accent-lt` | `#C97A4A` | Accent color applied on inverted ink backgrounds. |
| **Soft** | `--soft` | `#7C7568` | Secondary typography, coordinate annotations, metadata. |
| **Rule** | `--rule` | `rgba(20,24,28,0.16)` | 1px card seams, section boundaries, hairline borders. |
| **Guide** | `--guide` | `rgba(20,24,28,0.30)` | Alignment guides, hover border highlights. |
| **Tick** | `--tick` | `rgba(20,24,28,0.34)` | Measurement ticks on dimension lines. |
| **Grid** | `--grid` | `rgba(20,24,28,0.05)` | 72px repeating background drafting grid lines. |

### 2.2 Inverted Sheet Tokens (`[data-sheet="inverted"]`)
When `data-sheet="inverted"` is declared, CSS variables seamlessly remap:
- `--paper`: `#14181C` (Dark background)
- `--ink`: `#F2EFE8` (Light foreground text)
- `--accent`: `#C97A4A` (Copper on dark)
- `--soft`: `rgba(242, 239, 232, 0.62)`
- `--rule`: `rgba(242, 239, 232, 0.16)`

### 2.3 Typography Standards
- **Primary / Display (`Archivo`)**: Weights 400, 500, 600, 700. `letter-spacing: -0.015em`, `line-height: 1.02`. Used for hero statements, section headings, and quotes.
- **Monospace / Technical (`IBM Plex Mono`)**: Weights 400, 500. `letter-spacing: 0.18em - 0.26em`, all-caps labels, dimension tags, status codes, and coordinate stamps.

---

## 3. Motion Language & Five-Scene Drafting Choreography

The motion system is governed by `src/lib/animations.ts` and ported from the reference implementation `spark-preloader.js`.

### 3.1 Cue Sheet Timing Parameters
```typescript
export const CUE_SHEET = {
  TOTAL: 3.0,     // Target total duration (seconds)
  LOCATE: 0.00,   // Scene 1: Reticle & viewport guides extend
  DRAFT: 0.62,    // Scene 2: Geometric diamond outline draws via stroke-dashoffset
  SET: 1.42,      // Scene 3: Inner copper diamond pops, vertices lock
  PRINT: 2.50,    // Scene 4/5: Hold & 3px copper press-sweep bar traverses viewport
  MIN_HOLD: 1.1,  // Minimum stable inspection hold
  HOLD_CAP: 4.0,  // Maximum timeout cap
};
```

### 3.2 Preloader Implementation (`src/components/brand/Preloader.tsx`)
- **Scene 1 (Locate)**: Centering reticle locks on screen center, horizontal and vertical 1px hairline rules extend to viewport boundaries.
- **Scene 2 (Draft)**: Diamond mark path (`M128,32 L224,128 L128,224 L32,128 Z`) draws progressively with `stroke-dashoffset`.
- **Scene 3 (Set)**: Inner diamond pops with copper fill `#9E5430`; coordinate vertices flash.
- **Scene 4 (Hold)**: Subtitle tags cycle ("SOFTWARE", "SYSTEMS", "NETWORKS", "INFRASTRUCTURE").
- **Scene 5 (Print)**: Full-width copper press-sweep bar wipes downward, dissolving the preloader and revealing the live DOM.
- **Guard & Accessibility**:
  - `sessionStorage.getItem('spark_preloaded')` ensures preloader runs only once per browsing session.
  - Clicking anywhere or pressing any key immediately skips to completion.
  - `prefers-reduced-motion` bypasses animation completely.

---

## 4. Complete Codebase Architecture & File Inventory

```
apache-spark-portfolio/
├── public/
│   ├── brand/                      # Brand vectors, mark variants, PNG assets, favicons
│   ├── favicon.ico
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── @modal/                 # Parallel/Intercepting Route slot
│   │   │   ├── (.)projects/[slug]/
│   │   │   │   └── page.tsx        # Intercepted project quick-preview modal
│   │   │   └── default.tsx         # Null fallback for modal slot
│   │   ├── about/
│   │   │   └── page.tsx            # Engineering ethos, firm history, team standards
│   │   ├── contact/
│   │   │   └── page.tsx            # Technical engagement intake & PGP key specification
│   │   ├── projects/
│   │   │   ├── [slug]/
│   │   │   │   ├── not-found.tsx   # Project-specific 404 sheet
│   │   │   │   └── page.tsx        # Deep static case study page (generateStaticParams)
│   │   │   ├── ProjectsArchiveClient.tsx # Filterable project archive client logic
│   │   │   ├── loading.tsx         # Project archive skeleton
│   │   │   └── page.tsx            # Suspense wrapper for URL search params
│   │   ├── services/
│   │   │   └── page.tsx            # 4 Architectural engineering pillars deep dive
│   │   ├── error.tsx               # Client-side global error boundary with diagnostics
│   │   ├── globals.css             # Tailwind v4 @theme, tokens, 72px grid, flat buttons
│   │   ├── layout.tsx              # Root layout, fonts, smooth scroll, organization schema
│   │   ├── loading.tsx             # Root drafting skeleton
│   │   ├── not-found.tsx           # Global 404 engineering sheet
│   │   ├── opengraph-image.tsx     # Dynamic Edge SVG OpenGraph brand card
│   │   ├── page.tsx                # Home page assembling Sections 01–14
│   │   ├── robots.ts               # Robots.txt generator
│   │   └── sitemap.ts              # XML Sitemap generator for all static routes
│   ├── components/
│   │   ├── brand/                  # Core brand geometry & drafting components
│   │   │   ├── ConstructionGrid.tsx # Repeating 72px background grid lines
│   │   │   ├── Crosshair.tsx       # 1px drafting reticle
│   │   │   ├── DimensionLine.tsx   # Architectural dimension line with ticks & labels
│   │   │   ├── InvertedSheet.tsx   # Container forcing [data-sheet="inverted"]
│   │   │   ├── Lockup.tsx          # Horizontal brand mark + typography lockup
│   │   │   ├── LockupStacked.tsx   # Vertical stacked brand lockup
│   │   │   ├── MarginNote.tsx      # Technical margin annotation with brackets
│   │   │   ├── Mark.tsx            # Exact 256px SVG diamond mark with copper center
│   │   │   ├── MarkDrafted.tsx     # Animated SVG diamond mark
│   │   │   ├── Preloader.tsx       # Complete cue-sheet preloader
│   │   │   ├── PressBar.tsx        # 3px copper press bar
│   │   │   ├── SheetLabel.tsx      # Architectural drawing sheet identifier badge
│   │   │   └── index.ts
│   │   ├── fx/                     # Effects, motion, physics & interaction
│   │   │   ├── Counter.tsx         # Scroll-triggered count-up animation
│   │   │   ├── CustomCursor.tsx    # 1px drafting crosshair cursor
│   │   │   ├── DraftReveal.tsx     # Drafting stroke-dashoffset reveal
│   │   │   ├── DrawLine.tsx        # SVG 1px line drawing animation
│   │   │   ├── Magnetic.tsx        # Physics magnetic attraction on hover
│   │   │   ├── Marquee.tsx         # Seamless infinite ticker
│   │   │   ├── PageTransition.tsx  # Route transition wrapper
│   │   │   ├── ParallaxLayer.tsx   # Scroll-driven parallax container
│   │   │   ├── SmoothScroll.tsx    # Lenis smooth scroll coupled with GSAP ticker
│   │   │   ├── WipeText.tsx        # Clip-path wipe text reveal
│   │   │   └── index.ts
│   │   ├── layout/                 # Structural navigation & shell
│   │   │   ├── CommandPalette.tsx  # Accessible ⌘K / Ctrl+K search modal
│   │   │   ├── Footer.tsx          # Inverted sheet with live multi-timezone clocks
│   │   │   ├── MobileDrawer.tsx    # Mobile navigation sheet drawer
│   │   │   ├── Navbar.tsx          # Sticky navigation with sliding layoutId indicator
│   │   │   ├── ScrollProgress.tsx  # Top 2px scroll progress bar
│   │   │   └── index.ts
│   │   ├── projects/               # Project showcase mini-system
│   │   │   ├── BeforeAfterSlider.tsx # Interactive before/after architecture slider
│   │   │   ├── CardSkeleton.tsx    # Shimmering drafting skeleton for project cards
│   │   │   ├── EmptyState.tsx      # "NO SHEETS MATCH" empty filter state
│   │   │   ├── Lightbox.tsx        # Fullscreen accessible image lightbox with keyboard nav
│   │   │   ├── ProjectCard.tsx     # 1px seam project card with SVG plate & hover states
│   │   │   ├── ProjectCover.tsx    # Procedural SVG plate engine (4 plate types)
│   │   │   ├── ProjectFilters.tsx  # Discipline, Sector, Year filter chips
│   │   │   ├── ProjectGallery.tsx  # Multi-plate technical gallery
│   │   │   ├── ProjectGrid.tsx     # AnimatePresence layout reflow grid
│   │   │   ├── ProjectMeta.tsx     # Side-rail metadata specification table
│   │   │   ├── ProjectNav.tsx      # Prev/Next adjacent project navigation
│   │   │   ├── ProjectSearch.tsx   # Instant title/client/tag search input
│   │   │   ├── ProjectSort.tsx     # Year/Title sorting dropdown
│   │   │   ├── QuickPreviewModal.tsx # Intercepted route modal dialog
│   │   │   ├── ViewToggle.tsx      # Grid vs List view switcher
│   │   │   └── index.ts
│   │   ├── sections/               # Home page sections 01–14
│   │   │   ├── Capability.tsx      # Section 05: Bento grid with hover crosshairs
│   │   │   ├── CTASheet.tsx        # Section 14: Inverted CTA with giant parallax title
│   │   │   ├── Descriptors.tsx     # Section 03: 4 Engineering pillars with copper dashes
│   │   │   ├── Engagements.tsx     # Section 11: 3 Engagement tiers (Advisory, Build, Managed)
│   │   │   ├── FAQ.tsx             # Section 13: Technical drafting accordion
│   │   │   ├── Hero.tsx            # Section 02: Hero with dual buttons & coordinate badges
│   │   │   ├── Metrics.tsx         # Section 07: Inverted sheet with 4 animated counters
│   │   │   ├── NetworkDiagram.tsx  # Section 06: Interactive SVG network topology explorer
│   │   │   ├── ProcessSheet.tsx    # Section 08: GSAP pinned scrollytelling drawing sheet
│   │   │   ├── ProjectsPreview.tsx # Section 09: Horizontal draggable case study reel
│   │   │   ├── Services.tsx        # Section 04: 1px-seam 4-pillar architectural service cards
│   │   │   ├── Team.tsx            # Section 12: Technical leadership grid
│   │   │   ├── Testimonials.tsx    # Section 10: Draggable client quote snap carousel
│   │   │   └── index.ts
│   │   └── webgl/                  # Three.js / R3F / Postprocessing
│   │       ├── CoverEngraveMesh.tsx # Halftone engrave shader mesh
│   │       ├── Effects.tsx         # Postprocessing effect stack
│   │       ├── PaperGrainPass.tsx  # Ordered-dither paper noise pass
│   │       ├── PlotterField.tsx    # Network graph plotter line field
│   │       ├── PressSweepPass.tsx  # Copper press sweep wipe transition
│   │       ├── SceneCanvas.tsx     # Persistent R3F Canvas background
│   │       ├── SceneCanvasWrapper.tsx # Client Component wrapper for dynamic ssr:false
│   │       ├── WebGLGuard.tsx      # GPU / low-power / reduced-motion hardware guard
│   │       └── index.ts
│   ├── data/                       # Strongly typed data models
│   │   ├── faq.ts                  # 8 Architectural & delivery FAQs
│   │   ├── nav.ts                  # Navigation routes & metadata
│   │   ├── projects-part1.ts       # Projects 1–4 (Manufacturing, Healthcare, Logistics, Education)
│   │   ├── projects-part2.ts       # Projects 5–8 (Energy, Financial, Aerospace, Telecom)
│   │   ├── projects-part3.ts       # Projects 9–12 (Defense, Media, Smart City, Rail)
│   │   ├── projects.ts             # Aggregated export & helper functions (slug lookup, etc.)
│   │   ├── services.ts             # 4 Core engineering pillars + bento items
│   │   ├── stats.ts                # 4 Core enterprise metrics
│   │   └── team.ts                 # 6 Technical engineering leads
│   ├── hooks/                      # Custom React hooks
│   │   ├── index.ts
│   │   ├── useLockBodyScroll.ts    # Scroll lock for modals and mobile drawer
│   │   ├── useLowPowerMode.ts      # Battery status API detection
│   │   ├── useMediaQuery.ts        # Responsive breakpoint matcher
│   │   ├── useMousePosition.ts     # Normalized cursor coordinates
│   │   ├── useProjectFilters.ts    # URL searchParams filter & sort state synchronization
│   │   ├── useReducedMotion.ts     # prefers-reduced-motion media query listener
│   │   ├── useScrollDirection.ts   # Up/Down scroll detection
│   │   └── useWebGLSupport.ts      # WebGL2 context & extensions validation
│   ├── lib/                        # Core utilities & constants
│   │   ├── animations.ts           # Easing cubic-beziers, cue sheet timings, seg()
│   │   ├── constants.ts            # Brand geometry, colors, site metadata
│   │   └── utils.ts                # cn() clsx + twMerge helper
│   ├── shaders/                    # Raw GLSL shader string definitions
│   │   ├── coverEngrave.ts         # Riso misregistration & halftone fragment shader
│   │   ├── lib.glsl.ts             # Shared noise & 8x8 Bayer dithering matrix
│   │   ├── paperGrain.ts           # Paper fiber noise postprocessing shader
│   │   ├── plotterField.ts         # Pen-plotter vertex & line fragment shader
│   │   └── pressSweep.ts           # 3px copper bar wipe postprocessing shader
│   └── types/
│       └── index.ts                # Complete TypeScript domain interfaces
├── eslint.config.mjs               # ESLint config with jsx-no-comment-textnodes disabled
├── next.config.ts                  # Transpile packages & build optimizations
├── package.json                    # Project dependencies & npm scripts
├── postcss.config.mjs              # Tailwind CSS PostCSS plugin
├── tsconfig.json                   # Strict TypeScript compiler options
└── README.md                       # High-level overview & setup instructions
```

---

## 5. Procedural SVG Technical Drawing Engine (`ProjectCover.tsx`)

A signature technical feature of the project is the **Procedural SVG Plate Generator** located in `src/components/projects/ProjectCover.tsx`. Rather than using generic stock photos, each of the 12 case studies renders a deterministic, vector-accurate engineering drawing generated from a hash of its slug.

### 5.1 Plate Typologies
1. **Type 0: 42U Server Rack Elevation**:
   - Outer equipment frame with rack unit (U) increment divisions.
   - Patch panels with port matrices, network switches, and PDU rails.
   - Server chassis with indicator LEDs and copper-highlighted core switches.
2. **Type 1: Redundant Network Topology**:
   - Edge firewalls, dual core distribution switches, and compute nodes.
   - 1px dashed trunk lines and copper-highlighted redundant uplinks.
   - SFP+ transceiver port indicators and packet flow annotations.
3. **Type 2: Architectural Datacenter Floor Plan**:
   - Cold aisle / hot aisle containment boundaries.
   - Conduit runs, IDF/MDF closet boundaries, and structured cabling drops.
   - Dimension hairlines with measurement callouts.
4. **Type 3: Structured Cable Termination Schedule**:
   - Patch field matrix with terminal blocks.
   - Color-coded copper routing paths and bundle ties.
   - Run length annotations and verification stamps.

---

## 6. Past-Projects Mini-System Architecture

The projects archive and case study subsystem is located in `src/app/projects/` and `src/components/projects/`:

### 6.1 URL-Synchronized Filtering & Search
- Handled by `src/hooks/useProjectFilters.ts` and `src/app/projects/ProjectsArchiveClient.tsx`.
- Synchronizes discipline (`Software`, `Systems`, `Networks`, `Infrastructure`), sector (`Manufacturing`, `Healthcare`, `Logistics`, `Education`, `Retail`, `Public`), search query, and sort order (`year-desc`, `year-asc`, `title-asc`) directly to the URL query string (`?discipline=...&sector=...`).
- Wrapped in a `<Suspense>` boundary in `src/app/projects/page.tsx` to enable static pre-rendering of the route shell.
- Results animate smoothly with Framer Motion `layout` and `AnimatePresence`.

### 6.2 Next.js Parallel & Intercepting Routes
- When a user clicks a project card while browsing the archive, Next.js intercepts the navigation via `@modal/(.)projects/[slug]/page.tsx` and renders `QuickPreviewModal.tsx`.
- The modal includes full keyboard accessibility (Esc dismiss), background scroll locking (`useLockBodyScroll`), focus trapping, and Next/Prev project cycling.
- Direct navigation, deep links, or browser refreshes bypass the modal and directly serve the full static case study sheet at `/projects/[slug]/page.tsx`.

### 6.3 Deep Case Study Pages (`/projects/[slug]/page.tsx`)
- Pre-rendered at build time via `generateStaticParams()` across all 12 projects.
- Includes:
  - Sticky side-rail Table of Contents tracking active scroll sections.
  - Interactive **Before/After Architectural Slider** (`BeforeAfterSlider.tsx`) comparing legacy vs modernized topology.
  - **Lightbox Image Inspection** (`Lightbox.tsx`) supporting keyboard navigation (Left/Right arrows, Escape).
  - Rich JSON-LD `CreativeWork` structured data for search engine indexation.
  - Prev/Next project footer navigation (`ProjectNav.tsx`).

---

## 7. Data Models: 12 Real-World Case Studies

The system contains 12 comprehensive case studies authored with realistic technical specifications, architectures, challenges, solutions, and metrics:

1. `vanguard-foundry-scada` (Manufacturing): High-Throughput Edge SCADA Modernization. Sub-millisecond telemetry across 14 foundry cells.
2. `metro-health-telemetry` (Healthcare): Critical-Care Patient Telemetry Fabric. Zero-loss medical telemetry with deterministic failover.
3. `apex-freight-dispatch` (Logistics): Autonomous Freight Routing & Telematics Core. Sub-second dispatch routing across 12,000 tractors.
4. `summit-academic-grid` (Education): Campus-Wide Multi-Gigabit SDN Backbone. 802.1X authenticated mobility for 45,000 concurrent endpoints.
5. `gridcore-scada-mesh` (Energy): Substation SCADA Resilience & OT-IT Bridging. IEC 61850 substation automation across 68 transmission sites.
6. `apex-clearing-engine` (Financial): Ultra-Low Latency Clearing & Settlement Engine. FPGA-accelerated order matching with sub-5μs execution.
7. `orbital-telemetry-array` (Aerospace): Distributed Ground Station Telemetry Processor. Satellite pass downlink demodulation and packet assembly.
8. `hyperflow-cdn-fabric` (Telecom): Tier-1 Anycast Edge CDN & DDoS Scrubbing Fabric. 40 Tbps edge capacity with BGP Flowspec integration.
9. `sentinel-defense-mesh` (Defense): Tactical Edge Zero-Trust Communications Fabric. Encrypted mobile ad-hoc networking for field operations.
10. `prism-stream-transcode` (Media): Distributed Real-Time 8K Video Encoding Cloud. GPU-accelerated AV1 encoding for live sports broadcasting.
11. `civic-pulse-iot` (Public / Smart City): Municipal Sensor Mesh & Traffic Signal Optimization. LoRaWAN traffic and environmental monitoring across 400 intersections.
12. `iron-rail-signaling` (Rail): CBTC Train Control & Communications Network. SIL-4 signaling network for high-speed passenger rail corridor.

---

## 8. Technical Challenges Encountered & Resolution Log

| Issue | Root Cause | Engineering Resolution |
| :--- | :--- | :--- |
| **Non-UTF-8 Encoding (Byte `0x97`)** | PowerShell's default `Set-Content` wrote files in Windows-1252 instead of UTF-8, breaking SWC parser with `stream did not contain valid UTF-8`. | Executed a programmatic Node.js script using `TextDecoder('windows-1252')` to decode all project files and rewrite them as strict UTF-8 without BOM. |
| **`ssr: false` in Server Components** | Next.js 15 App Router does not permit `dynamic(..., { ssr: false })` inside Server Components (`src/app/page.tsx`). | Created `SceneCanvasWrapper.tsx` as a dedicated Client Component (`'use client'`) importing `SceneCanvas` with `ssr: false`, then rendered `<SceneCanvasWrapper />` in `page.tsx`. |
| **CSS Comment Syntax Error** | PostCSS failed on `// path: src/app/globals.css` with `Unknown word` because CSS only permits `/* ... */`. | Converted CSS header comment to `/* ... */`, corrected `--accent` token to `#9E5430`, and fixed `inline-lex` typo to `inline-flex`. |
| **ESLint `jsx-no-comment-textnodes`** | Technical labels starting with `//` (e.g., `// SECTION 01`) triggered React's rule warning against unescaped JSX textnodes. | Added `"react/jsx-no-comment-textnodes": "off"` to `eslint.config.mjs` to officially support blueprint annotation syntax. |
| **Unused Variables & Hook Dependencies** | Unused imports in `Preloader.tsx`, `projects/[slug]/page.tsx`, `ProjectCover.tsx`, and unmemoized `handleClose` in `QuickPreviewModal.tsx`. | Removed unused imports, prefixed `_rand`, and wrapped `handleClose` in `useCallback` added to the `useEffect` dependency array. |
| **Next.js 15 Async Route Params** | Next.js 15 App Router types `params` as a Promise (`Promise<{ slug: string }>`). | Applied `const { slug } = await params;` in `generateMetadata` and `Page` functions. |

---

## 9. Verification & Build Confirmation

### 9.1 Typecheck Verification
```bash
$ npx tsc --noEmit
# Exit code: 0 (Zero errors)
```

### 9.2 Lint Verification
```bash
$ npm run lint
# Exit code: 0 (✔ No ESLint warnings or errors)
```

### 9.3 Production Build Output
```bash
$ npm run build
   ▲ Next.js 15.5.25
   Creating an optimized production build ...
 ✓ Compiled successfully in 9.9s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (22/22)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ○ /                                    18.8 kB         243 kB
├ ○ /_not-found                            138 B         103 kB
├ ƒ /(.)projects/[slug]                  2.66 kB         161 kB
├ ○ /about                                 169 B         106 kB
├ ○ /contact                             3.98 kB         115 kB
├ ƒ /opengraph-image                       138 B         103 kB
├ ○ /projects                            5.37 kB         183 kB
├ ● /projects/[slug]                     4.56 kB         163 kB
│   ├ /projects/vanguard-foundry-scada
│   ├ /projects/metro-health-telemetry
│   ├ /projects/apex-freight-dispatch
│   └ [+9 more paths]
├ ○ /robots.txt                            138 B         103 kB
├ ○ /services                              169 B         106 kB
└ ○ /sitemap.xml                           138 B         103 kB
```

---

## 10. How to Run, Maintain & Deploy

### Development
```bash
npm run dev
# Starts local development server on http://localhost:3000
```

### Production Build & Launch
```bash
npm run build
npm run start
# Runs the production server
```

### Keyboard Shortcuts for Reviewers
- **⌘K / Ctrl+K**: Open Command Palette (jump to any page, service, or project).
- **Esc**: Dismiss Command Palette, Preloader, Quick Preview Modal, or Image Lightbox.
- **Left / Right Arrow Keys**: Navigate images when Lightbox is active.
- **Click anywhere during Preloader**: Skip preloader directly to page content.
