// Load Contact Messages
fetch("get_contact_messages.php")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("contactTable");
    table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>";
    data.forEach(row => {
      table.innerHTML += `<tr><td>${row.name}</td><td>${row.email}</td><td>${row.message}</td><td>${row.submitted_at}</td></tr>`;
    });
  });

// Load Incident Reports
fetch("get_incident_reports.php")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("incidentTable");
    table.innerHTML = "<tr><th>Reporter</th><th>Incident</th><th>Location</th><th>Date</th></tr>";
    data.forEach(row => {
      table.innerHTML += `<tr><td>${row.reporter || 'Anonymous'}</td><td>${row.details}</td><td>${row.location}</td><td>${row.reported_at}</td></tr>`;
    });
  });
