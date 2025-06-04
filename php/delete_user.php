<?php
include 'db_connection.php';

if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    // Delete user from the database
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    // Redirect back to users list
    header("Location: users.php");
    exit();
} else {
    // If no ID is passed, redirect back to users page
    header("Location: users.php");
    exit();
}
?>

<?php $conn->close(); ?>
