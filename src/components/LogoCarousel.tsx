"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { BASE_PATH } from "@/lib/base-path";

export type LogoSlide = {
  id: string;
  label: string;
  name: string;
  tone: "warm" | "clay" | "olive";
  /** Real logo image (public/logos/) — rendered instead of the font-styled
   *  placeholder when present. */
  image?: string;
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
  const fadeClass = `transition-opacity ease-in-out motion-reduce:transition-none ${
    fading ? "opacity-0" : "opacity-100"
  }`;

  if (current.image) {
    return (
      <div
        className={`flex items-center justify-center bg-surface ${fadeClass} ${className}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        <div className="relative h-2/3 w-2/3">
          <Image
            src={`${BASE_PATH}${current.image}`}
            alt={current.name}
            fill
            sizes="(min-width: 768px) 320px, 60vw"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <PlaceholderImage
      label={current.label}
      text={current.name}
      fontClassName="font-georgian text-3xl sm:text-4xl"
      tone={current.tone}
      className={`${fadeClass} ${className}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    />
  );
}
