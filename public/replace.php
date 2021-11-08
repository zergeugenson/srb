<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"));
$filename = 'data.json';
$backupname = 'backup.json';
if (file_exists($filename)) {
    $file = file_get_contents($filename);
} else {
    $file = fopen($filename, "a+");
}
$backup = fopen($backupname, "a+");
file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
file_put_contents($backupname, json_encode($data, JSON_PRETTY_PRINT));
$file = file_get_contents('data.json');
echo $file;
unset($file);
unset($backup);
