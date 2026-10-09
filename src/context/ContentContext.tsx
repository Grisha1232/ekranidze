"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { restaurants as staticRestaurants, type Restaurant } from "@/data/restaurants";
import { getMenu as staticGetMenu, type RestaurantMenu } from "@/data/menu";

// Set for the Timeweb per-domain builds (see backend/README.md) — points at
// the shared PHP+MySQL backend so admin edits show up without a rebuild.
// Unset (GitHub Pages, local dev without a backend running) — this context
// just serves the static data from src/data/*, exactly like before this
// existed. Either way the static data is also the *first* paint, so there's
// never a loading flash — a successful fetch just quietly replaces it.
const CONTENT_API_URL = process.env.NEXT_PUBLIC_CONTENT_API_URL;

type ContentValue = {
  restaurants: Restaurant[];
  getMenu: (restaurantId: string) => RestaurantMenu;
};

const ContentContext = createContext<ContentValue>({
  restaurants: staticRestaurants,
  getMenu: staticGetMenu,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(staticRestaurants);
  const [menus, setMenus] = useState<Record<string, RestaurantMenu>>({});

  useEffect(() => {
    if (!CONTENT_API_URL) return;

    fetch(`${CONTENT_API_URL}/restaurants.php`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Restaurant[]) => {
        if (Array.isArray(data) && data.length > 0) setRestaurants(data);
      })
      .catch(() => {
        // Backend unreachable — keep the static data already shown.
      });

    staticRestaurants.forEach((r) => {
      fetch(`${CONTENT_API_URL}/menu.php?id=${encodeURIComponent(r.id)}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data: RestaurantMenu) => {
          if (data?.categories && data?.menuItems) {
            setMenus((prev) => ({ ...prev, [r.id]: data }));
          }
        })
        .catch(() => {
          // Backend unreachable — keep the static menu for this restaurant.
        });
    });
  }, []);

  const getMenu = (restaurantId: string): RestaurantMenu =>
    menus[restaurantId] ?? staticGetMenu(restaurantId);

  return (
    <ContentContext.Provider value={{ restaurants, getMenu }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentValue {
  return useContext(ContentContext);
}
