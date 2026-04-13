type Size = "sm" | "md" | "lg";

const text = { sm: "text-sm", md: "text-base", lg: "text-xl" };

export function BarbershopLogo({ size = "md", className = "" }: { size?: Size; className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-bold tracking-tight ${className}`}>
      <span
        className={`rounded-md border-2 border-white bg-red-600 px-1.5 py-0.5 text-white shadow-sm ${text[size]}`}
      >
        ✂
      </span>
      <span className={text[size]}>
        <span className="text-red-600">Istanbul</span>
        <span className="text-neutral-900"> Barbers</span>
      </span>
    </div>
  );
}

/** Icon-only mark for narrow layouts (e.g. collapsed sidebar). */
export function RecruitmentMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-md bg-blue-600 font-semibold leading-none text-white ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.45) }}
      aria-hidden
    >
      ★
    </span>
  );
}

export function RecruitmentLogo({ size = "md", className = "" }: { size?: Size; className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-bold tracking-tight ${className}`}>
      <span className={`rounded-md bg-blue-600 px-1.5 py-0.5 text-white ${text[size]}`}>★</span>
      <span className={text[size]}>
        <span className="text-blue-700">NorthStar</span>
        <span className="text-neutral-900"> Talent</span>
      </span>
    </div>
  );
}
