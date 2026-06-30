import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Our Care Services",
  description:
    "Explore HG Care's home care across Manchester, Stockport, Coventry, Trafford & Rochdale — personal & adult care, dementia care, children's services, live-in & 24-hour, palliative and respite care.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Care that fits around your life"
        subtitle="From a little help each day to round-the-clock live-in support, we tailor our care to you. Explore the ways we can help below."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col rounded-2xl border border-brand-100 bg-white p-7 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {s.icon}
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-900">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm text-brand-900/70">{s.summary}</p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTA />
      <div className="h-20" />
    </>
  );
}
