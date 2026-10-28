"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { useContent } from "@/context/ContentContext";
import type { Restaurant, RestaurantAddress } from "@/data/restaurants";
import { withAssetVersion } from "@/lib/asset-version";
import { BASE_PATH } from "@/lib/base-path";
import { METRO_LINE_COLORS } from "@/lib/metro";
import { getChosenRestaurantId, setChosenRestaurant } from "@/lib/restaurant-choice";
import { normalizeOrigin, RESTAURANT_PRIMARY_ORIGIN } from "@/lib/restaurant-domains";

// A restaurant with more than one address (currently "Мама хинкали") shows
// one card per address rather than one card for the restaurant — the client
// wants each location pickable on its own, since they're different enough
// (one open, one "Откроется позже") to be picked between like separate
// restaurants, even though both still lead to the same restaurant page.
type ChooserCard = {
  key: string;
  restaurant: Restaurant;
  address?: RestaurantAddress;
};

function buildCards(restaurants: Restaurant[]): ChooserCard[] {
  return restaurants.flatMap((r) =>
    r.addresses.length > 1
      ? r.addresses.map((a) => ({ key: a.id, restaurant: r, address: a }))
      : [{ key: r.id, restaurant: r, address: r.addresses[0] }],
  );
}

export function RestaurantChooser() {
  const router = useRouter();
  const { restaurants } = useContent();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const chosenId = getChosenRestaurantId();
    const chosen = restaurants.find((r) => r.id === chosenId);
    if (chosen) {
      router.replace(`${BASE_PATH}${chosen.path}`);
      return;
    }
    // One-time check of sessionStorage on mount — intentional, sessionStorage
    // isn't readable during SSR so this can't be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router, restaurants]);

  const choose = (id: string, path: string, addressId?: string) => {
    setChosenRestaurant(id, addressId);

    // Cross-domain: if the chooser was opened on the OTHER restaurant's own
    // domain (e.g. picking "Экранидзе" while on mama-hinkali.ru), send the
    // visitor to that restaurant's own domain instead of rendering it under
    // the wrong brand's URL — a full navigation, since a client-side route
    // change can't cross origins. Only acts when the current host is one of
    // the known restaurant domains; any other host (localhost, GitHub
    // Pages, a .рф alias) just navigates normally.
    const targetOrigin = RESTAURANT_PRIMARY_ORIGIN[id];
    const currentOrigin = normalizeOrigin(window.location.origin);
    const onKnownRestaurantDomain =
      Object.values(RESTAURANT_PRIMARY_ORIGIN).includes(currentOrigin);
    if (targetOrigin && onKnownRestaurantDomain && currentOrigin !== targetOrigin) {
      // Deliberate: the target is a different registrable domain entirely
      // (ekranidze.ru vs mama-hinkali.ru), not an internal route — router.push
      // can't cross origins, so a full navigation is the only option here.
      // eslint-disable-next-line react-hooks/immutability, @next/next/no-location-assign-relative-destination
      window.location.href = `${targetOrigin}${path}`;
      return;
    }

    router.push(`${BASE_PATH}${path}`);
  };

  if (!ready) return null;

  const cards = buildCards(restaurants);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background px-4 py-16 text-center sm:px-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Грузинская кухня
        </p>
        <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
          Выберите ресторан
        </h1>
      </div>
      <div className="flex w-full max-w-3xl flex-wrap justify-center gap-6">
        {cards.map(({ key, restaurant: r, address }) => (
          <button
            key={key}
            type="button"
            onClick={() => choose(r.id, r.path, address?.id)}
            className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition-shadow hover:shadow-lg sm:w-80"
          >
            <div className="relative h-40 w-full">
              {r.logoImage ? (
                <Image
                  src={`${BASE_PATH}${withAssetVersion(r.logoImage)}`}
                  alt={r.name}
                  fill
                  sizes="(min-width: 640px) 360px, 100vw"
                  className="object-contain p-6"
                />
              ) : (
                <PlaceholderImage
                  label={r.shortLabel}
                  text={r.name}
                  tone={r.tone}
                  fontClassName="font-georgian text-2xl"
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="flex min-h-44 flex-1 flex-col gap-1 p-5">
              <h2 className="font-georgian text-xl font-semibold text-foreground">
                {r.name}
              </h2>
              <p className="text-sm text-muted-foreground">{r.badge}</p>
              {address && (
                <p className="mt-1 text-sm text-foreground">{address.addressText}</p>
              )}
              {address?.metro && address.metro.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {address.metro.map((m) => (
                    <span
                      key={m.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: METRO_LINE_COLORS[m.line] }}
                        aria-hidden="true"
                      />
                      {m.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
