<?php
require_once '../config/db.php';
$data = json_decode(file_get_contents("php://input"), true);

$agency_id        = $data['agency_id'] ?? '';
$vehicle_model    = trim($data['vehicle_model'] ?? '');
$vehicle_number   = trim($data['vehicle_number'] ?? '');
$seating_capacity = $data['seating_capacity'] ?? '';
$rent_per_day     = $data['rent_per_day'] ?? '';

if (!$agency_id || !$vehicle_model || !$vehicle_number || !$seating_capacity || !$rent_per_day) {
    echo json_encode(["error" => "All fields required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO cars (agency_id, vehicle_model, vehicle_number, seating_capacity, rent_per_day) VALUES (?,?,?,?,?)");
    $stmt->execute([$agency_id, $vehicle_model, $vehicle_number, $seating_capacity, $rent_per_day]);
    echo json_encode(["success" => "Car added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Vehicle number already exists"]);
}