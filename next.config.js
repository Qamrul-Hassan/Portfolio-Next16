/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable modern image formats (avif > webp > png/jpg)
  // Next.js Image component will serve avif to supporting browsers
  images: {
    formats: ["image/avif", "image/webp"],
    // Increase cache TTL to 1 year for static assets
    minimumCacheTTL: 31536000,
  },

  // Compress responses
  compress: true,
};

module.exports = nextConfig;
