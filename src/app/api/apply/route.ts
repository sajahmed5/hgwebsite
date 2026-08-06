import { NextResponse } from "next/server";
import { sendFormEmail, type EmailField, type EmailAttachment } from "@/lib/email";
import { saveApplication, getApplicationRecipients } from "@/lib/db";
import { APPLICATION_LAYOUT as LAYOUT } from "@/lib/applicationFields";
import { buildApplicationPdf } from "@/lib/pdf";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Filesystem-safe slug for the PDF filename.
const slug = (s: string) => s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const get = (k: string) => String(data[k] ?? "").trim();

  // Honeypot
  if (get("company")) return NextResponse.json({ ok: true });

  const firstName = get("firstName");
  const surname = get("surname");
  const email = get("email");
  const mobile = get("mobile");

  const errors: Record<string, string> = {};
  if (firstName.length < 2) errors.firstName = "Please enter your first name.";
  if (surname.length < 2) errors.surname = "Please enter your surname.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (mobile.length < 7) errors.mobile = "Please enter a mobile number.";
  if (get("consent") !== "yes")
    errors.consent = "Please confirm the declaration to submit.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Build the structured email body.
  const fields: EmailField[] = [];
  for (const block of LAYOUT) {
    fields.push({ section: block.section });
    for (const [key, label] of block.fields) {
      fields.push({ label, value: get(key) });
    }
  }

  // Render the full application to a PDF to attach to the email.
  let attachments: EmailAttachment[] = [];
  try {
    const pdf = await buildApplicationPdf(data);
    const filename = `HG-Care-Application-${slug(`${firstName}-${surname}`) || "applicant"}.pdf`;
    attachments = [{ filename, content: Buffer.from(pdf) }];
  } catch (err) {
    // Don't lose the application if the PDF fails — email/DB still go ahead.
    console.error("PDF build error:", err);
  }

  // Recipients are configurable from the admin area (fall back to defaults).
  const recipients = await getApplicationRecipients();

  // Save to the database (primary record) and email the team (notification).
  // Run both so one failing doesn't lose the application.
  const [saved, emailed] = await Promise.all([
    saveApplication(data),
    sendFormEmail({
      subject: `New job application — ${firstName} ${surname}`,
      replyTo: email,
      fields,
      to: recipients,
      attachments,
    }),
  ]);

  // Only fail the submission if the application wasn't captured anywhere.
  if (!saved.ok && !emailed.ok) {
    return NextResponse.json(
      { error: "Could not submit right now. Please try again or email us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
