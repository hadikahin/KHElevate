export interface ShowcaseItem {
  label: string;
  category: string;
}

export interface ShowcaseContent {
  eyebrow: string;
  headline: string;
  items: ShowcaseItem[];
  whoWeWorkWithLabel: string;
  whoWeWorkWith: string[];
}

export const SHOWCASE: ShowcaseContent = {
  eyebrow: "Selected work",
  headline: "Work built to move numbers, not just look nice.",
  items: [
    { label: "Poster Design", category: "Brand" },
    { label: "SEO Campaign", category: "Growth" },
    { label: "Brand Identity", category: "Brand" },
    { label: "Ad Creative", category: "Performance" },
    { label: "Social Campaign", category: "Content" },
    { label: "Web Experience", category: "Product" },
    { label: "Email Systems", category: "Growth" },
    { label: "Content Series", category: "Content" },
  ],
  whoWeWorkWithLabel: "Who we work with",
  whoWeWorkWith: ["Cafes & Restaurants", "SMEs & VSMEs", "Community Interest Companies"],
};
