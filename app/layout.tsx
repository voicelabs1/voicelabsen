import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from './components/CookieConsent';

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: "Automatiseer je Bedrijf met AI-receptionisten | 24/7 Klantenservice",
  description: "Verbeter je klantenservice met AI-receptionisten. 24/7 professionele ondersteuning, automatische afspraken en naadloze integratie met je bestaande systemen.",
  keywords: "AI telefonist, AI receptionist,klantenservice automatisering, virtuele receptionist, AI klantenservice, voice AI, automatische telefoonbeantwoording, bedrijfsautomatisering",
  authors: [{ name: "Voicelabs" }],
  creator: "Voicelabs",
  publisher: "Voicelabs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://voicelabs.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Automatiseer je Bedrijf met AI-Receptionisten | 24/7 Klantenservice",
    description: "Verbeter je klantenservice met AI-receptionisten. 24/7 professionele ondersteuning, automatische afspraken en naadloze integratie met je bestaande systemen.",
    url: 'https://voicelabs.nl',
    siteName: 'Voicelabs',
    images: [
      {
        url: '/plaatjes/aireceptionist.webp',
        width: 1200,
        height: 630,
        alt: 'Voicelabs AI Telefonisten',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: "Voicelabs | AI-Gestuurde Telefonisten voor Bedrijven",
    description: "Verbeter je klantenservice met AI-telefonisten. 24/7 professionele ondersteuning.",
    images: ['/plaatjes/aireceptionist.webp'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  }
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
        <meta name="theme-color" content="#0063f2" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
