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
const contactForm = document.querySelector("#contact-form");
const emailInput = document.querySelector("#email");
const emailHint = document.querySelector("#email-hint");
const formMessage = document.querySelector("#form-message");

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
});

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (!email || emailInput.validity.valid) {
    emailHint.textContent = "";
    emailInput.removeAttribute("aria-invalid");
    return;
  }

  emailHint.textContent = "Email має містити символ @.";
  emailInput.setAttribute("aria-invalid", "true");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const messageInput = document.querySelector("#message");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const invalidFields = [];

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.removeAttribute("aria-invalid");
  });
  emailHint.textContent = "";
  formMessage.classList.remove("is-error", "is-success");

  if (!name) {
    nameInput.setAttribute("aria-invalid", "true");
    invalidFields.push(nameInput);
  }

  if (!email || !emailInput.validity.valid) {
    emailInput.setAttribute("aria-invalid", "true");
    emailHint.textContent = "Email має містити символ @.";
    invalidFields.push(emailInput);
  }

  if (!message) {
    messageInput.setAttribute("aria-invalid", "true");
    invalidFields.push(messageInput);
  }

  if (invalidFields.length > 0) {
    formMessage.textContent = !email || !emailInput.validity.valid
      ? "Помилка: введіть коректний email (має містити @)."
      : "Будь ласка, заповніть усі поля форми.";
    formMessage.classList.add("is-error");
    invalidFields[0].focus();
    return;
  }

  formMessage.textContent = `Дякуємо, ${name || "користувачу"}! Це демонстраційна форма — надсилання повідомлень ще не налаштоване.`;
  formMessage.classList.add("is-success");
  contactForm.reset();
  emailHint.textContent = "";
});
