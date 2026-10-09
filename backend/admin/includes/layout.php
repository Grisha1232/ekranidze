<?php

function admin_header(string $title): void
{
    $admin = current_admin();
    ?>
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= htmlspecialchars($title) ?> — Админка</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="topbar">
  <div><strong>Админка сайта</strong></div>
  <?php if ($admin): ?>
  <div>
    <span class="muted"><?= htmlspecialchars($admin['username']) ?></span>
    &nbsp;
    <a class="button secondary" href="index.php">К списку ресторанов</a>
    <a class="button secondary" href="orders.php">Заказы</a>
    <a class="button secondary" href="logout.php">Выйти</a>
  </div>
  <?php endif; ?>
</div>
<main>
<h1><?= htmlspecialchars($title) ?></h1>
<?php
    if (!empty($_SESSION['flash'])) {
        foreach ($_SESSION['flash'] as $f) {
            echo '<div class="flash ' . htmlspecialchars($f['type']) . '">' . htmlspecialchars($f['text']) . '</div>';
        }
        unset($_SESSION['flash']);
    }
}

function flash(string $text, string $type = 'ok'): void
{
    $_SESSION['flash'][] = ['text' => $text, 'type' => $type];
}

function admin_footer(): void
{
    ?>
</main>
</body>
</html>
<?php
}
