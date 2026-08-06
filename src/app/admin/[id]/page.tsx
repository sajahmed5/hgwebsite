import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplication } from "@/lib/db";
import { APPLICATION_LAYOUT } from "@/lib/applicationFields";

export const metadata: Metadata = {
  title: "Application — admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) notFound();

  const data = app.data ?? {};
  const val = (k: string) => {
    const v = data[k];
    return v == null || v === "" ? "—" : String(v);
  };

  const name = [app.first_name, app.surname].filter(Boolean).join(" ") || "Application";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
          ← All applications
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={`/api/admin/applications/${app.id}/pdf`}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            ⬇ Download PDF
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-brand-900">{name}</h1>
      <p className="mt-1 text-sm text-brand-900/50">
        Received{" "}
        {new Date(app.created_at).toLocaleString("en-GB", {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </p>

      <div className="mt-8 space-y-6">
        {APPLICATION_LAYOUT.map((block) => (
          <section key={block.section} className="overflow-hidden rounded-2xl border border-brand-100">
            <h2 className="bg-brand-700 px-4 py-2.5 text-sm font-bold text-white">
              {block.section}
            </h2>
            <dl className="divide-y divide-brand-100">
              {block.fields.map(([key, label]) => (
                <div key={key} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[220px_1fr]">
                  <dt className="text-sm font-semibold text-brand-700">{label}</dt>
                  <dd className="whitespace-pre-wrap text-sm text-brand-900">{val(key)}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
