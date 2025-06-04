function simulateTrafficData() {
  document.getElementById("vehicleCount").innerText = Math.floor(Math.random() * 1000);
  document.getElementById("congestionLevel").innerText = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
  document.getElementById("accuracyScore").innerText = `${Math.floor(Math.random() * 100)}%`;
  document.getElementById("topCongested").innerHTML = `<li>Main Street</li><li>Central Ave</li><li>Hill Road</li>`;
}

function updateChart() {
  // Update chart data based on time range
}

function initMap() {
  const center = { lat: 7.2906, lng: 80.6337 }; // Kandy
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center,
  });

  // Fake heatmap data
  const heatmapData = [
    new google.maps.LatLng(7.291, 80.634),
    new google.maps.LatLng(7.292, 80.635),
    new google.maps.LatLng(7.293, 80.636),
  ];

  new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map: map,
  });
}
// Dummy real-time simulation
function generateRandomData() {
  return {
    vehicleCount: Math.floor(Math.random() * 2000 + 500),
    congestionLevel: `${Math.floor(Math.random() * 100)}%`,
    predictionAccuracy: `${(Math.random() * 10 + 90).toFixed(2)}%`,
    topAreas: ["Peradeniya Rd", "Katugastota", "Colombo Street", "Ampitiya", "Wattegama"],
    chartData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
  };
}

function updateDashboard() {
  const data = generateRandomData();

  document.getElementById("vehicleCount").innerText = data.vehicleCount;
  document.getElementById("congestionLevel").innerText = data.congestionLevel;
  document.getElementById("predictionAccuracy").innerText = data.predictionAccuracy;

  const topAreasList = document.getElementById("topAreasList");
  topAreasList.innerHTML = "";
  data.topAreas.forEach(area => {
    const li = document.createElement("li");
    li.textContent = area;
    topAreasList.appendChild(li);
  });

  updateChart(data.chartData);
}

let congestionChart;

function updateChart(data) {
  const ctx = document.getElementById("congestionChart").getContext("2d");

  if (congestionChart) {
    congestionChart.data.datasets[0].data = data;
    congestionChart.update();
  } else {
    congestionChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Congestion %",
          data: data,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}

function refreshDashboard() {
  updateDashboard();
}

// Initial load
window.onload = updateDashboard;
// Chart.js Initialization
let trafficTrendChart, incidentPieChart;

window.onload = () => {
  const trendCtx = document.getElementById("trafficTrendChart").getContext("2d");
  const pieCtx = document.getElementById("incidentPieChart").getContext("2d");

  trafficTrendChart = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Vehicle Count",
        data: [120, 150, 180, 200, 250, 300, 270],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  incidentPieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Accidents", "Jams", "Breakdowns"],
      datasets: [{
        data: [40, 35, 25],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"]
      }]
    },
    options: {
      responsive: true
    }
  });

  simulateTrafficData();
};

function simulateTrafficData() {
  document.getElementById("vehicleCount").textContent = Math.floor(Math.random() * 500);
  document.getElementById("congestionLevel").textContent = "Moderate";
  document.getElementById("accuracyScore").textContent = "93%";
}

function updateChart() {
  const timeRange = document.getElementById("timeRange").value;
  let data;
  if (timeRange === "daily") {
    data = [100, 150, 130, 120, 170, 190, 160];
  } else if (timeRange === "weekly") {
    data = [1000, 1200, 1150, 1300, 1400, 1350, 1250];
  } else {
    data = [10, 20, 30, 40, 50, 60, 70];
  }
  trafficTrendChart.data.datasets[0].data = data;
  trafficTrendChart.update();
}

function exportToPDF() {
  alert("Export to PDF is not yet implemented.");
}

function exportToCSV() {
  alert("Export to CSV is not yet implemented.");
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 7.2906, lng: 80.6337 }
  });

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: [
      new google.maps.LatLng(7.2906, 80.6337),
      new google.maps.LatLng(7.2936, 80.6370),
      new google.maps.LatLng(7.2950, 80.6390)
    ],
    map: map
  });
}



