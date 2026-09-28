export function ContactsFooter() {
  return (
    <footer id="contacts" className="border-t border-border bg-surface">
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
            Как доехать
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
