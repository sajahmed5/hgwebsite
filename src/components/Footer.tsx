import Link from "next/link";
import { nav, services, site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-800 text-brand-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-brand-100/80">
            {site.tagline}. Compassionate home care for adults and children
            across {site.areasText}, since {site.founded}.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-brand-50">
            🛡️ CQC rated {site.cqcRating}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-brand-100/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            Our care
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-brand-100/80 transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                📞 {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-white">
                ✉️ {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                📍 {site.address.line1}, {site.address.line2},{" "}
                {site.address.city}, {site.address.postcode}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-brand-200/70 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Accredited home care across {site.areasText}.</p>
        </div>
      </div>
    </footer>
  );
}
