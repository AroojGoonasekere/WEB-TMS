<?php
include 'db_connection.php';

// Get POST data safely
$full_name = $conn->real_escape_string($_POST['full_name'] ?? '');
$email = $conn->real_escape_string($_POST['email'] ?? '');
$password = $conn->real_escape_string($_POST['password'] ?? '');

// Simple validation
if (empty($full_name) || empty($email) || empty($password)) {
    echo "All fields are required.";
    exit;
}

// Check if email already exists
$sql_check = "SELECT email FROM users WHERE email = '$email' LIMIT 1";
$result = $conn->query($sql_check);
if ($result->num_rows > 0) {
    echo "Email already registered.";
    exit;
}

// Insert user data
$sql = "INSERT INTO users (full_name, email, role, status, action, password) VALUES (
    '$full_name',
    '$email',
    'user',
    'online',
    'Tatakae',
    '$password'
)";

if ($conn->query($sql) === TRUE) {
    // Redirect to login.html after successful signup
    header("Location: login.html");
    exit();
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
