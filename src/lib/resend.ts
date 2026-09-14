import { Resend } from "resend";

let client: Resend | null | undefined;

/** Returns null when RESEND_API_KEY isn't set so routes can degrade gracefully. */
export function getResendClient(): Resend | null {
  if (client !== undefined) return client;
  const apiKey = process.env.RESEND_API_KEY;
  client = apiKey ? new Resend(apiKey) : null;
  return client;
}

export const EMAIL_NOT_CONFIGURED_MESSAGE =
  "Email sending isn't configured yet — set RESEND_API_KEY (and related env vars, see README) to enable it.";
