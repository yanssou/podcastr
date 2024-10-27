import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "www.adionics.com",
      },
      {
        protocol: "https",
        hostname: "necessary-echidna-516.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
