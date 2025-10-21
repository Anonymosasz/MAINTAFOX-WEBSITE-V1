export default function ContactPage() {
  return (
    <>
      <main>
        <section className="section bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="container-12">
            <h1 className="text-4xl font-bold tracking-tight text-brand">
              Let&apos;s talk maintenance excellence
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              Whether you need a guided CMMS demo, implementation advice, or ongoing support, the
              Maintafox team is ready to help. Reach out using the channels below and we&apos;ll
              respond within one business day.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-brand">General inquiries</h2>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    <a
                      href="mailto:contact@maintafox.systems"
                      className="text-brand underline-offset-4 hover:underline"
                    >
                      contact@maintafox.systems
                    </a>
                  </span>
                  <br />
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    <a
                      href="tel:+213540537886"
                      className="text-brand underline-offset-4 hover:underline"
                    >
                      +213 (540) 537-886
                    </a>
                  </span>
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand">Sales &amp; demos</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Tell us about your maintenance goals, facility size, and existing systems. Our
                  solution consultants will tailor a CMMS walkthrough with relevant KPIs and
                  reports.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand">Support</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Already a Maintafox customer? Email{' '}
                  <a
                    href="mailto:support@maintafox.systems"
                    className="text-brand underline-offset-4 hover:underline"
                  >
                    support@maintafox.systems
                  </a>{' '}
                  or call our 24/7 hotline for critical issues. Our success team provides bilingual
                  assistance and remote diagnostics.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-brand">Office</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Technoparc Sidi Abdellah, Dar El Beida, Algiers, Algeria
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Hours: Sunday – Thursday, 9:00–18:00
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-brand">Share your project</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Include as much detail as possible about your maintenance environment: number of
                  assets, industries served, integration needs, and KPIs you want to improve.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />{' '}
                    <span>Are you managing multiple plants or facilities?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />{' '}
                    <span>Do you require on-premise, cloud, or hybrid deployment?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />{' '}
                    <span>Which ERPs, SCADA, or IoT solutions should we connect?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />{' '}
                    <span>What KPIs define success for your maintenance strategy?</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-900/90 p-8 text-white shadow-sm">
                <h2 className="text-lg font-semibold">Stay connected</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/maintafox-systems/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      LinkedIn: Maintafox Systems
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/share/1CGCAFfz8y/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      Facebook: Maintafox Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-brand">Meeting in person?</h2>
            <p className="mt-2 text-sm text-slate-600">
              We frequently host workshops and discovery sessions on-site with maintenance teams
              across Algeria. Let us know your preferred dates, and we&apos;ll arrange a visit with
              our consultants and product specialists.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
