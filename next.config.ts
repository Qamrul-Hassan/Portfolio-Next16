import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Compress all responses (gzip/brotli)
  compress: true,

  // Image optimization disabled to stay within Vercel free tier limits
  // (5K transformations/month, 100K cache writes/month)
  // Since images are .webp already, this is fine — no quality loss.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;