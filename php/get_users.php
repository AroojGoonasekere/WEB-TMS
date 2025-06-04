<?php
require 'db.php';

$sql = "
    SELECT u.id, u.name, u.email,
        (SELECT login_time FROM logins WHERE user_id = u.id ORDER BY login_time DESC LIMIT 1) AS last_login,
        (SELECT activity FROM user_activity WHERE user_id = u.id ORDER BY activity_time DESC LIMIT 1) AS recent_activity
    FROM users u
    ORDER BY u.id DESC
";

$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

header('Content-Type: application/json');
echo json_encode($users);
?>
