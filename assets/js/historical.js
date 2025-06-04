document.addEventListener('DOMContentLoaded', function() {
    // Set default dates (last 7 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    
    document.querySelector('.start-date').valueAsDate = startDate;
    document.querySelector('.end-date').valueAsDate = endDate;
  
    // Initialize Chart
    const ctx = document.getElementById('trafficTrendChart').getContext('2d');
    const trafficTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: generateDateLabels(startDate, endDate),
        datasets: [
          {
            label: 'Temple Area',
            data: generateRandomData(7, 10, 20),
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Lake Circle',
            data: generateRandomData(7, 15, 30),
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Railway Station',
            data: generateRandomData(7, 20, 35),
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Traffic Speed Trend (km/h)',
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Average Speed (km/h)'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  
    // Apply Filters Button
    document.querySelector('.apply-btn').addEventListener('click', function() {
      const startDate = new Date(document.querySelector('.start-date').value);
      const endDate = new Date(document.querySelector('.end-date').value);
      const location = document.querySelector('.location-filter select').value;
      
      if (startDate > endDate) {
        alert('End date must be after start date');
        return;
      }
      
      // In a real app, you would fetch data from an API here
      updateChartData(trafficTrendChart, startDate, endDate, location);
      updateTableData(startDate, endDate, location);
    });
  
    // Export Buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const format = this.textContent.includes('CSV') ? 'CSV' : 'PDF';
        alert(`Exporting data as ${format}...`);
        // In a real app, this would trigger a download
      });
    });
  
    // Helper Functions
    function generateDateLabels(startDate, endDate) {
      const labels = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        labels.push(currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return labels;
    }
  
    function generateRandomData(count, min, max) {
      return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    }
  
    function updateChartData(chart, startDate, endDate, location) {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const labels = generateDateLabels(startDate, endDate);
      
      chart.data.labels = labels;
      
      if (location === 'All Locations') {
        chart.data.datasets[0].data = generateRandomData(days, 10, 20);
        chart.data.datasets[1].data = generateRandomData(days, 15, 30);
        chart.data.datasets[2].data = generateRandomData(days, 20, 35);
        chart.data.datasets.forEach(ds => ds.hidden = false);
      } else {
        
        chart.data.datasets.forEach(ds => ds.hidden = true);
        
        
        const locationIndex = ['Temple Area', 'Lake Circle', 'Railway Station'].indexOf(location);
        if (locationIndex >= 0) {
          chart.data.datasets[locationIndex].hidden = false;
          chart.data.datasets[locationIndex].data = generateRandomData(days, 10, 35);
        }
      }
      
      chart.update();
    }
  
    function updateTableData(startDate, endDate, location) {
     
      const tableBody = document.querySelector('.data-table tbody');
      
      
      const rowCount = location === 'All Locations' ? 6 : 2;
      tableBody.innerHTML = '';
      
      for (let i = 0; i < rowCount; i++) {
        const row = document.createElement('tr');
        
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        const locations = ['Temple Area', 'Lake Circle', 'Railway Station'];
        const loc = location === 'All Locations' 
          ? locations[i % locations.length] 
          : location;
        
        const speed = Math.floor(Math.random() * 25) + 10;
        const volume = Math.floor(Math.random() * 1000) + 500;
        const congestion = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
        
        row.innerHTML = `
          <td>${date.toISOString().split('T')[0]}</td>
          <td>${loc}</td>
          <td>${speed} km/h</td>
          <td>${volume.toLocaleString()}</td>
          <td class="${congestion.toLowerCase()}">${congestion}</td>
        `;
        
        tableBody.appendChild(row);
      }
    }
  });