<?php
require_once __DIR__ . '/includes/auth.php';
require_login();
require_once __DIR__ . '/includes/layout.php';

$pdo = db();
$orders = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100')->fetchAll();

admin_header('Заказы');
?>
<p class="muted">Последние 100 заказов. Заказы ресторанов без подключённого Telegram-бота попадают сюда же — это их единственный след, пока бот не настроен.</p>
<?php if (!count($orders)): ?>
  <p class="muted">Пока заказов нет.</p>
<?php endif; ?>
<?php foreach ($orders as $o): ?>
  <div class="card">
    <div class="row">
      <div>
        <strong><?= htmlspecialchars($o['restaurant_id']) ?></strong>
        <span class="muted"> · <?= htmlspecialchars($o['created_at']) ?></span>
        <?php if (!$o['telegram_delivered']): ?>
          <span class="muted"> · не доставлено в Telegram</span>
        <?php endif; ?>
      </div>
      <div><strong><?= (int)$o['total_price'] ?> ₽</strong></div>
    </div>
    <p>
      <?= htmlspecialchars($o['customer_name']) ?> · <?= htmlspecialchars($o['customer_phone']) ?>
      · <?= htmlspecialchars($o['fulfillment']) ?>
      <?php if ($o['address']): ?> · <?= htmlspecialchars($o['address']) ?><?php endif; ?>
      · <?= htmlspecialchars($o['payment']) ?>
    </p>
    <?php if ($o['comment']): ?><p class="muted">Комментарий: <?= htmlspecialchars($o['comment']) ?></p><?php endif; ?>
    <?php $items = json_decode($o['items_json'], true) ?: []; ?>
    <ul>
      <?php foreach ($items as $item): ?>
        <li><?= htmlspecialchars($item['name']) ?> × <?= (int)$item['quantity'] ?> — <?= (int)$item['price'] * (int)$item['quantity'] ?> ₽</li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endforeach; ?>
<?php
admin_footer();
