import { appendFile, mkdir } from "fs/promises";
import path from "path";

export interface Lead {
  name: string;
  email: string;
  source: string;
  createdAt: string;
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.jsonl");

/**
 * Durable-ish lead storage.
 *
 * No database is provisioned for this project yet (see README/CONTENT.md
 * "Pending decisions"), so this appends each lead to a local JSONL file —
 * fine for local dev or a traditional always-on Node server, but Vercel's
 * serverless filesystem is read-only in production, so this write silently
 * no-ops there. The admin notification email sent alongside this (see
 * /api/send-deck) is the durable record until a real database is wired in.
 * Swap the body of this function for a DB insert (Supabase, Postgres, a
 * spreadsheet API, etc.) when one is chosen — call sites don't change.
 */
export async function saveLead(lead: Lead): Promise<void> {
  try {
    await mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.warn(
      "[leads] could not persist lead to file (expected on read-only/serverless hosts):",
      err
    );
  }
}
