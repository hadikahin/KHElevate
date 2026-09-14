export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  steps: ProcessStep[];
}

export const PROCESS: ProcessContent = {
  eyebrow: "How it works",
  headline: "A system, not a scramble.",
  subheadline: "Four disciplined stages take a brand from unclear to unmissable.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description:
        "Research into brand, product, and target customer. Goals, competitors, and optimisation methods — all in one onboarding session.",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "We figure out the angles to test, experiment with formats and platforms, and use your input to develop a tailored plan.",
    },
    {
      number: "03",
      title: "Production",
      description:
        "We film and produce content for social — posts, stories, and captions — all with your input. You approve before anything goes live.",
    },
    {
      number: "04",
      title: "Live",
      description:
        "Content posted, with story engagement posts and captions to drive engagement, and analytics tracking set out from day one. You own your content, not us.",
    },
  ],
};
