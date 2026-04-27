# Cloudflare Deployment Checklist

## Cloudflare Pages (recommended)

1. Create a new Pages project and connect this repository.
2. Build command: `npm run build:worker`
3. Build output directory: `.open-next/assets`
4. Set production branch to `main`.
5. Add environment variable `NEXT_PUBLIC_CF_BEACON_TOKEN` (optional analytics).
6. Attach your custom domain and verify DNS records.
7. Confirm HTTPS is active and redirect HTTP to HTTPS.

## Preview Builds

- Keep preview deployments enabled in Pages.
- Every pull request should produce a preview URL for visual QA.

## DNS and Domain

- Keep nameservers in Cloudflare.
- Point apex and `www` records based on Pages setup.
- Set canonical URL in `src/lib/site-config.ts`.
