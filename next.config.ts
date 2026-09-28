import type { NextConfig } from "next";

// Static export for GitHub Pages — the site has no server routes/actions,
// so `output: "export"` covers everything. GH Pages serves this repo from
// /khinkali-dom/, so the base path only applies during that build (set via
// GITHUB_PAGES=true in the deploy workflow) and stays empty for local dev
// and any host that serves the site from its domain root.
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/khinkali-dom";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? repoBasePath : "",
  assetPrefix: isGithubPagesBuild ? `${repoBasePath}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
