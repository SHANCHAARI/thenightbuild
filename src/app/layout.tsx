import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingAgent } from '@/components/FloatingAgent';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Nightbuild Studio — Student-Run Creative Web Dev Agency',
  description:
    'An independent creative web engineering agency by computer science students. We architect bespoke digital experiences, high-performance web apps, and standout capstones.',
  openGraph: {
    title: 'Nightbuild Studio — Student-Run Creative Web Dev Agency',
    description:
      'Architecting unconventional web platforms and standout CS capstone artifacts with zero templates.',
    url: 'https://thenightbuild.dev',
    siteName: 'Nightbuild Studio',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('nightbuild-theme');
                  if (stored === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[var(--green)] selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingAgent />
      </body>
    </html>
  );
}
