import type { Metadata } from "next";
import Link from "next/link";
import { isDbConfigured, getApplicationRecipients } from "@/lib/db";
import RecipientsForm from "./RecipientsForm";

export const metadata: Metadata = {
  title: "Settings — admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const dbReady = isDbConfigured();
  const recipients = dbReady ? await getApplicationRecipients() : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
          ← Applications
        </Link>
        <form action="/api/admin/logout" method="post">
          <button className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50">
            Sign out
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold text-brand-900">Settings</h1>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-brand-900">Application email recipients</h2>
        <p className="mt-1 text-sm text-brand-900/60">
          Everyone listed here receives an email (with the PDF attached) each time
          someone submits a job application.
        </p>

        {dbReady ? (
          <RecipientsForm initial={recipients} />
        ) : (
          <p className="mt-4 rounded-2xl border border-brand-200 bg-sand p-4 text-sm text-brand-900/70">
            The database isn’t connected, so recipients can’t be edited here yet.
          </p>
        )}
      </section>
    </div>
  );
}
