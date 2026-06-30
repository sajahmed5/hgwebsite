import type { Metadata } from "next";
import { site, offices, officeMapsHref } from "@/data/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HG Care. Call 0161 975 5999, email hello@hgcare.co.uk, or visit one of our offices in Stockport, Liverpool, Rochdale and Coventry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Let's talk about care"
        subtitle="Whether you're arranging care for a loved one or have a question, our friendly team is here to help — with no pressure and no obligation."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-900">Get in touch</h2>
            <p className="mt-3 text-brand-900/70">
              Prefer to talk? We&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href={site.phoneHref}
                className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:border-brand-200"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
                  📞
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-900/60">
                    Call us
                  </span>
                  <span className="block text-lg font-bold text-brand-800">
                    {site.phone}
                  </span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:border-brand-200"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
                  ✉️
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-900/60">
                    Email us
                  </span>
                  <span className="block text-lg font-bold text-brand-800">
                    {site.email}
                  </span>
                </span>
              </a>

              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:border-brand-200"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
                  📍
                </span>
                <span>
                  <span className="block text-sm font-semibold text-brand-900/60">
                    Visit us
                  </span>
                  <span className="block font-bold text-brand-800">
                    {site.address.line1}, {site.address.line2},{" "}
                    {site.address.city}, {site.address.postcode}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 shadow-sm">
              <iframe
                title="HG Care Services, Stockport — Google Maps"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=HG+Care+Services,+Heaton+Mersey,+Stockport+SK4+3GN&output=embed"
                className="block"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-brand-100 bg-white p-7 shadow-sm sm:p-9">
              <h2 className="text-2xl font-bold text-brand-900">
                Send us an enquiry
              </h2>
              <p className="mt-2 text-brand-900/70">
                Fill in the form and we&apos;ll get back to you as soon as we can.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our offices */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
              Our offices
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900">
              Find us across the North West &amp; Midlands
            </h2>
            <p className="mt-4 text-brand-900/70">
              Four offices supporting families in {site.areasText}. Call us on{" "}
              <a href={site.phoneHref} className="font-semibold text-brand-700">
                {site.phone}
              </a>{" "}
              — whichever location is nearest to you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <div
                key={o.name}
                className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-brand-900">{o.name}</h3>
                <address className="mt-3 flex-1 text-sm not-italic leading-relaxed text-brand-900/70">
                  {o.org && <span className="block font-semibold">{o.org}</span>}
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="block">{o.city}</span>
                  <span className="block font-semibold text-brand-800">
                    {o.postcode}
                  </span>
                </address>
                <a
                  href={officeMapsHref(o)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2"
                >
                  Get directions <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
