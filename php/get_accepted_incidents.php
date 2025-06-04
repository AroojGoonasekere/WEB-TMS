<?php
// Connect to your database
include 'db_connection.php';

// Query the incidents
$sql = "SELECT location, type, description FROM incident_report WHERE status = 'accepted'";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
  <title>Incident Reports</title>
  <style>
    .incident-card {
      border: 1px solid #ccc;
      padding: 15px;
      margin: 10px;
      border-radius: 6px;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>

  <h1>Accepted Incident Reports</h1>

  <?php if ($result && $result->num_rows > 0): ?>
    <?php while ($incident = $result->fetch_assoc()): ?>
      <div class="incident-card">
        <h3><?php echo htmlspecialchars($incident['type']); ?> at <?php echo htmlspecialchars($incident['location']); ?></h3>
        <p><?php echo nl2br(htmlspecialchars($incident['description'])); ?></p>
      </div>
    <?php endwhile; ?>
  <?php else: ?>
    <p>No accepted incidents found.</p>
  <?php endif; ?>

  <?php $conn->close(); ?>

</body>
</html>
