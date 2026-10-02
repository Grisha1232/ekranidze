"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { restaurants } from "@/data/restaurants";

type FulfillmentMethod = "pickup" | "delivery";
type PaymentMethod = "cash" | "card" | "online";

export function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurant =
    restaurants.find((r) => r.id === searchParams.get("restaurant")) ?? restaurants[0];

  const { lines: allLines, setQuantity, removeItem } = useCart();
  const lines = allLines.filter((line) => line.restaurantId === restaurant.id);
  const totalPrice = lines.reduce(
    (sum, line) => sum + line.quantity * line.item.price,
    0,
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("pickup");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [comment, setComment] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameError = attempted && name.trim() === "";
  const phoneError = attempted && phone.trim() === "";
  const addressError = attempted && fulfillment === "delivery" && address.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (name.trim() === "" || phone.trim() === "") return;
    if (fulfillment === "delivery" && address.trim() === "") return;
    // Stub only — this never sends a network request. See CLAUDE.md.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-display text-2xl text-foreground">Заявка принята</h1>
        <p className="text-sm text-muted-foreground">
          Онлайн-оформление пока в разработке — этот заказ никуда не отправлен.
          Чтобы подтвердить его, позвоните в «{restaurant.name}»:{" "}
          <a
            href={restaurant.phoneHref}
            className="font-medium text-foreground underline"
          >
            {restaurant.phone}
          </a>
        </p>
        <Link
          href={restaurant.path}
          className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Вернуться на сайт
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-display text-2xl text-foreground">Корзина пуста</h1>
        <p className="text-sm text-muted-foreground">
          Добавьте что-нибудь из меню «{restaurant.name}», прежде чем оформлять заказ.
        </p>
        <Link
          href={restaurant.path}
          className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Перейти к меню
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Назад
      </button>

      <h1 className="font-display text-3xl text-foreground">Оформление заказа</h1>
      <p className="mt-1 text-sm text-muted-foreground">«{restaurant.name}»</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-foreground">Ваш заказ</h2>
            <ul className="flex flex-col gap-3">
              {lines.map((line) => (
                <li
                  key={line.item.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{line.item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.item.price} ₽{line.item.weight ? ` · ${line.item.weight}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.item.id, restaurant.id, line.quantity - 1)
                      }
                      className="h-8 w-8 rounded-full border border-border text-sm hover:border-primary"
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(line.item.id, restaurant.id, line.quantity + 1)
                      }
                      className="h-8 w-8 rounded-full border border-border text-sm hover:border-primary"
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-16 text-right text-sm font-medium text-foreground">
                    {line.item.price * line.quantity} ₽
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(line.item.id, restaurant.id)}
                    className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-foreground">Контакты</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">Имя *</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`rounded-xl border bg-surface px-3 py-2.5 outline-none focus:border-primary ${
                    nameError ? "border-red-400" : "border-border"
                  }`}
                />
                {nameError && <span className="text-xs text-red-500">Укажите имя</span>}
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">Телефон *</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 000-00-00"
                  className={`rounded-xl border bg-surface px-3 py-2.5 outline-none focus:border-primary ${
                    phoneError ? "border-red-400" : "border-border"
                  }`}
                />
                {phoneError && <span className="text-xs text-red-500">Укажите телефон</span>}
              </label>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-foreground">Способ получения</h2>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "pickup", label: "Самовывоз" },
                  { value: "delivery", label: "Доставка" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFulfillment(option.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    fulfillment === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {fulfillment === "delivery" && (
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">Адрес доставки *</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Улица, дом, квартира"
                  className={`rounded-xl border bg-surface px-3 py-2.5 outline-none focus:border-primary ${
                    addressError ? "border-red-400" : "border-border"
                  }`}
                />
                {addressError && <span className="text-xs text-red-500">Укажите адрес</span>}
              </label>
            )}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-foreground">Способ оплаты</h2>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "cash", label: "Наличными" },
                  { value: "card", label: "Картой при получении" },
                  { value: "online", label: "Онлайн (скоро)" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPayment(option.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    payment === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-1.5 text-sm">
            <label className="font-medium text-foreground" htmlFor="comment">
              Комментарий к заказу
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Например: без лука, позвонить за 10 минут"
              className="rounded-xl border border-border bg-surface px-3 py-2.5 outline-none focus:border-primary"
            />
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 md:sticky md:top-6">
          <h2 className="font-display text-lg text-foreground">Итого</h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Товары</span>
            <span className="text-foreground">{totalPrice} ₽</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Доставка</span>
            <span className="text-foreground">
              {fulfillment === "pickup" ? "Бесплатно" : "Уточняется по телефону"}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-medium">
            <span className="text-muted-foreground">К оплате</span>
            <span className="font-display text-lg text-foreground">{totalPrice} ₽</span>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Оформить заказ
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Онлайн-оформление пока в разработке — заказ никуда не отправляется.
          </p>
        </aside>
      </form>
    </div>
  );
}
