# Content guide

Every piece of editable copy on the site lives in a typed file under
`/content`. Components import from these files — there's no copy hardcoded
in JSX. To change something, edit the relevant file below; TypeScript will
flag it if a required field goes missing before the build breaks.

| File | Controls |
|---|---|
| `content/site.ts` | Brand name, tagline, phone, email, location, social links (footer + anywhere else brand info appears) |
| `content/nav.ts` | Nav bar + mobile menu + footer nav links |
| `content/hero.ts` | Hero eyebrow, headline words, subheadline, CTA labels/targets |
| `content/problem.ts` | "The problem" section headline + 3 columns |
| `content/showcase.ts` | Showcase marquee cards + "Who we work with" line |
| `content/stats.ts` | Stats bar — primary (main 4) and secondary ("see more results") numbers |
| `content/process.ts` | How It Works steps (Discovery → Strategy → Production → Live) |
| `content/services.ts` | Services grid (4 categories + sub-bullets). `icon` is a key mapped to a Lucide icon in the component — pick from `social \| paid \| creative \| strategy` |
| `content/team.ts` | Team section — name/role per person. Add a `photoUrl` once real headshots exist; until then an initials avatar renders automatically |
| `content/testimonials.ts` | Testimonial carousel quotes/labels |
| `content/communityCta.ts` | The CTA band between Testimonials and Contact |
| `content/about.ts` | Values shown on `/about` |
| `content/leadCapture.ts` | Lead-capture chat widget copy, trigger timing, deck path, booking link (see "Pending decisions" below) |

Brand colors and font tokens live in one place: `src/app/globals.css` (the
`@theme` block at the top) — change a hex value there and it updates
everywhere.

## Pending content/decisions

- **Team headshots** — `content/team.ts` members render an initials avatar
  until a `photoUrl` is added per person.
- **Showcase imagery** — the marquee currently renders styled placeholder
  cards (no real project imagery supplied yet). Swap `content/showcase.ts`
  items for real image-backed cards once assets are ready.
- **Testimonials** — placeholder-labeled ("Client A – Founder") until real
  quotes are available.
- **Intro deck PDF** — `content/leadCapture.ts` `deckPath` points at
  `/kh-elevate-intro-deck.pdf`. Drop the real file at
  `public/kh-elevate-intro-deck.pdf` — until then, `/api/send-deck`
  detects it's missing and sends a "still being finalized" message
  instead of a dead link (see `successMessageDeckPending`).
- **Booking link** — `content/leadCapture.ts` `bookingUrl` is `null`
  (pending a Calendly-or-similar link). The "Book a 1:1" button stays
  disabled/stubbed until a URL is set there.
- **Email sending** — both the contact form and the lead-capture widget
  send through Resend. See `README.md` → "Environment variables" for the
  keys needed to turn real sending on.
- **Lead storage** — captured leads write to a Google Sheet via a service
  account; see `README.md` → "Lead capture & storage" for the one-time
  setup and env vars.
