import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-soft-blob">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="text-6xl font-extrabold text-brand-300">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 max-w-md text-brand-900/70">
          The page you&apos;re looking for may have moved. Let&apos;s get you back
          on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-brand-200 bg-white px-7 py-3.5 font-semibold text-brand-800 transition-colors hover:bg-brand-50"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
