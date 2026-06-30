import { WORD_PATHS, MARK_PATHS } from "@/data/logoPaths";

// Official HG Care logo, inline so the heart can beat (.animate-heartbeat).
// chip = sit on a white panel (dark backgrounds); markOnly = the icon only.
export default function Logo({
  chip = false,
  markOnly = false,
  className,
}: {
  chip?: boolean;
  markOnly?: boolean;
  className?: string;
}) {
  if (markOnly) {
    return (
      <svg
        viewBox="38 44 142 200"
        role="img"
        aria-label="HG Care"
        className={className ?? "h-9 w-auto sm:h-11"}
        dangerouslySetInnerHTML={{ __html: MARK_PATHS }}
      />
    );
  }

  const logo = (
    <svg
      viewBox="0 0 822 337"
      role="img"
      aria-label="HG Care"
      className="h-9 w-auto sm:h-11"
      dangerouslySetInnerHTML={{ __html: WORD_PATHS + MARK_PATHS }}
    />
  );

  if (chip) {
    return (
      <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
        {logo}
      </span>
    );
  }
  return logo;
}
