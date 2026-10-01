"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "@/data/menu";

export type CartLine = {
  item: MenuItem;
  quantity: number;
  /** Which restaurant's page this was added from — carts don't mix between
   *  restaurants, since each is its own business with its own checkout. */
  restaurantId: string;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem, restaurantId: string) => void;
  removeItem: (itemId: string, restaurantId: string) => void;
  setQuantity: (itemId: string, restaurantId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "khinkali-dom:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Local-only persistence — this cart never talks to a server. See CLAUDE.md.
  useEffect(() => {
    let stored: CartLine[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      // Carts saved before the multi-restaurant split have no restaurantId —
      // the site only had "ekranidze" back then.
      stored = parsed.map((line: CartLine) => ({
        ...line,
        restaurantId: line.restaurantId ?? "ekranidze",
      }));
    } catch {
      stored = [];
    }
    // One-time sync from localStorage on mount — intentional, localStorage
    // isn't readable during SSR so this can't be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(stored);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isHydrated]);

  const addItem = (item: MenuItem, restaurantId: string) => {
    setLines((prev) => {
      const existing = prev.find(
        (line) => line.item.id === item.id && line.restaurantId === restaurantId,
      );
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id && line.restaurantId === restaurantId
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...prev, { item, quantity: 1, restaurantId }];
    });
  };

  const removeItem = (itemId: string, restaurantId: string) => {
    setLines((prev) =>
      prev.filter(
        (line) => !(line.item.id === itemId && line.restaurantId === restaurantId),
      ),
    );
  };

  const setQuantity = (itemId: string, restaurantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId, restaurantId);
      return;
    }
    setLines((prev) =>
      prev.map((line) =>
        line.item.id === itemId && line.restaurantId === restaurantId
          ? { ...line, quantity }
          : line,
      ),
    );
  };

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
