<?php
include 'db_connection.php';

if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    // Fetch user details from the database
    $sql = "SELECT full_name, email FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fullName = $_POST['full_name'];
        $email = $_POST['email'];

        // Update user details in the database
        $updateSql = "UPDATE users SET full_name = ?, email = ? WHERE id = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ssi", $fullName, $email, $userId);
        $updateStmt->execute();

        header("Location: users.php");
        exit();
    }
} else {
    // If user ID is not passed, redirect back to users page
    header("Location: users.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Edit User</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      color: #333;
    }

    header {
      background-color: #2c3e50;
      padding: 20px;
      color: white;
      text-align: center;
    }

    header h1 {
      margin: 0 0 10px 0;
    }

    nav ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 0;
    }

    nav ul li a {
      color: white;
      text-decoration: none;
      font-weight: 600;
    }

    nav ul li a:hover {
      text-decoration: underline;
    }

    main {
      max-width: 500px;
      margin: 40px auto;
      padding: 30px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    main h2 {
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 700;
      color: #2c3e50;
      text-align: center;
    }

    form label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
    }

    form input[type="text"],
    form input[type="email"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      box-sizing: border-box;
      transition: border-color 0.2s ease;
    }

    form input[type="text"]:focus,
    form input[type="email"]:focus {
      border-color: #3498db;
      outline: none;
    }

    button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s ease;
      font-weight: 600;
    }

    button:hover {
      background-color: #2980b9;
    }

    footer {
      text-align: center;
      padding: 15px 0;
      color: #888;
      font-size: 14px;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Edit User</h1>
    <nav>
      <ul>
        <li><a href="admin.php">Dashboard</a></li>
        <li><a href="admin_messages.php">Messages</a></li>
        <li><a href="users.php">Users</a></li>
        <li><a href="logout.html">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="user-form-container">
      <h2>Edit User Details</h2>
      <form method="POST">
        <label for="full_name">Full Name</label>
        <input type="text" name="full_name" id="full_name" value="<?= htmlspecialchars($user['full_name']) ?>" required />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="<?= htmlspecialchars($user['email']) ?>" required />

        <button type="submit">Update User</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 Kandy Traffic Management System</p>
  </footer>
</body>
</html>

<?php $conn->close(); ?>
