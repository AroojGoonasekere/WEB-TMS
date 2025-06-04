<?php
// Database configuration
$host = 'localhost';       // Hostname (usually localhost)
$username = 'root';        // MySQL username
$password = '';            // MySQL password
$database = 'traffic_system_db'; // Database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully to the database.";
?>

