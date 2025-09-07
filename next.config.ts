import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clevercel.co",
      },
    ],
  },
};

export default nextConfig;
