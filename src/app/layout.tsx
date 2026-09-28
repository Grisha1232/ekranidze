import type { Metadata } from "next";
import { Manrope, Noto_Serif_Georgian, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
});

// Real Georgian (mkhedruli) glyphs, for whatever Georgian-script text/accent
// gets added — see the `font-georgian` utility in globals.css. Unused until
// then, so it costs nothing yet.
const georgianFont = Noto_Serif_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Экранидзе — грузинская кухня в Люберцах",
  description:
    "Экранидзе — хинкали, хачапури и другие блюда грузинской кухни по традиционным рецептам. Ресторан в Люберцах, самовывоз и доставка.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${bodyFont.variable} ${displayFont.variable} ${georgianFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
