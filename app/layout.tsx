import '../styles/globals.css';
import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";

// next/font eliminates the render-blocking Google Fonts <link> tag entirely.
// Fonts are downloaded at build time, self-hosted, and injected as CSS variables —
// zero network round-trip on page load, zero FOIT risk, ~200-400ms LCP improvement on mobile.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qamrul Hassan | Frontend Developer",
  description:
    "Portfolio of Qamrul Hassan — Frontend Developer specializing in React, Next.js, TypeScript, and Tailwind CSS.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/*
          FIX: Preconnect hints — tells the browser to open TCP+TLS connections
          to these origins as early as possible, reducing latency for the first
          request to each. Vercel's image-optimization edge and analytics CDN
          are the two most impactful origins for this portfolio.

          dns-prefetch is a cheaper fallback for browsers that don't support
          preconnect (rare, but still worth including).

          These replace what Lighthouse flagged under "Network dependency tree"
          as origins with no preconnect — estimated savings: ~100-200ms per
          origin on mobile connections.
        */}
        <link rel="preconnect" href="https://vercel.com" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

        {/*
          FIX: Preload the LCP image explicitly so the browser's preload scanner
          finds it in <head> before it parses the JS bundle. Even though
          HeroSection uses <Image priority>, adding a preload hint here gives
          an additional ~50-100ms head start on slower connections because it
          fires before React hydrates.
        */}
        <link
          rel="preload"
          as="image"
          href="/banner.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className="text-gray-900"
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          background: "#050d1a",
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
