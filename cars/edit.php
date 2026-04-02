<?php
require_once '../config/db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id               = $data['id'] ?? '';
$agency_id        = $data['agency_id'] ?? '';
$vehicle_model    = trim($data['vehicle_model'] ?? '');
$vehicle_number   = trim($data['vehicle_number'] ?? '');
$seating_capacity = $data['seating_capacity'] ?? '';
$rent_per_day     = $data['rent_per_day'] ?? '';

if (!$id || !$agency_id || !$vehicle_model || !$vehicle_number || !$seating_capacity || !$rent_per_day) {
    echo json_encode(["error" => "All fields required (including agency_id)"]);
    exit();
}

$stmt = $pdo->prepare("UPDATE cars SET vehicle_model=?, vehicle_number=?, seating_capacity=?, rent_per_day=? WHERE id=? AND agency_id=?");
$stmt->execute([$vehicle_model, $vehicle_number, $seating_capacity, $rent_per_day, $id, $agency_id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => "Car updated successfully"]);
} else {
    echo json_encode(["error" => "Car not found or you don't have permission to edit it"]);
}