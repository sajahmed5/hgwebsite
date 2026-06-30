import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site } from "@/data/site";
import CTA from "@/components/CTA";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-soft-blob border-b border-brand-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            ← All services
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-3xl">
              {service.icon}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-brand-900/70">
                {service.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-900">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    ✓
                  </span>
                  <span className="text-brand-900/80">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-sand p-7">
              <h3 className="text-lg font-bold text-brand-900">
                Care designed around you
              </h3>
              <p className="mt-2 text-brand-900/70">
                Every care plan starts with a free, no-obligation assessment. We
                take time to understand the routines, preferences and people that
                matter — then match carers who are the right fit. Plans are
                reviewed regularly and adapt as needs change.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-brand-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-brand-900">
                Talk to our team
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">
                Have a question about {service.title.toLowerCase()}? We&apos;re
                here to help — no pressure, no obligation.
              </p>
              <Link
                href="/contact"
                className="mt-5 block rounded-full bg-accent-500 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-accent-600"
              >
                Request care
              </Link>
              <a
                href={site.phoneHref}
                className="mt-3 block rounded-full border border-brand-200 px-6 py-3 text-center font-semibold text-brand-800 transition-colors hover:bg-brand-50"
              >
                Call {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900">Other ways we help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-2xl">{s.icon}</div>
                <h3 className="mt-3 font-bold text-brand-900">{s.title}</h3>
                <p className="mt-1.5 text-sm text-brand-900/70">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16" />
      <CTA />
      <div className="h-20" />
    </>
  );
}
