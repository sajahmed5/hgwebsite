import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { perks, site } from "@/data/site";
import RecruitmentJourney from "@/components/RecruitmentJourney";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join HG Care. Rewarding care jobs across Manchester, Stockport, Coventry, Trafford, Rochdale and Liverpool — excellent salary, full training and qualifications. No experience needed. Apply today.",
};

const roles = [
  { title: "Care Assistant", type: "Full & part-time", area: "All areas" },
  { title: "Senior Carer", type: "Full-time", area: "Manchester / Stockport" },
  { title: "Live-in Carer", type: "Live-in", area: "All areas" },
  { title: "Children's Support Worker", type: "Flexible", area: "All areas" },
  { title: "Night Carer", type: "Nights", area: "Manchester / Stockport" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers at HG Care"
        title="A career that truly matters"
        subtitle="Looking for rewarding work that makes a real difference? Join one of the region's most trusted care teams — excellent salary, full training and qualifications, no experience necessary."
      />

      {/* Why work with us — editorial numbered list */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Sticky intro */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
                Why work with us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 sm:text-4xl">
                We look after our team, too
              </h2>
              <p className="mt-4 text-brand-900/70">
                Care works both ways. We back our people with everything they
                need to do brilliant work and build a career they&apos;re proud
                of.
              </p>
              <a
                href="#apply"
                className="mt-6 inline-flex items-center gap-2 font-bold text-brand-700 hover:gap-3"
              >
                Apply today <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* The list */}
          <ol className="lg:col-span-8">
            {perks.map((p, i) => (
              <li
                key={p.title}
                className="group flex items-start gap-5 border-t border-brand-100 py-7 transition-colors first:border-t-0 sm:gap-8"
              >
                <span className="w-12 shrink-0 text-2xl font-extrabold tabular-nums text-brand-200 transition-colors group-hover:text-accent-400 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-3xl transition-transform group-hover:-translate-y-0.5 sm:text-4xl">
                  {p.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-900 sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-brand-900/70">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Recruitment roadmap */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-sand">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-bold text-accent-700">
              🗺️ Your journey with us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              From application to a rewarding career
            </h2>
            <p className="mt-4 text-brand-900/70">
              Here&apos;s exactly how joining HG Care works — we&apos;ll be right
              beside you at every step of the way.
            </p>
          </div>

          <RecruitmentJourney />

          <div className="mt-10 text-center">
            <Link
              href="/careers/apply"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-accent-600 hover:gap-3"
            >
              Start your application <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Roles + form */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
                Current vacancies
              </h2>
              <p className="mt-3 text-brand-900/70">
                We&apos;re always recruiting kind, reliable people. If you
                don&apos;t see your exact role, apply anyway — we&apos;d still
                love to hear from you.
              </p>
              <ul className="mt-8 space-y-4">
                {roles.map((r) => (
                  <li
                    key={r.title}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <h3 className="font-bold text-brand-900">{r.title}</h3>
                      <p className="text-sm text-brand-900/60">{r.area}</p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {r.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="apply" className="scroll-mt-24 flex flex-col justify-center rounded-2xl bg-brand-700 p-8 text-center text-white shadow-sm sm:p-10">
              <div className="text-4xl">📝</div>
              <h2 className="mt-4 text-2xl font-bold">Apply to join us</h2>
              <p className="mx-auto mt-3 max-w-sm text-brand-100/90">
                Ready to start? Our online application takes you through a few
                short steps — personal details, experience and references. No
                experience needed.
              </p>
              <Link
                href="/careers/apply"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white transition-colors hover:bg-accent-600 hover:gap-3"
              >
                Start your application <span aria-hidden>→</span>
              </Link>
              <p className="mt-4 text-sm text-brand-100/70">
                Prefer to talk first? Call {site.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
