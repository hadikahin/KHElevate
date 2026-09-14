"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { useInView } from "@/hooks/useInView";
import { CountUp } from "@/components/stats/CountUp";
import { STATS, type Stat } from "@content/stats";
import { cn } from "@/lib/utils";

function StatTile({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 pt-10 text-center first:pt-0 sm:pt-0"
    >
      <span className="font-display text-4xl font-semibold tracking-tight text-terracotta md:text-5xl">
        <CountUp
          value={stat.value}
          decimals={stat.decimals}
          prefix={stat.prefix}
          suffix={stat.suffix}
          active={active}
        />
      </span>
      <span className="text-sm font-medium text-charcoal/70">{stat.label}</span>
      {stat.description && (
        <span className="max-w-[16ch] text-xs text-charcoal/45">{stat.description}</span>
      )}
    </motion.div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="results" className="border-y border-charcoal/10 bg-cream py-20 md:py-24">
      <Container>
        <div className="mb-12 max-w-xl">
          <Eyebrow tone="light">{STATS.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {STATS.headline}
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-x-6 gap-y-10 divide-charcoal/10 sm:grid-cols-4 sm:divide-x"
        >
          {STATS.primary.map((stat, i) => (
            <StatTile key={stat.label} stat={stat} index={i} active={inView} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal/60 transition-colors hover:text-terracotta"
          >
            {STATS.secondaryLabel}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-8 border-t border-charcoal/10 pt-10">
                {STATS.secondary.map((stat, i) => (
                  <StatTile key={stat.label} stat={stat} index={i} active={expanded} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
