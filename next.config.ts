import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      // Transform .svg imports into React components via @svgr/webpack.
      // Only applies to project files (not node_modules).
      "*.svg": {
        condition: { not: "foreign" },
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
