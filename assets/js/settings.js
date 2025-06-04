const form = document.getElementById('settings-form');
const message = document.getElementById('message');

// Load saved settings from localStorage if any
window.addEventListener('DOMContentLoaded', () => {
  const emailNotif = localStorage.getItem('emailNotifications') === 'true';
  const smsNotif = localStorage.getItem('smsNotifications') === 'true';
  const profileVisible = localStorage.getItem('profileVisible') === 'true';
  const showOnline = localStorage.getItem('showOnlineStatus') === 'true';
  const theme = localStorage.getItem('theme') || 'light';

  document.getElementById('email-notifications').checked = emailNotif;
  document.getElementById('sms-notifications').checked = smsNotif;
  document.getElementById('profile-visible').checked = profileVisible;
  document.getElementById('show-online-status').checked = showOnline;
  document.querySelector(`input[name="theme"][value="${theme}"]`).checked = true;

  applyTheme(theme);
});

// Apply theme function
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#1e1e1e';
    document.body.style.color = '#eee';
  } else {
    document.body.style.backgroundColor = '#eef2f7';
    document.body.style.color = '#222';
  }
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailNotifications = document.getElementById('email-notifications').checked;
  const smsNotifications = document.getElementById('sms-notifications').checked;
  const profileVisible = document.getElementById('profile-visible').checked;
  const showOnlineStatus = document.getElementById('show-online-status').checked;
  const theme = document.querySelector('input[name="theme"]:checked').value;

  // Save to localStorage
  localStorage.setItem('emailNotifications', emailNotifications);
  localStorage.setItem('smsNotifications', smsNotifications);
  localStorage.setItem('profileVisible', profileVisible);
  localStorage.setItem('showOnlineStatus', showOnlineStatus);
  localStorage.setItem('theme', theme);

  applyTheme(theme);

  message.textContent = 'Settings saved successfully!';

  setTimeout(() => {
    message.textContent = '';
  }, 3000);
});
const toggleBtn = document.getElementById('dark-mode-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  if(document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// On page load, apply saved preference
window.onload = () => {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
};
