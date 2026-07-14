# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next.js dev server (localhost:3000, or next free port)
npm run build             # production build — always run before committing non-trivial changes
npm run start             # serve the production build
npm run lint               # next lint

npm run sanity:login              # authenticate the Sanity CLI
npm run sanity:deploy             # deploy the Studio (only needed if hosting Studio outside this Next.js app)
npm run sanity:cors               # allow localhost:3000 to talk to the Sanity API
npm run sanity:cors:prod          # allow the production Vercel domain
npm run sanity:cors:studio-domain # allow studio.semirad.com
npm run sanity:export / :import   # backup/restore the `production` dataset
```

There is no test suite in this project. There is no `next.config` currently checked in — Next.js runs with defaults.

## Architecture

This is a Next.js 14 App Router marketing site for a driving school, with an **embedded Sanity Studio** as the CMS. The defining pattern of this codebase is the fallback-content system described below — understand it before touching any page or the schema.

### Content flow: Sanity → `content.ts` → pages, with static fallback

- `src/lib/data.ts` and `src/lib/site.ts` hold the **static seed content** (Czech copy, pricing, testimonials, etc.) that the site was originally launched with.
- `src/sanity/queries.ts` has one GROQ query per singleton document (`homePageQuery`, `pricingPageQuery`, etc.).
- `src/lib/content.ts` is the integration layer: each `getXContent()` function calls `sanityFetch(query)` and merges the result over the static seed using a `pick(value, fallback)` helper (`src/lib/content.ts:40`). `pick` treats `null`, empty strings, and empty arrays as "not set" and falls back to the static value — so an editor clearing a field in Studio and publishing does **not** blank the site, it reverts to the seed content.
- Pages (`src/app/(site)/**/page.tsx`) are async Server Components that call `getXContent()` and render — they never import from `src/lib/data.ts` directly.
- `sanityFetch` (`src/sanity/fetch.ts`) is itself defensive: if Sanity isn't configured (`isSanityConfigured` in `src/sanity/env.ts`, based on whether a real `NEXT_PUBLIC_SANITY_PROJECT_ID` is set) or the fetch throws, it returns `null` and the static fallback takes over. This means the site always renders even with no Sanity project connected at all — useful for demoing the codebase standalone.

When adding a new editable field: add it to the relevant schema in `src/sanity/schemaTypes/`, add it to the matching GROQ query in `queries.ts`, thread it through the `pick()` merge in `content.ts`, and only then read it in the page/component. Skipping the query step is the most common way a Studio field silently does nothing on the live site.

### Draft preview (Presentation tool)

- `src/sanity/client.ts` exports two clients: `client` (published-only, CDN-cached) and `previewClient` (drafts perspective, token-authenticated, uncached). `sanityFetch` checks `draftMode()` from `next/headers` and picks the right one — wrapped in try/catch because `draftMode()` throws outside a request scope (e.g. inside `generateStaticParams` at build time).
- `src/app/api/draft/route.ts` and `api/disable-draft/route.ts` are the Next.js draft-mode entry/exit points that Sanity's Presentation tool calls.
- `sanity.config.ts` wires `presentationTool` to `/api/draft` and defines a `resolve.locations` map from each singleton (and `post` via `defineLocations`) to the page path it renders on.
- Requires `SANITY_API_READ_TOKEN` (a Viewer-scoped token) and `NEXT_PUBLIC_SITE_URL` in the environment — not committed, must be set per-environment (local `.env.local`, and separately in Vercel project settings for the live Presentation tool to work there).

### Studio hosting

The Studio is embedded at `/studio` inside this same Next.js app (`src/app/studio/[[...tool]]/page.tsx` + root `sanity.config.ts`, not `sanity/`), rather than deployed separately via `sanity deploy`. `src/middleware.ts` redirects everything under the `studio.semirad.com` subdomain to `/studio`, so that subdomain can point straight at the CMS while the main domain serves the marketing site.

### Images

`SmartImage` (`src/components/ui/SmartImage.tsx`) wraps `next/image` and falls back to a branded placeholder panel (icon + label) on load error — used everywhere so a missing `/public/images` file or an unset Sanity image field never breaks layout, it just shows an on-brand "photo missing" placeholder instead of a broken image. `src/sanity/image.ts`'s `urlForImage` resolves Sanity image refs to CDN URLs; when a Studio image field is empty, `content.ts`'s `pickImage` helper falls back to the static path in `/public/images`.

### Animation conventions

Framer Motion (v12) is used throughout, gated by a global `MotionConfig reducedMotion="user"` (`src/components/layout/MotionProvider.tsx`) — new animated components should rely on this rather than re-implementing `prefers-reduced-motion` checks, except where a component needs to fully disable pointer-driven effects (see `TiltCard.tsx`, `Spotlight.tsx` for the `useReducedMotion()` early-return pattern). `Reveal` / `StaggerGroup` / `StaggerItem` (`src/components/ui/Reveal.tsx`) are the shared scroll-reveal primitives; reach for these before writing new one-off `motion.div` variants for standard fade-up-on-scroll behavior.

### Contact form

`src/components/sections/ContactForm.tsx` (react-hook-form + zod, schema in `src/lib/contactSchema.ts`) posts to `src/app/api/contact/route.ts`, which sends via Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` env vars). The form reads `?sluzba=` and `?balicek=` search params to preselect a service and prefill the message when linked from a pricing card (see `packageInterestHref` in `src/lib/data.ts`).

### SEO

`src/app/sitemap.ts` and `robots.ts` generate dynamically (including Aktuality posts). `src/components/seo/JsonLd.tsx` provides `DrivingSchool`/`LocalBusiness`, `FAQPage`, and `Article` structured data, rendered per-page.

### Demo badge

`src/components/layout/DemoBadge.tsx` is a fixed on-screen "Demo verze" pill, currently unused (not imported anywhere) — a leftover from an earlier demo stage. Safe to delete, or re-mount if the site needs to be marked as a demo again.
