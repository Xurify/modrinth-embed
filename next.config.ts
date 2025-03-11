import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
