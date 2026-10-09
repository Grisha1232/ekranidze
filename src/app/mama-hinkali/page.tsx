import type { Metadata } from "next";
import { RestaurantPage } from "@/components/RestaurantPage";
import { restaurants } from "@/data/restaurants";

export const metadata: Metadata = {
  title: "Мама хинкали — грузинская кухня в Москве",
  description:
    "Мама хинкали — хинкали, хачапури и другие блюда грузинской кухни. Рестораны в Москве, самовывоз и доставка.",
};

export default function MamaHinkaliPage() {
  const restaurant = restaurants.find((r) => r.id === "mama-hinkali")!;
  return <RestaurantPage restaurant={restaurant} />;
}
