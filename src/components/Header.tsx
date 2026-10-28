"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartButton } from "@/components/CartButton";
import type { MetroStation, Restaurant } from "@/data/restaurants";
import { withAssetVersion } from "@/lib/asset-version";
import { BASE_PATH } from "@/lib/base-path";
import { METRO_LINE_COLORS } from "@/lib/metro";
import { clearChosenRestaurant } from "@/lib/restaurant-choice";

const NAV_LINKS = [
  { href: "#menu", label: "Меню" },
  { href: "#about", label: "О нас" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

// Metro stations across all of a restaurant's addresses — deduped by name,
// since Ekranidze's single address lists two stations and both would
// otherwise just repeat if an address ever reused one.
function uniqueMetroStations(restaurant: Restaurant): MetroStation[] {
  const all = restaurant.addresses.flatMap((a) => a.metro ?? []);
  return Array.from(new Map(all.map((m) => [m.name, m])).values());
}

function MetroBadges({
  stations,
  className = "",
}: {
  stations: MetroStation[];
  className?: string;
}) {
  if (stations.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {stations.map((m) => (
        <span
          key={m.name}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: METRO_LINE_COLORS[m.line] }}
            aria-hidden="true"
          />
          {m.name}
        </span>
      ))}
    </div>
  );
}

// Always the hamburger layout, at every screen size — cramming the
// switch-restaurant button, metro badges, nav links and phone onto one line
// squeezed the restaurant name even at desktop widths. The logo sits in a
// 3-column grid (hamburger / logo / cart) with equal outer tracks so it's
// centered on the whole header, not just the space left after the controls.
// The panel is a small anchored dropdown under the hamburger button (left
// side), not a full-width bar — a backdrop behind it closes it on an
// outside click.
//
// The center column is `minmax(0,auto)`, not plain `auto` — a plain `auto`
// track sizes to its content's full width with no upper bound, so a long
// admin-edited name (e.g. "кафе грузинской кухни «Экранидзе»") just
// overflowed into the hamburger/cart columns instead of wrapping. With the
// 0 floor the column can actually be squeezed down to the space the other
// two columns leave it, which is what lets the name wrap onto a second line
// there instead of overlapping neighboring controls. Wrapping by width
// (rather than a hardcoded character count) keeps working across any font
// size/zoom/screen width.
export function Header({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const metroStations = uniqueMetroStations(restaurant);

  const goToChooser = () => {
    setMenuOpen(false);
    clearChosenRestaurant();
    router.push(`${BASE_PATH}/`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="relative mx-auto grid max-w-6xl grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-self-start">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex min-w-0 flex-col items-center justify-self-center gap-1.5">
          <div className="flex min-w-0 items-start gap-2">
            {restaurant.headerIcon && (
              <Image
                src={`${BASE_PATH}${withAssetVersion(restaurant.headerIcon)}`}
                alt=""
                width={28}
                height={28}
                className="mt-0.5 shrink-0 rounded-full"
              />
            )}
            <span className="min-w-0 text-center font-georgian text-xl font-semibold leading-snug text-foreground">
              {restaurant.name}
            </span>
          </div>
          <MetroBadges stations={metroStations} className="justify-center" />
        </div>

        <div className="flex items-center justify-self-end">
          <CartButton restaurantId={restaurant.id} />
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute left-4 top-full z-40 mt-2 w-64 rounded-2xl border border-border bg-surface p-4 shadow-xl sm:left-6">
              <button
                type="button"
                onClick={goToChooser}
                className="w-full rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Сменить ресторан
              </button>
              <nav className="mt-4 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href={restaurant.phoneHref}
                className="mt-4 block text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {restaurant.phone}
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
