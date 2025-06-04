// login.js

document.addEventListener("DOMContentLoaded", function () {
  const toggleLinks = document.querySelectorAll(".toggle-form");
  const formBoxes = document.querySelectorAll(".form-box");
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");
  const successMessage = document.getElementById("successMessage");
  const goToLoginBtn = document.getElementById("goToLogin");

  // Toggle between forms
  toggleLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.id === "showSignup" ? "signupForm"
        : this.id === "showLogin" || this.id === "showLoginFromForgot" ? "loginForm"
        : this.id === "showForgotPassword" ? "forgotPasswordForm"
        : "resetPasswordForm";

      formBoxes.forEach(box => box.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Show/hide password toggle
  togglePasswordIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const input = icon.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      }
    });
  });

  // Reset password form validation
  const resetForm = document.getElementById("resetPasswordFormElement");
  if (resetForm) {
    resetForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const errorMsg = document.querySelector(".error-message");

      if (newPassword !== confirmPassword) {
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
        document.getElementById("resetPasswordForm").style.display = "none";
        successMessage.style.display = "block";
      }
    });
  }

  if (goToLoginBtn) {
    goToLoginBtn.addEventListener("click", () => {
      successMessage.style.display = "none";
      document.getElementById("loginForm").classList.add("active");
    });
  }
});

const loginForm = document.getElementById("loginFormElement");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://localhost/Web-TMS/login.php", {  // <- adjust this to your actual path
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      console.log("Server response:", result);  // Log what the backend says

      if (result.trim() === "success") {
        window.location.href = "dashboard.html";
      } else {
        alert(result);
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    });
  });
}

document.getElementById("loginFormElement").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch("login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  })
    .then((res) => res.text())
    .then((data) => {
      console.log("Server response:", data);

      if (data.includes("success")) {
        // Redirect to home.html
        window.location.href = "home.php";
      } else {
        alert("Login failed: " + data);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});


