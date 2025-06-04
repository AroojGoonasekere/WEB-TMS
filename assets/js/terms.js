document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
 
    const sections = document.querySelectorAll('.terms-section');
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