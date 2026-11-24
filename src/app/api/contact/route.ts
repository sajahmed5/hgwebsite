import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email";

// Basic, dependency-free email shape check.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Verify a Cloudflare Turnstile token with Cloudflare's siteverify API.
// Returns true when the token is valid, OR when no secret is configured
// (so the form still works during local dev / before keys are set up).
async function verifyTurnstile(
  token: string,
  ip: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured — skip verification.
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

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

  // Human verification — must pass before we do anything else.
  const turnstileToken = String(data.turnstileToken ?? "").trim();
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    null;
  const human = await verifyTurnstile(turnstileToken, ip);
  if (!human) {
    return NextResponse.json(
      {
        errors: {
          turnstile: "Please complete the verification and try again.",
        },
      },
      { status: 422 }
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
