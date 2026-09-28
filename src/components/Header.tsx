import Link from "next/link";
import { CartButton } from "@/components/CartButton";

const NAV_LINKS = [
  { href: "#menu", label: "Меню" },
  { href: "#about", label: "О нас" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="#" className="font-display text-xl font-semibold text-foreground">
          Экранидзе
        </Link>

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
            href="tel:+79015137196"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            +7 901 513-71-96
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
