import { createClient } from "@supabase/supabase-js";

// Persisting job applications to Supabase (Postgres).
//
// Configured through environment variables so no secrets live in code:
//   SUPABASE_URL                – your project URL (Settings → API)
//   SUPABASE_SERVICE_ROLE_KEY   – the service_role key (server-side only!)
//
// If these aren't set, saving is skipped (and logged) so the form still works
// during local development or before the database is wired up. The email
// notification is unaffected either way.

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isDbConfigured = () => Boolean(url && serviceKey);

// Split the comma-joined strings the form sends (e.g. "Urdu, Twi") into a
// clean array for the text[] columns that power reporting.
const toArray = (v: unknown) =>
  String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export async function saveApplication(
  payload: Record<string, unknown>
): Promise<{ ok: boolean }> {
  if (!isDbConfigured()) {
    console.log("🗄️  [application] database not configured — save skipped");
    return { ok: true };
  }

  const str = (k: string) => String(payload[k] ?? "").trim();
  const supabase = createClient(url!, serviceKey!, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("applications").insert({
    first_name: str("firstName"),
    surname: str("surname"),
    email: str("email"),
    mobile: str("mobile"),
    availability: str("availability"),
    areas: toArray(payload["areas"]),
    shift_hours: toArray(payload["shiftHours"]),
    languages: toArray(payload["languages"]),
    right_to_work: str("rightToWork"),
    driving_licence: str("drivingLicence"),
    data: payload,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { ok: false };
  }
  return { ok: true };
}
