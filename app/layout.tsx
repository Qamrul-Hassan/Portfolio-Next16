import '../styles/globals.css';
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Qamrul Hassan | Frontend Developer",
  description: "Portfolio of Qamrul Hassan — Frontend Developer specializing in React, Next.js, TypeScript, and Tailwind CSS.",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "X-DNS-Prefetch-Control": "on",
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to font CDN — eliminates render-blocking network roundtrip */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* display=swap prevents FOIT; only load weights actually used */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* NOTE: LCP image (/Portfolio-9.webp) and logo (/Logo-4.webp) are preloaded
            automatically by Next.js via the priority + fetchPriority props on <Image>.
            Manual <link rel="preload"> for these would target the raw URL, which mismatches
            the optimised URL (with ?w=&q= params) that Next.js actually serves — causing
            the "preloaded but not used" browser warning. Let Next.js handle it. */}
      </head>
      <body
        className="text-gray-900"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#050d1a",
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
