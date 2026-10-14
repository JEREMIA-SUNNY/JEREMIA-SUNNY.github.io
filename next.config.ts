import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages. Served from the root
// of a user site (<username>.github.io), so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
