import '../styles/globals.css';
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Qamrul Hassan | Frontend Developer",
  description: "Portfolio of Qamrul Hassan — Frontend Developer specializing in React, Next.js, TypeScript, and Tailwind CSS.",
  icons: {
    icon: "/favicon.ico",
  },
  // Preconnect hints help reduce latency
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
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/Logo-4.webp" />
        <link rel="preload" as="image" href="/banner.webp" />
        <link rel="preload" as="image" href="/Portfolio-9.webp" />
      </head>
      <body className="bg-white text-gray-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
