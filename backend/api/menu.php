<?php
// GET /api/menu.php?id=ekranidze -> { categories: [...], menuItems: [...] }

require __DIR__ . '/../lib/db.php';
send_cors_headers();

$pdo = db();
$id = $_GET['id'] ?? null;
if ($id === null) json_response(['error' => 'missing id'], 400);

$cats = $pdo->prepare('SELECT id, title, menu_group AS `group` FROM menu_categories WHERE restaurant_id = ? ORDER BY sort_order');
$cats->execute([$id]);

$items = $pdo->prepare('SELECT id, category_id AS categoryId, name, description, weight, price, tone, image FROM menu_items WHERE restaurant_id = ? ORDER BY sort_order');
$items->execute([$id]);
$menuItems = array_map(function ($row) {
    $row['price'] = (int)$row['price'];
    return $row;
}, $items->fetchAll());

json_response([
    'categories' => $cats->fetchAll(),
    'menuItems' => $menuItems,
]);
