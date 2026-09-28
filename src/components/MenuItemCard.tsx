"use client";

import Image from "next/image";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      {item.image ? (
        <div className="relative h-36 w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : (
        <PlaceholderImage label={item.name} tone={item.tone} className="h-36 w-full" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold text-foreground">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
        <div className="flex-1" />
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
