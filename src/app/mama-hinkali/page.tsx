import type { Metadata } from "next";
import { RestaurantPage } from "@/components/RestaurantPage";
import { restaurants } from "@/data/restaurants";

export const metadata: Metadata = {
  title: "Мама хинкали — страница в разработке",
  description:
    "Страница ресторана «Мама хинкали» в разработке. Меню и контакты временно совпадают с «Экранидзе».",
};

export default function MamaHinkaliPage() {
  const restaurant = restaurants.find((r) => r.id === "mama-hinkali")!;
  return <RestaurantPage restaurant={restaurant} />;
}
