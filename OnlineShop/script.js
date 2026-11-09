const API_BASE_URL = "http://localhost:3000/api";
const NEWS_API_URL = "https://jsonplaceholder.typicode.com";

const productsGrid = document.getElementById("products-grid");
const newsContainer = document.getElementById("news-container");
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const buttonText = document.getElementById("btn-text");
const formStatus = document.getElementById("form-status");
const phoneInput = document.getElementById("phone");
const phoneHint = document.getElementById("phone-hint");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className =
    "flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition duration-300 hover:shadow-lg";

  const imageContainer = document.createElement("div");
  imageContainer.className =
    "relative flex items-center justify-center bg-gray-100 p-6";

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.title;
  image.width = 480;
  image.height = 360;
  image.className = "h-48 object-contain";
  imageContainer.append(image);

  if (project.tag) {
    const tag = document.createElement("span");
    tag.className = `absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold text-white ${
      project.tagType === "sale" ? "bg-brand-sale" : "bg-brand-primary"
    }`;
    tag.textContent = project.tag;
    imageContainer.append(tag);
  }

  const body = document.createElement("div");
  body.className = "flex flex-1 flex-col p-6";

  const title = document.createElement("h3");
  title.className = "mb-2 text-xl font-bold text-gray-900";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "mb-4 flex-1 text-sm text-gray-500";
  description.textContent = project.text;

  const footer = document.createElement("div");
  footer.className = "mt-auto flex items-center justify-between";

  const price = document.createElement("span");
  price.className = "text-xl font-bold text-brand-primary";
  price.textContent = project.price;

  const buyButton = document.createElement("button");
  buyButton.type = "button";
  buyButton.className =
    "rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition duration-200 hover:bg-brand-hover";
  buyButton.textContent = "Купити";

  footer.append(price, buyButton);
  body.append(title, description, footer);
  article.append(imageContainer, body);
  return article;
}

async function fetchProjects() {
  if (!productsGrid) return;

  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    const projects = await response.json();
    if (
      !Array.isArray(projects) ||
      projects.some(
        (project) =>
          typeof project.title !== "string" ||
          typeof project.text !== "string" ||
          typeof project.image !== "string" ||
          typeof project.price !== "string",
      )
    ) {
      throw new Error("Сервер повернув некоректний список товарів.");
    }

    const cards = document.createDocumentFragment();
    projects.forEach((project) => cards.append(createProjectCard(project)));
    productsGrid.replaceChildren(cards);
  } catch (error) {
    console.error("Помилка підключення до API товарів:", error);
  }
}

function createNewsCard(post) {
  const article = document.createElement("article");
  article.className = "news-card";

  const category = document.createElement("p");
  category.className = "news-card__category";
  category.textContent = "Новини та відгуки · демо";

  const title = document.createElement("h2");
  title.className = "news-card__title";
  title.textContent = post.title;

  const body = document.createElement("p");
  body.className = "news-card__body";
  body.textContent = post.body;

  article.append(category, title, body);
  return article;
}

async function fetchNews() {
  if (!newsContainer) return;

  try {
    const response = await fetch(`${NEWS_API_URL}/posts?_limit=3`);
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    const posts = await response.json();
    if (
      !Array.isArray(posts) ||
      posts.length === 0 ||
      posts.some(
        (post) =>
          typeof post.title !== "string" || typeof post.body !== "string",
      )
    ) {
      throw new Error("API повернув некоректний список новин.");
    }

    const cards = document.createDocumentFragment();
    posts.forEach((post) => cards.append(createNewsCard(post)));
    newsContainer.replaceChildren(cards);
  } catch (error) {
    console.error("Помилка при завантаженні новин:", error);

    const errorMessage = document.createElement("p");
    errorMessage.className = "news-error";
    errorMessage.textContent = "Не вдалося завантажити новини.";
    newsContainer.replaceChildren(errorMessage);
  } finally {
    newsContainer.setAttribute("aria-busy", "false");
  }
}

function setLoadingState(isLoading) {
  submitButton.disabled = isLoading;
  buttonText.textContent = isLoading ? "Надсилання..." : "Надіслати";
  submitButton.classList.toggle("btn--disabled", isLoading);
}

function showStatusMessage(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form__status form__status--${type}`;
  formStatus.hidden = false;
}

function hideStatusMessage() {
  formStatus.hidden = true;
  formStatus.textContent = "";
  formStatus.className = "form__status";
}

function validatePhone(phone) {
  return /^\+380\d{9}$/.test(phone.trim());
}

function updatePhoneValidation(showEmptyError = false) {
  const isValid = validatePhone(phoneInput.value);
  const isEmpty = phoneInput.value.trim() === "";
  const showError = !isValid && (!isEmpty || showEmptyError);

  phoneInput.setAttribute("aria-invalid", String(showError));
  phoneHint.textContent = showError
    ? "Введіть номер у форматі +380XXXXXXXXX."
    : "";
  return isValid;
}

if (phoneInput && phoneHint) {
  phoneInput.addEventListener("input", () => updatePhoneValidation());
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: phoneInput.value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    const isPhoneValid = updatePhoneValidation(true);
    if (
      !contactForm.reportValidity() ||
      !isPhoneValid ||
      Object.values(formData).some((value) => value === "")
    ) {
      showStatusMessage("Перевірте, будь ласка, заповнені поля.", "error");
      return;
    }

    setLoadingState(true);
    hideStatusMessage();

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || `Помилка сервера: ${response.status}`);
      }

      showStatusMessage("Повідомлення успішно надіслано на сервер!", "success");
      contactForm.reset();
      phoneInput.removeAttribute("aria-invalid");
      phoneHint.textContent = "";
    } catch (error) {
      console.error("Помилка відправки форми:", error);
      showStatusMessage(
        error.message || "Не вдалося надіслати повідомлення.",
        "error",
      );
    } finally {
      setLoadingState(false);
    }
  });
}

fetchProjects();
fetchNews();
