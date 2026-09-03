import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  /**
   * Safety net for ad URLs that point at paths we never built.
   *
   * A live campaign was sending every click to /meta, which 404s. Five days of
   * spend reached a page with no form on it, and it looked fine in reporting
   * because the pixel lives in the root layout and fires on the 404 page too:
   * Meta counted landing page views on a page that could not convert.
   *
   * Whoever writes an ad URL is not necessarily whoever knows the routes, so
   * these map the plausible guesses onto the real lander rather than leaving
   * the failure silent and expensive. 307 rather than 308: these are campaign
   * conveniences, not permanent moves, and a cached permanent redirect would
   * outlive the mistake it is covering.
   */
  async redirects() {
    const toParents = ['/meta', '/facebook', '/fb', '/parent', '/lp', '/landing']
    const toAdults = ['/adult', '/young-adults', '/self']
    return [
      ...toParents.map((source) => ({ source, destination: '/parents', permanent: false })),
      ...toAdults.map((source) => ({ source, destination: '/adults', permanent: false })),
    ]
  },
};

export default nextConfig;
