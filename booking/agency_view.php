<?php
require_once '../config/db.php';
$agency_id = $_GET['agency_id'] ?? '';

if (!$agency_id) {
    echo json_encode(["error" => "Agency ID required"]);
    exit();
}

$stmt = $pdo->prepare("
    SELECT b.id, u.name AS customer_name, u.email AS customer_email,
           c.vehicle_model, c.vehicle_number,
           b.start_date, b.num_days, b.total_cost, b.booked_at
    FROM bookings b
    JOIN cars c ON b.car_id = c.id
    JOIN users u ON b.customer_id = u.id
    WHERE c.agency_id = ?
    ORDER BY b.booked_at DESC
");
$stmt->execute([$agency_id]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));