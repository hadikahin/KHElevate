"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonTone = "light" | "dark";

export function buttonClasses({
  variant = "primary",
  tone = "light",
  className,
}: {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-[var(--ease-swift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      tone === "light"
        ? "bg-charcoal text-cream hover:bg-terracotta focus-visible:ring-terracotta focus-visible:ring-offset-cream"
        : "bg-cream text-charcoal hover:bg-gold focus-visible:ring-gold focus-visible:ring-offset-charcoal",
    secondary:
      tone === "light"
        ? "border border-charcoal/20 text-charcoal hover:border-terracotta hover:text-terracotta focus-visible:ring-terracotta focus-visible:ring-offset-cream"
        : "border border-cream/25 text-cream hover:border-gold hover:text-gold focus-visible:ring-gold focus-visible:ring-offset-charcoal",
    ghost:
      tone === "light"
        ? "text-charcoal hover:text-terracotta"
        : "text-cream hover:text-gold",
  };

  return cn(base, variants[variant], className);
}

function ArrowIcon() {
  return (
    <ArrowUpRight
      className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-swift)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2.25}
    />
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  showArrow?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", tone = "light", showArrow = true, children, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonClasses({ variant, tone, className })} {...props}>
        {children}
        {showArrow && <ArrowIcon />}
      </button>
    );
  }
);

Button.displayName = "Button";

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  showArrow?: boolean;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", tone = "light", showArrow = true, children, ...props }, ref) => {
    return (
      <a ref={ref} className={buttonClasses({ variant, tone, className })} {...props}>
        {children}
        {showArrow && <ArrowIcon />}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
