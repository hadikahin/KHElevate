import { Eyebrow } from "@/components/ui/Section";
import { Marquee } from "@/components/showcase/Marquee";
import { Container } from "@/components/ui/Container";

export function ShowcaseSection() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-28"
    >
      <Container className="mb-12">
        <Eyebrow tone="dark">Selected work</Eyebrow>
        <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Work built to move numbers, not just look nice.
        </h2>
      </Container>
      <Marquee />
    </section>
  );
}
