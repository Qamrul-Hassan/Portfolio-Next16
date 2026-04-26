/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve modern image formats — avif is ~50% smaller than webp
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache static images for 1 year
    minimumCacheTTL: 31536000,
  },

  // Gzip all responses
  compress: true,

  // Transpile packages that ship legacy JS — this eliminates the
  // "Legacy JavaScript" Lighthouse warning (est savings: 14 KiB).
  // framer-motion and react-simple-typewriter both ship ES2017+ syntax
  // that older mobile browsers need transpiled.
  transpilePackages: [
    "framer-motion",
    "react-simple-typewriter",
  ],

  // Strict mode catches double-render issues in development
  reactStrictMode: true,
};

module.exports = nextConfig;
