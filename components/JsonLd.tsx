import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Organization Schema for site-wide use
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maintafox',
  description:
    "Algeria's locally supported CMMS for proactive maintenance management, asset tracking, and work order automation.",
  url: 'https://www.maintafox.systems',
  logo: 'https://www.maintafox.systems/logo.svg',
  foundingDate: '2021',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
      addressRegion: 'Algeria',
    },
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+213-540-537-886',
    contactType: 'sales',
    email: 'contact@maintafox.systems',
    areaServed: 'DZ',
    availableLanguage: ['en', 'fr', 'ar'],
  },
  sameAs: [
    'https://www.facebook.com/share/1CGCAFfz8y/',
    'https://www.linkedin.com/company/maintafox-systems/',
  ],
};

// Product/Service Schema for Features page
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Maintafox CMMS',
  description:
    'Computerized Maintenance Management System for asset management, work orders, preventive maintenance, inventory control, and analytics.',
  brand: {
    '@type': 'Brand',
    name: 'Maintafox',
  },
  offers: {
    '@type': 'AggregateOffer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'DZD',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: 'Contact for quote',
    },
  },
  category: 'Software',
  applicationCategory: 'BusinessApplication',
};

// Contact Page Schema
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Maintafox',
  description:
    'Get in touch with Maintafox for CMMS inquiries, support, or partnership opportunities.',
  url: 'https://www.maintafox.systems/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Maintafox',
    telephone: '+213-540-537-886',
    email: 'contact@maintafox.systems',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
  },
};

// About Page Schema
export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Maintafox',
  description:
    'Learn about Maintafox, an Algerian CMMS startup recognized by NABTAKAR, delivering maintenance management solutions.',
  url: 'https://www.maintafox.systems/about',
  mainEntity: organizationSchema,
};

// FAQ Schema generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Software Application Schema
export const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Maintafox CMMS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Comprehensive CMMS platform for maintenance management, asset tracking, preventive maintenance, and analytics.',
  offers: {
    '@type': 'Offer',
    price: 'Contact for pricing',
    priceCurrency: 'DZD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '25',
  },
};

// Breadcrumb Schema generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
