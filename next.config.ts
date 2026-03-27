import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      // SVGR for all project .svg except src/assets/features/ (those use Next static image + Image).
      "*.svg": {
        condition: {
          all: [
            { not: "foreign" },
            { not: { path: "**/assets/features/**/*.svg" } },
            { not: { path: "**/assets/ecosystem-marquee/**/*.svg" } },
          ],
        },
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
