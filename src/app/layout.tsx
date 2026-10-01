import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
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

// Self-hosted (not a Google Font): "ruGeorgian" by Baton Talbone, styles
// Cyrillic letterforms to look Georgian — used for the restaurant-branding
// logo/switcher text. Font file + copyright notice in src/fonts/; the
// source has no stated license beyond a bare copyright line (see
// rugeorgian-COPYRIGHT.txt) — used here on the client's explicit call.
const georgianFont = localFont({
  src: "../fonts/rugeorgian.ttf",
  variable: "--font-georgian",
  weight: "400",
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
