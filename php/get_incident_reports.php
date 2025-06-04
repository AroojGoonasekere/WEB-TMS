<?php
include 'db_connection.php';

$sql = "SELECT i.*, u.name as reporter 
        FROM incidents i 
        LEFT JOIN users u ON i.user_id = u.id 
        ORDER BY i.reported_at DESC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
