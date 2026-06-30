import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import JobApplicationForm from "@/components/JobApplicationForm";
import { perks, recruitmentSteps } from "@/data/site";

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

      {/* Perks */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
            Why work with us?
          </h2>
          <p className="mt-4 text-brand-900/70">
            We look after our team as well as we look after the people we care
            for.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-brand-100 bg-white p-7 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {p.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-900">{p.title}</h3>
              <p className="mt-2 text-sm text-brand-900/70">{p.text}</p>
            </div>
          ))}
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

          <ol className="relative mt-16 grid gap-10 lg:grid-cols-6 lg:gap-6">
            {/* connecting line — horizontal on desktop, vertical on mobile */}
            <span
              aria-hidden
              className="absolute left-7 top-4 bottom-4 w-1 -translate-x-1/2 rounded bg-gradient-to-b from-brand-200 via-brand-300 to-accent-300 lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-1 lg:w-auto lg:translate-x-0 lg:bg-gradient-to-r"
            />
            {recruitmentSteps.map((s, i) => {
              const last = i === recruitmentSteps.length - 1;
              return (
                <li
                  key={s.title}
                  className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <div
                    className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-white shadow-sm ring-4 ring-cream ${
                      last ? "bg-accent-500" : "bg-brand-600"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="lg:mt-5">
                    <div className="text-3xl">{s.icon}</div>
                    <h3 className="mt-2 text-base font-bold text-brand-900">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-900/70">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-14 text-center">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-accent-600 hover:gap-3"
            >
              Start step 1 — apply now <span aria-hidden>→</span>
            </a>
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

            <div id="apply" className="scroll-mt-24 rounded-2xl border border-brand-100 bg-white p-7 shadow-sm sm:p-9">
              <h2 className="text-2xl font-bold text-brand-900">
                Apply to join us
              </h2>
              <p className="mt-2 text-brand-900/70">
                Fill in the form below and our recruitment team will be in touch.
              </p>
              <div className="mt-7">
                <JobApplicationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
