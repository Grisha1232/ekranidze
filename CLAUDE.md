# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing site for "Экранидзе", a real Georgian restaurant in Lyubertsy (Moscow
region). Menu, prices, address, phone and legal (ОГРН/ИНН) in `src/data/menu.ts` and
the section components are the client's real business data, sourced from their
existing site (ekranidze.clients.site) — keep them in sync if the client's menu or
contact info changes; don't treat them as throwaway placeholder text. Photos are
still placeholder gradients (`PlaceholderImage`) pending real photography. The "О
нас" copy was written fresh rather than copied from the reference site — do the
same for any future copy pulled from there.

**Two hosts, two different purposes.** GitHub Pages (`.github/workflows/deploy-pages.yml`,
auto-deploys on every push to `main`) is the original static deployment — still
live, untouched by anything below, 100% static with zero network calls. The
*real* site is now on Timeweb shared hosting (plain PHP/MySQL hosting, no
root, no Node — see `backend/README.md`), built and deployed by hand (not
automated in CI yet): two separate static exports, one per domain, each with
`PRIMARY_RESTAURANT` set so that restaurant renders at the domain's own root
instead of the GitHub-Pages-era client redirect, and both pointed at the
*same* shared `backend/` instance via `NEXT_PUBLIC_CONTENT_API_URL` (set only
for these builds — unset, including the GitHub Pages build, everything below
silently reduces to the old static-only behavior, nothing breaks).

`backend/` (PHP + MySQL) is what makes the Timeweb deployment "real": a public
read API (`restaurants.ts`/`menu.ts`'s data, but live from a DB an admin can
edit — see `backend/admin/`, a password-gated CMS) and an orders endpoint
(`CheckoutPage` POSTs there when `NEXT_PUBLIC_CONTENT_API_URL` is set; always
records the order, also pushes to the restaurant's Telegram chat once
`telegram_targets` has a bot configured for it — stub/log-only otherwise).
`src/data/restaurants.ts`/`menu.ts` are **not** dead code — they're the
synchronous first paint and the fallback when the backend is unreachable or
unconfigured (`ContentContext` seeds from them, then swaps in live data).
See the published delivery-research artifact (linked in conversation
history) for the original plan on real order fulfillment — short version:
real orders currently go through Yandex.Eda directly, not this site; the
recommended path to a functional cart is Yandex Delivery's API (separate,
free-to-integrate product from the Yandex.Eda marketplace listing), not the
Yandex.Eda partner API (one-way POS→Yandex.Eda, can't accept orders from an
external site).

## Commands

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build (also runs the TypeScript check — treat a failing
  build as a type error, not just a bundling issue)
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

There is no test suite yet.

The build is a static export (`output: "export"` in `next.config.ts`, no server
routes/actions in the app) — `npm run build` writes plain HTML/CSS/JS to `out/`.
`GITHUB_PAGES=true npm run build` additionally prefixes every asset with
`/ekranidze` (the repo's GitHub Pages subpath, matching the GitHub repo name —
keep `repoBasePath` in `next.config.ts` in sync if the repo is ever renamed
again, or every asset 404s). Leave `GITHUB_PAGES` unset for local builds or any
host serving the site from its domain root. Deploys to GitHub Pages
automatically via `.github/workflows/deploy-pages.yml` on every push to `main`.

## Architecture

- **Single-page app.** `src/app/page.tsx` composes the whole homepage from section
  components in `src/components/` (`Header`, `Hero`, `MenuSection`, `AboutSection`,
  `DeliverySection`, `ContactsFooter`, `CartDrawer`). Nav links are same-page anchors
  (`#menu`, `#about`, `#delivery`, `#contacts`), not routes.
- **Cart state** lives in `src/context/CartContext.tsx` (`CartProvider` wraps the app
  in `layout.tsx`). It's client-only React state persisted to `localStorage` under
  `khinkali-dom:cart`, with no backend calls anywhere in the chain — `CartDrawer`'s
  "Оформить заказ" button just reveals a stub notice. Don't wire it to a real
  checkout without also revisiting the delivery-fulfillment approach above.
- **Menu content** is static data in `src/data/menu.ts` (`categories` + `menuItems`),
  filtered client-side by `MenuSection`. No CMS/API — editing content means editing this file.
- **No real photos yet.** `PlaceholderImage` renders a gradient block (by `tone`:
  `warm` / `clay` / `olive`) instead of an image. Swap for `next/image` once real
  photography exists.
- **Styling is Tailwind v4**, config-free — theme tokens are CSS custom properties in
  `src/app/globals.css` (`--primary`, `--accent`, `--background`, `--border`, etc.)
  exposed to Tailwind via `@theme inline`. There is no `tailwind.config.js`; add new
  design tokens in `globals.css`, not a config file.
- **Fonts** are loaded via `next/font/google` in `layout.tsx`: Playfair Display
  (display/headings) + Manrope (body), plus Noto Serif Georgian (`--font-georgian`
  / `font-georgian` utility) for real Georgian-script (mkhedruli) text — loaded but
  not yet applied anywhere; wire it up once told what Georgian-language text/copy
  should use it. All three were picked specifically because they ship the subset
  this site actually needs (`cyrillic` for the Russian copy, `georgian` for
  mkhedruli) — not every Google font does (e.g. Fraunces has no `cyrillic` subset);
  before adding a new font, check
  `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` for its
  `subsets`, or the build will fail TypeScript checking on the `subsets` array.

## Legal compliance

Verify current specifics with an accountant/lawyer before relying on any of
this for real — none of it has had professional legal review, and the rules
around personal data tightened as recently as July 2025.

- **152-ФЗ (personal data) — done.** `/privacy` (`src/app/privacy/page.tsx`)
  publishes the Политика обработки персональных данных, and `CheckoutPage`
  requires an explicit consent checkbox (linking to it and to `/oferta`)
  before a submission is allowed, real or stub. Data-at-rest localization
  (152-ФЗ Art. 18(5)) is satisfied — `backend/`'s MySQL DB lives on the
  Timeweb hosting (Russia), not a foreign host. Repeat violations carry
  turnover-based fines (1–3% of annual revenue).
- **Law "On Protection of Consumer Rights" (distance selling) — done.**
  `/oferta` (`src/app/oferta/page.tsx`) covers seller identity (both
  restaurants' legal name/address/ИНН/ОГРН, pulled from `restaurants.ts`),
  price, payment terms, delivery terms, and return/refund terms.
- **54-ФЗ — not done, blocked on payment.** Every online payment needs a
  fiscal receipt. In practice this is covered by the payment aggregator's
  bundled "облачная касса" (e.g. ЮKassa, Т-Банк) once payment is wired up —
  not something to build separately.
- **Ad-marking law**, only if paid promotion ever runs for this site (targeted
  ads, bloggers, etc.): requires "erid" labeling through an ОРД or risks a
  fine. Not about the site's own code, but about any future marketing linking
  to it.

## Working in this repo

This project pins a pre-release Next.js (see `package.json`); `AGENTS.md` at the repo
root (auto-generated/refreshed by `next dev` — don't hand-edit it, edit is a no-op)
warns that App Router APIs and conventions may differ from training-data Next.js.
When something behaves unexpectedly, check `node_modules/next/dist/docs/` before
assuming a remembered API shape is correct. One instance already hit: the bundled
`eslint-plugin-react-hooks` flags `react-hooks/set-state-in-effect` more aggressively
than usual, including the standard "hydrate state from `localStorage` on mount"
pattern (see the disable comment in `CartContext.tsx` for why it's a deliberate,
justified exception there).
