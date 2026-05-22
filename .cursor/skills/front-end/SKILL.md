---
name: front-end
description: >-
  Build consistent, systemized front-end UI for this portfolio. Use when adding
  or changing components, pages, layout, styling, typography, tokens, themes,
  motion, accessibility, i18n surfaces, or case-study blocks. Covers Next 15,
  React 19, Tailwind v4, presentation themes, typography roles, and shadcn/base-nova.
---

# Front-end — mathiasboutin portfolio

Expert front-end guidance for this repo. Read this skill before building UI. Link out to [AGENTS.md](../../../AGENTS.md) for dev-server hygiene and content sources; do not duplicate that file here.

## When to use

- New or changed UI: pages, sections, components, case-study blocks, popovers, motion
- Styling decisions: tokens, typography, slots, responsive layout, a11y
- Front-end types: Zod content schema, locale routing, metadata

## When to skip

- Content-only copy edits (still update both locales)
- Dependency bumps with no UI impact
- Backend/deploy/infra work
- Adding a new presentation theme → use [.cursor/rules/portfolio-new-theme.mdc](../../../.cursor/rules/portfolio-new-theme.mdc) instead

## Stack snapshot

Next 15.5.15 (App Router, Turbopack, async `params`/`searchParams`/`cookies()`) · React 19.2 (RSC default, ref-as-prop) · Tailwind v4 (CSS-first via `@theme inline` in `globals.css`, no `tailwind.config.js`) · TypeScript 5 strict · shadcn `base-nova` + Base UI React · Framer Motion 12 · Zod 4 · lucide-react · OpenNext on Cloudflare Workers · Node 22.22.2 (`.nvmrc`).

## Agent workflow (read first)

1. **Reuse audit** — grep for existing component, slot, type role, or content pattern before writing new code.
2. **Placement decision** — use the component rubric below; default to extending existing primitives.
3. **Token → type → slot → cn** — apply styling in that order; local `cn()` overrides last.
4. **Locale check** — every user-visible string needs `en` + `fr` in the same source file.
5. **State check** — cover default, hover, focus-visible, active, disabled, loading, error, empty, reduced-motion, mobile/touch.
6. **Verify** — run `npm run lint`; smoke key routes (see Verification checklist).

## The 5 consistency rules

1. **Composition order:** semantic tokens → `type(role)` → `getActivePresentationTheme().slots.*` → `cn()` override
2. **No raw values in components** — no `text-[18px]`, hex, or rgb in JSX classes. Exception: brand-scoped popover themes in [src/lib/definition-popover-themes.ts](../../../src/lib/definition-popover-themes.ts)
3. **Theme via slots + CSS vars** — never branch on theme id inside a component
4. **RSC by default** — `"use client"` only when interactivity requires it
5. **Bilingual parity** — every `en` entry needs a matching `fr` entry in the same file

## Component creation rubric

| Situation | Action |
| --- | --- |
| Matches an existing shadcn/ui primitive | Extend [src/components/ui/](../../../src/components/ui/) via `cva` variants |
| Reused across 2+ pages with stable API | Add to [src/components/portfolio/](../../../src/components/portfolio/) |
| One-off layout on a single page | Keep local in the page-content component |
| Typography-only difference | Use `type(role)` or an existing slot; do not new-component |
| Theme-varying layout/spacing | Add or extend a slot in [src/lib/presentation-themes.ts](../../../src/lib/presentation-themes.ts) |
| New design token needed | Add CSS var under `[data-presentation-theme="<id>"]` in [src/app/globals.css](../../../src/app/globals.css) |

## Design tokens

**Where:** [src/app/globals.css](../../../src/app/globals.css)

**Theme scope:** `[data-presentation-theme="<id>"]` on `<html>`. Active theme is set in [src/app/layout.tsx](../../../src/app/layout.tsx) via `ACTIVE_PRESENTATION_THEME` (currently `"default"`).

**Tailwind v4 wiring:** `@theme inline { --color-background: var(--background); ... }` maps CSS vars to utilities (`bg-background`, `text-foreground`, etc.).

**Semantic shadcn tokens:** `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--card`, `--popover`, `--chart-1`…`--chart-5`, `--sidebar-*`

**Portfolio tokens:** `--portfolio-paper`, `--portfolio-ink`, `--portfolio-muted`, `--portfolio-line`, `--portfolio-atmosphere-*`, `--portfolio-shader-*`, `--portfolio-rails-*`, `--portfolio-link-underline`, `--case-study-reading-width`, `--case-study-media-wider`, `--desktop-mock-bg`, `--desktop-mock-caption`

**Radius scale:** derived from `--radius` → `--radius-sm`…`--radius-4xl` in `@theme inline`

**Fonts:** `--font-neue-montreal`, `--font-pp-editorial-new` (CSS `:root`); `--font-geist-mono`, `--font-ibm-plex-mono` via `next/font` in layout. Tailwind: `font-sans`, `font-heading`, `font-editorial`, `font-mono`, `.font-ibm-plex-mono`

**Tailwind v4 rule:** use `@theme` only for tokens that should generate utility classes. Runtime theme values that must not become utilities stay as scoped CSS vars under `[data-presentation-theme]` (atmosphere, shaders, rails).

**Dark variant:** `@custom-variant dark (&:is(.dark *));` — presentation themes use `data-presentation-theme`, not `.dark` class, but semantic tokens keep new code dark-safe.

## Color system

- Prefer semantic utilities: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-destructive`
- Use `color-mix(in oklab, …)` with semantic vars for translucent states (see `.soft-link` in globals.css)
- OKLCH is the source format in CSS vars; do not paste oklch literals into component class strings
- Brand hex colors: only in [src/lib/definition-popover-themes.ts](../../../src/lib/definition-popover-themes.ts) and similar per-feature theme registries
- Selection: `::selection { background: var(--portfolio-ink); color: var(--portfolio-paper); }`

## Typography system

**Source:** [src/lib/typography.ts](../../../src/lib/typography.ts)

```ts
import { type, typeClasses } from "@/lib/typography";

// Semantic role (preferred)
<h1 className={type("displayHero")} />

// Custom combo (when no role fits)
<span className={typeClasses({ size: 14, weight: "medium", leading: "snug" })} />
```

**Fixed size scale (px):** `10`, `12`, `14`, `16`, `18`, `20`, `24`, `32`, `40`, `56`, plus responsive pairs `14to16`, `16to20`, `20to24`

**Primitives:** `typeSize`, `typeWeight`, `typeLeading`, `typeTracking`, `typeFont` (`sans` | `editorial` | `mono`), `typeTrait`

**All typography roles** (`type("…")`):

`eyebrow`, `label`, `badge`, `badgeProminent`, `navBrand`, `navLink`, `shellMeta`, `bodySm`, `bodyBase`, `articleBody`, `articleSubtitle`, `headingSm`, `headingMd`, `bodyMd`, `displayHero`, `displayPage`, `displayPageDescription`, `displayCardTitle`, `displayCardSummary`, `aboutLead`, `aboutBody`, `pullQuote`, `caption`, `desktopMockCaption`, `featureEyebrow`, `featureTimeline`, `featureHeading`, `featureBody`, `mdxH2`, `mdxH3`, `mdxBody`, `mdxList`, `mdxQuote`, `detailValueLarge`, `cvName`, `popoverTitle`, `popoverMeta`, `popoverBody`, `buttonLabel`, `toggleLabel`

Never hand-roll `text-[Xpx]` in new code. Add a role to `typographyRoles` if the pattern repeats.

## Spacing, layout, and chrome

**Shell:** [src/app/layout.tsx](../../../src/app/layout.tsx) applies `theme.slots.shell.html` on `<html>`, `shell.body` on `<body>`, `shell.pageRails` wraps header/main/footer.

**Section wrapper:** [src/components/portfolio/section.tsx](../../../src/components/portfolio/section.tsx) — `theme.slots.section.base` + `section.contained`

**Page header:** [src/components/portfolio/page-header.tsx](../../../src/components/portfolio/page-header.tsx) — `theme.slots.pageHeader.*`

**Default reading width:** `max-w-[61rem]` (default theme shell)

**Page rails:** `.page-rails` in globals.css — dashed vertical guides; hidden on case-study pages via `:has(main [data-case-study-page])`

**Links:** `.soft-link` for inline text links with theme-aware underline

**Responsive:**

- Mobile-first breakpoints (`md:` is the primary step-up)
- Use `svh` / `calc(100svh - …)` for viewport-height sections (see home hero)
- Test narrow widths (~375px); avoid hover-only affordances without a touch fallback
- Primary tap targets: aim ≥ 44×44px; WCAG 2.2 AA minimum is 24×24px with spacing

## Presentation theme system

**Source:** [src/lib/presentation-themes.ts](../../../src/lib/presentation-themes.ts)

```ts
import { getActivePresentationTheme } from "@/lib/presentation-themes";

const theme = getActivePresentationTheme();
<header className={theme.slots.shell.header} />
```

**Theme ids:** `default` | `dark` | `proof` (`PresentationThemeId`)

**Active theme:** `ACTIVE_PRESENTATION_THEME = "default"`. Toggle dormant (`SHOW_THEME_TOGGLE = false`). Do not expose `proof` or enable dark toggle without explicit ask.

**Slot namespaces:**

| Namespace | Keys |
| --- | --- |
| `shell` | `html`, `body`, `skipLink`, `pageRails`, `header`, `headerInner`, `footer`, `footerInner` |
| `section` | `base`, `contained` |
| `pageHeader` | `root`, `eyebrow`, `title`, `description` |
| `home` | `heroSection`, `heroTitle`, `aboutSection`, `aboutGrid`, `aboutEyebrow`, `aboutLead`, `aboutBody`, `featureRoot`, `featureSection`, `featureEyebrow`, `featureRow`, `featureTimeline`, `featureHeading`, `featureDescription`, `featureLinkHeading`, `featureLinkDescription` |
| `caseStudyLayout` | `articleStack`, `readingColumn`, `textBlock`, `textH2`, `textP`, `textUl`, `textOl`, `bigTextBlock`, `mediaSame`, `mediaWider`, `mediaFull`, `mediaBlock`, `mediaCaption`, `desktopMockOuter`, `desktopMockBand`, `desktopMockInner`, `desktopMockScreen`, `desktopMockCaption` |
| `caseStudyPage` | `headerDescription`, `detailValue` |
| `content` | `mdxH2`, `mdxH3`, `mdxP`, `mdxUl`, `mdxOl`, `mdxBlockquote`, `workList`, `borderedArticle`, `detailArticle`, `detailGrid`, `detailLabel`, `detailValue` |
| `card` | `root`, `grid`, `eyebrowWrap`, `timeline`, `title`, `summary`, `table`, `label`, `value`, `toolsWrap` |
| `motion` | `fadeInInitialY`, `fadeInDuration`, `fadeInEase` |

**Slot discipline:** lift to slot only when a real presentation decision varies by theme. Tiny one-offs stay local. Color-only themes can reuse default slots:

```ts
dark: { id: "dark", slots: basePresentationThemes.default.slots }
```

## Component patterns

**Locations:**

- Primitives: [src/components/ui/](../../../src/components/ui/) — shadcn `base-nova`, Base UI React
- Project: [src/components/portfolio/](../../../src/components/portfolio/)

**Variants:** `cva` + export `VariantProps<typeof xVariants>` (see [button.tsx](../../../src/components/ui/button.tsx))

**Class merge:** `cn()` from [src/lib/utils.ts](../../../src/lib/utils.ts) — `twMerge(clsx(...))`

**Base UI:** headless primitives with `useRender` + `mergeProps` for polymorphic components (see [badge.tsx](../../../src/components/ui/badge.tsx))

**Stable hooks:** `data-slot`, `data-size`, `data-print-hide`, `data-popup-open`, `data-case-study-page`

**Icons:** `lucide-react` only

**Existing primitives:** `Button`, `Badge`, `Card` (+ subcomponents), `LinkButton`, `DefinitionPopover`

**Canonical pattern:**

```tsx
import { cn } from "@/lib/utils";
import { type } from "@/lib/typography";
import { getActivePresentationTheme } from "@/lib/presentation-themes";

export function ExampleBlock({ className }: { className?: string }) {
  const theme = getActivePresentationTheme();
  return (
    <div className={cn(theme.slots.section.contained, type("bodyMd"), className)}>
      …
    </div>
  );
}
```

## Type system

- Strict TS; path alias `@/*` → `./src/*`
- Content: Zod in [src/lib/content/schema.ts](../../../src/lib/content/schema.ts)
- Case-study blocks: `z.discriminatedUnion("type", [...])` — extend the union, never widen to `string`
- Literal unions: `PresentationThemeId`, `Locale` with guards `isLocale`, `resolveLocale`, `resolvePresentationThemeId`
- Component variants: `VariantProps<typeof variants>` — do not re-declare variant unions
- No `any`; prefer `unknown` + narrowing; use `satisfies` for config objects

## Routing and i18n

**App Router:** pages in [src/app/](../../../src/app/). RSC by default.

**Async dynamic APIs (Next 15):** always `await`:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

In client components, unwrap with `React.use(params)`.

**Locales:** `en` (default, unprefixed) · `fr` (`/fr/...`)

**Routing helpers** ([src/lib/i18n/routing.ts](../../../src/lib/i18n/routing.ts)):

- `localizePath(path, locale)` — internal links
- `localizeUrl(path, locale)` — absolute URLs
- `getLocaleFromPathname(pathname)`
- `localizePathnameForLocale(pathname, locale)`

**Copy sources:**

- UI strings: [src/lib/i18n/messages/en.ts](../../../src/lib/i18n/messages/en.ts) + [fr.ts](../../../src/lib/i18n/messages/fr.ts) (types from `en` via `DeepStringify`)
- Page content: [home.ts](../../../src/lib/content/home.ts), [work.ts](../../../src/lib/content/work.ts), [profile.ts](../../../src/lib/content/profile.ts), [cv-data.ts](../../../src/lib/cv-data.ts)

## Content schema and case-study blocks

**Case studies:** TS data in [src/lib/content/work.ts](../../../src/lib/content/work.ts). `content/work/*.mdx` is dead code — do not use.

**Block types:** `text` | `bigText` | `media` | `desktopMock`

**Media widths:** `same` | `wider` | `full` — rendered by [media-block.tsx](../../../src/components/portfolio/case-study-blocks/media-block.tsx) + [media-breakout.tsx](../../../src/components/portfolio/case-study-blocks/media-breakout.tsx)

**Desktop mock:** layout 1440×1024; source assets at 2× (2880×2048). See [desktop-mock-block.tsx](../../../src/components/portfolio/case-study-blocks/desktop-mock-block.tsx)

**Block renderer:** [block-renderer.tsx](../../../src/components/portfolio/case-study-blocks/block-renderer.tsx)

**Mini-markdown** ([markdown-content.tsx](../../../src/components/portfolio/markdown-content.tsx)) supports only:

- `## h2`, `### h3`
- `- list items`
- paragraphs
- `[Term]` inline glossary → `definitions` map

Do not add markdown features or swap in `react-markdown` / `next-mdx-remote` for case-study text.

**Inline definitions:** [src/lib/content/inline-definitions.tsx](../../../src/lib/content/inline-definitions.tsx) — `[Term]` pattern, popover theme from `definitionPopoverThemes`

## Forms and React 19

When adding forms:

- Prefer native `<form action={…}>` with Server Actions
- Client state: `useActionState(action, initialState)` from `react`
- Submit button pending: `useFormStatus()` from `react-dom` in a **child** of `<form>` (not the same component as the form)
- Ref forwarding: accept `ref` as a regular prop — do not add new `forwardRef` wrappers
- In client components receiving async props: `React.use(promise)`

## Motion

**Library:** Framer Motion 12 only

**Pattern:**

```tsx
"use client";
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) return <div>{children}</div>;
```

**Defaults:** read from `theme.slots.motion.fadeInInitialY`, `fadeInDuration`, `fadeInEase`

**Existing:** [fade-in.tsx](../../../src/components/portfolio/fade-in.tsx), [definition-popover.tsx](../../../src/components/ui/definition-popover.tsx)

**Global override:** `globals.css` `@media (prefers-reduced-motion: reduce)` sets `0.01ms` durations — animations must remain functional (no broken UI).

## Accessibility

- Preserve skip-link → `#main-content` in layout
- Never remove global `focus-visible` outlines (`outline-2 outline-offset-2` in globals.css)
- WCAG 2.2 AA: contrast via semantic tokens; test in `default` and `dark` theme CSS
- WCAG 2.2 AA target size: ≥ 24×24px (prefer 44×44px for primary controls)
- WCAG 2.2 AA focus not obscured: sticky header must not hide focused elements
- External links: `target="_blank"` + `rel="noreferrer"` + sr-only “opens in new tab” (see [link-button.tsx](../../../src/components/ui/link-button.tsx))
- Popovers: Base UI `Popover.*` for keyboard trap, Esc, focus management
- Images/video: meaningful `alt`; decorative media gets `alt=""` or `aria-hidden`

## Interactive state checklist

For every interactive surface, verify:

- [ ] default
- [ ] hover (with touch fallback or no hover-only info)
- [ ] focus-visible
- [ ] active / pressed
- [ ] disabled
- [ ] loading / pending (if async)
- [ ] error / invalid (`aria-invalid` on form fields)
- [ ] empty (if list/data-driven)
- [ ] prefers-reduced-motion
- [ ] mobile / narrow viewport

## Performance and rendering

- RSC by default; client boundaries only on interactive leaf components
- `cache()` from `react` for deduped server reads (see `getFeaturedCaseStudies` in work.ts)
- `next/image` with explicit `sizes` tied to layout width (see media-block, desktop-mock-block)
- Fonts via `next/font` in layout — avoids CLS
- Do not run `npm run build` while `npm run dev` is active (corrupts `.next-dev` — use `npm run dev:reset`)

**Core Web Vitals targets (75th percentile, field data):**

| Metric | Good |
| --- | --- |
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

Reserve explicit width/height on media; avoid layout-shifting font or content injection.

## SEO

Use [buildMetadata()](../../../src/lib/metadata/seo.ts) on every page:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata({ title, description, path: `/work/${slug}`, locale: "en" });
}
```

Generates `alternates.languages` for `en` + `fr`, OpenGraph, and Twitter cards. Do not hand-roll per-page metadata objects.

## Figma intake workflow

When implementing from Figma (via MCP):

1. Call `get_variables_def` first — designs use design-system tokens
2. Map Figma variables → existing CSS vars, type roles, or slots
3. Only introduce new tokens with names matching the semantic model (`--portfolio-*`, shadcn semantics)
4. If a Figma value has no mapping, add token in `globals.css` + wire through `@theme inline` if it needs a utility
5. Prefer slot changes over one-off component classes when the variation is theme-level

## Anti-patterns (do not)

- Raw `text-[Xpx]`, hex, or rgb in component class strings
- Re-introduce MDX file loading for case studies
- Per-theme `if (themeId === …)` branching inside components
- Ship `en` without matching `fr`
- Wrap entire pages in `"use client"`
- Run production build during active dev server
- Expose `proof` theme or enable theme toggle without explicit ask
- Add a second markdown/MDX renderer
- New `forwardRef` wrappers (use ref-as-prop)
- Hover-only interactions with no keyboard/touch path

## File map

| Concern | File |
| --- | --- |
| CSS tokens + atmosphere | [src/app/globals.css](../../../src/app/globals.css) |
| Theme slots | [src/lib/presentation-themes.ts](../../../src/lib/presentation-themes.ts) |
| Typography roles | [src/lib/typography.ts](../../../src/lib/typography.ts) |
| Popover brand themes | [src/lib/definition-popover-themes.ts](../../../src/lib/definition-popover-themes.ts) |
| shadcn config | [components.json](../../../components.json) |
| UI primitives | [src/components/ui/](../../../src/components/ui/) |
| Portfolio components | [src/components/portfolio/](../../../src/components/portfolio/) |
| Layout shell | [src/app/layout.tsx](../../../src/app/layout.tsx) |
| Content schema | [src/lib/content/schema.ts](../../../src/lib/content/schema.ts) |
| Case study data | [src/lib/content/work.ts](../../../src/lib/content/work.ts) |
| i18n config | [src/lib/i18n/config.ts](../../../src/lib/i18n/config.ts) |
| i18n routing | [src/lib/i18n/routing.ts](../../../src/lib/i18n/routing.ts) |
| UI messages | [src/lib/i18n/messages/](../../../src/lib/i18n/messages/) |
| SEO metadata | [src/lib/metadata/seo.ts](../../../src/lib/metadata/seo.ts) |
| Site config | [src/lib/site-config.ts](../../../src/lib/site-config.ts) |
| Class merge util | [src/lib/utils.ts](../../../src/lib/utils.ts) |
| Agent guide (dev) | [AGENTS.md](../../../AGENTS.md) |
| New theme procedure | [.cursor/rules/portfolio-new-theme.mdc](../../../.cursor/rules/portfolio-new-theme.mdc) |
| Pre-build planning | [.cursor/rules/pre-build-plan-personal.mdc](../../../.cursor/rules/pre-build-plan-personal.mdc) |

## Verification checklist

After front-end changes:

1. `npm run lint`
2. Smoke `/`, `/work`, one `/work/[slug]`, `/about`, `/cv`
3. Smoke FR variants: `/fr`, `/fr/work`, `/fr/about`, `/fr/cv`
4. Both locales updated if copy changed
5. Reduced-motion: animations degrade gracefully
6. Keyboard: tab through interactive elements; focus visible
7. Narrow viewport (~375px): no horizontal overflow, tap targets usable
8. If tokens changed: readability in `default` and mentally check `dark` CSS vars

Run `npm run build` only when dev server is stopped.

## Modern web references (2026)

- [Next.js 15 — async dynamic APIs](https://nextjs.org/docs/messages/sync-dynamic-apis)
- [React 19 blog](https://react.dev/blog/2024/12/05/react-19) — ref-as-prop, `useActionState`, `useFormStatus`
- [Tailwind v4 — theme variables](https://tailwindcss.com/docs/theme)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
