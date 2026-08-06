import { createClient } from "@supabase/supabase-js";
import { site } from "@/data/site";

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

const client = () =>
  createClient(url!, serviceKey!, { auth: { persistSession: false } });

export type ApplicationRow = {
  id: string;
  created_at: string;
  first_name: string | null;
  surname: string | null;
  email: string | null;
  mobile: string | null;
  availability: string | null;
  areas: string[] | null;
  languages: string[] | null;
  data: Record<string, unknown>;
};

// Summary rows for the admin list (no heavy `data` blob).
export async function listApplications(): Promise<ApplicationRow[]> {
  if (!isDbConfigured()) return [];
  const { data, error } = await client()
    .from("applications")
    .select("id, created_at, first_name, surname, email, mobile, availability, areas, languages")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("Supabase list error:", error);
    return [];
  }
  return (data ?? []) as ApplicationRow[];
}

// One full application (including the complete `data` record).
export async function getApplication(id: string): Promise<ApplicationRow | null> {
  if (!isDbConfigured()) return null;
  const { data, error } = await client()
    .from("applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Supabase get error:", error);
    return null;
  }
  return (data as ApplicationRow) ?? null;
}

export async function getLanguageCounts(): Promise<{ language: string; speakers: number }[]> {
  if (!isDbConfigured()) return [];
  const { data, error } = await client()
    .from("language_counts")
    .select("*");
  if (error) {
    console.error("Supabase language_counts error:", error);
    return [];
  }
  return (data ?? []) as { language: string; speakers: number }[];
}

// ─── Application email recipients (editable from the admin area) ───────────

const dedupe = (emails: string[]) =>
  emails
    .map((e) => e.trim())
    .filter(
      (e, i, all) =>
        e && all.findIndex((x) => x.toLowerCase() === e.toLowerCase()) === i
    );

// Where applications go when nothing has been configured in the database yet
// (mirrors the previous env-var behaviour).
export function defaultApplicationRecipients(): string[] {
  const primary = process.env.CONTACT_TO_EMAIL || site.email;
  const extra = (process.env.APPLICATION_EXTRA_EMAILS || "mariam@hgcare.co.uk")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return dedupe([primary, ...extra]);
}

const RECIPIENTS_KEY = "application_recipients";

// The current recipient list — from the database if set, else the default.
export async function getApplicationRecipients(): Promise<string[]> {
  if (!isDbConfigured()) return defaultApplicationRecipients();
  const { data, error } = await client()
    .from("app_settings")
    .select("value")
    .eq("key", RECIPIENTS_KEY)
    .maybeSingle();
  if (error) {
    console.error("Supabase settings read error:", error);
    return defaultApplicationRecipients();
  }
  const value = data?.value;
  return Array.isArray(value) && value.length
    ? dedupe(value.map(String))
    : defaultApplicationRecipients();
}

export async function setApplicationRecipients(
  emails: string[]
): Promise<{ ok: boolean; error?: string }> {
  if (!isDbConfigured())
    return { ok: false, error: "Database not configured." };
  const clean = dedupe(emails);
  if (clean.length === 0)
    return { ok: false, error: "Please keep at least one recipient." };
  const { error } = await client()
    .from("app_settings")
    .upsert(
      { key: RECIPIENTS_KEY, value: clean, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  if (error) {
    console.error("Supabase settings write error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

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

  const { error } = await client().from("applications").insert({
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
