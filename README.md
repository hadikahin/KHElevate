# KH Elevate

Marketing site for KH Elevate — a growth marketing and content studio.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Email sending (contact form + lead-capture widget) runs through
[Resend](https://resend.com). Without these set, both features degrade
gracefully — the UI shows a clear "email sending isn't configured yet"
error instead of crashing, so the site is fully deployable before this is
wired up.

Create `.env.local` (not committed) with:

```bash
RESEND_API_KEY=          # required to enable real sending
CONTACT_FROM_EMAIL=      # e.g. "KH Elevate <hello@khelevate.com>" — needs a domain verified in Resend; defaults to Resend's onboarding@resend.dev test sender if unset
CONTACT_TO_EMAIL=        # inbox that receives contact-form submissions; defaults to content/site.ts SITE.email
LEADS_TO_EMAIL=          # inbox that receives lead-capture notifications; defaults to content/site.ts SITE.email
```

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4, brand tokens in `src/app/globals.css`
- **Animation:** Framer Motion (component/scroll reveals), GSAP (hero cursor parallax), custom Canvas (hero motion graphics)
- **Fonts:** Poppins (display/headlines), Inter (body)
- **Icons:** Lucide React
- **Email:** Resend (`src/lib/resend.ts`, `src/app/api/contact`, `src/app/api/send-deck`)

## Structure

- `src/app` — routes (`/`, `/about`) and API routes (`/api/contact`, `/api/send-deck`)
- `src/components` — one folder per section (`hero`, `nav`, `problem`, `showcase`, `stats`, `process`, `services`, `team`, `testimonials`, `cta`, `contact`, `leadcapture`, `footer`) plus shared `ui/` primitives
- `content/` — all editable copy/data, typed. See `CONTENT.md` for the full map of file → section.
- `src/lib` — small server-side helpers (`resend.ts`, `leads.ts`, `email.ts`, `validation.ts`)
- `src/hooks` — small reusable hooks (`useInView`, `useReducedMotion`)

## Content

All copy lives in `/content/*.ts`, typed so a missing field fails the
build instead of shipping silently broken. See **CONTENT.md** for which
file controls which section, and the list of pending content/decisions
(team headshots, showcase imagery, testimonials, intro deck PDF, booking
link).

## Lead capture & storage

`content/leadCapture.ts` drives the floating chat widget's copy, trigger
timing, deck path, and booking link. Submissions POST to
`/api/send-deck`, which:

1. Always saves the lead via `src/lib/leads.ts` (see that file's comment —
   it appends to a local JSONL file, which is fine for local dev but does
   **not** persist on Vercel's read-only serverless filesystem; the admin
   notification email below is the durable record until a real database
   is wired in).
2. Emails the lead the intro deck link + booking link (if configured).
3. Emails an internal notification to `LEADS_TO_EMAIL`.

**Still needed before this goes live:** the real deck PDF at
`public/kh-elevate-intro-deck.pdf`, and a confirmed booking link (see
`content/leadCapture.ts` → `bookingUrl`, currently `null` and stubbed in
the UI).

## Known content gaps

- **Team headshots** — initials avatars render until `content/team.ts` gets real `photoUrl`s.
- **Showcase marquee** uses styled placeholder cards (no real project imagery supplied yet).
- **Testimonials** are placeholder-labeled ("Client A – Founder") until real quotes are available.
- **Intro deck PDF** not yet supplied — see "Lead capture & storage" above.
- **Booking link** not yet confirmed — "Book a 1:1" stays stubbed until `content/leadCapture.ts` → `bookingUrl` is set.
- Community/Slack CTA slot was replaced with a "View our work" CTA since the Slack community isn't an active offering — see `content/communityCta.ts`.
