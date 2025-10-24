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
    <html lang="en">
      <head>
        {/* Favicon / Browser tab icon */}
        <link rel="icon" href={Logo.src} />
        {/* Page title */}
        <title>QHSportfolio</title>
      </head>
      <body className="bg-white text-gray-900">
        {children}
        
      </body>
    </html>
  );
}
