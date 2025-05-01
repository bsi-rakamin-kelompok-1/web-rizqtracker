import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kelompok1.serverku.org',
      }
    ]
  }
}

export default nextConfig;
