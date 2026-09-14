export type ServiceIconKey = "social" | "paid" | "creative" | "strategy";

export interface Service {
  icon: ServiceIconKey;
  title: string;
  bullets: string[];
}

export interface ServicesContent {
  eyebrow: string;
  headline: string;
  items: Service[];
}

export const SERVICES: ServicesContent = {
  eyebrow: "That's our job, not yours",
  headline: "Four capabilities. One compounding system.",
  items: [
    {
      icon: "social",
      title: "Social Media Management",
      bullets: [
        "Content strategy & calendar",
        "Planning & backlog management",
        "Monthly performance reporting",
      ],
    },
    {
      icon: "paid",
      title: "Paid Campaign Management",
      bullets: [
        "Target audience research",
        "Platform setup",
        "Analytics & budget tracking",
      ],
    },
    {
      icon: "creative",
      title: "Creative Content Production",
      bullets: [
        "Reels & TikTok production",
        "Caption writing & hashtag research",
        "Community engagement",
      ],
    },
    {
      icon: "strategy",
      title: "Strategy and Audit",
      bullets: [
        "Channel account review & competitor analysis",
        "Strategy meetings & workshops",
        "Roadmap generation",
      ],
    },
  ],
};
