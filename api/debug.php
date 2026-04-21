<?php

// Trigger creation for debug reporting
$baseTmp = '/tmp/storage/framework';
$dirs = ['/tmp/storage/app/public', $baseTmp . '/views', $baseTmp . '/cache/data', $baseTmp . '/sessions', '/tmp/storage/logs'];
foreach ($dirs as $dir) { if (!is_dir($dir)) @mkdir($dir, 0777, true); }

header('Content-Type: text/plain');
echo "=== VERCEL DEBUG INFO ===\n";
echo "PHP: " . PHP_VERSION . "\n";

echo "\n--- DIRECTORY CHECK ---\n";
foreach ($dirs as $path) {
    echo (is_dir($path) ? "[OK]  " : "[MISSING] ") . "$path\n";
}

echo "\n--- ROOT FILES ---\n";
foreach (scandir('/var/task/user') as $f) echo "$f\n";

echo "\n--- VITE CHECK ---\n";
$manifest = '/var/task/user/public/build/manifest.json';
echo (file_exists($manifest) ? "[OK]  Manifest found" : "[!!]  Manifest MISSING at $manifest");
