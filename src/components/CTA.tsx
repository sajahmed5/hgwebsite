import Link from "next/link";
import { site } from "@/data/site";

export default function CTA({
  title = "Ready to arrange care?",
  text = "Speak to our friendly team for a no-obligation chat about how we can help you or your loved one.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-brand-700 px-6 py-12 text-center shadow-lg sm:px-12 sm:py-16">
        <div className="bg-soft-blob pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100/90">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 sm:w-auto"
            >
              Request care today
            </Link>
            <a
              href={site.phoneHref}
              className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
