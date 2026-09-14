import { existsSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getResendClient, EMAIL_NOT_CONFIGURED_MESSAGE } from "@/lib/resend";
import { isValidEmail, isNonEmptyString } from "@/lib/validation";
import { escapeHtml } from "@/lib/email";
import { saveLead } from "@/lib/leads";
import { SITE } from "@content/site";
import { LEAD_CAPTURE } from "@content/leadCapture";

/** True once the real file is dropped at public/kh-elevate-intro-deck.pdf (see README). */
function isDeckAvailable(): boolean {
  return existsSync(path.join(process.cwd(), "public", LEAD_CAPTURE.deckPath));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email } = (body ?? {}) as Record<string, unknown>;

  if (!isNonEmptyString(name) || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 400 }
    );
  }

  // Capture the lead regardless of whether email sending is configured.
  await saveLead({
    name,
    email,
    source: "lead-capture-widget",
    createdAt: new Date().toISOString(),
  });

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json({ ok: false, error: EMAIL_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const adminTo = process.env.LEADS_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "KH Elevate <onboarding@resend.dev>";
  const deckAvailable = isDeckAvailable();
  const deckUrl = new URL(LEAD_CAPTURE.deckPath, request.url).toString();

  try {
    const [adminResult, leadResult] = await Promise.all([
      resend.emails.send({
        from,
        to: adminTo,
        replyTo: email,
        subject: `New lead: ${name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      }),
      resend.emails.send({
        from,
        to: email,
        subject: "Your KH Elevate intro deck",
        html: `
          <p>Hey ${escapeHtml(name)},</p>
          <p>Thanks for your interest in KH Elevate!</p>
          ${
            deckAvailable
              ? `<p>Here's our intro deck: <a href="${deckUrl}">${deckUrl}</a></p>`
              : `<p>Our intro deck is being finalized — we'll send it your way as soon as it's ready.</p>`
          }
          ${
            LEAD_CAPTURE.bookingUrl
              ? `<p>Want to talk it through? <a href="${LEAD_CAPTURE.bookingUrl}">Book a 1:1</a>.</p>`
              : ""
          }
          <p>— KH Elevate</p>
        `,
      }),
    ]);

    if (adminResult.error || leadResult.error) {
      return NextResponse.json(
        { ok: false, error: adminResult.error?.message || leadResult.error?.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, bookingUrl: LEAD_CAPTURE.bookingUrl, deckAvailable });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending the deck. Please try again." },
      { status: 500 }
    );
  }
}
