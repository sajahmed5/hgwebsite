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

          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HG Care on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-brand-50 transition-colors hover:bg-accent-500 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.75.07-.9.04-1.4.2-1.72.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.12.33-.28.83-.32 1.73C3.38 9.1 3.37 9.45 3.37 12s0 2.9.07 4.15c.04.9.2 1.4.32 1.72.17.44.38.75.7 1.06.32.32.63.53 1.06.7.32.12.82.28 1.72.32 1.25.06 1.6.07 4.75.07s3.5 0 4.75-.07c.9-.04 1.4-.2 1.72-.32.44-.17.75-.38 1.06-.7.32-.31.53-.62.7-1.06.12-.32.28-.82.32-1.72.06-1.25.07-1.6.07-4.15s0-2.9-.07-4.15c-.04-.9-.2-1.4-.32-1.73a2.9 2.9 0 0 0-.7-1.05 2.9 2.9 0 0 0-1.06-.7c-.32-.12-.82-.28-1.72-.32C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.93a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
              </svg>
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HG Care on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-brand-50 transition-colors hover:bg-accent-500 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.46c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9V9Z" />
              </svg>
            </a>
          </div>
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
            <li>
              <Link
                href="/faq"
                className="text-brand-100/80 transition-colors hover:text-white"
              >
                FAQ
              </Link>
            </li>
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
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy &amp; cookies
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
