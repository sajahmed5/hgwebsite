import { councils } from "@/data/site";

export default function Councils() {
  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {councils.map((c) => (
        <div
          key={c.name}
          className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-100"
        >
          <div className="text-3xl font-extrabold text-brand-600">
            {c.years}
            <span className="text-base font-bold"> yr{c.years === 1 ? "" : "s"}</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-brand-900">
            {c.name}
          </div>
          {c.detail && (
            <div className="text-xs text-brand-900/55">{c.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
