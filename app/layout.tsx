import '../styles/globals.css';
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Qamrul Hassan | Frontend Developer",
  description:
    "Portfolio of Qamrul Hassan — Frontend Developer specialising in React, Next.js, TypeScript, and Tailwind CSS.",
  icons: { icon: "/favicon.ico" },
};

// Allow user zoom (accessibility) — canvas redraws to CSS px so stays crisp at any zoom
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS + connection warm-up */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical above-the-fold images */}
        <link rel="preload" as="image" href="/Logo-4.webp" />
        <link rel="preload" as="image" href="/banner.webp" />
        <link rel="preload" as="image" href="/Portfolio-9.webp" />
      </head>
      <body
        className="bg-[#050d1a] text-gray-100"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        suppressHydrationWarning
      >
        {children}

        {/*
         * Non-blocking Google Fonts via next/script (afterInteractive).
         * This runs after the page is interactive — zero render-blocking.
         * The injected <link> uses display=swap so text is never invisible.
         */}
        <Script id="load-google-fonts" strategy="afterInteractive">{`
          (function() {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap';
            document.head.appendChild(link);
          })();
        `}</Script>
      </body>
    </html>
  );
}
