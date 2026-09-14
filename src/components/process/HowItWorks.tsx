"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { PROCESS, type ProcessStep as ProcessStepType } from "@content/process";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="how-it-works" tone="light">
      <Container>
        <div className="max-w-xl">
          <Eyebrow tone="light">{PROCESS.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {PROCESS.headline}
          </h2>
          <p className="mt-5 text-lg text-charcoal/65">{PROCESS.subheadline}</p>
        </div>

        <div ref={ref} className="relative mt-16 md:mt-20">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-charcoal/10 md:left-[19px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-terracotta via-olive to-gold md:left-[19px]"
          />

          <ol className="space-y-14 md:space-y-20">
            {PROCESS.steps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

function ProcessStep({ step, index }: { step: ProcessStepType; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[40px_1fr] gap-6 pl-0 md:grid-cols-[48px_1fr] md:gap-10"
    >
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 bg-cream font-display text-xs font-semibold text-terracotta md:h-10 md:w-10">
        {step.number}
      </div>
      <div className="pt-0.5">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-lg text-base text-charcoal/65 md:text-lg">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}
