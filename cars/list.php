<?php
require_once '../config/db.php';
$stmt = $pdo->query("SELECT * FROM cars WHERE is_available = 1");
$cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cars);