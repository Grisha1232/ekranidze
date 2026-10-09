<?php
require_once __DIR__ . '/../../lib/db.php';

session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
session_start();

function current_admin(): ?array
{
    return $_SESSION['admin'] ?? null;
}

function require_login(): void
{
    if (!current_admin()) {
        header('Location: login.php');
        exit;
    }
}

function attempt_login(string $username, string $password): bool
{
    $stmt = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) {
        return false;
    }
    // Regenerate the session id on privilege change to avoid session fixation.
    session_regenerate_id(true);
    $_SESSION['admin'] = ['id' => $user['id'], 'username' => $user['username']];
    return true;
}

function logout(): void
{
    $_SESSION = [];
    session_destroy();
}

function csrf_field(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
    return '<input type="hidden" name="csrf" value="' . htmlspecialchars($_SESSION['csrf']) . '">';
}

function csrf_check(): void
{
    if (($_POST['csrf'] ?? '') !== ($_SESSION['csrf'] ?? null)) {
        http_response_code(403);
        exit('CSRF check failed — go back and try again.');
    }
}
