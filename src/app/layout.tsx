import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AppShell } from '@/components/layout/app-shell';
import { SkipToContent } from '@/components/layout/skip-to-content';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
});

const BASE_URL = 'https://eurythmia-interactive.github.io/-CyberPunk-frontend-dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Cyberpunk Portfolio | Frontend Developer',
    template: '%s | Cyberpunk Portfolio',
  },
  description:
    'A living manifesto of frontend development skills. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. showcasing modern web development expertise.',
  keywords: [
    'frontend developer',
    'portfolio',
    'Next.js',
    'TypeScript',
    'React',
    'Tailwind CSS',
    'Framer Motion',
    'cyberpunk',
    'web development',
  ],
  authors: [{ name: 'Frontend Developer' }],
  creator: 'Frontend Developer',
  publisher: 'Cyberpunk Portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyberpunk Portfolio | Frontend Developer',
    description:
      'A living manifesto of frontend development skills. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.',
    site: '@cyberpunkdev',
    creator: '@cyberpunkdev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Cyberpunk Portfolio',
    title: 'Cyberpunk Portfolio | Frontend Developer',
    description:
      'A living manifesto of frontend development skills. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cyberpunk Portfolio - Frontend Developer',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <SkipToContent />
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
