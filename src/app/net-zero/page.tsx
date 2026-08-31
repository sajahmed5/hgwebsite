import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Net Zero by 2050",
  description:
    "HG Care's plan to reach net zero greenhouse gas emissions by 2050 — reducing our carbon footprint, improving energy efficiency and promoting sustainable practices across our care operations.",
};

const objectives = [
  "Reduce our carbon footprint",
  "Increase energy efficiency",
  "Promote sustainable practices",
  "Engage stakeholders and the community",
  "Continuously monitor and improve",
];

const sections = [
  {
    title: "Reduce our carbon footprint",
    groups: [
      {
        name: "Transport",
        items: [
          "Transition to a fully electric vehicle (EV) fleet by 2035 for all agency-operated transport.",
          "Encourage staff and families to use public transport, car-pooling or cycling — with incentives such as travel subsidies and secure bike storage.",
          "Use telehealth and remote-working options to reduce the need for travel.",
        ],
      },
      {
        name: "Energy consumption",
        items: [
          "Source 100% renewable energy for all facilities by 2040.",
          "Install solar panels and other renewable energy systems at agency-owned properties.",
          "Fit energy-efficient lighting, heating and cooling systems.",
        ],
      },
    ],
  },
  {
    title: "Increase energy efficiency",
    groups: [
      {
        name: "Facility management",
        items: [
          "Conduct regular energy audits to identify and address inefficiencies.",
          "Upgrade insulation, windows and doors to reduce energy loss.",
          "Use smart-building technologies to optimise energy use.",
        ],
      },
      {
        name: "Equipment & appliances",
        items: [
          "Replace all equipment and appliances with energy-efficient models by 2030.",
          "Maintain a service schedule so equipment runs at peak efficiency.",
        ],
      },
    ],
  },
  {
    title: "Promote sustainable practices",
    groups: [
      {
        name: "Waste management",
        items: [
          "Achieve zero waste to landfill by 2045 through comprehensive recycling and composting.",
          "Reduce single-use plastics and switch to biodegradable, reusable products.",
          "Adopt a digital-first approach to minimise paper use.",
        ],
      },
      {
        name: "Water conservation",
        items: [
          "Install water-saving fixtures and appliances in all facilities.",
          "Introduce rainwater harvesting for landscape irrigation.",
          "Check regularly for leaks and fix them promptly.",
        ],
      },
    ],
  },
  {
    title: "Engage stakeholders and the community",
    groups: [
      {
        name: "Staff & client education",
        items: [
          "Provide ongoing training for staff on sustainable practices and reducing carbon footprints.",
          "Involve the people we care for in sustainability activities, such as gardening and recycling.",
        ],
      },
      {
        name: "Partnerships & collaboration",
        items: [
          "Work with local government, NGOs and other organisations on community sustainability.",
          "Take part in industry forums and share best practice for reaching net zero.",
        ],
      },
    ],
  },
  {
    title: "Continuously monitor and improve",
    groups: [
      {
        name: "Performance tracking",
        items: [
          "Set key performance indicators (KPIs) to measure progress towards net zero.",
          "Use monitoring tools to track energy use, waste and emissions.",
        ],
      },
      {
        name: "Reporting & accountability",
        items: [
          "Publish annual sustainability reports detailing our progress.",
          "Engage an independent auditor to review and verify our performance.",
        ],
      },
      {
        name: "Innovation & adaptation",
        items: [
          "Invest in new technologies and practices that support sustainability.",
          "Review and update this plan regularly to reflect new insights and advances.",
        ],
      },
    ],
  },
];

export default function NetZeroPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        title="Net Zero by 2050"
        subtitle={`${site.name} is committed to reaching net zero greenhouse gas emissions by 2050 — while continuing to deliver high-quality care.`}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-brand-900/80">
          As a leading care provider, {site.name} is committed to achieving net zero
          greenhouse gas emissions by 2050. This plan sets out the key initiatives
          across our operations to minimise our environmental impact while continuing
          to provide high-quality care. It aligns with global efforts to tackle climate
          change and to build a more sustainable future.
        </p>

        {/* Key objectives */}
        <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-lg font-bold text-brand-900">Our key objectives</h2>
          <ol className="mt-4 space-y-2">
            {objectives.map((o, i) => (
              <li key={o} className="flex items-start gap-3 text-brand-900/80">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-medium">{o}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Detailed sections */}
        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2 className="flex items-baseline gap-3 text-xl font-bold text-brand-900">
                <span className="text-2xl font-extrabold text-brand-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-5 border-l-2 border-brand-100 pl-5">
                {s.groups.map((g) => (
                  <div key={g.name}>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">
                      {g.name}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-brand-900/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 rounded-2xl bg-sand p-6">
          <h2 className="text-lg font-bold text-brand-900">Our commitment</h2>
          <p className="mt-2 text-sm text-brand-900/80">
            Reaching net zero by 2050 takes dedication, innovation and collaboration.
            At {site.name} we are committed to bold steps towards a sustainable future —
            ensuring our operations not only provide exceptional care but also contribute
            positively to the environment. Through strategic initiatives, stakeholder
            engagement and continuous improvement, we will reach our net zero goals and
            set an example for the care sector and beyond.
          </p>
        </div>
      </section>
    </>
  );
}
