<?php
require_once __DIR__ . '/includes/auth.php';
require_login();
require_once __DIR__ . '/includes/layout.php';

$id = $_GET['id'] ?? '';
$pdo = db();

$stmt = $pdo->prepare('SELECT * FROM restaurants WHERE id = ?');
$stmt->execute([$id]);
$restaurant = $stmt->fetch();
if (!$restaurant) { http_response_code(404); exit('Ресторан не найден'); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $action = $_POST['form_action'] ?? '';

    if ($action === 'update_basic') {
        $pdo->prepare('UPDATE restaurants SET name=?, short_label=?, badge=?, hero_heading=?, hero_text=?, about_heading=?, rating_value=?, yandex_reviews_url=?, phone=?, phone_href=?, telegram=?, legal_info=?, logo_image=?, header_icon=?, tone=?, is_placeholder=? WHERE id=?')
            ->execute([
                $_POST['name'], $_POST['short_label'], $_POST['badge'], $_POST['hero_heading'],
                $_POST['hero_text'], $_POST['about_heading'], $_POST['rating_value'],
                $_POST['yandex_reviews_url'] ?: null, $_POST['phone'], $_POST['phone_href'],
                $_POST['telegram'] ?: null, $_POST['legal_info'], $_POST['logo_image'] ?: null,
                $_POST['header_icon'] ?: null, $_POST['tone'], isset($_POST['is_placeholder']) ? 1 : 0,
                $id,
            ]);
        flash('Основные поля сохранены.');
    }

    if ($action === 'add_paragraph') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM restaurant_about_paragraphs WHERE restaurant_id = ?');
        $max->execute([$id]);
        $pdo->prepare('INSERT INTO restaurant_about_paragraphs (restaurant_id, sort_order, body) VALUES (?, ?, ?)')
            ->execute([$id, $max->fetchColumn() + 1, $_POST['body']]);
        flash('Абзац добавлен.');
    }
    if ($action === 'update_paragraph') {
        $pdo->prepare('UPDATE restaurant_about_paragraphs SET body=? WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['body'], $_POST['paragraph_id'], $id]);
        flash('Абзац сохранён.');
    }
    if ($action === 'delete_paragraph') {
        $pdo->prepare('DELETE FROM restaurant_about_paragraphs WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['paragraph_id'], $id]);
        flash('Абзац удалён.');
    }

    if ($action === 'add_amenity') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM restaurant_amenities WHERE restaurant_id = ?');
        $max->execute([$id]);
        $pdo->prepare('INSERT INTO restaurant_amenities (restaurant_id, sort_order, label) VALUES (?, ?, ?)')
            ->execute([$id, $max->fetchColumn() + 1, $_POST['label']]);
        flash('Удобство добавлено.');
    }
    if ($action === 'delete_amenity') {
        $pdo->prepare('DELETE FROM restaurant_amenities WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['amenity_id'], $id]);
        flash('Удобство удалено.');
    }

    if ($action === 'add_address') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM restaurant_addresses WHERE restaurant_id = ?');
        $max->execute([$id]);
        $pdo->prepare('INSERT INTO restaurant_addresses (id, restaurant_id, sort_order, label, address_text, lon, lat, yandex_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                $_POST['addr_id'], $id, $max->fetchColumn() + 1, $_POST['label'] ?: null,
                $_POST['address_text'], $_POST['lon'] !== '' ? $_POST['lon'] : null,
                $_POST['lat'] !== '' ? $_POST['lat'] : null, $_POST['yandex_url'] ?: null,
            ]);
        flash('Адрес добавлен.');
    }
    if ($action === 'update_address') {
        $pdo->prepare('UPDATE restaurant_addresses SET label=?, address_text=?, lon=?, lat=?, yandex_url=? WHERE id=? AND restaurant_id=?')
            ->execute([
                $_POST['label'] ?: null, $_POST['address_text'],
                $_POST['lon'] !== '' ? $_POST['lon'] : null, $_POST['lat'] !== '' ? $_POST['lat'] : null,
                $_POST['yandex_url'] ?: null, $_POST['addr_id'], $id,
            ]);
        flash('Адрес сохранён.');
    }
    if ($action === 'delete_address') {
        $pdo->prepare('DELETE FROM restaurant_addresses WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['addr_id'], $id]);
        flash('Адрес удалён.');
    }

    if ($action === 'add_section') {
        $max = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM custom_sections WHERE restaurant_id = ?');
        $max->execute([$id]);
        $pdo->prepare('INSERT INTO custom_sections (restaurant_id, sort_order, placement, title, body) VALUES (?, ?, ?, ?, ?)')
            ->execute([$id, $max->fetchColumn() + 1, $_POST['placement'], $_POST['title'], $_POST['body']]);
        flash('Секция добавлена.');
    }
    if ($action === 'update_section') {
        $pdo->prepare('UPDATE custom_sections SET placement=?, title=?, body=? WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['placement'], $_POST['title'], $_POST['body'], $_POST['section_id'], $id]);
        flash('Секция сохранена.');
    }
    if ($action === 'delete_section') {
        $pdo->prepare('DELETE FROM custom_sections WHERE id=? AND restaurant_id=?')
            ->execute([$_POST['section_id'], $id]);
        flash('Секция удалена.');
    }

    header('Location: restaurant.php?id=' . urlencode($id));
    exit;
}

admin_header($restaurant['name']);

$paragraphs = $pdo->prepare('SELECT * FROM restaurant_about_paragraphs WHERE restaurant_id=? ORDER BY sort_order');
$paragraphs->execute([$id]);
$amenitiesStmt = $pdo->prepare('SELECT * FROM restaurant_amenities WHERE restaurant_id=? ORDER BY sort_order');
$amenitiesStmt->execute([$id]);
$amenities = $amenitiesStmt->fetchAll();
$addresses = $pdo->prepare('SELECT * FROM restaurant_addresses WHERE restaurant_id=? ORDER BY sort_order');
$addresses->execute([$id]);
$sections = $pdo->prepare('SELECT * FROM custom_sections WHERE restaurant_id=? ORDER BY sort_order');
$sections->execute([$id]);
?>
<p><a href="menu.php?id=<?= urlencode($id) ?>">→ Редактировать меню этого ресторана</a></p>

<h2>Основное</h2>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="update_basic">
  <div class="row">
    <div><label>Название</label><input type="text" name="name" value="<?= htmlspecialchars($restaurant['name']) ?>" required></div>
    <div><label>Короткое название</label><input type="text" name="short_label" value="<?= htmlspecialchars($restaurant['short_label']) ?>" required></div>
  </div>
  <label>Бейдж (над заголовком Hero)</label>
  <input type="text" name="badge" value="<?= htmlspecialchars($restaurant['badge']) ?>">
  <label>Заголовок Hero</label>
  <input type="text" name="hero_heading" value="<?= htmlspecialchars($restaurant['hero_heading']) ?>">
  <label>Текст Hero</label>
  <textarea name="hero_text"><?= htmlspecialchars($restaurant['hero_text']) ?></textarea>
  <label>Заголовок «О нас»</label>
  <input type="text" name="about_heading" value="<?= htmlspecialchars($restaurant['about_heading']) ?>">
  <div class="row">
    <div><label>Рейтинг (например 4.8 или —)</label><input type="text" name="rating_value" value="<?= htmlspecialchars($restaurant['rating_value']) ?>"></div>
    <div><label>Ссылка на отзывы Яндекс</label><input type="text" name="yandex_reviews_url" value="<?= htmlspecialchars((string)$restaurant['yandex_reviews_url']) ?>"></div>
  </div>
  <div class="row">
    <div><label>Телефон (как показывать)</label><input type="text" name="phone" value="<?= htmlspecialchars($restaurant['phone']) ?>"></div>
    <div><label>Телефон (tel: ссылка)</label><input type="text" name="phone_href" value="<?= htmlspecialchars($restaurant['phone_href']) ?>"></div>
  </div>
  <div class="row">
    <div><label>Telegram (ссылка, необязательно)</label><input type="text" name="telegram" value="<?= htmlspecialchars((string)$restaurant['telegram']) ?>"></div>
    <div><label>Юр. информация (ИНН/ОГРН)</label><input type="text" name="legal_info" value="<?= htmlspecialchars($restaurant['legal_info']) ?>"></div>
  </div>
  <div class="row">
    <div><label>Логотип для Hero (путь /logos/...)</label><input type="text" name="logo_image" value="<?= htmlspecialchars((string)$restaurant['logo_image']) ?>"></div>
    <div><label>Иконка в шапке (путь /logos/...)</label><input type="text" name="header_icon" value="<?= htmlspecialchars((string)$restaurant['header_icon']) ?>"></div>
  </div>
  <div class="row">
    <div><label>Цветовой тон плейсхолдеров</label>
      <select name="tone">
        <?php foreach (['warm', 'clay', 'olive'] as $t): ?>
          <option value="<?= $t ?>" <?= $restaurant['tone'] === $t ? 'selected' : '' ?>><?= $t ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <div><label><input type="checkbox" name="is_placeholder" style="width:auto" <?= $restaurant['is_placeholder'] ? 'checked' : '' ?>> Это черновик (показывать баннер «в разработке»)</label></div>
  </div>
  <div style="margin-top:16px"><input type="submit" value="Сохранить"></div>
</form>

<h2>Текст «О нас» (абзацы)</h2>
<?php foreach ($paragraphs as $p): ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="update_paragraph">
  <input type="hidden" name="paragraph_id" value="<?= $p['id'] ?>">
  <textarea name="body"><?= htmlspecialchars($p['body']) ?></textarea>
  <div style="margin-top:8px">
    <input type="submit" value="Сохранить">
    <button type="submit" class="danger" onclick="this.form.form_action.value='delete_paragraph'">Удалить</button>
  </div>
</form>
<?php endforeach; ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_paragraph">
  <label>Новый абзац</label>
  <textarea name="body" required></textarea>
  <div style="margin-top:8px"><input type="submit" value="Добавить абзац"></div>
</form>

<h2>Удобства</h2>
<div class="card">
  <?php foreach ($amenities as $a): ?>
    <form method="post" class="inline-form" style="margin:4px">
      <?= csrf_field() ?>
      <input type="hidden" name="form_action" value="delete_amenity">
      <input type="hidden" name="amenity_id" value="<?= $a['id'] ?>">
      <span class="button secondary" style="display:inline-flex;align-items:center;gap:6px">
        <?= htmlspecialchars($a['label']) ?>
        <button type="submit" style="padding:2px 8px">×</button>
      </span>
    </form>
  <?php endforeach; ?>
  <?php if (!count($amenities)): ?><p class="muted">Пока пусто.</p><?php endif; ?>
</div>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_amenity">
  <div class="row">
    <input type="text" name="label" placeholder="Например: Wi-Fi" required>
    <div style="flex:0"><input type="submit" value="Добавить"></div>
  </div>
</form>

<h2>Адреса</h2>
<?php foreach ($addresses as $a): ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="update_address">
  <input type="hidden" name="addr_id" value="<?= htmlspecialchars($a['id']) ?>">
  <div class="row">
    <div><label>Метка (необязательно, например «Работает»)</label><input type="text" name="label" value="<?= htmlspecialchars((string)$a['label']) ?>"></div>
    <div><label>Адрес текстом</label><input type="text" name="address_text" value="<?= htmlspecialchars($a['address_text']) ?>" required></div>
  </div>
  <div class="row">
    <div><label>Долгота (lon)</label><input type="text" name="lon" value="<?= htmlspecialchars((string)$a['lon']) ?>"></div>
    <div><label>Широта (lat)</label><input type="text" name="lat" value="<?= htmlspecialchars((string)$a['lat']) ?>"></div>
    <div><label>Ссылка на Яндекс Карты</label><input type="text" name="yandex_url" value="<?= htmlspecialchars((string)$a['yandex_url']) ?>"></div>
  </div>
  <div style="margin-top:8px">
    <input type="submit" value="Сохранить">
    <button type="submit" class="danger" onclick="this.form.form_action.value='delete_address'">Удалить</button>
  </div>
</form>
<?php endforeach; ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_address">
  <div class="row">
    <div><label>ID (латиницей, уникальный)</label><input type="text" name="addr_id" required></div>
    <div><label>Метка</label><input type="text" name="label"></div>
    <div><label>Адрес текстом</label><input type="text" name="address_text" required></div>
  </div>
  <div class="row">
    <div><label>Долгота (lon)</label><input type="text" name="lon"></div>
    <div><label>Широта (lat)</label><input type="text" name="lat"></div>
    <div><label>Ссылка на Яндекс Карты</label><input type="text" name="yandex_url"></div>
  </div>
  <div style="margin-top:8px"><input type="submit" value="Добавить адрес"></div>
</form>

<h2>Дополнительные секции</h2>
<p class="muted">Простой блок «заголовок + текст», можно добавить на страницу без правки кода.</p>
<?php foreach ($sections as $s): ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="update_section">
  <input type="hidden" name="section_id" value="<?= $s['id'] ?>">
  <div class="row">
    <div><label>Заголовок</label><input type="text" name="title" value="<?= htmlspecialchars($s['title']) ?>"></div>
    <div><label>Где показывать</label>
      <select name="placement">
        <?php foreach (['after_hero' => 'после Hero', 'after_menu' => 'после меню', 'after_about' => 'после «О нас»', 'after_delivery' => 'после доставки'] as $val => $lbl): ?>
          <option value="<?= $val ?>" <?= $s['placement'] === $val ? 'selected' : '' ?>><?= $lbl ?></option>
        <?php endforeach; ?>
      </select>
    </div>
  </div>
  <label>Текст</label>
  <textarea name="body"><?= htmlspecialchars($s['body']) ?></textarea>
  <div style="margin-top:8px">
    <input type="submit" value="Сохранить">
    <button type="submit" class="danger" onclick="this.form.form_action.value='delete_section'">Удалить</button>
  </div>
</form>
<?php endforeach; ?>
<form method="post" class="card">
  <?= csrf_field() ?>
  <input type="hidden" name="form_action" value="add_section">
  <div class="row">
    <div><label>Заголовок</label><input type="text" name="title" required></div>
    <div><label>Где показывать</label>
      <select name="placement">
        <option value="after_hero">после Hero</option>
        <option value="after_menu">после меню</option>
        <option value="after_about" selected>после «О нас»</option>
        <option value="after_delivery">после доставки</option>
      </select>
    </div>
  </div>
  <label>Текст</label>
  <textarea name="body" required></textarea>
  <div style="margin-top:8px"><input type="submit" value="Добавить секцию"></div>
</form>
<?php
admin_footer();
