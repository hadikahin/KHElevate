"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { FEATURES } from "@/data/features";

export function Features() {
  return (
    <Section id="features" tone="dark">
      <Container>
        <div className="max-w-xl">
          <Eyebrow tone="dark">What we bring</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Four capabilities. One compounding system.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 md:mt-20">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: (i % 2) * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-charcoal p-8 transition-colors duration-300 hover:bg-charcoal-soft md:p-10"
            >
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 text-gold"
              >
                <feature.icon className="h-5 w-5" strokeWidth={1.75} />
              </motion.div>
              <h3 className="mt-7 font-display text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60 md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
