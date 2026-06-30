"use client";

import { useState } from "react";
import { affiliations, type Affiliation } from "@/data/site";

// Shows each accreditation's official logo from /public/logos when available,
// otherwise a brand-styled fallback badge (so nothing looks broken before the
// real logo files are added).

function Emblem({ a }: { a: Affiliation }) {
  const [iso, num] = a.label.split(" ");
  const base =
    "relative flex h-16 w-16 flex-col items-center justify-center rounded-full text-white";

  if (a.kind === "iso") {
    return (
      <div className={`${base} ${a.soon ? "bg-brand-400" : "bg-brand-600"}`}>
        <span className="text-[9px] font-semibold tracking-[0.18em]">{iso}</span>
        <span className="text-base font-extrabold leading-none">{num}</span>
        {a.soon && (
          <span className="absolute -bottom-2 rounded-full bg-accent-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
            Coming soon
          </span>
        )}
      </div>
    );
  }

  if (a.kind === "cqc") {
    return (
      <div className={`${base} bg-accent-500`}>
        <span className="text-lg font-extrabold leading-none">CQC</span>
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-2xl">
      🤝
    </div>
  );
}

function Badge({ a }: { a: Affiliation }) {
  const [imgError, setImgError] = useState(false);
  const showLogo = a.logo && !imgError;

  const inner = (
    <>
      <div className="flex h-16 items-center justify-center">
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/logos/${a.logo}`}
            alt={a.label}
            className="max-h-16 w-auto max-w-[140px] object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <Emblem a={a} />
        )}
      </div>
      <div className="mt-3 text-xs font-semibold text-brand-900/60">{a.line}</div>
    </>
  );

  const cls =
    "flex min-h-[128px] flex-col items-center justify-center rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-brand-100 transition-transform";

  if (a.href) {
    return (
      <a
        href={a.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} hover:-translate-y-1`}
      >
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export default function Affiliations({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-4 ${
        compact
          ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {affiliations.map((a) => (
        <Badge key={a.label} a={a} />
      ))}
    </div>
  );
}
