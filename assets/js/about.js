document.addEventListener('DOMContentLoaded', function() {
 
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
    
  
    const userBtn = document.querySelector('.user-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    userBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
    
   
    document.addEventListener('click', function() {
      dropdownContent.style.display = 'none';
    });
    
   
    function animateStats() {
      const statValues = document.querySelectorAll('.stat-value');
      const speed = 200;
      
      statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const count = parseInt(stat.textContent);
        const increment = target / speed;
        
        if (count < target) {
          stat.textContent = Math.ceil(count + increment);
          setTimeout(animateStats, 1);
        } else {
          stat.textContent = target;
        }
      });
    }
    
    
    const missionSection = document.querySelector('.mission-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(missionSection);
    
   
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      submitBtn.classList.add('loading');
      
    
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      }, 1500);
    });
    
   
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    
    
    const isLoggedIn = false; 
    if (isLoggedIn) {
      usernameDisplay.textContent = 'JohnDoe';
      loginBtn.style.display = 'none';
    } else {
      logoutBtn.style.display = 'none';
    }
    
   
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'login.html';
    });
    
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      usernameDisplay.textContent = 'Guest';
      this.style.display = 'none';
      loginBtn.style.display = 'block';
      
    });
  });