const express = require("express");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

const projects = [
  {
    id: 1,
    title: "Смартфон Galaxy S24",
    text: "Потужний флагман із сучасними AI-функціями.",
    image: "/images/product-1.svg",
    price: "34 999 ₴",
    tag: "Хіт",
    tagType: "hit",
    category: "web",
  },
  {
    id: 2,
    title: "Дизайн-система Figma",
    text: "Комплект UI-компонентів для створення веб-застосунків.",
    image: "/images/product-2.svg",
    price: "12 499 ₴",
    tag: null,
    tagType: null,
    category: "design",
  },
  {
    id: 3,
    title: "Бездротові навушники",
    text: "Активне шумозаглушення та 30 годин роботи.",
    image: "/images/product-3.svg",
    price: "5 899 ₴",
    tag: "Знижка",
    tagType: "sale",
    category: "web",
  },
];

app.get("/api/projects", (_request, response) => {
  response.json(projects);
});

app.post("/api/contact", (request, response) => {
  const { name, email, phone, message } = request.body ?? {};
  const fields = [name, email, phone, message];

  if (
    fields.some((value) => typeof value !== "string" || value.trim() === "") ||
    !/^\+380\d{9}$/.test(phone.trim())
  ) {
    return response.status(400).json({
      ok: false,
      error: "Надайте ім’я, email, повідомлення та телефон у форматі +380XXXXXXXXX.",
    });
  }

  console.log("Отримано нове повідомлення з контактної форми.");
  response.status(201).json({ ok: true });
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).json({ ok: false, error: "Некоректний JSON." });
  }

  console.error("API request failed:", error);
  return response.status(500).json({ ok: false, error: "Внутрішня помилка сервера." });
});

app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на http://localhost:${PORT}`);
});
