<?php
// Database config
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'traffic_system_db';

$incidentStatus = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Connect to DB
    $conn = new mysqli($host, $username, $password, $database);
    if ($conn->connect_error) {
        $incidentStatus = "Database connection failed: " . $conn->connect_error;
    } else {
        // Sanitize inputs
        $location = $conn->real_escape_string(trim($_POST['location'] ?? ''));
        $type = $conn->real_escape_string(trim($_POST['type'] ?? ''));
        $description = $conn->real_escape_string(trim($_POST['description'] ?? ''));
        $status = 'pending'; // default status

        if ($location && $type && $description) {
            $sql = "INSERT INTO incident_report (location, type, description, status) 
                    VALUES ('$location', '$type', '$description', '$status')";
            if ($conn->query($sql) === TRUE) {
                $incidentStatus = "Incident reported successfully.";
            } else {
                $incidentStatus = "Failed to report incident: " . $conn->error;
            }
        } else {
            $incidentStatus = "Please fill in all required fields.";
        }

        $conn->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Enhanced Analytics - Kandy Traffic Management</title>
  <link rel="stylesheet" href="assets/css/analytics.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="analytics-container">
    <header>
      <h1>Traffic Analytics Dashboard</h1>
      <button onclick="simulateTrafficData()">Refresh</button>
    </header>

    <section class="filters">
      <label for="timeRange">Select Time Range:</label>
      <select id="timeRange" onchange="updateChart()">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="hourly">Hourly</option>
      </select>
    </section>

    <section class="cards">
      <div class="card"><h3>Live Vehicle Count</h3><p id="vehicleCount">Loading...</p></div>
      <div class="card"><h3>Congestion Level</h3><p id="congestionLevel">Loading...</p></div>
      <div class="card"><h3>Prediction Accuracy</h3><p id="accuracyScore">Loading...</p></div>
      <div class="card"><h3>System Status</h3>
        <ul id="systemStatus">
          <li>Map API: OK</li>
          <li>Sensor Feed: OK</li>
          <li>DB: Connected</li>
        </ul>
      </div>
    </section>

    <section class="charts">
      <canvas id="trafficTrendChart"></canvas>
      <canvas id="incidentPieChart"></canvas>
    </section>

    <section class="congested-areas">
      <h3>Top Congested Areas</h3>
      <ul id="topCongested">
        <li>Kandy City Center</li>
        <li>Peradeniya Junction</li>
        <li>Katugastota Bridge</li>
      </ul>
    </section>

    <section class="map-section">
      <h3>Live Traffic Heatmap</h3>
      <div id="map" style="height: 400px;"></div>
    </section>

    <section class="incident-report">
      <h3>Report an Incident</h3>
      <form id="incidentForm" method="POST" action="">
        <input type="text" id="location" name="location" placeholder="Location" required />
        <input type="text" id="type" name="type" placeholder="Type (e.g., accident, jam)" required />
        <textarea id="description" name="description" placeholder="Description" required></textarea>
        <button type="submit">Submit Incident</button>
      </form>

      <div id="incidentStatus" style="margin-top:10px; color: red;">
        <?php echo htmlspecialchars($incidentStatus); ?>
      </div>
    </section>
  </div>

  <script src="assets/js/analytics.js"></script>

  <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCBuEwhTMXB7tOyezqIJa7JU-vRctvKCM&libraries=visualization&callback=initMap">
  </script>
</body>
</html>
