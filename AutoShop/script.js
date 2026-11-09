// Site data
const siteName = "AutoShop";
const currentYear = new Date().getFullYear();
const services = ["Доставка", "Консультація", "Підбір запчастин"];

console.log("Сайт:", siteName);
console.log("Поточний рік:", currentYear);
console.log("Послуги:", services);

// DOM elements
const footerCopy = document.querySelector(".site-footer p");
const cards = document.querySelectorAll(".card");
const navLinks = document.querySelectorAll(".site-header nav a");
const themeToggle = document.querySelector("#theme-toggle");

console.log("Кількість карток:", cards.length);

// Keep the footer year current.
footerCopy.textContent = `© ${currentYear} ${siteName}. Навчальний проєкт.`;

// Mark the navigation link matching the current hash.
function updateActiveNavigation() {
  const activeHash = window.location.hash || "#home";

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === activeHash;
    link.classList.toggle("is-active", isActive);
  });
}

updateActiveNavigation();
window.addEventListener("hashchange", updateActiveNavigation);

// Toggle the page color theme.
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему",
  );
  themeToggle.textContent = isDark ? "Світла тема" : "Темна тема";
});
