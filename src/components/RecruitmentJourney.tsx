"use client";

import { useEffect, useRef, useState } from "react";

// Interactive recruitment journey: a winding road where clicking a milestone
// walks the carer to that stop and expands a detail card with more info.

const VIEW_W = 680;
const VIEW_H = 900;
const PATH =
  "M160,830 C160,775 200,745 200,700 C200,650 480,640 480,590 C480,540 200,530 200,480 C200,430 480,420 480,370 C480,320 200,310 200,260 C200,210 440,200 440,150";

type Step = {
  title: string;
  blurb: string;
  detail: string;
  bullets?: string[];
  badge?: string;
  x: number;
  y: number;
  side: "left" | "right";
};

const steps: Step[] = [
  {
    title: "You apply",
    blurb: "A quick online form",
    detail:
      "Send us a short application — it takes just a few minutes, and you don't need any experience to get started. We welcome people from all walks of life who genuinely care.",
    x: 200,
    y: 700,
    side: "left",
  },
  {
    title: "Interview",
    blurb: "A friendly chat",
    detail:
      "A relaxed chat — in person or by phone — so we can get to know you, answer your questions and find the role and area that suit you best. No tricky tests, just a conversation.",
    x: 480,
    y: 590,
    side: "right",
  },
  {
    title: "Training",
    blurb: "2-day induction",
    badge: "2-day course",
    detail:
      "Before you start you complete a 2-day induction — a mix of practical and theory-based learning — so you feel confident and prepared from day one. You'll cover:",
    bullets: [
      "Moving & handling (practical)",
      "Safeguarding adults & children",
      "Medication awareness",
      "Health, safety & basic first aid",
      "Dignity & person-centred care",
    ],
    x: 200,
    y: 480,
    side: "left",
  },
  {
    title: "Your first role",
    blurb: "Begin with support",
    detail:
      "We match you to clients and shifts that suit you, and you start making a real difference — always with senior carers and a friendly team beside you while you find your feet.",
    x: 480,
    y: 370,
    side: "right",
  },
  {
    title: "NVQ & support",
    blurb: "Gain qualifications",
    detail:
      "Keep growing with funded NVQ and Care Certificate qualifications, plus ongoing mentoring, refreshers and specialist training throughout your career — all paid for by us.",
    x: 200,
    y: 260,
    side: "left",
  },
  {
    title: "Grow further",
    blurb: "New opportunities",
    detail:
      "As you develop, new doors open — senior carer, field supervisor, training or office roles. Your career grows right along with you, as far as you'd like to take it.",
    x: 440,
    y: 150,
    side: "right",
  },
];

export default function RecruitmentJourney() {
  const [active, setActive] = useState(0);
  const [fr, setFr] = useState<number[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  // Map each milestone's (x,y) to a percentage distance along the path so the
  // carer can glide to it. Computed once on mount (needs the DOM geometry).
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const total = p.getTotalLength();
    const out = steps.map((s) => {
      let best = 0;
      let bd = Infinity;
      for (let i = 0; i <= 240; i++) {
        const pt = p.getPointAtLength((total * i) / 240);
        const d = (pt.x - s.x) ** 2 + (pt.y - s.y) ** 2;
        if (d < bd) {
          bd = d;
          best = i / 240;
        }
      }
      return +(best * 100).toFixed(2);
    });
    setFr(out);
  }, []);

  const carerDist = fr[active] ?? 0;
  const s = steps[active];

  return (
    <div className="mt-12">
      <style>{`
        @keyframes rj2-flow{to{stroke-dashoffset:-32}}
        @keyframes rj2-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes rj2-pop{from{opacity:0}to{opacity:1}}
        .rj2-dashes{animation:rj2-flow 1.4s linear infinite}
        .rj2-bob{animation:rj2-bob .7s ease-in-out infinite}
        .rj2-carer{transition:offset-distance 1.1s cubic-bezier(.4,0,.2,1)}
        .rj2-pop{animation:rj2-pop .2s ease}
        @media (prefers-reduced-motion:reduce){.rj2-dashes,.rj2-bob{animation:none}.rj2-carer{transition:none}}
      `}</style>

      <p className="mb-6 text-center text-sm font-medium text-brand-700">
        👆 Tap any stop on the road to see what happens at that step
      </p>

      {/* Desktop: interactive winding road */}
      <div className="relative mx-auto hidden max-w-2xl md:block">
        <svg
          width="100%"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive recruitment journey from applying to growing your career"
        >
          <rect x="4" y="4" width="672" height="892" rx="22" fill="#f3faf9" />
          <ellipse cx="150" cy="770" rx="230" ry="95" fill="#dcecdd" />
          <ellipse cx="545" cy="420" rx="220" ry="105" fill="#dcecdd" />
          <ellipse cx="190" cy="210" rx="190" ry="80" fill="#dcecdd" />
          <circle cx="600" cy="80" r="34" fill="#fbe3a3" />

          <path d={PATH} fill="none" stroke="#6FAE86" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <path ref={pathRef} d={PATH} fill="none" stroke="#8FC79F" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
          <path className="rj2-dashes" d={PATH} fill="none" stroke="#FCFDFA" strokeWidth="3" strokeLinecap="round" strokeDasharray="16 16" />

          <rect x="40" y="816" width="100" height="26" rx="13" fill="#67912c" />
          <text x="90" y="833" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
            Start here
          </text>

          <line x1="440" y1="150" x2="440" y2="108" stroke="#C98A2E" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M440,108 L470,118 L440,128 Z" fill="#84b43c" />

          {/* carer */}
          <g
            className="rj2-carer"
            style={{ offsetPath: `path("${PATH}")`, offsetDistance: `${carerDist}%`, offsetRotate: "0deg" }}
          >
            <g className="rj2-bob">
              <rect x="-19" y="-45" width="7" height="20" rx="3.5" fill="#A9CDEC" />
              <rect x="12" y="-45" width="7" height="20" rx="3.5" fill="#A9CDEC" />
              <rect x="-9" y="-22" width="6.5" height="20" rx="3" fill="#9CC4E6" />
              <rect x="2.5" y="-22" width="6.5" height="20" rx="3" fill="#9CC4E6" />
              <ellipse cx="-6" cy="-2" rx="6" ry="3.2" fill="#FFFFFF" stroke="#D8E0E6" strokeWidth="0.6" />
              <ellipse cx="6" cy="-2" rx="6" ry="3.2" fill="#FFFFFF" stroke="#D8E0E6" strokeWidth="0.6" />
              <rect x="-15" y="-46" width="30" height="27" rx="9" fill="#A9CDEC" />
              <rect x="-15" y="-24" width="30" height="5" rx="2.5" fill="#8FB8DF" />
              <circle cx="-15.5" cy="-26" r="3.4" fill="#F1C7A4" />
              <circle cx="15.5" cy="-26" r="3.4" fill="#F1C7A4" />
              <rect x="-5" y="-41" width="10" height="8" rx="2" fill="#FFFFFF" stroke="#D8E0E6" strokeWidth="0.5" />
              <rect x="-0.9" y="-40" width="1.8" height="6" rx="0.6" fill="#00606c" />
              <rect x="-3" y="-37.9" width="6" height="1.8" rx="0.6" fill="#00606c" />
              <rect x="-3.5" y="-52" width="7" height="7" rx="2" fill="#F1C7A4" />
              <ellipse cx="0" cy="-58" rx="12" ry="13.5" fill="#2E3A4F" />
              <path d="M-11,-48 Q-13,-43 -9,-41 L9,-41 Q13,-43 11,-48 Z" fill="#27324A" />
              <ellipse cx="0" cy="-55" rx="7.8" ry="9" fill="#F1C7A4" />
              <ellipse cx="-3" cy="-56" rx="1.1" ry="1.5" fill="#37414A" />
              <ellipse cx="3" cy="-56" rx="1.1" ry="1.5" fill="#37414A" />
              <circle cx="-4.7" cy="-52.5" r="1.7" fill="#F2A9A0" opacity="0.85" />
              <circle cx="4.7" cy="-52.5" r="1.7" fill="#F2A9A0" opacity="0.85" />
              <path d="M-2.4,-50.6 Q0,-48.6 2.4,-50.6" fill="none" stroke="#9A5B4B" strokeWidth="1" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* clickable number nodes */}
        {steps.map((step, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Step ${i + 1}: ${step.title}`}
            style={{ left: `${(step.x / VIEW_W) * 100}%`, top: `${(step.y / VIEW_H) * 100}%` }}
            className={`absolute z-30 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white transition-transform ${
              active === i ? "scale-125 bg-accent-500" : "bg-brand-600 hover:scale-110"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* expanded detail card for the active stop */}
        {fr.length > 0 && (
          <div
            key={active}
            style={{ left: `${(s.x / VIEW_W) * 100}%`, top: `${(s.y / VIEW_H) * 100}%` }}
            className={`rj2-pop absolute z-20 w-64 -translate-y-1/2 rounded-2xl border-l-4 border-accent-500 bg-white p-5 shadow-xl ring-1 ring-brand-100 ${
              s.side === "left" ? "translate-x-7" : "-translate-x-[calc(100%+1.75rem)]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {active + 1}
              </span>
              <h3 className="font-bold text-brand-900">{s.title}</h3>
              {s.badge && (
                <span className="ml-auto rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                  {s.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-brand-900/75">{s.detail}</p>
            {s.bullets && (
              <ul className="mt-3 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-brand-900/75">
                    <span className="mt-0.5 text-accent-600">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile: tap-to-expand vertical timeline */}
      <ol className="relative mx-auto max-w-md space-y-3 md:hidden">
        {steps.map((step, i) => {
          const open = active === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(open ? -1 : i)}
                className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
                  open ? "border-accent-200 bg-white shadow-sm" : "border-brand-100 bg-white/70"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                    open ? "bg-accent-500" : "bg-brand-600"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-brand-900">{step.title}</span>
                    {step.badge && (
                      <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                        {step.badge}
                      </span>
                    )}
                  </span>
                  {!open && <span className="text-sm text-brand-900/60">{step.blurb}</span>}
                  {open && (
                    <span className="mt-1 block text-sm leading-relaxed text-brand-900/75">
                      {step.detail}
                    </span>
                  )}
                  {open && step.bullets && (
                    <span className="mt-2 block space-y-1">
                      {step.bullets.map((b) => (
                        <span key={b} className="flex items-start gap-2 text-sm text-brand-900/75">
                          <span className="mt-0.5 text-accent-600">✓</span>
                          {b}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
