<?php

header('Content-Type: text/plain');

echo "=== VERCEL DEBUG INFO ===\n\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "SAPI: " . PHP_SAPI . "\n";
echo "Current Dir: " . __DIR__ . "\n";
echo "Project Root (guessed): " . dirname(__DIR__) . "\n";
echo "User: " . get_current_user() . "\n";

echo "\n--- DIRECTORY CHECK ---\n";
$paths = [
    '/var/task',
    '/var/task/user',
    '/var/task/user/vendor',
    '/var/task/user/public',
    '/tmp/storage',
];

foreach ($paths as $path) {
    if (is_dir($path)) {
        echo "[DIR]  EXISTS: $path\n";
    } else {
        echo "[DIR]  MISSING: $path\n";
    }
}

echo "\n--- ROOT CONTENTS (/var/task/user) ---\n";
$root = '/var/task/user';
if (is_dir($root)) {
    $files = scandir($root);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $full = "$root/$file";
        echo is_dir($full) ? "[DIR]  " : "[FILE] ";
        echo "$file\n";
    }
}

echo "\n--- VENDOR/AUTOLOAD CHECK ---\n";
$autoload = '/var/task/user/vendor/autoload.php';
if (file_exists($autoload)) {
    echo "Autoload found at: $autoload\n";
} else {
    echo "CRITICAL: Autoload NOT found at: $autoload\n";
}

echo "\n--- ENVIRONMENT VARIABLES ---\n";
print_r($_ENV);

echo "\n=== END DEBUG ===\n";
