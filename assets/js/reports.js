document.addEventListener('DOMContentLoaded', function() {
    // Initialize the date range display
    updateDateRangeDisplay();
    
    // Initialize charts
    initFeaturedChart();
    
    // Report generation panel toggle
    const generateBtn = document.querySelector('.generate-report');
    const reportPanel = document.querySelector('.report-generation-panel');
    const closePanelBtn = document.querySelector('.close-panel');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    generateBtn.addEventListener('click', function() {
        reportPanel.classList.add('active');
    });
    
    closePanelBtn.addEventListener('click', function() {
        reportPanel.classList.remove('active');
    });
    
    cancelBtn.addEventListener('click', function() {
        reportPanel.classList.remove('active');
    });
    
    // Date range picker functionality
    const dateRangePicker = document.querySelector('.date-range-picker');
    const dateRangeDisplay = document.getElementById('date-range-display');
    
    dateRangePicker.addEventListener('click', function() {
        // In a real app, this would open a date range picker component
        alert('Date range picker would open here in a full implementation');
    });
    
    // View report buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const reportModal = document.querySelector('.report-viewer-modal');
    const closeModalBtn = document.querySelector('.modal-btn.close-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reportCard = this.closest('.report-card');
            const reportTitle = reportCard.querySelector('.report-header h3').textContent;
            
            document.getElementById('modal-report-title').textContent = reportTitle;
            
            // In a real app, this would load the actual report content
            document.getElementById('modal-report-content').innerHTML = `
                <div class="report-content">
                    <div class="report-section">
                        <h4>Executive Summary</h4>
                        <p>This is a placeholder for the full report content. In a real application, this would display the complete generated report with all charts, tables, and analysis.</p>
                    </div>
                    <div class="report-section">
                        <h4>Key Findings</h4>
                        <ul>
                            <li>Traffic volume increased by 8.2% compared to previous month</li>
                            <li>Peak congestion times shifted to earlier in the morning</li>
                            <li>Incident response times improved by 12%</li>
                        </ul>
                    </div>
                    <div class="report-section">
                        <h4>Traffic Volume</h4>
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="modal-traffic-chart"></canvas>
                        </div>
                    </div>
                    <div class="report-section">
                        <h4>Recommendations</h4>
                        <p>Based on the analysis, we recommend adjusting signal timing at Temple Road during peak hours and increasing patrols during high-incident periods.</p>
                    </div>
                </div>
            `;
            
            // Initialize chart in modal
            initModalChart();
            
            reportModal.classList.add('active');
        });
    });
    
    closeModalBtn.addEventListener('click', function() {
        reportModal.classList.remove('active');
    });
    
    // Download report buttons
    const downloadButtons = document.querySelectorAll('.download-btn:not(.modal-btn)');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const reportCard = this.closest('.report-card');
            const reportTitle = reportCard.querySelector('.report-header h3').textContent;
            
            // In a real app, this would generate and download the report
            alert(`Downloading report: ${reportTitle}`);
        });
    });
    
    // Share report buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const reportCard = this.closest('.report-card');
            const reportTitle = reportCard.querySelector('.report-header h3').textContent;
            
            // In a real app, this would open a share dialog
            alert(`Sharing report: ${reportTitle}`);
        });
    });
    
    // Print report button in modal
    const printBtn = document.querySelector('.print-btn');
    
    printBtn.addEventListener('click', function() {
        // In a real app, this would print the report
        alert('Printing report...');
    });
    
    // Modal download button
    const modalDownloadBtn = document.querySelector('.modal-btn.download-btn');
    
    modalDownloadBtn.addEventListener('click', function() {
        // In a real app, this would download the current report
        alert('Downloading current report view...');
    });
    
    // Generate report button in panel
    const generateReportBtn = document.querySelector('.generate-btn');
    
    generateReportBtn.addEventListener('click', function() {
        const reportTitle = document.getElementById('report-title').value;
        const reportType = document.getElementById('report-type-select').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const format = document.getElementById('report-format').value;
        
        if (!reportTitle) {
            alert('Please enter a report title');
            return;
        }
        
        if (!startDate || !endDate) {
            alert('Please select a date range');
            return;
        }
        
        // In a real app, this would generate the report
        alert(`Generating ${reportType} report titled "${reportTitle}" for ${startDate} to ${endDate} in ${format.toUpperCase()} format`);
        
        // Close the panel
        reportPanel.classList.remove('active');
    });
    
    // Update last updated time
    setInterval(updateLastUpdatedTime, 60000);
    updateLastUpdatedTime();
    
    // Functions
    function updateDateRangeDisplay() {
        // In a real app, this would update based on the selected date range
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        dateRangeDisplay.textContent = `${formatDate(thirtyDaysAgo)} - ${formatDate(today)}`;
    }
    
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    function updateLastUpdatedTime() {
        document.getElementById('update-time').textContent = moment().fromNow();
    }
    
    function initFeaturedChart() {
        const ctx = document.getElementById('featuredChart').getContext('2d');
        
        if (typeof Chart === 'undefined') return;
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Traffic Volume',
                        data: [2800, 3200, 2950, 3500],
                        borderColor: '#4a6bff',
                        backgroundColor: 'rgba(74, 107, 255, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Incidents',
                        data: [45, 52, 60, 83],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
    
    function initModalChart() {
        const ctx = document.getElementById('modal-traffic-chart')?.getContext('2d');
        
        if (!ctx || typeof Chart === 'undefined') return;
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Morning Peak (7-9 AM)',
                        data: [1200, 1350, 1850, 1250, 1300, 950, 750],
                        backgroundColor: 'rgba(74, 107, 255, 0.7)'
                    },
                    {
                        label: 'Evening Peak (5-7 PM)',
                        data: [1450, 1500, 1950, 1400, 1550, 1200, 900],
                        backgroundColor: 'rgba(255, 193, 7, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Weekly Traffic Volume by Peak Periods'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Vehicles per hour'
                        }
                    }
                }
            }
        });
    }
});