import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email";

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
  const role = String(data.role ?? "").trim();
  const experience = String(data.experience ?? "").trim();
  const message = String(data.message ?? "").trim();
  const honeypot = String(data.company ?? "").trim();

  if (honeypot) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (phone.length < 7) errors.phone = "Please enter a contact number.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { ok } = await sendFormEmail({
    subject: `New job application — ${role || "Care role"}`,
    replyTo: email,
    fields: [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Role", value: role },
      { label: "Experience", value: experience },
      { label: "About them", value: message },
    ],
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Could not send right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
