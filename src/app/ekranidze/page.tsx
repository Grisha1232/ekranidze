import type { Metadata } from "next";
import { RestaurantPage } from "@/components/RestaurantPage";
import { restaurants } from "@/data/restaurants";

export const metadata: Metadata = {
  title: "Экранидзе — грузинская кухня в Люберцах",
  description:
    "Экранидзе — хинкали, хачапури и другие блюда грузинской кухни по традиционным рецептам. Ресторан в Люберцах, самовывоз и доставка.",
};

export default function EkranidzePage() {
  const restaurant = restaurants.find((r) => r.id === "ekranidze")!;
  return <RestaurantPage restaurant={restaurant} />;
}
