<?php
// home.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home | Kandy Traffic Management</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/home.css">
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <img src="assets/img/Logof.jpg" alt="Kandy Traffic Logo">
        <span>Kandy TrafficMS</span>
      </div>
      <ul class="nav-links">
        <li><a href="home.php" class="active"><i class="fas fa-home"></i> Home</a></li>
        <li><a href="map.html"><i class="fas fa-map-marked-alt"></i> Live Map</a></li>
        <li><a href="routes.html"><i class="fas fa-route"></i> Routes</a></li>
        <li><a href="analytics.php"><i class="fas fa-chart-line"></i> Analytics</a></li>
        <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
        <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
      </ul>
      <div class="user-actions">
        <div class="user-dropdown">
          <button class="user-btn">
            <i class="fas fa-user-circle"></i>
            <span id="usernameDisplay">Guest</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="views/login.html" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login/Signup</a>
            <a href="views/profile.html"><i class="fas fa-user"></i> Profile</a>
            <a href="views/settings.html"><i class="fas fa-cog"></i> Settings</a>
            <a href="admin.html"><i class="fas fa-cog"></i> Admin</a>
            <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Floating Accepted Incidents Box -->
  <div style="position: fixed; right: 20px; bottom: 80px; width: 300px; max-height: 400px; background-color: #fff; border: 1px solid #ccc; box-shadow: 0 8px 16px rgba(0,0,0,0.2); z-index: 1000; border-radius: 10px; overflow: hidden; font-family: 'Poppins', sans-serif;">
    <div style="background-color: #d62828; color: white; padding: 10px; font-size: 16px; font-weight: 600; text-align: center; border-bottom: 1px solid #ccc;">
      <h3 style="margin: 0;">Accepted Incidents</h3>
    </div>
    <div id="incident-container" style="padding: 10px; overflow-y: auto; max-height: 340px; font-size: 14px; color: #333;">
      <?php
        include 'php/db_connection.php';
        $sql = "SELECT location, type, description FROM incident_report WHERE status = 'accepted'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            echo '<div style="margin-bottom: 10px;">';
            echo '<strong style="display: block; color: #d62828;">' . htmlspecialchars($row['location']) . ' - ' . htmlspecialchars($row['type']) . '</strong>';
            echo '<span>' . nl2br(htmlspecialchars($row['description'])) . '</span>';
            echo '</div><hr style="border: 0; height: 1px; background-color: #eee; margin: 8px 0;">';
          }
        } else {
          echo '<p>No incidents found.</p>';
        }
        $conn->close();
      ?>
    </div>
  </div>

  <!-- Hero Section -->
  <header class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h1>Smart Traffic Management for Kandy City</h1>
        <p>Real-time monitoring and intelligent routing to reduce congestion in Sri Lanka's cultural capital</p>
        <div class="cta-buttons">
          <a href="map.html" class="btn primary-btn"><i class="fas fa-map-marked-alt"></i> View Live Map</a>
          <a href="routes.html" class="btn secondary-btn"><i class="fas fa-route"></i> Plan Route</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Features Section -->
  <section class="features-section">
    <div class="container">
      <h2>Key Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-traffic-light"></i></div>
          <h3>Real-Time Monitoring</h3>
          <p>Live updates from 50+ traffic cameras across Kandy</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-brain"></i></div>
          <h3>AI Predictions</h3>
          <p>Accurate traffic forecasts using machine learning</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-route"></i></div>
          <h3>Smart Routing</h3>
          <p>Optimized paths based on current conditions</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-bell"></i></div>
          <h3>Alerts</h3>
          <p>Instant notifications about incidents and delays</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="stats-section">
    <div class="container">
      <h2>Kandy Traffic At a Glance</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" data-count="1250">0</div>
          <div class="stat-label">Vehicles/hour peak</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" data-count="45">0</div>
          <div class="stat-label">Reduction in congestion</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" data-count="98">0</div>
          <div class="stat-label">Signal uptime</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" data-count="30">0</div>
          <div class="stat-label">Monitored intersections</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-section">
    <div class="container">
      <h2>What People Say</h2>
      <div class="testimonials-slider">
        <div class="testimonial active">
          <p>"This system has saved me 30 minutes on my daily commute to the Temple of the Tooth."</p>
          <div class="author"><img src="assets/img/Man-3.png" alt="Mr. Dasun"><span>Mr. Dasun</span></div>
        </div>
        <div class="testimonial">
          <p>"The traffic predictions are incredibly accurate. I plan my whole day around them now."</p>
          <div class="author"><img src="assets/img/Man-1.png" alt="Mr. Aravindh"><span>Mr. Aravindh</span></div>
        </div>
        <div class="slider-controls">
          <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="assets/img/BGIM-5.jpg" alt="Kandy Traffic Logo">
          <span>Kandy Traffic Management System</span>
        </div>
        <div class="footer-links">
          <div class="links-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="home.php">Home</a></li>
              <li><a href="map.html">Live Map</a></li>
              <li><a href="routes.html">Route Planner</a></li>
            </ul>
          </div>
          <div class="links-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="links-column">
            <h4>Connect</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Kandy Traffic Management System. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/home.js"></script>
</body>
</html>
