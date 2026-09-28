"use client";

import { useState } from "react";
import { MenuItemCard } from "@/components/MenuItemCard";
import { categories, menuItems } from "@/data/menu";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const items = menuItems.filter((item) => item.categoryId === activeCategory);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Меню
        </span>
        <h2 className="font-display text-3xl text-foreground">Что лепим сегодня</h2>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-primary"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
