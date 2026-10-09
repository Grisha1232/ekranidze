<?php
require_once __DIR__ . '/includes/auth.php';
require_login();
require_once __DIR__ . '/includes/layout.php';

$id = $_GET['id'] ?? '';
$pdo = db();
$stmt = $pdo->prepare('SELECT id, name FROM restaurants WHERE id = ?');
$stmt->execute([$id]);
$restaurant = $stmt->fetch();
if (!$restaurant) { http_response_code(404); exit('Ресторан не найден'); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $action = $_POST['form_action'] ?? '';

    if ($action === 'add_category') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM menu_categories WHERE restaurant_id = ?');
        $max->execute([$id]);
        $pdo->prepare('INSERT INTO menu_categories (restaurant_id, id, sort_order, title, menu_group) VALUES (?, ?, ?, ?, ?)')
            ->execute([$id, $_POST['cat_id'], $max->fetchColumn() + 1, $_POST['title'], $_POST['menu_group']]);
        flash('Категория добавлена.');
    }
    if ($action === 'update_category') {
        $pdo->prepare('UPDATE menu_categories SET title=?, menu_group=? WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['title'], $_POST['menu_group'], $_POST['cat_id'], $id]);
        flash('Категория сохранена.');
    }
    if ($action === 'delete_category') {
        $pdo->prepare('DELETE FROM menu_categories WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['cat_id'], $id]);
        flash('Категория и её блюда удалены.');
    }

    if ($action === 'add_item') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM menu_items WHERE restaurant_id = ? AND category_id = ?');
        $max->execute([$id, $_POST['category_id']]);
        $pdo->prepare('INSERT INTO menu_items (restaurant_id, id, category_id, sort_order, name, description, weight, price, tone, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                $id, $_POST['item_id'], $_POST['category_id'], $max->fetchColumn() + 1,
                $_POST['name'], $_POST['description'] ?: null, $_POST['weight'] ?: null,
                (int)$_POST['price'], $_POST['tone'], $_POST['image'] ?: null,
            ]);
        flash('Блюдо добавлено.');
    }
    if ($action === 'update_item') {
        $pdo->prepare('UPDATE menu_items SET category_id=?, name=?, description=?, weight=?, price=?, tone=?, image=? WHERE id=? AND restaurant_id=?')
            ->execute([
                $_POST['category_id'], $_POST['name'], $_POST['description'] ?: null,
                $_POST['weight'] ?: null, (int)$_POST['price'], $_POST['tone'], $_POST['image'] ?: null,
                $_POST['item_id'], $id,
            ]);
        flash('Блюдо сохранено.');
    }
    if ($action === 'delete_item') {
        $pdo->prepare('DELETE FROM menu_items WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['item_id'], $id]);
        flash('Блюдо удалено.');
    }

    header('Location: menu.php?id=' . urlencode($id) . (isset($_GET['category']) ? '&category=' . urlencode($_GET['category']) : ''));
    exit;
}

admin_header('Меню — ' . $restaurant['name']);

$categories = $pdo->prepare('SELECT * FROM menu_categories WHERE restaurant_id=? ORDER BY menu_group, sort_order');
$categories->execute([$id]);
$categories = $categories->fetchAll();

$activeCategory = $_GET['category'] ?? ($categories[0]['id'] ?? null);
?>
<p><a href="restaurant.php?id=<?= urlencode($id) ?>">← К основным данным ресторана</a></p>

<h2>Категории</h2>
<div class="card">
  <table>
    <tr><th>Название</th><th>Группа</th><th>ID</th><th></th></tr>
    <?php foreach ($categories as $c): ?>
    <tr>
      <form method="post">
        <td><?= csrf_field() ?><input type="hidden" name="form_action" value="update_category">
          <input type="hidden" name="cat_id" value="<?= htmlspecialchars($c['id']) ?>">
          <input type="text" name="title" value="<?= htmlspecialchars($c['title']) ?>"></td>
        <td>
          <select name="menu_group">
            <option value="food" <?= $c['menu_group'] === 'food' ? 'selected' : '' ?>>еда</option>
            <option value="drinks" <?= $c['menu_group'] === 'drinks' ? 'selected' : '' ?>>напитки</option>
          </select>
        </td>
        <td class="muted"><?= htmlspecialchars($c['id']) ?> &nbsp; <a href="menu.php?id=<?= urlencode($id) ?>&category=<?= urlencode($c['id']) ?>">блюда →</a></td>
        <td>
          <input type="submit" value="Сохранить">
          <button type="submit" class="danger" onclick="this.form.form_action.value='delete_category'; return confirm('Удалить категорию и все её блюда?')">Удалить</button>
        </td>
      </form>
    </tr>
    <?php endforeach; ?>
  </table>
</div>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_category">
  <div class="row">
    <div><label>ID (латиницей)</label><input type="text" name="cat_id" required></div>
    <div><label>Название</label><input type="text" name="title" required></div>
    <div><label>Группа</label>
      <select name="menu_group"><option value="food">еда</option><option value="drinks">напитки</option></select>
    </div>
  </div>
  <div style="margin-top:8px"><input type="submit" value="Добавить категорию"></div>
</form>

<h2>Блюда</h2>
<div class="card">
  <?php foreach ($categories as $c): ?>
    <a class="button <?= $c['id'] === $activeCategory ? '' : 'secondary' ?>" style="margin:2px"
       href="menu.php?id=<?= urlencode($id) ?>&category=<?= urlencode($c['id']) ?>"><?= htmlspecialchars($c['title']) ?></a>
  <?php endforeach; ?>
</div>

<?php if ($activeCategory):
  $items = $pdo->prepare('SELECT * FROM menu_items WHERE restaurant_id=? AND category_id=? ORDER BY sort_order');
  $items->execute([$id, $activeCategory]);
  $items = $items->fetchAll();
?>
<?php foreach ($items as $item): ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="update_item">
  <input type="hidden" name="item_id" value="<?= htmlspecialchars($item['id']) ?>">
  <div class="row">
    <div><label>Название</label><input type="text" name="name" value="<?= htmlspecialchars($item['name']) ?>" required></div>
    <div><label>Категория</label>
      <select name="category_id">
        <?php foreach ($categories as $c): ?>
          <option value="<?= htmlspecialchars($c['id']) ?>" <?= $c['id'] === $item['category_id'] ? 'selected' : '' ?>><?= htmlspecialchars($c['title']) ?></option>
        <?php endforeach; ?>
      </select>
    </div>
  </div>
  <label>Описание (необязательно)</label>
  <input type="text" name="description" value="<?= htmlspecialchars((string)$item['description']) ?>">
  <div class="row">
    <div><label>Вес/объём (необязательно)</label><input type="text" name="weight" value="<?= htmlspecialchars((string)$item['weight']) ?>"></div>
    <div><label>Цена, ₽</label><input type="number" name="price" value="<?= (int)$item['price'] ?>" required></div>
    <div><label>Тон плейсхолдера</label>
      <select name="tone">
        <?php foreach (['warm', 'clay', 'olive'] as $t): ?>
          <option value="<?= $t ?>" <?= $item['tone'] === $t ? 'selected' : '' ?>><?= $t ?></option>
        <?php endforeach; ?>
      </select>
    </div>
  </div>
  <label>Фото (путь /menu/..., необязательно)</label>
  <input type="text" name="image" value="<?= htmlspecialchars((string)$item['image']) ?>">
  <div style="margin-top:8px">
    <input type="submit" value="Сохранить">
    <button type="submit" class="danger" onclick="this.form.form_action.value='delete_item'; return confirm('Удалить блюдо?')">Удалить</button>
  </div>
</form>
<?php endforeach; ?>

<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_item">
  <input type="hidden" name="category_id" value="<?= htmlspecialchars($activeCategory) ?>">
  <div class="row">
    <div><label>ID (латиницей, уникальный)</label><input type="text" name="item_id" required></div>
    <div><label>Название</label><input type="text" name="name" required></div>
  </div>
  <label>Описание</label>
  <input type="text" name="description">
  <div class="row">
    <div><label>Вес/объём</label><input type="text" name="weight"></div>
    <div><label>Цена, ₽</label><input type="number" name="price" required></div>
    <div><label>Тон</label>
      <select name="tone"><option value="warm">warm</option><option value="clay">clay</option><option value="olive">olive</option></select>
    </div>
  </div>
  <label>Фото (путь /menu/...)</label>
  <input type="text" name="image">
  <div style="margin-top:8px"><input type="submit" value="Добавить блюдо"></div>
</form>
<?php endif; ?>
<?php
admin_footer();
