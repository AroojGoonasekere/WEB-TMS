<?php
include 'db_connection.php';

// Fetch messages from the contact_us table
$sql = "SELECT name, email, message, submitted_at FROM contact_us ORDER BY submitted_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin - Contact Messages</title>
  <link rel="stylesheet" href="admin.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>

<body>
  <header class="admin-header">
    <nav class="navbar">
      <div class="logo">Kandy Traffic - Admin</div>
      <ul class="nav-links">
        <li><a href="dashboard.html">Dashboard</a></li>
        <li class="active"><a href="admin_messages.php">Messages</a></li>
        <li><a href="users.php">Users</a></li>
        <li><a href="routes.html">Routes</a></li>
      </ul>
      <div class="profile-dropdown">
        <i class="fas fa-user-circle" id="profileToggle"></i>
        <div class="dropdown-content" id="profileMenu">
          <a href="#">My Account</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </nav>
  </header>

  <main class="admin-main">
    <h1>Contact Messages</h1>
    <div class="table-container">
      <table id="messageTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          <?php if ($result && $result->num_rows > 0): ?>
            <?php $count = 1; ?>
            <?php while($row = $result->fetch_assoc()): ?>
              <tr>
                <td><?= $count++ ?></td>
                <td><?= htmlspecialchars($row['name']) ?></td>
                <td><?= htmlspecialchars($row['email']) ?></td>
                <td><?= nl2br(htmlspecialchars($row['message'])) ?></td>
                <td><?= $row['submitted_at'] ?></td>
              </tr>
            <?php endwhile; ?>
          <?php else: ?>
            <tr><td colspan="5">No contact messages found.</td></tr>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </main>

  <footer class="footer">
    <p>&copy; 2025 Kandy Traffic Management System - Admin Panel</p>
  </footer>
</body>

</html>

<?php $conn->close(); ?>
