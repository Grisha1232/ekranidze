"use client";

import { useCart } from "@/context/CartContext";

export function CartButton({ restaurantId }: { restaurantId: string }) {
  const { lines, openCart } = useCart();
  const totalCount = lines
    .filter((line) => line.restaurantId === restaurantId)
    .reduce((sum, line) => sum + line.quantity, 0);

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          d="M3 4h2l2.2 11.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      <span className="hidden sm:inline">Корзина</span>
      {totalCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
          {totalCount}
        </span>
      )}
    </button>
  );
}
