import Link from "next/link";
import { services, site, stats, values } from "@/data/site";
import CTA from "@/components/CTA";
import Affiliations from "@/components/Affiliations";
import Testimonials from "@/components/Testimonials";
import Councils from "@/components/Councils";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="bg-soft-blob relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              ⭐ Caring since {site.founded} · CQC rated {site.cqcRating}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
              Compassionate care,{" "}
              <span className="text-brand-600">in the comfort of home</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-900/70">
              {site.tagline}. HG Care provides warm, trusted home care for
              adults and children across {site.areasText} — from personal and
              dementia care to live-in, palliative and respite support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent-500 px-7 py-3.5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
              >
                Request care
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-brand-200 bg-white px-7 py-3.5 text-center font-semibold text-brand-800 transition-colors hover:bg-brand-50"
              >
                Explore our services
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-brand-900/60">
              <span className="font-medium">Need to talk now?</span>
              <a
                href={site.phoneHref}
                className="font-bold text-brand-700 hover:text-brand-900"
              >
                📞 {site.phone}
              </a>
            </div>
          </div>

          {/* Hero visual — pure CSS/SVG illustrative card */}
          <div className="reveal relative" style={{ animationDelay: "120ms" }}>
            <div className="relative rounded-2xl bg-white p-6 shadow-xl ring-1 ring-brand-100">
              <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">
                  Care that feels like family
                </p>
                <p className="mt-3 text-2xl font-bold leading-snug">
                  &ldquo;They treat my mum with such kindness and respect — it&apos;s
                  a weight off our whole family.&rdquo;
                </p>
                <p className="mt-4 text-sm text-brand-100">
                  — A daughter in Stockport
                </p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "❤️", v: "Person-centred" },
                  { k: "🛡️", v: "DBS-checked" },
                  { k: "🕐", v: "24/7 available" },
                ].map((b) => (
                  <div
                    key={b.v}
                    className="rounded-xl bg-brand-50 px-2 py-4 text-xs font-semibold text-brand-700"
                  >
                    <div className="text-2xl">{b.k}</div>
                    <div className="mt-1">{b.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-accent-500 px-5 py-4 text-white shadow-lg sm:block">
              <div className="text-2xl font-extrabold">{site.founded}</div>
              <div className="text-xs font-medium">caring since</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600 sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-brand-900/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Affiliations strip ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-900/50">
            Accredited &amp; trusted
          </p>
          <Affiliations compact />
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
            How we help
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Care tailored to every need
          </h2>
          <p className="mt-4 text-brand-900/70">
            Whatever level of support you&apos;re looking for, our experienced
            carers deliver it with warmth, patience and respect.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-brand-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {s.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-brand-900/70">{s.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                Learn more <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Areas we cover ---------- */}
      <section className="border-y border-brand-100 bg-brand-600">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">
                Proudly local
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Caring across the North West &amp; Midlands
              </h2>
            </div>
            <ul className="flex flex-wrap justify-center gap-3">
              {site.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20"
                >
                  📍 {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
                Why families choose us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                The values behind everything we do
              </h2>
              <p className="mt-4 text-brand-900/70">
                Since {site.founded} we&apos;ve cared for people across{" "}
                {site.areasText} as if they were our own family. Our carers are
                carefully recruited, fully trained and DBS-checked — and we never
                forget that we&apos;re a guest in your home.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3"
              >
                More about us <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100"
                >
                  <div className="text-3xl">{v.icon}</div>
                  <h3 className="mt-3 text-lg font-bold text-brand-900">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-900/70">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
            Simple to get started
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Arranging care in three easy steps
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Get in touch",
              d: "Call us or send an enquiry. We'll listen to your situation with no pressure and no obligation.",
            },
            {
              n: "2",
              t: "Free assessment",
              d: "We arrange a friendly home visit to understand needs, preferences and routines.",
            },
            {
              n: "3",
              t: "Your care begins",
              d: "We match you with the right carers and put a personalised care plan in place.",
            },
          ].map((step) => (
            <div key={step.n} className="relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                {step.n}
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-900">{step.t}</h3>
              <p className="mt-2 text-sm text-brand-900/70">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Council partnerships ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
            Trusted locally
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Councils have trusted us for years
          </h2>
          <p className="mt-4 text-brand-900/70">
            We work in partnership with local authorities to care for their
            residents — for over two decades in some areas.
          </p>
        </div>
        <div className="mt-12">
          <Councils />
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <Testimonials />

      {/* ---------- Careers teaser ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-2xl bg-brand-50 p-8 ring-1 ring-brand-100 sm:p-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
              Join our team
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-brand-900 sm:text-3xl">
              Build a rewarding career in care
            </h2>
            <p className="mt-3 max-w-xl text-brand-900/70">
              We&apos;re always looking for kind, dedicated people to join HG
              Care. Enjoy competitive pay, full training and real career
              progression — no experience necessary.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Link
              href="/careers"
              className="rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              View careers
            </Link>
          </div>
        </div>
      </section>

      <CTA />
      <div className="h-20" />
    </>
  );
}
