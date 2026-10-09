<?php
// GET /api/restaurants.php            -> all restaurants (list, for the switcher/Hero carousel)
// GET /api/restaurants.php?id=ekranidze -> one restaurant, full detail (addresses, about, amenities, custom sections)

require __DIR__ . '/../lib/db.php';
send_cors_headers();

$pdo = db();
$id = $_GET['id'] ?? null;

function fetch_restaurant(PDO $pdo, string $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM restaurants WHERE id = ?');
    $stmt->execute([$id]);
    $r = $stmt->fetch();
    if (!$r) return null;

    $addr = $pdo->prepare('SELECT id, label, address_text AS addressText, lon, lat, yandex_url AS yandexUrl FROM restaurant_addresses WHERE restaurant_id = ? ORDER BY sort_order');
    $addr->execute([$id]);
    $addresses = array_map(function ($a) {
        if ($a['lon'] !== null && $a['lat'] !== null) {
            $a['coords'] = [(float)$a['lon'], (float)$a['lat']];
        } else {
            $a['coords'] = null;
        }
        unset($a['lon'], $a['lat']);
        return $a;
    }, $addr->fetchAll());

    $about = $pdo->prepare('SELECT body FROM restaurant_about_paragraphs WHERE restaurant_id = ? ORDER BY sort_order');
    $about->execute([$id]);
    $aboutParagraphs = array_column($about->fetchAll(), 'body');

    $amen = $pdo->prepare('SELECT label FROM restaurant_amenities WHERE restaurant_id = ? ORDER BY sort_order');
    $amen->execute([$id]);
    $amenities = array_column($amen->fetchAll(), 'label');

    $sections = $pdo->prepare('SELECT id, placement, title, body FROM custom_sections WHERE restaurant_id = ? ORDER BY sort_order');
    $sections->execute([$id]);

    return [
        'id' => $r['id'],
        'path' => $r['path'],
        'name' => $r['name'],
        'shortLabel' => $r['short_label'],
        'logoImage' => $r['logo_image'],
        'headerIcon' => $r['header_icon'],
        'tone' => $r['tone'],
        'badge' => $r['badge'],
        'heroHeading' => $r['hero_heading'],
        'heroText' => $r['hero_text'],
        'aboutHeading' => $r['about_heading'],
        'aboutParagraphs' => $aboutParagraphs,
        'amenities' => $amenities,
        'ratingValue' => $r['rating_value'],
        'yandexReviewsUrl' => $r['yandex_reviews_url'],
        'phone' => $r['phone'],
        'phoneHref' => $r['phone_href'],
        'telegram' => $r['telegram'],
        'legalInfo' => $r['legal_info'],
        'isPlaceholder' => (bool)$r['is_placeholder'],
        'addresses' => $addresses,
        'customSections' => $sections->fetchAll(),
    ];
}

if ($id !== null) {
    $restaurant = fetch_restaurant($pdo, $id);
    if (!$restaurant) json_response(['error' => 'not found'], 404);
    json_response($restaurant);
}

$ids = $pdo->query('SELECT id FROM restaurants ORDER BY sort_order')->fetchAll(PDO::FETCH_COLUMN);
json_response(array_map(fn($rid) => fetch_restaurant($pdo, $rid), $ids));
