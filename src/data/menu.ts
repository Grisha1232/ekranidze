export type MenuGroup = "food" | "drinks";

export type MenuCategory = {
  id: string;
  title: string;
  group: MenuGroup;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  /** Omitted for a few addon lines (tea/coffee extras) that are priced
   *  per item with no stated serving size. */
  weight?: string;
  price: number;
  tone: "warm" | "clay" | "olive";
  /** Real dish photo in public/menu/, sourced from the client's existing site.
   *  Falls back to PlaceholderImage (by `tone`) when absent. */
  image?: string;
};

export type RestaurantMenu = {
  categories: MenuCategory[];
  menuItems: MenuItem[];
};

const TONES = ["warm", "clay", "olive"] as const;

type RawItem = Omit<MenuItem, "tone">;

function withTones(items: RawItem[]): MenuItem[] {
  return items.map((item, i) => ({ ...item, tone: TONES[i % TONES.length] }));
}

// ---------------------------------------------------------------------------
// Экранидзе — sourced from the restaurant's printed menu (2026-10). Real
// dishes/weights/prices; photos kept where they match an existing file in
// public/menu/ (originally sourced from the client's old site).
// ---------------------------------------------------------------------------

export const ekranidzeCategories: MenuCategory[] = [
  { id: "cold", title: "Холодные закуски", group: "food" },
  { id: "salads", title: "Салаты", group: "food" },
  { id: "khinkali", title: "Хинкали", group: "food" },
  { id: "pastry", title: "Грузинская выпечка", group: "food" },
  { id: "soups", title: "Супы", group: "food" },
  { id: "sides", title: "Гарниры", group: "food" },
  { id: "hot", title: "Горячие блюда", group: "food" },
  { id: "sauce", title: "Соус", group: "food" },
  { id: "desserts", title: "Десерты", group: "food" },
  { id: "water", title: "Вода", group: "drinks" },
  { id: "soda", title: "Газированные напитки", group: "drinks" },
  { id: "lemonade", title: "Лимонады", group: "drinks" },
  { id: "juice-assorted", title: "Соки в ассортименте", group: "drinks" },
  { id: "fresh-juice", title: "Свежевыжатые соки", group: "drinks" },
  { id: "mocktails", title: "Безалкогольные коктейли", group: "drinks" },
  { id: "fruit-tea", title: "Фруктовый чай", group: "drinks" },
  { id: "tea", title: "Чай", group: "drinks" },
  { id: "tea-extra", title: "Дополнительно к чаю", group: "drinks" },
  { id: "own-production", title: "Напитки собственного производства", group: "drinks" },
  { id: "coffee", title: "Кофе", group: "drinks" },
  { id: "coffee-extra", title: "Дополнительно к кофе", group: "drinks" },
];

const ekranidzeRawItems: RawItem[] = [
  // Холодные закуски
  { id: "pkhali-assorted", categoryId: "cold", name: "Ассорти пхали", description: "шпинат/свёкла/фасоль", weight: "120 г", price: 690, image: "/menu/pkhali-assorted.jpg" },
  { id: "satsivi", categoryId: "cold", name: "Сациви из курицы под соусом Баже", weight: "220 г", price: 650, image: "/menu/satsivi.jpg" },
  { id: "eggplant-rolls", categoryId: "cold", name: "Рулетики из баклажанов", description: "грецкий орех/кинза/чеснок", weight: "150 г", price: 690, image: "/menu/eggplant-rolls.jpg" },
  { id: "beetroot-tkemali", categoryId: "cold", name: "Свёкла в ткемали", weight: "160 г", price: 590, image: "/menu/beetroot-tkemali.jpg" },
  { id: "kuchmachi-cold", categoryId: "cold", name: "Кучмачи из курицы", weight: "220 г", price: 740, image: "/menu/kuchmachi-cold.jpg" },
  { id: "shinauri", categoryId: "cold", name: "Шинаури", description: "баклажан/перец/помидор/лук/орехи", weight: "150 г", price: 690, image: "/menu/shinauri.jpg" },
  { id: "cheese-assorted", categoryId: "cold", name: "Ассорти из сыров", description: "сулугуни молочный/имеретинский/копчёный сулугуни/чечил", weight: "350 г", price: 1100, image: "/menu/cheese-assorted.jpg" },
  { id: "pickles-assorted", categoryId: "cold", name: "Ассорти из солений", description: "огурцы/гурийская капуста/чеснок/помидоры", weight: "350 г", price: 1050, image: "/menu/pickles-assorted.jpg" },
  { id: "vegetable-bouquet", categoryId: "cold", name: "Овощной букет", description: "свежие овощи/зелень", weight: "400 г", price: 1150, image: "/menu/vegetable-bouquet.jpg" },
  { id: "beef-tongue", categoryId: "cold", name: "Говяжий язык", weight: "100 г", price: 990 },
  { id: "sudzhuk", categoryId: "cold", name: "Суджук", weight: "100 г", price: 790 },
  { id: "basturma", categoryId: "cold", name: "Бастурма", weight: "100 г", price: 980 },

  // Салаты
  { id: "vegetable-salad", categoryId: "salads", name: "Овощной салат", description: "огурец/томаты/зелень/кахетинское масло", weight: "220 г", price: 670, image: "/menu/vegetable-salad.jpg" },
  { id: "vegetable-salad-georgian", categoryId: "salads", name: "Овощной салат по-грузински", description: "огурец/томаты/зелень/орехи/кахетинское масло", weight: "250 г", price: 690, image: "/menu/vegetable-salad-georgian.jpg" },
  { id: "eggplant-salad", categoryId: "salads", name: "Салат с хрустящим баклажаном", description: "соус сладкий чили/томаты/сыр/зелень", weight: "250 г", price: 790, image: "/menu/eggplant-salad.jpg" },
  { id: "salad-tbilisi", categoryId: "salads", name: "Салат Тбилиси", description: "томленная говядина/красная фасоль/красный лук/зелень", weight: "230 г", price: 720, image: "/menu/salad-tbilisi.jpg" },
  { id: "warm-beef-salad", categoryId: "salads", name: "Тёплый салат с говядиной по-грузински", weight: "220 г", price: 920, image: "/menu/warm-beef-salad.jpg" },
  { id: "caesar-chicken", categoryId: "salads", name: "Цезарь с курицей", weight: "220 г", price: 790, image: "/menu/caesar-chicken.jpg" },
  { id: "caesar-shrimp", categoryId: "salads", name: "Цезарь с креветками", weight: "220 г", price: 920, image: "/menu/caesar-shrimp.jpg" },

  // Хинкали
  { id: "khinkali-classic", categoryId: "khinkali", name: "Классические", description: "от 3-х шт", weight: "100 г", price: 110, image: "/menu/khinkali-classic.jpg" },
  { id: "khinkali-beef", categoryId: "khinkali", name: "С говядиной", description: "от 3-х шт", weight: "100 г", price: 120, image: "/menu/khinkali-beef.jpg" },
  { id: "khinkali-lamb", categoryId: "khinkali", name: "С бараниной", description: "от 3-х шт", weight: "100 г", price: 130 },
  { id: "khinkali-mushroom", categoryId: "khinkali", name: "С грибами", description: "от 3-х шт", weight: "100 г", price: 110 },
  { id: "khinkali-cheese", categoryId: "khinkali", name: "С сыром", description: "от 3-х шт", weight: "100 г", price: 110 },

  // Грузинская выпечка
  { id: "khachapuri-adjaruli", categoryId: "pastry", name: "Хачапури по-аджарски", description: "в виде лодочки с яйцом и маслом", weight: "400 г", price: 690, image: "/menu/khachapuri-adjaruli.jpg" },
  { id: "khachapuri-imeretian", categoryId: "pastry", name: "Хачапури по-имеретински", weight: "400 г", price: 720 },
  { id: "khachapuri-megrelian", categoryId: "pastry", name: "Хачапури по-мегрельски", weight: "450 г", price: 750, image: "/menu/khachapuri-megrelian.jpg" },
  { id: "penovani", categoryId: "pastry", name: "Пеновани", description: "конверт из слоеного теста с двумя видами сыра", weight: "400 г", price: 760, image: "/menu/penovani.jpg" },
  { id: "lavash", categoryId: "pastry", name: "Грузинский лаваш", weight: "150 г", price: 150, image: "/menu/lavash.jpg" },

  // Супы
  { id: "chikhirtma", categoryId: "soups", name: "Чихиртма", description: "грузинский куриный суп с пряностями", weight: "350 г", price: 590, image: "/menu/chikhirtma.jpg" },
  { id: "kharcho", categoryId: "soups", name: "Харчо", weight: "350 г", price: 690, image: "/menu/kharcho.jpg" },
  { id: "tatariakhni", categoryId: "soups", name: "Татариахни", description: "говяжий бульон/овощи", weight: "350 г", price: 720, image: "/menu/tatariakhni.jpg" },

  // Гарниры
  { id: "potato-mash", categoryId: "sides", name: "Картофельное пюре", weight: "150 г", price: 320 },
  { id: "potato-fries", categoryId: "sides", name: "Картофель фри", weight: "150 г", price: 290 },
  { id: "potato-country", categoryId: "sides", name: "Картофель по-деревенски", weight: "150 г", price: 320 },

  // Горячие блюда
  { id: "odzhakhuri-pork", categoryId: "hot", name: "Оджахури из свинины", description: "жаркое из свинины по-грузински", weight: "350 г", price: 820, image: "/menu/odzhakhuri-pork.jpg" },
  { id: "odzhakhuri-chicken", categoryId: "hot", name: "Оджахури из курицы", description: "жаркое из курицы по-грузински", weight: "350 г", price: 790, image: "/menu/odzhakhuri-chicken.jpg" },
  { id: "chakhokhbili", categoryId: "hot", name: "Чахохбили", description: "куриное бедро в томатном соусе", weight: "300 г", price: 780, image: "/menu/chakhokhbili.jpg" },
  { id: "chkmeruli", categoryId: "hot", name: "Чкмерули", description: "куриное бедро в сливочно-чесночном соусе с грузинскими травами", weight: "320 г", price: 990, image: "/menu/chkmeruli.jpg" },
  { id: "chanakhi", categoryId: "hot", name: "Чанахи", description: "томлёная баранина в горшочке с овощами и грузинскими травами", weight: "350 г", price: 990 },
  { id: "kuchmachi-hot", categoryId: "hot", name: "Кучмачи из курицы", weight: "250 г", price: 790, image: "/menu/kuchmachi-hot.jpg" },
  { id: "dolma", categoryId: "hot", name: "Долма из говядины и свинины с чесночным мацони", weight: "200/50 г", price: 820, image: "/menu/dolma.jpg" },
  { id: "lobio", categoryId: "hot", name: "Лобио с гурийской капустой", weight: "250/50 г", price: 690, image: "/menu/lobio.jpg" },
  { id: "chashushuli", categoryId: "hot", name: "Чашушули из говядины", description: "тушёная говядина с овощами в остром томатном соусе", weight: "300 г", price: 990, image: "/menu/chashushuli.jpg" },
  { id: "meat-tbilisi", categoryId: "hot", name: "Мясо по-тбилисски", weight: "300 г", price: 820, image: "/menu/meat-tbilisi.jpg" },
  { id: "mushrooms-cheese", categoryId: "hot", name: "Запечённые шампиньоны с сыром", weight: "200 г", price: 670, image: "/menu/mushrooms-cheese.jpg" },
  { id: "sulguni-baked", categoryId: "hot", name: "Запечённый сулугуни с томатами на кеци", weight: "250 г", price: 690, image: "/menu/sulguni-baked.jpg" },
  { id: "chicken-tapaka", categoryId: "hot", name: "Цыплёнок тапака", weight: "1 шт.", price: 1200 },

  // Соус
  { id: "sauce-assorted", categoryId: "sauce", name: "Соус на выбор", description: "Ткемали, Домашняя аджика, Сацебели, Мацони, Сметана, Чесночный соус, Наршараб, Кетчуп", weight: "50 г", price: 150, image: "/menu/sauce-assorted.jpg" },

  // Десерты
  { id: "napoleon", categoryId: "desserts", name: "Наполеон", weight: "150 г", price: 590, image: "/menu/napoleon.jpg" },
  { id: "apple-strudel", categoryId: "desserts", name: "Яблочный штрудель", weight: "120 г", price: 620, image: "/menu/apple-strudel.jpg" },
  { id: "cherry-strudel", categoryId: "desserts", name: "Вишнёвый штрудель", weight: "120 г", price: 680, image: "/menu/cherry-strudel.jpg" },
  { id: "chocolate-fondant", categoryId: "desserts", name: "Шоколадный фондан", weight: "100/50 г", price: 720, image: "/menu/chocolate-fondant.jpg" },
  { id: "jam-assorted", categoryId: "desserts", name: "Домашнее варенье", description: "белая черешня/инжир/кизил", weight: "100 г", price: 390 },
  { id: "ice-cream", categoryId: "desserts", name: "Мороженое", description: "ваниль/шоколад/клубника/сорбет лайм/сорбет манго", weight: "50 г", price: 200 },

  // Вода
  { id: "water-tassay", categoryId: "water", name: "Tassay", description: "газированная", weight: "500 мл", price: 460 },
  { id: "water-borjomi", categoryId: "water", name: "Боржоми", description: "газированная", weight: "500 мл", price: 490 },

  // Газированные напитки
  { id: "cola", categoryId: "soda", name: "Кока-кола", description: "классика/зеро", weight: "300 мл", price: 390 },
  { id: "lemonade-natakhtari", categoryId: "soda", name: "Лимонад НАТАХТАРИ", description: "груша/тархун/барбарис/фейхоа/саперави", weight: "500 мл", price: 390 },

  // Лимонады
  { id: "lemonade-grapefruit-lychee-s", categoryId: "lemonade", name: "Грейпфрут-Личи", weight: "300 мл", price: 510 },
  { id: "lemonade-grapefruit-lychee-l", categoryId: "lemonade", name: "Грейпфрут-Личи", weight: "1000 мл", price: 1250 },
  { id: "lemonade-tarragon-s", categoryId: "lemonade", name: "Тархун", weight: "300 мл", price: 510 },
  { id: "lemonade-tarragon-l", categoryId: "lemonade", name: "Тархун", weight: "1000 мл", price: 1250 },
  { id: "lemonade-seaberry-cranberry-s", categoryId: "lemonade", name: "Облепиха-Клюква", weight: "300 мл", price: 510 },
  { id: "lemonade-seaberry-cranberry-l", categoryId: "lemonade", name: "Облепиха-Клюква", weight: "1000 мл", price: 1250 },
  { id: "lemonade-mango-passion-s", categoryId: "lemonade", name: "Манго-Маракуйя", weight: "300 мл", price: 510 },
  { id: "lemonade-mango-passion-l", categoryId: "lemonade", name: "Манго-Маракуйя", weight: "1000 мл", price: 1250 },
  { id: "lemonade-cucumber-basil-s", categoryId: "lemonade", name: "Огурец-Базилик", weight: "300 мл", price: 510 },
  { id: "lemonade-cucumber-basil-l", categoryId: "lemonade", name: "Огурец-Базилик", weight: "1000 мл", price: 1250 },

  // Соки в ассортименте
  { id: "juice-assorted", categoryId: "juice-assorted", name: "Соки в ассортименте", description: "яблоко/персик/ананас/вишня/апельсин/томат", weight: "200 мл", price: 370 },

  // Свежевыжатые соки
  { id: "fresh-juice-orange", categoryId: "fresh-juice", name: "Апельсиновый", weight: "250 мл", price: 590 },
  { id: "fresh-juice-apple", categoryId: "fresh-juice", name: "Яблочный", weight: "250 мл", price: 590 },
  { id: "fresh-juice-carrot", categoryId: "fresh-juice", name: "Морковный", weight: "250 мл", price: 590 },
  { id: "fresh-juice-grapefruit", categoryId: "fresh-juice", name: "Грейпфрут", weight: "250 мл", price: 620 },

  // Безалкогольные коктейли
  { id: "mojito", categoryId: "mocktails", name: "Мохито", weight: "350 мл", price: 720 },
  { id: "mojito-raspberry", categoryId: "mocktails", name: "Малиновый Мохито", weight: "350 мл", price: 720 },

  // Фруктовый чай
  { id: "fruit-tea-berry", categoryId: "fruit-tea", name: "Ягодный чай", weight: "500 мл", price: 620 },
  { id: "fruit-tea-tropical", categoryId: "fruit-tea", name: "Тропический чай", weight: "500 мл", price: 620 },
  { id: "fruit-tea-ginger", categoryId: "fruit-tea", name: "Имбирный чай", weight: "500 мл", price: 620 },
  { id: "fruit-tea-seaberry", categoryId: "fruit-tea", name: "Облепиховый чай", weight: "500 мл", price: 620 },
  { id: "fruit-tea-cranberry-mint", categoryId: "fruit-tea", name: "Клюква-мята чай", weight: "500 мл", price: 620 },

  // Чай
  { id: "tea-assam", categoryId: "tea", name: "Асам", weight: "500 мл", price: 550 },
  { id: "tea-earl-grey", categoryId: "tea", name: "Эрл Грей", weight: "500 мл", price: 550 },
  { id: "tea-sencha", categoryId: "tea", name: "Сенча", weight: "500 мл", price: 550 },
  { id: "tea-herbal", categoryId: "tea", name: "Травяной сбор", weight: "500 мл", price: 590 },
  { id: "tea-buckwheat", categoryId: "tea", name: "Гречишный", weight: "500 мл", price: 590 },
  { id: "tea-jasmine", categoryId: "tea", name: "Жасмин", weight: "500 мл", price: 590 },
  { id: "tea-milk-oolong", categoryId: "tea", name: "Молочный улун", weight: "500 мл", price: 590 },
  { id: "tea-ivan-sangan", categoryId: "tea", name: "Иван-чай с санган дайля и брусникой", weight: "500 мл", price: 590 },

  // Дополнительно к чаю
  { id: "tea-extra-mint", categoryId: "tea-extra", name: "Мята", price: 180 },
  { id: "tea-extra-lemon", categoryId: "tea-extra", name: "Лимон", price: 190 },
  { id: "tea-extra-ginger", categoryId: "tea-extra", name: "Имбирь", price: 200 },
  { id: "tea-extra-honey", categoryId: "tea-extra", name: "Мёд", price: 200 },
  { id: "tea-extra-thyme", categoryId: "tea-extra", name: "Чабрец", price: 200 },

  // Напитки собственного производства
  { id: "ayran-s", categoryId: "own-production", name: "Айран", weight: "250 мл", price: 350 },
  { id: "ayran-l", categoryId: "own-production", name: "Айран", weight: "1000 мл", price: 1100 },
  { id: "mors-s", categoryId: "own-production", name: "Морс", weight: "250 мл", price: 320 },
  { id: "mors-l", categoryId: "own-production", name: "Морс", weight: "1000 мл", price: 950 },

  // Кофе
  { id: "espresso", categoryId: "coffee", name: "Эспрессо", weight: "30 мл", price: 330 },
  { id: "americano", categoryId: "coffee", name: "Американо", weight: "180 мл", price: 350 },
  { id: "cappuccino", categoryId: "coffee", name: "Капучино", weight: "330 мл", price: 440 },
  { id: "latte", categoryId: "coffee", name: "Латте", weight: "330 мл", price: 440 },
  { id: "flat-white", categoryId: "coffee", name: "Флэт Уайт", weight: "180 мл", price: 460 },
  { id: "bumble-coffee", categoryId: "coffee", name: "Бамбл кофе на апельсиновом соке", weight: "350 мл", price: 690 },
  { id: "ice-latte", categoryId: "coffee", name: "Айс Латте", weight: "350 мл", price: 490 },
  { id: "espresso-tonic", categoryId: "coffee", name: "Эспрессо тоник", weight: "300 мл", price: 590 },

  // Дополнительно к кофе
  { id: "coffee-extra-cream", categoryId: "coffee-extra", name: "Сливки", weight: "50 мл", price: 150 },
];

export const ekranidzeMenuItems = withTones(ekranidzeRawItems);

// ---------------------------------------------------------------------------
// Мама хинкали — sourced from the restaurant's printed menu (2026-10). Real
// dishes/weights/prices. No dish photos yet — falls back to PlaceholderImage.
// ---------------------------------------------------------------------------

export const mamaHinkaliCategories: MenuCategory[] = [
  { id: "cold", title: "Холодные закуски", group: "food" },
  { id: "salads", title: "Салаты", group: "food" },
  { id: "soups", title: "Супы", group: "food" },
  { id: "khinkali", title: "Хинкали", group: "food" },
  { id: "patara-khinkali", title: "Патара-хинкали", group: "food" },
  { id: "pastry", title: "Грузинская выпечка", group: "food" },
  { id: "kutaby", title: "Кутабы", group: "food" },
  { id: "hot-snacks", title: "Горячие закуски", group: "food" },
  { id: "hot", title: "Горячие блюда", group: "food" },
  { id: "sides", title: "Гарниры", group: "food" },
  { id: "beer-snacks", title: "Закуски к пиву", group: "food" },
  { id: "sauce", title: "Соус", group: "food" },
  { id: "desserts", title: "Десерты", group: "food" },
  { id: "water", title: "Вода", group: "drinks" },
  { id: "soda", title: "Газированные напитки", group: "drinks" },
  { id: "lemonade", title: "Лимонады", group: "drinks" },
  { id: "juice-assorted", title: "Соки в ассортименте", group: "drinks" },
  { id: "fresh-juice", title: "Свежевыжатые соки", group: "drinks" },
  { id: "mocktails", title: "Безалкогольные коктейли", group: "drinks" },
  { id: "fruit-tea", title: "Фруктовый чай", group: "drinks" },
  { id: "tea", title: "Чай", group: "drinks" },
  { id: "tea-extra", title: "Дополнительно к чаю", group: "drinks" },
  { id: "own-production", title: "Напитки собственного производства", group: "drinks" },
  { id: "coffee", title: "Кофе", group: "drinks" },
  { id: "coffee-extra", title: "Дополнительно к кофе", group: "drinks" },
];

const mamaHinkaliRawItems: RawItem[] = [
  // Холодные закуски
  { id: "mh-eggplant-rolls", categoryId: "cold", name: "Рулетики из баклажанов", description: "грецкий орех/кинза/чеснок", weight: "200 г", price: 690 },
  { id: "mh-eggplant-tongues", categoryId: "cold", name: "Язычки из баклажанов", description: "имеретинский сыр/чеснок/кинза/помидор", weight: "250 г", price: 790 },
  { id: "mh-pate", categoryId: "cold", name: "Домашний паштет", weight: "150 г", price: 460 },
  { id: "mh-adjapsandal", categoryId: "cold", name: "Аджапсандал", weight: "200 г", price: 690 },
  { id: "mh-satsivi", categoryId: "cold", name: "Сациви из курицы под соусом Баже", weight: "200 г", price: 660 },
  { id: "mh-pkhali-assorted", categoryId: "cold", name: "Пхали ассорти", description: "шпинат/свёкла/фасоль", weight: "200 г", price: 790 },
  { id: "mh-vegetable-bouquet", categoryId: "cold", name: "Овощной букет", description: "свежие овощи/зелень", weight: "400 г", price: 1500 },
  { id: "mh-pickles-assorted", categoryId: "cold", name: "Ассорти грузинских солений", description: "перец/огурец/помидоры/гурийская капуста/черемша", weight: "400 г", price: 1250 },
  { id: "mh-olives-assorted", categoryId: "cold", name: "Ассорти маслин", description: "оливки/маслины/травы", weight: "120 г", price: 790 },
  { id: "mh-cheese-assorted", categoryId: "cold", name: "Ассорти грузинских сыров", description: "сулугуни молочный/имеретинский/копчёный сулугуни/чечил", weight: "350/50 г", price: 1300 },
  { id: "mh-herring-potato", categoryId: "cold", name: "Сельдь с молодым картофелем", weight: "350/50 г", price: 850 },
  { id: "mh-salmon-cured", categoryId: "cold", name: "Сёмга собственного посола", weight: "130 г", price: 1350 },
  { id: "mh-tongue-horseradish", categoryId: "cold", name: "Отварной язык с хреном", weight: "130 г", price: 990 },
  { id: "mh-basturma", categoryId: "cold", name: "Бастурма", weight: "100 г", price: 1020 },
  { id: "mh-sudzhuk", categoryId: "cold", name: "Суджук", weight: "100 г", price: 890 },
  { id: "mh-salo", categoryId: "cold", name: "Сало с бородинским хлебом и горчицей", description: "сало с чесноком/сало копченое/Бородинский хлеб", weight: "150 г", price: 990 },

  // Салаты
  { id: "mh-vegetable-salad-georgian", categoryId: "salads", name: "Овощной салат по-грузински", description: "свежие овощи/грецкий орех/кахетинское масло", weight: "200 г", price: 790 },
  { id: "mh-vegetable-salad-village", categoryId: "salads", name: "Овощной салат по-деревенски", description: "свежие овощи/сванская соль/кахетинское масло", weight: "200 г", price: 760 },
  { id: "mh-caprese-georgian", categoryId: "salads", name: "Капрезе по-грузински", description: "сыр имеретинский/помидор/соус песто", weight: "240 г", price: 820 },
  { id: "mh-chichiko", categoryId: "salads", name: "Салат Чичико", description: "говяжий язык/огурцы/перец/микс салата/виноград/йогурт", weight: "240 г", price: 850 },
  { id: "mh-eggplant-salad", categoryId: "salads", name: "Салат с хрустящим баклажаном", description: "соус сладкий чили/томаты/сыр/зелень", weight: "220 г", price: 890 },
  { id: "mh-salad-tbilisi", categoryId: "salads", name: "Салат Тбилиси", description: "томленная говядина/красная фасоль/красный лук/зелень", weight: "250 г", price: 860 },
  { id: "mh-caesar-chicken", categoryId: "salads", name: "Цезарь с курицей", description: "обжаренная куриная грудка/романо/соус цезарь", weight: "220 г", price: 850 },
  { id: "mh-caesar-shrimp", categoryId: "salads", name: "Цезарь с тигровыми креветками", weight: "220 г", price: 950 },
  { id: "mh-avocado-salmon-salad", categoryId: "salads", name: "Салат с авокадо и сёмгой", weight: "220 г", price: 1150 },

  // Супы
  { id: "mh-chicken-noodle", categoryId: "soups", name: "Куриная лапша", weight: "330 г", price: 520 },
  { id: "mh-kharcho", categoryId: "soups", name: "Харчо", weight: "330 г", price: 690 },
  { id: "mh-borsch", categoryId: "soups", name: "Борщ со сметаной и салом", weight: "330 г", price: 690 },
  { id: "mh-solyanka", categoryId: "soups", name: "Мясная солянка по-кавказски", weight: "330 г", price: 820 },
  { id: "mh-ukha", categoryId: "soups", name: "Уха", weight: "330 г", price: 990 },
  { id: "mh-mini-khinkali-soup", categoryId: "soups", name: "Суп с мини хинкали", weight: "330 г", price: 750 },
  { id: "mh-chikhirtma", categoryId: "soups", name: "Чихиртма", weight: "330 г", price: 750 },

  // Хинкали
  { id: "mh-khinkali-classic", categoryId: "khinkali", name: "Классические", description: "от 3-х шт", weight: "100 г", price: 120 },
  { id: "mh-khinkali-beef", categoryId: "khinkali", name: "С говядиной", description: "от 3-х шт", weight: "100 г", price: 130 },
  { id: "mh-khinkali-turkey", categoryId: "khinkali", name: "С индейкой", description: "от 3-х шт", weight: "100 г", price: 120 },
  { id: "mh-khinkali-lamb", categoryId: "khinkali", name: "С бараниной", description: "от 3-х шт", weight: "100 г", price: 140 },
  { id: "mh-khinkali-cheese", categoryId: "khinkali", name: "С сыром", description: "от 3-х шт", weight: "100 г", price: 120 },

  // Патара-хинкали
  { id: "mh-patara-beef-cream", categoryId: "patara-khinkali", name: "С говядиной в сливочном соусе", weight: "380 г", price: 920 },
  { id: "mh-apollonchiki", categoryId: "patara-khinkali", name: "Апполончики", description: "3 шт", weight: "300 г", price: 620 },

  // Грузинская выпечка
  { id: "mh-khachapuri-adjaruli", categoryId: "pastry", name: "Хачапури по-аджарски", description: "в виде лодочки с яйцом и маслом", weight: "400 г", price: 730 },
  { id: "mh-khachapuri-imeretian", categoryId: "pastry", name: "Хачапури по-имеретински", weight: "400 г", price: 760 },
  { id: "mh-khachapuri-megrelian", categoryId: "pastry", name: "Хачапури по-мегрельски", weight: "450 г", price: 790 },
  { id: "mh-khachapuri-royal", categoryId: "pastry", name: "Хачапури по-царски", description: "полу песочное тесто с тремя видами сыра, яйцом и копчёным сулугуни", weight: "500 г", price: 990 },
  { id: "mh-penovani", categoryId: "pastry", name: "Пеновани", description: "конверт из слоеного теста с двумя видами сыра", weight: "400 г", price: 790 },
  { id: "mh-khachapuri-spinach", categoryId: "pastry", name: "Хачапури со шпинатом и сыром", weight: "500 г", price: 890 },
  { id: "mh-lobiani", categoryId: "pastry", name: "Лобиани", weight: "500 г", price: 820 },
  { id: "mh-kubdari", categoryId: "pastry", name: "Кубдари", weight: "500 г", price: 990 },
  { id: "mh-lavash-georgian", categoryId: "pastry", name: "Грузинский лаваш", weight: "120 г", price: 160 },
  { id: "mh-lavash-thin", categoryId: "pastry", name: "Тонкий лаваш", weight: "100 г", price: 160 },

  // Кутабы
  { id: "mh-kutaby", categoryId: "kutaby", name: "Кутабы", description: "с сыром/мясом/с зеленью — подаются с соусом мацони", weight: "100/50 г", price: 300 },

  // Горячие закуски
  { id: "mh-lobio-megrelian", categoryId: "hot-snacks", name: "Лобио по-мегрельски", weight: "250/50 г", price: 690 },
  { id: "mh-dolma", categoryId: "hot-snacks", name: "Долма из говядины с чесночным мацони", weight: "180/50 г", price: 860 },
  { id: "mh-sulguni-baked", categoryId: "hot-snacks", name: "Запечённый сулугуни с томатами на кеци", weight: "250 г", price: 690 },
  { id: "mh-mushrooms-cheese", categoryId: "hot-snacks", name: "Запечённые шампиньоны с сыром на кеци", weight: "250 г", price: 690 },
  { id: "mh-sulguni-fried", categoryId: "hot-snacks", name: "Жаренный сулугуни в панировке с клюквенным соусом", weight: "200/50 г", price: 650 },
  { id: "mh-eggplant-fan", categoryId: "hot-snacks", name: "Веер из баклажанов с томатами и грузинскими сырами", weight: "250 г", price: 850 },
  { id: "mh-kuchmachi", categoryId: "hot-snacks", name: "Кучмачи", description: "говяжьи субпродукты/лук/зерна граната/специи", weight: "220 г", price: 720 },

  // Горячие блюда
  { id: "mh-chashushuli", categoryId: "hot", name: "Чашушули", description: "тушёная говядина с овощами в остром томатном соусе", weight: "330 г", price: 990 },
  { id: "mh-chanakhi", categoryId: "hot", name: "Чанахи", description: "томлёная баранина в горшочке с овощами и грузинскими травами", weight: "350 г", price: 1250 },
  { id: "mh-odzhakhuri-pork", categoryId: "hot", name: "Оджахури из свинины", description: "жаркое из свинины по-грузински", weight: "330 г", price: 820 },
  { id: "mh-chakhokhbili", categoryId: "hot", name: "Чахохбили", description: "куриное бедро в томатном соусе", weight: "300 г", price: 790 },
  { id: "mh-chkmeruli", categoryId: "hot", name: "Чкмерули", description: "куриное бедро в сливочно-чесночном соусе с грузинскими травами", weight: "350 г", price: 990 },
  { id: "mh-odzhakhuri-chicken", categoryId: "hot", name: "Оджахури из курицы", description: "жаркое из курицы по-грузински", weight: "330 г", price: 790 },
  { id: "mh-chicken-cutlets", categoryId: "hot", name: "Котлеты из курицы с картофельным пюре", weight: "300 г", price: 820 },
  { id: "mh-chicken-tapaka", categoryId: "hot", name: "Цыплёнок тапака с травами и соусом ткемали", weight: "350/50 г", price: 1350 },

  // Гарниры
  { id: "mh-potato-mash", categoryId: "sides", name: "Картофельное пюре", weight: "150 г", price: 350 },
  { id: "mh-potato-fries", categoryId: "sides", name: "Картофель фри", weight: "150 г", price: 320 },
  { id: "mh-potato-country", categoryId: "sides", name: "Картофель по-деревенски", weight: "150 г", price: 350 },
  { id: "mh-rice-vegetables", categoryId: "sides", name: "Рис с овощами", weight: "150 г", price: 390 },

  // Закуски к пиву
  { id: "mh-calamari-rings", categoryId: "beer-snacks", name: "Кольца кальмаров", weight: "120 г", price: 650 },
  { id: "mh-garlic-croutons", categoryId: "beer-snacks", name: "Гренки чесночные", weight: "150 г", price: 490 },

  // Соус
  { id: "mh-sauce-assorted", categoryId: "sauce", name: "Соус на выбор", description: "Ткемали, Домашняя аджика, Ореховая аджика, Сацебели, Мацони, Сметана, Чесночный соус, Сырный соус, Наршараб, Кетчуп", weight: "50 г", price: 210 },

  // Десерты
  { id: "mh-napoleon", categoryId: "desserts", name: "Наполеон", weight: "120 г", price: 650 },
  { id: "mh-honey-cake", categoryId: "desserts", name: "Медовик по-грузински с орехами", weight: "120 г", price: 620 },
  { id: "mh-strudel-vanilla-icecream", categoryId: "desserts", name: "Штрудель с ванильным мороженым", weight: "120/50 г", price: 660 },
  { id: "mh-chocolate-fondant", categoryId: "desserts", name: "Шоколадный фондан", weight: "140 г", price: 720 },
  { id: "mh-tiramisu", categoryId: "desserts", name: "Тирамису", weight: "120 г", price: 720 },
  { id: "mh-matsoni-honey-walnuts", categoryId: "desserts", name: "Мацони с мёдом и грецкими орехами", weight: "120 г", price: 490 },
  { id: "mh-jam-assorted", categoryId: "desserts", name: "Домашнее варенье", description: "белая черешня/инжир/кизил", weight: "100 г", price: 390 },
  { id: "mh-ice-cream", categoryId: "desserts", name: "Мороженое", description: "ванильное/шоколадное/клубничное", weight: "50 г", price: 260 },
  { id: "mh-sorbet", categoryId: "desserts", name: "Сорбет", description: "манго-маракуйя/малина/лайм", weight: "50 г", price: 260 },

  // Вода
  { id: "mh-water-tassay", categoryId: "water", name: "Tassay", description: "газированная/без газ", weight: "500 мл", price: 480 },

  // Газированные напитки
  { id: "mh-cola", categoryId: "soda", name: "Кока-кола", description: "классика/зеро", weight: "300 мл", price: 390 },
  { id: "mh-lemonade-natakhtari", categoryId: "soda", name: "Лимонад НАТАХТАРИ", description: "груша/тархун/фейхоа/саперави", weight: "500 мл", price: 390 },

  // Лимонады
  { id: "mh-lemonade-grapefruit-lychee-s", categoryId: "lemonade", name: "Грейпфрут-Личи", weight: "300 мл", price: 510 },
  { id: "mh-lemonade-grapefruit-lychee-l", categoryId: "lemonade", name: "Грейпфрут-Личи", weight: "1000 мл", price: 1250 },
  { id: "mh-lemonade-tarragon-s", categoryId: "lemonade", name: "Тархун", weight: "300 мл", price: 510 },
  { id: "mh-lemonade-tarragon-l", categoryId: "lemonade", name: "Тархун", weight: "1000 мл", price: 1250 },
  { id: "mh-lemonade-seaberry-cranberry-s", categoryId: "lemonade", name: "Облепиха-Клюква", weight: "300 мл", price: 510 },
  { id: "mh-lemonade-seaberry-cranberry-l", categoryId: "lemonade", name: "Облепиха-Клюква", weight: "1000 мл", price: 1250 },
  { id: "mh-lemonade-mango-passion-s", categoryId: "lemonade", name: "Манго-Маракуйя", weight: "300 мл", price: 510 },
  { id: "mh-lemonade-mango-passion-l", categoryId: "lemonade", name: "Манго-Маракуйя", weight: "1000 мл", price: 1250 },
  { id: "mh-lemonade-cucumber-basil-s", categoryId: "lemonade", name: "Огурец-Базилик", weight: "300 мл", price: 510 },
  { id: "mh-lemonade-cucumber-basil-l", categoryId: "lemonade", name: "Огурец-Базилик", weight: "1000 мл", price: 1250 },

  // Соки в ассортименте
  { id: "mh-juice-assorted", categoryId: "juice-assorted", name: "Соки в ассортименте", description: "яблоко/персик/ананас/вишня/апельсин/томат", weight: "200 мл", price: 370 },

  // Свежевыжатые соки
  { id: "mh-fresh-juice-orange", categoryId: "fresh-juice", name: "Апельсиновый", weight: "250 мл", price: 590 },
  { id: "mh-fresh-juice-apple", categoryId: "fresh-juice", name: "Яблочный", weight: "250 мл", price: 590 },
  { id: "mh-fresh-juice-carrot", categoryId: "fresh-juice", name: "Морковный", weight: "250 мл", price: 590 },
  { id: "mh-fresh-juice-grapefruit", categoryId: "fresh-juice", name: "Грейпфрут", weight: "250 мл", price: 620 },

  // Безалкогольные коктейли
  { id: "mh-mojito", categoryId: "mocktails", name: "Мохито", weight: "350 мл", price: 720 },
  { id: "mh-mojito-raspberry", categoryId: "mocktails", name: "Малиновый Мохито", weight: "350 мл", price: 720 },

  // Фруктовый чай
  { id: "mh-fruit-tea-berry", categoryId: "fruit-tea", name: "Ягодный чай", weight: "500 мл", price: 620 },
  { id: "mh-fruit-tea-tropical", categoryId: "fruit-tea", name: "Тропический чай", weight: "500 мл", price: 620 },
  { id: "mh-fruit-tea-ginger", categoryId: "fruit-tea", name: "Имбирный чай", weight: "500 мл", price: 620 },
  { id: "mh-fruit-tea-seaberry", categoryId: "fruit-tea", name: "Облепиховый чай", weight: "500 мл", price: 620 },
  { id: "mh-fruit-tea-cranberry-mint", categoryId: "fruit-tea", name: "Клюква-мята чай", weight: "500 мл", price: 620 },

  // Чай
  { id: "mh-tea-assam", categoryId: "tea", name: "Асам", weight: "500 мл", price: 550 },
  { id: "mh-tea-earl-grey", categoryId: "tea", name: "Эрл Грей", weight: "500 мл", price: 550 },
  { id: "mh-tea-sencha", categoryId: "tea", name: "Сенча", weight: "500 мл", price: 550 },
  { id: "mh-tea-herbal", categoryId: "tea", name: "Травяной сбор", weight: "500 мл", price: 590 },
  { id: "mh-tea-buckwheat", categoryId: "tea", name: "Гречишный", weight: "500 мл", price: 590 },
  { id: "mh-tea-jasmine", categoryId: "tea", name: "Жасмин", weight: "500 мл", price: 590 },
  { id: "mh-tea-milk-oolong", categoryId: "tea", name: "Молочный улун", weight: "500 мл", price: 590 },
  { id: "mh-tea-ivan-sangan", categoryId: "tea", name: "Иван-чай с санган дайля и брусникой", weight: "500 мл", price: 590 },

  // Дополнительно к чаю
  { id: "mh-tea-extra-mint", categoryId: "tea-extra", name: "Мята", price: 180 },
  { id: "mh-tea-extra-lemon", categoryId: "tea-extra", name: "Лимон", price: 190 },
  { id: "mh-tea-extra-ginger", categoryId: "tea-extra", name: "Имбирь", price: 200 },
  { id: "mh-tea-extra-honey", categoryId: "tea-extra", name: "Мёд", price: 200 },
  { id: "mh-tea-extra-thyme", categoryId: "tea-extra", name: "Чабрец", price: 200 },

  // Напитки собственного производства
  { id: "mh-ayran-s", categoryId: "own-production", name: "Айран", weight: "250 мл", price: 350 },
  { id: "mh-ayran-l", categoryId: "own-production", name: "Айран", weight: "1000 мл", price: 1100 },
  { id: "mh-mors-s", categoryId: "own-production", name: "Морс", weight: "250 мл", price: 320 },
  { id: "mh-mors-l", categoryId: "own-production", name: "Морс", weight: "1000 мл", price: 950 },
  { id: "mh-compote-s", categoryId: "own-production", name: "Компот из сухофруктов", weight: "250 мл", price: 320 },
  { id: "mh-compote-l", categoryId: "own-production", name: "Компот из сухофруктов", weight: "1000 мл", price: 950 },

  // Кофе
  { id: "mh-espresso", categoryId: "coffee", name: "Эспрессо", weight: "30 мл", price: 330 },
  { id: "mh-americano", categoryId: "coffee", name: "Американо", weight: "180 мл", price: 350 },
  { id: "mh-cappuccino", categoryId: "coffee", name: "Капучино", weight: "330 мл", price: 440 },
  { id: "mh-latte", categoryId: "coffee", name: "Латте", weight: "330 мл", price: 440 },
  { id: "mh-flat-white", categoryId: "coffee", name: "Флэт Уайт", weight: "180 мл", price: 460 },
  { id: "mh-raf-vanilla", categoryId: "coffee", name: "Раф ванильный", weight: "300 мл", price: 560 },
  { id: "mh-cocoa", categoryId: "coffee", name: "Какао", weight: "300 мл", price: 550 },
  { id: "mh-bumble-coffee", categoryId: "coffee", name: "Бамбл кофе на апельсиновом соке", weight: "350 мл", price: 690 },
  { id: "mh-ice-latte", categoryId: "coffee", name: "Айс Латте", weight: "350 мл", price: 490 },
  { id: "mh-espresso-tonic", categoryId: "coffee", name: "Эспрессо тоник", weight: "300 мл", price: 590 },

  // Дополнительно к кофе
  { id: "mh-coffee-extra-almond-milk", categoryId: "coffee-extra", name: "Миндальное молоко", weight: "50 мл", price: 150 },
  { id: "mh-coffee-extra-coconut-milk", categoryId: "coffee-extra", name: "Кокосовое молоко", weight: "50 мл", price: 150 },
  { id: "mh-coffee-extra-banana-milk", categoryId: "coffee-extra", name: "Банановое молоко", weight: "50 мл", price: 150 },
  { id: "mh-coffee-extra-cream", categoryId: "coffee-extra", name: "Сливки", weight: "50 мл", price: 150 },
  { id: "mh-coffee-extra-whipped-cream", categoryId: "coffee-extra", name: "Взбитые сливки", weight: "50 г", price: 150 },
];

export const mamaHinkaliMenuItems = withTones(mamaHinkaliRawItems);

export const menuByRestaurant: Record<string, RestaurantMenu> = {
  ekranidze: { categories: ekranidzeCategories, menuItems: ekranidzeMenuItems },
  "mama-hinkali": { categories: mamaHinkaliCategories, menuItems: mamaHinkaliMenuItems },
};

export function getMenu(restaurantId: string): RestaurantMenu {
  return menuByRestaurant[restaurantId] ?? menuByRestaurant.ekranidze;
}
