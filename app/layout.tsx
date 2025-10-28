import '../styles/globals.css';
import Logo from '../public/Logo-2.webp';

export const metadata = {
  title: 'QHSportfolio',
  description: 'Next.js 16 Turbopack project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={Logo.src} />
        <title>QHSportfolio</title>
      </head>
      <body className="bg-white text-gray-900" suppressHydrationWarning>
        <div className="pt-0"> {/* Add padding top to account for fixed navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}