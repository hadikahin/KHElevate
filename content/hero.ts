export interface HeroContent {
  eyebrow: string;
  headlineWords: string[];
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const HERO: HeroContent = {
  eyebrow: "Growth & content systems",
  headlineWords: ["Creativity", "that", "actually", "sells."],
  subheadline:
    "Growth marketing and content systems for ambitious brands — inspired by insight, driven by creativity.",
  primaryCta: { label: "Get started", href: "#contact" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
};
