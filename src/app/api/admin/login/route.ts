import { NextResponse } from "next/server";
import { ADMIN_COOKIE, safeEqual, signToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "The admin area isn’t configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const attempt = typeof body.password === "string" ? body.password : "";

  if (!attempt || !safeEqual(attempt, password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await signToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
