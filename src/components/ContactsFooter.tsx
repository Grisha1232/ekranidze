import type { Restaurant } from "@/data/restaurants";

function buildMapSrc(restaurant: Restaurant) {
  const points = restaurant.addresses.filter((a) => a.coords);
  if (points.length === 0) return null;

  const centerLon =
    points.reduce((sum, p) => sum + p.coords![0], 0) / points.length;
  const centerLat =
    points.reduce((sum, p) => sum + p.coords![1], 0) / points.length;
  const zoom = points.length > 1 ? 12 : 16;
  const pins = points
    .map((p) => `${p.coords![0]},${p.coords![1]},pm2rdl`)
    .join("~");

  return `https://yandex.ru/map-widget/v1/?ll=${centerLon}%2C${centerLat}&z=${zoom}&pt=${pins}`;
}

export function ContactsFooter({ restaurant }: { restaurant: Restaurant }) {
  const mapSrc = buildMapSrc(restaurant);

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
          {mapSrc ? (
            <iframe
              src={mapSrc}
              title={`Карта — как добраться до ресторана «${restaurant.name}»`}
              width="100%"
              height="360"
              loading="lazy"
              className="block"
            />
          ) : (
            <div className="flex h-[360px] items-center justify-center bg-background px-6 text-center text-sm text-muted-foreground">
              Карта появится, когда будут известны точные адреса.
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div
          className={`grid gap-6 ${restaurant.addresses.length > 1 ? "sm:grid-cols-2" : ""}`}
        >
          {restaurant.addresses.map((address) => (
            <div key={address.id}>
              <p className="font-display text-lg text-foreground">
                {address.label ? `${restaurant.name} · ${address.label}` : restaurant.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{address.addressText}</p>
              {address.yandexUrl && (
                <a
                  href={address.yandexUrl}
                  className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                >
                  Открыть в Яндекс Картах
                </a>
              )}
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Связаться</p>
          <a
            href={restaurant.phoneHref}
            className="mt-2 block text-sm text-muted-foreground hover:text-foreground"
          >
            {restaurant.phone}
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Мы в сети</p>
          <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
            {restaurant.telegram ? (
              <a href={restaurant.telegram} className="hover:text-foreground">
                Telegram
              </a>
            ) : (
              <span>Скоро</span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {restaurant.name} · {restaurant.legalInfo}. Меню и цены
        — на дату сборки сайта, сверьте перед запуском.
      </div>
    </footer>
  );
}
