document.addEventListener("DOMContentLoaded", () => {
  // Simulate data
  document.getElementById("total-users").textContent = "1024";
  document.getElementById("active-alerts").textContent = "5";
  document.getElementById("reported-incidents").textContent = "12";

  // Chart (optional with Chart.js)
  const ctx = document.getElementById('trafficChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Traffic Flow',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
