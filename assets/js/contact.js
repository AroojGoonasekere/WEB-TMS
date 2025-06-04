document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from reloading page

  const form = this;
  const formData = new FormData(form);

  fetch("submit_contact.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Show success message
      const successMsg = document.createElement("p");
      successMsg.className = "form-response";
      successMsg.textContent = data;
      form.after(successMsg);

      // Reset the form
      form.reset();
    })
    .catch((error) => {
      const errorMsg = document.createElement("p");
      errorMsg.className = "form-response";
      errorMsg.textContent = "An error occurred. Please try again.";
      form.after(errorMsg);
      console.error("Error:", error);
    });
});
