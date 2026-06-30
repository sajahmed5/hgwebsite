"use client";

import { useEffect, useRef, useState } from "react";

// Counts a number up when it scrolls into view. Values like "500+" animate the
// number and keep the suffix; years (e.g. "2002") and words (e.g. "Good") render
// as-is so nothing looks odd.
export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  // Only animate genuine counts (skip years and non-numeric values).
  const animatable = target !== null && target < 1900;

  const [display, setDisplay] = useState(animatable ? "0" : value);

  useEffect(() => {
    if (!animatable || target === null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${target}${suffix}`);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setDisplay(`${Math.round(eased * target)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animatable, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
