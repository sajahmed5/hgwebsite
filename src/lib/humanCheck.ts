import { createHmac, timingSafeEqual } from "crypto";

// Human verification for the enquiry form. Two layers:
//
// 1) A form token (always on, needs no setup). The form asks the server for a
//    signed, timestamped token when it opens and sends it back with the
//    enquiry. A post with no token, a forged one, one sent within a few
//    seconds of the form opening, or one older than a few hours is refused.
//    This stops scripts that post straight to /api/contact without loading
//    the page, and ones that fill and send the form instantly.
//
// 2) Cloudflare Turnstile (on once its keys are set). The "verify you are
//    human" box under the form; the server checks its answer with Cloudflare.
//      NEXT_PUBLIC_TURNSTILE_SITE_KEY – shown in the page
//      TURNSTILE_SECRET_KEY           – server only
//    With neither set the box is not shown and only layer 1 applies.

const MIN_AGE_MS = 3_000; // nobody reads and fills the form in under 3 seconds
const MAX_AGE_MS = 6 * 60 * 60 * 1000; // a tab left open all afternoon still works

function secret(): string {
  // HMAC never reveals its key, so an existing server secret is safe to reuse.
  return (
    process.env.FORM_TOKEN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.RESEND_API_KEY ||
    process.env.ADMIN_PASSWORD ||
    "hg-website-local-dev"
  );
}

function sign(issuedAt: string): string {
  return createHmac("sha256", secret()).update(`enquiry:${issuedAt}`).digest("base64url");
}

export function issueFormToken(now = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt)}`;
}

export type TokenCheck = "ok" | "missing" | "invalid" | "too-fast" | "expired";

export function checkFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== "string" || !token) return "missing";
  const [issuedAt, mac] = token.split(".");
  if (!issuedAt || !mac || !/^\d{10,16}$/.test(issuedAt)) return "invalid";
  const expected = Buffer.from(sign(issuedAt));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  const age = now - Number(issuedAt);
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

/** Asks Cloudflare whether the Turnstile answer is a pass. Fails closed. */
export async function verifyTurnstile(response: unknown, ip: string | null): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (typeof response !== "string" || !response) return false;
  try {
    const body = new URLSearchParams({ secret: secretKey, response });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return data.success === true;
  } catch (e) {
    console.error("[contact] Turnstile check failed:", e);
    return false;
  }
}
