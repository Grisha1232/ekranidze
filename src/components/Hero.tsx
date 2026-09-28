import { PlaceholderImage } from "@/components/PlaceholderImage";

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Люберцы, грузинская кухня
          </span>
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Хинкали и хачапури по традиционным рецептам
          </h1>
          <p className="max-w-md text-base text-muted-foreground">
            Уютный грузинский ресторан с летней верандой — приходите поужинать
            или заберите блюда с собой. Расскажем ниже про меню и доставку.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Смотреть меню
            </a>
            <a
              href="#delivery"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              Условия доставки
            </a>
          </div>
        </div>

        <PlaceholderImage
          label="Экранидзе"
          tone="clay"
          className="aspect-[4/3] w-full rounded-2xl"
        />
      </div>
    </section>
  );
}
