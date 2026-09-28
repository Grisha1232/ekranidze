const TONE_GRADIENTS: Record<string, string> = {
  warm: "from-[#d9b98a] to-[#b08a5e]",
  clay: "from-[#c98f68] to-[#8f5a3a]",
  olive: "from-[#b7b088] to-[#8a8560]",
};

export function PlaceholderImage({
  label,
  tone = "warm",
  className = "",
}: {
  label: string;
  tone?: "warm" | "clay" | "olive";
  className?: string;
}) {
  const initial = label.trim().charAt(0).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${TONE_GRADIENTS[tone]} ${className}`}
      aria-hidden
    >
      <span className="font-display text-3xl text-white/85">{initial}</span>
    </div>
  );
}
