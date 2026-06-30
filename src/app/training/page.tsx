import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "HG Training",
  description:
    "HG Training delivers in-house and accredited care training — giving our team the skills, confidence and qualifications to deliver outstanding care.",
};

const courses = [
  "Care Certificate (the 15 standards)",
  "Safeguarding adults & children",
  "Moving & handling",
  "Medication administration",
  "Dementia awareness & best practice",
  "First aid & basic life support",
  "Infection prevention & control",
  "Mental capacity & dignity in care",
];

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow="HG Training"
        title="Skilled, confident, exceptional carers"
        subtitle="Outstanding care starts with outstanding training. Through HG Training we develop every team member — both in-house and through accredited education partners."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
              Training that never stops
            </h2>
            <div className="mt-5 space-y-4 text-brand-900/80">
              <p>
                Every HG carer completes a thorough induction and the nationally
                recognised Care Certificate before working independently. From
                there, learning continues throughout their career with regular
                refreshers, specialist modules and hands-on mentoring.
              </p>
              <p>
                We deliver training both in-house and in partnership with
                accredited education centres, so our team is always up to date
                with the latest standards and best practice in care.
              </p>
              <p>
                The result? Carers who are skilled, confident and genuinely
                proud of the work they do — and families who can trust the care
                being delivered.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
              <h3 className="font-bold text-brand-900">
                New to care? No problem.
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">
                You don&apos;t need experience to join us — just the right
                attitude. We&apos;ll give you all the training, support and
                qualifications you need to thrive.
              </p>
              <Link
                href="/careers"
                className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700 hover:gap-2"
              >
                See careers at HG Care <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-brand-900">
              Courses we provide
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {courses.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    ✓
                  </span>
                  <span className="text-sm text-brand-900/80">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA
        title="Looking to start a career in care?"
        text="Join a team that invests in you from day one. Browse our current vacancies and apply today."
      />
      <div className="h-20" />
    </>
  );
}
