export interface TeamMember {
  name: string;
  role: string;
  photoUrl?: string;
}

export interface TeamContent {
  eyebrow: string;
  headline: string;
  members: TeamMember[];
}

/**
 * `photoUrl` is intentionally left unset — real headshots are a pending
 * content gap (see README/CONTENT.md). Drop an image path here once
 * supplied and TeamSection will render it in place of the initials avatar.
 */
export const TEAM: TeamContent = {
  eyebrow: "Put a name to faces",
  headline: "The team behind the system.",
  members: [
    { name: "Hadi", role: "Founder" },
    { name: "Kenny", role: "Co-founder" },
    { name: "Yahye", role: "Co-founder" },
  ],
};
