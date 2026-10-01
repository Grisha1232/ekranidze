import Link from "next/link";
import { CartButton } from "@/components/CartButton";
import { restaurants, type Restaurant } from "@/data/restaurants";

const NAV_LINKS = [
  { href: "#menu", label: "Меню" },
  { href: "#about", label: "О нас" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export function Header({ restaurant }: { restaurant: Restaurant }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {restaurants.map((r, i) => (
            <span key={r.id} className="flex items-baseline gap-2">
              {i > 0 && <span className="text-border">·</span>}
              <Link
                href={r.path}
                className={
                  r.id === restaurant.id
                    ? "font-georgian text-xl font-semibold text-foreground"
                    : "font-georgian text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {r.name}
              </Link>
            </span>
          ))}
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={restaurant.phoneHref}
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            {restaurant.phone}
          </a>
          <CartButton restaurantId={restaurant.id} />
        </div>
      </div>
    </header>
  );
}
