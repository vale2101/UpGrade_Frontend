import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.falabella.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "co.tiendasishop.com",
      },
      {
        protocol: "https",
        hostname: "p.turbosquid.com",
      },
      {
        protocol: "https",
        hostname: "exitocol.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "exitocol.vteximg.com.br",
      },
    ],
  },
};

export default nextConfig;
