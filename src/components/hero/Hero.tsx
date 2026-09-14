"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HERO } from "@content/hero";

const EASE_SWIFT = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.06, duration: 0.7, ease: EASE_SWIFT },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;

    const moveX = gsap.quickTo(content, "x", { duration: 0.9, ease: "power3.out" });
    const moveY = gsap.quickTo(content, "y", { duration: 0.9, ease: "power3.out" });

    function onPointerMove(e: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      moveX(relX * -14);
      moveY(relY * -10);
    }
    function onPointerLeave() {
      moveX(0);
      moveY(0);
    }

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal text-cream"
    >
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/10 via-transparent to-charcoal" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-28 pb-24 md:px-10">
        <div ref={contentRef} className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold"
          >
            {HERO.eyebrow}
          </motion.span>

          <h1 className="font-display text-[13vw] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            {HERO.headlineWords.map((word, i) => (
              <span key={word + i} className="inline-block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  animate="show"
                  className="inline-block pr-[0.22em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-lg text-cream/70 md:text-xl"
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href={HERO.primaryCta.href} tone="dark" variant="primary">
              {HERO.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={HERO.secondaryCta.href}
              tone="dark"
              variant="secondary"
              showArrow={false}
            >
              {HERO.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-cream/50"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
