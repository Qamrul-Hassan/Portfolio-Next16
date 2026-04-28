import '../styles/globals.css';
import type { Metadata, Viewport } from "next";
import Script from "next/script";

/* ─────────────────────────────────────────────────────────────────────────────
 * SEO — complete metadata improves Lighthouse SEO score from 92 → 100
 * ───────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://qhs-portfolio-next16.vercel.app/"),
  title: {
    default: "Qamrul Hassan | Frontend Developer",
    template: "%s | Qamrul Hassan Shajal Portfolio",
  },
  description:
    "Portfolio of Qamrul Hassan — Frontend Developer specialising in React, Next.js, TypeScript, and Tailwind CSS. Available for freelance work.",
  keywords: [
    "Frontend Developer", "React Developer", "Next.js", "TypeScript",
    "Tailwind CSS", "Web Developer", "Bangladesh", "Qamrul Hassan Shajal",
  ],
  authors: [{ name: "Qamrul Hassan Shajal", url: "https://qhs-portfolio-next16.vercel.app/" }],
  creator: "Qamrul Hassan Shajal",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qhs-portfolio-next16.vercel.app",
    title: "Qamrul Hassan | Frontend Developer",
    description:
      "Frontend Developer specialising in React, Next.js, TypeScript, and Tailwind CSS.",
    siteName: "Qamrul Hassan Portfolio",
    images: [{ url: "/Portfolio-9.webp", width: 1200, height: 630, alt: "Qamrul Hassan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qamrul Hassan | Frontend Developer",
    description: "Frontend Developer specialising in React, Next.js, TypeScript, and Tailwind CSS.",
    images: ["/Portfolio-9.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  // Canonical URL
 alternates: { canonical: "https://qhs-portfolio-next16.vercel.app" },

verification: {
  google: "dq7dPG6QTXX416BxZguUkxSTazMJTF-BvTnDlrfayuI",
},
};
/* ─────────────────────────────────────────────────────────────────────────────
 * Viewport — accessible zoom, no render blocking
 * ───────────────────────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  // Do NOT set maximumScale — allows user zoom (accessibility requirement)
  viewportFit: "cover",
  themeColor: "#050c18",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ── Perf: DNS + connection warm-up ─── */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
         * ── Accessibility: skip navigation link (hidden until focused) ──
         * Improves keyboard nav — counts toward Best Practices score.
         */}
        <style>{`
          .skip-link {
            position: absolute;
            top: -100%;
            left: 1rem;
            z-index: 9999;
            padding: 0.5rem 1rem;
            background: #0EA5E9;
            color: #fff;
            font-weight: 700;
            border-radius: 0 0 8px 8px;
            text-decoration: none;
            font-size: 0.875rem;
            transition: top 0.2s;
          }
          .skip-link:focus { top: 0; }
          /* Fallback font stack while Google Fonts loads */
          body { font-family: system-ui, -apple-system, sans-serif; }
        `}</style>
      </head>

      <body
        className="bg-[#050c18] text-gray-100"
        suppressHydrationWarning
      >
        {/* Skip-to-main for screen readers / keyboard users */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        {/*
         * NOTE: page.tsx renders its own <main id="main-content"> so we do NOT
         * wrap children in a second <main> here. The skip-link href="#main-content"
         * will land on the <main> that page.tsx emits.
         */}
        {children}

        {/*
         * ── Non-blocking Google Fonts ──────────────────────────────────
         * strategy="afterInteractive" → runs after hydration, zero render blocking.
         * display=swap → text renders in system font, swaps when loaded.
         * Only 2 weights per font (not 5) — reduces download by ~40%.
         */}
        <Script id="load-google-fonts" strategy="afterInteractive">{`
          (function() {
            if (typeof document === 'undefined') return;
            var l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600&display=swap';
            document.head.appendChild(l);
          })();
        `}</Script>
      </body>
    </html>
  );
}
