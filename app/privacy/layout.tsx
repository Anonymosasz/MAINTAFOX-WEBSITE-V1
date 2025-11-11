import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Maintafox CMMS',
  description:
    'Maintafox privacy policy: learn how we collect, use, and protect your data. Our CMMS platform is compliant with data protection regulations and can be hosted on-premise in Algeria.',
  openGraph: {
    title: 'Privacy Policy — Maintafox CMMS',
    description:
      'Learn how Maintafox protects your data and ensures compliance with privacy regulations.',
    type: 'website',
    url: 'https://www.maintafox.systems/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
