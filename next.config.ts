import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Keep dev and production build output separate. Running `next build` while
// `next dev` (Turbopack) is active used to corrupt `.next` and cause 500s.
// Next 16+ does this by default via isolatedDevBuild; on 15.x we split distDir.
const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
