import type { Metadata } from "next";
import { HomeRedirect } from "@/components/HomeRedirect";
import { RestaurantPage } from "@/components/RestaurantPage";
import { restaurants } from "@/data/restaurants";

// Set per-domain build (see backend/README.md's deployment notes / the
// Timeweb per-domain build commands) so each domain's own root "/" shows
// that restaurant directly, instead of the GitHub Pages-era client
// redirect. Unset — the default `npm run build` — keeps today's redirect
// behavior unchanged (root "/" → /ekranidze).
const PRIMARY_RESTAURANT_ID = process.env.PRIMARY_RESTAURANT;
const primaryRestaurant = PRIMARY_RESTAURANT_ID
  ? restaurants.find((r) => r.id === PRIMARY_RESTAURANT_ID)
  : undefined;

export function generateMetadata(): Metadata {
  if (primaryRestaurant?.id === "ekranidze") {
    return {
      title: "Экранидзе — грузинская кухня в Люберцах",
      description:
        "Экранидзе — хинкали, хачапури и другие блюда грузинской кухни по традиционным рецептам. Ресторан в Люберцах, самовывоз и доставка.",
    };
  }
  if (primaryRestaurant?.id === "mama-hinkali") {
    return {
      title: "Мама хинкали — грузинская кухня в Москве",
      description:
        "Мама хинкали — хинкали, хачапури и другие блюда грузинской кухни. Рестораны в Москве, самовывоз и доставка.",
    };
  }
  return {};
}

export default function Home() {
  if (primaryRestaurant) {
    return <RestaurantPage restaurant={primaryRestaurant} />;
  }
  return <HomeRedirect />;
}
