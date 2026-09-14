import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { VALUES } from "@content/about";
import { AboutReveal } from "@/components/about/AboutReveal";

export const metadata: Metadata = {
  title: "About — KH Elevate",
  description:
    "KH Elevate is a growth marketing and content systems studio built on clarity, discipline, and results.",
};

export default function AboutPage() {
  return (
    <>
      <Section tone="light" className="pt-40 pb-20 md:pt-48">
        <Container>
          <Eyebrow tone="light">About KH Elevate</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-6xl">
            A studio built to make growth feel inevitable.
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-charcoal/65 md:text-xl">
            We&apos;re a small, disciplined team of strategists, writers, and
            performance marketers who believe growth is a system you build,
            not a campaign you get lucky with.
          </p>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <Eyebrow tone="dark">Our approach</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Positioning first. Everything else follows.
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-lg text-cream/70 md:text-xl">
              <p>
                Most brands don&apos;t have a marketing problem — they have a
                clarity problem. Before we touch a single channel, we get
                brutally clear on who you&apos;re for, why you win, and what
                makes you impossible to confuse with the next competitor.
              </p>
              <p>
                From there, every asset — content, ads, email, product
                copy — inherits the same narrative spine. That&apos;s what makes
                growth compound instead of resetting with every campaign.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Eyebrow tone="light">What we stand for</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Three principles behind every engagement.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-20">
            {VALUES.map((value, i) => (
              <AboutReveal key={value.title} index={i}>
                <span className="font-display text-2xl font-semibold text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-base text-charcoal/65">
                  {value.description}
                </p>
              </AboutReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="text-center">
        <Container>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Ready to see what a real system looks like?
          </h2>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/#contact" tone="dark" variant="primary">
              Get started
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
