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
  menu categories/items, free-form sections, and an orders list. The Hero
  logo (`restaurant.php`) and dish photos (`menu.php`) can be uploaded as
  files, not just pasted as a path — see `lib/uploads.php`.
- `lib/yandex_rating.php`, `cron/update_ratings.php` — scrapes each
  restaurant's real Yandex Maps org page (`restaurants.yandex_reviews_url`,
  also shown as the "отзывы" link) for its aggregate rating and writes it to
  `restaurants.rating_value` + `rating_updated_at`. Org pages render this as
  plain schema.org microdata server-side (no JS/headless browser needed) —
  anchored on the `itemType="http://schema.org/AggregateRating"` block
  specifically, not the first `ratingValue` on the page, since individual
  review ratings use the same attribute name and can appear earlier in the
  HTML. Needs a browser-like `CURLOPT_USERAGENT` or Yandex serves a stripped
  page with no microdata. Run manually: `php cron/update_ratings.php`
  (prints what it updated, skips — doesn't blank out — a restaurant whose
  page didn't parse). Schedule it via Timeweb's panel cron UI (not
  `crontab -e`, which is blocked on this hosting): command
  `php /home/c/ci004114/ekranidze/public_html/backend/cron/update_ratings.php`,
  once or twice a day is plenty.
- `lib/uploads.php` — file uploads for the Hero logo and dish photos
  (`handle_logo_upload`/`handle_dish_photo_upload`, both thin wrappers over
  `handle_image_upload`). Validates real image bytes via `getimagesize()`
  (not just the extension/Content-Type), writes under a server-generated
  filename to `uploads/logos/` or `uploads/menu/`, and deletes the previous
  file first if it was one of our own uploads (never a static `/logos/...`
  or `/menu/...` path baked into the Next.js build — this backend doesn't
  own those). Stored as a protocol-relative URL
  (`//ekranidze.ru/backend/uploads/...`) so it keeps working once SSL is
  set up. `uploads/.htaccess` blocks script execution inside that
  directory — defense in depth alongside the content check, since every
  filename there is still server-generated, never the client's.

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
- Payment processing — separate, later (see the CLAUDE.md "Legal
  compliance" section for what 54-ФЗ requires once that's wired up).
