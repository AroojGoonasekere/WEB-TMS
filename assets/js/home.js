document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // User dropdown
  const userBtn = document.querySelector('.user-btn');
  const dropdownContent = document.querySelector('.dropdown-content');
  userBtn.addEventListener('click', e => {
    e.stopPropagation();
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
  });
  document.addEventListener('click', () => {
    dropdownContent.style.display = 'none';
  });

  // Stats animation
  function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    const speed = 200;
    statValues.forEach(stat => {
      let count = 0;
      const target = parseInt(stat.getAttribute('data-count'));
      const increment = target / speed;
      function update() {
        count += increment;
        if (count < target) {
          stat.textContent = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          stat.textContent = target;
        }
      }
      update();
    });
  }
  const statsSection = document.querySelector('.stats-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);

  // Testimonials slider
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonials[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
    showTestimonial(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    showTestimonial(currentIndex);
  });
  setInterval(() => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    showTestimonial(currentIndex);
  }, 5000);

  // Login/logout state
  const usernameDisplay = document.getElementById('usernameDisplay');
  const loginBtn = document.querySelector('.login-btn');
  const logoutBtn = document.querySelector('.logout-btn');
  const isLoggedIn = false;  // Replace with real auth check

  if (isLoggedIn) {
    usernameDisplay.textContent = 'JohnDoe';
    loginBtn.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
  }
  loginBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'login.html';
  });
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    usernameDisplay.textContent = 'Guest';
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
  });
});
