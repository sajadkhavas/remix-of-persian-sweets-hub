# Phase 1 — Winimi Bakery: SSR foundation + SEO/AEO/GEO core

Persian (fa-IR, RTL) nationwide cookie & dry-sweets storefront. Architecture + crawlability only — visual polish comes later. Brand: **Winimi bakery**. Domain: placeholder `winimi.example` (relative canonicals until real domain is set). Instagram: placeholder `https://instagram.com/winimi` (easily swapped in one config file).

## 0. Rendering confirmation

Stack is TanStack Start v1 (SSR by default). Every route below server-renders full HTML — meta, JSON-LD, and body copy visible in view-source. No `react-helmet-async` fallback needed.

## 1. Global shell (`src/routes/__root.tsx`)

- `<html lang="fa" dir="rtl">`
- Self-hosted **Vazirmatn** via `@fontsource-variable/vazirmatn` (preloaded, `font-display: swap`)
- Semantic landmarks: `header` (with nav + logo), `main`, `footer` (with sitemap-style links, Instagram, contact)
- Tailwind v4 tokens updated for RTL + Persian typography
- Persian-digit + toman formatter utility (`src/lib/format.ts`)
- Site-wide `Organization` (OnlineStore) + `WebSite` (SearchAction) JSON-LD in `__root.tsx` head only (no root `og:image`)

## 2. Routes (all created, placeholder Persian copy, real head/JSON-LD)

Static: `/`, `/products`, `/blog`, `/blog/$slug`, `/packaging-and-shipping`, `/faq`, `/about`, `/contact`

Category (4): `/category/cookies`, `/category/dry-sweets`, `/category/gift-boxes`, `/category/diet`

Product template: `/product/$slug` (8 seeded products)

City template: `/shipping-to/$city` — 16 cities (tehran … ardabil)

Occasion template: `/occasion/$slug` — 6 occasions (yalda, nowruz, valentine, mothers-day, fathers-day, teachers-day)

Custom 404 via `notFoundComponent` in `__root.tsx` (already exists — copy translated to Persian; TanStack returns real 404 status on SSR).

URL policy: lowercase-hyphen slugs, no trailing slash. TanStack default. (301 redirects handled at hosting layer — noted in README, not implemented at app level in Phase 1.)

## 3. Per-route head system

Single `src/lib/seo.ts` helper returning the `head()` object: title (≤60ch, `{page} | Winimi bakery`), Persian description (≤155ch), self-referencing canonical (relative path — no domain baked in), OG (title/desc/type/locale=fa_IR/image), twitter summary_large_image. Every route calls it with page-specific inputs — no shared generic copy.

Placeholder `og:image`: one branded 1200×630 image generated with imagegen, saved to `src/assets/og-default.jpg`, wired on leaf routes only (never `__root.tsx`).

## 4. Structured data components (`src/components/jsonld/`)

Typed React components that render `<script type="application/ld+json">` server-side:
- `OrganizationJsonLd`, `WebsiteJsonLd` — used in root
- `BreadcrumbJsonLd` — used on every non-home route, mirrors a visible `<nav aria-label="breadcrumb">` UI component
- `ProductJsonLd` — Product + Offer (IRR, price, availability), brand, images; `aggregateRating` rendered only when `reviewCount > 0`
- `FAQJsonLd` — built from `{q, a}[]`
- `ArticleJsonLd` — blog posts

Enforcement: each page composes at most one of each @type.

## 5. AEO primitives (`src/components/aeo/`)

- `<AnswerBlock question answer detail?>` — renders `<h2>` (conversational Persian) + immediate ≤40-word answer `<p>` + optional detail
- `<FAQSection items>` — list of AnswerBlocks + auto-injects one `FAQJsonLd`; CSS-only `<details>` expansion so all text is in initial HTML
- Every landing page (home, category, product, city, occasion) ends with a `FAQSection` of ≥4 realistic Persian questions

## 6. Crawler files

- `public/robots.txt` — exact block from the brief with `winimi.example` sitemap URL
- `public/llms.txt` — Persian factual brand paragraph + `## محصولات`, `## ارسال و بسته‌بندی`, `## راهنما` sections listing key URLs
- `src/routes/sitemap[.]xml.ts` — TanStack server route generating full URL set (static + all 4 categories + 8 products + 16 cities + 6 occasions + placeholder blog slugs), with `lastmod`

## 7. Performance

- `<Img>` wrapper: requires `alt` (Persian) + `width` + `height`; `loading="lazy"` default, `priority` prop opts into eager + fetchpriority=high
- Vazirmatn preload + hero image preload on `/`
- No third-party scripts

## 8. Data model + seed (`src/data/`)

TypeScript interfaces exactly as specified. Static seed:
- `products.ts` — 8 Persian products (cookies, gift boxes, dry sweets, diet)
- `cities.ts` — 16 cities with Persian names, shipping method, delivery window, packaging note
- `occasions.ts` — 6 occasions with hero copy
- `blog.ts` — 3 placeholder posts so `/blog` isn't empty

## Assets

One imagegen call: `src/assets/og-default.jpg` 1200×630 branded Winimi bakery card (Persian wordmark + cookie illustration on warm cream background).

## File map (new)

```text
src/lib/seo.ts, src/lib/format.ts, src/lib/site.ts (brand constants)
src/components/jsonld/{Organization,Website,Breadcrumb,Product,FAQ,Article}JsonLd.tsx
src/components/aeo/{AnswerBlock,FAQSection}.tsx
src/components/{Header,Footer,Breadcrumbs,Img,ProductCard}.tsx
src/data/{products,cities,occasions,blog,faqs}.ts
src/routes/products.tsx
src/routes/category.$slug.tsx  (or 4 explicit files — will use one dynamic route matching the 4 known slugs, 404 otherwise)
src/routes/product.$slug.tsx
src/routes/shipping-to.$city.tsx
src/routes/occasion.$slug.tsx
src/routes/blog.tsx, src/routes/blog.$slug.tsx
src/routes/{packaging-and-shipping,faq,about,contact}.tsx
src/routes/sitemap[.]xml.ts
public/robots.txt, public/llms.txt
src/assets/og-default.jpg
```

Edits: `src/routes/__root.tsx` (RTL html, Persian meta defaults, Header/Footer, Org+WebSite JSON-LD, translated 404), `src/routes/index.tsx` (real home), `src/styles.css` (Vazirmatn + RTL tweaks), install `@fontsource-variable/vazirmatn`.

## Deliverable checklist (verified at end)

1. ✅ SSR — view-source contains full text/meta/JSON-LD on every route
2. ✅ All routes render with placeholder Persian content
3. ✅ Unique title/description/canonical per route
4. ✅ Organization, WebSite, Breadcrumb, Product, FAQ, Article JSON-LD all live on relevant pages
5. ✅ robots.txt, llms.txt, sitemap.xml at root
6. ✅ RTL + Vazirmatn global, single h1 per page
7. ✅ AnswerBlock + FAQSection demonstrated on `/faq`

## Out of scope (later phases)

Cart/checkout, real DB (Supabase), auth, reviews collection, real product photography, payment, visual/brand polish, real domain + absolute canonicals, 301 rules at hosting.
