<?php

/**
 * Run on a schedule via Timeweb's panel-managed cron (crontab -e is blocked
 * on this hosting) — see backend/README.md for the exact command to paste
 * into the panel's cron UI.
 */

require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/../lib/yandex_rating.php';

$pdo = db();
$restaurants = $pdo->query('SELECT id, yandex_reviews_url FROM restaurants WHERE yandex_reviews_url IS NOT NULL AND yandex_reviews_url != \'\'')->fetchAll();

foreach ($restaurants as $r) {
    $rating = fetch_yandex_rating($r['yandex_reviews_url']);
    if ($rating === null) {
        echo "[{$r['id']}] skipped (fetch/parse failed)\n";
        continue;
    }

    $stmt = $pdo->prepare('UPDATE restaurants SET rating_value = ?, rating_updated_at = NOW() WHERE id = ?');
    $stmt->execute([$rating, $r['id']]);
    echo "[{$r['id']}] rating_value = $rating\n";
}
