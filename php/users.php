<?php include 'db_connection.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Users</title>
  <link rel="stylesheet" href="users.css" />
  <script>
    function confirmDelete(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        window.location.href = "delete_user.php?id=" + userId;
      }
    }
  </script>
</head>
<body>
  <header>
    <h1>User Management</h1>
    <nav>
      <ul>
        <li><a href="admin.php">Dashboard</a></li>
        <li><a href="admin_messages.php">Messages</a></li>
        <li><a href="logout.html">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="user-table-container">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $sql = "SELECT id, full_name, email, role, status FROM users ORDER BY id DESC";
          $result = $conn->query($sql);

          if ($result && $result->num_rows > 0):
              while($row = $result->fetch_assoc()):
          ?>
            <tr>
              <td><?= $row['id'] ?></td>
              <td><?= htmlspecialchars($row['full_name']) ?></td>
              <td><?= htmlspecialchars($row['email']) ?></td>
              <td><?= htmlspecialchars($row['role']) ?></td>
              <td><?= htmlspecialchars($row['status']) ?></td>
              <td>
  <a href="edit_user.php?id=<?= $row['id'] ?>" class="btn edit-btn">Edit</a>
  <button onclick="confirmDelete(<?= $row['id'] ?>)" class="btn delete-btn">Delete</button>
</td>

            </tr>
          <?php
              endwhile;
          else:
          ?>
            <tr><td colspan="6">No users found.</td></tr>
          <?php endif; ?>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 Kandy Traffic Management System</p>
  </footer>
</body>
</html>

<?php $conn->close(); ?>
