import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable Next.js image optimization to avoid Vercel free tier limits
  // (Image Optimization Transformations: 5K/month, Cache Writes: 100K/month)
  images: {
    unoptimized: true,
  },
  // Remove turbopack root (not needed, can cause issues)
  ...(process.env.NODE_ENV === 'development' ? {
    turbopack: {
      root: process.cwd(),
    },
  } : {}),
};

export default nextConfig;
