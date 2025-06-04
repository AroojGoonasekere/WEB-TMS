document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    
    const sections = document.querySelectorAll('.policy-section');
    const tocList = document.getElementById('toc-list');
    
    sections.forEach(section => {
      const id = section.id;
      const title = section.querySelector('h2').textContent;
      
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = title;
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
    
    
    const analyticsCookies = document.getElementById('analytics-cookies');
    const saveCookieBtn = document.getElementById('save-cookie-btn');
    
    
    if (localStorage.getItem('cookiePrefs')) {
      const prefs = JSON.parse(localStorage.getItem('cookiePrefs'));
      analyticsCookies.checked = prefs.analytics;
    }
    
    
    saveCookieBtn.addEventListener('click', function() {
      const prefs = {
        analytics: analyticsCookies.checked
      };
      
      localStorage.setItem('cookiePrefs', JSON.stringify(prefs));
      alert('Cookie preferences saved successfully!');
    });
    
    
    const modal = document.getElementById('data-request-modal');
    const requestBtn = document.getElementById('data-request-btn');
    const closeModal = document.querySelector('.close-modal');
    const requestForm = document.getElementById('data-request-form');
    
    requestBtn.addEventListener('click', function() {
      modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
   
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requestType = document.getElementById('request-type').value;
      const userEmail = document.getElementById('user-email').value;
      const details = document.getElementById('request-details').value;
      
      console.log('Data request submitted:', {
        requestType,
        userEmail,
        details
      });
      
      alert('Your request has been submitted. We will respond within 30 days.');
      modal.style.display = 'none';
      requestForm.reset();
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  });