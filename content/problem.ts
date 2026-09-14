export interface ProblemColumn {
  label: string;
  description: string;
}

export interface ProblemContent {
  eyebrow: string;
  headline: string;
  columns: ProblemColumn[];
}

export const PROBLEM: ProblemContent = {
  eyebrow: "The problem",
  headline:
    "You've got a great product. It just isn't reaching the right people — and it's not just you.",
  columns: [
    {
      label: "Content creation takes too long",
      description:
        "Consistent content is a full-time job most brand owners can't keep up with. Posting stops, growth stalls, momentum disappears.",
    },
    {
      label: "Organic reach is shrinking",
      description:
        "Algorithms punish inconsistency. Brands that go quiet lose months of built momentum.",
    },
    {
      label: "There's just not enough time",
      description:
        "Running the business doesn't leave hours to master content strategy, ad creative, and platform algorithms. We already have.",
    },
  ],
};
