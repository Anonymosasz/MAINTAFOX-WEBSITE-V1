'use client';
import { useState } from 'react';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(5),
});

export default function DemoPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus('loading');
    setError(null);
    const data = Object.fromEntries(formData.entries());
    const parsed = FormSchema.safeParse(data);
    if (!parsed.success) {
      setStatus('error');
      setError('Please fill all fields correctly.');
      return;
    }
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
    }
  }

  return (
    <>
      <main>
        <section className="section bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container-12 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand">
              Request a Maintafox CMMS demo
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Share your maintenance objectives and we&apos;ll tailor a walkthrough of the Maintafox
              platform covering asset hierarchies, work order intelligence, preventive maintenance
              plans, inventory optimization, and analytics dashboards relevant to your operations.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>• Demo duration: 45 minutes with Q&amp;A.</li>
              <li>
                • Recommended attendees: maintenance, production, reliability, and IT stakeholders.
              </li>
              <li>• Sessions available in Arabic, French, or English.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold text-brand">
                Tell us about your maintenance environment
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Complete the form below and our team will confirm your personalized session within
                one business day. Fields marked with * are required.
              </p>
              <form action={onSubmit} className="mt-6 grid gap-4">
                <input
                  name="name"
                  placeholder="Full name *"
                  className="border rounded-md p-3"
                  required
                />
                <input
                  name="company"
                  placeholder="Company *"
                  className="border rounded-md p-3"
                  required
                />
                <input
                  name="email"
                  placeholder="Work email *"
                  type="email"
                  className="border rounded-md p-3"
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone *"
                  className="border rounded-md p-3"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Describe your assets, current tools, and KPIs *"
                  className="border rounded-md p-3"
                  rows={4}
                  required
                />
                <button disabled={status === 'loading'} className="btn-primary" type="submit">
                  {status === 'loading' ? 'Sending...' : 'Send Request'}
                </button>
                {status === 'success' && (
                  <p className="text-green-600">Thanks! We&apos;ll be in touch shortly.</p>
                )}
                {status === 'error' && error && <p className="text-red-600">{error}</p>}
              </form>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-brand">What to expect</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    Discovery conversation on your maintenance workflows, compliance requirements,
                    and integration landscape.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    Live tour of asset management, work order intelligence, preventive scheduling,
                    and analytics dashboards.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    Discussion of deployment options (cloud, on-premise, hybrid) and security best
                    practices.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    Recommended next steps, from pilot projects to enterprise rollouts with change
                    management support.
                  </span>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-4 text-sm text-slate-600">
                Need immediate assistance? Email
                <a
                  href="mailto:contact@maintafox.systems"
                  className="ml-1 text-brand underline-offset-4 hover:underline"
                >
                  contact@maintafox.systems
                </a>{' '}
                or call
                <a
                  href="tel:+213540537886"
                  className="ml-1 text-brand underline-offset-4 hover:underline"
                >
                  +213 (540) 537-886
                </a>
                .
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
