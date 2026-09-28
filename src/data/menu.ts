export type MenuCategory = {
  id: string;
  title: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  weight: string;
  price: number;
  tone: "warm" | "clay" | "olive";
};

// Placeholder content — swap for real dishes, photos and prices before launch.
export const categories: MenuCategory[] = [
  { id: "khinkali", title: "Хинкали" },
  { id: "pelmeni", title: "Пельмени" },
  { id: "starters", title: "Закуски" },
  { id: "soups", title: "Супы" },
  { id: "drinks", title: "Напитки" },
];

export const menuItems: MenuItem[] = [
  {
    id: "khinkali-beef",
    categoryId: "khinkali",
    name: "Хинкали с говядиной",
    description: "Рубленая говядина, бульон внутри, свежая зелень",
    weight: "5 шт · 350 г",
    price: 390,
    tone: "warm",
  },
  {
    id: "khinkali-lamb",
    categoryId: "khinkali",
    name: "Хинкали с бараниной",
    description: "Баранина, кинза, острый перец по желанию",
    weight: "5 шт · 350 г",
    price: 420,
    tone: "clay",
  },
  {
    id: "khinkali-cheese",
    categoryId: "khinkali",
    name: "Хинкали с сыром",
    description: "Сулугуни и имеретинский сыр, топлёное масло",
    weight: "5 шт · 330 г",
    price: 380,
    tone: "olive",
  },
  {
    id: "khinkali-mushroom",
    categoryId: "khinkali",
    name: "Хинкали с грибами",
    description: "Лесные грибы, лук, картофель",
    weight: "5 шт · 330 г",
    price: 360,
    tone: "warm",
  },
  {
    id: "pelmeni-classic",
    categoryId: "pelmeni",
    name: "Пельмени классические",
    description: "Говядина и свинина, лепим вручную каждое утро",
    weight: "300 г",
    price: 340,
    tone: "warm",
  },
  {
    id: "pelmeni-chicken",
    categoryId: "pelmeni",
    name: "Пельмени с курицей",
    description: "Куриное бедро, зелёный лук, имбирь",
    weight: "300 г",
    price: 320,
    tone: "clay",
  },
  {
    id: "pelmeni-potato",
    categoryId: "pelmeni",
    name: "Пельмени с картофелем и грибами",
    description: "Постная начинка, жареный лук",
    weight: "300 г",
    price: 300,
    tone: "olive",
  },
  {
    id: "starter-adjika",
    categoryId: "starters",
    name: "Домашняя аджика с хлебом",
    description: "Острая, на спелых томатах, подаётся с лавашом",
    weight: "150 г",
    price: 180,
    tone: "clay",
  },
  {
    id: "starter-cheese-plate",
    categoryId: "starters",
    name: "Сырная тарелка",
    description: "Сулугуни, имеретинский сыр, зелень",
    weight: "200 г",
    price: 420,
    tone: "warm",
  },
  {
    id: "soup-kharcho",
    categoryId: "soups",
    name: "Харчо",
    description: "Говядина, рис, ткемали, много зелени",
    weight: "350 мл",
    price: 350,
    tone: "clay",
  },
  {
    id: "soup-broth",
    categoryId: "soups",
    name: "Бульон с зеленью",
    description: "Лёгкий домашний бульон, подаётся с гренками",
    weight: "300 мл",
    price: 220,
    tone: "olive",
  },
  {
    id: "drink-compote",
    categoryId: "drinks",
    name: "Компот из сухофруктов",
    description: "Варим сами, без сахара по желанию",
    weight: "400 мл",
    price: 150,
    tone: "warm",
  },
  {
    id: "drink-lemonade",
    categoryId: "drinks",
    name: "Домашний лимонад",
    description: "Мята, лимон, немного мёда",
    weight: "400 мл",
    price: 190,
    tone: "olive",
  },
];
