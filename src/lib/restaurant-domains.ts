// Canonical production domain for each restaurant — RestaurantChooser sends
// the visitor there even if the chooser was opened on the OTHER
// restaurant's domain (e.g. picking "Экранидзе" while on mama-hinkali.ru),
// so a customer never ends up browsing one restaurant under the other's
// brand/URL. Hardcoded rather than admin/DB-driven: this is infrastructure
// config, not editable content, and these domains essentially never change.
//
// Only the two primary .ru domains are listed — not the .рф aliases, whose
// exact (Cyrillic, punycode) hostnames aren't tracked in code anywhere
// else. A visitor on an unlisted host (localhost, GitHub Pages, a .рф
// alias) just gets normal same-origin navigation instead of a redirect.
export const RESTAURANT_PRIMARY_ORIGIN: Record<string, string> = {
  ekranidze: "https://ekranidze.ru",
  "mama-hinkali": "https://mama-hinkali.ru",
};

// www.ekranidze.ru / www.mama-hinkali.ru resolve and serve the same build
// (DNS/hosting defaults to pointing www at the same place) — strip the
// prefix before comparing against RESTAURANT_PRIMARY_ORIGIN's bare-domain
// values, or a visitor on the www host never matches and the cross-domain
// redirect below silently never fires. public/.htaccess also redirects
// www → bare domain server-side (and handles direct navigation to the
// wrong restaurant's domain, e.g. a bookmarked or shared link) — this is
// just the client-side fast path for the chooser's own click handler,
// which can't rely on a server redirect mid-SPA-navigation.
export function normalizeOrigin(origin: string): string {
  return origin.replace(/^https:\/\/www\./, "https://");
}
