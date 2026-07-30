import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ApplicationForm from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply to join us",
  description:
    "Apply to join HG Care online. Personal details, address & employment history, references and the safe-recruitment checks we need as a regulated care provider. No experience needed; full training provided.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job application"
        title="Apply to join HG Care"
        subtitle="Fill in the steps below — one short section at a time, and there are no tricky tests. Some sections are needed for our safe-recruitment (DBS) checks; the last one is voluntary. No experience is needed — we provide full, paid training."
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-brand-900/60">
          Prefer to chat first? See our{" "}
          <Link href="/careers" className="font-semibold text-brand-700">
            careers page
          </Link>{" "}
          or call us on 0161 975 5999.
        </p>
        <ApplicationForm />
      </section>
    </>
  );
}
