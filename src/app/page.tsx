import type { Metadata } from "next";
import { RestaurantChooser } from "@/components/RestaurantChooser";

// The client wants every production domain (ekranidze.ru/.рф,
// mama-hinkali.ru/.рф) to land here first and let the visitor pick a
// restaurant, instead of a domain jumping straight to "its own" restaurant —
// see RestaurantChooser for the per-visit (sessionStorage) persistence of
// that choice. One build now serves every domain; there's no more
// per-domain PRIMARY_RESTAURANT build flag.
export const metadata: Metadata = {
  title: "Грузинская кухня — выберите ресторан",
  description:
    "Экранидзе и Мама хинкали — хинкали, хачапури и другие блюда грузинской кухни. Выберите ресторан, чтобы посмотреть меню, адреса и доставку.",
};

export default function Home() {
  return <RestaurantChooser />;
}
