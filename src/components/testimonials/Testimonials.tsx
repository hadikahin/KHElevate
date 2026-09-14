"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@content/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) go(index + 1);
    else if (info.offset.x > 80) go(index - 1);
  }

  const active = TESTIMONIALS[index];

  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow tone="light">Word on the street</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Clients notice the difference.
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden md:mt-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
              className="cursor-grab rounded-3xl border border-charcoal/10 bg-white/40 p-10 active:cursor-grabbing md:p-16"
            >
              <Quote className="h-9 w-9 text-terracotta/70" strokeWidth={1.5} />
              <p className="mt-6 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-8 text-sm font-semibold text-charcoal/70">
                {active.name} <span className="text-charcoal/40">— {active.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-terracotta" : "w-1.5 bg-charcoal/20"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
