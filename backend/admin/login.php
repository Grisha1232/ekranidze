<?php
require_once __DIR__ . '/includes/auth.php';

$error = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (attempt_login($_POST['username'] ?? '', $_POST['password'] ?? '')) {
        header('Location: index.php');
        exit;
    }
    $error = 'Неверный логин или пароль';
}

if (current_admin()) {
    header('Location: index.php');
    exit;
}
?>
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Вход — Админка</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<main style="max-width:360px;margin-top:80px">
  <h1>Вход в админку</h1>
  <?php if ($error): ?><div class="flash error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
  <form method="post" class="card">
    <label>Логин</label>
    <input type="text" name="username" autofocus required>
    <label>Пароль</label>
    <input type="password" name="password" required>
    <div style="margin-top:16px"><input type="submit" value="Войти"></div>
  </form>
</main>
</body>
</html>
