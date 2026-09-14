# KH Elevate

Marketing site for KH Elevate — a growth marketing and content systems studio.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4, brand tokens in `src/app/globals.css`
- **Animation:** Framer Motion (component/scroll reveals), GSAP (hero cursor parallax), custom Canvas (hero motion graphics)
- **Fonts:** Poppins (display/headlines), Inter (body)
- **Icons:** Lucide React

## Structure

- `src/app` — routes (`/`, `/about`)
- `src/components` — one folder per section (`hero`, `nav`, `showcase`, `stats`, `process`, `features`, `testimonials`, `cta`, `contact`, `footer`) plus shared `ui/` primitives
- `src/data` — copy/content for each section, kept separate from markup
- `src/hooks` — small reusable hooks (`useInView`, `useReducedMotion`)

## Known content gaps

- **Showcase marquee** uses styled placeholder cards (no real project imagery supplied yet) — swap `src/data/showcase.ts` items for real work once assets are ready.
- **Testimonials** are placeholder-labeled ("Client A – Founder", etc.) per the brief — swap in real quotes in `src/data/testimonials.ts` when available.
- **Contact form** submits client-side only (simulated send). Wire it to a real endpoint/email service before launch.
- Community/Slack CTA slot was replaced with a "View our work" CTA since the Slack community isn't an active offering — see `src/components/cta/CommunityCta.tsx`.
