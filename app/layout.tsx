import type { Metadata } from 'next';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AuthProvider from '@/components/AuthProvider';
import { JsonLd, organizationSchema } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maintafox.systems'),
  title: {
    default: 'Maintafox — CMMS for Proactive Maintenance',
    template: '%s | Maintafox',
  },
  description:
    "Maintafox is Algeria's locally supported CMMS. Centralize assets, work orders, PMs, inventory, and analytics to shift from reactive fixes to proactive maintenance.",
  keywords: [
    'CMMS',
    'maintenance management software',
    'CMMS Algeria',
    'computerized maintenance management',
    'preventive maintenance',
    'work order management',
    'asset management',
    'maintenance software',
  ],
  openGraph: {
    title: 'Maintafox — CMMS for Proactive Maintenance',
    description:
      'Centralize assets, work orders, PMs, inventory, and analytics. Locally installed and supported in Algeria.',
    url: 'https://www.maintafox.systems',
    siteName: 'Maintafox',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Maintafox CMMS Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maintafox — CMMS for Proactive Maintenance',
    description:
      'Centralize assets, work orders, PMs, inventory, and analytics. Locally installed and supported in Algeria.',
    images: ['/dashboard.png'],
  },
  alternates: { canonical: '/' },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
