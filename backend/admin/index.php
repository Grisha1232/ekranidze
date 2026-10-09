<?php
require_once __DIR__ . '/includes/auth.php';
require_login();
require_once __DIR__ . '/includes/layout.php';

$restaurants = db()->query('SELECT id, name, is_placeholder, updated_at FROM restaurants ORDER BY sort_order')->fetchAll();

admin_header('Рестораны');
?>
<div class="restaurant-list">
<?php foreach ($restaurants as $r): ?>
  <a class="card" href="restaurant.php?id=<?= urlencode($r['id']) ?>">
    <strong><?= htmlspecialchars($r['name']) ?></strong>
    <?php if ($r['is_placeholder']): ?><span class="muted">· черновик</span><?php endif; ?>
    <div class="muted">Обновлено: <?= htmlspecialchars($r['updated_at']) ?></div>
  </a>
<?php endforeach; ?>
</div>
<?php
admin_footer();
