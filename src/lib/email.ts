import { Resend } from "resend";
import { site } from "@/data/site";

// Email delivery for form submissions.
//
// Configured entirely through environment variables so no secrets live in code:
//   RESEND_API_KEY     – your Resend API key (required to actually send)
//   CONTACT_TO_EMAIL   – where enquiries land   (default: hello@hgcare.co.uk)
//   CONTACT_FROM_EMAIL – the "from" address      (default: Resend onboarding)
//
// If RESEND_API_KEY is not set, submissions are logged to the server console
// instead of emailed — so nothing breaks during local development or setup.

const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
const fromEmail =
  process.env.CONTACT_FROM_EMAIL || "HG Care Website <onboarding@resend.dev>";

type SendArgs = {
  subject: string;
  // Ordered field label → value pairs to render in the email body.
  fields: { label: string; value: string }[];
  // Optional reply-to (e.g. the enquirer's email) so staff can just hit reply.
  replyTo?: string;
};

export async function sendFormEmail({
  subject,
  fields,
  replyTo,
}: SendArgs): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;

  // No key configured yet → log and succeed so the form still works.
  if (!apiKey) {
    console.log(`📨 [${subject}] (email not configured — logging only)`, {
      to: toEmail,
      fields,
      replyTo,
      receivedAt: new Date().toISOString(),
    });
    return { ok: true };
  }

  const rows = fields
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#00606c;vertical-align:top">${f.label}</td><td style="padding:6px 12px;color:#0c3338;white-space:pre-wrap">${escapeHtml(
          f.value || "—"
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto">
      <div style="background:#00606c;color:#fff;padding:18px 20px;border-radius:10px 10px 0 0">
        <h2 style="margin:0;font-size:18px">${escapeHtml(subject)}</h2>
        <p style="margin:4px 0 0;font-size:13px;color:#cfe6e8">via hgcare.co.uk</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f8faf9;border:1px solid #d2e8ea;border-top:0;border-radius:0 0 10px 10px">
        ${rows}
      </table>
    </div>`;

  const text = fields.map((f) => `${f.label}: ${f.value || "—"}`).join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error("Resend send error:", error);
    return { ok: false };
  }
  return { ok: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
