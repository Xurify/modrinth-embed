import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@takumi-rs/image-response", "@takumi-rs/core"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "cdn.modrinth.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:id.png",
        destination: "/api/badge/:id",
      },
    ];
  },
};

export default nextConfig;
