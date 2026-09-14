import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/data/nav";
import { InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-charcoal py-16 text-cream">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Logo variant="dark" size="md" />
            <p className="mt-5 text-sm leading-relaxed text-cream/55">
              Growth marketing and content systems for ambitious brands.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/40">
                Navigate
              </span>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/65 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/40">
                Contact
              </span>
              <ul className="mt-4 space-y-2.5 text-sm text-cream/65">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                  <a href="tel:+442000000000" className="hover:text-gold">
                    +44 20 0000 0000
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                  <a href="mailto:hello@khelevate.com" className="hover:text-gold">
                    hello@khelevate.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} />
                  London, UK
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} KH Elevate. All rights reserved.</span>
          <span>Empowering your growth.</span>
        </div>
      </Container>
    </footer>
  );
}
