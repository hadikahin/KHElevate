import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/problem/Problem";
import { ShowcaseSection } from "@/components/showcase/ShowcaseSection";
import { Stats } from "@/components/stats/Stats";
import { HowItWorks } from "@/components/process/HowItWorks";
import { Services } from "@/components/services/Services";
import { Team } from "@/components/team/Team";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { CommunityCta } from "@/components/cta/CommunityCta";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ShowcaseSection />
      <Stats />
      <HowItWorks />
      <Services />
      <Team />
      <Testimonials />
      <CommunityCta />
      <ContactForm />
    </>
  );
}
