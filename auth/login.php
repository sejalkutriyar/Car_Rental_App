<?php
require_once '../config/db.php';
$data = json_decode(file_get_contents("php://input"), true);

$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(["error" => "All fields required"]);
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id"   => $user['id'],
            "name" => $user['name'],
            "role" => $user['role']
        ]
    ]);
} else {
    echo json_encode(["error" => "Invalid credentials"]);
}