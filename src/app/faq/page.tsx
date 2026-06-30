import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about HG Care's home care services and about working with us — for families and for carers.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help & answers"
        title="Frequently asked questions"
        subtitle="Quick answers for families looking for care and for people thinking of joining our team. Can't see your question? Just get in touch."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Faq />
      </section>

      <CTA />
      <div className="h-20" />
    </>
  );
}
