// Official HG Care logo. On dark backgrounds it sits on a white panel
// (see `chip`) so the brand colours stay correct.
export default function Logo({ chip = false }: { chip?: boolean }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hg-care-logo.svg?v=2"
      alt="HG Care"
      width={822}
      height={337}
      className="h-9 w-auto sm:h-11"
    />
  );

  if (chip) {
    return (
      <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
        {img}
      </span>
    );
  }
  return img;
}
