"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SHOWCASE_ITEMS } from "@/data/showcase";

const GRADIENTS = [
  "from-terracotta/90 to-charcoal",
  "from-olive/90 to-charcoal",
  "from-gold/90 to-charcoal",
];

function ShowcaseCard({
  label,
  category,
  index,
}: {
  label: string;
  category: string;
  index: number;
}) {
  return (
    <div
      className={cn(
        "group relative h-64 w-48 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-[0_20px_50px_-25px_rgba(43,36,30,0.6)] transition-transform duration-500 ease-[var(--ease-swift)] hover:scale-[1.04] md:h-72 md:w-56",
        GRADIENTS[index % GRADIENTS.length]
      )}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/70">
          {category}
        </span>
        <span className="font-display text-xl font-semibold leading-tight text-cream">
          {label}
        </span>
      </div>
    </div>
  );
}

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = [...SHOWCASE_ITEMS, ...SHOWCASE_ITEMS];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent md:w-32" />

      <div
        className={cn(
          "flex w-max gap-6 animate-marquee",
          paused && "animate-marquee-paused"
        )}
      >
        {items.map((item, i) => (
          <ShowcaseCard key={i} label={item.label} category={item.category} index={i} />
        ))}
      </div>
    </div>
  );
}
