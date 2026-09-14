export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];
