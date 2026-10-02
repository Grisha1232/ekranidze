export type RestaurantAddress = {
  id: string;
  /** Shown above the address when a restaurant has more than one location. */
  label?: string;
  addressText: string;
  /** [longitude, latitude] — Yandex Maps' own coordinate order. Omit while
   *  the real location isn't confirmed yet; the map renders a placeholder
   *  instead of guessing a pin. */
  coords?: [number, number];
  yandexUrl?: string;
};

export type Restaurant = {
  id: string;
  /** Route segment this restaurant's page lives at. */
  path: string;
  name: string;
  /** Letter shown by PlaceholderImage/LogoCarousel until a real logo file exists. */
  shortLabel: string;
  /** Real logo image in public/logos/ — shown instead of the font-styled
   *  PlaceholderImage text in the Hero logo carousel when present. */
  logoImage?: string;
  tone: "warm" | "clay" | "olive";
  badge: string;
  heroHeading: string;
  heroText: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  /** e.g. "4.8" or "—" while unknown — never invent a rating. */
  ratingValue: string;
  phone: string;
  phoneHref: string;
  telegram?: string;
  legalInfo: string;
  addresses: RestaurantAddress[];
  /** True while this restaurant's business data (address/phone/menu/etc.) is
   *  a stub pending real input from the client — see CLAUDE.md on not
   *  treating business data as throwaway placeholder text once it's real. */
  isPlaceholder?: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: "ekranidze",
    path: "/ekranidze",
    name: "Экранидзе",
    shortLabel: "Экранидзе",
    tone: "clay",
    badge: "Люберцы, грузинская кухня",
    heroHeading: "Хинкали и хачапури по традиционным рецептам",
    heroText:
      "Уютный грузинский ресторан с летней верандой — приходите поужинать или заберите блюда с собой. Расскажем ниже про меню и доставку.",
    aboutHeading: "Уголок Грузии в Люберцах",
    aboutParagraphs: [
      "Готовим по традиционным грузинским рецептам — от хачапури по-аджарски до наваристого харчо. Стараемся брать свежие сезонные продукты и держать в меню и классику, и домашние блюда, которые не встретишь в обычном ресторане.",
      "Внутри — тёплая, семейная атмосфера: сюда приходят и на ужин с детьми, и посидеть с друзьями на веранде летним вечером.",
    ],
    ratingValue: "4.8",
    phone: "+7 901 513-71-96",
    phoneHref: "tel:+79015137196",
    telegram: "https://telegram.me/ekranidze",
    legalInfo: "ИНН 5027322822 · ОГРН 1235000143784",
    addresses: [
      {
        id: "ekranidze-main",
        addressText:
          "Московская обл., Люберцы, мкр. Городок Б, ул. 3-е Почтовое Отделение, 68/4",
        coords: [37.865337, 55.687918],
        yandexUrl: "https://yandex.ru/maps/org/169306513048",
      },
    ],
  },
  {
    id: "mama-hinkali",
    path: "/mama-hinkali",
    name: "Мама хинкали",
    shortLabel: "Мама хинкали",
    logoImage: "/logos/mama-hinkali-wordmark.png",
    tone: "olive",
    badge: "Москва, грузинская кухня",
    heroHeading: "Хинкали, хачапури и грузинское застолье в Москве",
    heroText:
      "Открываем точки в Москве — адреса и меню ниже. Раздел «О нас» и фотографии блюд пока в разработке.",
    aboutHeading: "Страница в разработке",
    aboutParagraphs: [
      "Раздел «О нас» для «Мама хинкали» ещё не наполнен реальным текстом — это временная заглушка до получения материалов от клиента.",
    ],
    ratingValue: "—",
    phone: "+7 499 455-66-21",
    phoneHref: "tel:+74994556621",
    legalInfo: "ИНН 9725187088 · ОГРН 1257700255823",
    isPlaceholder: true,
    addresses: [
      {
        id: "mama-hinkali-shukhova",
        label: "Работает",
        addressText: "ул. Шухова, 21, Москва",
        coords: [37.608805, 55.716351],
        yandexUrl:
          "https://yandex.ru/maps/213/moscow/house/ulitsa_shukhova_21/37.608805,55.716351",
      },
      {
        id: "mama-hinkali-dukhovskoy",
        label: "Откроется позже",
        addressText: "Духовской пер., 17с16, Москва",
        coords: [37.616773, 55.704874],
        yandexUrl:
          "https://yandex.ru/maps/213/moscow/house/dukhovskoy_pereulok_17s16/Z04YcAZmTkIEQFtvfXtxdXRkYA==/",
      },
    ],
  },
];
