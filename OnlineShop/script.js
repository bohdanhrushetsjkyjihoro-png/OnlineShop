const API_URL = "https://jsonplaceholder.typicode.com";

const newsContainer = document.getElementById("news-container");
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const buttonText = document.getElementById("btn-text");
const formStatus = document.getElementById("form-status");

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
  try {
    const response = await fetch(`${API_URL}/posts?_limit=3`);
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
      throw new Error("API повернув некоректний список новин");
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

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    showStatusMessage("Перевірте, будь ласка, заповнені поля.", "error");
    return;
  }

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  setLoadingState(true);
  hideStatusMessage();

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    const result = await response.json();
    console.log("Демо-відповідь API:", result);
    showStatusMessage(
      "Демо-запит успішно виконано. JSONPlaceholder не зберігає повідомлення.",
      "success",
    );
    contactForm.reset();
  } catch (error) {
    console.error("Помилка відправки форми:", error);
    showStatusMessage(
      "Виникла помилка при надсиланні. Спробуйте ще раз.",
      "error",
    );
  } finally {
    setLoadingState(false);
  }
});

fetchNews();
