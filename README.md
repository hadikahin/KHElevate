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

Lead storage (separate from email) writes to a Google Sheet — see "Lead
capture & storage" below for the three vars that turn it on
(`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`).

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4, brand tokens in `src/app/globals.css`
- **Animation:** Framer Motion (component/scroll reveals), GSAP (hero cursor parallax), custom Canvas (hero motion graphics)
- **Fonts:** Poppins (display/headlines), Inter (body)
- **Icons:** Lucide React
- **Email:** Resend (`src/lib/resend.ts`, `src/app/api/contact`, `src/app/api/send-deck`)
- **Lead storage:** Google Sheets, via a service account (`src/lib/googleSheets.ts`, `src/lib/leads.ts`) — no `googleapis` dependency, just a hand-signed JWT and `fetch`

## Structure

- `src/app` — routes (`/`, `/about`) and API routes (`/api/contact`, `/api/send-deck`)
- `src/components` — one folder per section (`hero`, `nav`, `problem`, `showcase`, `stats`, `process`, `services`, `team`, `testimonials`, `cta`, `contact`, `leadcapture`, `footer`) plus shared `ui/` primitives
- `content/` — all editable copy/data, typed. See `CONTENT.md` for the full map of file → section.
- `src/lib` — small server-side helpers (`resend.ts`, `leads.ts`, `googleSheets.ts`, `email.ts`, `validation.ts`)
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

1. Always tries to save the lead to a Google Sheet via `src/lib/leads.ts`
   → `src/lib/googleSheets.ts`. This never throws — a missing config or a
   Sheets-side failure is logged and swallowed, never crashes the
   request, and the lead still gets emailed either way.
2. Emails the lead the intro deck link + booking link (if configured) —
   or, if the deck PDF hasn't been uploaded yet, a "still being
   finalized" message instead of a dead link (the route checks whether
   `public/kh-elevate-intro-deck.pdf` actually exists before deciding
   which copy to send).
3. Emails an internal notification to `LEADS_TO_EMAIL`.

**Google Sheets setup** (one-time, in Google Cloud Console):

1. Create a project (or use an existing one) and enable the **Google
   Sheets API**.
2. Create a **service account**, then generate a JSON key for it.
3. Open the target Google Sheet, add a tab named `Leads` (or change
   `GOOGLE_SHEET_RANGE` to match), and **share the sheet** with the
   service account's email (the `client_email` field in the JSON key) as
   Editor.
4. Copy the Sheet ID out of its URL (`.../d/<THIS PART>/edit`).
5. Set these in `.env.local` / your deployment's env vars:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=   # the client_email from the JSON key
GOOGLE_PRIVATE_KEY=             # the private_key from the JSON key, quotes and \n intact
GOOGLE_SHEET_ID=                # from the sheet's URL
GOOGLE_SHEET_RANGE=             # optional, defaults to "Leads!A:D"
```

Until these are set, leads still reach you by email (step 3 above) —
only the spreadsheet row is skipped, silently, with a console warning.

**Still needed before this goes live:** the real deck PDF at
`public/kh-elevate-intro-deck.pdf`, and a confirmed booking link (see
`content/leadCapture.ts` → `bookingUrl`, currently `null` and stubbed in
the UI).

## Known content gaps

- **Team headshots** — initials avatars render until `content/team.ts` gets real `photoUrl`s.
- **Showcase marquee** uses styled placeholder cards (no real project imagery supplied yet).
- **Testimonials** are placeholder-labeled ("Client A – Founder") until real quotes are available.
- **Intro deck PDF** not yet supplied — the send-deck email and success message both adapt gracefully until it's uploaded (see "Lead capture & storage" above).
- **Booking link** not yet confirmed — "Book a 1:1" stays stubbed until `content/leadCapture.ts` → `bookingUrl` is set.
- Community/Slack CTA slot was replaced with a "View our work" CTA since the Slack community isn't an active offering — see `content/communityCta.ts`.
