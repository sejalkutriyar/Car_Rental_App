<?php
require_once '../config/db.php';
$data = json_decode(file_get_contents("php://input"), true);

$car_id      = $data['car_id'] ?? '';
$customer_id = $data['customer_id'] ?? '';
$start_date  = $data['start_date'] ?? '';
$num_days    = $data['num_days'] ?? '';

if (!$car_id || !$customer_id || !$start_date || !$num_days) {
    echo json_encode(["error" => "All fields required"]);
    exit();
}

if (!is_numeric($num_days) || (int)$num_days <= 0) {
    echo json_encode(["error" => "Invalid number of days"]);
    exit();
}

$roleStmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$roleStmt->execute([$customer_id]);
$user = $roleStmt->fetch(PDO::FETCH_ASSOC);

if (!$user || $user['role'] !== 'customer') {
    echo json_encode(["error" => "Only customers can book cars"]);
    exit();
}

$stmt = $pdo->prepare("SELECT rent_per_day, is_available FROM cars WHERE id = ?");
$stmt->execute([$car_id]);
$car = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$car) {
    echo json_encode(["error" => "Car not found"]);
    exit();
}

if ((int)$car['is_available'] !== 1) {
    echo json_encode(["error" => "Car is not available"]);
    exit();
}

$total_cost = $car['rent_per_day'] * (int)$num_days;

try {
    $stmt = $pdo->prepare("INSERT INTO bookings (car_id, customer_id, start_date, num_days, total_cost) VALUES (?,?,?,?,?)");
    $stmt->execute([$car_id, $customer_id, $start_date, (int)$num_days, $total_cost]);

    $pdo->prepare("UPDATE cars SET is_available = 0 WHERE id = ?")->execute([$car_id]);

    echo json_encode(["success" => "Car booked!", "total_cost" => $total_cost]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Booking failed"]);
}