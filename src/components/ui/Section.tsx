import { cn } from "@/lib/utils";

export function Section({
  id,
  tone = "light",
  className,
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 md:py-32",
        tone === "light" ? "bg-cream text-charcoal" : "bg-charcoal text-cream",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
        tone === "light" ? "text-terracotta" : "text-gold",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          tone === "light" ? "bg-terracotta" : "bg-gold"
        )}
      />
      {children}
    </span>
  );
}
