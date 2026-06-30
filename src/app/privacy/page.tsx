import type { Metadata } from "next";
import { site } from "@/data/site";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HG Care collects, uses and protects your personal information when you contact us or apply for a role.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your privacy"
        title="Privacy & cookie policy"
        subtitle="How we look after the information you share with us. We keep this short and in plain English."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10 text-brand-900/80">
          <div>
            <h2 className="text-xl font-bold text-brand-900">Who we are</h2>
            <p className="mt-3">
              {site.name} is a home care provider based at {site.address.line1},{" "}
              {site.address.line2}, {site.address.city}, {site.address.postcode}.
              We are the &ldquo;data controller&rdquo; for the information you
              provide through this website. You can reach us on{" "}
              <a href={site.phoneHref} className="font-semibold text-brand-700">
                {site.phone}
              </a>{" "}
              or{" "}
              <a href={site.emailHref} className="font-semibold text-brand-700">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">
              What we collect &amp; why
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Care enquiries.</strong> When you use our contact form we
                collect your name, contact details and what you tell us, so we can
                respond and arrange care.
              </li>
              <li>
                <strong>Job applications.</strong> When you apply to work with us
                we collect the details on the application form — including your
                contact details, address and employment history, and your
                referees&apos; contact details — so we can consider your
                application and take up references.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Our lawful basis</h2>
            <p className="mt-3">
              We process enquiry information to take steps at your request and to
              provide our services. We process application information to take
              steps towards entering an employment relationship and for our
              legitimate interest in recruiting suitable staff. We only contact
              your referees with your consent, which you give on the form.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">
              How long we keep it
            </h2>
            <p className="mt-3">
              We keep your information only as long as necessary — to respond to
              your enquiry, to manage recruitment, and to meet our legal and
              regulatory duties as a care provider. Unsuccessful application data
              is kept for a limited period and then securely deleted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">
              Who we share it with
            </h2>
            <p className="mt-3">
              We do not sell your data. We only share it where necessary — for
              example with regulators such as the Care Quality Commission where
              required, or trusted providers who help us run our service (such as
              our email provider). Referees you list will be contacted as part of
              recruitment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Cookies</h2>
            <p className="mt-3">
              This website does not use advertising or tracking cookies. We use the
              Google Maps embed on our Contact page, which may set cookies from
              Google when it loads. You can control cookies through your browser
              settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900">Your rights</h2>
            <p className="mt-3">
              You have the right to ask for a copy of your information, to have it
              corrected or deleted, and to object to or restrict how we use it. To
              make a request, or if you have any concerns, contact us at{" "}
              <a href={site.emailHref} className="font-semibold text-brand-700">
                {site.email}
              </a>
              . You also have the right to complain to the Information
              Commissioner&apos;s Office (ico.org.uk).
            </p>
          </div>

          <p className="rounded-2xl bg-sand p-5 text-sm text-brand-900/60">
            This policy is provided as a clear, general summary. We recommend
            having it reviewed against your full data-protection arrangements
            before relying on it for compliance.
          </p>
        </div>
      </section>
    </>
  );
}
