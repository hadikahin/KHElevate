import { Compass, PenTool, Target, Layers } from "lucide-react";

export const FEATURES = [
  {
    icon: Compass,
    title: "Market intelligence",
    description:
      "Research that finds the gap in your category before we write a single word of copy.",
  },
  {
    icon: PenTool,
    title: "Narrative architecture",
    description:
      "A story structure for your brand that holds up across every channel and touchpoint.",
  },
  {
    icon: Target,
    title: "Conversion systems",
    description:
      "Funnels and creative built around how your buyers actually decide, not best practices.",
  },
  {
    icon: Layers,
    title: "Growth infrastructure",
    description:
      "The tracking, testing, and operational backbone that lets performance compound.",
  },
] as const;
