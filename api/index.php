<?php

// Aktifkan error reporting untuk debugging di Vercel
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if vendor folder exists
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "Vendor folder not found. Please ensure composer dependencies are installed on Vercel.";
    exit(1);
}

// Forward Vercel requests to normal Laravel index.php
require __DIR__ . '/../public/index.php';
