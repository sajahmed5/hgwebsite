import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email";
import { checkFormToken, issueFormToken, verifyTurnstile } from "@/lib/humanCheck";

export const dynamic = "force-dynamic";

// The form calls this when it opens to get its token (src/lib/humanCheck.ts).
export async function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

const VERIFY_AGAIN =
  "We couldn't confirm you're a person rather than a spam robot. Please try sending again, or call us.";

// Basic, dependency-free email shape check.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const enquiryType = String(data.enquiryType ?? "").trim();
  const message = String(data.message ?? "").trim();
  // Honeypot — bots fill hidden fields, humans don't.
  const honeypot = String(data.company ?? "").trim();

  if (honeypot) {
    // Silently accept to avoid tipping off spam bots.
    return NextResponse.json({ ok: true });
  }

  // Human verification: the form's own token first (free, no network), then
  // Cloudflare Turnstile when it is switched on.
  const tokenCheck = checkFormToken(data.formToken);
  if (tokenCheck !== "ok") {
    console.warn(`[contact] refused: form token ${tokenCheck}`);
    return NextResponse.json(
      { error: VERIFY_AGAIN, retry: true },
      { status: 400 }
    );
  }

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (phone.length < 7) errors.phone = "Please enter a contact number.";
  if (message.length < 10)
    errors.message = "Please tell us a little more (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Turnstile last: its answer can be used only once, so a typo above must
  // not spend it.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!(await verifyTurnstile(data["cf-turnstile-response"], ip))) {
    console.warn("[contact] refused: Turnstile check failed");
    return NextResponse.json(
      { error: VERIFY_AGAIN, retry: true },
      { status: 400 }
    );
  }

  const { ok } = await sendFormEmail({
    subject: `New care enquiry — ${enquiryType || "General"}`,
    replyTo: email,
    fields: [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Enquiry type", value: enquiryType },
      { label: "Message", value: message },
    ],
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Could not send right now. Please call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
