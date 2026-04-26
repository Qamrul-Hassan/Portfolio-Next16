/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },

  compress: true,
  reactStrictMode: true,

  // Transpile heavy packages that ship un-transpiled modern JS
  transpilePackages: [
    "framer-motion",
    "react-simple-typewriter",
    "swiper",
  ],

  // HTTP headers for public assets only.
  // NOTE: /_next/static/** is intentionally excluded — Next.js already sets
  // "Cache-Control: public, max-age=31536000, immutable" on those files
  // automatically in production. Adding it manually triggers a warning in
  // Next.js dev mode and can break HMR. Let Next.js own that header.
  async headers() {
    return [
      {
        source: "/(.*\\.webp|.*\\.jpg|.*\\.png|.*\\.avif|.*\\.ico|.*\\.svg|.*\\.woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
