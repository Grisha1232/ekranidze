<?php

const RESTAURANT_NAMES = ['ekranidze' => 'Экранидзе', 'mama-hinkali' => 'Мама хинкали'];
const FULFILLMENT_LABELS = ['pickup' => 'Самовывоз', 'delivery' => 'Доставка'];
const PAYMENT_LABELS = ['cash' => 'Наличными', 'card' => 'Картой при получении', 'online' => 'Онлайн'];

function format_order_message(array $order): string
{
    $restaurantName = RESTAURANT_NAMES[$order['restaurantId']] ?? $order['restaurantId'];

    $lines = [
        "🆕 Новый заказ — {$restaurantName}",
        '',
        "Имя: {$order['customerName']}",
        "Телефон: {$order['customerPhone']}",
        'Способ: ' . (FULFILLMENT_LABELS[$order['fulfillment']] ?? $order['fulfillment']),
    ];

    if ($order['fulfillment'] === 'delivery' && !empty($order['address'])) {
        $lines[] = "Адрес: {$order['address']}";
    }

    $lines[] = 'Оплата: ' . (PAYMENT_LABELS[$order['payment']] ?? $order['payment']);

    if (!empty($order['comment'])) {
        $lines[] = "Комментарий: {$order['comment']}";
    }

    $lines[] = '';
    $lines[] = 'Состав заказа:';
    foreach ($order['items'] as $item) {
        $lineTotal = $item['price'] * $item['quantity'];
        $lines[] = "• {$item['name']} × {$item['quantity']} — {$lineTotal} ₽";
    }

    $lines[] = '';
    $lines[] = "Итого: {$order['totalPrice']} ₽";

    return implode("\n", $lines);
}
