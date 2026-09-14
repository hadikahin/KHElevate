import { Hero } from "@/components/hero/Hero";
import { ShowcaseSection } from "@/components/showcase/ShowcaseSection";
import { Stats } from "@/components/stats/Stats";
import { HowItWorks } from "@/components/process/HowItWorks";
import { Features } from "@/components/features/Features";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { CommunityCta } from "@/components/cta/CommunityCta";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowcaseSection />
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CommunityCta />
      <ContactForm />
    </>
  );
}
