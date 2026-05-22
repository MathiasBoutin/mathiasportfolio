# Agent guide — mathiasboutin portfolio

Next 15.5.15 (App Router, Turbopack) · React 19.2 · Tailwind v4 · shadcn/ui (`base-nova`) · Base UI React · Framer Motion 12 · Zod 4 · OpenNext on Cloudflare Workers · Node 22.22.2 (`.nvmrc`).

Many APIs differ from older Next/React training data (async `params`/`searchParams`/`cookies()`, RSC by default, `next/font`, Turbopack as default dev bundler, Tailwind v4 CSS-first config in `src/app/globals.css`). When in doubt about a Next API, check `node_modules/next/package.json` for the installed version and the official Next.js docs for that version — there is no `node_modules/next/dist/docs/` directory in this install.

## Where content actually lives (the README is partially stale)

Case studies and profile copy do **not** come from `content/work/*.mdx` or `content/profile/*.mdx` anymore. Those files exist on disk but are dead code. Runtime content sources:

- **Case studies:** `src/lib/content/work.ts` — pure TS data keyed by locale (`en` / `fr`). Each entry has a `blocks` array (`text` / `bigText` / `media`) and an optional `definitions` map for the `[Term]` inline-glossary popovers. Schema: `src/lib/content/schema.ts`.
- **Case study text rendering:** `src/components/portfolio/markdown-content.tsx` is a **hand-rolled mini-markdown parser** — it only understands `## h2`, `### h3`, `- list items`, paragraphs, and the `[Term]` glossary pattern. Full Markdown / MDX features (code blocks, tables, inline emphasis, components inside text) will not render. `next-mdx-remote` is in `package.json` but `renderMdx` in `src/lib/content/render-mdx.tsx` is currently unused.
- **About / CV intro copy:** inline frontmatter strings inside `src/lib/content/profile.ts`. The `content/profile/*.mdx` files are unused.
- **Homepage copy and experience list:** `src/lib/content/home.ts`.
- **Structured CV data (`/cv` page + print):** `src/lib/cv-data.ts`.
- **i18n UI strings:** `src/lib/i18n/messages.ts` (keyed by locale).
- **Site config (name, URL, contact, nav):** `src/lib/site-config.ts`.

If asked to delete the legacy `content/work/*.mdx` and `content/profile/*.mdx` files, confirm first — they're easy to mistake for live content.

## i18n: every content surface is bilingual

Locales are `en` (default, unprefixed routes) and `fr` (under `/fr/...`). `home.ts`, `profile.ts`, `work.ts`, `cv-data.ts`, and `messages.ts` all hold parallel `en` / `fr` entries — changing one without the other will create a content drift bug that is invisible on the default locale. When adding new copy, update both locales.

## Presentation themes

Themes are defined in `src/lib/presentation-themes.ts` and CSS variables in `src/app/globals.css` under `[data-presentation-theme="<id>"]`. The active theme is currently hard-coded:

- `ACTIVE_PRESENTATION_THEME = "default"`
- `SHOW_THEME_TOGGLE = false` in `src/app/layout.tsx`

The cookie-based selection (`PRESENTATION_THEME_COOKIE`, `resolvePresentationThemeId`) and the `<ThemeToggle>` component exist but are dormant. The `proof` theme is a dev-only validation theme — keep it unexposed in UI. Detailed theme rules: `.cursor/rules/portfolio-new-theme.mdc`.

## Local dev server

- `next dev` writes to `.next-dev`; `next build` writes to `.next`. They must not share the same output directory (`next.config.ts` enforces this via `distDir`).
- **Do not run `npm run build` or `npm run build:worker` while `npm run dev` is running.** Production builds overwrite shared manifests and cause Turbopack 500s (`ENOENT` on `_buildManifest.js.tmp`). Use `npm run lint` for quick validation during active dev.
- If the dev server returns 500 anyway, run `npm run dev:reset` (kills `next dev` / `next-server`, clears `.next-dev`, restarts). The dev scripts pin `PATH` to `~/.nvm/versions/node/v22.22.2/bin` — match `.nvmrc` if running Next outside the npm scripts.

## Commands

- `npm run dev` — local dev on `http://127.0.0.1:3000` (Turbopack, `.next-dev`).
- `npm run dev:reset` — recover from corrupted dev cache.
- `npm run lint` — ESLint flat config (extends `next/core-web-vitals` + `next/typescript`).
- `npm run format` / `npm run format:write` — Prettier + `prettier-plugin-tailwindcss`.
- `npm run build` — Next production build (`.next`).
- `npm run build:worker` — OpenNext build for Cloudflare Workers (`.open-next/`). Required before `wrangler deploy`. Worker config in `wrangler.jsonc`; routes target `mathiasboutin.com` and `www.mathiasboutin.com`.

## Conventions

- Path alias: `@/*` → `./src/*`.
- Project components live under `src/components/portfolio/`; shadcn primitives under `src/components/ui/`. Per `components.json` the shadcn style is `base-nova` and the icon library is `lucide`.
- Component styling reads from the active theme slots (`getActivePresentationTheme().slots.<area>.<slot>`) rather than hard-coding classes that vary by theme. One-off classes that no theme needs to override can stay local.
- New deps: prefer `npm install <pkg>` and pin via the existing `^` ranges; avoid downgrading Tailwind v4 → v3 or Base UI; do not introduce a second markdown/MDX renderer without consensus (the lightweight `markdown-content.tsx` parser is intentional).
