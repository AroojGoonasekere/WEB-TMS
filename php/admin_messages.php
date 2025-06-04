<?php 
include 'db_connection.php'; 

// Handle status update request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['report_id'], $_POST['action'])) {
    $reportId = intval($_POST['report_id']);
    $action = $_POST['action'] === 'accept' ? 'accepted' : 'rejected';

    $stmt = $conn->prepare("UPDATE incident_report SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $action, $reportId);
    $stmt->execute();
    $stmt->close();
}

// Fetch updated reports
$sql = "SELECT * FROM incident_report ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Incident Reports - Kandy Traffic System</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f9f9f9;
      color: #333;
    }

    header {
      background-color: #003366;
      color: white;
      padding: 20px;
      text-align: center;
    }

    nav ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    nav ul li a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }

    nav ul li a:hover {
      text-decoration: underline;
    }

    main {
      max-width: 1100px;
      margin: 30px auto;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    h2 {
      color: #003366;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #fff;
    }

    th, td {
      padding: 14px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #004080;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .status-pending {
      color: #856404;
      background-color: #fff3cd;
      padding: 6px 10px;
      border-radius: 6px;
      display: inline-block;
    }

    .status-accepted {
      color: #155724;
      background-color: #d4edda;
      padding: 6px 10px;
      border-radius: 6px;
      display: inline-block;
    }

    .status-rejected {
      color: #721c24;
      background-color: #f8d7da;
      padding: 6px 10px;
      border-radius: 6px;
      display: inline-block;
    }

    .action-btn {
      padding: 8px 14px;
      margin: 2px;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    .accept-btn {
      background-color: #28a745;
      color: white;
    }

    .accept-btn:hover {
      background-color: #218838;
    }

    .decline-btn {
      background-color: #dc3545;
      color: white;
    }

    .decline-btn:hover {
      background-color: #c82333;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #003366;
      color: white;
      margin-top: 40px;
    }

    form {
      display: inline;
    }
  </style>
</head>
<body>
  <header>
    <h1>Incident Reports</h1>
    <nav>
      <ul>
        <li><a href="admin.php">Admin Dashboard</a></li>
        <li><a href="dashboard.html">User Dashboard</a></li>
        <li><a href="logout.html">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="message-container">
      <h2>All Incident Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Incident Location</th>
            <th>Incident Type</th>
            <th>Description</th>
            <th>Current Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          <?php if ($result && $result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): ?>
              <tr>
                <td><?= $row['id'] ?></td>
                <td><?= htmlspecialchars($row['location']) ?></td>
                <td><?= htmlspecialchars($row['type']) ?></td>
                <td><?= nl2br(htmlspecialchars($row['description'])) ?></td>
                <td>
                  <?php
                    $status = strtolower($row['status']);
                    if ($status === 'accepted') {
                      echo '<span class="status-accepted">Accepted</span>';
                    } elseif ($status === 'rejected') {
                      echo '<span class="status-rejected">Rejected</span>';
                    } else {
                      echo '<span class="status-pending">Pending</span>';
                    }
                  ?>
                </td>
                <td>
                  <form method="POST">
                    <input type="hidden" name="report_id" value="<?= $row['id'] ?>">
                    <button type="submit" name="action" value="accept" class="action-btn accept-btn">Accept</button>
                    <button type="submit" name="action" value="reject" class="action-btn decline-btn">Decline</button>
                  </form>
                </td>
              </tr>
            <?php endwhile; ?>
          <?php else: ?>
            <tr><td colspan="6">No incident reports found.</td></tr>
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
