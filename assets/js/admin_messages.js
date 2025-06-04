document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hi, I have a concern about traffic signals.",
      submittedAt: "2025-05-23 10:32 AM"
    },
    {
      id: 2,
      name: "John Smith",
      email: "johnsmith@example.com",
      message: "Please add more signs on the highway.",
      submittedAt: "2025-05-24 8:00 AM"
    }
  ];

  const tableBody = document.querySelector("#messageTable tbody");
  tableBody.innerHTML = "";

  messages.forEach(msg => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${msg.id}</td>
      <td>${msg.name}</td>
      <td>${msg.email}</td>
      <td>${msg.message}</td>
      <td>${msg.submittedAt}</td>
    `;
    tableBody.appendChild(row);
  });

  // Profile dropdown toggle
  const toggle = document.getElementById("profileToggle");
  const menu = document.getElementById("profileMenu");

  toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = "none";
    }
  });
});
