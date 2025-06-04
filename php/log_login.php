<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];

    $stmt = $conn->prepare("INSERT INTO logins (user_id) VALUES (?)");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    echo "Login recorded successfully.";
} else {
    echo "Invalid request method.";
}
?>
