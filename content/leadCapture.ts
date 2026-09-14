export interface LeadCaptureContent {
  triggerDelayMs: number;
  triggerScrollDepth: number;
  bubbleLabel: string;
  openHeadline: string;
  openMessage: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  successMessage: string;
  bookingCtaLabel: string;
  /**
   * Pending decision (see README) — no booking link confirmed yet.
   * Leave null to keep the booking button stubbed/disabled; set to a real
   * Calendly (or similar) URL once Hadi confirms one.
   */
  bookingUrl: string | null;
  /**
   * Public path to the intro deck PDF. Hadi needs to supply the actual
   * file at `public/kh-elevate-intro-deck.pdf` (see README) — until then
   * the email send still works but links to a file that 404s.
   */
  deckPath: string;
}

export const LEAD_CAPTURE: LeadCaptureContent = {
  triggerDelayMs: 15000,
  triggerScrollDepth: 0.4,
  bubbleLabel: "Want our intro deck?",
  openHeadline: "Let's get you the deck.",
  openMessage:
    "Want to see what we can do for your brand? Drop your name and email and we'll send our intro deck straight over — plus a link to grab time with us.",
  namePlaceholder: "Your name",
  emailPlaceholder: "Your email",
  submitLabel: "Send it over",
  successMessage:
    "Sent! Check your inbox for the deck — and grab a time below if you want to talk it through.",
  bookingCtaLabel: "Book a 1:1",
  bookingUrl: null,
  deckPath: "/kh-elevate-intro-deck.pdf",
};
