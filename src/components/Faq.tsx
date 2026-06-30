"use client";

import { useState } from "react";
import { faqs } from "@/data/site";

export default function Faq() {
  // Track open item by "group:index" key.
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-14">
      {faqs.map((group) => (
        <div key={group.group}>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">
            {group.group}
          </h2>
          <div className="mt-5 divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white">
            {group.items.map((item, i) => {
              const key = `${group.group}:${i}`;
              const isOpen = open === key;
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-brand-900">{item.q}</span>
                    <span
                      className={`shrink-0 text-xl text-brand-500 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-brand-900/75">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
