// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".sidebar ul li");
  const contentSections = document.querySelectorAll(".content-section");

  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      document.querySelector(".sidebar ul li.active")?.classList.remove("active");
      item.classList.add("active");

      contentSections.forEach(section => section.classList.remove("active"));
      contentSections[index].classList.add("active");
    });
  });
});
