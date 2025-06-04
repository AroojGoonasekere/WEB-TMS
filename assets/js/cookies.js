document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    
    const sections = document.querySelectorAll('.cookies-section');
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
      
      
      if (prefs.analytics) {
        console.log('Analytics cookies enabled');
       
      } else {
        console.log('Analytics cookies disabled');
        
      }
      
      alert('Cookie preferences saved successfully!');
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