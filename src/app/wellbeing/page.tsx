import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "HG Wellbeing",
  description:
    "HG Wellbeing supports the whole person — promoting health, happiness, social connection and independence through enriching activities and holistic support.",
};

const offerings = [
  {
    icon: "🧘",
    title: "Holistic support",
    text: "Care that looks after mind and body — emotional wellbeing, confidence and a sense of purpose, not just practical tasks.",
  },
  {
    icon: "🤗",
    title: "Companionship",
    text: "Friendly visits and genuine connection to tackle loneliness and keep spirits high.",
  },
  {
    icon: "🎨",
    title: "Meaningful activities",
    text: "Hobbies, gentle exercise and outings tailored to interests, helping people stay active and engaged.",
  },
  {
    icon: "🌳",
    title: "Community connection",
    text: "Support to get out and about — to clubs, appointments, places of worship and local life.",
  },
  {
    icon: "🥗",
    title: "Healthy living",
    text: "Encouragement with nutrition, hydration and routines that support long-term health.",
  },
  {
    icon: "💬",
    title: "A listening ear",
    text: "Time, patience and reassurance — for the people we care for and the families who love them.",
  },
];

export default function WellbeingPage() {
  return (
    <>
      <PageHeader
        eyebrow="HG Wellbeing"
        title="Caring for the whole person"
        subtitle="Great care is about so much more than daily tasks. HG Wellbeing is our commitment to health, happiness and human connection — helping people live life as fully as possible."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="rounded-2xl border border-brand-100 bg-white p-7 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {o.icon}
              </div>
              <h2 className="mt-5 text-xl font-bold text-brand-900">{o.title}</h2>
              <p className="mt-2 text-sm text-brand-900/70">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
            Wellbeing woven into every visit
          </h2>
          <p className="mt-4 text-brand-900/70">
            Wherever we provide care, HG Wellbeing comes as standard. Our carers
            are trained to notice the small things — a change in mood, a missed
            meal, a chance to brighten someone&apos;s day — because those moments
            matter most.
          </p>
        </div>
      </section>

      <div className="h-16" />
      <CTA title="Want to know more about HG Wellbeing?" />
      <div className="h-20" />
    </>
  );
}
