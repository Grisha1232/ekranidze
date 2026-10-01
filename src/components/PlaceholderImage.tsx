import type { CSSProperties } from "react";

const TONE_GRADIENTS: Record<string, string> = {
  warm: "from-[#d9b98a] to-[#b08a5e]",
  clay: "from-[#c98f68] to-[#8f5a3a]",
  olive: "from-[#b7b088] to-[#8a8560]",
};

export function PlaceholderImage({
  label,
  tone = "warm",
  className = "",
  style,
  text,
  fontClassName = "font-display text-3xl",
}: {
  label: string;
  tone?: "warm" | "clay" | "olive";
  className?: string;
  style?: CSSProperties;
  /** Full text to render instead of the auto-derived initial (e.g. a
   *  restaurant name spelled out in another script). */
  text?: string;
  /** Overrides the default font/size utility classes applied to `text`/initial. */
  fontClassName?: string;
}) {
  const initial = label.trim().charAt(0).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${TONE_GRADIENTS[tone]} ${className}`}
      style={style}
      aria-hidden
    >
      <span className={`px-6 text-center text-white/85 ${fontClassName}`}>
        {text ?? initial}
      </span>
    </div>
  );
}
