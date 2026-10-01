import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutPage } from "@/components/CheckoutPage";

export const metadata: Metadata = {
  title: "Оформление заказа",
};

export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
