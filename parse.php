<?php

$lines = file('data.txt', FILE_IGNORE_NEW_LINES);

$indicators = [];
$current = [];

$index = 1;

foreach ($lines as $line) {
    if (strpos($line, '---') !== false) {
        if (!empty($current)) {
            $current['code'] = 'IKU-' . str_pad($index, 2, '0', STR_PAD_LEFT);
            // clean up newlines in formula
            if (isset($current['formula'])) {
                $current['formula'] = trim(preg_replace('/\s+/', ' ', $current['formula']));
            }
            if (isset($current['description'])) {
                $current['description'] = trim(preg_replace('/\s+/', ' ', $current['description']));
            }
            $indicators[] = $current;
            $current = [];
            $index++;
        }
    } elseif (strpos($line, 'NO:') === 0) {
        // ignore
    } elseif (strpos($line, 'INDIKATOR:') === 0) {
        $current['description'] = trim(substr($line, 10));
    } elseif (strpos($line, 'PIC:') === 0) {
        $current['pics'] = trim(substr($line, 4));
    } elseif (strpos($line, 'RUMUS:') === 0) {
        $current['formula'] = trim(substr($line, 6));
    } else {
        // if there's no prefix, it belongs to the previous field (RUMUS or PIC)
        if (trim($line) !== '') {
            if (isset($current['formula']) && !isset($current['current_field']) ) {
                $current['current_field'] = 'formula';
            }
            
            // wait, PIC could also be multi-line
            if (isset($current['formula'])) {
                $current['formula'] .= ' ' . trim($line);
            } elseif (isset($current['pics'])) {
                $current['pics'] .= "\n" . trim($line);
            }
        }
    }
}

// process the last one if no ---
if (!empty($current)) {
    $current['code'] = 'IKU-' . str_pad($index, 2, '0', STR_PAD_LEFT);
    if (isset($current['formula'])) {
        $current['formula'] = trim(preg_replace('/\s+/', ' ', $current['formula']));
    }
    if (isset($current['description'])) {
        $current['description'] = trim(preg_replace('/\s+/', ' ', $current['description']));
    }
    $indicators[] = $current;
}

$output = "[\n";
foreach ($indicators as $ind) {
    // split pics by newlines
    $pics = explode("\n", $ind['pics']);
    $picsArrStr = implode(', ', array_map(function($p) { return "'" . addslashes(trim($p)) . "'"; }, array_filter($pics)));

    $output .= "    [\n";
    $output .= "        'code' => '" . $ind['code'] . "',\n";
    $output .= "        'description' => '" . addslashes($ind['description']) . "',\n";
    $output .= "        'formula' => '" . addslashes($ind['formula']) . "',\n";
    $output .= "        'pics' => [" . $picsArrStr . "]\n";
    $output .= "    ],\n";
}
$output .= "];\n";

file_put_contents('output.json', $output);
echo "Done";
