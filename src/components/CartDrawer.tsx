"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartDrawer({ restaurantId }: { restaurantId: string }) {
  const { lines: allLines, isOpen, closeCart, setQuantity, removeItem } = useCart();
  const lines = allLines.filter((line) => line.restaurantId === restaurantId);
  const totalPrice = lines.reduce(
    (sum, line) => sum + line.quantity * line.item.price,
    0,
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-surface shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Корзина"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Ваш заказ</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
            aria-label="Закрыть корзину"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Пока пусто. Добавьте что-нибудь из меню.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.item.id} className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {line.item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {line.item.price} ₽{line.item.weight ? ` · ${line.item.weight}` : ""}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.item.id, restaurantId, line.quantity - 1)
                        }
                        className="h-7 w-7 rounded-full border border-border text-sm hover:border-primary"
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.item.id, restaurantId, line.quantity + 1)
                        }
                        className="h-7 w-7 rounded-full border border-border text-sm hover:border-primary"
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(line.item.id, restaurantId)}
                        className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {line.item.price * line.quantity} ₽
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground">Итого</span>
            <span className="font-display text-lg text-foreground">
              {totalPrice} ₽
            </span>
          </div>

          {lines.length === 0 ? (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground opacity-40"
            >
              Оформить заказ
            </button>
          ) : (
            <Link
              href={`/checkout?restaurant=${restaurantId}`}
              onClick={closeCart}
              className="block w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Оформить заказ
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
