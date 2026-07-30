// Minimal, stateless auth for the /admin area.
//
// A single shared password (ADMIN_PASSWORD env var) gates access. On login we
// set an httpOnly cookie whose value is an HMAC of a fixed string keyed by the
// password — so it can't be forged without knowing the password, and no
// session store is needed. Uses Web Crypto so it runs in both the edge
// middleware and Node route handlers.

export const ADMIN_COOKIE = "hg_admin";
const MESSAGE = "hg-care-admin-v1";

const encoder = new TextEncoder();

function toHex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function signToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(MESSAGE));
  return toHex(sig);
}

// Constant-time-ish string comparison.
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export function adminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

// Is the given cookie value a valid session token?
export async function isValidToken(token?: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !token) return false;
  return safeEqual(token, await signToken(password));
}
