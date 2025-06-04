fetch('get_users.php')
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      // Display user name, email, active status, etc.
    });
  });
