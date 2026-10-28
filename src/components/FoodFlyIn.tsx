"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Client's requested easter egg, rendered in RestaurantPage for both
// restaurants, every time that page opens (including switching from one
// restaurant to the other via "Сменить ресторан") — grapes and wine rain
// down from the top of the screen. Originally a radial burst of khinkali/
// khachapuri emoji, but there's no Unicode emoji that actually reads as
// either dish — after comparing a few candidates (and a confetti-rain
// alternative) on localhost, the client picked grapes + wine for the rain,
// which doesn't have the same mismatch problem and reads as festive on its
// own. Deliberately NOT on RestaurantChooser — the client didn't want it
// firing just from opening the switcher, only from landing on a
// restaurant's page. Pure decoration: fixed overlay, no pointer events,
// removes itself once done. Values are hand-picked (not Math.random()) so
// the static export's server-rendered HTML matches what the client
// re-renders on hydration.
const PIECES = [
  { emoji: "🍇", left: 3, size: 2.8, delay: 0, duration: 2.3, rotate: 160 },
  { emoji: "🍷", left: 9, size: 3.1, delay: 0.25, duration: 2.6, rotate: -180 },
  { emoji: "🍇", left: 15, size: 2.4, delay: 0.5, duration: 2.2, rotate: 150 },
  { emoji: "🍷", left: 21, size: 3.3, delay: 0.1, duration: 2.8, rotate: -200 },
  { emoji: "🍇", left: 27, size: 2.7, delay: 0.4, duration: 2.4, rotate: 170 },
  { emoji: "🍷", left: 33, size: 2.9, delay: 0.65, duration: 2.5, rotate: -160 },
  { emoji: "🍇", left: 39, size: 3.2, delay: 0.15, duration: 2.7, rotate: 190 },
  { emoji: "🍷", left: 45, size: 2.5, delay: 0.55, duration: 2.3, rotate: -170 },
  { emoji: "🍇", left: 51, size: 3, delay: 0.3, duration: 2.6, rotate: 180 },
  { emoji: "🍷", left: 57, size: 2.6, delay: 0.7, duration: 2.2, rotate: -150 },
  { emoji: "🍇", left: 63, size: 3.4, delay: 0.05, duration: 2.9, rotate: 200 },
  { emoji: "🍷", left: 69, size: 2.8, delay: 0.45, duration: 2.4, rotate: -190 },
  { emoji: "🍇", left: 75, size: 2.5, delay: 0.75, duration: 2.3, rotate: 160 },
  { emoji: "🍷", left: 81, size: 3.1, delay: 0.2, duration: 2.7, rotate: -180 },
  { emoji: "🍇", left: 87, size: 2.9, delay: 0.6, duration: 2.5, rotate: 170 },
  { emoji: "🍷", left: 93, size: 2.6, delay: 0.35, duration: 2.6, rotate: -200 },
  { emoji: "🍇", left: 11, size: 2.3, delay: 0.8, duration: 2.1, rotate: 140 },
  { emoji: "🍷", left: 97, size: 2.4, delay: 0.5, duration: 2.2, rotate: -140 },
  { emoji: "🍇", left: 48, size: 2.2, delay: 0.1, duration: 2, rotate: 150 },
  { emoji: "🍷", left: 72, size: 2.7, delay: 0.62, duration: 2.4, rotate: -160 },
];

export function FoodFlyIn() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="animate-food-rain absolute drop-shadow-lg"
          style={
            {
              left: `${p.left}%`,
              fontSize: `${p.size}rem`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--rot": `${p.rotate}deg`,
            } as CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
