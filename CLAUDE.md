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
reference site — do the same for any future copy pulled from there. The cart is
intentionally a stub: it holds state client-side and never sends a network request.
See the published delivery-research
artifact (linked in conversation history) for the plan on how ordering should eventually
work — short version: real orders currently go through Yandex.Eda directly, not this
site; the recommended path to a functional cart is Yandex Delivery's API (separate,
free-to-integrate product from the Yandex.Eda marketplace listing), not the Yandex.Eda
partner API (which is one-way POS→Yandex.Eda and can't accept orders from an external site).

## Commands

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build (also runs the TypeScript check — treat a failing
  build as a type error, not just a bundling issue)
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

There is no test suite yet.

The build is a static export (`output: "export"` in `next.config.ts`, no server
routes/actions in the app) — `npm run build` writes plain HTML/CSS/JS to `out/`.
`GITHUB_PAGES=true npm run build` additionally prefixes every asset with
`/khinkali-dom` (the repo's GitHub Pages subpath — the GitHub repo, deployed URL,
and `basePath` in `next.config.ts` still use the project's original working name;
only the on-site business content was updated to "Экранидзе". Renaming the repo
would break the live Pages URL, so that's a deliberate separate decision, not an
oversight). Leave `GITHUB_PAGES` unset for local builds or any host serving the
site from its domain root. Deploys to GitHub Pages automatically via
`.github/workflows/deploy-pages.yml` on every push to `main`.

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
