import '../styles/globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QHSportfolio",
  description: "Next.js 16 Turbopack project",
  icons: {
    icon: "/Logo-2.webp",
  },
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
