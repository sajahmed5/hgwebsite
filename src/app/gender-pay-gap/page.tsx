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

// The six required figures. Pay/bonus gaps confirmed at 0.0%.
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
            All of our care staff are paid the same hourly rate regardless of gender,
            and we do not operate any bonus or commission scheme. Our mean and median
            gender pay gaps are both <strong>0.0%</strong>.
          </p>
        </div>

        {/* The six required figures */}
        <h2 className="mt-12 text-xl font-bold text-brand-900">Our figures</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {figures.map((f) => (
            <div key={f.label} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-brand-800">{f.value}</div>
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
                  <td className="px-4 py-3 text-accent-600">[ __% ]</td>
                  <td className="px-4 py-3 text-accent-600">[ __% ]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-accent-600">
          Draft — quartile percentages to be confirmed from your workforce gender split.
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
            <p><span className="font-semibold">Signed:</span> [ Name ]</p>
            <p><span className="font-semibold">Job title:</span> [ Job title ]</p>
            <p><span className="font-semibold">Date:</span> [ Date ]</p>
          </div>
        </div>
      </section>
    </>
  );
}
