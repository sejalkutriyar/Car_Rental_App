<?php
require_once '../config/db.php';
$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role     = $data['role'] ?? '';

if (!$name || !$email || !$password || !in_array($role, ['customer', 'agency'])) {
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

$hashed = password_hash($password, PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashed, $role]);
    echo json_encode(["success" => "Registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Email already exists"]);
}