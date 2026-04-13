type GloxLogoProps = { size?: "sm" | "md" | "lg"; className?: string };

const sizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" };

/** Icon-only mark for narrow layouts (e.g. collapsed sidebar). */
export function GloxMark({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <rect width="24" height="24" rx="4" className="fill-[#ea580c]" />
      <path
        d="M7 14l3-4 2.5 3L17 8"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GloxLogo({ size = "md", className = "" }: GloxLogoProps) {
  const iconPx = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <GloxMark size={iconPx} />
      <span className={`font-bold tracking-tight ${sizes[size]}`}>
        <span className="text-[#ea580c]">Glox</span>
        <span className="text-[#0a0a0a]">.AI</span>
      </span>
    </div>
  );
}
