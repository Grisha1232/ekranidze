export type MenuCategory = {
  id: string;
  title: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  weight: string;
  price: number;
  tone: "warm" | "clay" | "olive";
};

// Content sourced from the client's existing site (ekranidze.clients.site) — real
// dishes, weights and prices as of the build date. Verify against the current menu
// before launch, prices/lineup may have changed since.
export const categories: MenuCategory[] = [
  { id: "khinkali", title: "Хинкали" },
  { id: "vypechka", title: "Грузинская выпечка" },
  { id: "hot", title: "Горячие блюда" },
  { id: "soups", title: "Супы" },
  { id: "salads", title: "Салаты" },
  { id: "cold", title: "Холодные закуски" },
  { id: "sides", title: "Гарниры" },
  { id: "desserts", title: "Десерты" },
  { id: "other", title: "Другое" },
];

export const menuItems: MenuItem[] = [
  // Хинкали
  { id: "khinkali-classic", categoryId: "khinkali", name: "Хинкали классические", weight: "100 г", price: 110, tone: "warm" },
  { id: "khinkali-beef", categoryId: "khinkali", name: "Хинкали с говядиной", weight: "100 г", price: 120, tone: "clay" },
  { id: "khinkali-lamb", categoryId: "khinkali", name: "Хинкали с бараниной", weight: "100 г", price: 130, tone: "olive" },
  { id: "khinkali-cheese", categoryId: "khinkali", name: "Хинкали с сыром", weight: "100 г", price: 110, tone: "warm" },
  { id: "khinkali-mushroom", categoryId: "khinkali", name: "Хинкали с грибами", weight: "100 г", price: 110, tone: "clay" },

  // Грузинская выпечка
  { id: "khachapuri-adjaruli", categoryId: "vypechka", name: "Хачапури по-аджарски", weight: "400 г", price: 690, tone: "warm" },
  { id: "khachapuri-imeretian", categoryId: "vypechka", name: "Хачапури по-имеретински", weight: "400 г", price: 720, tone: "clay" },
  { id: "khachapuri-megrelian", categoryId: "vypechka", name: "Хачапури по-мегрельски", weight: "450 г", price: 750, tone: "olive" },
  { id: "penovani", categoryId: "vypechka", name: "Пеновани", description: "Конверт из слоёного теста с двумя видами сыра", weight: "400 г", price: 760, tone: "warm" },
  { id: "lavash", categoryId: "vypechka", name: "Грузинский лаваш", weight: "150 г", price: 150, tone: "clay" },

  // Горячие блюда
  { id: "chicken-tapaka", categoryId: "hot", name: "Цыплёнок Тапака", weight: "1 шт.", price: 1200, tone: "warm" },
  { id: "sulguni-baked", categoryId: "hot", name: "Запечённый сулугуни с томатами на кеци", weight: "250 г", price: 690, tone: "clay" },
  { id: "mushrooms-cheese", categoryId: "hot", name: "Запечённые шампиньоны с сыром", weight: "200 г", price: 670, tone: "olive" },
  { id: "meat-tbilisi", categoryId: "hot", name: "Мясо по-тбилисски", weight: "300 г", price: 820, tone: "warm" },
  { id: "chashushuli", categoryId: "hot", name: "Чашушули из говядины", description: "Тушёная говядина с овощами в остром томатном соусе", weight: "300 г", price: 990, tone: "clay" },
  { id: "lobio", categoryId: "hot", name: "Лобио с гурийской капустой", weight: "250 г", price: 690, tone: "olive" },
  { id: "dolma", categoryId: "hot", name: "Долма из говядины и свинины с чесночным мацони", weight: "200 г", price: 820, tone: "warm" },
  { id: "kuchmachi-hot", categoryId: "hot", name: "Кучмачи из курицы", weight: "250 г", price: 790, tone: "clay" },
  { id: "chkmeruli", categoryId: "hot", name: "Чкмерули", description: "Куриное бедро в сливочно-чесночном соусе с грузинскими травами", weight: "320 г", price: 990, tone: "olive" },
  { id: "chakhokhbili", categoryId: "hot", name: "Чахохбили", description: "Куриное бедро в томатном соусе", weight: "350 г", price: 780, tone: "warm" },
  { id: "odzhakhuri-chicken", categoryId: "hot", name: "Оджахури из курицы", description: "Жаркое из курицы по-грузински", weight: "350 г", price: 790, tone: "clay" },
  { id: "odzhakhuri-pork", categoryId: "hot", name: "Оджахури из свинины", description: "Жаркое из свинины по-грузински", weight: "350 г", price: 820, tone: "olive" },

  // Супы
  { id: "tatariakhni", categoryId: "soups", name: "Татариахни", weight: "350 мл", price: 720, tone: "warm" },
  { id: "kharcho", categoryId: "soups", name: "Харчо", weight: "350 мл", price: 690, tone: "clay" },
  { id: "chikhirtma", categoryId: "soups", name: "Чихиртма", description: "Грузинский куриный суп с пряностями", weight: "350 мл", price: 590, tone: "olive" },

  // Салаты
  { id: "caesar-shrimp", categoryId: "salads", name: "Цезарь с креветками", weight: "220 г", price: 920, tone: "warm" },
  { id: "caesar-chicken", categoryId: "salads", name: "Цезарь с курицей", weight: "220 г", price: 790, tone: "clay" },
  { id: "warm-beef-salad", categoryId: "salads", name: "Тёплый салат с говядиной по-грузински", weight: "220 г", price: 920, tone: "olive" },
  { id: "salad-tbilisi", categoryId: "salads", name: "Салат Тбилиси", weight: "230 г", price: 720, tone: "warm" },
  { id: "eggplant-salad", categoryId: "salads", name: "Салат с хрустящим баклажаном", weight: "250 г", price: 790, tone: "clay" },
  { id: "vegetable-salad-georgian", categoryId: "salads", name: "Овощной салат по-грузински", description: "Свежие овощи, ароматное масло, грецкий орех", weight: "250 г", price: 690, tone: "olive" },
  { id: "vegetable-salad", categoryId: "salads", name: "Овощной салат", weight: "220 г", price: 670, tone: "warm" },

  // Холодные закуски
  { id: "basturma", categoryId: "cold", name: "Бастурма", weight: "100 г", price: 980, tone: "warm" },
  { id: "sudzhuk", categoryId: "cold", name: "Суджук", weight: "100 г", price: 790, tone: "clay" },
  { id: "pickles-assorted", categoryId: "cold", name: "Ассорти солений", weight: "350 г", price: 1050, tone: "olive" },
  { id: "cheese-assorted", categoryId: "cold", name: "Ассорти из сыров", description: "Сулугуни, имеретинский, копчёный сулугуни, чечил", weight: "350 г", price: 1100, tone: "warm" },
  { id: "shinauri", categoryId: "cold", name: "Шинаури", weight: "150 г", price: 690, tone: "clay" },
  { id: "kuchmachi-cold", categoryId: "cold", name: "Кучмачи из курицы", description: "Куриные сердечки, желудочки и печень в ароматных специях", weight: "220 г", price: 740, tone: "olive" },
  { id: "pkhali-assorted", categoryId: "cold", name: "Ассорти пхали", description: "Шпинат, свёкла, фасоль", weight: "120 г", price: 690, tone: "warm" },
  { id: "eggplant-rolls", categoryId: "cold", name: "Рулетики из баклажанов", description: "Паста из грецких орехов, чеснока и специй в слайсах запечённого баклажана", weight: "150 г", price: 690, tone: "clay" },
  { id: "beetroot-tkemali", categoryId: "cold", name: "Свёкла в ткемали", weight: "160 г", price: 590, tone: "olive" },
  { id: "satsivi", categoryId: "cold", name: "Сациви из курицы под соусом Баже", weight: "220 г", price: 650, tone: "warm" },

  // Гарниры
  { id: "potato-country", categoryId: "sides", name: "Картофель по-деревенски", weight: "150 г", price: 320, tone: "warm" },
  { id: "potato-fries", categoryId: "sides", name: "Картофель фри", weight: "150 г", price: 290, tone: "clay" },
  { id: "potato-mash", categoryId: "sides", name: "Картофельное пюре", weight: "150 г", price: 320, tone: "olive" },

  // Десерты
  { id: "cherry-strudel", categoryId: "desserts", name: "Вишнёвый штрудель", weight: "120 г", price: 680, tone: "warm" },
  { id: "ice-cream", categoryId: "desserts", name: "Мороженое в ассортименте", description: "Ванильное, шоколадное, клубничное, сорбеты лайм/манго", weight: "50 г", price: 200, tone: "clay" },
  { id: "jam-assorted", categoryId: "desserts", name: "Домашнее варенье в ассортименте", description: "Белая черешня, инжир, кизил", weight: "100 г", price: 390, tone: "olive" },
  { id: "chocolate-fondant", categoryId: "desserts", name: "Шоколадный фондан", weight: "100 г", price: 720, tone: "warm" },
  { id: "apple-strudel", categoryId: "desserts", name: "Яблочный штрудель", weight: "120 г", price: 620, tone: "clay" },
  { id: "napoleon", categoryId: "desserts", name: "Наполеон", weight: "150 г", price: 590, tone: "olive" },

  // Другое
  { id: "sauce-assorted", categoryId: "other", name: "Соус в ассортименте", description: "Ткемали, аджика, сацебели, мацони, сметана, чесночный соус, кетчуп", weight: "50 г", price: 150, tone: "warm" },
  { id: "vegetable-bouquet", categoryId: "other", name: "Овощной букет", description: "Свежие овощи с обилием зелени", weight: "400 г", price: 1150, tone: "clay" },
];
