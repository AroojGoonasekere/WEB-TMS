document.addEventListener('DOMContentLoaded', function() {
   
    const incidentTypes = document.querySelectorAll('.incident-type');
    incidentTypes.forEach(type => {
      type.addEventListener('click', function() {
        incidentTypes.forEach(t => t.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  
    
    const severityLevels = document.querySelectorAll('.severity');
    severityLevels.forEach(level => {
      level.addEventListener('click', function() {
        severityLevels.forEach(l => l.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  
  
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.querySelector('.upload-box input[type="file"]');
    
    uploadBox.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        uploadBox.innerHTML = '';
        
       
        if (this.files.length <= 3) {
          Array.from(this.files).forEach(file => {
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '80px';
                img.style.maxHeight = '80px';
                img.style.margin = '5px';
                img.style.borderRadius = '4px';
                uploadBox.appendChild(img);
              };
              reader.readAsDataURL(file);
            } else {
              const fileName = document.createElement('div');
              fileName.textContent = file.name;
              fileName.style.fontSize = '12px';
              fileName.style.margin = '5px';
              uploadBox.appendChild(fileName);
            }
          });
        } else {
          const count = document.createElement('div');
          count.textContent = `${this.files.length} files selected`;
          count.style.fontWeight = '500';
          uploadBox.appendChild(count);
        }
      }
    });
  
  
    const form = document.querySelector('.incident-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      
      const incidentType = document.querySelector('.incident-type.selected').dataset.type;
      const location = document.getElementById('location').value;
      const severity = document.querySelector('.severity.selected')?.dataset.level || 'not selected';
      const description = document.getElementById('description').value;
      const files = fileInput.files;
      
      
      if (!location || !description) {
        alert('Please fill in all required fields (Location and Description)');
        return;
      }
      
      
      const formData = new FormData();
      formData.append('incidentType', incidentType);
      formData.append('location', location);
      formData.append('severity', severity);
      formData.append('description', description);
      
      if (files.length > 0) {
        Array.from(files).forEach(file => {
          formData.append('photos', file);
        });
      }
      
      
      console.log('Submitting incident report:', {
        incidentType,
        location,
        severity,
        description,
        files: files.length
      });
      
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      setTimeout(() => {
        alert('Incident report submitted successfully!');
        form.reset();
        uploadBox.innerHTML = '<i class="fas fa-camera"></i><span>Click to upload</span>';
        incidentTypes[0].classList.add('selected');
        incidentTypes[1].classList.remove('selected');
        incidentTypes[2].classList.remove('selected');
        severityLevels.forEach(l => l.classList.remove('selected'));
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Report';
      }, 1500);
    });
  });