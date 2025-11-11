import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Maintafox — Get Support & Information',
  description:
    'Contact Maintafox for CMMS inquiries, technical support, or partnership opportunities. Call +213 540 537 886 or email contact@maintafox.systems. Serving industrial clients across Algeria.',
  keywords: [
    'contact Maintafox',
    'CMMS support',
    'maintenance software support',
    'Algeria contact',
    'CMMS Algeria contact',
  ],
  openGraph: {
    title: 'Contact Maintafox — Get Support & Information',
    description:
      'Reach out for CMMS inquiries, technical support, or partnerships. Serving Algeria with local expertise.',
    type: 'website',
    url: 'https://www.maintafox.systems/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Maintafox — Get Support & Information',
    description:
      'Reach out for CMMS inquiries, technical support, or partnerships. Serving Algeria with local expertise.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
