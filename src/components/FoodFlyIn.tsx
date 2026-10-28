"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Client's requested easter egg — originally just for "Экранидзе" (its name
// literally contains "Экран", screen), now rendered in RestaurantPage for
// any restaurant: khinkali and khachapuri burst out from the center of the
// screen on every restaurant-page mount, so switching from one restaurant
// to another (via "Сменить ресторан") replays it too. Deliberately NOT on
// RestaurantChooser itself — the client didn't want it firing just from
// opening the switcher, only from actually landing on a restaurant's page.
//
// Client asked for a bigger "wow" moment specifically here — a flash +
// shockwave ring at the origin on top of the particle burst gives it an
// actual point of impact instead of just "things fly past," which is what
// was missing before. Pure decoration: fixed overlay, no pointer events,
// removes itself once done. Angles/distances/sizes are hand-picked (not
// Math.random()) so the static export's server-rendered HTML matches what
// the client re-renders on hydration.
const DEG = Math.PI / 180;

const PIECES = [
  { emoji: "🥟", angle: 4, distance: 48, size: 4.6, rotate: 18, delay: 0, duration: 1.7 },
  { emoji: "🫓", angle: 32, distance: 58, size: 5.4, rotate: -22, delay: 0.04, duration: 1.8 },
  { emoji: "🥟", angle: 60, distance: 40, size: 4.2, rotate: 28, delay: 0.09, duration: 1.6 },
  { emoji: "🫓", angle: 88, distance: 54, size: 5, rotate: -16, delay: 0.02, duration: 1.7 },
  { emoji: "🥟", angle: 116, distance: 44, size: 4.4, rotate: 24, delay: 0.13, duration: 1.6 },
  { emoji: "🫓", angle: 144, distance: 60, size: 5.6, rotate: -20, delay: 0, duration: 1.9 },
  { emoji: "🥟", angle: 170, distance: 36, size: 3.9, rotate: 20, delay: 0.07, duration: 1.5 },
  { emoji: "🫓", angle: 196, distance: 52, size: 5.1, rotate: -26, delay: 0.1, duration: 1.7 },
  { emoji: "🥟", angle: 222, distance: 42, size: 4.5, rotate: 16, delay: 0.05, duration: 1.6 },
  { emoji: "🫓", angle: 248, distance: 56, size: 5.3, rotate: -18, delay: 0.14, duration: 1.8 },
  { emoji: "🥟", angle: 274, distance: 38, size: 4, rotate: 22, delay: 0.03, duration: 1.5 },
  { emoji: "🫓", angle: 300, distance: 62, size: 5.8, rotate: -14, delay: 0.16, duration: 1.9 },
  { emoji: "🥟", angle: 326, distance: 34, size: 3.7, rotate: 26, delay: 0.08, duration: 1.4 },
  { emoji: "🫓", angle: 352, distance: 50, size: 4.9, rotate: -24, delay: 0.11, duration: 1.7 },
  { emoji: "🥟", angle: 134, distance: 28, size: 3.3, rotate: 14, delay: 0.19, duration: 1.3 },
  { emoji: "🫓", angle: 206, distance: 30, size: 3.5, rotate: -12, delay: 0.17, duration: 1.4 },
  { emoji: "🥟", angle: 20, distance: 26, size: 3.1, rotate: 18, delay: 0.21, duration: 1.3 },
  { emoji: "🫓", angle: 290, distance: 32, size: 3.6, rotate: -16, delay: 0.06, duration: 1.4 },
];

export function FoodFlyIn() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <div className="animate-food-flash absolute inset-0" />
      <div className="animate-food-shockwave absolute" />
      {PIECES.map((p, i) => {
        const tx = `${(p.distance * Math.cos(p.angle * DEG)).toFixed(2)}vmin`;
        const ty = `${(p.distance * Math.sin(p.angle * DEG)).toFixed(2)}vmin`;
        return (
          <span
            key={i}
            className="animate-food-burst absolute drop-shadow-lg"
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
