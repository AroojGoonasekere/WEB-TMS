const editBtn = document.getElementById('edit-btn');
const modal = document.getElementById('edit-modal');
const closeModalBtn = document.getElementById('close-modal');
const editForm = document.getElementById('edit-form');

const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileBio = document.getElementById('profile-bio');

const avatarImg = document.getElementById('avatar-img');
const avatarUpload = document.getElementById('avatar-upload');
const uploadBtn = document.getElementById('upload-btn');

// Open modal on edit button click
editBtn.addEventListener('click', () => {
  // Pre-fill form inputs with current data
  editForm.name.value = profileName.textContent;
  editForm.email.value = profileEmail.textContent;
  editForm.bio.value = profileBio.textContent;
  
  modal.style.display = 'flex';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if clicked outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Update profile data on page
  profileName.textContent = editForm.name.value;
  profileEmail.textContent = editForm.email.value;
  profileBio.textContent = editForm.bio.value;
  
  modal.style.display = 'none';
});

// Handle avatar change
uploadBtn.addEventListener('click', () => {
  avatarUpload.click();
});

avatarUpload.addEventListener('change', () => {
  const file = avatarUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      avatarImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
