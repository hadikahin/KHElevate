"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useInView } from "@/hooks/useInView";
import { CountUp } from "@/components/stats/CountUp";
import { STATS } from "@/data/stats";

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="border-y border-charcoal/10 bg-cream py-16 md:py-20">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-1 gap-10 divide-y divide-charcoal/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 pt-10 text-center first:pt-0 sm:pt-0"
            >
              <span className="font-display text-5xl font-semibold tracking-tight text-terracotta md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
              </span>
              <span className="text-sm font-medium text-charcoal/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
