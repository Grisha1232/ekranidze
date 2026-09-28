"use client";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <PlaceholderImage label={item.name} tone={item.tone} className="h-36 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold text-foreground">
          {item.name}
        </h3>
        <p className="flex-1 text-sm text-muted-foreground">{item.description}</p>
        <p className="text-xs text-muted-foreground">{item.weight}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-lg text-foreground">
            {item.price} ₽
          </span>
          <button
            type="button"
            onClick={() => addItem(item)}
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
