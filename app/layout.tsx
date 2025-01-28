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
    default: 'Ondersteun je Bedrijf met AI-Telefonisten | 24/7 Klantenservice',
  },
  description: 'Voicelabs biedt virtuele asssistenten die je telefoongesprekken beantwoordt, routeert en afhandelt. Ontdek hoe onze AI-receptionist je klantenservice kan verbeteren.',
  keywords: 'AI telefonist, AI receptionist, AI receptioniste, klantenservice automatisering, virtuele receptionist, telefonie automatisering',
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
    locale: 'nl_NL',
    url: 'https://voicelabs.nl',
    siteName: 'Voicelabs',
    title: 'Ondersteun je Bedrijf met AI-Telefonisten | 24/7 Klantenservice',
    description: 'Voicelabs biedt een AI-telefonist die uw telefoongesprekken beantwoordt, routeert en afhandelt.',
    images: [
      {
        url: '/plaatjes/optimalisatie.webp',
        width: 1200,
        height: 630,
        alt: 'Voicelabs - AI Telefonist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ondersteun je Bedrijf met AI-Telefonisten | 24/7 Klantenservice',
    description: 'Voicelabs biedt een AI-telefonist die uw telefoongesprekken beantwoordt, routeert en afhandelt.',
    images: ['/plaatjes/optimalisatie.webp'],
  },
  alternates: {
    canonical: 'https://voicelabs.nl',
  },
  metadataBase: new URL('https://voicelabs.nl'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Voicelabs Blog RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#0063f2" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
