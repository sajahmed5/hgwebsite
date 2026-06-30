"use client";

import { useEffect, useRef, useState } from "react";
import { affiliations, type Affiliation } from "@/data/site";

// Shows each accreditation's official logo from /public/logos when available,
// otherwise a brand-styled fallback badge (so nothing looks broken before the
// real logo files are added).

// Original brand-styled ISO "certified" seal (our own artwork, in HG Care colours).
function IsoSeal({ a }: { a: Affiliation }) {
  const num = a.label.split(" ")[1] ?? "";
  const isEnv = a.label.includes("14001");
  const color = a.soon ? "#5da284" : isEnv ? "#67912c" : "#00606c";
  const id = a.label.replace(/\s/g, "");
  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="h-16 w-16" role="img" aria-label={`${a.label} certified`}>
        <defs>
          <path id={`top-${id}`} d="M26,50 A24,24 0 0 1 74,50" fill="none" />
          <path id={`bot-${id}`} d="M26,52 A24,24 0 0 0 74,52" fill="none" />
        </defs>
        <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="2.4" />
        <circle cx="50" cy="50" r="37" fill={color} />
        <text fill="#fff" fontSize="8" fontWeight="700" letterSpacing="2.5" textAnchor="middle">
          <textPath href={`#top-${id}`} startOffset="50%">
            CERTIFIED
          </textPath>
        </text>
        <text fill="#fff" fontSize="7.5" fontWeight="600" letterSpacing="2" textAnchor="middle">
          <textPath href={`#bot-${id}`} startOffset="50%">
            COMPANY
          </textPath>
        </text>
        <text x="50" y="51" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          ISO
        </text>
        <text x="50" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
          {num}
        </text>
      </svg>
      {a.soon && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
          Coming soon
        </span>
      )}
    </div>
  );
}

function Emblem({ a }: { a: Affiliation }) {
  if (a.kind === "iso") return <IsoSeal a={a} />;

  if (a.kind === "cqc") {
    return (
      <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-accent-500 text-white">
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
  const imgRef = useRef<HTMLImageElement>(null);
  const showLogo = a.logo && !imgError;

  // Catch images that 404'd before React hydrated (the onError event is missed
  // for server-rendered images that fail to load early).
  useEffect(() => {
    const im = imgRef.current;
    if (im && im.complete && im.naturalWidth === 0) setImgError(true);
  }, []);

  const inner = (
    <>
      <div className="flex h-16 items-center justify-center">
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
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
