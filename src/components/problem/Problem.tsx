"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { PROBLEM } from "@content/problem";

const ICONS = [Clock, TrendingDown, Hourglass];
const ACCENTS = ["text-terracotta", "text-olive", "text-gold"];

export function Problem() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="dark">{PROBLEM.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {PROBLEM.headline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-20 md:gap-8">
          {PROBLEM.columns.map((column, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={column.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-cream/10 pt-6"
              >
                <Icon className={`h-6 w-6 ${ACCENTS[i % ACCENTS.length]}`} strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {column.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60 md:text-base">
                  {column.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
