import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { AboutSection } from "@/components/AboutSection";
import { DeliverySection } from "@/components/DeliverySection";
import { ContactsFooter } from "@/components/ContactsFooter";
import { CartDrawer } from "@/components/CartDrawer";
import type { Restaurant } from "@/data/restaurants";

export function RestaurantPage({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header restaurant={restaurant} />
      {restaurant.isPlaceholder && (
        <div className="border-b border-border bg-background px-4 py-2 text-center text-xs text-muted-foreground sm:px-6">
          Страница «{restaurant.name}» в разработке — меню и контакты временные.
        </div>
      )}
      <main className="flex-1">
        <Hero restaurant={restaurant} />
        <MenuSection />
        <AboutSection restaurant={restaurant} />
        <DeliverySection />
      </main>
      <ContactsFooter restaurant={restaurant} />
      <CartDrawer />
    </div>
  );
}
