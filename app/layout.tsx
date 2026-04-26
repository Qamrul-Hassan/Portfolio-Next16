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
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/Logo-4.webp" />
        <link rel="preload" as="image" href="/banner.webp" />
        <link rel="preload" as="image" href="/Portfolio-9.webp" />
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
