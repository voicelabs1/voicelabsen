import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from './components/CookieConsent';

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-dm-sans',
  preload: true,
  adjustFontFallback: true
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
  preload: true,
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: {
    template: '%s | Voicelabs',
    default: 'Support Your Business with AI Receptionists | 24/7 Customer Service',
  },
  description: 'Voicelabs offers virtual assistants that answer, route, and handle your phone calls. Discover how our AI receptionist can improve your customer service.',
  keywords: 'AI receptionist, AI phone assistant, customer service automation, virtual receptionist, telephony automation',
  authors: [{ name: 'Voicelabs' }],
  publisher: 'Voicelabs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voicelabs.agency',
    siteName: 'Voicelabs',
    title: 'Support Your Business with AI Receptionists | 24/7 Customer Service',
    description: 'Voicelabs offers an AI receptionist that answers, routes, and handles your phone calls.',
    images: [
      {
        url: '/images/optimization.webp',
        width: 1200,
        height: 630,
        alt: 'Voicelabs - AI Receptionist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Your Business with AI Receptionists | 24/7 Customer Service',
    description: 'Voicelabs offers an AI receptionist that answers, routes, and handles your phone calls.',
    images: ['/images/optimization.webp'],
  },
  alternates: {
    canonical: 'https://voicelabs.agency',
  },
  metadataBase: new URL('https://voicelabs.agency'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Voicelabs Blog RSS Feed" href="/feed.xml" />
        <link rel="alternate" hrefLang="en" href="https://voicelabs.agency" />
        <link rel="alternate" hrefLang="nl" href="https://voicelabs.nl" />
        <link rel="alternate" hrefLang="x-default" href="https://voicelabs.agency" />
        <meta name="theme-color" content="#0063f2" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
