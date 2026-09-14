"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Target, Clapperboard, SearchCheck, ChevronDown, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { SERVICES, type ServiceIconKey } from "@content/services";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceIconKey, LucideIcon> = {
  social: Share2,
  paid: Target,
  creative: Clapperboard,
  strategy: SearchCheck,
};

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="services" tone="dark">
      <Container>
        <div className="max-w-xl">
          <Eyebrow tone="dark">{SERVICES.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {SERVICES.headline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 md:mt-20">
          {SERVICES.items.map((service, i) => {
            const Icon = ICONS[service.icon];
            const isOpen = openIndex === i;
            return (
              <motion.button
                key={service.title}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex((cur) => (cur === i ? null : cur))}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: (i % 2) * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-charcoal p-8 text-left transition-colors duration-300 hover:bg-charcoal-soft md:p-10"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between">
                  <motion.div
                    animate={isOpen ? { rotate: -8, scale: 1.08 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 text-gold"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </motion.div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-cream/40 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
                <h3 className="mt-7 font-display text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 py-1 text-sm leading-relaxed text-cream/60 md:text-base"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {bullet}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
