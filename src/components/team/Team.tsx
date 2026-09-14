"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { TEAM } from "@content/team";
import { cn } from "@/lib/utils";

const ACCENTS = ["bg-terracotta", "bg-olive", "bg-gold"];

function InitialsAvatar({ name, index }: { name: string; index: number }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={cn(
        "flex h-28 w-28 items-center justify-center rounded-full font-display text-4xl font-semibold text-cream shadow-[0_20px_45px_-20px_rgba(43,36,30,0.7)] md:h-32 md:w-32",
        ACCENTS[index % ACCENTS.length]
      )}
    >
      {initial}
    </div>
  );
}

export function Team() {
  return (
    <Section tone="light">
      <Container>
        <div className="max-w-xl">
          <Eyebrow tone="light">{TEAM.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {TEAM.headline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 md:mt-20">
          {TEAM.members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {member.photoUrl ? (
                <div className="relative h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <InitialsAvatar name={member.name} index={i} />
              )}
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-charcoal/55">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
