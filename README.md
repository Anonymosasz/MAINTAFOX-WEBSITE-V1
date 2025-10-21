# Maintafox v1 Website

Production-ready Next.js (App Router) website for Maintafox CMMS.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Framer Motion
- Jest + React Testing Library
- Playwright e2e (smoke)
- GitHub Actions CI

## Run locally

1. Install deps
2. Start dev server

```bash
npm install
npm run dev
```

## Build

```bash
npm run build && npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and set values.

- SENDGRID_API_KEY=
- DEMO_REQUEST_TO=contact@maintafox.systems
- DEMO_REQUEST_FROM=no-reply@maintafox.systems

## Pages

- /
- /features
- /about
- /demo (request a demo form)
- /blog (placeholder)
- /privacy
- /terms
- /contact

## Deployment

- Preferred: Vercel
- Alternative: Netlify

## Content updates

- Edit React pages in `app/`
- Global components in `components/`
- Styles in `styles/`

## LICENSE

Private.
