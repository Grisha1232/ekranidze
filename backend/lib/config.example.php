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
];
