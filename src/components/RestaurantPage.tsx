"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { AboutSection } from "@/components/AboutSection";
import { DeliverySection } from "@/components/DeliverySection";
import { ContactsFooter } from "@/components/ContactsFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { useContent } from "@/context/ContentContext";
import type { CustomSection, Restaurant } from "@/data/restaurants";

function CustomSections({ sections }: { sections: CustomSection[] }) {
  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl text-foreground">{s.title}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {s.body}
          </p>
        </section>
      ))}
    </>
  );
}

export function RestaurantPage({ restaurant: initialRestaurant }: { restaurant: Restaurant }) {
  const { restaurants } = useContent();
  const restaurant = restaurants.find((r) => r.id === initialRestaurant.id) ?? initialRestaurant;
  const sections = restaurant.customSections ?? [];
  const byPlacement = (p: CustomSection["placement"]) => sections.filter((s) => s.placement === p);

  return (
    <div className="flex min-h-screen flex-col">
      <Header restaurant={restaurant} />
      {restaurant.isPlaceholder && (
        <div className="border-b border-border bg-background px-4 py-2 text-center text-xs text-muted-foreground sm:px-6">
          Страница «{restaurant.name}» в разработке — раздел «О нас» и фото блюд пока временные.
        </div>
      )}
      <main className="flex-1">
        <Hero restaurant={restaurant} />
        <CustomSections sections={byPlacement("after_hero")} />
        <MenuSection restaurantId={restaurant.id} />
        <CustomSections sections={byPlacement("after_menu")} />
        <AboutSection restaurant={restaurant} />
        <CustomSections sections={byPlacement("after_about")} />
        <DeliverySection />
        <CustomSections sections={byPlacement("after_delivery")} />
      </main>
      <ContactsFooter restaurant={restaurant} />
      <CartDrawer restaurantId={restaurant.id} />
    </div>
  );
}
