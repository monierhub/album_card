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
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
