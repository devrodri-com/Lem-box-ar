# LEM-BOX Argentina

[![CI](https://github.com/devrodri-com/Lem-box-ar/actions/workflows/ci.yml/badge.svg)](https://github.com/devrodri-com/Lem-box-ar/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Public marketing site for **LEM-BOX Argentina**, a Miami-based package-forwarding
and consolidation operator serving the United States → Argentina corridor.

The repository contains the Argentina-market front end: the landing page, a
services page, legal pages, a contact endpoint, and the regional SEO layer that
keeps this site and its Uruguayan sibling from competing for the same search
results.

**Canonical URL:** <https://www.lem-box.com.ar> (the apex `lem-box.com.ar`
redirects to `www` with a 307).

---

## Current status

**In production.** The site is live and served from Vercel. The four indexable
routes, `robots.txt`, `sitemap.xml`, and the web manifest all respond, and the
regional SEO contract described below is verified against the live deployment by
a script in this repository (see [Validation](#validation)).

This is a **content and SEO site**. It is not the customer portal: account
creation and login live on a separate system at `lem-box.com`, which this
repository links to but does not implement.

---

## Problem and intended users

Argentine consumers and small e-commerce sellers who buy in the United States
need a US receiving address, consolidation of multiple purchases into a single
shipment, and a predictable way out of Miami. LEM-BOX provides that service.

Two audiences are addressed by the copy:

- **Individuals** who buy from US retailers and need a private Miami locker plus
  weekly air departures to Argentina.
- **E-commerce sellers** who need third-party warehousing and order preparation
  (3PL / fulfillment) inside the United States.

Both are routed to the same conversion points: account creation on the external
portal, the on-site contact form, and WhatsApp.

---

## Implemented features

Everything listed here exists in this repository and is reachable in the running
application.

### Pages and sections

| Route | Type | Contents |
| --- | --- | --- |
| `/` | Server-rendered on demand | Hero, info bar, About, Benefits grid, How it works, Contact |
| `/servicios` | Static | Miami infrastructure, custom logistics services, 3PL fulfillment, shipping |
| `/privacidad` | Static | Privacy policy |
| `/terminos` | Static | Terms and conditions |
| `/api/contact` | Node.js route handler | Contact form submission |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Generated | SEO and PWA metadata |

### Contact pipeline

`POST /api/contact` validates the payload server-side (name length, email shape,
minimum message length), drops submissions that fill a hidden honeypot field, and
sends the message through [Resend](https://resend.com). If the configured sender
domain is rejected, it retries once with Resend's onboarding sender so a
misconfigured domain does not silently swallow leads. Recipients are read from an
environment variable and support a comma-separated list.

The client form in `ContactSection.tsx` mirrors the same validation rules, keeps
`aria-invalid` / `aria-live` state for screen readers, and offers WhatsApp as a
fallback channel when the request fails.

### Regional SEO layer

The Argentina and Uruguay sites publish nearly identical Spanish copy, so the
main technical risk is search engines treating one as a duplicate of the other.
`src/lib/seo.ts` centralises the contract that prevents this:

- A fixed canonical host (`https://www.lem-box.com.ar`) used as `metadataBase`.
- Per-route `hreflang` alternates for `es-AR` and `es-UY`, plus an `x-default`
  pointing at the market-neutral platform entry point.
- Per-route Open Graph declarations, because Next.js **replaces** `alternates`
  and `openGraph` wholesale rather than merging them with the layout — without a
  per-route declaration every subpage would inherit the home page's canonical.
- A single Argentina Open Graph image, and a sitemap derived from the same route
  list so the two can never drift apart.

### Accessibility and UX details

- Mobile menu rendered in a portal with an overlay, `Escape` to close, and focus
  returned to the trigger.
- Scroll-shrink header and scroll-spy section highlighting via a single
  `useHeaderBehavior` hook that holds state only, with no visual side effects.
- Section labels, `aria-labelledby` headings, and visible focus rings on
  interactive elements.
- Images served through `next/image` with WebP variants for the benefit cards.

---

## Architecture

```
src/
├─ app/                         Next.js App Router
│  ├─ layout.tsx                Root metadata, fonts, header/footer shell
│  ├─ page.tsx                  Home — composes the section components
│  ├─ servicios/page.tsx        Services page
│  ├─ privacidad/page.tsx       Privacy policy
│  ├─ terminos/page.tsx         Terms and conditions
│  ├─ api/contact/route.ts      Contact endpoint (Resend)
│  ├─ robots.ts, sitemap.ts     Generated from src/lib/seo.ts
│  └─ manifest.webmanifest      PWA manifest (es-AR)
├─ components/                  Presentational sections
│  └─ hooks/                    Navbars + useHeaderBehavior
└─ lib/
   ├─ seo.ts                    Canonical host, hreflang, per-route metadata
   ├─ country.ts                Host → country resolution
   └─ content.ts                Per-country copy (about, benefits, process, FAQ)

middleware.ts                   Sets a `lem-country` cookie from the host TLD
next.config.ts                  HSTS response header
scripts/verify-seo.mjs          SEO contract verifier (static + live)
```

**Request flow.** `middleware.ts` inspects the `Host` header and writes a
`lem-country` cookie (`ar` for `*.com.ar`, `uy` for `*.com.uy`). Server components
resolve the same value directly from headers via `getCountryFromHost`, then pull
their copy from `siteContentByCountry`. This keeps the country decision in one
place and lets the page stay a server component.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Language | TypeScript 5.9, `strict: true`, `noEmit` |
| Icons | `lucide-react`, `react-icons` |
| Transactional email | `resend` |
| Image processing | `sharp` (build-time asset conversion, not runtime) |
| Hosting | Vercel |
| Linting | ESLint 9 with `next/core-web-vitals` and `next/typescript` |

---

## Getting started

Requires **Node.js 20** (the version CI runs on).

```bash
git clone https://github.com/devrodri-com/Lem-box-ar.git
cd Lem-box-ar
npm ci
npm run dev
```

The dev server starts on <http://localhost:3000>.

The site renders without any environment variables — only the contact endpoint
needs them. Submitting the form without `RESEND_API_KEY` returns a 500 with an
explicit "missing config" message rather than failing silently.

> On `localhost` the host does not end in `.com.ar`, so `getCountryFromHost`
> falls back to the `uy` content branch. The two branches differ only in a few
> strings (`Argentina` vs `Buenos Aires`); the production host resolves to `ar`.

---

## Environment variables

Create `.env.local` (git-ignored). **Names only — never commit real values.**

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for `/api/contact` | Resend API key. Without it the endpoint returns 500. |
| `RESEND_FROM` | No | Verified sender. Defaults to Resend's onboarding sender. |
| `CONTACT_TO` | No | Destination inbox, or a comma-separated list. Falls back to the public contact address. |
| `RESEND_DEBUG_TO` | No | Extra recipient appended for debugging. |

Synthetic example:

```dotenv
RESEND_API_KEY=re_example_synthetic_value_not_real
RESEND_FROM="Example Sender <no-reply@example.com>"
CONTACT_TO=inbox@example.com,alerts@example.com
RESEND_DEBUG_TO=debug@example.com
```

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve a built app |
| `npm run lint` | ESLint |
| `npm run verify:seo` | Verify the regional SEO contract against the sources |
| `npm run to-webp-all` | Batch-convert `public/` images to WebP (requires `cwebp` on PATH) |

There is no `typecheck` script; type checking runs as part of `npm run build`, or
directly with `npx tsc --noEmit`.

---

## Validation

`scripts/verify-seo.mjs` is a dependency-free checker for the regional contract.
It has three modes:

```bash
# 1. Static — asserts the contract in the source files
npm run verify:seo

# 2. Live — also fetches a deployment and checks the served HTML
node scripts/verify-seo.mjs --url https://www.lem-box.com.ar

# 3. Reciprocity — also checks that the UY site points hreflang es-AR back here
node scripts/verify-seo.mjs --url https://www.lem-box.com.ar --peer https://lem-box.com.uy
```

It fails the process on any violation of: canonical host and `www` prefix,
`x-default` target, Uruguay hostnames leaking outside the deliberate `es-UY`
alternate, robots/sitemap host, sitemap anchors and duplicates, manifest market
identity, visible market copy, per-route `alternates` and `openGraph`
declarations, and Open Graph asset dimensions (JPEG 1200×630, checked by parsing
the JPEG SOF marker directly).

### Last verified

All four checks below were run against commit `2a708e4` on 2026-08-15; the live
checks targeted the production deployment.

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass — 0 errors, 6 warnings |
| Types | `npx tsc --noEmit` | Pass — no errors |
| Build | `npm run build` | Pass — 13 routes generated |
| SEO contract (static + live + reciprocity) | `node scripts/verify-seo.mjs --url … --peer …` | Pass |

---

## CI/CD and quality controls

- **GitHub Actions** (`.github/workflows/ci.yml`) runs on every pull request and
  on pushes to `main`: Node 20, `npm ci`, `npm run build`, then `npm run lint`.
  The workflow declares `permissions: contents: read`.
- **Dependabot** (`.github/dependabot.yml`) opens weekly npm update PRs, capped at
  5 open at a time, with major version bumps ignored.
- **Deployment** is handled by Vercel from `main`.

CI covers build and lint only; `verify:seo` is not part of it.

---

## Security and trust boundaries

What the repository demonstrably does:

- **Credentials are kept out of the repository.** No tracked environment files or
  known credentials were found during this repository review, and `.env*` is
  git-ignored. Runtime credentials are supplied through environment variables.
- **HSTS** is set for every path in `next.config.ts`
  (`max-age=31536000; includeSubDomains; preload`) and is present on live
  responses.
- **Server-side validation** on `/api/contact`; the client-side checks are a
  convenience, not the boundary.
- **Honeypot field** to absorb naive form bots.
- The Resend client is instantiated lazily inside the request handler, so the API
  key is never captured at module scope during the build.
- External links carry `rel="noopener noreferrer"`.
- CI runs with read-only repository permissions.

Known gaps, stated plainly:

- **Operational hardening remains planned** for stronger abuse controls and
  normalized provider error responses on `/api/contact`.
- No automated dependency or secret scanning beyond Dependabot's version bumps.

This list is what has been verified in this codebase; it is not an audit of the
wider LEM-BOX platform.

---

## Limitations

Honest boundaries of what is in this repository today:

- **No automated test suite.** There is no test runner, no test files, and no
  test job in CI. Correctness rests on the type checker, ESLint, the build, and
  `verify:seo`.
- **`verify:seo` is not enforced by CI.** It passes locally and against
  production, but nothing blocks an SEO regression from merging.
- **Analytics are wired but inert.** Several CTAs carry `data-umami-event`
  attributes, but no Umami (or other analytics) script is loaded anywhere, so no
  events are collected.
- **The `uy` branch of `content.ts` is vestigial here.** This repository serves
  Argentina; the Uruguay site is a separate deployment. The branch survives
  because `getCountryFromHost` defaults to `uy`, which is what non-production
  hosts resolve to.
- **No country selector.** `lem-box.com` routing between markets is handled
  outside this repository.
- **This site is not the operating platform.** Accounts, tracking and shipment
  data live in the separate LEM-BOX platform; this repository only links to it.

---

## Related links

| Destination | URL |
| --- | --- |
| Production (Argentina) | <https://www.lem-box.com.ar> |
| Sibling site (Uruguay) | <https://lem-box.com.uy> |
| Platform entry point | <https://lem-box.com/acceder> |
| Customer portal | <https://portal.lem-box.com/registro> (redirects to `lem-box.com`) |

---

## License and contributing

No `LICENSE` file is published, so default copyright applies and no reuse rights
are granted. Licensing is handled as a commercial decision outside this
repository.

There is no `CONTRIBUTING.md` or `SECURITY.md`. The workflow in practice is
feature branches merged into `main` through pull requests, with CI required to
build and lint cleanly.

To report a security issue, contact <info@lem-box.com> rather than opening a
public issue.
