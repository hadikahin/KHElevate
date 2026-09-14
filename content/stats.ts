export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface StatsContent {
  eyebrow: string;
  headline: string;
  primary: Stat[];
  secondaryLabel: string;
  secondary: Stat[];
}

export const STATS: StatsContent = {
  eyebrow: "Real results",
  headline: "What we've accomplished — with no ad spend.",
  primary: [
    {
      value: 4.4,
      decimals: 1,
      suffix: "M",
      label: "TikTok video views",
      description: "60-day window, organic growth only",
    },
    {
      value: 233,
      suffix: "K",
      label: "Instagram views",
      description: "14-day period, +477,650% new accounts reached",
    },
    {
      value: 86.7,
      decimals: 1,
      suffix: "%",
      label: "For You Page traffic",
      description: "Algorithm-pushed to new audiences",
    },
    {
      value: 353,
      prefix: "+",
      suffix: "%",
      label: "Growth, 60 days",
      description: "Organic only — zero ad spend",
    },
  ],
  secondaryLabel: "See more results",
  secondary: [
    {
      value: 3.1,
      decimals: 1,
      suffix: "M",
      label: "TikTok views",
      description: "Single 28-day period, +149.7% growth",
    },
    {
      value: 416,
      suffix: "K",
      label: "Post views / year",
      description: "TikTok, organic",
    },
  ],
};
