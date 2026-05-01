---
task: Build a 2-column block-based layout system for case study detail pages
type: feature
surface: case study detail pages
branch: feat/case-study-layout
worktree: in-place
base: origin/main
created: 2026-05-01
status: completed
---

## Pre-Build Plan

**Task:** Build a 2-column block-based layout system for individual case study pages.
**Type:** feature
**Surface:** case study detail pages (`/work/[slug]`, `/fr/work/[slug]`)
**Branch:** `feat/case-study-layout` (new branch off `origin/main`, in-place — worktree creation failed)
**Why:** The current detail page is a single-column MDX dump with placeholder content. The new layout needs to support a composable 2-column grid with typed blocks (text, big font, media, dynamic) that authors can arrange per case study.

### Understanding

You want each case study to be composed of **typed, ordered blocks** that sit on a 2-column grid. Some blocks span the full width; others share a row 50/50 (e.g. text left, image right). On mobile, everything collapses to a single column. The system should be flexible enough that each case study can have a unique layout while using the same block primitives. A hero zone and meta block are future additions — we'll build the foundation to slot those in later without rework.

### What already exists we'll reuse

- **`src/lib/content/schema.ts`** — Zod schemas for case study frontmatter (`caseStudySchema`). We'll extend this file with block type schemas.
- **`src/lib/content/work.ts`** — case study content sources and fetchers (`getCaseStudyBySlug`, `getCaseStudies`). We'll add block data to the case study entries here.
- **`src/lib/content/mdx.ts`** + **`src/lib/content/render-mdx.tsx`** — MDX compilation pipeline. Text blocks that contain rich text will reuse `renderMdx`.
- **`src/components/portfolio/mdx-components.tsx`** — themed MDX element overrides. Reused inside text blocks.
- **`src/lib/presentation-themes.ts`** — slot-based theme system. We'll add a new `caseStudyLayout` slot group for the grid and block styles.
- **`src/components/portfolio/section.tsx`** — page section wrapper with theme support. Reused as the outer container.
- **`src/components/portfolio/page-header.tsx`** — page header component. Reused for the case study title area.
- **`src/components/portfolio/fade-in.tsx`** — Framer Motion fade-in wrapper. Available for block entrance animations.
- **`src/components/ui/badge.tsx`** — badge component. Reused for meta tags.

### Plan

#### 1. Define the block type system (`src/lib/content/schema.ts`)

Add discriminated union schemas for each block type:

```ts
type CaseStudyBlock =
  | { type: "text"; span: "full" | "half"; content: string }        // MDX-rendered rich text
  | { type: "bigText"; span: "full" | "half"; text: string }        // Large display text (no MDX)
  | { type: "media"; span: "full" | "half"; media: MediaItem }      // Image, video, or SVG
  | { type: "dynamic"; span: "full" | "half"; component: string; props?: Record<string, unknown> }
```

`MediaItem` covers `{ type: "image" | "video" | "svg"; src: string; alt: string; caption?: string }`.

Each block declares its own `span` — the grid renderer reads this to assign `col-span-1` (half) or `col-span-2` (full). Two consecutive `half` blocks naturally pair into a row on desktop.

Add `blocks: CaseStudyBlock[]` to the case study schema (alongside existing frontmatter).

#### 2. Add block data to case study content (`src/lib/content/work.ts`)

Replace the MDX body of each case study with a `blocks` array in the frontmatter/data. The existing MDX `content` field becomes optional/deprecated — the blocks array is the primary content source. Example structure:

```yaml
blocks:
  - type: text
    span: half
    content: |
      ## Context
      This project addressed the highest-friction mobile flow...
  - type: media
    span: half
    media:
      type: image
      src: /images/work/mobile-checkout-flow.png
      alt: Checkout flow diagram
  - type: bigText
    span: full
    text: "18% improvement in checkout completion"
```

#### 3. Add theme slots for the block grid (`src/lib/presentation-themes.ts`)

New `caseStudyLayout` slot group:

- `grid` — the 2-column grid container (`grid grid-cols-1 md:grid-cols-2 gap-…`)
- `blockFull` — full-width block wrapper (`md:col-span-2`)
- `blockHalf` — half-width block wrapper (`md:col-span-1`)
- `textBlock` — text block prose styling
- `bigTextBlock` — large display text styling
- `mediaBlock` — media container styling (aspect ratio, object-fit)
- `mediaCaption` — caption text styling

Add entries to both `default` and `proof` themes.

#### 4. Build block renderer components (`src/components/portfolio/case-study-blocks/`)

New directory with:

- **`block-renderer.tsx`** — maps a `CaseStudyBlock[]` to the grid. Wraps each block in the correct span class. Server Component.
- **`text-block.tsx`** — renders MDX content via `renderMdx`. Server Component (async).
- **`big-text-block.tsx`** — renders large display text. Server Component.
- **`media-block.tsx`** — renders `<Image>`, `<video>`, or inline SVG based on media type. Server Component.
- **`dynamic-block.tsx`** — a registry-based renderer that maps `component` string to a React component. Client Component boundary when the dynamic content needs interactivity.

#### 5. Rewrite `WorkDetailPageContent` (`src/components/portfolio/pages/work-detail-page-content.tsx`)

Replace the current single-column MDX article with:

1. **PageHeader** (title, summary, eyebrow) — kept, full width above the grid
2. **Meta badges** (role, team, tools) — kept, full width
3. **Problem/Outcome detail grid** — kept as-is (already 2-col on md)
4. **Block grid** — new `BlockRenderer` consuming `caseStudy.data.blocks`

The MDX article and its `detailArticle` slot reference are removed.

#### 6. Stub the hero and meta zones (foundation only)

- Add optional `hero?: CaseStudyHero` to the schema (not rendered yet — just the type).
- Add optional `meta?: CaseStudyMeta` (array of key/value pairs or structured fields — left as a type stub).
- The `BlockRenderer` accepts an optional `hero` slot prop placeholder that renders `null` for now.

This means no rework when you come back to implement hero and meta.

### UX preview

- **Before:** Single-column prose article with placeholder MDX headings and paragraphs, badges at top.
- **After:** A 2-column grid where paired blocks (text + media, text + text, etc.) sit side by side on desktop. Full-width blocks break the rhythm for impact moments. On mobile, all blocks stack vertically in source order.
- **Edge cases:**
  - An odd number of `half` blocks — the last one sits alone on the left (correct CSS Grid behavior, no special handling needed).
  - Empty blocks array — renders nothing below the header; no crash.
  - Media with broken src — `next/image` handles this; alt text shown.
  - `dynamic` block with unknown component string — renders a dev-mode warning or nothing in production.

UX impact: **yes** (the entire article layout changes)

### Risks to watch during build

1. **Server Component async boundary** — `text-block.tsx` calls `renderMdx` which is async. It must be a Server Component (no `"use client"`). The `BlockRenderer` that maps blocks must also be async or use `Suspense` boundaries. Verify no accidental client boundary above it.
2. **Theme slot explosion** — Adding a full `caseStudyLayout` slot group increases the theme surface. Keep it focused on the grid + block wrappers; don't migrate one-off text classes into slots prematurely.
3. **Content migration** — Moving from MDX body to `blocks[]` in `work.ts` means the existing MDX files in `content/work/` become unused. Clean them up or note they're dead code.

### Out of scope

- Hero rendering (stubbed only)
- Meta content block rendering (stubbed only)
- Actual case study content (real images, real copy) — placeholder blocks are fine
- Animation/transitions on blocks (can use existing `FadeIn` later)
- New presentation theme variants for blocks
