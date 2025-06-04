<?php
require 'db.php';

$user_id = $_GET['user_id'];
$sql = "SELECT * FROM routes WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$routes = [];

while ($row = $result->fetch_assoc()) {
    $routes[] = $row;
}

echo json_encode($routes);
?>
