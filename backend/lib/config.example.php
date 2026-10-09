<?php
// Copy to config.php (gitignored — never commit real DB credentials) and
// fill in. On the Timeweb account this lives at
// ~/ekranidze/public_html/backend/lib/config.php.
return [
    'db_host' => 'localhost',
    'db_name' => 'ci004114_adminpanel',
    'db_user' => 'ci004114_adminpanel',
    'db_pass' => '',
    // Origins allowed to call the public read API / admin login from the
    // browser (both real sites + local dev).
    'allowed_origins' => [
        'https://ekranidze.ru',
        'https://mama-hinkali.ru',
        'http://ekranidze.ru',
        'http://mama-hinkali.ru',
        'http://localhost:3000',
    ],
    // Create each bot via @BotFather in Telegram (/newbot), add it to that
    // restaurant's staff chat, and find the chat id (message the bot, then
    // check https://api.telegram.org/bot<token>/getUpdates). A restaurant
    // left blank here just has its orders recorded in the `orders` table
    // without a Telegram push — see backend/admin/orders.php.
    'telegram_targets' => [
        'ekranidze' => ['token' => '', 'chat_id' => ''],
        'mama-hinkali' => ['token' => '', 'chat_id' => ''],
    ],
];
