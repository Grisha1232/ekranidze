import type { MetroLine } from "@/data/restaurants";

// Real Moscow Metro line colors (official), not invented ones — drives the
// colored dot on metro badges (Header, RestaurantChooser).
export const METRO_LINE_COLORS: Record<MetroLine, string> = {
  purple: "#8E479C", // Таганско-Краснопресненская (Line 7) — Жулебино, Котельники
  orange: "#ED9120", // Калужско-Рижская (Line 6) — Шаболовка
  grey: "#A1A2A3", // Серпуховско-Тимирязевская (Line 9) — Тульская
};
