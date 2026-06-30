import { testimonials, site } from "@/data/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
            Kind words
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Loved by the families we care for
          </h2>
          <p className="mt-4 text-brand-900/70">
            Don&apos;t just take our word for it — here&apos;s what local families
            say about HG Care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 110}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-100 transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl leading-none text-accent-400" aria-hidden>
                &ldquo;
              </div>
              <blockquote className="mt-2 flex-1 text-brand-900/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
                <span aria-hidden>⭐⭐⭐⭐⭐</span>
              </figcaption>
              <p className="mt-1 text-sm text-brand-900/60">{t.author}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 font-semibold text-brand-800 transition-colors hover:bg-brand-50"
          >
            Read our Google reviews <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
