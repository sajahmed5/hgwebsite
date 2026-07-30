import type { Metadata } from "next";
import Link from "next/link";
import { isDbConfigured, listApplications, getLanguageCounts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Applications — admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default async function AdminHome() {
  if (!isDbConfigured()) {
    return (
      <Shell>
        <div className="rounded-2xl border border-brand-200 bg-sand p-6 text-brand-900/80">
          <p className="font-semibold">The application database isn’t connected yet.</p>
          <p className="mt-2 text-sm">
            Add <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to your
            environment variables and run <code>supabase/schema.sql</code>. Applications will
            then appear here.
          </p>
        </div>
      </Shell>
    );
  }

  const [apps, langs] = await Promise.all([listApplications(), getLanguageCounts()]);
  const maxSpeakers = Math.max(1, ...langs.map((l) => l.speakers));

  return (
    <Shell>
      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <section>
          <h2 className="text-lg font-bold text-brand-900">
            Applications <span className="text-brand-900/40">({apps.length})</span>
          </h2>
          {apps.length === 0 ? (
            <p className="mt-4 text-sm text-brand-900/60">No applications yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-brand-100">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-brand-50 text-brand-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Received</th>
                    <th className="px-4 py-3 font-semibold">Availability</th>
                    <th className="px-4 py-3 font-semibold">Languages</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {apps.map((a) => (
                    <tr key={a.id} className="border-t border-brand-100 hover:bg-brand-50/50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-brand-900">
                          {[a.first_name, a.surname].filter(Boolean).join(" ") || "—"}
                        </div>
                        <div className="text-brand-900/50">{a.email}</div>
                      </td>
                      <td className="px-4 py-3 text-brand-900/70">{formatDate(a.created_at)}</td>
                      <td className="px-4 py-3 text-brand-900/70">{a.availability || "—"}</td>
                      <td className="px-4 py-3 text-brand-900/70">
                        {(a.languages ?? []).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/${a.id}`} className="font-semibold text-brand-700 hover:text-brand-900">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside>
          <h2 className="text-lg font-bold text-brand-900">Languages spoken</h2>
          {langs.length === 0 ? (
            <p className="mt-4 text-sm text-brand-900/60">No language data yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {langs.map((l) => (
                <li key={l.language}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-brand-900">{l.language}</span>
                    <span className="text-brand-900/60">{l.speakers}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-brand-100">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: `${Math.round((l.speakers / maxSpeakers) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">HG Care — applications</h1>
          <p className="text-sm text-brand-900/50">Confidential — for recruitment use only.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50">
            Sign out
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
