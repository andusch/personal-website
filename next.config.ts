import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  allowedDevOrigins: ['192.168.0.234', '192.168.0.*'],
  
  images: {
    remotePatterns: [
      {
      protocol: 'https',
      hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  
  // reactCompiler: true,
};

export default nextConfig;
