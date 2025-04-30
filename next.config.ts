import type { NextConfig } from "next";

/**
 * Next.js configuration
 *
 * This file contains the configuration for the Next.js application.
 * It focuses on image optimization settings.
 */
const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure image optimization
  images: {
    // Using remotePatterns instead of domains (domains is deprecated)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // Allow any path on picsum.photos
      },
    ],
  },
};

export default nextConfig;
