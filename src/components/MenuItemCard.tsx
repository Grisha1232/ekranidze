"use client";

import Image from "next/image";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { useCart } from "@/context/CartContext";
import { BASE_PATH } from "@/lib/base-path";
import type { MenuItem } from "@/data/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { lines, addItem, setQuantity } = useCart();
  const quantity = lines.find((line) => line.item.id === item.id)?.quantity ?? 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      {item.image ? (
        <div className="relative h-36 w-full">
          <Image
            src={`${BASE_PATH}${item.image}`}
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
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.id, quantity - 1)}
                className="h-7 w-7 rounded-full border border-border text-sm text-foreground hover:border-primary"
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className="w-4 text-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, quantity + 1)}
                className="h-7 w-7 rounded-full border border-border text-sm text-foreground hover:border-primary"
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addItem(item)}
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
