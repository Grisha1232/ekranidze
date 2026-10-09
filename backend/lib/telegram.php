<?php

function send_telegram_message(string $token, string $chatId, string $text): bool
{
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode(['chat_id' => $chatId, 'text' => $text]),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $status >= 300) {
        error_log("[orders] Telegram send failed (HTTP $status): $error $response");
        return false;
    }
    return true;
}

/**
 * Which bot token/chat id to use for a restaurant's order notifications.
 * Both empty/missing = stub mode — the order is still recorded in the
 * `orders` table (see orders.php), just not forwarded to Telegram yet.
 */
function telegram_target(string $restaurantId): ?array
{
    $targets = config()['telegram_targets'] ?? [];
    $t = $targets[$restaurantId] ?? null;
    if (!$t || empty($t['token']) || empty($t['chat_id'])) {
        return null;
    }
    return $t;
}
