export interface SiteContent {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  social: { label: string; href: string }[];
}

export const SITE: SiteContent = {
  name: "KH Elevate",
  tagline: "Empowering your growth",
  description: "Growth marketing and content systems for ambitious brands.",
  phone: "+44 20 0000 0000",
  email: "hello@khelevate.com",
  location: "London, UK",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};
