"use client";

import { useState } from "react";
import { MenuItemCard } from "@/components/MenuItemCard";
import { useContent } from "@/context/ContentContext";
import type { MenuGroup } from "@/data/menu";

const GROUP_LABELS: Record<MenuGroup, string> = {
  food: "Еда",
  drinks: "Напитки",
};

export function MenuSection({ restaurantId }: { restaurantId: string }) {
  const { getMenu } = useContent();
  const { categories, menuItems } = getMenu(restaurantId);
  const [group, setGroup] = useState<MenuGroup>("food");
  const groupCategories = categories.filter((c) => c.group === group);
  const [activeCategory, setActiveCategory] = useState(groupCategories[0]?.id);

  const currentCategoryId = groupCategories.some((c) => c.id === activeCategory)
    ? activeCategory
    : groupCategories[0]?.id;

  const items = menuItems.filter((item) => item.categoryId === currentCategoryId);

  const selectGroup = (next: MenuGroup) => {
    setGroup(next);
    const firstCategory = categories.find((c) => c.group === next);
    if (firstCategory) setActiveCategory(firstCategory.id);
  };

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Меню
        </span>
        <h2 className="font-display text-3xl text-foreground">Что лепим сегодня</h2>
      </div>

      <div className="mb-6 flex w-fit gap-1 rounded-full border border-border bg-surface p-1">
        {(Object.keys(GROUP_LABELS) as MenuGroup[]).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => selectGroup(g)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              group === g
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {GROUP_LABELS[g]}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {groupCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              currentCategoryId === category.id
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
          <MenuItemCard key={item.id} item={item} restaurantId={restaurantId} />
        ))}
      </div>
    </section>
  );
}
