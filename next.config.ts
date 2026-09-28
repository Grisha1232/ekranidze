import type { NextConfig } from "next";

// Static export for GitHub Pages — the site has no server routes/actions,
// so `output: "export"` covers everything. GH Pages serves this repo from
// /ekranidze/, so the base path only applies during that build (set via
// GITHUB_PAGES=true in the deploy workflow) and stays empty for local dev
// and any host that serves the site from its domain root.
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/ekranidze";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? repoBasePath : "",
  assetPrefix: isGithubPagesBuild ? `${repoBasePath}/` : "",
  images: {
    unoptimized: true,
  },
  // `images.unoptimized` makes next/image render `src` as-is, so it does NOT
  // get the automatic basePath prefix `next/image` normally adds — public/
  // asset paths built by hand (see src/lib/base-path.ts) need this at
  // runtime to resolve under GitHub Pages' /ekranidze/ subpath.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPagesBuild ? repoBasePath : "",
  },
};

export default nextConfig;
