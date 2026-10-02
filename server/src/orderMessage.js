const RESTAURANT_NAMES = {
  ekranidze: "Экранидзе",
  "mama-hinkali": "Мама хинкали",
};

const FULFILLMENT_LABELS = {
  pickup: "Самовывоз",
  delivery: "Доставка",
};

const PAYMENT_LABELS = {
  cash: "Наличными",
  card: "Картой при получении",
  online: "Онлайн",
};

export function formatOrderMessage(order) {
  const restaurantName = RESTAURANT_NAMES[order.restaurantId] ?? order.restaurantId;

  const lines = [
    `🆕 Новый заказ — ${restaurantName}`,
    "",
    `Имя: ${order.customerName}`,
    `Телефон: ${order.customerPhone}`,
    `Способ: ${FULFILLMENT_LABELS[order.fulfillment] ?? order.fulfillment}`,
  ];

  if (order.fulfillment === "delivery" && order.address) {
    lines.push(`Адрес: ${order.address}`);
  }

  lines.push(`Оплата: ${PAYMENT_LABELS[order.payment] ?? order.payment}`);

  if (order.comment) {
    lines.push(`Комментарий: ${order.comment}`);
  }

  lines.push("", "Состав заказа:");
  for (const item of order.items) {
    lines.push(`• ${item.name} × ${item.quantity} — ${item.price * item.quantity} ₽`);
  }

  lines.push("", `Итого: ${order.totalPrice} ₽`);

  return lines.join("\n");
}
