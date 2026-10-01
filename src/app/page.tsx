import { RestaurantPage } from "@/components/RestaurantPage";
import { restaurants } from "@/data/restaurants";

export default function Home() {
  const restaurant = restaurants.find((r) => r.id === "ekranidze")!;
  return <RestaurantPage restaurant={restaurant} />;
}
