// Coordinates + org id taken from the client's Yandex Maps listing
// (https://yandex.ru/maps/org/169306513048) — update if the location changes.
const MAP_EMBED_SRC =
  "https://yandex.ru/map-widget/v1/?ll=37.865337%2C55.687918&z=16&pt=37.865337%2C55.687918%2Cpm2rdl";

export function ContactsFooter() {
  return (
    <footer id="contacts" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Контакты
          </span>
          <h2 className="font-display text-3xl text-foreground">Как до нас добраться</h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            src={MAP_EMBED_SRC}
            title="Карта — как добраться до ресторана «Экранидзе»"
            width="100%"
            height="360"
            loading="lazy"
            className="block"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-foreground">Экранидзе</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Московская обл., Люберцы, мкр. Городок Б, ул. 3-е Почтовое
            Отделение, 68/4
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Связаться</p>
          <a
            href="tel:+79015137196"
            className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
          >
            +7 901 513-71-96
          </a>
          <a
            href="https://yandex.ru/maps/org/169306513048"
            className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
          >
            Открыть в Яндекс Картах
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Мы в сети</p>
          <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
            <a
              href="https://telegram.me/ekranidze"
              className="hover:text-foreground"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Экранидзе · ИНН 5027322822 · ОГРН
        1235000143784. Меню и цены — на дату сборки сайта, сверьте перед
        запуском.
      </div>
    </footer>
  );
}
