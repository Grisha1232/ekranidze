export function ContactsFooter() {
  return (
    <footer id="contacts" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-foreground">Хинкали Дом</p>
          <p className="mt-2 text-sm text-muted-foreground">
            ул. Примерная, 1, Москва
          </p>
          <p className="text-sm text-muted-foreground">Ежедневно, 10:00–22:00</p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Связаться</p>
          <a
            href="tel:+70000000000"
            className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
          >
            +7 (000) 000-00-00
          </a>
          <a
            href="mailto:hello@example.com"
            className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
          >
            hello@example.com
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Мы в сети</p>
          <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Telegram
            </a>
            <a href="#" className="hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground">
              VK
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Хинкали Дом. Плейсхолдер-контент, замените перед запуском.
      </div>
    </footer>
  );
}
