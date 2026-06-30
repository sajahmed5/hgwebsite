import type { Metadata } from "next";
import { site, values, stats } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Affiliations from "@/components/Affiliations";
import Councils from "@/components/Councils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HG Care — a trusted home care provider caring for adults and children since 2002 across Manchester, Stockport, Coventry, Trafford, Rochdale and Liverpool. CQC rated Good.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About HG Care"
        title="Caring for our community since 2002"
        subtitle="We're a local, family-minded home care provider built on a simple belief — that everyone deserves to be cared for with warmth, dignity and respect."
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-brand-900/80">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
              Our story
            </h2>
            <p>
              Since {site.founded}, HG Care has been supporting people to live
              well at home across {site.areasText}. What began as a small local
              team has grown into one of the area&apos;s most trusted care
              providers — but our values have never changed.
            </p>
            <p>
              We provide care for adults and children alike: from personal and
              dementia care to children&apos;s befriending, live-in and 24-hour
              support. Every member of our team is carefully recruited, trained
              in-house and DBS-checked, because the people we care for deserve
              nothing less.
            </p>
            <p>
              We work closely with families, councils and healthcare
              professionals, and we&apos;re proud to be rated{" "}
              <strong className="text-brand-700">&ldquo;Good&rdquo;</strong> by
              the Care Quality Commission (CQC) — so you can have complete
              confidence in the care you receive.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-sand p-6 text-center"
              >
                <div className="text-3xl font-extrabold text-brand-600">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-brand-900/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-200">
            Our mission
          </p>
          <p className="mt-5 text-2xl font-bold leading-relaxed sm:text-3xl">
            &ldquo;{site.tagline}.&rdquo;
          </p>
          <p className="mt-5 text-brand-100/90">
            We exist to help people stay safe, independent and happy in the place
            they love most — their own home.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
            What we stand for
          </h2>
          <p className="mt-4 text-brand-900/70">
            These values guide every visit, every care plan and every decision we
            make.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-brand-900">{v.title}</h3>
              <p className="mt-1.5 text-sm text-brand-900/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Council partnerships */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
            Trusted locally
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900">
            Working in partnership with local councils
          </h2>
          <p className="mt-4 text-brand-900/70">
            Local authorities have trusted us to deliver care for their residents
            for many years — a measure of the consistency and quality we provide.
          </p>
        </div>
        <div className="mt-12">
          <Councils />
        </div>
      </section>

      {/* Accreditations & affiliations */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
              Awards &amp; affiliations
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900">
              Care you can trust
            </h2>
            <p className="mt-4 text-brand-900/70">
              We hold ourselves to the highest standards — accredited, registered and
              proud members of respected industry bodies.
            </p>
          </div>
          <div className="mt-12">
            <Affiliations />
          </div>
        </div>
      </section>

      <CTA />
      <div className="h-20" />
    </>
  );
}
