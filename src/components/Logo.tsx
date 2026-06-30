// HG Care wordmark — recreated as inline SVG to match the brand logo:
// two figures sheltering a heart (line-art) + "HG" (green) "CARE" (teal).
export default function Logo({ light = false }: { light?: boolean }) {
  const line = light ? "#ffffff" : "#00606c";
  return (
    <span className="inline-flex items-center gap-3">
      <svg
        width="46"
        height="42"
        viewBox="0 0 64 60"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <g
          stroke={line}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* back figure: head + sheltering body */}
          <circle cx="42" cy="13" r="7.5" />
          <path d="M30 49V31c0-7 5.5-12 12.5-12S55 24 55 31v18" />
          {/* front figure: head + body, outstretched arm along the base */}
          <circle cx="22" cy="20" r="6.5" />
          <path d="M10 51V36c0-6.4 5-11 11.5-11S33 29.6 33 36v15" />
          <path d="M10 51h26" />
          {/* heart held within */}
          <path d="M21.7 44.6l-4.6-4.3c-1.7-1.6-1.7-4.1 0-5.6 1.5-1.4 3.8-1.2 5.1.3 1.3-1.5 3.6-1.7 5.1-.3 1.7 1.5 1.7 4 0 5.6l-5.6 4.3z" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[22px] font-extrabold tracking-tight">
          <span style={{ color: "#84b43c" }}>HG</span>
          <span style={{ color: light ? "#ffffff" : "#00606c" }}>CARE</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${
            light ? "text-brand-100/80" : "text-brand-500"
          }`}
        >
          Your Helping Hand, When Needed
        </span>
      </span>
    </span>
  );
}
