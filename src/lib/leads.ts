import { appendSheetRow } from "@/lib/googleSheets";

export interface Lead {
  name: string;
  email: string;
  source: string;
  createdAt: string;
}

/**
 * Durable lead storage via Google Sheets (see README for setup — create a
 * service account, enable the Sheets API, share the target sheet with the
 * service account's email, set GOOGLE_SERVICE_ACCOUNT_EMAIL /
 * GOOGLE_PRIVATE_KEY / GOOGLE_SHEET_ID).
 *
 * This never throws: a missing config or a Sheets-side failure is logged
 * and swallowed rather than breaking the surrounding request — the lead
 * still gets the intro-deck email either way, and the admin notification
 * email is the fallback durable record if the sheet write fails.
 */
export async function saveLead(lead: Lead): Promise<void> {
  try {
    await appendSheetRow([lead.name, lead.email, lead.source, lead.createdAt]);
  } catch (err) {
    console.warn("[leads] failed to persist lead to Google Sheets:", err);
  }
}
