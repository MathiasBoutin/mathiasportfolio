# Mathias Portfolio Foundation

Portfolio foundation built with Next.js, shadcn/ui, Tailwind, MDX content, and Cloudflare deployment support.

## Repository

- GitHub: `https://github.com/MathiasBoutin/mathiasportfolio`

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- MDX content with typed frontmatter (Zod)
- Framer Motion for subtle animation
- OpenNext adapter for Cloudflare Workers/Pages deployments

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Editing

- Case studies: `content/work/*.mdx`
- Bio and CV content: `content/profile/*.mdx`
- Frontmatter is validated in `src/lib/content/schema.ts`

## Scripts

- `npm run dev` - local development
- `npm run lint` - lint code
- `npm run build` - Next production build
- `npm run build:worker` - OpenNext build for Cloudflare runtime
- `npm run format` - check formatting
- `npm run format:write` - apply formatting

## Cloudflare Deployment

### Option A: Cloudflare Pages (Git integration)

1. Connect this GitHub repository in Cloudflare Pages.
2. Set framework preset to **None**.
3. Build command: `npm run build:worker`
4. Build output directory: `.open-next/assets`
5. In your project settings, configure the Worker entrypoint to `.open-next/worker.js`.
6. Add your custom domain and verify DNS + SSL in Cloudflare.

### Option B: Wrangler deploy

```bash
npm run build:worker
npx wrangler deploy
```

`wrangler.jsonc` is already configured for the OpenNext output.

## Optional Environment Variables

- `NEXT_PUBLIC_CF_BEACON_TOKEN` - enables Cloudflare Web Analytics beacon script.

## Next Content Steps

- Add your real case studies in `content/work`.
- Add your final PDF CV in `public/cv.pdf`.
- Replace placeholder site info in `src/lib/site-config.ts`.
