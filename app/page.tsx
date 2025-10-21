import Link from 'next/link';
import { MotionSection } from '@/components/motion/MotionSection';
import { cn } from '@/lib/utils';
import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  BarChart3,
  Boxes,
  CheckCheck,
  ClipboardCheck,
  Layers,
  ShieldCheck,
  Wrench,
  Smartphone,
  Sparkles,
  Gauge,
} from 'lucide-react';

const painpoints = [
  {
    title: 'Unexpected Downtime',
    desc: 'Production stops, scrap rates spike, and emergency overtime erodes margins when maintenance is purely reactive.',
    Icon: AlertTriangle,
  },
  {
    title: 'Complex Scheduling',
    desc: 'Manual work order coordination creates silos between maintenance, production, and stores teams.',
    Icon: CalendarCheck,
  },
  {
    title: 'Limited Visibility',
    desc: 'Without reliable CMMS analytics, leaders cannot prove ROI or forecast maintenance budgets with confidence.',
    Icon: BarChart3,
  },
  {
    title: 'Inefficient Inventory',
    desc: 'Unplanned stockouts and overstocked critical spares tie up capital and increase technician frustration.',
    Icon: Boxes,
  },
];

const featureHighlights = [
  {
    title: 'Asset Performance Management',
    Icon: Gauge,
    bullets: [
      'Complete digital history and condition monitoring for every equipment asset.',
      'Attach SOPs, drawings, certifications, and IoT sensor data in one secure repository.',
      'Automated alerts for warranty milestones, lifecycle events, and compliance inspections.',
    ],
  },
  {
    title: 'Work Order Intelligence',
    Icon: ClipboardCheck,
    bullets: [
      'Drag-and-drop planning board with technician skills, shifts, and availability.',
      'Configurable approval workflows, SLA timers, and escalation rules.',
      'Rich mobile forms with photos, meter readings, checklists, and digital signatures.',
    ],
  },
  {
    title: 'Preventive & Predictive Maintenance',
    Icon: CalendarCheck,
    bullets: [
      'Time-, condition-, and usage-based triggers aligned with OEM recommendations.',
      'Calendar, meter, and event schedules to ensure PM completion compliance.',
      'AI-assisted forecasting to extend asset lifecycle and reduce MTTR.',
    ],
  },
  {
    title: 'Spare Parts & Procurement',
    Icon: Boxes,
    bullets: [
      'Multi-site inventory visibility with minimum/maximum thresholds and reorder automation.',
      'Supplier performance scorecards and lead-time tracking to support procurement teams.',
      'Barcode scanning, lot tracking, and cost roll-ups for accurate maintenance budgeting.',
    ],
  },
  {
    title: 'Analytics & Dashboards',
    Icon: BarChart3,
    bullets: [
      'MTTR, MTBF, OEE, backlog, and compliance dashboards ready out of the box.',
      'Role-based scorecards for maintenance managers, reliability engineers, and executives.',
      'Export to Power BI or Excel for deeper reporting and stakeholder presentations.',
    ],
  },
  {
    title: 'Security & Deployment',
    Icon: ShieldCheck,
    bullets: [
      'Available on-premise or cloud with data residency in Algeria.',
      'Role-based access control, audit trail, and ISO 27001-aligned security practices.',
      'Dedicated local implementation, training, and 24/7 bilingual support hotline.',
    ],
  },
];

const kpiMetrics = [
  {
    label: 'Mean Time To Repair (MTTR)',
    value: '1.8 hours',
    detail:
      'Technicians resolve breakdowns faster with guided workflows and remote collaboration tools.',
  },
  {
    label: 'Mean Time Between Failures (MTBF)',
    value: '120 days',
    detail: 'Real-time condition monitoring and PM compliance extend asset health.',
  },
  {
    label: 'Asset Uptime',
    value: '99.2%',
    detail:
      'Planned maintenance windows reduce unplanned downtime and improve production throughput.',
  },
  {
    label: 'Preventive Maintenance Compliance',
    value: '94%',
    detail: 'Automated scheduling, notifications, and mobile CMMS checklists boost compliance.',
  },
];

const kpiProgress = [86, 74, 96, 94];

const testimonialQuotes = [
  {
    quote:
      'Maintafox gave us instant visibility into backlog, technician workload, and spare part consumption. Downtime is down 32% since go-live.',
    name: 'Maintenance Director',
    company: 'Food & Beverage Plant – Oran',
  },
  {
    quote:
      'The mobile CMMS app keeps our field teams synchronized and compliant with safety procedures even in remote sites.',
    name: 'Reliability Supervisor',
    company: 'Oil & Gas Operator – Hassi Messaoud',
  },
  {
    quote:
      'We finally have traceability across assets, work orders, and costs to justify capital investments to leadership.',
    name: 'Operations Manager',
    company: 'Pharmaceutical Manufacturer – Algiers',
  },
];

const industriesServed = [
  'Manufacturing & Industrial Plants',
  'Oil & Gas, Energy, and Utilities',
  'Healthcare Facilities & Biomedical Teams',
  'Transportation, Fleet, and Logistics',
  'Hospitality, Real Estate, and Facility Management',
  'Public Sector, Municipalities, and Smart Cities',
];

const faqs = [
  {
    question: 'How fast can our maintenance team be live on Maintafox?',
    answer:
      'Most Algerian plants go live in 4-6 weeks. We import your asset register, configure preventive maintenance plans, train users, and validate KPIs before handover.',
  },
  {
    question: 'Does Maintafox integrate with ERP or SCADA systems?',
    answer:
      'Yes. Our API and integration toolkit connect with SAP, Odoo, Dynamics, and leading SCADA or historian platforms to synchronize assets, work orders, and inventory levels.',
  },
  {
    question: 'Is the solution available on-premise?',
    answer:
      'We support both secure cloud hosting in Algeria and on-premise deployments to meet IT and compliance requirements, including offline-capable technician apps.',
  },
  {
    question: 'Can Maintafox help with regulatory compliance?',
    answer:
      'Audit trails, digital logbooks, calibration schedules, and document control help teams meet ISO 55000, GMP, API, and national safety regulations.',
  },
];

const pricingPlans = [
  {
    name: 'Launch',
    price: '€390 / month',
    desc: 'Ideal for small maintenance teams digitalizing their first CMMS.',
    items: [
      'Up to 15 users with mobile access',
      'Asset register + PM scheduling + work order automation',
      'Local onboarding workshop and bilingual support',
    ],
  },
  {
    name: 'Scale',
    price: '€690 / month',
    desc: 'Best for multi-site operations seeking centralized maintenance governance.',
    items: [
      'Unlimited sites, teams, and advanced analytics dashboards',
      'Inventory optimization, procurement workflows, and vendor portal',
      'API integrations, SSO, and quarterly health checks',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Tailored for highly regulated industries requiring hybrid or on-premise deployment.',
    items: [
      'Dedicated success manager and 24/7 support SLA',
      'Private cloud or on-premise installation with hardening services',
      'Advanced cybersecurity, multi-language rollout, and change management program',
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="section relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand to-slate-900 opacity-10"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-[-140px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,122,25,0.28),_transparent_65%)] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute right-[-160px] bottom-[-220px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(11,30,53,0.25),_transparent_70%)] blur-3xl"
            aria-hidden="true"
          />
          <div className="container-12 relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent ring-1 ring-accent/20">
                <Activity className="h-3.5 w-3.5" /> Locally engineered CMMS for Algeria
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand sm:text-5xl">
                A Computerized Maintenance Management System engineered for uptime, compliance, and
                growth.
              </h1>
              <p className="mt-5 text-lg text-slate-700">
                Maintafox modernizes maintenance operations with a unified CMMS that centralizes
                assets, optimizes preventive maintenance, and delivers actionable analytics. Empower
                technicians, planners, and executives with live data to reduce downtime, extend
                asset lifecycles, and control lifecycle costs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/demo">
                  Request a Live Demo
                </Link>
                <Link className="btn-outline" href="/features">
                  Explore the Platform
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 font-medium text-slate-600 transition-colors hover:text-brand"
                  href="/#faq"
                >
                  Read FAQs
                </Link>
              </div>
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: 'Average downtime reduction',
                    value: '-32%',
                  },
                  {
                    label: 'Preventive maintenance compliance',
                    value: '94%',
                  },
                  {
                    label: 'Implementation timeline',
                    value: '4-6 weeks',
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-white/80 px-5 py-4 shadow-sm transition hover:border-accent/40 hover:shadow-lg"
                  >
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      {metric.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold text-brand">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-slate-500">
                Trusted by manufacturing, energy, healthcare, and public sector organizations across
                Algeria.
              </p>
              <div className="pointer-events-none absolute -right-10 bottom-4 hidden w-48 rotate-6 rounded-2xl border border-accent/20 bg-white/90 px-5 py-4 text-xs shadow-xl lg:block">
                <div className="flex items-center gap-2 text-accent">
                  <Wrench className="h-4 w-4" />
                  <span className="font-semibold">Playbook snapshot</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-600">
                  145+ assets onboarded in the last 30 days across manufacturing clients.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-slate-300/60 via-white/80 to-slate-200/60 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur">
                <div className="border-b border-slate-200 bg-gradient-to-r from-brand/5 to-accent/5 px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    Real-time Maintenance Command Center
                  </div>
                </div>
                <div className="grid gap-6 px-6 py-6 text-sm text-slate-600">
                  <div className="grid gap-2">
                    <strong className="text-brand">Today&apos;s KPIs</strong>
                    <ul className="space-y-1 text-xs text-slate-500">
                      <li className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-4 rounded-full bg-emerald-500"
                          aria-hidden="true"
                        />{' '}
                        MTTR vs target: 1.8h · Trending better
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-4 rounded-full bg-brand" aria-hidden="true" /> Work
                        orders completed: 27 · SLA 98%
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-4 rounded-full bg-amber-500" aria-hidden="true" />{' '}
                        Spare parts reserved: 12 · Stock health 92%
                      </li>
                    </ul>
                  </div>
                  <div className="grid gap-2">
                    <strong className="text-brand">Critical assets</strong>
                    <div className="grid gap-3 text-xs">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 shadow-sm">
                        <span>Compressor Line A</span>
                        <span className="font-semibold text-emerald-600">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 shadow-sm">
                        <span>Packaging Robot 3</span>
                        <span className="font-semibold text-amber-600">PM due tomorrow</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 shadow-sm">
                        <span>HVAC AHU-2</span>
                        <span className="font-semibold text-rose-600">Work order escalated</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <strong className="text-brand">Team updates</strong>
                    <p className="rounded-xl bg-brand/5 px-4 py-3 text-xs text-brand">
                      Morning shift logged 17 digital checklists and 5 safety inspections via the
                      Maintafox mobile app.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <strong className="text-brand">On-the-go actions</strong>
                    <div className="grid gap-2 text-xs">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-500">
                        <Smartphone className="h-3.5 w-3.5" /> Technician push alerts synced
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-500">
                        <ClipboardCheck className="h-3.5 w-3.5" /> 8 inspections approved today
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MotionSection className="border-t border-b border-slate-200 bg-white/70 py-6">
          <div className="container-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span>Trusted by Algerian innovators</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span>Industrial Manufacturing</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span>Oil &amp; Gas Operations</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span>Healthcare Facilities</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span>Smart Cities</span>
          </div>
        </MotionSection>

        {/* Pain points */}
        <MotionSection id="benefits" className="section section-muted">
          <div className="container-12 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-semibold text-brand">
                  Is reactive maintenance putting your operations at risk?
                </h2>
                <p className="mt-3 text-slate-600">
                  Maintafox replaces manual spreadsheets and fragmented tools with a centralized
                  computerized maintenance management system. We help teams eliminate firefighting,
                  standardize processes, and focus on reliability engineering.
                </p>
              </div>
              <div className="rounded-3xl border border-brand/10 bg-white/90 p-8 shadow-xl backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
                  Where teams struggle
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Maintenance leaders told us the real blockers aren&apos;t lack of
                  effort—they&apos;re lack of visibility, coordination, and technology that fits the
                  factory floor. Maintafox answers each blocker with automation and insight.
                </p>
                <div className="mt-6 grid gap-4 text-xs text-slate-500 sm:grid-cols-2">
                  <div className="rounded-2xl bg-brand/5 px-4 py-3 font-semibold text-brand">
                    68% cite data scattered across spreadsheets
                  </div>
                  <div className="rounded-2xl bg-accent/10 px-4 py-3 font-semibold text-accent">
                    3× faster audits once everything is traceable
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-600">
                    Technicians adopt Maintafox mobile in under a week
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 font-semibold text-brand shadow-sm">
                    Supervisors reclaim 8+ hours monthly from reporting
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent/40 via-brand/30 to-transparent"
                aria-hidden="true"
              />
              <ul className="space-y-10">
                {painpoints.map(({ title, desc, Icon }, index) => (
                  <li key={title} className="relative pl-16">
                    <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-brand text-base font-semibold text-white shadow-lg">
                      {index + 1}
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                          <p className="mt-2 text-sm text-slate-600">{desc}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionSection>

        {/* Feature pillars */}
        <MotionSection id="features" className="section">
          <div className="container-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-brand">
                Powerful CMMS features, delivered with local expertise
              </h2>
              <p className="mt-3 text-slate-600">
                Maintafox combines asset management, work execution, inventory, and analytics in one
                intuitive platform. Each module is localized for Algerian regulatory requirements,
                currencies, and bilingual teams.
              </p>
            </div>
            <div className="mt-12 space-y-10">
              {featureHighlights.map(({ title, bullets, Icon }, index) => (
                <article
                  key={title}
                  className={cn(
                    'relative overflow-hidden rounded-[32px] border border-brand/10 bg-white/80 shadow-lg backdrop-blur transition duration-300 hover:border-accent/40 hover:shadow-xl lg:grid lg:grid-cols-2',
                    index % 2 === 1 && 'lg:[&>div:first-child]:order-last'
                  )}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-brand/5 via-white/40 to-accent/10 opacity-80"
                    aria-hidden="true"
                  />
                  <div className="relative flex flex-col gap-6 p-10">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-2xl font-semibold text-brand">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      Maintafox pairs localized workflows with automation so your team can hit
                      reliability targets without extra headcount.
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 font-semibold text-brand shadow-sm">
                        <Activity className="h-3.5 w-3.5" /> Built for Algerian plants
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                        <Layers className="h-3.5 w-3.5" /> Module ready
                      </span>
                    </div>
                  </div>
                  <div className="relative border-t border-slate-200 bg-white/95 p-10 lg:border-t-0 lg:border-l lg:border-slate-200">
                    <span
                      className="absolute left-0 top-6 hidden h-12 w-1 rounded-full bg-gradient-to-b from-accent/70 via-brand/60 to-transparent lg:block"
                      aria-hidden="true"
                    />
                    <ul className="space-y-4 text-sm text-slate-600">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-2xl bg-slate-50/60 px-4 py-3 shadow-sm"
                        >
                          <CheckCheck className="mt-1 h-4 w-4 flex-none text-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* KPI highlights */}
        <MotionSection id="kpis" className="section section-muted">
          <div className="container-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden rounded-[36px] border border-brand/10 bg-white/80 p-10 shadow-xl backdrop-blur">
              <div
                className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand/20 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div
                className="absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-brand">Maintenance KPIs dialed in</h3>
                <p className="mt-3 max-w-xl text-sm text-slate-600">
                  Maintafox captures every meter reading, work order, and inventory movement to keep
                  your reliability scorecard current. Drill into the data without exporting
                  spreadsheets.
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {kpiMetrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className={cn(
                        'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl',
                        index % 2 === 1 && 'sm:-translate-y-6'
                      )}
                    >
                      <span
                        className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent/10 opacity-0 transition group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        KPI {index + 1}
                      </div>
                      <div className="mt-3 text-3xl font-bold text-brand">{metric.value}</div>
                      <div className="mt-2 text-sm font-semibold text-slate-500">
                        {metric.label}
                      </div>
                      <p className="mt-3 text-xs text-slate-500">{metric.detail}</p>
                      <div className="mt-4 h-1.5 rounded-full bg-slate-200">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-brand to-accent"
                          style={{ width: `${kpiProgress[index]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[36px] border border-brand/10 bg-slate-900/95 p-10 text-slate-100 shadow-xl">
              <div
                className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-brand/30 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative space-y-6">
                <h3 className="text-2xl font-semibold text-white">Reliability momentum tracker</h3>
                <p className="text-sm text-slate-300">
                  Visualize progress toward world-class reliability benchmarks. Maintafox benchmarks
                  your facility against peers and flags where to focus next.
                </p>
                <ol className="space-y-5 text-sm">
                  {kpiMetrics.map((metric, index) => (
                    <li key={metric.label} className="flex items-start gap-4">
                      <span className="mt-1 grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-white/10 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-accent">{metric.value}</div>
                        <p className="text-xs text-slate-300">{metric.label}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-xs text-slate-200">
                  <p>
                    Reliability index updated in real time. Combine CMMS data with SCADA, ERP, and
                    IoT feeds to forecast failures before they disrupt production.
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
                    Average ROI achieved in 9 months
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* How it works timeline */}
        <MotionSection id="how-it-works" className="section">
          <div className="container-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-brand">
                From kickoff to continuous improvement
              </h2>
              <p className="mt-3 text-slate-600">
                Our proven implementation playbook delivers value quickly while equipping your
                maintenance team for long-term success.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-4">
              {[
                {
                  title: 'Discover',
                  body: 'Audit existing workflows, assets, compliance requirements, and available data sources. Build the rollout roadmap with your stakeholders.',
                },
                {
                  title: 'Configure',
                  body: 'Import asset registers, set preventive maintenance plans, create work order templates, and configure notifications in Arabic, French, or English.',
                },
                {
                  title: 'Adopt',
                  body: 'Deliver classroom and on-the-floor training. Launch mobile CMMS apps, digital checklists, and technician certifications.',
                },
                {
                  title: 'Optimize',
                  body: 'Review KPIs, fine-tune dashboards, connect to ERP/SCADA systems, and unlock predictive maintenance insights.',
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-brand">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Testimonials */}
        <MotionSection id="testimonials" className="section section-muted">
          <div className="container-12 grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand shadow-sm">
                <Sparkles className="h-4 w-4" /> Proven in the field
              </span>
              <h2 className="text-3xl font-semibold text-brand">
                Customer stories from across Algeria
              </h2>
              <p className="text-slate-600">
                Maintafox partners closely with maintenance leaders to deliver tangible ROI,
                stronger reliability, and safer operations. Hear how maintenance directors,
                reliability engineers, and supervisors transformed their workflows with our CMMS.
              </p>
              <div className="rounded-3xl border border-brand/10 bg-white/90 p-6 text-sm text-slate-600 shadow-xl backdrop-blur">
                <p>
                  “We achieved audit readiness in record time. Maintafox reduced manual reporting,
                  centralized work orders, and let executives monitor every asset in real time.”
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  – Group Maintenance Manager, Energy &amp; Utilities
                </p>
              </div>
            </div>
            <div className="relative rounded-[42px] border border-brand/10 bg-white/70 p-10 shadow-xl backdrop-blur">
              <div
                className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -left-12 bottom-4 h-40 w-40 rounded-full bg-brand/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid gap-6 sm:grid-cols-2">
                {testimonialQuotes.map((testimonial, index) => (
                  <figure
                    key={testimonial.quote}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span
                      className="absolute -top-6 left-6 text-7xl font-serif text-accent/20"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="relative text-sm text-slate-600">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      <span className="text-brand">{testimonial.name}</span>
                      <span className="mt-1 block text-[10px] text-slate-400">
                        {testimonial.company}
                      </span>
                    </figcaption>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-brand">
                      <Sparkles className="h-3.5 w-3.5" /> Success #{index + 1}
                    </span>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Industries */}
        <MotionSection id="industries" className="section">
          <div className="container-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-brand">
                Purpose-built for mission-critical industries
              </h2>
              <p className="mt-3 text-slate-600">
                Maintafox adapts to the way your maintenance organization works. Our domain experts
                bring field experience from manufacturing, energy, transportation, real estate, and
                government sectors across the MENA region.
              </p>
              <p className="mt-4 text-slate-600">
                Each deployment includes industry-specific templates, KPI dashboards, and regulatory
                checklists to accelerate adoption.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 font-semibold text-brand">
                  <Wrench className="h-3.5 w-3.5" /> Heavy industry ready
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                  <ShieldCheck className="h-3.5 w-3.5" /> Compliance assured
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                  <Smartphone className="h-3.5 w-3.5" /> Mobile workforce
                </span>
              </div>
            </div>
            <div className="rounded-[34px] border border-brand/10 bg-white/80 p-8 shadow-lg backdrop-blur">
              <div className="grid gap-3 sm:grid-cols-2">
                {industriesServed.map((industry) => (
                  <div
                    key={industry}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600 shadow-sm"
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand via-accent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-brand">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Pricing */}
        <MotionSection id="pricing" className="section section-muted">
          <div className="container-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-brand">
                Flexible pricing that scales with your maintenance maturity
              </h2>
              <p className="mt-3 text-slate-600">
                Transparent subscription plans with optional on-premise deployment and
                enterprise-grade support. All plans include onboarding, localized training, and
                access to new CMMS features.
              </p>
            </div>
            <div className="mt-12 flex flex-col gap-8 lg:flex-row">
              {pricingPlans.map((plan) => {
                const isFeatured = plan.name === 'Scale';
                return (
                  <div
                    key={plan.name}
                    className={cn(
                      'relative flex-1 overflow-hidden rounded-[32px] border border-brand/10 bg-white/85 p-8 shadow-lg backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl',
                      isFeatured ? 'lg:-mt-8 lg:mb-8' : 'lg:mt-6'
                    )}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand/15 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {isFeatured && (
                      <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]">
                        <Sparkles className="h-3.5 w-3.5" /> Most popular
                      </span>
                    )}
                    <div className="relative flex h-full flex-col">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {plan.name}
                      </div>
                      <div className="mt-4 text-3xl font-semibold text-brand">{plan.price}</div>
                      <p className="mt-3 text-sm text-slate-600">{plan.desc}</p>
                      <ul className="mt-6 space-y-3 text-sm text-slate-600">
                        {plan.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-1 h-2 w-2 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-col gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Security-first
                          deployment
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                          <Activity className="h-3.5 w-3.5 text-accent" /> Reliability support
                          included
                        </span>
                      </div>
                      <div className="mt-8">
                        <Link
                          href="/demo"
                          className={cn(
                            'inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition',
                            isFeatured
                              ? 'bg-brand text-white hover:bg-brand/90'
                              : 'border border-brand/20 text-brand hover:bg-brand/5'
                          )}
                        >
                          Talk to Sales
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MotionSection>

        {/* Resources CTA */}
        <MotionSection className="section">
          <div className="container-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-brand">
                  Download the Maintafox CMMS Buyer&apos;s Guide
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Learn how to evaluate computerized maintenance management systems, calculate ROI,
                  and build stakeholder alignment. The guide includes checklists, KPI benchmarks,
                  and an implementation roadmap.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center text-brand underline-offset-4 hover:underline"
                >
                  Request the PDF guide
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-900/90 p-8 text-white shadow-sm">
                <h3 className="text-xl font-semibold">Maintenance excellence webinar series</h3>
                <p className="mt-3 text-sm text-slate-200">
                  Join our monthly live sessions covering reliability-centered maintenance, spare
                  part optimization, and asset performance analytics tailored for Algerian
                  industries.
                </p>
                <Link
                  href="/demo"
                  className="mt-6 inline-flex items-center text-brand-accent underline-offset-4 hover:underline"
                >
                  Reserve your seat
                </Link>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* FAQ */}
        <MotionSection id="faq" className="section section-muted">
          <div className="container-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-brand">
                Frequently asked questions about Maintafox
              </h2>
              <p className="mt-3 text-slate-600">
                Everything you need to know about our computerized maintenance management system,
                implementation methodology, and support services.
              </p>
            </div>
            <div className="mt-10 grid gap-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-brand">
                    {faq.question}
                    <span className="text-sm font-normal text-slate-400 group-open:hidden">+</span>
                    <span className="hidden text-sm font-normal text-slate-400 group-open:block">
                      −
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Final CTA */}
        <MotionSection className="section">
          <div className="container-12 text-center">
            <h2 className="text-3xl font-semibold text-brand">
              Ready to modernize maintenance with a CMMS built in Algeria?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              See Maintafox in action and discover how our localized computerized maintenance
              management system boosts reliability, asset uptime, and operational profitability.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/demo" className="btn-primary">
                Schedule your free demo
              </Link>
              <Link href="/contact" className="btn-outline">
                Talk with our experts
              </Link>
            </div>
          </div>
        </MotionSection>
      </main>
    </>
  );
}
