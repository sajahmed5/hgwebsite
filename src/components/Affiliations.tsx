import { affiliations, type Affiliation } from "@/data/site";

// Brand-styled accreditation badges. These are original HG Care designs that name
// each accreditation — not reproductions of the certification bodies' logos.

function Emblem({ a }: { a: Affiliation }) {
  const [iso, num] = a.label.split(" ");
  const base =
    "relative flex h-20 w-20 flex-col items-center justify-center rounded-full text-white shadow-sm";

  if (a.kind === "iso") {
    return (
      <div
        className={`${base} ring-4 ring-brand-100 ${
          a.soon ? "bg-brand-400" : "bg-brand-600"
        }`}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em]">{iso}</span>
        <span className="text-lg font-extrabold leading-none">{num}</span>
        {a.soon && (
          <span className="absolute -bottom-2 rounded-full bg-accent-500 px-2 py-0.5 text-[9px] font-bold text-white shadow">
            Coming soon
          </span>
        )}
      </div>
    );
  }

  if (a.kind === "cqc") {
    return (
      <div className={`${base} bg-accent-500 ring-4 ring-accent-100`}>
        <span className="text-xl font-extrabold leading-none">CQC</span>
        <span className="mt-0.5 text-[9px] font-semibold tracking-wide">GOOD</span>
      </div>
    );
  }

  // member
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-3xl ring-4 ring-brand-100">
      🤝
    </div>
  );
}

function Badge({ a }: { a: Affiliation }) {
  const inner = (
    <div className="flex flex-col items-center text-center">
      <Emblem a={a} />
      <div className="mt-4 font-bold text-brand-900">{a.label}</div>
      <div className="mt-0.5 text-xs text-brand-900/60">{a.line}</div>
    </div>
  );

  if (a.href) {
    return (
      <a
        href={a.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl p-3 transition-transform hover:-translate-y-1"
      >
        {inner}
      </a>
    );
  }
  return <div className="rounded-2xl p-3">{inner}</div>;
}

export default function Affiliations({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-x-4 gap-y-8 ${
        compact
          ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-7"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {affiliations.map((a) => (
        <Badge key={a.label} a={a} />
      ))}
    </div>
  );
}
