import { cn } from "@/lib/utils";

const PILLS = [
  { letter: "K", color: "bg-terracotta" },
  { letter: "H", color: "bg-olive" },
  { letter: "E", color: "bg-gold" },
] as const;

const SIZES = {
  sm: { pill: "h-6 w-2", text: "text-[7px]", gap: "gap-[3px]" },
  md: { pill: "h-8 w-2.5", text: "text-[8px]", gap: "gap-1" },
  lg: { pill: "h-14 w-4", text: "text-xs", gap: "gap-1.5" },
} as const;

function IconMark({ size = "md" }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-end", s.gap)} aria-hidden>
      {PILLS.map(({ letter, color }) => (
        <span
          key={letter}
          className={cn(
            "flex items-center justify-center rounded-full font-display font-bold text-cream",
            s.pill,
            s.text,
            color
          )}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function Logo({
  variant = "light",
  compact = false,
  size = "md",
  className,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const textColor = variant === "light" ? "text-charcoal" : "text-cream";
  const taglineColor = variant === "light" ? "text-charcoal/55" : "text-cream/55";

  if (compact) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <IconMark size={size} />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <IconMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            size === "lg" ? "text-2xl" : "text-lg",
            textColor
          )}
        >
          KH ELEVATE
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-semibold tracking-[0.28em]",
            taglineColor
          )}
        >
          EMPOWERING YOUR GROWTH
        </span>
      </span>
    </span>
  );
}
