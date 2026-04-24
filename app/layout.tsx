import '../styles/globals.css';
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "QHSportfolio",
  description: "Next.js 16 Turbopack project",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900" suppressHydrationWarning>
        <div className="pt-0"> {/* Add padding top to account for fixed navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}
