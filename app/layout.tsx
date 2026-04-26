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
