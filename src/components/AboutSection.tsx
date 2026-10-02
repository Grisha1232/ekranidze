import { getMenu } from "@/data/menu";
import type { Restaurant } from "@/data/restaurants";

const AMENITIES = [
  "Детское меню",
  "Летняя веранда",
  "Wi-Fi",
  "Можно с собакой",
  "Оплата картой",
  "Кофе и чай навынос",
  "Спортивные трансляции",
  "Проектор для мероприятий",
];

export function AboutSection({ restaurant }: { restaurant: Restaurant }) {
  const { categories, menuItems } = getMenu(restaurant.id);
  const foodCategories = categories.filter((c) => c.group === "food");
  const foodItemCount = menuItems.filter((item) =>
    foodCategories.some((c) => c.id === item.categoryId),
  ).length;
  const stats = [
    { value: restaurant.ratingValue, label: "рейтинг на Яндекс Картах" },
    { value: `${foodItemCount}+`, label: "блюд в меню" },
    { value: `${foodCategories.length}`, label: "категорий меню" },
  ];

  return (
    <section id="about" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              О нас
            </span>
            <h2 className="font-display text-3xl text-foreground">
              {restaurant.aboutHeading}
            </h2>
            {restaurant.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background px-4 py-6 text-center"
              >
                <p className="font-display text-2xl text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {restaurant.isPlaceholder ? (
            <span className="rounded-full border border-dashed border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Удобства уточняются
            </span>
          ) : (
            AMENITIES.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
