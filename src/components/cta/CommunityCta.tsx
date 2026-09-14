"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { COMMUNITY_CTA } from "@content/communityCta";

export function CommunityCta() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center text-cream md:px-16 md:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(50% 60% at 15% 15%, rgba(168,92,50,0.28), transparent 60%), radial-gradient(50% 60% at 85% 85%, rgba(201,161,91,0.22), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              {COMMUNITY_CTA.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/65 md:text-lg">
              {COMMUNITY_CTA.description}
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink href={COMMUNITY_CTA.ctaHref} tone="dark" variant="primary">
                {COMMUNITY_CTA.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
