<?php
// POST /api/orders.php — checkout submission. Always records the order in
// the `orders` table; also forwards it to the restaurant's Telegram chat
// when a bot is configured for it (see lib/telegram.php — stub mode
// otherwise, same behavior the old Node prototype had).

require __DIR__ . '/../lib/db.php';
require __DIR__ . '/../lib/telegram.php';
require __DIR__ . '/../lib/order_message.php';

send_cors_headers();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['ok' => false, 'error' => 'POST only'], 405);
}

$order = json_decode(file_get_contents('php://input'), true);
if (!is_array($order)) {
    json_response(['ok' => false, 'error' => 'invalid JSON body'], 400);
}

function validate_order(array $order): array
{
    $errors = [];
    if (empty($order['restaurantId'])) $errors[] = 'restaurantId is required';
    if (empty(trim($order['customerName'] ?? ''))) $errors[] = 'customerName is required';
    if (empty(trim($order['customerPhone'] ?? ''))) $errors[] = 'customerPhone is required';
    if (($order['fulfillment'] ?? '') === 'delivery' && empty(trim($order['address'] ?? ''))) {
        $errors[] = 'address is required for delivery';
    }
    if (!is_array($order['items'] ?? null) || count($order['items']) === 0) {
        $errors[] = 'items must be a non-empty array';
    }
    return $errors;
}

$errors = validate_order($order);
if ($errors) {
    json_response(['ok' => false, 'error' => implode('; ', $errors)], 400);
}

$target = telegram_target($order['restaurantId']);
$telegramDelivered = false;
if ($target) {
    $telegramDelivered = send_telegram_message($target['token'], $target['chat_id'], format_order_message($order));
} else {
    error_log("[orders] (stub) no Telegram bot configured for \"{$order['restaurantId']}\" — order logged only");
}

$stmt = db()->prepare(
    'INSERT INTO orders (restaurant_id, customer_name, customer_phone, fulfillment, address, payment, comment, items_json, total_price, telegram_delivered)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([
    $order['restaurantId'],
    $order['customerName'],
    $order['customerPhone'],
    $order['fulfillment'],
    $order['fulfillment'] === 'delivery' ? ($order['address'] ?? null) : null,
    $order['payment'] ?? 'cash',
    $order['comment'] ?? null,
    json_encode($order['items'], JSON_UNESCAPED_UNICODE),
    (int)($order['totalPrice'] ?? 0),
    $telegramDelivered ? 1 : 0,
]);
$orderId = db()->lastInsertId();

json_response(['ok' => true, 'orderId' => $orderId, 'telegramDelivered' => $telegramDelivered]);
