import { Eyebrow } from "@/components/ui/Section";
import { Marquee } from "@/components/showcase/Marquee";
import { Container } from "@/components/ui/Container";
import { SHOWCASE } from "@content/showcase";

export function ShowcaseSection() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-28"
    >
      <Container className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow tone="dark">{SHOWCASE.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {SHOWCASE.headline}
          </h2>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/40">
            {SHOWCASE.whoWeWorkWithLabel}
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-cream/65 md:justify-end">
            {SHOWCASE.whoWeWorkWith.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </Container>
      <Marquee />
    </section>
  );
}
