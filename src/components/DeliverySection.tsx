const CARDS = [
  {
    title: "Самовывоз",
    body: "Заберите заказ прямо в ресторане в Люберцах — адрес и как доехать в разделе «Контакты».",
  },
  {
    title: "Доставка",
    body: "Онлайн-заказ на сайте пока в разработке. Сейчас принимаем заказы по телефону — доставка обсуждается с курьером на месте.",
  },
  {
    title: "Скоро",
    body: "Планируем подключить доставку через Яндекс.Еду, а дальше — собственных курьеров.",
  },
];

export function DeliverySection() {
  return (
    <section id="delivery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Доставка
        </span>
        <h2 className="font-display text-3xl text-foreground">Как забрать заказ</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <h3 className="font-display text-lg text-foreground">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
