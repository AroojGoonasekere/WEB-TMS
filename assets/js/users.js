document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(users => {
      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = '';
      users.forEach(user => {
        const row = `
          <tr>
            <td>${user.id}</td>
            <td>${user.full_name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
              <button class="activate-btn">${user.status === 'Inactive' ? 'Activate' : 'Deactivate'}</button>
              <button class="delete-btn">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    });
});
