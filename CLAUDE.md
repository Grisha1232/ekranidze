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
нас" copy and amenities list were written fresh rather than copied from the
reference site — do the same for any future copy pulled from there. The cart holds
state client-side; checkout (`CheckoutPage`) only sends a network request when
`NEXT_PUBLIC_ORDERS_API_URL` is set at build time — unset (today's state, including
the live GitHub Pages build), it stays the old local-only stub, no network call at
all. See the published delivery-research
artifact (linked in conversation history) for the plan on how ordering should eventually
work — short version: real orders currently go through Yandex.Eda directly, not this
site; the recommended path to a functional cart is Yandex Delivery's API (separate,
free-to-integrate product from the Yandex.Eda marketplace listing), not the Yandex.Eda
partner API (which is one-way POS→Yandex.Eda and can't accept orders from an external site).

`server/` is a separate standalone backend (its own `package.json`, not part of
the Next.js app) that the checkout form POSTs to once wired up — see
`server/README.md`. It forwards new orders to the right restaurant's Telegram
chat; a restaurant with no bot token configured yet just logs the order instead
of failing (stub mode). Not deployed anywhere yet — meant for the Timeweb VPS
once that's set up, independently of the GitHub Pages static site.

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

## Legal compliance before a real checkout ships

The cart is currently a client-only stub (see above) precisely so none of this
applies yet. Once it actually collects and submits customer data (name/phone/
delivery address) and/or takes payment, Russian law imposes real requirements —
revisit this list at that point, and verify current specifics with an
accountant/lawyer before launch, since penalties are significant and the rules
around personal data tightened as recently as July 2025:

- **152-ФЗ (personal data).** Collecting name/phone/address at checkout makes
  the site a personal-data operator: requires a published Политика обработки
  персональных данных, an explicit consent checkbox at checkout (not implied
  by submitting the form), and Russian citizens' data must be stored on
  servers located in Russia (data-localization requirement, 152-ФЗ Art.
  18(5)) — a reason to prefer Russian hosting (e.g. Timeweb) over a foreign
  host once there's a real backend. Repeat violations carry turnover-based
  fines (1–3% of annual revenue).
- **Law "On Protection of Consumer Rights" + Правительство РФ Постановление
  №612** (distance selling). Before the customer completes an order, the site
  must show the seller's full name/address/ИНН/ОГРН (already in
  `ContactsFooter`), price, payment terms, delivery terms, and return/refund
  terms — i.e. a публичная оферта page, which doesn't exist yet.
- **54-ФЗ.** Every online payment needs a fiscal receipt. In practice this is
  covered by the payment aggregator's bundled "облачная касса" (e.g. ЮKassa,
  Т-Банк) — not something to build separately.
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
