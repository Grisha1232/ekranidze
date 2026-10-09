# Backend

Plain PHP + MySQL — no framework, matches what's actually available on the
Timeweb shared hosting (PHP 8.2, MySQL, no Node runtime, no root). Lives
deployed only under `ekranidze.ru/backend/` — `mama-hinkali.ru`'s build
points at that same shared instance rather than hosting its own copy.

## What's here

- `sql/schema.sql` — restaurants, their addresses/about paragraphs/
  amenities, menu categories/items, a free-form `custom_sections` table so
  admin-added content doesn't need a code change, `orders`, `admin_users`.
- `sql/seed.sql` — generated from `src/data/restaurants.ts` +
  `src/data/menu.ts` (see the generator script referenced in git history);
  regenerate by hand if those files change before the DB is the source of
  truth for everyone.
- `api/restaurants.php`, `api/menu.php` — public read-only JSON, CORS-
  restricted to the real site origins + localhost dev (see
  `lib/config.php`'s `allowed_origins`).
- `api/orders.php` — checkout submissions. Always recorded in the `orders`
  table; also forwarded to the restaurant's Telegram chat when
  `telegram_targets` has a token/chat id configured for it — a restaurant
  without one just has its orders sit in the table, visible at
  `admin/orders.php`, instead of vanishing.
- `admin/` — session-login admin panel (single shared account) covering
  every editable field: hero/about/contacts text, amenities, addresses,
  menu categories/items, free-form sections, and an orders list.

## Local setup

No local PHP on the dev machine this was built on — everything was written,
`php -l` linted over SSH, and tested against the live Timeweb DB directly.
If you do have PHP locally:

```bash
cp lib/config.example.php lib/config.php   # fill in real values
mysql -u root your_db < sql/schema.sql
php -S localhost:8080
```

## Wiring it to the site

`NEXT_PUBLIC_CONTENT_API_URL` (set at Next.js build time) points the site at
this backend — used by both `ContentContext` (restaurants/menu, read-only)
and `CheckoutPage` (orders, write). Unset — the default `npm run build`,
including the GitHub Pages build — the site falls back to the static data in
`src/data/` with zero network calls, exactly like before this backend
existed.

Per-domain Timeweb deploy:

```bash
PRIMARY_RESTAURANT=ekranidze NEXT_PUBLIC_CONTENT_API_URL=http://ekranidze.ru/backend/api npm run build
# move out/ aside, repeat with PRIMARY_RESTAURANT=mama-hinkali, then rsync
# each build's out/ to its own ~/<restaurant>/public_html/ over SSH — see
# the .htaccess rewrite rule already deployed there (Next's static export
# writes both a route/ directory of RSC payloads *and* a route.html file for
# the same path; the web server matches the directory first and 404s, so
# .htaccess rewrites extensionless paths to their .html sibling).
```

`backend/` itself only needs to be rsynced once to `ekranidze.ru`'s
`public_html/backend/` (excluding `lib/config.php`, which is gitignored and
only lives on the server).

## Known gaps

- No "change admin password" UI yet — update `admin_users.password_hash`
  directly (PHP `password_hash($pw, PASSWORD_DEFAULT)`) if it needs to
  change.
- Yandex rating: not automated yet — `restaurants.rating_value` /
  `yandex_reviews_url` are edited by hand via the admin panel for now.
- Payment processing — separate, later (see the CLAUDE.md "Legal
  compliance" section for what 54-ФЗ requires once that's wired up).
