import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { AboutSection } from "@/components/AboutSection";
import { DeliverySection } from "@/components/DeliverySection";
import { ContactsFooter } from "@/components/ContactsFooter";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <AboutSection />
        <DeliverySection />
      </main>
      <ContactsFooter />
      <CartDrawer />
    </div>
  );
}
