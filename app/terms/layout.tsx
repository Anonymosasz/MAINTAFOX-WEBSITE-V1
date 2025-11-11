import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Maintafox CMMS',
  description:
    'Maintafox CMMS terms of service: software license agreement, usage terms, support policies, and legal terms for our computerized maintenance management system.',
  openGraph: {
    title: 'Terms of Service — Maintafox CMMS',
    description:
      'Review Maintafox software license agreement and terms of service for our CMMS platform.',
    type: 'website',
    url: 'https://www.maintafox.systems/terms',
  },
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
