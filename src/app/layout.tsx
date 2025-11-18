import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Icecast Audio Player',
    default: 'Icecast Audio Player - Live Streaming',
  },
  description:
    'Web-based audio player for Icecast streams. Listen to live radio with metadata display, playback controls, and cross-browser compatibility.',
  keywords: [
    'icecast',
    'audio player',
    'live streaming',
    'radio player',
    'web audio',
    'mp3 streaming',
  ],
  authors: [{ name: 'Audio Player' }],
  creator: 'Audio Player',
  publisher: 'Audio Player',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Icecast Audio Player',
    title: 'Icecast Audio Player - Live Streaming',
    description:
      'Web-based audio player for Icecast streams. Listen to live radio with metadata display and playback controls.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Icecast Audio Player',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Icecast Audio Player - Live Streaming',
    description:
      'Web-based audio player for Icecast streams. Listen to live radio with metadata display and playback controls.',
    images: ['/og-image.jpg'],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {children}
        </div>
      </body>
    </html>
  );
}
