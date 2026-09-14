import { NextResponse } from "next/server";
import { getResendClient, EMAIL_NOT_CONFIGURED_MESSAGE } from "@/lib/resend";
import { isValidEmail, isNonEmptyString } from "@/lib/validation";
import { escapeHtml } from "@/lib/email";
import { SITE } from "@content/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, website, details, marketing } = (body ?? {}) as Record<string, unknown>;

  if (!isNonEmptyString(name) || !isValidEmail(email) || !isNonEmptyString(details)) {
    return NextResponse.json(
      { ok: false, error: "Name, a valid email, and project details are required." },
      { status: 400 }
    );
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json({ ok: false, error: EMAIL_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "KH Elevate <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New project enquiry from ${name}`,
      html: `
        <h2>New project enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${website && isNonEmptyString(website) ? `<p><strong>Website:</strong> ${escapeHtml(website)}</p>` : ""}
        <p><strong>Project details:</strong></p>
        <p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>
        <p><strong>Marketing opt-in:</strong> ${marketing ? "Yes" : "No"}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
