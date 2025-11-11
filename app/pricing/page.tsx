import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CMMS Pricing & Plans — Maintafox',
  description:
    'Transparent Maintafox CMMS pricing for Algerian businesses. Choose from flexible plans: Starter, Professional, or Enterprise. On-premise or cloud deployment with local support included.',
  keywords: [
    'CMMS pricing',
    'maintenance software cost',
    'CMMS Algeria pricing',
    'Maintafox plans',
    'CMMS subscription',
    'enterprise CMMS pricing',
  ],
  openGraph: {
    title: 'CMMS Pricing & Plans — Maintafox',
    description:
      'Transparent pricing for Maintafox CMMS. Flexible plans with local support for Algerian industries.',
    type: 'website',
    url: 'https://www.maintafox.systems/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMMS Pricing & Plans — Maintafox',
    description:
      'Transparent pricing for Maintafox CMMS. Flexible plans with local support for Algerian industries.',
  },
  alternates: {
    canonical: '/pricing',
  },
};

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Contact Us',
    description: 'Perfect for small facilities getting started with CMMS',
    features: [
      'Up to 100 assets',
      'Work order management',
      'Preventive maintenance scheduling',
      'Mobile app access',
      'Basic analytics dashboard',
      'Email support',
      'On-premise or cloud',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: 'Contact Us',
    description: 'For growing organizations with complex maintenance needs',
    features: [
      'Unlimited assets',
      'Advanced work order automation',
      'Predictive maintenance AI',
      'Inventory & procurement',
      'Custom dashboards & reports',
      'Priority phone & email support',
      'Integration connectors',
      'Multi-site management',
      'Role-based access control',
    ],
    cta: 'Request Demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large industrial operations',
    features: [
      'Everything in Professional',
      'Dedicated implementation team',
      '24/7 bilingual support hotline',
      'Custom integrations (ERP, IoT)',
      'Advanced security & compliance',
      'On-site training & workshops',
      'Dedicated account manager',
      'SLA guarantees',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-brand/5 to-slate-100">
        <div className="container-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the right plan for your maintenance operations. All plans include bilingual
            support and local implementation assistance in Algeria.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 ${
                  plan.popular ? 'ring-2 ring-accent scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-orange-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-brand">{plan.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo"
                  className={`block text-center rounded-xl px-6 py-3 font-semibold transition-all ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                      : 'bg-slate-100 text-brand hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-12 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-brand mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">
                Why don&apos;t you list specific prices?
              </h3>
              <p className="text-slate-600">
                Every organization has unique maintenance needs, facility size, and integration
                requirements. We provide custom quotes to ensure you only pay for what you need.
                Contact us for a transparent, no-obligation quote.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">
                Can I deploy Maintafox on-premise?
              </h3>
              <p className="text-slate-600">
                Yes! All plans support both on-premise deployment (within your Algerian facility)
                and secure cloud hosting. On-premise deployment ensures data residency and complete
                control over your maintenance data.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">What support is included?</h3>
              <p className="text-slate-600">
                All plans include bilingual (Arabic/French) support during business hours.
                Professional and Enterprise plans receive priority support, and Enterprise clients
                get 24/7 hotline access with guaranteed response times.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">
                How long does implementation take?
              </h3>
              <p className="text-slate-600">
                Starter plans can be live in 2-4 weeks. Professional deployments typically take 6-8
                weeks. Enterprise implementations range from 3-6 months depending on customization
                and integration requirements. We provide dedicated project management throughout.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">Do you offer training?</h3>
              <p className="text-slate-600">
                Yes! All plans include initial user training. Professional plans include advanced
                training sessions, and Enterprise plans include on-site workshops and train-the-
                trainer programs to build internal expertise.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-brand text-lg mb-2">Can I switch plans later?</h3>
              <p className="text-slate-600">
                Absolutely. As your organization grows, you can upgrade to access more features,
                users, and support levels. We make transitions seamless with data migration
                assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-brand via-brand-dark to-slate-900 text-white">
        <div className="container-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Maintenance?</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see Maintafox in action and get a custom quote for your
            facility.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/demo" className="btn-primary bg-accent hover:bg-orange-600">
              Request a Demo
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white/10">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
