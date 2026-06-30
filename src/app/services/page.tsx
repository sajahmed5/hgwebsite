import type { Metadata } from "next";
import Link from "next/link";
import {
  services,
  wellbeing,
  trainingCourses,
  site,
} from "@/data/site";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "What We Do — Care, Wellbeing & Training",
  description:
    "Everything HG Care offers — person-centred care services, HG Wellbeing and HG Training — across Manchester, Stockport, Coventry, Trafford, Rochdale & Liverpool.",
};

const sections = [
  { id: "care", label: "Care Services", icon: "🤝" },
  { id: "wellbeing", label: "HG Wellbeing", icon: "🌟" },
  { id: "training", label: "HG Training", icon: "🎓" },
];

// Bento layout — mixed tile sizes + colours so the services read as a
// dynamic mosaic rather than a uniform 6-box grid. Order maps to `services`.
const bento = [
  // Featured (big 2x2)
  {
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    bg: "bg-gradient-to-br from-brand-600 to-brand-800",
    title: "text-white",
    body: "text-brand-100/90",
    link: "text-white",
    iconBg: "bg-white/15",
  },
  // Wide
  {
    span: "sm:col-span-2 lg:col-span-2",
    bg: "bg-gradient-to-br from-accent-400 to-accent-600",
    title: "text-white",
    body: "text-white/90",
    link: "text-white",
    iconBg: "bg-white/20",
  },
  // Small
  {
    span: "lg:col-span-1",
    bg: "bg-brand-50",
    title: "text-brand-900",
    body: "text-brand-900/70",
    link: "text-brand-700",
    iconBg: "bg-white",
  },
  // Small (dark)
  {
    span: "lg:col-span-1",
    bg: "bg-gradient-to-br from-brand-700 to-brand-900",
    title: "text-white",
    body: "text-brand-100/90",
    link: "text-white",
    iconBg: "bg-white/15",
  },
  // Wide (light)
  {
    span: "sm:col-span-2 lg:col-span-2",
    bg: "bg-accent-50",
    title: "text-brand-900",
    body: "text-brand-900/70",
    link: "text-accent-700",
    iconBg: "bg-white",
  },
  // Wide
  {
    span: "sm:col-span-2 lg:col-span-2",
    bg: "bg-gradient-to-br from-brand-500 to-brand-700",
    title: "text-white",
    body: "text-brand-100/90",
    link: "text-white",
    iconBg: "bg-white/15",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="bg-soft-blob pointer-events-none absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">
            Everything we do
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Care, wellbeing &amp; training — all under one roof
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-100/90">
            From hands-on care that helps you live well at home, to looking after
            the whole person, to training the next generation of brilliant
            carers. Here&apos;s everything HG Care does.
          </p>

          {/* Jump nav */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
              >
                <span aria-hidden>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 1. Care Services ---------- */}
      <section id="care" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold text-brand-700">
              🤝 Our care services
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              Care tailored to every need
            </h2>
            <p className="mt-4 text-brand-900/70">
              Whatever level of support you&apos;re looking for, our experienced
              carers deliver it with warmth, patience and respect. Tap any
              service to learn more.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-flow-dense lg:grid-cols-4">
            {services.map((s, i) => {
              const b = bento[i % bento.length];
              const featured = i === 0;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={`group flex flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl ${b.bg} ${b.span}`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 ${b.iconBg}`}
                  >
                    {s.icon}
                  </div>
                  <div className="mt-4">
                    <h3 className={`font-bold ${featured ? "text-2xl" : "text-xl"} ${b.title}`}>
                      {s.title}
                    </h3>
                    <p className={`mt-1.5 text-sm leading-relaxed ${b.body}`}>
                      {featured ? s.summary : s.short}
                    </p>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-sm font-bold ${b.link} group-hover:gap-2`}
                    >
                      Learn more <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- 2. HG Wellbeing ---------- */}
      <section
        id="wellbeing"
        className="scroll-mt-20 bg-gradient-to-b from-accent-50 to-sand"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-bold text-accent-700">
              🌟 HG Wellbeing
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              Caring for the whole person
            </h2>
            <p className="mt-4 text-brand-900/70">
              Great care is about so much more than daily tasks. HG Wellbeing is
              our commitment to health, happiness and human connection — helping
              people live life as fully as possible.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {wellbeing.map((w) => (
              <div key={w.title} className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-accent-200">
                  {w.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-900">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-900/70">
                    {w.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-white/70 p-8 text-center shadow-sm ring-1 ring-accent-100 backdrop-blur">
            <p className="text-lg font-medium text-brand-800">
              &ldquo;Wherever we provide care, HG Wellbeing comes as standard —
              because the small things, like brightening someone&apos;s day,
              matter most.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 3. HG Training ---------- */}
      <section id="training" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold text-brand-700">
                🎓 HG Training
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                Skilled, confident, exceptional carers
              </h2>
              <div className="mt-5 space-y-4 text-brand-900/80">
                <p>
                  Outstanding care starts with outstanding training. Every HG
                  carer completes a thorough induction and the nationally
                  recognised Care Certificate before working independently.
                </p>
                <p>
                  Learning never stops — we deliver training in-house and with
                  accredited education partners, with regular refreshers, NVQs
                  and specialist modules throughout your career.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-brand-600 p-6 text-white shadow-sm">
                <h3 className="text-lg font-bold">New to care? No problem. ✨</h3>
                <p className="mt-2 text-sm text-brand-100/90">
                  You don&apos;t need experience to join us — just the right
                  attitude. We&apos;ll give you all the training, support and
                  qualifications you need to thrive.
                </p>
                <Link
                  href="/careers"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-600 hover:gap-2"
                >
                  Start your care career <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-brand-900">
                Courses we provide
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {trainingCourses.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-sm font-bold text-accent-700">
                      ✓
                    </span>
                    <span className="text-sm text-brand-900/80">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Not sure which service you need?"
        text={`Our friendly team will help you find the right support. Call ${site.phone} or send an enquiry — no pressure, no obligation.`}
      />
      <div className="h-20" />
    </>
  );
}
