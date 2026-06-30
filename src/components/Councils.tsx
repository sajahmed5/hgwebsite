import { councils } from "@/data/site";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Councils() {
  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {councils.map((c, i) => (
        <Reveal
          key={c.name}
          delay={i * 90}
          className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-100 transition-transform hover:-translate-y-1"
        >
          <div className="text-3xl font-extrabold text-brand-600">
            <CountUp value={String(c.years)} />
            <span className="text-base font-bold"> yr{c.years === 1 ? "" : "s"}</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-brand-900">
            {c.name}
          </div>
          {c.detail && (
            <div className="text-xs text-brand-900/55">{c.detail}</div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
