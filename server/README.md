# Orders API

Small standalone backend for the checkout form. It exists because the main
site is a static export (GitHub Pages) and can't hold secrets like a Telegram
bot token — this is the one piece that needs a real server.

Deployed separately from `siteForPapa` itself. Currently **not deployed
anywhere** — runs locally only, until the Timeweb VPS is ready.

## What it does

`POST /api/orders` receives a checkout submission, validates it, and sends a
formatted message to the ordering restaurant's Telegram chat.

**Stub mode**: a restaurant with no bot token/chat id configured in `.env`
still accepts orders — they're just logged to the console instead of sent to
Telegram, and the request still succeeds. Nothing breaks while tokens aren't
ready yet; fill them in later and Telegram delivery turns on automatically,
no code changes needed.

## Local setup

```bash
cd server
npm install
cp .env.example .env   # then fill in bot tokens as they're created
npm run dev
```

Health check: `curl localhost:8787/health`

## Wiring it to the site

Once this is deployed (Timeweb VPS, behind the final domain):

1. Set `NEXT_PUBLIC_ORDERS_API_URL` to this service's URL when building the
   main site (e.g. in `.github/workflows/deploy-pages.yml`'s `env:` for the
   build step) — `CheckoutPage` only calls this backend when that variable is
   set; until then it keeps today's local-only stub behavior unchanged.
2. Set `ALLOWED_ORIGIN` in this service's `.env` to the site's real origin
   (not `*`) once it's live.
3. Create each restaurant's Telegram bot via `@BotFather` (`/newbot`), add it
   to that restaurant's staff chat, and find the chat id (message the bot,
   then check `https://api.telegram.org/bot<token>/getUpdates`). Fill both
   into `.env` — see the comments there for which pair goes with which
   restaurant/location.
4. Run with a process manager (pm2 / systemd) so it survives reboots —not set
   up yet, do this as part of the Timeweb deploy.

## Not done yet

- Yandex Delivery integration (price estimate + order creation) — separate
  follow-up once there's a business account/contract.
- Payment processing.
- The personal-data handling this unlocks (real name/phone/address leaving
  the browser) has compliance requirements — see the "Legal compliance"
  section in the main repo's `CLAUDE.md` before this goes live for real.
