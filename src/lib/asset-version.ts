// Bump this whenever a file under public/logos or public/menu is replaced
// in place (same filename, new bytes). Timeweb's nginx caches those by
// extension for a year and serves them straight off disk, bypassing Apache
// entirely — so unlike .html (see public/.htaccess), there's no .htaccess
// override that reaches it. Changing the URL is the only way left to force
// a fresh fetch, hence the query param.
//
// Admin-uploaded images don't need this — lib/uploads.php already gives
// each upload its own unique, timestamped filename, so there's never a
// stale copy to begin with.
export const ASSET_VERSION = "2026-10-28-2";

export function withAssetVersion(path: string): string;
export function withAssetVersion(path: string | undefined): string | undefined;
export function withAssetVersion(path?: string): string | undefined {
  if (!path) return path;
  if (path.startsWith("/logos/") || path.startsWith("/menu/")) {
    return `${path}?v=${ASSET_VERSION}`;
  }
  return path;
}
