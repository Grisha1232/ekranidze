"use client";

import { useEffect, useRef, useState } from "react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export type LogoSlide = {
  id: string;
  label: string;
  name: string;
  tone: "warm" | "clay" | "olive";
};

const HOLD_MS = 3400;
const FADE_MS = 600;

export function LogoCarousel({
  slides,
  className = "",
}: {
  slides: LogoSlide[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scheduleHold = () => {
      timeoutRef.current = setTimeout(() => {
        setFading(true);
        timeoutRef.current = setTimeout(() => {
          setIndex((i) => (i + 1) % slides.length);
          setFading(false);
          scheduleHold();
        }, FADE_MS);
      }, HOLD_MS);
    };

    scheduleHold();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [slides.length]);

  const current = slides[index];

  return (
    <PlaceholderImage
      label={current.label}
      text={current.name}
      fontClassName="font-georgian text-3xl sm:text-4xl"
      tone={current.tone}
      className={`transition-opacity ease-in-out motion-reduce:transition-none ${
        fading ? "opacity-0" : "opacity-100"
      } ${className}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    />
  );
}
