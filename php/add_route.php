<?php
require 'db.php';

$user_id = $_POST['user_id'];
$source = $_POST['source'];
$destination = $_POST['destination'];
$distance = $_POST['distance'];
$duration = $_POST['duration'];
$traffic_level = $_POST['traffic_level'];
$predicted_traffic_level = $_POST['predicted_traffic_level'];

$sql = "INSERT INTO routes (user_id, source, destination, distance, duration, traffic_level, predicted_traffic_level)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issssss", $user_id, $source, $destination, $distance, $duration, $traffic_level, $predicted_traffic_level);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}
?>
