import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

// Statutory gender pay gap report. Deliberately unlisted: not linked from the
// nav or footer, kept out of the sitemap, and set to noindex.
export const metadata: Metadata = {
  title: "Gender Pay Gap Report",
  robots: { index: false, follow: false },
};

const SNAPSHOT = "5 April 2025";

// Workforce gender split — applied evenly across quartiles (single hourly rate).
const SPLIT = { women: "79.6%", men: "20.4%" };

// Declaration signatory.
const SIGNATORY = { name: "Sharjeel Ahed", title: "Director", date: "1 April 2026" };

// The six required figures. Hourly pay gaps 0.0%; no bonus scheme (nil figures).
const figures = [
  { label: "Mean gender pay gap (hourly pay)", value: "0.0%" },
  { label: "Median gender pay gap (hourly pay)", value: "0.0%" },
  { label: "Mean gender bonus gap", value: "N/A", note: "No bonuses paid" },
  { label: "Median gender bonus gap", value: "N/A", note: "No bonuses paid" },
  { label: "Men who received a bonus", value: "0%", note: "No bonuses paid" },
  { label: "Women who received a bonus", value: "0%", note: "No bonuses paid" },
];

const quartiles = ["Upper (highest paid)", "Upper middle", "Lower middle", "Lower (lowest paid)"];

export default function GenderPayGapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gender pay gap"
        title="Gender Pay Gap Report"
        subtitle={`${site.name} — snapshot date ${SNAPSHOT}. Reported in line with the Equality Act 2010 (Gender Pay Gap Information) Regulations 2017.`}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose-brand space-y-4 text-brand-900/80">
          <p>
            As an employer of 250 or more people, {site.name} is required to publish
            its gender pay gap each year. The gender pay gap measures the difference
            between the average pay of all men and all women across the whole
            organisation, expressed as a percentage. It is different from equal pay,
            which is about men and women being paid the same for the same or similar work.
          </p>
          <p>
            We do not operate a bonus or commission scheme, so all bonus-related
            figures are nil.
          </p>
        </div>

        {/* Why the gap is 0% — reassures readers the figure isn't arbitrary */}
        <div className="mt-8 rounded-2xl border-l-4 border-accent-500 bg-brand-50 p-6">
          <h2 className="text-lg font-bold text-brand-900">
            Why our hourly pay gap is 0.0%
          </h2>
          <p className="mt-2 text-sm text-brand-900/80">
            Every member of our care staff is paid on the same standardised hourly
            rate for their role, set the same way for everyone regardless of gender.
            Because men and women are paid on identical terms, the average (mean) and
            middle (median) hourly pay is the same for both — so the gap is genuinely
            0.0%, not an estimate.
          </p>
        </div>

        {/* The six required figures */}
        <h2 className="mt-12 text-xl font-bold text-brand-900">Our figures</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {figures.map((f) => (
            <div key={f.label} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className={`text-3xl font-extrabold ${f.value.startsWith("[") ? "text-accent-600" : "text-brand-800"}`}>{f.value}</div>
              <div className="mt-1 text-sm font-semibold text-brand-900">{f.label}</div>
              {f.note && <div className="mt-1 text-xs text-brand-900/50">{f.note}</div>}
            </div>
          ))}
        </div>

        {/* Pay quartiles */}
        <h2 className="mt-12 text-xl font-bold text-brand-900">
          Proportion of men and women in each pay quartile
        </h2>
        <p className="mt-2 text-sm text-brand-900/60">
          Staff are ranked by hourly pay and divided into four equal groups.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-brand-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-brand-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Quartile</th>
                <th className="px-4 py-3 font-semibold">Women</th>
                <th className="px-4 py-3 font-semibold">Men</th>
              </tr>
            </thead>
            <tbody>
              {quartiles.map((q) => (
                <tr key={q} className="border-t border-brand-100">
                  <td className="px-4 py-3 font-medium text-brand-900">{q}</td>
                  <td className="px-4 py-3 text-brand-900/80">{SPLIT.women}</td>
                  <td className="px-4 py-3 text-brand-900/80">{SPLIT.men}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-brand-900/50">
          As all staff are paid on the same hourly rate, each quartile reflects our
          overall workforce, which is {SPLIT.women} women and {SPLIT.men} men.
        </p>

        {/* Declaration */}
        <h2 className="mt-12 text-xl font-bold text-brand-900">Declaration</h2>
        <div className="mt-4 rounded-2xl bg-sand p-6 text-sm text-brand-900/80">
          <p>
            I confirm that the gender pay gap data contained in this report is accurate
            and has been calculated in accordance with the Equality Act 2010 (Gender Pay
            Gap Information) Regulations 2017.
          </p>
          <div className="mt-5 space-y-1 text-brand-900">
            <p><span className="font-semibold">Signed:</span> {SIGNATORY.name}</p>
            <p><span className="font-semibold">Job title:</span> {SIGNATORY.title}</p>
            <p><span className="font-semibold">Date:</span> {SIGNATORY.date}</p>
          </div>
        </div>
      </section>
    </>
  );
}
