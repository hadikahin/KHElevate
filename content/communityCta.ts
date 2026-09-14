export interface CommunityCtaContent {
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Replaces the old "Join our Slack" block — the Slack community isn't an
 * active offering, so this slot became a work-first secondary CTA instead.
 */
export const COMMUNITY_CTA: CommunityCtaContent = {
  headline: "See the work behind the numbers.",
  description:
    "Browse the campaigns, systems, and creative we've shipped for brands like yours.",
  ctaLabel: "View our work",
  ctaHref: "#work",
};
