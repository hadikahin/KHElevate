"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@content/nav";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { Menu } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-swift)]",
          transparent
            ? "bg-transparent py-6"
            : "border-b border-charcoal/10 bg-cream/85 py-4 backdrop-blur-lg"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 md:px-10">
          <Link href="/#top" aria-label="KH Elevate home">
            <Logo variant={transparent ? "dark" : "light"} size="md" />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-tight transition-colors duration-200",
                  transparent
                    ? "text-cream/80 hover:text-gold"
                    : "text-charcoal/75 hover:text-terracotta"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink
              href="/#contact"
              tone={transparent ? "dark" : "light"}
              className="px-5 py-2.5 text-xs"
            >
              Get started
            </ButtonLink>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "-mr-2 flex h-10 w-10 items-center justify-center rounded-full md:hidden",
              transparent ? "text-cream" : "text-charcoal"
            )}
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
