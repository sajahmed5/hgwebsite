import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidToken } from "@/lib/adminAuth";
import { setApplicationRecipients } from "@/lib/db";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  // This route isn't covered by the /admin middleware, so guard it here.
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await isValidToken(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const list: unknown = body.recipients;
  if (!Array.isArray(list)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const emails = list.map((e) => String(e).trim()).filter(Boolean);
  if (emails.length === 0) {
    return NextResponse.json(
      { error: "Please keep at least one recipient." },
      { status: 422 }
    );
  }
  const bad = emails.filter((e) => !isEmail(e));
  if (bad.length) {
    return NextResponse.json(
      { error: `Not a valid email: ${bad.join(", ")}` },
      { status: 422 }
    );
  }

  const { ok, error } = await setApplicationRecipients(emails);
  if (!ok) {
    return NextResponse.json(
      { error: error || "Could not save." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
