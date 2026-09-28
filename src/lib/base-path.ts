// Prefix for hand-built public/ asset paths (e.g. `${BASE_PATH}/menu/foo.jpg`).
// Needed because `images.unoptimized` makes next/image use `src` verbatim,
// skipping the automatic basePath prefixing it normally does. Empty locally
// and on any host serving the site from its domain root; set to /ekranidze
// by next.config.ts when building for GitHub Pages.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
