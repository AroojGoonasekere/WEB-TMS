<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];
    $activity = $_POST['activity'];

    $stmt = $conn->prepare("INSERT INTO user_activity (user_id, activity) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $activity);
    $stmt->execute();

    echo "Activity logged successfully.";
} else {
    echo "Invalid request method.";
}
?>
