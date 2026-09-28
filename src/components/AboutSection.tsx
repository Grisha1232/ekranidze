const STATS = [
  { value: "4.8", label: "рейтинг на Яндекс Картах" },
  { value: "45+", label: "блюд в меню" },
  { value: "9", label: "категорий меню" },
];

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

export function AboutSection() {
  return (
    <section id="about" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              О нас
            </span>
            <h2 className="font-display text-3xl text-foreground">
              Уголок Грузии в Люберцах
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Готовим по традиционным грузинским рецептам — от хачапури
              по-аджарски до наваристого харчо. Стараемся брать свежие
              сезонные продукты и держать в меню и классику, и домашние
              блюда, которые не встретишь в обычном ресторане.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Внутри — тёплая, семейная атмосфера: сюда приходят и на ужин
              с детьми, и посидеть с друзьями на веранде летним вечером.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
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
          {AMENITIES.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
