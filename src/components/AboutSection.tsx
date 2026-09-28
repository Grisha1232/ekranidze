const STATS = [
  { value: "5+", label: "лет на районе" },
  { value: "300", label: "хинкали лепим в день" },
  { value: "20", label: "блюд в меню" },
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
              Небольшая хинкальная с открытой кухней
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Начинали с одной вывески во дворе — текст-заглушка про историю
              бизнеса, основателей и подход к продуктам. Замените этот блок
              настоящей историей, фотографиями кухни и командой.
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
      </div>
    </section>
  );
}
