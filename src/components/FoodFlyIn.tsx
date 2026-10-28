"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Client's requested easter egg — originally just for "Экранидзе" (its name
// literally contains "Экран", screen), now rendered in RestaurantPage for
// any restaurant: khinkali and khachapuri burst out from the center of the
// screen on every restaurant-page mount, so switching from one restaurant
// to another (via "Сменить ресторан") replays it too. Deliberately NOT on
// RestaurantChooser itself — the client didn't want it firing just from
// opening the switcher, only from actually landing on a restaurant's page.
// Pure decoration: fixed overlay, no pointer events, removes itself once
// the animation's done. Angles/distances/sizes are hand-picked (not
// Math.random()) so the static export's server-rendered HTML matches what
// the client re-renders on hydration.
const DEG = Math.PI / 180;

const PIECES = [
  { emoji: "🥟", angle: 8, distance: 42, size: 4.2, rotate: 15, delay: 0, duration: 1.6 },
  { emoji: "🫓", angle: 42, distance: 50, size: 4.8, rotate: -20, delay: 0.05, duration: 1.7 },
  { emoji: "🥟", angle: 78, distance: 36, size: 4, rotate: 25, delay: 0.1, duration: 1.5 },
  { emoji: "🫓", angle: 112, distance: 48, size: 4.6, rotate: -15, delay: 0.15, duration: 1.8 },
  { emoji: "🥟", angle: 150, distance: 40, size: 4.1, rotate: 20, delay: 0, duration: 1.6 },
  { emoji: "🫓", angle: 182, distance: 52, size: 5, rotate: -25, delay: 0.08, duration: 1.7 },
  { emoji: "🥟", angle: 215, distance: 38, size: 4.3, rotate: 15, delay: 0.12, duration: 1.5 },
  { emoji: "🫓", angle: 248, distance: 46, size: 4.7, rotate: -18, delay: 0.04, duration: 1.6 },
  { emoji: "🥟", angle: 282, distance: 34, size: 3.8, rotate: 22, delay: 0.18, duration: 1.5 },
  { emoji: "🫓", angle: 315, distance: 56, size: 5.2, rotate: -12, delay: 0.2, duration: 1.8 },
  { emoji: "🥟", angle: 160, distance: 30, size: 3.6, rotate: 18, delay: 0.06, duration: 1.4 },
  { emoji: "🫓", angle: 335, distance: 32, size: 3.7, rotate: -22, delay: 0.14, duration: 1.4 },
  { emoji: "🥟", angle: 260, distance: 28, size: 3.4, rotate: 12, delay: 0.22, duration: 1.4 },
  { emoji: "🫓", angle: 20, distance: 26, size: 3.3, rotate: -10, delay: 0.1, duration: 1.3 },
];

export function FoodFlyIn() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {PIECES.map((p, i) => {
        const tx = `${(p.distance * Math.cos(p.angle * DEG)).toFixed(2)}vmin`;
        const ty = `${(p.distance * Math.sin(p.angle * DEG)).toFixed(2)}vmin`;
        return (
          <span
            key={i}
            className="animate-food-burst absolute"
            style={
              {
                fontSize: `${p.size}rem`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                "--tx": tx,
                "--ty": ty,
                "--rot": `${p.rotate}deg`,
              } as CSSProperties
            }
          >
            {p.emoji}
          </span>
        );
      })}
    </div>
  );
}
